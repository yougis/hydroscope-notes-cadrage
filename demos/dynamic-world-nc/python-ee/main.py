import os
import ee
import google.auth
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, timedelta

app = FastAPI(title="Earth Engine Dynamic World Proxy")

# Configuration via env
EE_PROJECT = os.getenv("EE_PROJECT", "hydroscope-504019")
AOI_MIN_LON = float(os.getenv("AOI_MIN_LON", "163.4"))
AOI_MIN_LAT = float(os.getenv("AOI_MIN_LAT", "-21.9"))
AOI_MAX_LON = float(os.getenv("AOI_MAX_LON", "165.6"))
AOI_MAX_LAT = float(os.getenv("AOI_MAX_LAT", "-20.4"))
WINDOW_DAYS = int(os.getenv("DW_WINDOW_DAYS", "45"))

# Initialize Earth Engine once at startup using ADC
@app.on_event("startup")
def init_ee():
    try:
        credentials, _ = google.auth.default(scopes=["https://www.googleapis.com/auth/earthengine"])
        ee.Initialize(credentials=credentials, project=EE_PROJECT)
        print(f"[python-ee] Earth Engine initialized for project {EE_PROJECT} via ADC")
    except Exception as e:
        print(f"[python-ee] EE init failed: {e}")
        raise


class MapIdResponse(BaseModel):
    mapid: str
    token: str
    urlFormat: str


@app.get("/health")
def health():
    return {"status": "ok"}


def parse_date(s: str) -> datetime:
    return datetime.strptime(s, "%Y-%m-%d")


def expand_window(start_dt: datetime, end_dt: datetime) -> tuple[datetime, datetime]:
    """Expand date window by WINDOW_DAYS on each side."""
    return start_dt - timedelta(days=WINDOW_DAYS), end_dt + timedelta(days=WINDOW_DAYS)


@app.get("/mapid", response_model=MapIdResponse)
def get_mapid(
    start: str = Query(..., description="Start date YYYY-MM-DD"),
    end: str = Query(..., description="End date YYYY-MM-DD"),
    stat: str = Query("mode", description="Statistic: 'mode' (dominant class) or 'mean' (dominant class + presence rate)"),
):
    """Return a GEE mapid/token/urlFormat for Dynamic World mosaic over AOI and date range."""
    try:
        start_dt = parse_date(start)
        end_dt = parse_date(end)
        if end_dt < start_dt:
            raise HTTPException(status_code=400, detail="End date before start date")

        # Expand window to ensure sufficient scenes
        win_start, win_end = expand_window(start_dt, end_dt)

        geometry = ee.Geometry.Rectangle([AOI_MIN_LON, AOI_MIN_LAT, AOI_MAX_LON, AOI_MAX_LAT])
        col = (
            ee.ImageCollection("GOOGLE/DYNAMICWORLD/V1")
            .filterBounds(geometry)
            .filterDate(win_start.strftime("%Y-%m-%d"), win_end.strftime("%Y-%m-%d"))
            .select("label")
        )
        count = col.size().getInfo()
        if count == 0:
            raise HTTPException(status_code=404, detail="No Dynamic World data for this period")

        if stat == "mean":
            # Dominant class + presence rate (% of observations)
            # Compute frequency of each class per pixel
            def class_frequency(img):
                return img.remap([0,1,2,3,4,5,6,7,8], 
                                 [ee.Image(1), ee.Image(0), ee.Image(0), ee.Image(0), ee.Image(0), 
                                  ee.Image(0), ee.Image(0), ee.Image(0), ee.Image(0)]).rename('freq_0')
            # More efficient: use reducer on remapped class masks
            # Create one image per class with 1 where label==class else 0, then mean across collection
            class_images = []
            for c in range(9):
                class_images.append(
                    col.map(lambda img: img.select('label').eq(c).rename(f'freq_{c}'))
                       .reduce(ee.Reducer.mean())
                )
            freq_stack = ee.Image.cat(class_images)  # 9 bands: freq_0 .. freq_8
            
            # Find dominant class (argmax of frequency)
            dominant = freq_stack.argmax().rename('dominant_class')
            
            # Get presence rate of dominant class
            presence_rate = freq_stack.select(
                dominant
            ).rename('presence_rate')
            
            # Visualize: dominant class with palette, presence rate as alpha/gain
            # We'll output dominant_class band and presence_rate band
            image = dominant.addBands(presence_rate)
            
            # Visualize dominant with palette, presence_rate as 0-1
            vis_params = {
                'bands': ['dominant_class'],
                'min': 0,
                'max': 8,
                'palette': [
                    "#419BDF","#397D49","#88B053","#7B87C6","#E49635",
                    "#DFC35A","#C4281B","#A59B8F","#B39FE1"
                ]
            }
            # We'll return both bands via urlFormat; client handles visualization
            mapid_dict = ee.data.getMapId({"image": image})
            tile_fetcher = mapid_dict.get("tile_fetcher")
            url_format = tile_fetcher.url_format if tile_fetcher else ""
            full_mapid = mapid_dict.get("mapid", "")
            token = mapid_dict.get("token", "")
            return MapIdResponse(mapid=full_mapid, token=token, urlFormat=url_format)
        else:
            # Default: mode (most frequent class)
            image = (
                col.reduce(ee.Reducer.mode())
                .reproject("EPSG:3857", None, 10)
                .visualize(bands=["label_mode"], min=0, max=8, palette=[
                    "#419BDF","#397D49","#88B053","#7B87C6","#E49635",
                    "#DFC35A","#C4281B","#A59B8F","#B39FE1"
                ])
            )
            mapid_dict = ee.data.getMapId({"image": image})
            tile_fetcher = mapid_dict.get("tile_fetcher")
            url_format = tile_fetcher.url_format if tile_fetcher else ""
            full_mapid = mapid_dict.get("mapid", "")
            token = mapid_dict.get("token", "")
            return MapIdResponse(mapid=full_mapid, token=token, urlFormat=url_format)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
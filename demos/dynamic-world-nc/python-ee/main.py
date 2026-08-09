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

        image = (
            col.reduce(ee.Reducer.mode())
            .reproject("EPSG:3857", None, 10)  # 10 m native resolution
            .visualize(bands=["label_mode"], min=0, max=8, palette=[
                "#419BDF","#397D49","#88B053","#7B87C6","#E49635",
                "#DFC35A","#C4281B","#A59B8F","#B39FE1"
            ])
        )
        mapid_dict = ee.data.getMapId({"image": image})
        # Use modern tile fetcher URL format: /v1/projects/.../tiles/{z}/{x}/{y}
        tile_fetcher = mapid_dict.get("tile_fetcher")
        url_format = tile_fetcher.url_format if tile_fetcher else ""
        full_mapid = mapid_dict.get("mapid", "")
        token = mapid_dict.get("token", "")
        return MapIdResponse(mapid=full_mapid, token=token, urlFormat=url_format)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
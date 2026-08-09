from pydantic_settings import BaseSettings
from pydantic import Field
from typing import Dict, List, Optional
import os


class SourceLayer(BaseSettings):
    id: int
    name: str
    count: Optional[int] = None


class SourceConfig(BaseSettings):
    key: str
    name: str
    base_url: str
    layers: List[SourceLayer]
    status: str = "ok"
    priority: int = 1


class Settings(BaseSettings):
    ttl_hours: int = Field(default=24, alias="TTL_HOURS")
    host: str = Field(default="0.0.0.0", alias="HOST")
    port: int = Field(default=8081, alias="PORT")
    data_dir: str = Field(default="/app/data", alias="DATA_DIR")
    max_record_count: int = 2000

    # Source registry - verified public endpoints
    sources: Dict[str, SourceConfig] = {
        "captages": SourceConfig(
            key="captages",
            name="Captages d'eau AEP",
            base_url="https://services1.arcgis.com/TZcrgU6CIbqWt9Qv/arcgis/rest/services/captages_eau/FeatureServer",
            layers=[
                SourceLayer(id=0, name="Captages AEP", count=540),
                SourceLayer(id=1, name="Captages privés autorisés", count=1659),
            ],
        ),
        "bassins": SourceConfig(
            key="bassins",
            name="Références hydrographiques",
            base_url="https://services1.arcgis.com/TZcrgU6CIbqWt9Qv/arcgis/rest/services/references_hydrographiques/FeatureServer",
            layers=[
                SourceLayer(id=0, name="Régions hydrographiques", count=104),
                SourceLayer(id=1, name="HER HydroEcoRégions", count=7),
                SourceLayer(id=2, name="Cadres IRH", count=336),
            ],
        ),
        "communes": SourceConfig(
            key="communes",
            name="Limites administratives terrestres",
            base_url="https://services1.arcgis.com/TZcrgU6CIbqWt9Qv/arcgis/rest/services/limites_terrestres/FeatureServer",
            layers=[
                SourceLayer(id=0, name="Communes/Provinces"),
            ],
        ),
        "hydrometrie": SourceConfig(
            key="hydrometrie",
            name="Hydrométrie - Limnimètres",
            base_url="https://services1.arcgis.com/TZcrgU6CIbqWt9Qv/arcgis/rest/services/hydrometrie/FeatureServer",
            layers=[
                SourceLayer(id=0, name="Stations limnimétriques", count=590),
            ],
        ),
        "bbr": SourceConfig(
            key="bbr",
            name="Bilan Besoin Ressource (BBR)",
            base_url="https://carto.gouv.nc/public/rest/services/Captages_eau_BilanBesoinRessource/MapServer",
            layers=[
                SourceLayer(id=0, name="Bassins versants BBR", count=5327),
            ],
        ),
        "rhm": SourceConfig(
            key="rhm",
            name="Réseau hydrographique maillé (RHM)",
            base_url="https://carto.gouv.nc/public/rest/services/modelisation_ecoulements_surface/MapServer",
            layers=[
                SourceLayer(id=1, name="RHM seuil 5 km²", count=1526),
                SourceLayer(id=2, name="RHM seuil 1 km²", count=8390),
                SourceLayer(id=3, name="RHM seuil 0,2 km²", count=41921),
                SourceLayer(id=4, name="RHC", count=413855),
            ],
        ),
        "dass": SourceConfig(
            key="dass",
            name="Unités de distribution DASS",
            base_url="",
            layers=[],
            status="non_disponible",
            priority=99,
        ),
    }

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()

# Helper
def get_source(key: str) -> Optional[SourceConfig]:
    return settings.sources.get(key)


def list_sources() -> list[SourceConfig]:
    return sorted(settings.sources.values(), key=lambda s: s.priority)
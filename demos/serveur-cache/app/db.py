import sqlite3
import json
import os
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Dict, List, Optional
from app.config import settings


DB_PATH = Path(settings.data_dir) / "cache.db"
DB_PATH.parent.mkdir(parents=True, exist_ok=True)


def get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, check_same_thread=False)
    conn.row_factory = sqlite3.Row
    return conn


@contextmanager
def db_conn():
    conn = get_conn()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


def init_db() -> None:
    with db_conn() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS sources_meta (
                key TEXT PRIMARY KEY,
                name TEXT,
                base_url TEXT,
                status TEXT,
                last_sync TEXT,
                last_count INTEGER,
                layer_counts TEXT
            )
        """)
        # Feature tables will be created dynamically per source/layer
        # naming: features_{source_key}_layer{layer_id}


def ensure_feature_table(source_key: str, layer_id: int, fields: List[Dict]) -> None:
    table = f"features_{source_key}_layer{layer_id}"
    cols = ["objectid INTEGER PRIMARY KEY", "geometry TEXT"]
    for f in fields:
        fname = f["name"]
        ftype = f["type"]
        if ftype in ("esriFieldTypeOID", "esriFieldTypeGeometry"):
            continue
        sql_type = _map_esri_type(ftype)
        cols.append(f'"{fname}" {sql_type}')
    cols_sql = ", ".join(cols)
    with db_conn() as conn:
        conn.execute(f"CREATE TABLE IF NOT EXISTS {table} ({cols_sql})")
        # index on objectid already primary
        conn.execute(f"CREATE INDEX IF NOT EXISTS idx_{table}_geom ON {table}(geometry)")


def _map_esri_type(esri_type: str) -> str:
    mapping = {
        "esriFieldTypeString": "TEXT",
        "esriFieldTypeInteger": "INTEGER",
        "esriFieldTypeSmallInteger": "INTEGER",
        "esriFieldTypeDouble": "REAL",
        "esriFieldTypeSingle": "REAL",
        "esriFieldTypeDate": "TEXT",
        "esriFieldTypeGUID": "TEXT",
        "esriFieldTypeGlobalID": "TEXT",
        "esriFieldTypeXML": "TEXT",
    }
    return mapping.get(esri_type, "TEXT")


def upsert_features(source_key: str, layer_id: int, features: List[Dict]) -> int:
    if not features:
        return 0
    table = f"features_{source_key}_layer{layer_id}"
    first = features[0]["attributes"]
    # ensure table exists with proper columns
    with db_conn() as conn:
        cursor = conn.execute(f"PRAGMA table_info({table})")
        existing_cols = {row[1] for row in cursor.fetchall()}
    needed_cols = set(first.keys()) - existing_cols
    if needed_cols:
        # recreate table with new columns - simple approach: drop and recreate
        with db_conn() as conn:
            conn.execute(f"DROP TABLE IF EXISTS {table}")
        ensure_feature_table(source_key, layer_id, [
            {"name": k, "type": _guess_type(v)} for k, v in first.items() if k.lower() != "objectid"
        ])

    cols = [c for c in first.keys() if c.lower() != "objectid"]
    placeholders = ", ".join(["?"] * (len(cols) + 2))  # +2 for objectid + geometry
    col_list = "objectid, " + ", ".join(f'"{c}"' for c in cols)
    sql = f"INSERT OR REPLACE INTO {table} ({col_list}, geometry) VALUES ({placeholders})"

    inserted = 0
    with db_conn() as conn:
        for feat in features:
            attrs = feat["attributes"]
            geom = feat.get("geometry")
            geom_json = json.dumps(geom) if geom else None
            vals = [attrs.get(c) for c in cols]
            conn.execute(sql, [attrs.get("objectid")] + vals + [geom_json])
            inserted += 1
    return inserted


def _guess_type(val: Any) -> str:
    if isinstance(val, bool):
        return "INTEGER"
    if isinstance(val, int):
        return "INTEGER"
    if isinstance(val, float):
        return "REAL"
    return "TEXT"


def get_features(
    source_key: str,
    layer_id: int,
    limit: int = 1000,
    offset: int = 0,
    bbox: Optional[str] = None,
) -> List[Dict]:
    table = f"features_{source_key}_layer{layer_id}"
    with db_conn() as conn:
        # Check table exists
        cursor = conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name=?", (table,)
        )
        if not cursor.fetchone():
            return []
        # Build query
        sql = f"SELECT * FROM {table} LIMIT ? OFFSET ?"
        rows = conn.execute(sql, (limit, offset)).fetchall()
        results = []
        for row in rows:
            d = dict(row)
            if d.get("geometry"):
                try:
                    d["geometry"] = json.loads(d["geometry"])
                except Exception:
                    d["geometry"] = None
            results.append(d)
        return results


def count_features(source_key: str, layer_id: int) -> int:
    table = f"features_{source_key}_layer{layer_id}"
    with db_conn() as conn:
        cursor = conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table' AND name=?", (table,)
        )
        if not cursor.fetchone():
            return 0
        return conn.execute(f"SELECT COUNT(*) FROM {table}").fetchone()[0]


def update_source_meta(
    key: str,
    name: str,
    base_url: str,
    status: str,
    layer_counts: Dict[int, int],
) -> None:
    import datetime
    last_sync = datetime.datetime.utcnow().isoformat() + "Z"
    total = sum(layer_counts.values())
    with db_conn() as conn:
        conn.execute(
            """
            INSERT OR REPLACE INTO sources_meta (key, name, base_url, status, last_sync, last_count, layer_counts)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
            (key, name, base_url, status, last_sync, total, json.dumps(layer_counts)),
        )


def get_source_meta(key: str) -> Optional[Dict]:
    with db_conn() as conn:
        row = conn.execute(
            "SELECT * FROM sources_meta WHERE key=?", (key,)
        ).fetchone()
        if not row:
            return None
        d = dict(row)
        d["layer_counts"] = json.loads(d["layer_counts"])
        return d


def get_all_sources_meta() -> List[Dict]:
    with db_conn() as conn:
        rows = conn.execute("SELECT * FROM sources_meta ORDER BY key").fetchall()
        results = []
        for row in rows:
            d = dict(row)
            d["layer_counts"] = json.loads(d["layer_counts"])
            results.append(d)
        return results
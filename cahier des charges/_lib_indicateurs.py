"""_lib_indicateurs.py — Source unique des indicateurs HydroScope.

Module partagé entre les chapitres du cahier des charges (ch.1 « sources »
et ch.5 « présentation des indicateurs »). Lit le **fichier maître** externe
`fiches indicateurs.xlsx` (dossier voisin `fiche indicateur/`), résolu par la
variable d'environnement `HYDRO_INDICATEURS_XLSX` ou, par défaut, par
`{QUARTO_PROJECT_ROOT}/../fiche indicateur/fiches indicateurs.xlsx`.

Ce module est la SEULE référence des données indicateurs : aucune copie CSV/XLSX
n'est maintenue dans le dépôt. Le regroupement retenu est le **V1** (10 groupes,
2 familles, 4 thèmes — contrat actuel), via la colonne `id_groupe` de la feuille
`relation groupe objectifs`.
"""

from __future__ import annotations

import json
import os

import pandas as pd


# ── Palette 16 couleurs (V1) — extraite du référentiel contractuel v4 ────────
# Famille (2), Thème (4) puis Groupe (10). Identique à l'existant pour ne pas
# changer le rendu visuel des chapitres.

FAMILLE_COLORS = {
    "Enjeu": "2B5E8C",
    "Menace": "FAA51A",
}

THEME_COLORS = {
    "Enjeux AEP": "4472C4",
    "Enjeux Environnementaux": "3BC29F",
    "MENACES ANTHROPIQUES": "C55A11",
    "MENACES NATURELLES": "ED7D31",
}

GROUPE_COLORS = {
    "Importance captage": "698ED0",
    "Niveau infrastructures": "82A1D8",
    "Sécurité sanitaire et règlementaire": "9BB4E0",
    "Vulnérabilité structurelle": "B4C7E7",
    "Zone naturelle": "61CFB3",
    "Zones protégés": "B0E7D9",
    "Activités à risque": "EC7625",
    "Infrastructures et usages": "F6BA92",
    "Perturbations environnementales": "F1975A",
    "Sensibilité naturelle": "F8CBAD",
}

# Colonnes contractuelles finales du référentiel (38 lignes × 9 attributs)
FLAT_COLUMNS = [
    "id_indicateur",
    "nom_famille",
    "Nom_theme",
    "groupe",
    "nom_indicateur",
    "description_indicateur_utilisateur",
    "objectif_INFO",
    "objectif_AMC",
    "Analyse_multicriteres",
]


def master_path() -> str:
    """Résout le chemin du fichier maître des indicateurs."""
    env = os.environ.get("HYDRO_INDICATEURS_XLSX")
    if env:
        return env
    root = os.environ.get("QUARTO_PROJECT_ROOT") or os.getcwd()
    default = os.path.join(root, os.pardir, "fiche indicateur", "fiches indicateurs.xlsx")
    if not os.path.isfile(default):
        raise FileNotFoundError(
            "Fichier maître introuvable. Définir HYDRO_INDICATEURS_XLSX ou "
            f"vérifier la présence de : {default}"
        )
    return default


def target_format() -> str:
    """Détermine le format de rendu Quarto, en lecture gardée.

    Retourne 'html' en secours si `QUARTO_EXECUTE_INFO` est absent ou périmé
    (ex. kernel IDE réutilisé dont le répertoire temporaire a été purgé).
    """
    info_env = os.environ.get("QUARTO_EXECUTE_INFO")
    if not info_env:
        return "html"
    try:
        with open(info_env, encoding="utf-8") as f:
            info = json.load(f)
        return str(info["format"]["identifier"]["target-format"]).lower()
    except (OSError, ValueError, KeyError, TypeError):
        return "html"


def load_flat(active_only: bool = True) -> pd.DataFrame:
    """Charge le référentiel flat V1 des indicateurs depuis le maître.

    Reproduit la chaîne de jointure du générateur des fiches :
    `indicateurs` + `relation groupe objectifs` (sur `id_groupe`, clé V1)
    + `groupes` + `themes` + `Familles`. Filtre les actifs (`actif == 'oui'`).
    """
    df_ind = pd.read_excel(master_path(), sheet_name="indicateurs")
    df_rel = pd.read_excel(master_path(), sheet_name="relation groupe objectifs")
    df_group = pd.read_excel(master_path(), sheet_name="groupes")
    df_theme = pd.read_excel(master_path(), sheet_name="themes")
    df_fam = pd.read_excel(master_path(), sheet_name="Familles")

    for d in (df_ind, df_rel, df_group, df_theme, df_fam):
        d.columns = [str(c).strip() if c is not None else c for c in d.columns]

    if active_only:
        df_ind = df_ind[df_ind["actif"].astype(str).str.lower() == "oui"]

    df_flat = df_ind.merge(df_rel, on="id_indicateur", how="left", suffixes=("", "_rel"))
    df_flat = df_flat.merge(df_group, on="id_groupe", how="left", suffixes=("", "_group"))
    df_flat = df_flat.merge(df_theme, left_on="id_theme", right_on="id_theme", how="left", suffixes=("", "_theme"))
    df_flat = df_flat.merge(df_fam, on="id_famille", how="left", suffixes=("", "_famille"))

    cols = [c for c in FLAT_COLUMNS if c in df_flat.columns]
    df_flat = df_flat[cols].copy()
    df_flat = df_flat.sort_values(by=["nom_famille", "Nom_theme", "groupe"]).reset_index(drop=True)
    df_flat["id_indicateur"] = pd.to_numeric(df_flat["id_indicateur"], errors="coerce").astype("Int64")
    for c in FLAT_COLUMNS[1:]:
        if c in df_flat.columns:
            df_flat[c] = df_flat[c].astype(str)
    return df_flat


def build_colors(df_flat: pd.DataFrame) -> pd.DataFrame:
    """Construit un DataFrame de couleurs hex (sans '#') aligné sur df_flat.

    Colonne Famille → couleur de famille ; colonne Thème → couleur de thème ;
    colonnes Groupe et suivantes → couleur de groupe.
    """
    rows = []
    for _, r in df_flat.iterrows():
        fam = str(r["nom_famille"])
        thm = str(r["Nom_theme"])
        grp = str(r["groupe"])
        fam_c = FAMILLE_COLORS.get(fam, "")
        thm_c = THEME_COLORS.get(thm, "")
        grp_c = GROUPE_COLORS.get(grp, "")
        row = {
            "id_indicateur": None,
            "nom_famille": "#" + fam_c if fam_c else "",
            "Nom_theme": "#" + thm_c if thm_c else "",
            "groupe": "#" + grp_c if grp_c else "",
        }
        for c in FLAT_COLUMNS[4:]:
            row[c] = "#" + grp_c if grp_c else ""
        rows.append(row)
    dfc = pd.DataFrame(rows, columns=FLAT_COLUMNS)
    dfc.index = df_flat.index
    return dfc


def load_sources() -> pd.DataFrame:
    """Charge la feuille `sources` du maître (12 colonnes, non filtrée)."""
    df = pd.read_excel(master_path(), sheet_name="sources")
    df.columns = [str(c).strip() if c is not None else c for c in df.columns]
    return df


def load_all():
    """Retourne (df_flat, df_colors) prêts à l'emploi pour les chapitres."""
    df = load_flat()
    colors = build_colors(df)
    return df, colors


if __name__ == "__main__":
    _df, _dfc = load_all()
    print(f"Indicateurs actifs : {len(_df)}")
    print(_df[["id_indicateur", "nom_famille", "Nom_theme", "groupe", "nom_indicateur"]].head(10).to_string())

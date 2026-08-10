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


# ── Backlog — grille de chiffrage (bordereau de prix) ─────────────────────────

BACKLOG_XLSX = "backlog.xlsx"
BACKLOG_SHEET = "Backlog"

EPIC_ORDER = [
    "EPIC 1 – Gestion des données",
    "EPIC 1bis – Catalogage des données",
    "EPIC 2 – Qualité des données",
    "EPIC 3 – Référentiels",
    "EPIC 4 – Calcul d'indicateurs",
    "EPIC 5 – Analyse multicritère",
    "EPIC 6 – Visualisation",
    "EPIC 7 – Aide à la décision",
    "EPIC 8 – Export",
    "EPIC 9 – Utilisateurs",
    "EPIC 10 – Traçabilité",
]

COMPLEXITY_MAP = {
    "EPIC 1 – Gestion des données": "Élevée",
    "EPIC 1bis – Catalogage des données": "Moyenne",
    "EPIC 2 – Qualité des données": "Moyenne",
    "EPIC 3 – Référentiels": "Moyenne",
    "EPIC 4 – Calcul d'indicateurs": "Élevée",
    "EPIC 5 – Analyse multicritère": "Très élevée",
    "EPIC 6 – Visualisation": "Élevée",
    "EPIC 7 – Aide à la décision": "Moyenne",
    "EPIC 8 – Export": "Faible",
    "EPIC 9 – Utilisateurs": "Faible",
    "EPIC 10 – Traçabilité": "Moyenne",
}

# Colonnes du bordereau final (7 colonnes : fusions EPIC / Module / Front-Back)
PRICING_COLUMNS = [
    "ID_US",
    "User_Story",
    "Complexité",
    "Charge proposée (JH)",
    "Taux journalier (€/JH)",
    "Coût HT (€)",
    "Commentaires",
]

PRICING_HEADERS = {
    "ID_US": "ID",
    "User_Story": "User Story",
    "Complexité": "Complexité",
    "Charge proposée (JH)": "Charge (JH)",
    "Taux journalier (€/JH)": "Taux (€/JH)",
    "Coût HT (€)": "Coût HT (€)",
    "Commentaires": "Commentaires",
}

# Largeurs (cm) : somme ≤ 15.0 cm portrait A4 marges 1 in (≈15.9 cm utiles)
PRICING_WIDTHS_CM = {
    "ID_US": 1.1,
    "User_Story": 4.7,
    "Complexité": 1.8,
    "Charge proposée (JH)": 1.4,
    "Taux journalier (€/JH)": 1.5,
    "Coût HT (€)": 1.5,
    "Commentaires": 2.6,
}


def load_backlog(path: str = None) -> pd.DataFrame:
    """Charge le backlog et construit la table de chiffrage (7 colonnes).

    Enrichit le flux : Complexité (map EPIC → niveau) et colonnes vides à
    compléter par le candidat (Charge, Taux, Coût, Commentaires).
    """
    p = path or BACKLOG_XLSX
    df = pd.read_excel(p, sheet_name=BACKLOG_SHEET)
    df.columns = [str(c).strip() if c is not None else c for c in df.columns]

    df = df.rename(columns={"ID User Story": "ID_US", "Libellé User Story": "User_Story"})
    if "ID_US" not in df.columns:
        df["ID_US"] = df.iloc[:, 1]
    if "User_Story" not in df.columns:
        df["User_Story"] = df.iloc[:, 2]

    df["MVP"] = df["MVP"].astype(str).str.upper().map({"TRUE": "Oui", "FALSE": "Non"})
    df["Complexité"] = df["EPIC"].map(COMPLEXITY_MAP)
    for c in ("Charge proposée (JH)", "Taux journalier (€/JH)", "Coût HT (€)", "Commentaires"):
        df[c] = ""
    keep = ["EPIC", "Module", "Front_or_Back"] + PRICING_COLUMNS
    return df[[c for c in keep if c in df.columns]].copy()


def _subset(df: pd.DataFrame, epic5_excl: bool) -> pd.DataFrame:
    if epic5_excl:
        return df[df["EPIC"] != "EPIC 5 – Analyse multicritère"]
    return df[df["EPIC"] == "EPIC 5 – Analyse multicritère"]


def render_pricing_table(df: pd.DataFrame, fmt: str) -> str:
    r"""Génère la grille de chiffrage unique (base + option 1 + option 2).

    fmt: 'pdf' → LaTeX longtable (booktabs, \multicolumn pour les fusions) ;
         'html' → <table class="pricing"> avec colspan + CSS ;
         'docx' → pipe-table markdown (fusions réduites à des lignes titre).
    """
    sections = [
        ("Périmètre de base (MVP + lot 2)", _subset(df, epic5_excl=True)),
        ("Option 1 — Analyse multicritère (EPIC 5)", _subset(df, epic5_excl=False)),
    ]
    if fmt == "pdf":
        return _render_pdf(sections)
    if fmt == "html":
        return _render_html_gt(sections)
    return _render_docx(sections)


# ── Rendu LaTeX (longtable + booktabs) ──────────────────────────────────────

def _esc_latex(s):
    out = str(s).replace("\\", r"\textbackslash{}")
    for ch, rep in [("&", r"\&"), ("%", r"\%"), ("$", r"\$"), ("#", r"\#"),
                    ("_", r"\_"), ("{", r"\{" ), ("}", r"\}" )]:
        out = out.replace(ch, rep)
    return out.replace("~", r"\textasciitilde{}").replace("^", r"\textasciicircum{}")


def _render_pdf(sections) -> str:
    widths = " ".join(f"p{{{PRICING_WIDTHS_CM[c]}cm}}" for c in PRICING_COLUMNS)
    headers = " & ".join(r"\textbf{" + _esc_latex(PRICING_HEADERS[c]) + "}" for c in PRICING_COLUMNS)
    ncol = len(PRICING_COLUMNS)

    out = [r"{\small", r"\begin{longtable}{" + widths + "}", r"\toprule"]
    out.append(headers + r" \\")
    out.append(r"\midrule")

    for i, (sec_title, sdf) in enumerate(sections):
        if i > 0:
            out.append(r"\midrule")
        out.append(r"\multicolumn{" + str(ncol) + r"}{l}{\textbf{" + _esc_latex(sec_title) + r"}} \\")

        if sdf.empty:
            out.append(r"\multicolumn{" + str(ncol) + r"}{l}{\textit{Aucune ligne}} \\")
            continue

        epic_prev = None
        module_prev = None
        fb_prev = None
        for epic in EPIC_ORDER:
            de = sdf[sdf["EPIC"] == epic]
            if de.empty:
                continue
            if epic != epic_prev:
                out.append(r"\midrule")
                out.append(r"\multicolumn{" + str(ncol) + r"}{l}{\textbf{" + _esc_latex(epic) + r"}} \\")
                epic_prev = epic
                module_prev = None
                fb_prev = None
            eps = de.sort_values(["Module", "ID_US"])
            for module, dm in eps.groupby("Module", sort=True):
                if module != module_prev:
                    out.append(r"\multicolumn{" + str(ncol) + r"}{l}{\textit{" + _esc_latex(str(module)) + r"}} \\")
                    module_prev = module
                    fb_prev = None
                dm = dm.sort_values("ID_US")
                fb_groups = sorted(dm.groupby("Front_or_Back"), key=lambda kv: (kv[0] != "Front-end", kv[0]))
                for fb, dfb in fb_groups:
                    if fb != fb_prev:
                        out.append(r"\multicolumn{" + str(ncol) + r"}{l}{" + _esc_latex(str(fb)) + r"} \\")
                        fb_prev = fb
                    for _, r in dfb.sort_values("ID_US").iterrows():
                        cells = [str(r[c]).replace("\n", " ").strip() for c in PRICING_COLUMNS]
                        out.append(" & ".join(_esc_latex(x) for x in cells) + r" \\")
        out.append(r"\midrule")

    # Option 2 — TMA (lignes fixes)
    out.append(r"\multicolumn{" + str(ncol) + r"}{l}{\textbf{Option 2 — TMA (maintenance et support)}} \\")
    out.append(r"\midrule")
    out.append(r"\textbf{TMA post-déploiement} & Cadre contractuel (chapitre 16) &"
               r" & & & & SLA : Bloquant 4 h / 24 h ; Majeur 5 j / 10 j ; Mineur 10 j / 30 j \\")

    # Synthèse
    out.append(r"\midrule")
    out.append(r"\multicolumn{" + str(ncol) + r"}{l}{\textbf{Synthèse de l'offre}} \\")
    out.append(r"\toprule")
    out.append(r"\textbf{Total périmètre de base} & & & & & & \\")
    out.append(r"\textbf{Total option 1} & & & & & & \\")
    out.append(r"\textbf{Total option 2} & & & & & & \\")
    out.append(r"\textbf{Total général (base + options)} & & & & & & \\")
    out.append(r"\bottomrule")
    out.append(r"\end{longtable}")
    out.append(r"}")
    return "\n".join(out)


# ── Rendu HTML (tableau class="pricing" + colspan) ──────────────────────────

def _esc_html(s):
    return (str(s).replace("&", "&amp;").replace("<", "&lt;")
            .replace(">", "&gt;").replace('"', "&quot;"))


def _render_html_gt(sections) -> str:
    ncol = len(PRICING_COLUMNS)
    col_td = {
        "ID_US": "id",
        "User_Story": "story",
        "Charge proposée (JH)": "charge",
        "Taux journalier (€/JH)": "taux",
        "Coût HT (€)": "cout",
        "Commentaires": "comm",
    }
    hdrs = "".join(f'<th>{_esc_html(PRICING_HEADERS[c])}</th>' for c in PRICING_COLUMNS)

    out = ['<table class="pricing">', "<thead>", f'<tr class="cols">{hdrs}</tr>', "</thead>", "<tbody>"]
    for i, (sec_title, sdf) in enumerate(sections):
        if i > 0:
            out.append(f'<tr class="section-sep"><td colspan="{ncol}"><strong>{_esc_html(sec_title)}</strong></td></tr>')
        elif sec_title:
            out.append(f'<tr class="section"><td colspan="{ncol}"><strong>{_esc_html(sec_title)}</strong></td></tr>')
        for epic in EPIC_ORDER:
            de = sdf[sdf["EPIC"] == epic]
            if de.empty:
                continue
            out.append(f'<tr class="epic"><td colspan="{ncol}"><strong>{_esc_html(epic)}</strong></td></tr>')
            eps = de.sort_values(["Module", "ID_US"])
            for module, dm in eps.groupby("Module", sort=True):
                out.append(f'<tr class="module"><td colspan="{ncol}"><em>{_esc_html(str(module))}</em></td></tr>')
                fb_groups = sorted(dm.groupby("Front_or_Back"), key=lambda kv: (kv[0] != "Front-end", kv[0]))
                for fb, dfb in fb_groups:
                    out.append(f'<tr class="front"><td colspan="{ncol}">{_esc_html(str(fb))}</td></tr>')
                    for _, r in dfb.sort_values("ID_US").iterrows():
                        cells = "".join(
                            f'<td class="{col_td.get(c, "")}">{_esc_html(str(r[c]).replace(chr(10), " ").strip())}</td>'
                            for c in PRICING_COLUMNS
                        )
                        out.append(f"<tr>{cells}</tr>")

    # Option 2 TMA + synthèse
    out.append(f'<tr class="section"><td colspan="{ncol}"><strong>Option 2 — TMA (maintenance et support)</strong></td></tr>')
    out.append('<tr class="cols"><th>TMA post-déploiement</th><th>Cadre contractuel (chapitre 16)</th>'
               '<th></th><th></th><th></th><th></th>'
               '<th>SLA : Bloquant 4 h / 24 h ; Majeur 5 j / 10 j ; Mineur 10 j / 30 j</th></tr>')
    out.append(f'<tr class="section"><td colspan="{ncol}"><strong>Synthèse de l’offre</strong></td></tr>')
    for t in ("Total périmètre de base", "Total option 1", "Total option 2", "Total général (base + options)"):
        out.append(f'<tr class="total"><th>{t}</th><td></td><td></td><td></td><td></td><td></td><td></td></tr>')
    out.append("</tbody></table>")
    return "\n".join(out)


# ── Rendu DOCX (pipe table — pas de colspan, fusions en lignes titre) ───────

def _esc_pipe(s):
    return str(s).replace("|", r"\|").replace("\n", " ").strip()


def _render_docx(sections) -> str:
    ncol = len(PRICING_COLUMNS)
    header = "| " + " | ".join(_esc_pipe(PRICING_HEADERS[c]) for c in PRICING_COLUMNS) + " |"
    sep = "|" + "---|" * ncol

    lines = [header, sep]
    for i, (sec_title, sdf) in enumerate(sections):
        if i > 0 and sec_title:
            lines.append(f"| **{_esc_pipe(sec_title)}** | " + " | ".join([""] * (ncol - 1)) + " |")
        elif i == 0 and sec_title:
            lines.append(f"| **{_esc_pipe(sec_title)}** | " + " | ".join([""] * (ncol - 1)) + " |")
        for epic in EPIC_ORDER:
            de = sdf[sdf["EPIC"] == epic]
            if de.empty:
                continue
            lines.append(f"| **{_esc_pipe(epic)}** | " + " | ".join([""] * (ncol - 1)) + " |")
            eps = de.sort_values(["Module", "ID_US"])
            for module, dm in eps.groupby("Module", sort=True):
                lines.append(f"| *{_esc_pipe(str(module))}* | " + " | ".join([""] * (ncol - 1)) + " |")
                fb_groups = sorted(dm.groupby("Front_or_Back"), key=lambda kv: (kv[0] != "Front-end", kv[0]))
                for fb, dfb in fb_groups:
                    lines.append(f"| {_esc_pipe(str(fb))} | " + " | ".join([""] * (ncol - 1)) + " |")
                    for _, r in dfb.sort_values("ID_US").iterrows():
                        cells = [_esc_pipe(r[c]) for c in PRICING_COLUMNS]
                        lines.append("| " + " | ".join(cells) + " |")
    # Option 2 TMA + synthèse
    lines.append("| **Option 2 — TMA (maintenance et support)** | " + " | ".join([""] * (ncol - 1)) + " |")
    lines.append("| **TMA post-déploiement** | Cadre contractuel (chapitre 16) | | | | | "
                 "SLA : Bloquant 4 h / 24 h ; Majeur 5 j / 10 j ; Mineur 10 j / 30 j |")
    lines.append("| **Synthèse de l'offre** | | | | | | |")
    for t in ("Total périmètre de base", "Total option 1", "Total option 2", "Total général (base + options)"):
        lines.append("| **" + t + "** | | | | | | |")
    return "\n".join(lines)


if __name__ == "__main__":
    _df, _dfc = load_all()
    print(f"Indicateurs actifs : {len(_df)}")
    print(_df[["id_indicateur", "nom_famille", "Nom_theme", "groupe", "nom_indicateur"]].head(10).to_string())

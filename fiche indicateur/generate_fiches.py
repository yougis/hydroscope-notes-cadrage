#!/usr/bin/env python3
"""
generate_fiches.py
------------------
Lit indicateurs.xlsx et génère :
  - fiches/<id>.qmd      pour chaque indicateur
  - index.qmd            page de garde / sommaire
  - _quarto.yml          configuration complète du book avec chapitres dynamiques
"""

import pandas as pd
import re
import yaml
from pathlib import Path
from datetime import date

XLSX       = Path("indicateurs.xlsx")
FICHES_DIR = Path("fiches")
FICHES_DIR.mkdir(exist_ok=True)

PROJECT = {
    "title":     "Fiches indicateurs HydroScope",
    "subtitle":  "Catalogue des indicateurs de suivi hydrologique",
    "author":    "Yapuka SARL",
    "copyright": "Copyright Yapuka SARL — 2026. Tous droits réservés.",
    "version":   "0.1",
}

def slugify(text: str) -> str:
    text = text.lower().strip()
    for src, dst in [("àâä","a"),("éèêë","e"),("îï","i"),("ôö","o"),("ùûü","u")]:
        for c in src:
            text = text.replace(c, dst)
    text = re.sub(r"[^a-z0-9]+", "-", text)
    return text.strip("-")

def v(row, col):
    return str(row.get(col, "") or "").strip()

def fiche_qmd(row):
    modalites = v(row, "modalites")
    normalisa = v(row, "normalisation")
    bloc_m = f"## Modalités de calcul\n\n{modalites}\n\n" if modalites else ""
    bloc_n = f"## Normalisation / Seuils\n\n{normalisa}\n\n" if normalisa else ""

    return f"""\
---
title: "{v(row, 'nom_indicateur')}"
subtitle: "Indicateur n⁰ {v(row, 'id')}"
categories: ["{v(row, 'famille')}", "{v(row, 'type')}"]
---

{v(row, 'description')}

## Identification

| Champ               | Valeur |
|---------------------|--------|
| **Identifiant**     | `{v(row, 'id')}` |
| **Famille**         | {v(row, 'famille')} |
| **Type d'indicateur**            | {v(row, 'type')} |
| **Unité de mesure**           | {v(row, 'unite')} |
| **Support spatial du calcul** | {v(row, 'support_spatial')} |
| **Fréquence de mise à jour**       | {v(row, 'frequence')} |

## Objectif

{v(row, 'objectif')}

## Sources de données

{v(row, 'source')}

## Méthode de calcul

{v(row, 'methode')}

{bloc_m}## Contraintes / limites

{v(row, 'contraintes')}

{bloc_m}## Modalité de calcul

{v(row, 'modalites')}

{bloc_n}"""


def index_qmd(familles):
    today = date.today().strftime("%d/%m/%Y")
    lines = [
        f"# {PROJECT['title']}\n",
        f"**{PROJECT['subtitle']}**\n",
        f"Version {PROJECT['version']} — {today}\n",
        f"{PROJECT['copyright']}\n",
        "\n---\n",
        "## Sommaire par famille\n",
    ]
    for famille, items in familles.items():
        lines.append(f"\n### {famille}\n")
        for item in items:
            lines.append(f"- [{item['nom']}](fiches/{item['id']}.qmd)")
    return "\n".join(lines) + "\n"


def quarto_yml(familles):
    chapters = ["index.qmd"]
    for famille, items in familles.items():
        chapters.append({
            "part": famille,
            "chapters": [f"fiches/{item['id']}.qmd" for item in items]
        })

    config = {
        "project": {
            "type": "book",
            "pre-render": "generate_fiches.py",
        },
        "book": {
            "title":       PROJECT["title"],
            "subtitle":    PROJECT["subtitle"],
            "author":      PROJECT["author"],
            "date":        "today",
            "date-format": "dd/MM/yyyy",
            "chapters":    chapters,
            "downloads":   ["pdf"],
        },
        "format": {
            "pdf": {
                "documentclass":  "scrreprt",
                "papersize":      "a4",
                "toc":            True,
                "toc-depth":      3,
                "number-sections": False,
                "lang":           "fr",
                "geometry":       "margin=2.5cm",
                "colorlinks":     True,
                "include-in-header": {
                    "text": (
                        "\\usepackage{fancyhdr}\n"
                        "\\pagestyle{fancy}\n"
                        f"\\fancyfoot[C]{{\\small {PROJECT['copyright']}}}\n"
                        "\\fancyfoot[R]{\\small \\thepage}\n"
                    )
                },
            },
            "html": {
                "theme":     "cosmo",
                "toc":       True,
                "toc-depth": 3,
                "lang":      "fr",
            },
        },
        "execute": {
            "echo":   False,
            "freeze": "auto",
        },
    }
    return yaml.dump(config, allow_unicode=True, sort_keys=False, default_flow_style=False)


def main():
    df = pd.read_excel(XLSX).fillna("")
    familles = {}

    for _, row in df.iterrows():
        fam  = v(row, "famille") or "Autre"
        slug = v(row, "id") or slugify(v(row, "nom_indicateur"))
        path = FICHES_DIR / f"{slug}.qmd"
        path.write_text(fiche_qmd(row), encoding="utf-8")
        print(f"  ✓ fiche   {path}")
        familles.setdefault(fam, []).append({"id": slug, "nom": v(row, "nom_indicateur")})

    Path("index.qmd").write_text(index_qmd(familles), encoding="utf-8")
    print(f"  ✓ index   index.qmd")

    Path("_quarto.yml").write_text(quarto_yml(familles), encoding="utf-8")
    print(f"  ✓ config  _quarto.yml")

    total = sum(len(v) for v in familles.values())
    print(f"\n{total} fiches — {len(familles)} familles : {', '.join(familles.keys())}")
    print("\nPour rendre le PDF :  quarto render --to pdf")
    print("Pour les deux formats : quarto render")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""compile_offre.py — Compile et pack l'offre HydroScope complète.

Usage:
    conda run -n reponse python scripts/compile_offre.py            # rendu + pack
    conda run -n reponse python scripts/compile_offre.py --skip-render  # pack seul

Comportement :
    1. Relance `quarto render` du CDC (html, pdf, docx) sauf avec --skip-render.
    2. Assemble un pack autonome dans `releases/YYYYMMDD_offre/` (écrase l'existant).
    3. Scanne l'HTML final du pack, copie les ressources relatives manquantes, signale les liens cassés.
    4. Écrit `RAPPORT.md` puis produit `releases/YYYYMMDD_offre.zip` (contenant le dossier YYYYMMDD_offre/).

Bibliothèque standard uniquement (argparse, re, shutil, subprocess, sys, zipfile, datetime, pathlib).
"""

from __future__ import annotations

import argparse
import os
import re
import shutil
import subprocess
import sys
import zipfile
from datetime import date
from pathlib import Path
from urllib.parse import unquote

ROOT_MARKER = "_quarto.yml"

CDC_DIR = "cahier des charges"
CDC_SRC = Path(CDC_DIR)
CDC_OUT = Path("_output") / CDC_DIR
ANALYSE_SRC = Path("reponse_prestataire") / "analyse_architecture_donnees_geographique_decisionnelle.md"
FIGMA_SPECS_SRC = Path("figma-design") / "docs" / "specs"
FIGMA_HELP_SRC = Path("figma-design") / "docs" / "help"
FORMATS = ("html", "pdf", "docx")

# Fichier maître des indicateurs : source unique, hors dépôt.
MASTER_FILENAME = "fiches indicateurs.xlsx"

ANNEXES = (
    "arbre_indicateurs.html",
    "graphe_dependances.html",
    "Fiches_indicateurs_HydroScope-v4.pdf",
    "Cadre_chiffrage.qmd",
    "Criteres_acceptation_donnees.qmd",
    "Criteres_acceptation_lot2.qmd",
    "Criteres_acceptation_visualisation.qmd",
)

REFS_RE = re.compile(r"""(?:href|src)\s*=\s*["']([^"']+)["']""", re.IGNORECASE)
SKIP_PREFIXES = ("#", "http://", "https://", "mailto:", "tel:", "data:", "javascript:", "file:")


def log(msg: str) -> None:
    print(msg, flush=True)


def die(msg: str) -> None:
    print(f"[ERREUR] {msg}", flush=True)
    sys.exit(1)


def find_root() -> Path:
    root = Path.cwd()
    if not (root / ROOT_MARKER).is_file():
        die(f"Le répertoire courant ne contient pas {ROOT_MARKER}. Exécuter depuis la racine du projet.")
    return root


def master_indicateurs_path(root: Path) -> Path:
    """Résout le fichier maître des indicateurs (env HYDRO_INDICATEURS_XLSX ou dossier voisin)."""
    env = os.environ.get("HYDRO_INDICATEURS_XLSX")
    p = Path(env) if env else (root / ".." / "fiche indicateur" / MASTER_FILENAME)
    if not p.is_file():
        die(f"Fichier maître des indicateurs introuvable : {p}. Définir HYDRO_INDICATEURS_XLSX.")
    return p


def ensure_clean(target: Path) -> None:
    if target.exists():
        if target.is_dir() and not target.is_symlink():
            shutil.rmtree(target)
        else:
            target.unlink()


def copy_file(src: Path, dst: Path) -> None:
    """Copie un fichier vers dst (cible complète) en créant les répertoires parents."""
    if not src.is_file():
        raise FileNotFoundError(f"source introuvable : {src}")
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)


def copy_dir(src: Path, dst: Path) -> int:
    """Copie récursivement un dossier vers dst ; renvoie le nombre de fichiers copiés."""
    if not src.is_dir():
        raise FileNotFoundError(f"dossier source introuvable : {src}")
    dst.mkdir(parents=True, exist_ok=True)
    shutil.copytree(src, dst, dirs_exist_ok=True)
    return sum(1 for p in dst.rglob("*") if p.is_file())


def render_cdc(root: Path) -> dict[str, tuple[int, int]]:
    """Relance quarto render pour chaque format ; renvoie {fmt: (returncode, taille_octets)}."""
    results: dict[str, tuple[int, int]] = {}
    for fmt in FORMATS:
        out = CDC_OUT / f"index.{fmt}"
        log(f"[render] quarto render {CDC_DIR}/index.qmd --to {fmt} ...")
        proc = subprocess.run(["quarto", "render", f"{CDC_DIR}/index.qmd", "--to", fmt], cwd=root)
        size = out.stat().st_size if out.is_file() else 0
        results[fmt] = (proc.returncode, size)
        log(f"[render] {fmt}: rc={proc.returncode}, fichier {'présent' if out.is_file() else 'ABSENT'} ({size} o)")
    return results


def build_pack(root: Path, pack_dir: Path) -> None:
    """Assemble la miroir du pack depuis les sources (liens relatifs préservés)."""
    cdc_pack = pack_dir / CDC_DIR

    # 1. CDC : index.{html,pdf,docx} dans le sous-dossier 'cahier des charges/'.
    #    Noms conservés : l'HTML référence ses voisins index.pdf / index.docx.
    for fmt in FORMATS:
        src = CDC_OUT / f"index.{fmt}"
        if src.is_file():
            copy_file(src, cdc_pack / f"index.{fmt}")

    # 5. Fichiers référencés par l'HTML dans le même dossier :
    #    './2bis_profils_utilisateurs.qmd' et './7bis_dependances_us.qmd' ; backlog.xlsx
    #    (template de réponse à compléter, colonne « Point d'effort prestataire ») ajouté pour cohérence.
    for name in ("2bis_profils_utilisateurs.qmd", "7bis_dependances_us.qmd", "backlog.xlsx"):
        copy_file(CDC_SRC / name, cdc_pack / name)

    # 2. annexes/ (7 fichiers listés) + fichier maître des indicateurs (source unique).
    for name in ANNEXES:
        copy_file(CDC_SRC / "annexes" / name, cdc_pack / "annexes" / name)
    copy_file(master_indicateurs_path(root), cdc_pack / "annexes" / MASTER_FILENAME)

    # 3. specifications/ : tous les .qmd.
    specs_pack = cdc_pack / "specifications"
    n_spec = 0
    for qmd in sorted((CDC_SRC / "specifications").glob("*.qmd")):
        copy_file(qmd, specs_pack / qmd.name)
        n_spec += 1

    # 4. epics/ : tous les .qmd.
    epics_pack = cdc_pack / "epics"
    n_epics = 0
    for qmd in sorted((CDC_SRC / "epics").glob("*.qmd")):
        copy_file(qmd, epics_pack / qmd.name)
        n_epics += 1

    # 6. Fichier maître des indicateurs ignoré ici : copié à l'étape 2 (annexes/).

    # 7. analyse_architecture_donnees_geographique_decisionnelle.md (à la racine du pack).
    copy_file(ANALYSE_SRC, pack_dir / ANALYSE_SRC.name)

    # 8. specs UX : figma-design/docs/specs + figma-design/docs/help (arborescence miroir).
    n_ux = copy_dir(FIGMA_SPECS_SRC, pack_dir / FIGMA_SPECS_SRC) if FIGMA_SPECS_SRC.is_dir() else 0
    n_help = copy_dir(FIGMA_HELP_SRC, pack_dir / FIGMA_HELP_SRC) if FIGMA_HELP_SRC.is_dir() else 0

    log(
        f"[pack] CDC 3 fichiers · {len(ANNEXES)}+1 annexes (dont maître xlsx) · {n_spec} spécifications · "
        f"{n_epics} epics · {n_ux} specs UX · {n_help} fichiers d'aide"
    )


def scan_html_links(root: Path, pack_dir: Path) -> tuple[list[str], list[str], list[str]]:
    """Analyse les href/src relatifs de l'index.html final du pack.

    Copie les cibles manquantes depuis les sources quand c'est possible (racine du projet,
    puis _output/). Renvoie (liens_ok, copies_effectuees, liens_casses).
    """
    html_file = pack_dir / CDC_DIR / "index.html"
    if not html_file.is_file():
        return [], [], [f"{CDC_DIR}/index.html (HTML manquant dans le pack)"]

    html = html_file.read_text(encoding="utf-8")
    html_dir = html_file.parent

    ok: list[str] = []
    copied: list[str] = []
    broken: list[str] = []
    seen: set[Path] = set()

    for match in REFS_RE.finditer(html):
        raw = match.group(1).strip()
        ref = unquote(raw.split("#", 1)[0].split("?", 1)[0].strip())
        if not ref or ref.startswith(SKIP_PREFIXES):
            continue
        target = (html_dir / ref).resolve()
        try:
            rel = target.relative_to(pack_dir)
        except ValueError:
            broken.append(f"{raw} (résout hors du pack)")
            continue
        if target in seen:
            continue
        seen.add(target)

        if target.exists():
            ok.append(str(rel))
            continue

        # Cible manquante : essayer de copier depuis les sources.
        source = next((c for c in (root / rel, root / "_output" / rel, CDC_OUT / rel) if c.is_file()), None)
        if source is not None:
            try:
                copy_file(source, target)
                copied.append(f"{rel} (copié depuis {source.relative_to(root)})")
                ok.append(str(rel))
                continue
            except OSError as exc:
                broken.append(f"{raw} (copie impossible : {exc})")
                continue
        broken.append(f"{raw} (cible absente : {rel})")

    return ok, copied, broken


def render_summary(render_results: dict[str, tuple[int, int]]) -> list[str]:
    lines = ["| Format | Résultat | Taille |", "|---|---|---|"]
    for fmt in FORMATS:
        rc, size = render_results[fmt]
        if rc == 0 and size > 0:
            status = f"OK"
        elif rc == 0:
            status = "OK (fichier vide absent ?)"
        else:
            status = f"ÉCHEC (rc={rc})"
        size_txt = f"{size} o" if size else "—"
        lines.append(f"| {fmt} | {status} | {size_txt} |")
    return lines


def write_report(root: Path, pack_dir: Path, date_str: str, command_used: str,
                 render_results: dict[str, tuple[int, int]],
                 ok: list[str], copied: list[str], broken: list[str]) -> Path:
    lines: list[str] = []
    lines += [
        "# RAPPORT — Pack Offre HydroScope",
        "",
        f"Date de génération : `{date_str}`",
        f"Commande utilisée : `{command_used}`",
        "",
    ]

    lines += [
        "## Contenu du pack",
        "",
        "1. `cahier des charges/` — les trois rendus frais du CDC (`index.html`, `index.pdf`, `index.docx`), "
        "ainsi que `2bis_profils_utilisateurs.qmd`, `7bis_dependances_us.qmd`, `backlog.xlsx` et les sous-dossiers "
        "`annexes/` (fiches PDF, arbre HTML, critères + fichier maître `fiches indicateurs.xlsx`), "
        "`specifications/` (tous les `.qmd`) et `epics/` (tous les `.qmd`).",
        "2. `analyse_architecture_donnees_geographique_decisionnelle.md` (source `reponse_prestataire/`).",
        "3. `figma-design/docs/specs/` et `figma-design/docs/help/` — specs UX (arborescence miroir).",
        "",
    ]

    lines += [
        "## Choix de structure — préservation des liens relatifs de l'HTML",
        "",
        "L'analyse des `href`/`src` de `index.html` (rendu Quarto, `embed-resources: true`) montre que le "
        "document référence des ressources par **chemins relatifs** depuis son propre répertoire :",
        "",
        "- `index.pdf`, `index.docx` — téléchargement des versions pdf/docx, même dossier ;",
        "- `./7bis_dependances_us.qmd`, `./2bis_profils_utilisateurs.qmd` — même dossier ;",
        "- `./annexes/{Fiches_indicateurs_HydroScope-v4.pdf,arbre_indicateurs.html}` — fiches et arbre ;",
        "",
        "**Décision :** placer les trois rendus dans un sous-dossier `cahier des charges/` **sans les "
        "renommer** (garder `index.{html,pdf,docx}`). Le renommage proposé `Cahier_des_charges.*` aurait "
        "cassé les liens internes `index.pdf` / `index.docx`. Les fichiers `7bis_dependances_us.qmd` et "
        "`2bis_profils_utilisateurs.qmd` sont placés à côté de l'HTML (référencés en relatif), et `backlog.xlsx` "
        "les accompagne pour cohérence. Le fichier maître `fiches indicateurs.xlsx` (source unique des "
        "indicateurs, résolu via `HYDRO_INDICATEURS_XLSX` ou le dossier voisin `fiche indicateur/`) est "
        "copié dans `annexes/`. Comme l'HTML embarque CSS/JS/images (`embed-resources`), uniquement les "
        "fichiers ci-dessus doivent être copiés (étape de scan supplémentaire pour ne rien oublier).",
        "",
    ]

    lines += ["## Résultats des rendus Quarto", ""]
    lines += render_summary(render_results)
    lines.append("")

    lines += [
        "## Vérification des liens de l'HTML du pack",
        "",
        f"- Liens internes vérifiés (présents) : **{len(ok)}**",
        f"- Ressources copiées depuis les sources lors du scan : **{len(copied)}**",
        f"- Liens cassés restants : **{len(broken)}**",
        "",
    ]
    if copied:
        lines += ["Copié lors du scan :", ""]
        lines += [f"- {c}" for c in copied]
        lines.append("")
    if broken:
        lines += ["Liens cassés :", ""]
        lines += [f"- {b}" for b in broken]
        lines += [
            "",
            "> Les ressources référencées par l'HTML doivent toutes être présentes dans le pack ; un lien "
            "« hors pack » ou absent doit être corrigé côté source (rendu ou module de données).",
            "",
        ]
    else:
        lines += ["Aucun lien cassé restant (0 = OK).", ""]

    lines += ["## Structure du pack", ""]
    lines += ["```"]
    lines += pack_tree(pack_dir)
    lines += ["```"]

    report = pack_dir / "RAPPORT.md"
    report.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return report


def pack_tree(pack_dir: Path) -> list[str]:
    out: list[str] = []

    def walk(d: Path, prefix: str) -> None:
        entries = sorted(d.iterdir(), key=lambda p: (p.is_file(), p.name.lower()))
        for p in entries:
            if p.is_file():
                out.append(f"{prefix}{p.name}  ({p.stat().st_size} o)")
            else:
                out.append(f"{prefix}{p.name}/")
                walk(p, prefix + "  ")

    walk(pack_dir, "")
    return out


def make_zip(root: Path, pack_dir: Path, date_str: str) -> Path:
    zip_target = root / "releases" / f"{date_str}_offre.zip"
    ensure_clean(zip_target)
    with zipfile.ZipFile(zip_target, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in sorted(pack_dir.rglob("*")):
            if f.is_file():
                zf.write(f, f.relative_to(root / "releases"))
    return zip_target


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description="Package l'offre HydroScope complète (CDC + annexes + ressources).")
    parser.add_argument("--skip-render", action="store_true",
                        help="Ne relance pas quarto render (utilise les fichiers _output existants).")
    args = parser.parse_args(argv)

    root = find_root()
    date_str = date.today().strftime("%Y%m%d")
    pack_dir = root / "releases" / f"{date_str}_offre"
    command_used = f"conda run -n reponse python scripts/compile_offre.py{' --skip-render' if args.skip_render else ''}"

    if args.skip_render:
        log("[render] --skip-render : fichiers _output actuels utilisés.")
        render_results: dict[str, tuple[int, int]] = {}
        for fmt in FORMATS:
            f = CDC_OUT / f"index.{fmt}"
            render_results[fmt] = (0 if f.is_file() else 1, f.stat().st_size if f.is_file() else 0)
    else:
        if shutil.which("quarto") is None:
            die("`quarto` introuvable dans le PATH.")
        render_results = render_cdc(root)

    ensure_clean(pack_dir)
    pack_dir.mkdir(parents=True, exist_ok=True)
    log(f"[pack] création {pack_dir.relative_to(root)}")

    build_pack(root, pack_dir)
    ok, copied, broken = scan_html_links(root, pack_dir)
    report = write_report(root, pack_dir, date_str, command_used, render_results, ok, copied, broken)
    log(f"[rapport] {report.relative_to(root)}")

    zip_path = make_zip(root, pack_dir, date_str)
    n_file = sum(1 for p in pack_dir.rglob("*") if p.is_file())
    log(f"[zip] {zip_path.relative_to(root)} · {zip_path.stat().st_size} o ({n_file} fichiers)")
    log(f"[scan html] OK={len(ok)} · copiés={len(copied)} · cassés={len(broken)}")
    for b in broken:
        log(f"  lien cassé : {b}")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
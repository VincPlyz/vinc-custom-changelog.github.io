import os
import requests
import argparse
from datetime import datetime

BASE_URL = "https://launchercontent.mojang.com/v2/"
MANIFEST_URL = BASE_URL + "javaPatchNotes.json"
CHANGELOG_DIR = "content/changelog"

def fetch_patch_notes():
    resp = requests.get(MANIFEST_URL)
    resp.raise_for_status()
    return resp.json()["entries"]

def generate_markdown(entry, dry_run=False):
    version = entry["version"]
    body_url = BASE_URL + entry["contentPath"]
    body_data = requests.get(body_url).json()
    content = body_data.get("body", "")

    file_path = os.path.join(CHANGELOG_DIR, f"{version}.md")
    md_text = f"""---
title: "{version} Changelog"
date: {datetime.now().strftime('%Y-%m-%d')}
---

{content}
"""

    if dry_run:
        print(f"[Dry-Run] Würde Datei erzeugen: {file_path}")
    else:
        os.makedirs(CHANGELOG_DIR, exist_ok=True)
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(md_text)
        print(f"✔ {version} gespeichert unter {file_path}")

def update_index(entries, dry_run=False):
    index_path = os.path.join(CHANGELOG_DIR, "_index.md")
    lines = ["---", "title: Changelog Übersicht", "---", ""]

    for e in entries:
        lines.append(f"- {e['version']} → /changelog/{e['version']}/")

    content = "\n".join(lines)

    if dry_run:
        print(f"[Dry-Run] Würde Index-Datei aktualisieren: {index_path}")
    else:
        with open(index_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"✔ Index-Datei aktualisiert")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="Simuliert nur, ohne Dateien zu schreiben")
    args = parser.parse_args()

    entries = fetch_patch_notes()
    latest_entries = entries[:5]  # nur die neuesten 5 zum Testen

    for e in latest_entries:
        generate_markdown(e, dry_run=args.dry_run)
    update_index(latest_entries, dry_run=args.dry_run)

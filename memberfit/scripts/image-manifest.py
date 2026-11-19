"""Erzeugt src/data/images.json: Breite/Höhe jeder WebP-Datei unter public/images.

Aufruf (nach dem Hinzufügen/Ändern von Bildern):  python3 scripts/image-manifest.py
"""
import json
import pathlib
from PIL import Image

root = pathlib.Path(__file__).resolve().parent.parent
base = root / "public" / "images"
manifest = {}
for path in sorted(base.rglob("*.webp")):
    with Image.open(path) as im:
        manifest[path.relative_to(base).as_posix()] = [im.width, im.height]
out = root / "src" / "data" / "images.json"
out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(manifest, indent=1) + "\n")
print(f"{len(manifest)} Bilder -> {out.relative_to(root)}")

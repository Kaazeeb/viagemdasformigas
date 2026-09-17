#!/usr/bin/env python3
"""Verify the published visual contract, reviewed lineage and delivered files."""
import hashlib
import json
from pathlib import Path

from PIL import Image

HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2]
manifest = json.loads((HERE / 'manifest.json').read_text())
raw = (REPO / 'beijing-final-visuals.js').read_text()
visuals = json.loads(raw.split('window.BEIJING_FINAL_VISUALS = ', 1)[1].rstrip().removesuffix(';'))
raw = (REPO / 'beijing-final-data.js').read_text()
base = json.loads(raw.split('window.BEIJING_FINAL = ', 1)[1].rstrip().removesuffix(';'))
steps = {step['id']: step for day in base['days'] for step in day['steps']}
resources = {item['id']: item for item in manifest['resources']}
assert len(resources) == manifest['resourceCount']
delivered = {}
for item in resources.values():
    assert item['sourceStatus'] in ('aprovada-referencia', 'aprovada-complemento'), item['id']
    assert not item['deliveryReview'].startswith('Preparado;'), f"Review missing: {item['id']}"
    for file in item['files']:
        path = REPO / file['path']
        assert path.is_file(), path
        assert path.stat().st_size == file['bytes'], path
        assert hashlib.sha256(path.read_bytes()).hexdigest() == file['sha256'], path
        with Image.open(path) as im:
            assert im.size == (file['width'], file['height']), path
            assert im.format == file['format'], path
            im.verify()
        delivered[file['path']] = file
    if len(item['files']) == 2:
        assert item['files'][-1]['sha256'] == item['sourceSha256'], item['id']

used = set()
for placement in [visuals['hotel'], *visuals['steps'].values()]:
    items = list(placement.get('photos', []))
    items += [placement[key] for key in ('map', 'referenceMap') if placement.get(key)]
    for item in items:
        used.add(item['assetId'])
        assert item['assetId'] in resources, item['assetId']
        assert item['src'] in delivered and item['originalSrc'] in delivered, item['assetId']
        assert item['alt'] and item['caption'] and item['credit'], item['assetId']
        assert item['page'].startswith('https://') or item['assetId'] == 'extlog-pek-t2-fluxo-embarque', item['assetId']
        assert item['width'] == delivered[item['src']]['width'], item['assetId']
        assert item['height'] == delivered[item['src']]['height'], item['assetId']

assert used == set(resources), 'Unused resource copied or selected resource missing'
assert set(visuals['steps']).issubset(steps), 'Unknown itinerary step'
visits = [key for key, step in steps.items() if step['type'] == 'visit']
assert len(visits) == 16
for key in visits:
    assert 1 <= len(visuals['steps'].get(key, {}).get('photos', [])) <= 3, key
assert visuals['steps']['25-jingshan']['referenceMap'] is False
assert visuals['steps']['24-lama']['referenceMap']['assetId'] == 'dia24-lama-planta-bilingue'
assert '25-qianmen-foto-01' not in used
assert 'mutianyu-equipamentos' not in used
assert sum(file['bytes'] for file in delivered.values()) == manifest['deliveredBytes']
print(f"OK: {len(resources)} approved resources, {len(delivered)} image files, {len(visits)} visits, {len(visuals['steps'])} step placements; hashes, dimensions, reviews and references checked.")

#!/usr/bin/env python3
"""Prepare selected, already reviewed images; requires Pillow with WebP support.

Run from any directory, passing the support collection with --collection if it
is not beside this worktree. This performs delivery encoding only: no crops,
retouching, added labels, AI generations or geometry changes.
"""
import argparse
import hashlib
import json
from pathlib import Path
import shutil
from urllib.parse import urlparse

from PIL import Image, ImageOps

LANCZOS = getattr(Image, 'Resampling', Image).LANCZOS
HERE = Path(__file__).resolve().parent
REPO = HERE.parents[2]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--collection', type=Path, default=REPO.parent / 'apoio' / 'recursos-visuais-pequim-2026-09-16')
args = parser.parse_args()
collection = args.collection.resolve()
selection = json.loads((HERE / 'selection.json').read_text())
catalog_file = collection / 'catalogo.json'
catalog = {a['id']: a for a in json.loads(catalog_file.read_text())}
manifest = []
maps, photos = {}, {}


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def file_info(path):
    with Image.open(path) as im:
        im.verify()
    with Image.open(path) as im:
        return {'path': path.relative_to(REPO).as_posix(), 'width': im.width,
                'height': im.height, 'bytes': path.stat().st_size,
                'sha256': sha(path), 'format': im.format}


def source_url(asset, seen=None):
    if asset.get('source_page'):
        # A local support snapshot is provenance, not a public source URL.
        return asset['source_page'] if asset['source_page'].startswith('https://') else ''
    seen = set() if seen is None else seen
    seen.add(asset['id'])
    for parent in asset.get('origem_ids', []):
        if parent in catalog and parent not in seen:
            value = source_url(catalog[parent], seen)
            if value:
                return value
    return ''


def prepare(asset_id, is_map):
    a = catalog[asset_id]
    assert a['status'] in ('aprovada-referencia', 'aprovada-complemento'), asset_id
    original = collection / a['arquivo']
    assert sha(original) == a['sha256_revisado'] == a['sha256'], f'Review hash differs: {asset_id}'
    with Image.open(original) as opened:
        im = ImageOps.exif_transpose(opened).convert('RGB')
    destination = HERE / ('maps' if is_map else 'photos')
    destination.mkdir(exist_ok=True)
    if is_map:
        # The detailed version is the byte-for-byte reviewed image.
        detailed = destination / (asset_id + original.suffix.lower())
        shutil.copyfile(original, detailed)
        preview = destination / (asset_id + '-preview.webp')
        im.thumbnail((1100, 1550), LANCZOS)
        im.save(preview, 'WEBP', quality=92, method=6)
        files = [file_info(preview), file_info(detailed)]
        operation = 'PNG/JPEG detalhado copiado byte a byte; preview WebP qualidade 92, até 1100×1550, proporção integral, sem corte ou retoque.'
    else:
        detailed = preview = destination / (asset_id + '.webp')
        if original.suffix.lower() == '.webp' and max(im.size) <= 1600 and original.stat().st_size < 150000:
            shutil.copyfile(original, detailed)
            operation = 'WebP já adequado à entrega: bytes preservados.'
        else:
            im.thumbnail((1600, 1600), LANCZOS)
            im.save(detailed, 'WEBP', quality=80, method=6)
            operation = 'Conversão técnica WebP qualidade 80, até 1600 px no lado maior, orientação EXIF aplicada, proporção integral, sem corte ou retoque.'
        files = [file_info(detailed)]
    entry = {
        'id': asset_id, 'category': a['categoria'], 'type': a['tipo'],
        'sourceCollection': collection.name, 'sourceFile': a['arquivo'],
        'sourceSha256': sha(original), 'sourceWidth': a['dimensoes']['largura'],
        'sourceHeight': a['dimensoes']['altura'], 'sourcePage': a.get('source_page'),
        'sourceImage': a.get('source_image'), 'credit': a.get('credito', a.get('credit', '')),
        'sourcePhotoDate': a.get('data_foto', a.get('data_imagem')),
        'parentIds': a.get('origem_ids', []), 'sourceChanges': a.get('alteracoes'),
        'sourceMethod': a.get('metodo', a.get('ferramenta')),
        'sourceStatus': a['status'], 'sourceReviewedAt': a.get('revisada_em'),
        'sourceReview': a.get('verificacao_visual'), 'limitations': a.get('limites'),
        'deliveryOperation': operation, 'files': files,
        'deliveryReview': 'Preparado; conferir visualmente antes de integrar.'
    }
    manifest.append(entry)
    url = source_url(a)
    credit = a.get('credito', a.get('credit'))
    if not credit:
        credit = ('Diagrama/composição do roteiro; fontes no manifesto.'
                  if a['categoria'] != 'originais-online' else 'Fonte: ' + urlparse(url).netloc)
    return {
        'assetId': asset_id, 'src': files[0]['path'], 'originalSrc': files[-1]['path'],
        'width': files[0]['width'], 'height': files[0]['height'],
        'originalWidth': files[-1]['width'], 'originalHeight': files[-1]['height'],
        'credit': credit, 'page': url
    }


for asset_id, title, caption, kind in selection['maps'] + selection.get('referenceMaps', []):
    data = prepare(asset_id, True)
    a = catalog[asset_id]
    label = {'criadas': 'Esquema próprio · referências consultadas',
             'editadas': 'Composição anotada · fonte da base',
             'originais-online': 'Planta publicada · fonte original'}[a['categoria']]
    if not data['page']:
        label = 'Roteiro informado pelo grupo · conferir voo e terminal'
    maps[asset_id] = {**data, 'title': title, 'alt': title + '. ' + caption,
                     'caption': caption, 'sourceLabel': label,
                     'sourceUrl': data['page'], 'kind': kind}

for asset_id, caption in selection['photos']:
    data = prepare(asset_id, False)
    photos[asset_id] = {**data, 'alt': caption, 'caption': caption}


def resolve_placement(placement):
    result = {}
    if 'map' in placement:
        result['map'] = maps[placement['map']]
    if 'referenceMap' in placement:
        value = placement['referenceMap']
        result['referenceMap'] = False if value is False else maps[value]
    if 'photos' in placement:
        result['photos'] = [photos[key] for key in placement['photos']]
    return result


visuals = {'updatedAt': '17/09/2026', 'manifest': 'assets/itinerary/guide/manifest.json',
           'hotel': resolve_placement(selection['hotel']),
           'steps': {key: resolve_placement(value) for key, value in selection['steps'].items()}}
(REPO / 'beijing-final-visuals.js').write_text(
    '/* Seleção visual revisada; geração: assets/itinerary/guide/prepare.py. */\n'
    'window.BEIJING_FINAL_VISUALS = ' + json.dumps(visuals, ensure_ascii=False, indent=2) + ';\n')

# Include metadata for ancestors, including rejected drafts, but never their
# image files. This explains how an accepted later revision was produced.
ancestors = {}
def lineage(asset_id):
    for parent in catalog[asset_id].get('origem_ids', []):
        if parent in catalog and parent not in ancestors:
            a = catalog[parent]
            ancestors[parent] = {key: a.get(key) for key in (
                'id', 'arquivo', 'categoria', 'tipo', 'source_page', 'source_image',
                'credito', 'sha256', 'dimensoes', 'origem_ids', 'status',
                'alteracoes', 'verificacao_visual', 'limites')}
            lineage(parent)
for asset_id in [a['id'] for a in manifest]:
    lineage(asset_id)

manifest_path = HERE / 'manifest.json'
# Preserve explicit reviews when all delivered bytes still match.
if manifest_path.exists():
    old = {a['id']: a for a in json.loads(manifest_path.read_text())['resources']}
    for a in manifest:
        previous = old.get(a['id'], {})
        if previous.get('files') == a['files']:
            a['deliveryReview'] = previous.get('deliveryReview', a['deliveryReview'])

result = {'version': 1, 'preparedAt': '2026-09-17',
          'collectionCatalogSha256': sha(catalog_file),
          'selectionSha256': sha(HERE / 'selection.json'),
          'resourceCount': len(manifest), 'mapCount': len(maps),
          'photoCount': len(photos),
          'deliveredBytes': sum(f['bytes'] for a in manifest for f in a['files']),
          'resources': manifest, 'ancestorMetadataOnly': list(ancestors.values())}
manifest_path.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')

lines = ['# Recursos de orientação do roteiro final de Pequim', '',
    'Seleção preparada em 17/09/2026 a partir do acervo revisado em `apoio/recursos-visuais-pequim-2026-09-16/`.', '',
    f"São {len(manifest)} recursos únicos: {len(maps)} plantas/diagramas/cartões e {len(photos)} fotografias. As variantes locais somam {result['deliveredBytes'] / 1024 / 1024:.2f} MiB; entram conforme a etapa, com mapas detalhados abertos sob demanda.", '',
    '## Como foram preparados', '',
    '- `maps/`: PNGs/JPEGs detalhados idênticos aos arquivos aprovados, mais previews WebP leves. Fontes chinesas já estão renderizadas nos pixels; nenhum SVG é necessário no celular.',
    '- `photos/`: arquivos WebP integrais, sem corte, setas, remoções ou retoques. Fotos maiores foram limitadas a 1600 px para entrega; os downloads integrais permanecem no acervo de apoio e suas URLs estão no manifesto.',
    '- `selection.json`: escolha editorial, legendas de orientação e associação às etapas.',
    '- `manifest.json`: arquivos, dimensões, hashes de entrada/saída, autoria quando disponível, fontes online, categoria de origem, alterações anteriores, limites e resultados de revisão. Metadados de ancestrais explicam as versões; imagens pendentes/reprovadas não são copiadas.',
    '- `prepare.py`: reprodução da seleção e codificação técnica com Pillow/WebP, sem rede. Exemplo: `python3 assets/itinerary/guide/prepare.py --collection /caminho/para/apoio/recursos-visuais-pequim-2026-09-16`.',
    '- `beijing-final-visuals.js`, na raiz: contrato consumido pela página. Não altera o roteiro-base; mapas oficiais anteriores podem continuar acessíveis como referências separadas.', '',
    '## Escolhas e limites', '',
    'Somente recursos aprovados foram selecionados. Aprovação indica utilidade visual para o uso declarado; não certifica operação de saídas, acessibilidade, portões, controles, obras ou equipamentos no dia da visita.', '',
    'A planta com retas editoriais de Jingshan é suprimida (`referenceMap:false`). O Lama recebe uma planta bilíngue de referência em lugar da imagem original de apenas 328 px. A foto ambígua atribuída a Qianmen foi substituída pelo pailou identificado; Qianmen e Dashilar têm legendas explícitas de perspectiva. Equipamentos de Mutianyu são comparados sem equiparar controle sul das trilhas à entrada da cadeirinha.', '',
    'As plantas de referência e as composições próprias permanecem distintas. Números, símbolos, ruas esquemáticas e sequência de visita não representam uma trilha contínua comprovada. A2/F/E3 e Taihemen exigem conferência da sinalização/operador; nenhum desvio foi inventado.', '',
    '## Fontes e proveniência de cada recurso', '',
    '| Recurso | Origem e fonte | Arquivo detalhado |',
    '|---|---|---|']
for a in manifest:
    url = source_url(catalog[a['id']])
    origin = {'criadas': 'Criação própria', 'editadas': 'Edição/composição', 'originais-online': 'Original online'}[a['category']]
    source = f'[{urlparse(url).netloc}]({url})' if url else 'Dados do roteiro informados pelo grupo; confirmar voo e terminal'
    final_file = Path(a['files'][-1]['path']).relative_to('assets/itinerary/guide')
    lines.append(f"| `{a['id']}` | {origin} · {source} | [Abrir]({final_file}) |")
(HERE / 'SOURCES.md').write_text('\n'.join(lines) + '\n')
print(json.dumps({key: result[key] for key in ('resourceCount', 'mapCount', 'photoCount', 'deliveredBytes')}, indent=2))

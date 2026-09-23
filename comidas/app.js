(function () {
  'use strict';
  const STORAGE_KEY = 'rota-china.comidas-pequim.v1';
  const SCHEMA = 'rota-china.comidas-pequim';
  const CATEGORIES = { comida: 'Comida', bebida: 'Bebida', doce: 'Doce' };
  const MAX_IMPORT_SIZE = 200000;

  function normalize(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  }

  function safeExternalUrl(value) {
    try {
      const url = new URL(value);
      return /^https?:$/.test(url.protocol) ? url.href : '';
    } catch (_) { return ''; }
  }

  function safePhotoPath(value) {
    return typeof value === 'string' && /^fotos\/[a-z0-9][a-z0-9._-]*\.(?:jpe?g|png|webp|avif)$/i.test(value) ? value : '';
  }

  function textValue(value) {
    return Array.isArray(value) ? value.filter(item => typeof item === 'string').join('\n') : typeof value === 'string' ? value : '';
  }

  function validateChoices(payload, ids) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload) || payload.schema !== SCHEMA || payload.version !== 1 || !payload.choices || typeof payload.choices !== 'object' || Array.isArray(payload.choices)) {
      throw new Error('Arquivo inválido. Use um checklist exportado por esta página.');
    }
    const valid = new Set(ids);
    const choices = Object.create(null);
    let ignored = 0;
    for (const [id, value] of Object.entries(payload.choices)) {
      if (!valid.has(id)) { ignored++; continue; }
      if (typeof value !== 'boolean') throw new Error('Arquivo inválido: cada marcação deve ser verdadeira ou falsa.');
      choices[id] = value;
    }
    return { choices, ignored };
  }

  function makePayload(choices, ids, now = new Date().toISOString()) {
    const result = Object.create(null);
    for (const id of ids) result[id] = choices[id] === true;
    return { schema: SCHEMA, version: 1, exportedAt: now, choices: result };
  }

  function matches(item, choices, query, category, status) {
    if (category !== 'all' && item.category !== category) return false;
    const tried = choices[item.id] === true;
    if ((status === 'pending' && tried) || (status === 'tried' && !tried)) return false;
    const haystack = normalize([item.name, item.nameZh, item.pinyin, item.description, textValue(item.whereToTry), textValue(item.notes)].join(' '));
    return normalize(query).trim().split(/\s+/).every(word => haystack.includes(word));
  }

  const api = { STORAGE_KEY, SCHEMA, MAX_IMPORT_SIZE, normalize, safeExternalUrl, safePhotoPath, textValue, validateChoices, makePayload, matches };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const data = window.COMIDAS_PEQUIM;
  const feedback = document.getElementById('feedback');
  function inform(message, error = false) {
    feedback.textContent = message;
    feedback.dataset.error = String(error);
    feedback.hidden = false;
  }
  if (!data || !Array.isArray(data.items) || !data.items.length) {
    document.getElementById('progress-label').textContent = 'Não foi possível carregar o checklist.';
    inform('O arquivo comidas/dados.js não foi carregado. Mantenha-o junto dos demais arquivos desta página.', true);
    return;
  }
  const items = data.items;
  const ids = items.map(item => item.id);
  if (new Set(ids).size !== ids.length || ids.some(id => typeof id !== 'string' || !/^[a-z0-9][a-z0-9-]*$/.test(id))) {
    document.getElementById('progress-label').textContent = 'Checklist indisponível.';
    inform('Os dados têm identificadores inválidos ou repetidos.', true);
    return;
  }
  let choices = Object.create(null);
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) choices = validateChoices(JSON.parse(saved), ids).choices;
  } catch (_) {
    inform('Não foi possível ler as marcações salvas. Você pode usar e exportar o checklist nesta sessão.', true);
  }

  const list = document.getElementById('food-list');
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const status = document.getElementById('status-filter');
  const cards = new Map();

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }

  function externalLink(text, href) {
    const safe = safeExternalUrl(href);
    if (!safe) return null;
    const link = node('a', '', text);
    link.href = safe;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  }

  function persist() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(makePayload(choices, ids)));
      inform('Checklist salvo neste navegador.');
      return true;
    } catch (_) {
      inform('O navegador não permitiu salvar. As marcações continuam nesta sessão; use Exportar checklist para guardá-las.', true);
      return false;
    }
  }

  function update() {
    const tried = ids.filter(id => choices[id] === true).length;
    document.getElementById('progress-label').textContent = `${tried} de ${items.length} provados · ${items.length - tried} pendentes`;
    const progress = document.getElementById('progress');
    progress.max = items.length;
    progress.value = tried;
    let visible = 0;
    for (const item of items) {
      const { card, checkbox, label } = cards.get(item.id);
      const checked = choices[item.id] === true;
      checkbox.checked = checked;
      label.textContent = checked ? 'Já provei' : 'Marcar como provado';
      card.classList.toggle('is-tried', checked);
      card.hidden = !matches(item, choices, search.value, category.value, status.value);
      if (!card.hidden) visible++;
    }
    document.getElementById('results-count').textContent = `${visible} de ${items.length} itens exibidos`;
    document.getElementById('empty-state').hidden = visible !== 0;
  }

  async function copyName(name, button, parent) {
    try {
      if (!window.navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard indisponível');
      await window.navigator.clipboard.writeText(name);
      inform(`Copiado: ${name}`);
    } catch (_) {
      const input = node('input', 'manual-copy');
      input.value = name;
      input.readOnly = true;
      input.setAttribute('aria-label', 'Nome em chinês para copiar');
      parent.append(input);
      input.focus();
      input.select();
      let copied = false;
      try { copied = !!document.execCommand && document.execCommand('copy'); } catch (_) { /* Seleção manual abaixo. */ }
      if (copied) {
        input.remove();
        button.focus();
        inform(`Copiado: ${name}`);
      } else {
        inform('Nome selecionado: use Ctrl+C ou a opção Copiar do celular.');
        input.addEventListener('blur', () => input.remove(), { once: true });
      }
    }
  }

  for (const item of items) {
    const card = node('article', 'food-card');
    card.id = item.id;
    card.setAttribute('aria-labelledby', `${item.id}-title`);
    const top = node('div', 'card-topline');
    top.append(node('span', 'category', CATEGORIES[item.category] || 'Comida'));
    const checkLabel = node('label', 'check-label');
    const checkbox = node('input');
    checkbox.type = 'checkbox';
    checkbox.id = `tried-${item.id}`;
    checkbox.setAttribute('aria-label', `Já provei: ${item.name}`);
    const checkText = node('span');
    checkLabel.append(checkbox, checkText);
    top.append(checkLabel);
    card.append(top);
    const heading = node('h2', '', item.name);
    heading.id = `${item.id}-title`;
    card.append(heading);
    if (item.regionalOrigin) card.append(node('p', 'origin', item.regionalOrigin));
    if (item.nameZh) {
      const chinese = node('div', 'chinese-name');
      const name = node('p', '', item.nameZh);
      name.lang = 'zh-Hans';
      const button = node('button', 'copy-button', 'Copiar chinês');
      button.type = 'button';
      button.setAttribute('aria-label', `Copiar nome chinês de ${item.name}`);
      button.addEventListener('click', () => copyName(item.nameZh, button, chinese));
      chinese.append(name, button);
      card.append(chinese);
    }
    if (item.pinyin) card.append(node('p', 'pinyin', item.pinyin));
    card.append(node('p', 'description', item.description));
    const photos = node('div', 'photos');
    for (const photo of (item.photos || []).slice(0, 2)) {
      const src = safePhotoPath(photo.src);
      if (!src) continue;
      const figure = node('figure');
      const link = node('a', 'photo-open');
      link.href = src;
      link.target = '_blank';
      link.rel = 'noopener';
      link.setAttribute('aria-label', `Ampliar foto: ${photo.alt || item.name}`);
      const img = node('img');
      img.src = src;
      img.alt = photo.alt || item.name;
      img.loading = 'lazy';
      img.decoding = 'async';
      const caption = node('figcaption');
      if (photo.caption) caption.append(node('span', 'photo-note', photo.caption));
      const source = externalLink('Fonte da foto ↗', photo.sourceUrl);
      if (source) caption.append(source);
      img.addEventListener('error', () => {
        link.hidden = true;
        caption.prepend(node('span', '', 'Foto indisponível. '));
      }, { once: true });
      link.append(img);
      figure.append(link, caption);
      photos.append(figure);
    }
    if (photos.childElementCount) card.append(photos);
    const facts = node('dl', 'facts');
    for (const [label, value] of [['Onde procurar', item.whereToTry], ['Para pedir / família', item.notes]]) {
      const text = textValue(value);
      if (!text) continue;
      const row = node('div');
      row.append(node('dt', '', label), node('dd', '', text));
      facts.append(row);
    }
    card.append(facts);
    const sources = node('details', 'sources');
    const links = node('ul');
    for (const source of item.sources || []) {
      const link = externalLink(source.title || 'Referência', source.url);
      if (!link) continue;
      const li = node('li');
      li.append(link);
      links.append(li);
    }
    if (links.childElementCount) {
      sources.append(node('summary', '', `Fontes (${links.childElementCount})`), links);
      card.append(sources);
    }
    checkbox.addEventListener('change', () => {
      choices[item.id] = checkbox.checked;
      persist();
      update();
      if (card.hidden) {
        const next = Array.from(cards.values()).find(entry => !entry.card.hidden);
        if (next) next.checkbox.focus();
        else status.focus();
      }
    });
    cards.set(item.id, { card, checkbox, label: checkText });
    list.append(card);
  }

  search.addEventListener('input', update);
  category.addEventListener('change', update);
  status.addEventListener('change', update);
  document.getElementById('clear-filters').addEventListener('click', () => {
    search.value = '';
    category.value = 'all';
    status.value = 'all';
    update();
    search.focus();
  });

  document.getElementById('export-choices').addEventListener('click', () => {
    try {
      const blob = new Blob([JSON.stringify(makePayload(choices, ids), null, 2)], { type: 'application/json;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const anchor = node('a');
      anchor.href = url;
      anchor.download = `provar-em-pequim-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 10000);
      inform('Checklist exportado. Guarde o arquivo JSON para importar em outro navegador.');
    } catch (_) { inform('Não foi possível exportar o checklist neste navegador.', true); }
  });

  const fileInput = document.getElementById('import-file');
  document.getElementById('import-choices').addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', async () => {
    const file = fileInput.files && fileInput.files[0];
    fileInput.value = '';
    if (!file) return;
    try {
      if (file.size > MAX_IMPORT_SIZE) throw new Error('Arquivo muito grande. O limite é 200 KB.');
      const result = validateChoices(JSON.parse(await file.text()), ids);
      const count = Object.keys(result.choices).length;
      if (!count) throw new Error('Este arquivo não contém marcações para os itens deste checklist.');
      Object.assign(choices, result.choices);
      const saved = persist();
      update();
      inform(`${count} marcações importadas; as demais foram preservadas.${result.ignored ? ` ${result.ignored} itens de outra lista ignorados.` : ''}${saved ? '' : ' Não foi possível salvar neste navegador; exporte antes de fechar.'}`, !saved);
    } catch (error) {
      inform(error instanceof SyntaxError ? 'Arquivo inválido: não foi possível ler o JSON. Nenhuma marcação foi alterada.' : error.message, true);
    }
  });

  window.addEventListener('storage', event => {
    if (event.key !== STORAGE_KEY) return;
    try {
      choices = event.newValue ? validateChoices(JSON.parse(event.newValue), ids).choices : Object.create(null);
      update();
      inform('Checklist atualizado pelas marcações de outra aba.');
    } catch (_) { inform('As marcações de outra aba não puderam ser lidas; esta aba foi preservada.', true); }
  });

  const date = new Date(data.updatedAt);
  document.getElementById('updated-at').textContent = Number.isNaN(date.getTime()) ? 'Referências em cada item.' : `Referências revisadas em ${date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}.`;
  update();
})();

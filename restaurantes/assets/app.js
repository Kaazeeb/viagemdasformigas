/* Índice leve e fichas sob demanda; sem bibliotecas ou serviços externos. */
(() => {
  'use strict';
  const SCHEMA_VERSION = 1;
  const DISH_PAGE_SIZE = 60;
  // ID e chave históricos preservados para importar as escolhas do piloto original.
  const MEAL_ID = '2026-09-24-almoco';
  const STORAGE_KEY = `restaurantes-pequim:choices:${MEAL_ID}:v1`;
  const STATUSES = Object.freeze({ pending: 'A avaliar', interested: 'Interessante', finalist: 'Finalista', discarded: 'Descartar' });
  const FILTERS = Object.freeze({ all: 'Todas', interested: 'Interessantes', finalist: 'Finalistas', discarded: 'Descartadas', pending: 'A avaliar' });
  const FAMILY_ROLES = Object.freeze({ principal: 'Principal', variacao: 'Para variar', especial: 'Especial' });
  const GROUPS = Object.freeze({ listing: 'IMAGENS DA FICHA', dish: 'FOTOS DE PRATOS', menu: 'CARDÁPIOS', review: 'FOTOS DE AVALIAÇÕES', package: 'IMAGENS DE PACOTES' });
  const numberFormat = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });
  const decimalFormat = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const dataset = window.RESTAURANTES_PILOTO;
  const onDemand = dataset?.loadingMode === 'on-demand-v1';
  let detailLoader = null;
  let selectionVersion = 0;
  const knownIds = new Set();
  const excludedIds = new Set(list(dataset?.excludedRestaurantIds).filter(id => typeof id === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)));
  const rows = new Map();
  const decisions = Object.create(null);
  const dishViews = new Map();
  const regions = new Map();
  let activeRegionId = null;
  let activeFilter = 'all';
  let activeRestaurantId = null;
  let saveTimer;
  let toastTimer;
  let pendingImport = null;
  let pendingImportExcludedCount = 0;
  let activeGallery = null;
  let photoReturnFocus = null;
  let storageAvailable = true;

  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content !== undefined) node.textContent = String(content);
    return node;
  }
  function text(value, fallback = '') { return typeof value === 'string' ? value.trim() : fallback; }
  function list(value) { return Array.isArray(value) ? value : []; }
  function finite(value) { return typeof value === 'number' && Number.isFinite(value); }
  function normalized(value) { return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  function money(value, fallback = 'Não informado') { return finite(value) ? `¥${numberFormat.format(value)}` : fallback; }
  function dishPrice(dish) {
    if (!finite(dish.priceCny)) {
      if (['hidden', 'not_displayed'].includes(dish.priceStatus)) return 'Preço não exibido na página consultada';
      if (dish.priceStatus === 'not_provided') return 'Sem preço na fonte consultada';
      return 'Preço ainda não extraído';
    }
    const price = `${dish.priceType === 'from' ? 'A partir de ' : ''}${money(dish.priceCny)}`;
    return text(dish.priceUnit) ? `${price} / ${dish.priceUnit}` : price;
  }
  function readable(value) { return Array.isArray(value) ? value.map(item => typeof item === 'string' ? item : text(item?.text, text(item?.label))).filter(Boolean).join(' · ') : text(value); }
  function decision(id) { return decisions[id] || { status: 'pending', notes: '', updatedAt: null }; }
  function rich(restaurant) { return restaurant.rich && typeof restaurant.rich === 'object' ? restaurant.rich : {}; }
  function collectedCount(restaurant, key) {
    const summary = restaurant.summaryCounts?.[key];
    if (Number.isInteger(summary) && summary >= 0) return summary;
    if (key === 'packagesDetailed') return list(rich(restaurant).packages).filter(packageDetailed).length;
    if (key === 'menuEntries') return list(rich(restaurant).menus).reduce((total, menu) => total + list(menu.items).length, 0);
    return (key === 'dishes' && !rich(restaurant).dishes ? list(restaurant.dishes) : list(rich(restaurant)[key])).length;
  }
  function family(restaurant) { return restaurant.family && typeof restaurant.family === 'object' ? restaurant.family : {}; }
  function familyRole(restaurant) { return FAMILY_ROLES[family(restaurant).role] || 'Perfil ainda não avaliado'; }
  function budgetLimit() { return finite(dataset.group?.budgetPerAdultCny) && dataset.group.budgetPerAdultCny > 0 ? dataset.group.budgetPerAdultCny : 130; }
  function internationalReferenceBudget() { const value = dataset.group?.internationalReferenceBudgetCny; return finite(value) && value > 0 ? value : 200; }
  function internationalMaximumBudget() { const value = dataset.group?.internationalMaximumAverageCny; return finite(value) && value >= internationalReferenceBudget() ? value : Math.max(250, internationalReferenceBudget()); }
  function internationalOption(restaurant) {
    return restaurant.mealStyle === 'international' && finite(restaurant.priceCny) && restaurant.priceCny > 0
      && (restaurant.priceCny <= internationalReferenceBudget() || (restaurant.budgetException === true && restaurant.priceCny <= internationalMaximumBudget()));
  }
  function budgetLabel(restaurant) {
    if (!finite(restaurant.priceCny) || restaurant.priceCny <= 0) return 'Gasto não confirmado';
    if (restaurant.mealStyle === 'international') {
      if (restaurant.priceCny <= internationalReferenceBudget()) return `Internacional · média até ${money(internationalReferenceBudget())}`;
      if (restaurant.budgetException === true) return `Exceção internacional · média ${money(restaurant.priceCny)}, acima de ${money(internationalReferenceBudget())}`;
      return `Acima da referência internacional de ${money(internationalReferenceBudget())}`;
    }
    return restaurant.priceCny <= budgetLimit() ? `Média até ${money(budgetLimit())}` : 'Acima da referência';
  }
  function matchesProfile(restaurant, profile) {
    if (profile === 'all') return true;
    if (profile === 'international') return internationalOption(restaurant);
    if (profile === 'yunnan') return restaurant.mealStyle === 'yunnan' || /yunnan|云南/.test(normalized(text(restaurant.cuisine)));
    if (profile === 'within-budget') return finite(restaurant.priceCny) && restaurant.priceCny > 0 && restaurant.priceCny <= budgetLimit();
    if (profile === 'over-budget') return finite(restaurant.priceCny) && restaurant.priceCny > budgetLimit();
    return Object.hasOwn(FAMILY_ROLES, profile) && family(restaurant).role === profile;
  }
  function referenceRegionId() { return text(dataset.meal?.regionId, text(dataset.region?.id, 'guozijian-yonghegong')); }
  function belongsToRegion(restaurant, regionId = activeRegionId) {
    const ids = list(restaurant.regionIds);
    return ids.length ? ids.includes(regionId) : regionId === referenceRegionId();
  }
  function regionalRestaurants() { return dataset.restaurants.filter(restaurant => belongsToRegion(restaurant)); }
  function ageLabel(months) {
    if (!finite(months) || months < 0) return 'idade não informada';
    const years = Math.floor(months / 12), remainder = months % 12;
    return [years ? `${years} ${years === 1 ? 'ano' : 'anos'}` : '', remainder ? `${remainder} ${remainder === 1 ? 'mês' : 'meses'}` : ''].filter(Boolean).join(' e ') || 'menos de 1 mês';
  }
  function packageDetailed(item) { return item?.status === 'details'; }
  function dateLabel(value) {
    const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(text(value));
    return match ? `${match[3]}/${match[2]}/${match[1]}` : text(value);
  }
  function safeExternal(value) {
    try { const url = new URL(value); return ['https:', 'http:'].includes(url.protocol) ? url.href : null; } catch { return null; }
  }
  function safePhoto(photo) {
    if (!photo || typeof photo.src !== 'string') return false;
    const path = photo.src.replace(/^\.\//, '');
    return /^imagens\/[a-z0-9][a-z0-9._/-]*$/i.test(path) && path.split('/').every(part => part && part !== '.' && part !== '..');
  }
  function uniquePhotos(value) {
    const seen = new Set();
    return list(value).filter(photo => {
      if (!safePhoto(photo) || seen.has(photo.src)) return false;
      seen.add(photo.src); return true;
    });
  }
  function loosePhotos(restaurant, group) {
    const aliases = { listing: ['listing', 'capa'], dish: ['dish', 'prato'], menu: ['menu'], review: ['review', 'avaliacao'], package: ['package'] };
    return uniquePhotos([...list(restaurant.photos), ...list(rich(restaurant).photos)].filter(photo => aliases[group].includes(photo?.kind)));
  }
  function sourceLink(parent, url, label = 'Fonte online') {
    const source = safeExternal(url);
    if (!source) return;
    const link = element('a', 'source-link', label); link.href = source; link.target = '_blank'; link.rel = 'noopener noreferrer'; parent.append(link);
  }
  function paragraph(parent, value, className = '', language) {
    if (!text(value)) return;
    const p = element('p', className, value); if (language) p.lang = language; parent.append(p); return p;
  }
  function fact(parent, label, value, language) {
    if (value === null || value === undefined || value === '') return;
    const content = element('dd', '', value); if (language) content.lang = language;
    parent.append(element('dt', '', label), content);
  }
  function textList(parent, values, className = 'compact-list') {
    const items = list(values).filter(value => text(value));
    if (!items.length) return;
    const ul = element('ul', className); for (const value of items) ul.append(element('li', '', value)); parent.append(ul);
  }
  function menuPriceReferences(parent, restaurant, dish) {
    if (finite(dish.priceCny)) return;
    for (const reference of list(dish.menuPriceReferences)) {
      const observations = list(reference.observations).filter(item => finite(item.amountCny) && item.amountCny > 0);
      if (!observations.length) continue;
      const box = element('div', 'menu-price-reference');
      paragraph(box, text(reference.requiredDisplayNote, 'Preço de menu fotografado; vigência não confirmada.'), 'coverage-note');
      for (const observation of observations) {
        const unit = text(observation.unit, text(observation.unitZh));
        const weight = finite(observation.weightGrams) ? ` · ${numberFormat.format(observation.weightGrams)} g` : '';
        paragraph(box, `Referência na foto: ${money(observation.amountCny)}${unit ? ` / ${unit}` : ' · porção não informada'}${weight}`, 'item-price');
      }
      const dates = [...new Set([reference.photoTimestampDate, ...observations.map(item => item.photoTimestampDate)].filter(value => text(value)))];
      for (const date of dates) paragraph(box, `Data visível na foto: ${dateLabel(date)}.`, 'muted');
      const photos = uniquePhotos(observations.map(item => ({src: text(item.localPhotoPath).replace(/^restaurantes\//, ''),
        alt: `Cardápio fotografado: ${text(dish.name, text(dish.nameZh, 'preço do prato'))}`, sourceUrl: item.sourceUrl, collectedAt: item.collectedAt})));
      if (photos.length) {
        const button = element('button', 'source-link menu-price-photo', 'Ver foto do cardápio'); button.type = 'button';
        button.addEventListener('click', event => openGallery(restaurant, 'menu', photos, 0, event.currentTarget)); box.append(button);
      } else sourceLink(box, observations[0].sourceUrl, 'Ver foto original do cardápio');
      parent.append(box);
    }
  }
  function original(parent, value, label = 'Texto original em chinês') {
    if (!text(value)) return;
    const details = element('details', 'original-details'); details.append(element('summary', '', label));
    paragraph(details, value, 'original-text', 'zh-Hans'); parent.append(details);
  }
  function photoGrid(parent, restaurant, group, values, className = '') {
    const photos = uniquePhotos(values);
    if (!photos.length) return;
    const grid = element('div', `photo-grid ${className}`.trim());
    const previews = group === 'dish' ? photos.slice(0, 1) : photos;
    previews.forEach((photo, index) => {
      const button = element('button', `photo-button ${group === 'review' ? 'review-photo-button' : ''}`.trim()); button.type = 'button';
      const alt = text(photo.alt, `${GROUPS[group]} · ${restaurant.name} · ${index + 1}`);
      button.setAttribute('aria-label', `Ampliar: ${alt}`);
      const image = element('img'); image.src = photo.src; image.alt = alt; image.loading = 'lazy'; image.decoding = 'async';
      button.append(image, element('span', '', group === 'dish' ? `Ampliar · ${photos.length} ${photos.length === 1 ? 'foto' : 'fotos'}` : alt));
      image.addEventListener('error', () => { image.hidden = true; button.lastElementChild.textContent = `Arquivo ausente: ${alt}`; button.disabled = true; });
      button.addEventListener('click', event => openGallery(restaurant, group, photos, index, event.currentTarget));
      grid.append(button);
    });
    parent.append(grid);
  }
  function coverage(parent, restaurant, key, count) {
    const entry = rich(restaurant).coverage?.[key];
    const status = typeof entry === 'object' ? text(entry.status) : '';
    const note = typeof entry === 'string' ? entry : text(entry?.note);
    const fallback = count ? 'Material coletado nesta consulta; não representa necessariamente todo o conteúdo disponível no Dianping.' : 'Conteúdo ainda não coletado. Isso não significa que o restaurante não o ofereça.';
    const message = element('p', 'coverage-note', note || fallback); message.dataset.status = status;
    if (finite(entry?.totalShown)) message.append(document.createTextNode(` Coletado: ${finite(entry.captured) ? entry.captured : count}; total indicado na fonte: ${entry.totalShown}.`));
    parent.append(message);
  }
  function section(parent, restaurant, key, title, count) {
    const container = element('section', 'detail-section'); container.id = `${restaurant.id}-${key}`;
    const heading = element('div', 'section-title'); heading.append(element('h3', '', title));
    if (finite(count)) heading.append(element('small', '', `${count} ${count === 1 ? 'item coletado' : 'itens coletados'}`));
    container.append(heading); parent.append(container); return container;
  }

  function showToast(message, isError = false) {
    clearTimeout(toastTimer); const toast = $('#toast'); toast.textContent = message; toast.dataset.error = String(isError); toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, isError ? 10000 : 5500);
  }
  function saveMessage(message, warning = false) { $('#save-message').textContent = message; $('#save-status').dataset.state = warning ? 'warning' : 'saved'; }
  function validatePayload(payload) {
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new Error('Escolha um arquivo JSON exportado por esta página.');
    if (payload.schemaVersion !== SCHEMA_VERSION) throw new Error('A versão deste arquivo não é compatível.');
    if (payload.mealId !== MEAL_ID) throw new Error('Este arquivo pertence a outra seleção. Use as escolhas dos restaurantes de Pequim ou do piloto original de 24/09.');
    if (!payload.decisions || typeof payload.decisions !== 'object' || Array.isArray(payload.decisions)) throw new Error('O arquivo não contém uma seleção válida.');
    const entries = Object.entries(payload.decisions);
    if (!entries.length) throw new Error('O arquivo não contém escolhas para importar.');
    const cleaned = Object.create(null);
    for (const [id, value] of entries) {
      if (!knownIds.has(id)) {
        if (excludedIds.has(id)) continue;
        throw new Error('O arquivo inclui um restaurante que não pertence a esta seleção.');
      }
      if (!value || typeof value !== 'object' || Array.isArray(value) || !Object.hasOwn(STATUSES, value.status)) throw new Error('Uma das escolhas tem uma classificação inválida.');
      if (typeof value.notes !== 'string' || value.notes.length > 5000) throw new Error('Uma das observações está ausente ou excede 5.000 caracteres.');
      if (value.updatedAt != null && (typeof value.updatedAt !== 'string' || !Number.isFinite(Date.parse(value.updatedAt)))) throw new Error('Uma das escolhas tem uma data inválida.');
      cleaned[id] = { status: value.status, notes: value.notes, updatedAt: value.updatedAt || null };
    }
    return cleaned;
  }
  function excludedChoicesCount(payload) { return Object.keys(payload.decisions).filter(id => excludedIds.has(id) && !knownIds.has(id)).length; }
  function excludedChoicesNotice(count) { return count ? ` ${count} ${count === 1 ? 'escolha de restaurante retirado foi ignorada' : 'escolhas de restaurantes retirados foram ignoradas'}; as opções mantidas foram preservadas.` : ''; }
  function snapshot() {
    const values = Object.create(null); for (const id of knownIds) values[id] = { ...decision(id) };
    return { schemaVersion: SCHEMA_VERSION, mealId: MEAL_ID, exportedAt: new Date().toISOString(), decisions: values };
  }
  function persist() {
    clearTimeout(saveTimer); saveTimer = null;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot())); storageAvailable = true;
      saveMessage('Escolhas salvas neste navegador. Exporte para guardar ou enviar.');
    } catch { storageAvailable = false; saveMessage('Salvamento no navegador indisponível. Exporte suas escolhas antes de fechar.', true); }
  }
  function restore() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const payload = JSON.parse(saved); Object.assign(decisions, validatePayload(payload));
        saveMessage(`Escolhas anteriores recuperadas.${excludedChoicesNotice(excludedChoicesCount(payload))} Exporte para guardar ou enviar.`);
      }
      const probe = `${STORAGE_KEY}:check`; localStorage.setItem(probe, '1'); localStorage.removeItem(probe);
    } catch { storageAvailable = false; saveMessage('Salvamento no navegador indisponível. Exporte suas escolhas antes de fechar.', true); }
  }

  function createRow(restaurant) {
    const row = element('tr', 'restaurant-row'); row.dataset.id = restaurant.id;
    const nameCell = element('td'); const button = element('button', 'restaurant-open', restaurant.name); button.type = 'button';
    button.setAttribute('aria-controls', 'restaurant-detail'); button.append(element('span', 'table-name-zh', restaurant.nameZh)); button.lastElementChild.lang = 'zh-Hans';
    button.addEventListener('click', () => selectRestaurant(restaurant.id, true)); nameCell.append(button);
    const role = element('span', 'family-role', familyRole(restaurant)); role.dataset.role = text(family(restaurant).role); nameCell.append(role); row.append(nameCell);
    const priceCell = element('td', 'table-number', money(restaurant.priceCny, '—'));
    const budget = element('small', 'budget-label', budgetLabel(restaurant)); budget.dataset.over = String(finite(restaurant.priceCny) && restaurant.priceCny > (restaurant.mealStyle === 'international' ? internationalReferenceBudget() : budgetLimit())); priceCell.append(budget);
    row.append(element('td', 'table-number', finite(restaurant.rating) ? `${decimalFormat.format(restaurant.rating)} / 5` : '—'), priceCell);
    for (const key of ['packages', 'dishes', 'menus', 'reviews']) {
      const count = collectedCount(restaurant, key);
      const cell = element('td', 'table-number', count ? numberFormat.format(count) : 'Não coletado');
      if (key === 'packages' && count) {
        const detailed = collectedCount(restaurant, 'packagesDetailed');
        cell.textContent = `${count} ${count === 1 ? 'identificada' : 'identificadas'}`; cell.append(element('br'), element('small', '', `${detailed} ${detailed === 1 ? 'detalhada' : 'detalhadas'}`));
      }
      cell.title = text(restaurant.collectionNotes?.[key], text(rich(restaurant).coverage?.[key]?.note, 'Quantidade de itens coletados, não o total oferecido pelo restaurante.')); row.append(cell);
    }
    row.append(element('td', 'row-status')); rows.set(restaurant.id, row); syncRow(restaurant.id); return row;
  }
  function syncRow(id) {
    const row = rows.get(id); if (!row) return;
    row.dataset.status = decision(id).status; row.dataset.active = String(activeRestaurantId === id); $('.row-status', row).textContent = STATUSES[decision(id).status];
    $('.restaurant-open', row).setAttribute('aria-expanded', String(activeRestaurantId === id));
  }
  function createDecisionControls(parent, restaurant) {
    const controls = element('div', 'selection-controls');
    const fieldset = element('fieldset', 'decision-fieldset'); fieldset.append(element('legend', '', 'Sua escolha'));
    const options = element('div', 'decision-options');
    for (const [value, label] of Object.entries(STATUSES)) {
      const option = element('label', 'decision-option'); const input = element('input'); input.type = 'radio'; input.name = `decision-${restaurant.id}`; input.value = value; input.checked = decision(restaurant.id).status === value;
      input.addEventListener('change', () => {
        if (!input.checked) return;
        decisions[restaurant.id] = { ...decision(restaurant.id), status: value, updatedAt: new Date().toISOString() };
        syncRow(restaurant.id); updateCounters(); applyFilters(); persist();
      });
      option.append(input, element('span', '', label)); options.append(option);
    }
    fieldset.append(options); controls.append(fieldset);
    const label = element('label', 'notes-label', 'Suas observações');
    const notes = element('textarea', 'personal-notes'); notes.rows = 2; notes.maxLength = 5000; notes.value = decision(restaurant.id).notes; notes.setAttribute('aria-label', `Suas observações sobre ${restaurant.name}`);
    notes.addEventListener('input', () => {
      decisions[restaurant.id] = { ...decision(restaurant.id), notes: notes.value, updatedAt: new Date().toISOString() };
      clearTimeout(saveTimer); if (storageAvailable) saveMessage('Salvando observações…'); saveTimer = setTimeout(persist, 450);
    });
    notes.addEventListener('change', persist); label.append(notes); controls.append(label); parent.append(controls);
  }

  function renderFamily(parent, restaurant) {
    const profile = family(restaurant); const container = section(parent, restaurant, 'family', 'Para nossa família');
    const context = element('p', 'family-context'); context.append(element('strong', '', familyRole(restaurant)), document.createTextNode(` · ${budgetLabel(restaurant)}`)); container.append(context);
    paragraph(container, text(profile.summary, 'Compatibilidade com as preferências da família ainda não avaliada.'));
    const catalog = new Map(list(rich(restaurant).dishes).map(dish => [dish.id, dish]));
    const suggestions = list(profile.childrenDishes).filter(item => item && catalog.has(item.dishId));
    if (suggestions.length) {
      container.append(element('h4', '', 'Pratos para considerar para as crianças'));
      paragraph(container, 'Seleção editorial do catálogo. Confirmar preparo sem pimenta, ingredientes e porção antes de pedir; o nome do prato não garante isso.', 'muted');
      const grid = element('div', 'family-dishes');
      for (const suggestion of suggestions) {
        const dish = catalog.get(suggestion.dishId); const card = element('article', 'family-dish'); card.dataset.dishId = dish.id;
        photoGrid(card, restaurant, 'dish', dish.photos, 'family-dish-photo');
        const content = element('div', 'family-dish-copy'); content.append(element('h4', '', text(dish.name, text(dish.nameZh, 'Prato sem nome'))));
        if (text(dish.nameZh) && text(dish.name)) paragraph(content, dish.nameZh, 'item-title-zh', 'zh-Hans');
        paragraph(content, dishPrice(dish), 'family-dish-price'); menuPriceReferences(content, restaurant, dish); paragraph(content, suggestion.note, 'family-dish-note');
        sourceLink(content, dish.sourceUrl, 'Fonte do prato'); card.append(content); grid.append(card);
      }
      container.append(grid);
    } else paragraph(container, 'Ainda não há pratos do catálogo selecionados para as crianças. Isso não confirma nem exclui opções adequadas.', 'coverage-note');
    if (list(profile.cautions).length) { container.append(element('h4', '', 'Conferir antes de escolher')); textList(container, profile.cautions); }
  }

  function packageContents(parent, items) {
    const groups = new Map();
    for (const item of list(items)) {
      const name = text(item.group, 'Itens informados');
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name).push(item);
    }
    for (const [name, items] of groups) {
      const group = element('section', 'package-content-group'); group.append(element('h4', '', name));
      for (const rule of new Set(items.map(item => text(item.choiceRule)).filter(Boolean))) paragraph(group, rule, 'choice-rule');
      const ul = element('ul', 'compact-list');
      for (const item of items) {
        const li = element('li', '', text(item.name, text(item.nameZh, 'Item sem nome')));
        if (text(item.nameZh) && text(item.name)) { const zh = element('span', '', ` · ${item.nameZh}`); zh.lang = 'zh-Hans'; li.append(zh); }
        if (item.quantity !== null && item.quantity !== undefined && item.quantity !== '') li.append(document.createTextNode(` · ${item.quantity}`));
        if (text(item.quantityZh) && item.quantityZh !== item.quantity) { const zh = element('span', '', ` (${item.quantityZh})`); zh.lang = 'zh-Hans'; li.append(zh); }
        if (finite(item.priceCny)) li.append(document.createTextNode(` · valor informado: ${money(item.priceCny)}`));
        paragraph(li, item.note, 'muted'); ul.append(li);
      }
      group.append(ul); parent.append(group);
    }
  }
  function packageConditions(parent, conditions, title) {
    if (!conditions.length) return;
    parent.append(element('h4', '', title));
    for (const condition of conditions) {
      const p = element('p', 'item-meta'); if (text(condition.label)) p.append(element('strong', '', `${condition.label}: `));
      p.append(document.createTextNode(text(condition.text, text(condition.original, 'Não traduzido')))); parent.append(p);
      if (text(condition.original) && text(condition.text)) original(parent, condition.original);
    }
  }
  function renderPackages(parent, restaurant) {
    const packages = list(rich(restaurant).packages); const container = section(parent, restaurant, 'packages', 'Pacotes e cupons', packages.length); coverage(container, restaurant, 'packages', packages.length);
    const grid = element('div', 'data-grid packages-grid');
    for (const item of packages) {
      const card = element('article', 'data-item package-item'); card.dataset.id = text(item.id);
      const isVoucher = item.kind === 'voucher' || item.kind === 'credit';
      paragraph(card, text(item.offerTypeLabel, isVoucher ? 'Vale-consumo — não é um combo de pratos' : 'Combo / promoção'), 'item-meta');
      card.append(element('h4', '', text(item.title, text(item.titleZh, 'Pacote sem título'))));
      if (text(item.titleZh) && text(item.title)) paragraph(card, item.titleZh, 'item-title-zh', 'zh-Hans');
      const price = element('p', 'item-price', money(item.priceCny)); if (finite(item.originalPriceCny)) price.append(element('span', 'original-price', money(item.originalPriceCny))); card.append(price);
      const fields = element('dl', 'item-facts');
      if (isVoucher) fact(fields, 'Crédito do vale', money(item.valueCny, 'Não discriminado em campo próprio; consultar composição e regras'));
      fact(fields, 'Pessoas', text(item.peopleText, 'Não informado'));
      fact(fields, 'Dias permitidos', text(item.availableDays, text(item.availableDaysZh, 'Não capturado')));
      if (text(item.availableDays) && text(item.availableDaysZh)) fact(fields, 'Dias (original)', item.availableDaysZh, 'zh-Hans');
      fact(fields, 'Horários de uso', readable(item.timeWindows) || 'Não capturado');
      fact(fields, 'Validade', text(item.validityText, 'Não capturada')); card.append(fields);
      if (text(item.branchCheck)) {
        const branch = element('div', 'availability branch-check'); branch.dataset.status = 'unknown';
        branch.append(element('strong', '', 'Aplicação à filial: '), document.createTextNode(item.branchCheck)); card.append(branch);
      }
      original(card, item.applicableMerchantsZh, 'Filiais aplicáveis no texto original');
      const hasReferenceDate = activeRegionId === referenceRegionId();
      const check = hasReferenceDate ? item.visitDateCheck || {} : {}; const status = text(check.status, 'unknown');
      const defaultLabels = { unknown: 'Uso em 24/09/2026: não confirmado.', weekday_only: 'A quinta-feira está entre os dias indicados; validade para 24/09 ainda não confirmada.', excluded: 'As regras observadas excluem o uso em 24/09/2026.', rules_match: 'As regras observadas são compatíveis com 24/09/2026.' };
      const availability = element('div', 'availability'); availability.dataset.status = status;
      if (hasReferenceDate) {
        paragraph(availability, 'Conferência para a data de referência do roteiro; para outro dia, use as regras acima.', 'muted');
        availability.append(element('strong', '', text(check.label, defaultLabels[status] || defaultLabels.unknown))); textList(availability, check.reasons);
      } else paragraph(availability, 'Uso na visita: data não definida nesta seleção regional. Confira dias, horários, validade e filial nas regras acima.');
      if (status === 'weekday_only' || status === 'rules_match') paragraph(availability, 'Isso não confirma estoque, compra ou reserva. Conferir validade, exceções e horário do almoço.', 'muted');
      card.append(availability);
      const detailed = packageDetailed(item);
      const listingItems = isVoucher || detailed ? [] : list(item.listingContents);
      if (listingItems.length) {
        const listing = element('section', 'package-listing-contents');
        listing.append(element('h4', '', 'Itens mencionados na oferta'));
        paragraph(listing, text(item.listingContentsNote, 'Nomes citados na prévia; não representam a composição completa do pacote.'), 'coverage-note');
        packageContents(listing, listingItems); card.append(listing);
      }
      if (list(item.contents).length) {
        card.append(element('h4', '', isVoucher ? 'Crédito e itens informados' : 'Composição e escolhas do pacote'));
        paragraph(card, item.contentsNote, 'coverage-note'); packageContents(card, item.contents);
      } else if (isVoucher) {
        paragraph(card, text(item.listingContentsNote, 'Este vale oferece crédito para consumo; não inclui uma lista fixa de pratos. Confira os produtos elegíveis e as condições de uso.'), 'coverage-note');
      } else {
        if (!listingItems.length) paragraph(card, text(item.listingContentsNote, text(item.contentsNote)), 'coverage-note');
        paragraph(card, 'Composição completa não recuperada. Quantidades, escolhas e acompanhamentos não estão confirmados.', 'muted');
      }
      const listingRules = detailed ? [] : list(item.listingConditions);
      const listingOriginals = new Set(listingRules.map(rule => text(rule.original)).filter(Boolean));
      const conditions = list(item.conditions).filter(rule => !listingOriginals.has(text(rule.original)));
      packageConditions(card, listingRules, 'Condições informadas na prévia');
      packageConditions(card, conditions, detailed ? 'Condições de uso' : 'Outras informações e limites da consulta');
      if (!detailed) paragraph(card, 'Regras completas de uso não recuperadas.', 'muted');
      else if (!conditions.length) paragraph(card, 'Regras detalhadas não capturadas.', 'muted');
      photoGrid(card, restaurant, 'package', item.photos);
      original(card, item.rawText, 'Texto original capturado do pacote');
      paragraph(card, packageDetailed(item) ? 'Detalhes consultados na fonte.' : 'Somente resumo do pacote consultado.', 'muted');
      sourceLink(card, item.sourceUrl); grid.append(card);
    }
    container.append(grid);
    const attached = new Set(packages.flatMap(item => list(item.photos)).map(photo => photo.src));
    photoGrid(container, restaurant, 'package', loosePhotos(restaurant, 'package').filter(photo => !attached.has(photo.src)));
  }
  function renderDishes(parent, restaurant) {
    const dishes = Array.isArray(rich(restaurant).dishes) ? rich(restaurant).dishes : list(restaurant.dishes);
    const container = section(parent, restaurant, 'dishes', 'Pratos sugeridos', dishes.length);
    const provenance = element('details', 'dish-collection'); const collected = rich(restaurant).coverage?.dishes;
    const totalLabel = finite(collected?.totalShown) ? `${dishes.length} de ${collected.totalShown} registros` : `${dishes.length} registros`;
    const completeness = collected?.status === 'catalog_complete' ? 'Catálogo coletado' : 'Coleta parcial / completude não confirmada';
    provenance.append(element('summary', '', `${completeness}: ${totalLabel} · limites da coleta`)); coverage(provenance, restaurant, 'dishes', dishes.length); container.append(provenance);
    paragraph(container, 'Preços exibidos no Dianping na coleta; não são orçamento atualizado. Unidade e tamanho só aparecem quando confirmados na fonte.', 'muted dish-price-note');
    const state = dishViews.get(restaurant.id) || { query: '', withPrice: false, withPhoto: false, sort: 'source', visibleLimit: DISH_PAGE_SIZE };
    dishViews.set(restaurant.id, state);
    const controls = element('div', 'dish-toolbar');
    const searchLabel = element('label', 'dish-search-label', 'Buscar nesta filial');
    const search = element('input', 'dish-search'); search.type = 'search'; search.placeholder = 'Nome em português ou chinês'; search.autocomplete = 'off'; search.value = state.query; searchLabel.append(search); controls.append(searchLabel);
    const priceLabel = element('label', 'dish-toggle'); const priceFilter = element('input', 'dish-with-price'); priceFilter.type = 'checkbox'; priceFilter.checked = state.withPrice; priceLabel.append(priceFilter, document.createTextNode('Com preço')); controls.append(priceLabel);
    const photoLabel = element('label', 'dish-toggle'); const photoFilter = element('input', 'dish-with-photo'); photoFilter.type = 'checkbox'; photoFilter.checked = state.withPhoto; photoLabel.append(photoFilter, document.createTextNode('Com foto')); controls.append(photoLabel);
    const sortLabel = element('label', 'dish-sort-label', 'Ordenar pratos'); const sort = element('select', 'dish-sort');
    for (const [value, label] of [['source', 'Ordem do Dianping'], ['recommendations', 'Mais recomendados'], ['price', 'Menor preço'], ['price-desc', 'Maior preço']]) { const option = element('option', '', label); option.value = value; sort.append(option); }
    sort.value = state.sort; sortLabel.append(sort); controls.append(sortLabel);
    const reset = element('button', 'dish-reset', 'Limpar'); reset.type = 'button'; controls.append(reset); container.append(controls);
    const results = element('p', 'dish-results'); results.id = `${restaurant.id}-dish-results`; results.setAttribute('role', 'status'); results.setAttribute('aria-live', 'polite'); container.append(results);
    const grid = element('div', 'data-grid dishes-grid'); grid.id = `${restaurant.id}-dish-grid`;
    // Indexar o catálogo inteiro é barato; criar cartões, imagens e listeners não.
    // Nenhum nó de prato é criado antes de ele entrar na página exibida.
    const entries = dishes.map((dish, index) => ({ dish, index, hasPhoto: list(dish.photos).some(safePhoto),
      searchable: normalized([dish.name, dish.nameZh, dish.description, dish.note].filter(Boolean).join(' ')) }));
    function createDishCard(dish) {
      const card = element('article', 'data-item dish-item'); card.dataset.id = text(dish.id);
      const photos = uniquePhotos(dish.photos);
      photoGrid(card, restaurant, 'dish', photos, 'dish-photos');
      if (!photos.length) {
        const unavailable = list(dish.photos).find(photo => photo.downloadStatus === 'source_unavailable');
        paragraph(card, unavailable ? `Foto indisponível na fonte (HTTP ${unavailable.downloadHttpStatus}); referência preservada.` : 'Sem foto real na coleta', 'dish-no-photo');
      }
      card.append(element('h4', '', text(dish.name, text(dish.nameZh, 'Prato sem nome'))));
      if (text(dish.nameZh) && text(dish.name)) paragraph(card, dish.nameZh, 'item-title-zh', 'zh-Hans');
      const facts = element('dl', 'item-facts'); fact(facts, 'Preço', dishPrice(dish));
      facts.firstElementChild.classList.add('visually-hidden'); facts.lastElementChild.classList.add(finite(dish.priceCny) ? 'dish-price' : 'dish-price-missing');
      fact(facts, 'Recomendações', finite(dish.recommendations) ? numberFormat.format(dish.recommendations) : text(dish.recommendations, 'Não informado'));
      if (text(dish.recommendationsPeriod)) fact(facts, 'Período', dish.recommendationsPeriod);
      else if (text(dish.recommendationsPeriodZh)) fact(facts, 'Período (original)', dish.recommendationsPeriodZh, 'zh-Hans');
      card.append(facts);
      menuPriceReferences(card, restaurant, dish);
      paragraph(card, text(dish.description, text(dish.note)), 'dish-description');
      if (finite(dish.photoTotalShown) || text(dish.priceEvidenceNote)) {
        const evidence = element('details', 'dish-evidence'); evidence.append(element('summary', '', 'Detalhes da coleta'));
        if (finite(dish.photoTotalShown)) paragraph(evidence, `Fotos locais: ${photos.length} · indicadas na fonte: ${numberFormat.format(dish.photoTotalShown)}.`, 'muted dish-photo-coverage');
        paragraph(evidence, dish.priceEvidenceNote, 'muted dish-price-evidence'); card.append(evidence);
      }
      sourceLink(card, dish.sourceUrl); return card;
    }
    container.append(grid);
    const pagination = element('div', 'dish-pagination');
    const more = element('button', 'dish-show-more'); more.type = 'button'; more.setAttribute('aria-controls', grid.id);
    const pageStatus = element('p', 'dish-page-status'); pagination.append(more, pageStatus); container.append(pagination);
    const empty = element('p', 'dish-empty', 'Nenhum prato corresponde aos filtros desta filial. Use “Limpar” para exibir o catálogo coletado.'); container.append(empty);
    let matching = [], rendered = 0, priced = 0, photographed = 0;
    function renderDishPage(focusNew = false) {
      const end = Math.min(state.visibleLimit, matching.length);
      let firstNew;
      while (rendered < end) {
        const card = createDishCard(matching[rendered++].dish);
        firstNew ||= card; grid.append(card);
      }
      const remaining = matching.length - rendered;
      more.hidden = remaining === 0;
      const nextCount = Math.min(DISH_PAGE_SIZE, remaining);
      more.textContent = `Mostrar mais ${nextCount} ${nextCount === 1 ? 'prato' : 'pratos'} (${numberFormat.format(remaining)} restantes)`;
      pageStatus.textContent = `${numberFormat.format(rendered)} de ${numberFormat.format(matching.length)} resultados exibidos.`;
      pagination.hidden = matching.length <= DISH_PAGE_SIZE;
      results.textContent = `Exibindo ${numberFormat.format(rendered)} de ${numberFormat.format(matching.length)} resultados · catálogo: ${numberFormat.format(dishes.length)} pratos · nos resultados: ${numberFormat.format(priced)} com preço e ${numberFormat.format(photographed)} com foto${state.sort.startsWith('price') ? ' · valores exibidos, sem equivalência de porções' : ''}`;
      if (focusNew && firstNew) { firstNew.tabIndex = -1; firstNew.focus({ preventScroll: true }); }
    }
    function applyDishFilters(resetPage = true) {
      state.query = search.value; state.withPrice = priceFilter.checked; state.withPhoto = photoFilter.checked; state.sort = sort.value;
      if (resetPage) state.visibleLimit = DISH_PAGE_SIZE;
      const query = normalized(state.query.trim());
      matching = entries.filter(entry => (!query || entry.searchable.includes(query)) && (!state.withPrice || finite(entry.dish.priceCny)) && (!state.withPhoto || entry.hasPhoto));
      if (state.sort === 'recommendations') matching.sort((a, b) => (finite(b.dish.recommendations) ? b.dish.recommendations : -1) - (finite(a.dish.recommendations) ? a.dish.recommendations : -1) || a.index - b.index);
      if (state.sort === 'price' || state.sort === 'price-desc') matching.sort((a, b) => {
        const aPrice = finite(a.dish.priceCny), bPrice = finite(b.dish.priceCny);
        if (aPrice !== bPrice) return aPrice ? -1 : 1;
        return aPrice ? (state.sort === 'price' ? a.dish.priceCny - b.dish.priceCny : b.dish.priceCny - a.dish.priceCny) || a.index - b.index : a.index - b.index;
      });
      priced = matching.filter(entry => finite(entry.dish.priceCny)).length;
      photographed = matching.filter(entry => entry.hasPhoto).length;
      grid.replaceChildren(); rendered = 0; renderDishPage();
      empty.hidden = matching.length > 0; reset.disabled = !state.query && !state.withPrice && !state.withPhoto && state.sort === 'source';
    }
    search.addEventListener('input', applyDishFilters);
    for (const control of [priceFilter, photoFilter, sort]) control.addEventListener('change', applyDishFilters);
    reset.addEventListener('click', () => { search.value = ''; priceFilter.checked = false; photoFilter.checked = false; sort.value = 'source'; applyDishFilters(); search.focus({ preventScroll: true }); });
    more.addEventListener('click', () => { state.visibleLimit += DISH_PAGE_SIZE; renderDishPage(true); });
    applyDishFilters(false);
    const attached = new Set(dishes.flatMap(item => list(item.photos)).map(photo => photo.src));
    const extras = loosePhotos(restaurant, 'dish').filter(photo => !attached.has(photo.src));
    if (extras.length) { container.append(element('h4', '', 'Outras imagens da seção de pratos')); photoGrid(container, restaurant, 'dish', extras); }
  }
  function renderMenus(parent, restaurant) {
    const menus = list(rich(restaurant).menus); const container = section(parent, restaurant, 'menus', 'Cardápios', menus.length); coverage(container, restaurant, 'menus', menus.length);
    for (const menu of menus) {
      const block = element('article', 'data-item menu-item'); block.dataset.id = text(menu.id); block.append(element('h4', '', text(menu.title, 'Cardápio')));
      const states = { thumbnail: 'Somente miniatura capturada; não permite leitura completa.', readable: 'Imagens disponíveis para leitura. A quantidade capturada não garante o cardápio completo.', partial: 'Cardápio parcialmente capturado.', unreadable: 'Imagem capturada, mas texto insuficientemente legível para transcrição confiável.', app_required: 'A fonte solicitou abertura no aplicativo; conteúdo completo não capturado.' };
      paragraph(block, states[menu.status] || 'Completude e legibilidade ainda não confirmadas.', 'coverage-note'); paragraph(block, menu.notes);
      photoGrid(block, restaurant, 'menu', menu.photos);
      if (list(menu.items).length) {
        block.append(element('h4', '', 'Itens transcritos da imagem'));
        paragraph(block, 'Preços observados na imagem, não confirmados para a visita. A foto pode ser antiga ou corresponder a outro canal, como delivery.', 'coverage-note');
        const table = element('table', 'menu-items'); const head = element('thead'); const headRow = element('tr');
        for (const label of ['Prato / item', 'Preço na imagem', 'Unidade', 'Observações']) { const th = element('th', '', label); th.scope = 'col'; headRow.append(th); }
        head.append(headRow); table.append(head); const body = element('tbody');
        for (const item of menu.items) {
          const row = element('tr'); const name = element('td', '', text(item.name, text(item.nameZh, 'Item sem nome')));
          if (text(item.nameZh) && text(item.name)) { const zh = element('span', 'table-name-zh', item.nameZh); zh.lang = 'zh-Hans'; name.append(zh); }
          row.append(name, element('td', '', money(item.priceCny, 'Não legível / não informado')), element('td', '', text(item.unit, '—')), element('td', '', text(item.notes, '—'))); body.append(row);
        }
        table.append(body); block.append(table);
      }
      if (text(menu.translation)) { block.append(element('h4', '', 'Tradução do texto capturado')); paragraph(block, menu.translation, 'original-text'); original(block, menu.extractedTextZh); }
      else if (text(menu.extractedTextZh)) { block.append(element('h4', '', 'Texto capturado (chinês)')); paragraph(block, menu.extractedTextZh, 'original-text', 'zh-Hans'); }
      sourceLink(block, menu.sourceUrl); container.append(block);
    }
    const attached = new Set(menus.flatMap(item => list(item.photos)).map(photo => photo.src)); photoGrid(container, restaurant, 'menu', loosePhotos(restaurant, 'menu').filter(photo => !attached.has(photo.src)));
  }
  function renderReviews(parent, restaurant) {
    const reviews = list(rich(restaurant).reviews); const container = section(parent, restaurant, 'reviews', 'Avaliações e fotos de clientes', reviews.length); coverage(container, restaurant, 'reviews', reviews.length);
    const tags = list(rich(restaurant).reviewTags);
    if (tags.length) {
      const tagList = element('div', 'tag-list');
      for (const tag of tags) { const chip = element('span', 'tag', `${text(tag.text, text(tag.textZh))}${finite(tag.count) ? ` (${numberFormat.format(tag.count)})` : ''}`); if (text(tag.textZh)) chip.title = tag.textZh; tagList.append(chip); }
      container.append(tagList);
    }
    if (text(restaurant.reviewSummary)) { container.append(element('h4', '', 'Síntese editorial')); paragraph(container, restaurant.reviewSummary); }
    for (const review of reviews) {
      const entry = element('article', 'review-entry'); entry.dataset.id = text(review.id);
      const meta = element('div', 'review-meta');
      meta.append(element('span', '', text(review.dateText, 'Data não capturada')), element('span', '', review.status === 'full' ? 'Texto expandido' : 'Prévia / texto parcial'));
      if (finite(review.rating)) meta.append(element('span', '', `Nota: ${decimalFormat.format(review.rating)} / 5`));
      else if (text(review.rating)) meta.append(element('span', '', `Avaliação: ${review.rating}`));
      if (finite(review.spendCny)) meta.append(element('span', '', `Gasto: ${money(review.spendCny)}`)); entry.append(meta);
      if (text(review.relevance)) paragraph(entry, `Relevância para seleção: ${review.relevance}`, 'item-meta');
      if (text(review.summary)) { entry.append(element('h4', '', 'Resumo da avaliação')); paragraph(entry, review.summary); }
      if (text(review.textPt)) { paragraph(entry, review.textPt, 'review-translation'); original(entry, review.textZh); }
      else if (text(review.textZh)) { if (text(review.summary)) original(entry, review.textZh); else paragraph(entry, review.textZh, 'review-body', 'zh-Hans'); }
      photoGrid(entry, restaurant, 'review', review.photos); sourceLink(entry, review.sourceUrl); container.append(entry);
      if (finite(review.photoTotalShown)) paragraph(entry, `${uniquePhotos(review.photos).length} fotos capturadas de ${review.photoTotalShown} indicadas nesta avaliação.`, 'muted');
      paragraph(entry, review.selectionNote, 'muted');
    }
    const attached = new Set(reviews.flatMap(item => list(item.photos)).map(photo => photo.src));
    const extras = loosePhotos(restaurant, 'review').filter(photo => !attached.has(photo.src));
    if (extras.length) { container.append(element('h4', '', 'Outras fotos da área de avaliações')); photoGrid(container, restaurant, 'review', extras); }
  }
  function renderListing(parent, restaurant) {
    const photos = loosePhotos(restaurant, 'listing'); const container = section(parent, restaurant, 'photos', 'Imagens da ficha do restaurante', photos.length);
    coverage(container, restaurant, 'photos', photos.length); photoGrid(container, restaurant, 'listing', photos);
  }
  function renderInfo(parent, restaurant) {
    const container = section(parent, restaurant, 'info', 'Informações da filial e análise'); const shop = rich(restaurant).shop || {};
    const fields = element('dl', 'facts');
    fact(fields, 'Endereço', text(restaurant.addressZh, 'Não confirmado'), 'zh-Hans');
    fact(fields, 'Funcionamento', text(shop.openingHours, text(restaurant.hoursText, 'Não confirmado')));
    fact(fields, 'Tipo de cozinha', text(restaurant.cuisine)); fact(fields, 'Região', text(restaurant.area));
    for (const score of list(shop.scoreBreakdown)) fact(fields, text(score.label, text(score.nameZh, 'Nota específica')), finite(score.value) ? numberFormat.format(score.value) : text(score.value));
    container.append(fields);
    if (list(shop.features).length) { container.append(element('h4', '', 'Características informadas na ficha')); textList(container, shop.features.map(value => typeof value === 'string' ? value : text(value.text, text(value.label)))); }
    paragraph(container, shop.featuresNote, 'muted'); original(container, list(shop.featuresZh).join(' · '), 'Características em chinês');
    if (list(shop.rankings).length) { container.append(element('h4', '', 'Rankings informados')); textList(container, shop.rankings.map(value => typeof value === 'string' ? value : text(value.text, text(value.label)))); }
    container.append(element('h4', '', 'Análise editorial')); paragraph(container, restaurant.summary); paragraph(container, restaurant.routeNote);
    const columns = element('div', 'analysis-columns');
    for (const [heading, values] of [['Pontos para comparar', restaurant.pros], ['Ressalvas / conferir', restaurant.cautions]]) {
      if (!list(values).length) continue; const column = element('div'); column.append(element('h4', '', heading)); textList(column, values); columns.append(column);
    } container.append(columns); paragraph(container, restaurant.sourceNotes, 'muted'); sourceLink(container, restaurant.sourceUrl, 'Abrir ficha no Dianping');
  }
  function focusDetail(parent, focus) {
    if (focus) { parent.focus({ preventScroll: true }); parent.scrollIntoView({ block: 'start' }); }
  }
  function clearSelection() {
    selectionVersion++;
    const previousId = activeRestaurantId; activeRestaurantId = null;
    if (previousId) syncRow(previousId);
    const parent = $('#restaurant-detail'); parent.replaceChildren(); delete parent.dataset.id;
    parent.dataset.state = 'idle'; parent.setAttribute('aria-busy', 'false'); parent.hidden = !onDemand;
    if (onDemand) parent.append(element('p', 'coverage-note', 'Clique no nome de um restaurante para carregar sua ficha completa.'));
  }
  function showDetailState(restaurant, state, message, focus = false) {
    const parent = $('#restaurant-detail'); parent.replaceChildren(); parent.dataset.id = restaurant.id;
    parent.dataset.state = state; parent.hidden = false; parent.setAttribute('aria-busy', String(state === 'loading'));
    parent.append(element('h2', '', restaurant.name));
    const status = element('p', 'coverage-note', message); status.setAttribute('role', state === 'error' ? 'alert' : 'status'); parent.append(status);
    if (state === 'error') {
      const retry = element('button', 'detail-retry', 'Tentar novamente'); retry.type = 'button';
      retry.addEventListener('click', () => selectRestaurant(restaurant.id, true)); parent.append(retry);
    }
    focusDetail(parent, focus);
  }
  function selectRestaurant(id, focus = false) {
    const summary = dataset.restaurants.find(item => item.id === id); if (!summary || !belongsToRegion(summary) || rows.get(id)?.hidden) return;
    const cached = onDemand ? detailLoader.peek(id) : summary;
    // Importações e atualizações internas nunca iniciam/repetem downloads.
    if (onDemand && !focus && !cached) return;
    if (saveTimer) persist(); activeRestaurantId = id; const version = ++selectionVersion;
    for (const knownId of knownIds) syncRow(knownId);
    if (cached) { renderRestaurant(cached, focus); return; }
    showDetailState(summary, 'loading', 'Carregando pratos, preços, pacotes, menus e avaliações desta filial…', focus);
    return detailLoader.load(id).then(restaurant => {
      if (version !== selectionVersion || activeRestaurantId !== id || !belongsToRegion(summary) || rows.get(id)?.hidden) return;
      // O foco já foi movido pelo clique; não roubar a posição após a espera.
      renderRestaurant(restaurant);
    }).catch(error => {
      if (version !== selectionVersion || activeRestaurantId !== id || !belongsToRegion(summary) || rows.get(id)?.hidden) return;
      showDetailState(summary, 'error', text(error?.message, 'Não foi possível carregar a ficha. Tente novamente.'));
    });
  }
  function renderRestaurant(restaurant, focus = false) {
    const id = restaurant.id;
    const parent = $('#restaurant-detail'); parent.replaceChildren(); parent.dataset.id = id;
    parent.dataset.state = 'ready'; parent.setAttribute('aria-busy', 'false');
    const article = element('article', 'restaurant-card'); article.id = `restaurante-${id}`; article.dataset.id = id;
    const header = element('div', 'detail-heading'); const listing = loosePhotos(restaurant, 'listing');
    if (listing.length) {
      const cover = element('button', 'cover-button'); cover.type = 'button'; cover.setAttribute('aria-label', `Ampliar capa original de ${restaurant.name}`);
      const img = element('img', 'cover-image'); img.src = listing[0].src; img.alt = text(listing[0].alt, `Capa da ficha de ${restaurant.name}`);
      cover.append(img, element('span', 'cover-label', 'Capa original · ampliar')); cover.addEventListener('click', event => openGallery(restaurant, 'listing', listing, 0, event.currentTarget)); header.append(cover);
    }
    const identity = element('div', 'detail-identity'); identity.append(element('h2', '', restaurant.name)); paragraph(identity, restaurant.nameZh, 'restaurant-name-zh', 'zh-Hans');
    paragraph(identity, `${finite(restaurant.rating) ? `${decimalFormat.format(restaurant.rating)} / 5` : 'Nota não informada'} · ${finite(restaurant.reviewCount) ? `${numberFormat.format(restaurant.reviewCount)} avaliações na fonte` : 'Total de avaliações não informado'} · ${money(restaurant.priceCny)} / pessoa`);
    paragraph(identity, text(rich(restaurant).shop?.openingHours, text(restaurant.hoursText)), 'item-meta');
    paragraph(identity, restaurant.addressZh, 'item-meta', 'zh-Hans');
    const sources = element('div', 'source-line'); sourceLink(sources, restaurant.sourceUrl, 'Dianping'); sources.append(element('span', '', `Consultado em ${dateLabel(restaurant.collectedAt) || 'data não informada'}`)); identity.append(sources); header.append(identity); article.append(header);
    createDecisionControls(article, restaurant);
    const nav = element('nav', 'section-nav'); nav.setAttribute('aria-label', `Seções de ${restaurant.name}`);
    for (const [key, label] of [['family', 'Nossa família'], ['dishes', 'Pratos'], ['packages', 'Pacotes'], ['menus', 'Cardápios'], ['reviews', 'Avaliações e fotos'], ['photos', 'Imagens da ficha'], ['info', 'Filial / análise']]) {
      const values = key === 'dishes' && !rich(restaurant).dishes ? list(restaurant.dishes) : list(rich(restaurant)[key]);
      const count = key === 'photos' ? loosePhotos(restaurant, 'listing').length : values.length;
      const link = element('a', '', `${label}${['info', 'family'].includes(key) ? '' : ` (${count})`}`); link.href = `#${id}-${key}`; nav.append(link);
    }
    const compare = element('a', 'back-to-comparison', '↑ Comparar restaurantes'); compare.href = '#restaurantes'; nav.append(compare); article.append(nav);
    renderFamily(article, restaurant); renderDishes(article, restaurant); renderPackages(article, restaurant); renderMenus(article, restaurant); renderReviews(article, restaurant); renderListing(article, restaurant); renderInfo(article, restaurant);
    parent.append(article); parent.hidden = false;
    focusDetail(parent, focus);
  }

  function updateCounters() {
    const restaurants = regionalRestaurants();
    const totals = { pending: 0, interested: 0, finalist: 0, discarded: 0 }; for (const restaurant of restaurants) totals[decision(restaurant.id).status]++;
    for (const input of $$('#status-filters input')) $('.filter-count', input.parentElement).textContent = String(input.value === 'all' ? restaurants.length : totals[input.value]);
    $('#selection-summary').textContent = `${totals.finalist} finalistas · ${totals.interested} interessantes · ${totals.pending} a avaliar`;
  }
  function showCollectionCoverage() {
    const restaurants = regionalRestaurants();
    const total = key => restaurants.reduce((sum, restaurant) => sum + collectedCount(restaurant, key), 0);
    const packages = total('packages'), detailed = total('packagesDetailed'), menus = total('menus'), menuEntries = total('menuEntries');
    const packageText = `Ofertas: ${packages} identificadas · ${detailed} detalhadas · ${packages - detailed} com detalhes pendentes.`;
    const menuText = menus ? `Cardápios: material parcial${menuEntries ? `; ${menuEntries} entradas transcritas, não pratos únicos` : ''}. Coleção completa não confirmada.` : 'Cardápios ainda não coletados.';
    $('#collection-coverage').textContent = `${restaurants.length} opções nesta região. ${packageText} ${menuText}`;
  }
  function createRegionNavigation() {
    const fallback = dataset.region || { id: referenceRegionId(), name: 'Guozijian · Templos de Confúcio e Lama' };
    const entries = list(dataset.regions).length ? dataset.regions : [fallback];
    for (const region of entries) {
      if (!region || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(region.id) || regions.has(region.id)) continue;
      regions.set(region.id, region);
      const count = dataset.restaurants.filter(restaurant => belongsToRegion(restaurant, region.id)).length;
      const button = element('button', 'region-button', `${text(region.name, region.id)} (${count})`);
      button.type = 'button'; button.dataset.region = region.id; button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => changeRegion(region.id, true)); $('#region-navigation').append(button);
    }
    const requested = new URLSearchParams(window.location.search).get('regiao');
    activeRegionId = regions.has(requested) ? requested : regions.keys().next().value;
  }
  function changeRegion(id, updateAddress = false) {
    const region = regions.get(id); if (!region) return;
    const changed = activeRegionId !== id;
    if (saveTimer) persist();
    if (onDemand && (changed || !activeRestaurantId)) clearSelection();
    activeRegionId = id;
    $('#region-title').textContent = text(region.name, 'Restaurantes de Pequim');
    $('#region-description').textContent = text(region.description, 'Compare os restaurantes desta região, independentemente do dia do passeio.');
    $('#route-reference').hidden = id !== referenceRegionId();
    for (const button of $$('#region-navigation button')) button.setAttribute('aria-pressed', String(button.dataset.region === id));
    if (updateAddress) {
      try {
        const address = new URL(window.location.href); address.searchParams.set('regiao', id); address.hash = '';
        window.history.replaceState(null, '', address.href);
      } catch { /* A troca de região também funciona quando file:// restringe o histórico. */ }
    }
    updateCounters(); showCollectionCoverage(); applyFilters();
    if (onDemand) return;
    const first = [...$('#restaurant-grid').children].find(row => !row.hidden);
    if (activeRestaurantId) {
      // Atualiza contexto dos pacotes quando uma filial pertence a duas regiões.
      if (changed) selectRestaurant(activeRestaurantId);
    } else if (first) selectRestaurant(first.dataset.id);
  }
  function createFilters() {
    for (const [value, label] of Object.entries(FILTERS)) {
      const wrapper = element('label', 'filter-label'); const input = element('input', 'visually-hidden'); input.type = 'radio'; input.name = 'status-filter'; input.value = value; input.checked = value === 'all';
      const visible = element('span', '', label); visible.append(element('b', 'filter-count')); input.addEventListener('change', () => { if (input.checked) { activeFilter = value; applyFilters(); } }); wrapper.append(input, visible); $('#status-filters').append(wrapper);
    }
  }
  function applyFilters() {
    const query = normalized($('#search').value.trim()); const mode = $('#sort').value; const profile = $('#family-filter').value; const sorted = [...dataset.restaurants];
    if (mode === 'price') sorted.sort((a, b) => (finite(a.priceCny) ? a.priceCny : Infinity) - (finite(b.priceCny) ? b.priceCny : Infinity));
    if (mode === 'rating') sorted.sort((a, b) => (finite(b.rating) ? b.rating : -Infinity) - (finite(a.rating) ? a.rating : -Infinity));
    let count = 0; const grid = $('#restaurant-grid');
    for (const [index, restaurant] of sorted.entries()) {
      const contents = list(rich(restaurant).packages).flatMap(item => [...list(item.contents), ...list(item.listingContents)]);
      const menuItems = list(rich(restaurant).menus).flatMap(menu => list(menu.items));
      const searchable = typeof restaurant.searchText === 'string' ? restaurant.searchText : normalized([restaurant.name, restaurant.nameZh, restaurant.cuisine, restaurant.area, ...list(restaurant.dishes).map(dish => `${dish.name || ''} ${dish.nameZh || ''}`), ...list(rich(restaurant).dishes).map(dish => `${dish.name || ''} ${dish.nameZh || ''}`), ...list(rich(restaurant).packages).map(item => `${item.title || ''} ${item.titleZh || ''}`), ...contents.map(item => `${item.name || ''} ${item.nameZh || ''}`), ...menuItems.map(item => `${item.name || ''} ${item.nameZh || ''}`)].filter(Boolean).join(' '));
      const profileMatches = matchesProfile(restaurant, profile);
      const row = rows.get(restaurant.id); const visible = belongsToRegion(restaurant) && profileMatches && (activeFilter === 'all' || decision(restaurant.id).status === activeFilter) && (!query || searchable.includes(query)); row.hidden = !visible; if (visible) count++;
      if (grid.children[index] !== row) grid.insertBefore(row, grid.children[index] || null);
    }
    $('#results-count').textContent = `${count} de ${regionalRestaurants().length} restaurantes nesta região${query ? ' · busca aplicada' : ''}. Clique no nome para abrir a ficha abaixo.`;
    $('#empty-state').hidden = count > 0;
    // A ficha aberta nunca deve contradizer a região ou os filtros visíveis.
    if (activeRestaurantId && rows.get(activeRestaurantId)?.hidden) {
      if (saveTimer) persist();
      clearSelection();
    }
  }

  function openGallery(restaurant, group, values, index, trigger) {
    const photos = uniquePhotos(values); if (!photos.length) return;
    activeGallery = { restaurant, group, photos, index, zoom: false }; photoReturnFocus = trigger || document.activeElement;
    updateGallery(); $('#photo-dialog').showModal(); $('#close-photo').focus();
  }
  function updateGallery() {
    const { restaurant, group, photos, index, zoom } = activeGallery; const photo = photos[index];
    $('#photo-group-title').textContent = GROUPS[group]; $('#photo-title').textContent = restaurant.name;
    $('#large-photo').src = photo.src; $('#large-photo').alt = text(photo.alt, `Foto de ${restaurant.name}`);
    $('.photo-stage').dataset.zoom = String(zoom); $('#photo-zoom').setAttribute('aria-pressed', String(zoom)); $('#photo-zoom').textContent = zoom ? 'Ajustar à tela' : 'Tamanho original';
    $('#photo-caption').textContent = `${index + 1} / ${photos.length}${text(photo.alt) ? ` · ${photo.alt}` : ''}`;
    $('#photo-local').href = photo.src; const source = safeExternal(photo.sourceUrl); $('#photo-source').hidden = !source;
    if (source) $('#photo-source').href = source; else $('#photo-source').removeAttribute('href');
    $('#previous-photo').hidden = photos.length < 2; $('#next-photo').hidden = photos.length < 2;
    $('.photo-stage').scrollTo(0, 0);
  }
  function moveGallery(delta) { if (!activeGallery) return; activeGallery.index = (activeGallery.index + delta + activeGallery.photos.length) % activeGallery.photos.length; updateGallery(); }
  function exportChoices() {
    persist();
    try {
      const blob = new Blob([JSON.stringify(snapshot(), null, 2) + '\n'], { type: 'application/json;charset=utf-8' }); const url = URL.createObjectURL(blob); const link = element('a'); link.href = url;
      link.download = `escolhas-restaurantes-pequim-${new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)}.json`; link.hidden = true; document.body.append(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000); showToast(`Arquivo preparado com os ${knownIds.size} restaurantes de todas as regiões.`);
    } catch { showToast('Não foi possível preparar o arquivo. Tente exportar novamente.', true); }
  }
  async function readImport(file) {
    if (!file) return; if (file.size > 1024 * 1024) { showToast('Arquivo maior que 1 MB. Escolha o JSON exportado por esta página.', true); return; }
    try {
      let payload; try { payload = JSON.parse(await file.text()); } catch { throw new Error('Não foi possível ler o JSON.'); }
      pendingImport = validatePayload(payload); const total = Object.keys(pendingImport).length;
      pendingImportExcludedCount = excludedChoicesCount(payload);
      if (!total) throw new Error(`O arquivo não contém escolhas para restaurantes da seleção atual.${excludedChoicesNotice(pendingImportExcludedCount)}`);
      $('#import-description').textContent = `O arquivo contém escolhas para ${total} ${total === 1 ? 'restaurante atual' : 'restaurantes atuais'}.${excludedChoicesNotice(pendingImportExcludedCount)}`;
      $('#import-dialog').showModal(); $('#cancel-import').focus();
    } catch (error) { pendingImport = null; pendingImportExcludedCount = 0; showToast(error.message, true); }
  }
  function init() {
    if (!dataset || dataset.schemaVersion !== SCHEMA_VERSION || dataset.meal?.id !== MEAL_ID || !Array.isArray(dataset.restaurants) || !dataset.restaurants.length) {
      $('#restaurant-detail').append(element('p', 'notice', 'Dados não carregados. Abra o index.html junto com as pastas dados, assets e imagens.')); $('#import-button').disabled = true; $('#export-button').disabled = true; return;
    }
    for (const restaurant of dataset.restaurants) {
      if (!restaurant || typeof restaurant.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(restaurant.id) || knownIds.has(restaurant.id)) {
        $('#restaurant-detail').append(element('p', 'notice', 'Identificação inválida ou repetida nas fichas.')); $('#import-button').disabled = true; $('#export-button').disabled = true; return;
      } knownIds.add(restaurant.id);
    }
    if (onDemand) {
      try {
        if (typeof window.RESTAURANTES_CARREGADOR?.create !== 'function') throw new Error('Carregador de fichas indisponível. Atualize a página ou confira se a pasta assets foi copiada por completo.');
        detailLoader = window.RESTAURANTES_CARREGADOR.create(dataset);
      } catch (error) {
        $('#restaurant-detail').append(element('p', 'notice', text(error?.message, 'Não foi possível iniciar o carregador de fichas.')));
        $('#import-button').disabled = true; $('#export-button').disabled = true; return;
      }
    }
    for (const key of ['time', 'area', 'before', 'after']) if (text(dataset.meal[key])) $(`#meal-${key}`).textContent = dataset.meal[key];
    if (dataset.group && finite(dataset.group.adults)) {
      const ages = list(dataset.group.childrenAgesMonths); const adults = dataset.group.adults;
      $('#group-summary').textContent = `${adults} ${adults === 1 ? 'adulto' : 'adultos'} · ${ages.length} ${ages.length === 1 ? 'criança' : 'crianças'}${ages.length ? `: ${ages.map(ageLabel).join(' / ')}` : ''}`;
    }
    if (text(dataset.group?.preferencesNote)) $('#group-preferences').textContent = dataset.group.preferencesNote;
    $('#group-budget').textContent = `Maioria das opções com média até ${money(budgetLimit())} por pessoa. Internacionais: referência de ${money(internationalReferenceBudget())}, com exceções identificadas até ${money(internationalMaximumBudget())}. A média não é um teto garantido da conta nem uma estimativa do total da família.`;
    $('#family-filter option[value="international"]').textContent = `Internacionais · referência ${money(internationalReferenceBudget())} + exceções`;
    $('#family-filter option[value="within-budget"]').textContent = `Média até ${money(budgetLimit())}`;
    $('#family-filter option[value="over-budget"]').textContent = `Média acima de ${money(budgetLimit())}`;
    $('#updated-at').textContent = `Pesquisa de ${dateLabel(dataset.updatedAt) || 'data não informada'}`; restore(); createFilters(); createRegionNavigation();
    for (const restaurant of dataset.restaurants) $('#restaurant-grid').append(createRow(restaurant));
    changeRegion(activeRegionId);
    $('#search').addEventListener('input', applyFilters); $('#sort').addEventListener('change', applyFilters); $('#family-filter').addEventListener('change', applyFilters);
    $('#reset-filters').addEventListener('click', () => { activeFilter = 'all'; $('#search').value = ''; $('#family-filter').value = 'all'; $('#status-filters input[value="all"]').checked = true; applyFilters(); $('#status-filters input[value="all"]').focus(); });
    $('#export-button').addEventListener('click', exportChoices); $('#import-button').addEventListener('click', () => { $('#import-file').value = ''; $('#import-file').click(); }); $('#import-file').addEventListener('change', event => readImport(event.target.files[0]));
    $('#cancel-import').addEventListener('click', () => { pendingImport = null; pendingImportExcludedCount = 0; $('#import-dialog').close(); }); $('#import-dialog').addEventListener('cancel', () => { pendingImport = null; pendingImportExcludedCount = 0; });
    $('#import-dialog').addEventListener('close', () => { pendingImport = null; pendingImportExcludedCount = 0; $('#import-button').focus({ preventScroll: true }); });
    $('#confirm-import').addEventListener('click', () => {
      if (!pendingImport) return; Object.assign(decisions, pendingImport); for (const id of Object.keys(pendingImport)) syncRow(id);
      const excludedNotice = excludedChoicesNotice(pendingImportExcludedCount);
      pendingImport = null; pendingImportExcludedCount = 0; updateCounters(); applyFilters(); persist(); selectRestaurant(activeRestaurantId); $('#import-dialog').close(); showToast(`Escolhas importadas. Restaurantes ausentes no arquivo foram preservados.${excludedNotice}`);
    });
    $('#close-photo').addEventListener('click', () => $('#photo-dialog').close());
    $('#photo-dialog').addEventListener('close', () => { activeGallery = null; if (photoReturnFocus?.isConnected) photoReturnFocus.focus({ preventScroll: true }); photoReturnFocus = null; });
    $('#previous-photo').addEventListener('click', () => moveGallery(-1)); $('#next-photo').addEventListener('click', () => moveGallery(1));
    $('#photo-zoom').addEventListener('click', () => { if (activeGallery) { activeGallery.zoom = !activeGallery.zoom; updateGallery(); } });
    $('#photo-dialog').addEventListener('keydown', event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); moveGallery(event.key === 'ArrowLeft' ? -1 : 1); } });
    $('#photo-dialog').addEventListener('click', event => { if (event.target !== $('#photo-dialog')) return; const bounds = $('#photo-dialog').getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) $('#photo-dialog').close(); });
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && saveTimer) persist(); }); window.addEventListener('pagehide', () => { if (saveTimer) persist(); });
  }
  init();
})();

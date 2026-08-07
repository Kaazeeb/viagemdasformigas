(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const LIGHTBOX_IMAGE_WIDTH = 1920;
  const mediaItems = [];
  const mediaIndexes = new Map();
  const mediaGroups = new Map();
  const markerIndex = new Map();
  let guide = null;
  let map = null;
  let lightboxIndex = 0;
  let activeMediaIndices = [];
  let touchStartX = 0;
  let lightboxMapMode = false;
  let lightboxMapScale = 1;
  let lightboxMapOffset = { x: 0, y: 0 };
  const lightboxMapPointers = new Map();
  let lightboxMapDrag = null;
  let lightboxMapPinch = null;

  const categoryLabels = {
    imperial: "Imperial",
    temples: "Templos e filosofia",
    wall: "Grande Muralha",
    neighborhoods: "Bairros históricos",
    modern: "Pequim moderna",
    nature: "Parques e natureza",
  };

  const categoryMap = {
    "forbidden-city": ["imperial"],
    "tiananmen-square": ["imperial", "modern"],
    "temple-of-heaven": ["temples", "imperial"],
    "summer-palace": ["imperial", "nature"],
    "mutianyu-great-wall": ["wall", "nature"],
    "badaling-great-wall": ["wall", "nature"],
    "lama-temple": ["temples"],
    "confucius-guozijian": ["temples"],
    "jingshan-park": ["imperial", "nature"],
    "beihai-park": ["imperial", "nature"],
    "national-museum-china": ["modern"],
    "drum-bell-towers-hutongs": ["neighborhoods", "imperial"],
    shichahai: ["neighborhoods", "nature"],
    "prince-gong-mansion": ["neighborhoods", "imperial"],
    "798-art-district": ["modern"],
    "olympic-park": ["modern"],
    "ming-tombs": ["imperial", "nature"],
    "fragrant-hills": ["nature"],
  };

  document.addEventListener("DOMContentLoaded", init);

  async function init() {
    try {
      guide = await resolveGuide();
    } catch (error) {
      showLoadError(error);
      return;
    }

    const attractions = guide.attractions || [];
    const total = $("[data-attraction-total]");
    const photoTotals = $$('[data-photo-total]');
    if (total) total.textContent = String(attractions.length);
    const photoCount = String(attractions.reduce((sum, attraction) => sum + (attraction.images?.length || 0), 0));
    photoTotals.forEach((item) => { item.textContent = photoCount; });

    renderHero();
    renderAttractions();
    renderReferenceMaps();
    renderHotels();
    renderTerminals("stations");
    renderSources();
    setupAttractionFilters();
    setupTerminalTabs();
    setupLightbox();
    await ensureLeaflet();
    setupMap();
    openDeepLinkedAttraction();
  }

  async function resolveGuide() {
    if (window.BEIJING_GUIDE) return window.BEIJING_GUIDE;
    if (window.BEIJING_GUIDE_READY) return window.BEIJING_GUIDE_READY;

    const [attractions, logistics, media] = await Promise.all([
      fetch("beijing-attractions.json").then(checkResponse),
      fetch("beijing-logistics.json").then(checkResponse),
      fetch("beijing-media.json").then(checkResponse),
    ]);
    return mergeGuide(attractions, logistics, media);
  }

  function checkResponse(response) {
    if (!response.ok) throw new Error(`Falha ao carregar ${response.url}`);
    return response.json();
  }

  function ensureLeaflet() {
    if (window.L) return Promise.resolve(true);

    const stylesheet = $("#leaflet-styles");
    if (stylesheet) stylesheet.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";

    return new Promise((resolve) => {
      const fallback = document.createElement("script");
      fallback.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      fallback.onload = () => resolve(Boolean(window.L));
      fallback.onerror = () => resolve(false);
      document.head.append(fallback);
      setTimeout(() => resolve(Boolean(window.L)), 5000);
    });
  }

  function mergeGuide(attractions, logistics, media) {
    const byAttraction = media.imagesByAttraction || {};
    const imageKeys = {
      "forbidden-city": "cidade-proibida",
      "tiananmen-square": "praca-tiananmen",
      "temple-of-heaven": "templo-do-ceu",
      "summer-palace": "palacio-de-verao",
      "mutianyu-great-wall": "muralha-mutianyu",
      "badaling-great-wall": "muralha-badaling",
      "lama-temple": "templo-lama",
      "confucius-guozijian": "templo-confucio-guozijian",
      "jingshan-park": "parque-jingshan",
      "beihai-park": "parque-beihai",
      "national-museum-china": "museu-nacional-china",
      "drum-bell-towers-hutongs": "torres-tambor-sino-hutongs",
      shichahai: "shichahai",
      "prince-gong-mansion": "mansao-principe-gong",
      "798-art-district": "distrito-arte-798",
      "olympic-park": "parque-olimpico-ninho-passaro",
      "ming-tombs": "tumbas-ming",
      "fragrant-hills": "colinas-perfumadas",
    };
    return {
      ...logistics,
      ...media,
      attractions: attractions.map((item) => ({
        ...item,
        images: byAttraction[imageKeys[item.id]]?.images || [],
      })),
      referenceMaps: Object.values(media.referenceMaps || {}),
      sources: [...(logistics.sources || []), ...(media.sources || [])],
    };
  }

  function showLoadError(error) {
    const target = $("[data-beijing-attractions]");
    if (target) {
      target.innerHTML = `
        <div class="beijing-fallback">
          <strong>Não foi possível abrir os dados do guia.</strong>
          <p>Se você abriu o arquivo diretamente no computador, use um servidor local ou publique a pasta no GitHub Pages.</p>
        </div>`;
    }
    console.error(error);
  }

  function normalizeImage(image = {}) {
    const thumb = image.thumb || image.src || image.url || image.preview || "";
    return {
      file: image.file || "",
      thumb,
      large: image.large || image.original || thumb,
      original: image.original || image.large || thumb,
      page: image.page || image.source || image.original || thumb,
      alt: image.alt || image.caption || "Imagem de Pequim",
      caption: image.caption || image.alt || "Pequim",
      credit: image.credit || image.author || "Ver página do arquivo",
      license: image.license || "Licença na página do arquivo",
    };
  }

  function lightboxImageSource(image) {
    if (!image.file) return image.thumb || image.large || image.original;
    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
      image.file,
    )}?width=${LIGHTBOX_IMAGE_WIDTH}`;
  }

  function registerMedia(rawImage) {
    const image = normalizeImage(rawImage);
    if (!image.thumb) return -1;
    const key = image.page || image.original || image.thumb;
    if (mediaIndexes.has(key)) return mediaIndexes.get(key);
    const index = mediaItems.length;
    mediaItems.push(image);
    mediaIndexes.set(key, index);
    return index;
  }

  function renderHero() {
    const target = $("[data-hero-gallery]");
    if (!target) return;
    const forbidden = guide.attractions.find((item) => item.id === "forbidden-city");
    const wall = guide.attractions.find((item) => item.id === "mutianyu-great-wall");
    const mainImage = forbidden?.images?.[0];
    const sideImage = wall?.images?.[0] || forbidden?.images?.[1];

    if (!mainImage) return;
    const mainIndex = registerMedia(mainImage);
    const sideIndex = sideImage ? registerMedia(sideImage) : -1;
    target.innerHTML = `
      ${heroFigure(mainImage, mainIndex, "beijing-hero-photo-main", forbidden?.name || "Cidade Proibida", "forbidden-city")}
      ${sideImage ? heroFigure(sideImage, sideIndex, "beijing-hero-photo-side", wall?.name || "Grande Muralha", "mutianyu-great-wall") : ""}
    `;
  }

  function heroFigure(rawImage, index, className, label, group) {
    const image = normalizeImage(rawImage);
    return `
      <figure class="beijing-hero-photo ${className}" tabindex="0" role="button" data-open-media="${index}" data-media-group="${escapeAttr(group)}" aria-label="Ampliar foto: ${escapeHtml(image.caption)}">
        <img src="${escapeAttr(image.thumb)}" alt="${escapeAttr(image.alt)}" fetchpriority="high">
        <figcaption>${escapeHtml(label)}</figcaption>
      </figure>`;
  }

  function renderAttractions() {
    const target = $("[data-beijing-attractions]");
    if (!target) return;
    target.innerHTML = (guide.attractions || []).map(renderAttractionCard).join("");

    target.addEventListener("click", (event) => {
      const expandButton = event.target.closest("[data-attraction-expand]");
      if (expandButton) toggleAttraction(expandButton);

      const mediaButton = event.target.closest("[data-open-media]");
      if (mediaButton) openLightbox(Number(mediaButton.dataset.openMedia), mediaButton.dataset.mediaGroup);
    });
  }

  function renderAttractionCard(attraction, index) {
    const images = attraction.images || [];
    const attractionMediaIndices = images.map(registerMedia).filter((mediaIndex) => mediaIndex >= 0);
    mediaGroups.set(attraction.id, attractionMediaIndices);
    const previewImages = images.slice(0, 3);
    const categories = categoryMap[attraction.id] || ["imperial"];
    const categoryLabel = categories.map((key) => categoryLabels[key]).join(" · ");
    const media = previewImages.length
      ? previewImages.map((image, imageIndex) => renderAttractionImage(image, imageIndex, attractionMediaIndices[imageIndex], attraction.id)).join("")
      : `<div class="attraction-photo-placeholder"><span>${escapeHtml(attraction.chinese?.slice(0, 1) || "京")}</span></div>`;
    const source = attraction.officialSource || {};

    return `
      <article class="beijing-attraction-card" id="atracao-${escapeAttr(attraction.id)}" data-categories="${escapeAttr(categories.join(" "))}">
        <div class="attraction-media photo-count-${previewImages.length}">${media}</div>
        <div class="attraction-content">
          <div class="attraction-topline">
            <span class="attraction-number">${String(index + 1).padStart(2, "0")} · ${escapeHtml(attraction.chinese || "北京")}</span>
            <span class="attraction-category">${escapeHtml(categoryLabel)}</span>
          </div>
          <h3>${escapeHtml(attraction.name)}</h3>
          <p class="attraction-summary">${escapeHtml(attraction.summary)}</p>
          <dl class="attraction-facts">
            ${fact("Ingresso", attraction.admissionRmb)}
            ${fact("Horário", attraction.hours)}
            ${fact("Tempo", attraction.duration)}
            ${fact("Distrito", attraction.district)}
          </dl>
          <div class="attraction-action-row">
            <button class="attraction-expand" type="button" data-attraction-expand aria-expanded="false" aria-controls="detalhe-${escapeAttr(attraction.id)}">
              Guia completo <span aria-hidden="true">＋</span>
            </button>
            ${attractionMediaIndices.length ? `
              <button class="attraction-gallery-launch" type="button" data-open-media="${attractionMediaIndices[0]}" data-media-group="${escapeAttr(attraction.id)}" aria-label="Abrir as ${attractionMediaIndices.length} fotos de ${escapeAttr(attraction.name)}">
                <b>${attractionMediaIndices.length}</b> fotos <span aria-hidden="true">↗</span>
              </button>` : ""}
          </div>
          <div class="attraction-detail" id="detalhe-${escapeAttr(attraction.id)}" hidden>
            <div class="attraction-detail-grid">
              <section>
                <h4>Por que vale a visita</h4>
                <p>${escapeHtml(attraction.why)}</p>
              </section>
              <section>
                <h4>Reserva e acesso</h4>
                <p>${escapeHtml(attraction.booking)}</p>
              </section>
              <section>
                <h4>Onde fica</h4>
                <p>${escapeHtml(attraction.location)}. ${escapeHtml(attraction.nearestMetro)}</p>
              </section>
              <section>
                <h4>Melhor momento</h4>
                <p>${escapeHtml(attraction.bestTime)}</p>
              </section>
            </div>
            ${images.length ? `
              <div class="attraction-gallery-header">
                <h4>Galeria do lugar</h4>
                <span>${images.length} fotos em alta resolução</span>
              </div>
              <div class="attraction-gallery-strip" role="group" aria-label="Fotos de ${escapeAttr(attraction.name)}">
                ${images.map((image, imageIndex) => renderGalleryThumb(image, attractionMediaIndices[imageIndex], attraction.id, imageIndex)).join("")}
              </div>` : ""}
            <ul class="attraction-notes">
              ${(attraction.highlights || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
            <div class="attraction-links">
              ${source.url ? externalLink(source.url, `${source.label || "Fonte oficial"} ↗`) : ""}
              <a href="#mapa" data-focus-marker="attraction:${escapeAttr(attraction.id)}">Localizar no mapa ↓</a>
            </div>
          </div>
        </div>
      </article>`;
  }

  function renderAttractionImage(rawImage, imageIndex, mediaIndex, group) {
    const image = normalizeImage(rawImage);
    return `
      <button class="attraction-photo-button" type="button" data-open-media="${mediaIndex}" data-media-group="${escapeAttr(group)}" aria-label="Ampliar foto: ${escapeAttr(image.caption)}">
        <img src="${escapeAttr(image.thumb)}" alt="${escapeAttr(image.alt)}" loading="lazy" decoding="async">
        <span aria-hidden="true">${imageIndex === 0 ? "↗" : "+"}</span>
      </button>`;
  }

  function renderGalleryThumb(rawImage, mediaIndex, group, imageIndex) {
    const image = normalizeImage(rawImage);
    return `
      <button class="attraction-gallery-thumb" type="button" data-open-media="${mediaIndex}" data-media-group="${escapeAttr(group)}" aria-label="Abrir foto ${imageIndex + 1}: ${escapeAttr(image.caption)}">
        <img src="${escapeAttr(smallThumb(image.thumb))}" alt="" loading="lazy" decoding="async">
        <span>${String(imageIndex + 1).padStart(2, "0")}</span>
      </button>`;
  }

  function smallThumb(url) {
    return url.replace(/\/\d+px-/, "/330px-");
  }

  function fact(label, value) {
    return `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value || "Confirmar")}</dd></div>`;
  }

  function toggleAttraction(button, forceOpen) {
    const card = button.closest(".beijing-attraction-card");
    const detail = $(".attraction-detail", card);
    const shouldOpen = forceOpen ?? detail.hidden;
    detail.hidden = !shouldOpen;
    card.classList.toggle("is-expanded", shouldOpen);
    button.setAttribute("aria-expanded", String(shouldOpen));
    button.firstChild.textContent = shouldOpen ? "Recolher guia " : "Guia completo ";
  }

  function setupAttractionFilters() {
    const buttons = $$('[data-beijing-filter]');
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const filter = button.dataset.beijingFilter;
        buttons.forEach((item) => item.classList.toggle("is-active", item === button));
        $$(".beijing-attraction-card").forEach((card) => {
          const categories = card.dataset.categories.split(" ");
          card.hidden = filter !== "all" && !categories.includes(filter);
        });
      });
    });
  }

  function openDeepLinkedAttraction() {
    if (!location.hash.startsWith("#atracao-")) return;
    const card = $(location.hash);
    const button = card && $("[data-attraction-expand]", card);
    if (button) toggleAttraction(button, true);
  }

  function renderReferenceMaps() {
    const target = $("[data-reference-maps]");
    if (!target) return;
    const referenceMaps = guide.referenceMaps || [];
    const referenceMapIndices = referenceMaps.map(registerMedia).filter((mediaIndex) => mediaIndex >= 0);
    mediaGroups.set("reference-maps", referenceMapIndices);
    target.innerHTML = referenceMaps.map((mapItem, mapIndex) => {
      const image = normalizeImage(mapItem);
      const index = referenceMapIndices[mapIndex];
      return `
        <article class="reference-map-card">
          <button class="reference-map-image" type="button" data-open-media="${index}" data-media-group="reference-maps" aria-label="Ampliar ${escapeAttr(mapItem.title || image.caption)}">
            <img src="${escapeAttr(image.thumb)}" alt="${escapeAttr(image.alt)}" loading="lazy">
            <span>Ampliar ↗</span>
          </button>
          <div class="reference-map-copy">
            <h3>${escapeHtml(mapItem.title || image.caption)}</h3>
            <p>${escapeHtml(mapItem.description || "Mapa de referência para planejar a viagem.")}</p>
            ${externalLink(image.page, "Ver arquivo, versão e licença ↗")}
          </div>
        </article>`;
    }).join("");
    target.addEventListener("click", (event) => {
      const button = event.target.closest("[data-open-media]");
      if (button) openLightbox(Number(button.dataset.openMedia), button.dataset.mediaGroup);
    });
  }

  function renderHotels() {
    const note = $("[data-hotel-method]");
    const searchLink = $("[data-hotel-search]");
    const target = $("[data-beijing-hotels]");
    if (note) {
      note.textContent = guide.hotelMethod || "As opções são uma lista para conferência ao vivo; tarifa e café devem ser verificados nas datas escolhidas.";
    }
    if (searchLink && guide.hotelSearchUrl) searchLink.href = guide.hotelSearchUrl;
    if (!target) return;
    target.innerHTML = (guide.hotels || []).map((hotel) => `
      <article class="hotel-card">
        <span class="hotel-status reference">Não confirmado para as datas</span>
        <h3>${escapeHtml(hotel.name)}</h3>
        <p class="hotel-area">${escapeHtml(hotel.area || hotel.district || "Pequim")} · ${escapeHtml(hotel.metro || hotel.access || "ver localização")}</p>
        <div class="hotel-price-row">
          <strong>A confirmar</strong>
          <span>filtro-alvo<br>até ¥500/noite</span>
        </div>
        <ul>
          <li>${escapeHtml(hotel.breakfast || "A propriedade oferece café; confirme se está incluído no quarto")}</li>
          <li>${escapeHtml(hotel.reason || hotel.useCase || "Compare o tempo de metrô até as atrações")}</li>
          ${hotel.rating ? `<li>${escapeHtml(String(hotel.rating))}${hotel.reviews ? ` · ${escapeHtml(String(hotel.reviews))} avaliações` : ""}</li>` : ""}
        </ul>
        ${externalLink(hotel.liveUrl || hotel.url, "Ver tarifa ao vivo no Trip.com ↗", "hotel-link")}
        ${hotel.coords ? `<a class="hotel-map-link" href="#mapa" data-focus-marker="hotel:${escapeAttr(hotel.id || slugify(hotel.name))}">Localizar no mapa ↓</a>` : ""}
        <small>Disponibilidade, tarifa em CNY, café incluído, impostos e cancelamento não foram expostos na consulta pública. Confira antes de reservar.</small>
      </article>`).join("");
  }

  function setupTerminalTabs() {
    $$('[data-terminal-tab]').forEach((button) => {
      button.addEventListener("click", () => {
        $$('[data-terminal-tab]').forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", String(active));
        });
        renderTerminals(button.dataset.terminalTab);
      });
    });
  }

  function renderTerminals(type) {
    const target = $("[data-terminal-grid]");
    if (!target) return;
    const items = guide[type] || [];
    target.innerHTML = items.map((item) => {
      const isAirport = type === "airports";
      return `
        <article class="terminal-card" data-symbol="${isAirport ? "空" : "站"}">
          <p class="terminal-code">${escapeHtml(item.code || item.chinese || (isAirport ? "AIR" : "RAIL"))}</p>
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.summary || item.use || item.serves || "Terminal importante de Pequim.")}</p>
          <dl>
            ${terminalFact("Metrô", item.metro || item.access)}
            ${terminalFact(isAirport ? "Centro" : "Rotas", item.routes || item.destinations || item.bestFor)}
            ${terminalFact("Atenção", item.tip || item.note)}
          </dl>
        </article>`;
    }).join("");
  }

  function terminalFact(label, value) {
    return value ? `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>` : "";
  }

  function setupMap() {
    const target = $("[data-beijing-map]");
    if (!target) return;
    const locations = buildLocations();
    renderMapLocationIndex(locations, false);

    if (!window.L) {
      target.hidden = true;
      const frame = target.closest(".beijing-map-frame");
      if (frame) frame.hidden = true;
      $("[data-map-unavailable]").hidden = false;
      const toolbar = $(".beijing-map-toolbar");
      if (toolbar) toolbar.hidden = true;
      const status = $("[data-map-status]");
      if (status) status.textContent = "Mapa indisponível — use os links abaixo";
      const hint = $(".map-gesture-hint");
      if (hint) hint.hidden = true;
      renderMapLocationIndex(locations, true);
      return;
    }

    map = L.map(target, {
      scrollWheelZoom: true,
      zoomControl: false,
      tap: false,
    });
    L.control.zoom({ position: "bottomright" }).addTo(map);
    const loading = $("[data-map-loading]");
    const loadingMessage = $("[data-map-loading-message]");
    let loadedTiles = 0;
    let failedTiles = 0;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })
      .on("tileload", () => {
        loadedTiles += 1;
        if (loadedTiles === 1) loading?.classList.add("is-hidden");
      })
      .on("tileerror", () => { failedTiles += 1; })
      .addTo(map);
    setTimeout(() => {
      if (loadedTiles > 0) return;
      loading?.classList.add("has-error");
      if (loadingMessage) loadingMessage.textContent = failedTiles
        ? "O mapa-base não carregou. Os marcadores e a lista abaixo continuam disponíveis."
        : "A conexão com o mapa está demorando. Use a lista abaixo para abrir um ponto.";
    }, 7000);

    const groups = {
      attractions: L.layerGroup().addTo(map),
      hotels: L.layerGroup().addTo(map),
      metro: L.layerGroup().addTo(map),
      stations: L.layerGroup().addTo(map),
      airports: L.layerGroup().addTo(map),
    };
    const bounds = [];

    locations.forEach((location) => {
      if (!Array.isArray(location.coords)) return;
      const marker = L.marker(location.coords, { icon: mapIcon(location) });
      marker.bindPopup(mapPopup(location));
      marker.addTo(groups[location.type]);
      markerIndex.set(location.key, marker);
      bounds.push(location.coords);
    });
    const fitVisibleMarkers = () => {
      const visible = locations
        .filter((location) => map.hasLayer(groups[location.type]))
        .map((location) => location.coords)
        .filter(Array.isArray);
      if (visible.length) map.fitBounds(visible, { padding: [32, 32], maxZoom: 11 });
      const count = $("[data-map-status]");
      if (count) count.textContent = `${visible.length} ${visible.length === 1 ? "ponto visível" : "pontos visíveis"}`;
    };
    if (bounds.length) fitVisibleMarkers();

    $$('[data-map-layer]').forEach((button) => {
      button.addEventListener("click", () => {
        const group = groups[button.dataset.mapLayer];
        const active = map.hasLayer(group);
        if (active) map.removeLayer(group);
        else group.addTo(map);
        button.classList.toggle("is-active", !active);
        button.setAttribute("aria-pressed", String(!active));
        fitVisibleMarkers();
      });
      button.setAttribute("aria-pressed", "true");
    });

    $("[data-map-reset]")?.addEventListener("click", () => {
      Object.values(groups).forEach((group) => group.addTo(map));
      $$('[data-map-layer]').forEach((button) => button.classList.add("is-active"));
      $$('[data-map-layer]').forEach((button) => button.setAttribute("aria-pressed", "true"));
      fitVisibleMarkers();
    });

    if (window.ResizeObserver) new ResizeObserver(() => map.invalidateSize()).observe(target);

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-focus-marker]");
      if (!trigger) return;
      const marker = markerIndex.get(trigger.dataset.focusMarker);
      if (!marker) return;
      const location = locations.find((item) => item.key === trigger.dataset.focusMarker);
      if (location && !map.hasLayer(groups[location.type])) {
        groups[location.type].addTo(map);
        const layerButton = $(`[data-map-layer="${location.type}"]`);
        layerButton?.classList.add("is-active");
        layerButton?.setAttribute("aria-pressed", "true");
      }
      if (trigger.closest("[data-map-location-index]")) {
        $("#map-title")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setTimeout(() => {
        map.setView(marker.getLatLng(), Math.max(map.getZoom(), 13), { animate: true });
        marker.openPopup();
      }, 350);
    });
  }

  function buildLocations() {
    const attractions = (guide.attractions || []).map((item, index) => ({
      key: `attraction:${item.id}`,
      id: item.id,
      type: "attractions",
      number: index + 1,
      name: item.name,
      subtitle: item.district,
      coords: item.coords,
    }));
    const stations = (guide.stations || []).map((item) => ({
      key: `station:${item.id || slugify(item.name)}`,
      type: "stations",
      name: item.name,
      subtitle: item.metro || "Estação ferroviária",
      coords: item.coords,
    }));
    const hotels = (guide.hotels || []).filter((item) => Array.isArray(item.coords)).map((item) => ({
      key: `hotel:${item.id || slugify(item.name)}`,
      type: "hotels",
      name: item.name,
      subtitle: `${item.area || item.district} · opção da watchlist`,
      coords: item.coords,
    }));
    const metro = (guide.metroStations || []).map((item) => ({
      key: `metro:${item.id || slugify(item.name)}`,
      type: "metro",
      name: item.name,
      subtitle: `Metrô · linhas ${(item.lines || []).join(", ")}`,
      coords: item.coords,
    }));
    const airports = (guide.airports || []).map((item) => ({
      key: `airport:${item.id || slugify(item.code || item.name)}`,
      type: "airports",
      name: item.name,
      subtitle: item.code || "Aeroporto",
      coords: item.coords,
    }));
    return [...attractions, ...hotels, ...metro, ...stations, ...airports];
  }

  function mapIcon(location) {
    const className = location.type === "stations" ? "station" : location.type === "metro" ? "metro" : location.type === "hotels" ? "hotel" : location.type === "airports" ? "airport" : "";
    const label = location.type === "attractions" ? location.number : location.type === "hotels" ? "H" : location.type === "metro" ? "M" : location.type === "stations" ? "站" : "✈";
    return L.divIcon({
      className: "",
      html: `<div class="beijing-div-icon ${className}"><span>${label}</span></div>`,
      iconSize: [34, 34],
    });
  }

  function mapPopup(location) {
    const attractionLink = location.type === "attractions"
      ? `<a href="#atracao-${escapeAttr(location.id)}">Abrir ficha ↓</a>`
      : "";
    const [lat, lon] = location.coords;
    const externalLink = `<a href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=16/${lat}/${lon}" target="_blank" rel="noopener noreferrer">Abrir no OpenStreetMap ↗</a>`;
    return `<div class="map-popup"><strong>${escapeHtml(location.name)}</strong><span>${escapeHtml(location.subtitle || "")}</span>${attractionLink}${externalLink}</div>`;
  }

  function renderMapLocationIndex(locations, external) {
    const target = $("[data-map-location-index]");
    if (!target) return;
    const labels = { attractions: "Atrações", hotels: "Hotéis da watchlist", metro: "Estações de metrô principais", stations: "Estações ferroviárias", airports: "Aeroportos" };
    target.innerHTML = Object.entries(labels).map(([type, label], groupIndex) => {
      const items = locations.filter((location) => location.type === type).map((location) => {
      const prefix = location.type === "attractions" ? String(location.number).padStart(2, "0") : location.type === "hotels" ? "H" : location.type === "metro" ? "M" : location.type === "stations" ? "站" : "✈";
      if (external) {
        const [lat, lon] = location.coords;
        return `<a href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}" target="_blank" rel="noopener noreferrer"><b>${prefix}</b> ${escapeHtml(location.name)}</a>`;
      }
      return `<button type="button" data-focus-marker="${escapeAttr(location.key)}"><b>${prefix}</b> ${escapeHtml(location.name)}</button>`;
      }).join("");
      return `<details class="map-location-group"${groupIndex === 0 ? " open" : ""}><summary>${label} (${locations.filter((location) => location.type === type).length})</summary><div class="map-location-items">${items}</div></details>`;
    }).join("");
  }

  function renderSources() {
    const sourceTarget = $("[data-beijing-sources]");
    const creditTarget = $("[data-beijing-credits]");
    const sources = [];
    (guide.attractions || []).forEach((item) => {
      if (item.officialSource?.url) sources.push(item.officialSource);
    });
    (guide.sources || []).forEach((item) => {
      if (typeof item === "string") sources.push({ label: item, url: item });
      else if (item?.url) sources.push(item);
    });

    const uniqueSources = uniqueBy(sources, (item) => item.url);
    if (sourceTarget) {
      sourceTarget.innerHTML = uniqueSources.map((item) => externalLink(item.url, item.label || item.url)).join("");
    }

    const images = [];
    (guide.attractions || []).forEach((item) => images.push(...(item.images || [])));
    images.push(...(guide.referenceMaps || []));
    const uniqueImages = uniqueBy(images.map(normalizeImage), (item) => item.page);
    if (creditTarget) {
      creditTarget.innerHTML = uniqueImages.map((image) => `
        <a href="${escapeAttr(image.page)}" target="_blank" rel="noopener noreferrer">
          ${escapeHtml(image.caption)}
          <small>${escapeHtml(image.credit)} · ${escapeHtml(image.license)}</small>
        </a>`).join("");
    }
  }

  function setupLightbox() {
    document.addEventListener("click", (event) => {
      const trigger = event.target.closest("[data-open-media]");
      if (trigger && !trigger.closest("[data-beijing-attractions], [data-reference-maps]")) {
        openLightbox(Number(trigger.dataset.openMedia), trigger.dataset.mediaGroup);
      }
    });
    document.addEventListener("keydown", (event) => {
      const trigger = event.target.closest?.("[data-open-media]");
      if (!trigger || trigger.matches("button, a") || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      openLightbox(Number(trigger.dataset.openMedia), trigger.dataset.mediaGroup);
    });

    const dialog = $("[data-beijing-lightbox]");
    if (!dialog) return;
    const viewport = $("[data-lightbox-viewport]");
    const image = $("[data-beijing-lightbox-image]");
    const mapControls = $("[data-lightbox-map-controls]");
    $("[data-beijing-lightbox-close]")?.addEventListener("click", closeLightbox);
    $("[data-beijing-lightbox-prev]")?.addEventListener("click", () => moveLightbox(-1));
    $("[data-beijing-lightbox-next]")?.addEventListener("click", () => moveLightbox(1));
    $("[data-lightbox-zoom-in]")?.addEventListener("click", () => setLightboxMapZoom(lightboxMapScale + 0.5));
    $("[data-lightbox-zoom-out]")?.addEventListener("click", () => setLightboxMapZoom(lightboxMapScale - 0.5));
    $("[data-lightbox-zoom-reset]")?.addEventListener("click", () => resetLightboxMap());
    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeLightbox();
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeLightbox();
    });
    dialog.addEventListener("touchstart", (event) => {
      if (lightboxMapMode) return;
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    dialog.addEventListener("touchend", (event) => {
      if (lightboxMapMode) return;
      const delta = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(delta) > 55) moveLightbox(delta > 0 ? -1 : 1);
    }, { passive: true });
    document.addEventListener("keydown", (event) => {
      if (!dialog.open) return;
      if (event.key === "ArrowLeft") moveLightbox(-1);
      if (event.key === "ArrowRight") moveLightbox(1);
      if (event.key === "Escape") closeLightbox();
      if (lightboxMapMode && (event.key === "+" || event.key === "=")) setLightboxMapZoom(lightboxMapScale + 0.5);
      if (lightboxMapMode && event.key === "-") setLightboxMapZoom(lightboxMapScale - 0.5);
    });

    viewport?.addEventListener("wheel", (event) => {
      if (!lightboxMapMode) return;
      event.preventDefault();
      setLightboxMapZoom(lightboxMapScale + (event.deltaY < 0 ? 0.35 : -0.35));
    }, { passive: false });

    viewport?.addEventListener("pointerdown", (event) => {
      if (!lightboxMapMode) return;
      viewport.setPointerCapture(event.pointerId);
      lightboxMapPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (lightboxMapPointers.size === 1) {
        lightboxMapDrag = {
          x: event.clientX,
          y: event.clientY,
          offset: { ...lightboxMapOffset },
        };
      } else if (lightboxMapPointers.size === 2) {
        lightboxMapDrag = null;
        lightboxMapPinch = {
          distance: lightboxMapPointerDistance(),
          scale: lightboxMapScale,
        };
      }
    });

    viewport?.addEventListener("pointermove", (event) => {
      if (!lightboxMapMode || !lightboxMapPointers.has(event.pointerId)) return;
      lightboxMapPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (lightboxMapPointers.size >= 2 && lightboxMapPinch) {
        const distance = lightboxMapPointerDistance();
        setLightboxMapZoom(lightboxMapPinch.scale * (distance / lightboxMapPinch.distance));
      } else if (lightboxMapDrag && lightboxMapScale > 1) {
        lightboxMapOffset = {
          x: lightboxMapDrag.offset.x + event.clientX - lightboxMapDrag.x,
          y: lightboxMapDrag.offset.y + event.clientY - lightboxMapDrag.y,
        };
        applyLightboxMapTransform();
      }
    });

    const endMapPointer = (event) => {
      lightboxMapPointers.delete(event.pointerId);
      if (lightboxMapPointers.size < 2) lightboxMapPinch = null;
      if (!lightboxMapPointers.size) lightboxMapDrag = null;
    };
    viewport?.addEventListener("pointerup", endMapPointer);
    viewport?.addEventListener("pointercancel", endMapPointer);
    image?.addEventListener("load", applyLightboxMapTransform);
    mapControls?.addEventListener("click", (event) => event.stopPropagation());
  }

  function openLightbox(index, group) {
    if (!Number.isFinite(index) || !mediaItems[index]) return;
    const dialog = $("[data-beijing-lightbox]");
    const groupedIndices = group ? mediaGroups.get(group) : null;
    activeMediaIndices = groupedIndices?.length ? groupedIndices : mediaItems.map((_, mediaIndex) => mediaIndex);
    if (!activeMediaIndices.includes(index)) activeMediaIndices.unshift(index);
    lightboxIndex = index;
    lightboxMapMode = group === "reference-maps";
    resetLightboxMap();
    updateLightbox();
    if (dialog.open) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    const dialog = $("[data-beijing-lightbox]");
    if (dialog?.open && typeof dialog.close === "function") dialog.close();
    else dialog?.removeAttribute("open");
    document.body.classList.remove("lightbox-open");
  }

  function moveLightbox(direction) {
    if (!activeMediaIndices.length) return;
    const currentPosition = Math.max(0, activeMediaIndices.indexOf(lightboxIndex));
    const nextPosition = (currentPosition + direction + activeMediaIndices.length) % activeMediaIndices.length;
    lightboxIndex = activeMediaIndices[nextPosition];
    resetLightboxMap();
    updateLightbox();
  }

  function updateLightbox() {
    const item = mediaItems[lightboxIndex];
    if (!item) return;
    const image = $("[data-beijing-lightbox-image]");
    const dialog = $("[data-beijing-lightbox]");
    const viewport = $("[data-lightbox-viewport]");
    image.src = lightboxImageSource(item);
    image.alt = item.alt;
    dialog?.classList.toggle("is-map-mode", lightboxMapMode);
    viewport?.setAttribute("aria-label", lightboxMapMode ? "Mapa ampliável: use a roda, os botões ou arraste" : "Imagem ampliada");
    $("[data-lightbox-map-controls]")?.toggleAttribute("hidden", !lightboxMapMode);
    applyLightboxMapTransform();
    $("[data-beijing-lightbox-caption]").textContent = item.caption;
    $("[data-beijing-lightbox-credit]").textContent = `${item.credit} · ${item.license}`;
    const source = $("[data-beijing-lightbox-source]");
    source.href = item.page || item.original;
    const position = Math.max(0, activeMediaIndices.indexOf(lightboxIndex));
    $("[data-beijing-lightbox-counter]").textContent = `${String(position + 1).padStart(2, "0")} / ${String(activeMediaIndices.length).padStart(2, "0")}`;
  }

  function resetLightboxMap() {
    lightboxMapScale = 1;
    lightboxMapOffset = { x: 0, y: 0 };
    lightboxMapPointers.clear();
    lightboxMapDrag = null;
    lightboxMapPinch = null;
    applyLightboxMapTransform();
  }

  function setLightboxMapZoom(scale) {
    lightboxMapScale = Math.min(8, Math.max(1, scale));
    if (lightboxMapScale === 1) lightboxMapOffset = { x: 0, y: 0 };
    applyLightboxMapTransform();
  }

  function applyLightboxMapTransform() {
    const viewport = $("[data-lightbox-viewport]");
    const image = $("[data-beijing-lightbox-image]");
    if (!viewport || !image) return;
    if (!lightboxMapMode) {
      image.style.transform = "";
      return;
    }
    const maxX = Math.max(0, (image.offsetWidth * (lightboxMapScale - 1)) / 2);
    const maxY = Math.max(0, (image.offsetHeight * (lightboxMapScale - 1)) / 2);
    lightboxMapOffset = {
      x: Math.min(maxX, Math.max(-maxX, lightboxMapOffset.x)),
      y: Math.min(maxY, Math.max(-maxY, lightboxMapOffset.y)),
    };
    image.style.transform = `translate(${lightboxMapOffset.x}px, ${lightboxMapOffset.y}px) scale(${lightboxMapScale})`;
  }

  function lightboxMapPointerDistance() {
    const points = [...lightboxMapPointers.values()];
    if (points.length < 2) return 1;
    return Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
  }

  function externalLink(url, label, className = "") {
    if (!url) return "";
    return `<a${className ? ` class="${escapeAttr(className)}"` : ""} href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(label)}</a>`;
  }

  function uniqueBy(items, keyFunction) {
    const seen = new Set();
    return items.filter((item) => {
      const key = keyFunction(item);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function slugify(value = "") {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function escapeHtml(value = "") {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttr(value = "") {
    return escapeHtml(value);
  }
})();

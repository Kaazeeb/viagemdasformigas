(function () {
  "use strict";

  const escape = (value) => String(value == null ? "" : value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character]));
  const list = (value) => Array.isArray(value) ? value : [];
  const safeURL = (value) => {
    const url = String(value || "").trim();
    return /^(https?:\/\/|(?:\.?\.?\/)?[a-zA-Z0-9_-])/.test(url) && !/^(javascript|data|vbscript):/i.test(url) ? escape(url) : "#";
  };
  const sourceID = (id) => "fonte-" + String(id).replace(/[^a-zA-Z0-9_-]/g, "-");
  const stepID = (day, step, index) => "etapa-" + day.id + "-" + String(step.id || index + 1).replace(/[^a-zA-Z0-9_-]/g, "-");
  const copyIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>';
  const icons = {
    visit: '<path d="M3 9h18M5 9v11m7-11v11m7-11v11M2 21h20M2 7l10-5 10 5H2Z"/>',
    transport: '<rect x="5" y="2" width="14" height="17" rx="3"/><path d="M5 11h14M9 5h6M8 19l-2 3m10-3 2 3M8 15h1m6 0h1"/>',
    meal: '<path d="M5 2v7m3-7v7m-6-7v7c0 2 6 2 6 0M5 11v11M18 2c-4 3-4 10 0 10h2V2h-2Zm2 10v10"/>',
    rest: '<path d="M4 12V7m16 5V7M2 12h20v8M2 16h20M4 20v2m16-2v2M5 7h14V3H5v4Z"/>',
    logistics: '<rect x="4" y="6" width="16" height="15" rx="2"/><path d="M9 6V3h6v3M9 11v5m6-5v5"/>'
  };
  const labels = { visit: "Visita", transport: "Como chegar", meal: "Pausa para comer", rest: "Descanso", logistics: "Organização do dia" };
  const icon = (type) => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (icons[type] || icons.visit) + "</svg>";
  const copyButton = (value, label) => '<button type="button" class="copy-button js-only" data-copy="' + escape(value) + '" aria-label="' + escape(label || "Copiar nome em chinês") + '" hidden>' + copyIcon + '<span>Copiar</span></button>';
  const fact = (label, value) => value ? "<div><dt>" + escape(label) + "</dt><dd>" + escape(value) + "</dd></div>" : "";

  function hotelHTML(data) {
    const hotel = data.hotel || {};
    return '<p class="eyebrow">Nossa base · 23–27 setembro</p><h2>' + escape(hotel.name || "Xingyi Hotel") + '</h2><p class="hotel-zh" lang="zh-Hans">' + escape(hotel.zh) + '</p><p class="hotel-address" lang="zh-Hans">' + escape(hotel.address) + "</p>" + (hotel.notes ? '<p class="hotel-notes">' + escape(Array.isArray(hotel.notes) ? hotel.notes.join(" ") : hotel.notes) + "</p>" : "") + copyButton([hotel.zh, hotel.address].filter(Boolean).join("\n"), "Copiar nome e endereço do hotel em chinês");
  }

  function essentialsHTML(data) {
    return list(data.essentials).map((item) => "<article><h2>" + escape(item.title) + "</h2><p>" + escape(item.text) + "</p></article>").join("");
  }

  function photoHTML(photo) {
    const credit = photo.credit ? escape(photo.credit) : "Ver autoria na fonte";
    const creditLink = photo.page ? '<a href="' + safeURL(photo.page) + '" target="_blank" rel="noopener noreferrer">' + credit + "</a>" : credit;
    const license = photo.license ? " · " + (photo.licenseUrl ? '<a href="' + safeURL(photo.licenseUrl) + '" target="_blank" rel="noopener noreferrer">' + escape(photo.license) + "</a>" : escape(photo.license)) : "";
    return '<figure class="place-photo"><img src="' + safeURL(photo.src) + '" alt="' + escape(photo.alt || photo.caption) + '" loading="lazy" decoding="async"><figcaption>' + escape(photo.caption || photo.alt) + '<span class="photo-credit">Foto: ' + creditLink + license + "</span></figcaption></figure>";
  }

  function stepHTML(day, step, index, sources) {
    const id = stepID(day, step, index);
    const type = labels[step.type] ? step.type : "visit";
    const selectedSources = list(step.sources).map((id) => sources.find((source) => source.id === id)).filter(Boolean);
    const transportLabels = { walkBefore: "Caminhada inicial", ride: "No transporte", transfer: "Baldeação", walkAfter: "Caminhada final", buffer: "Margem / espera" };
    const transport = step.transport ? Object.keys(transportLabels).map((key) => fact(transportLabels[key], step.transport[key])).join("") : "";
    const timing = fact("Chegada prevista", step.arrival) + fact("Permanência", step.duration) + fact("Próxima saída", step.leave);
    const gates = fact("Entrar por", step.entry) + fact("Sair por", step.exit);
    let html = '<li class="timeline-item"><span class="timeline-marker" aria-hidden="true">' + String(index + 1).padStart(2, "0") + '</span><article class="step-card step-' + type + '" id="' + id + '" aria-labelledby="' + id + '-title"><div class="step-main"><div class="step-topline"><span class="step-kind">' + icon(type) + escape(labels[type]) + '</span><span class="step-time">' + escape(step.time) + '</span></div><h3 id="' + id + '-title">' + escape(step.title) + "</h3>";
    if (step.zh) html += '<div class="place-name"><p lang="zh-Hans">' + escape(step.zh) + "</p>" + copyButton(step.zh, "Copiar " + step.title + " em chinês") + "</div>";
    if (step.summary) html += '<p class="step-summary">' + escape(step.summary) + "</p>";
    if (timing) html += '<dl class="step-facts">' + timing + "</dl>";
    if (gates) html += '<dl class="gates">' + gates + "</dl>";
    if (transport) html += '<dl class="transport-breakdown">' + transport + "</dl>";
    if (list(step.instructions).length) html += '<ol class="instructions">' + step.instructions.map((instruction) => "<li>" + escape(instruction) + "</li>").join("") + "</ol>";
    if (list(step.alerts).length) html += '<aside class="alerts" aria-label="Atenção para esta etapa"><h4>Antes de chegar</h4><ul>' + step.alerts.map((alert) => "<li>" + escape(alert) + "</li>").join("") + "</ul></aside>";
    html += "</div>";
    if (step.map && step.map.src) html += '<figure class="schematic"><button type="button" data-map="' + safeURL(step.map.src) + '" data-map-alt="' + escape(step.map.alt || step.title) + '" data-map-title="' + escape(step.title) + '" data-map-caption="' + escape(step.map.caption || "") + '" aria-label="Ampliar mapa: ' + escape(step.title) + '"><img src="' + safeURL(step.map.src) + '" alt="' + escape(step.map.alt || "Mapa esquemático: " + step.title) + '" loading="lazy" decoding="async"><span class="zoom-label js-only" hidden><span aria-hidden="true">↗</span> Ampliar percurso</span></button><figcaption><strong>Mapa do percurso · sem escala</strong>' + escape(step.map.caption || "Siga a numeração do esquema para conectar entrada, visita e saída.") + "</figcaption></figure>";
    if (list(step.photos).length) html += '<div class="photo-grid' + (step.photos.length === 1 ? " single" : "") + '" aria-label="Fotos para reconhecer o local">' + step.photos.map(photoHTML).join("") + "</div>";
    html += '<div class="step-footer">';
    if (selectedSources.length) html += '<details class="step-sources"><summary>Fontes desta etapa (' + selectedSources.length + ")</summary><ul>" + selectedSources.map((source) => '<li><a href="' + safeURL(source.url) + '" target="_blank" rel="noopener noreferrer">' + escape(source.label) + "</a></li>").join("") + "</ul></details>";
    else html += '<span class="step-sources">Horários aproximados · Pequim</span>';
    html += '<button type="button" class="complete-button js-only" data-complete="' + id + '" aria-pressed="false" aria-label="Marcar como concluída: ' + escape(step.title) + '" hidden><span>Etapa concluída</span></button></div></article></li>';
    return html;
  }

  function daysHTML(data) {
    return list(data.days).map((day) => {
      const route = list(day.steps).filter((step) => step.type === "visit").map((step) => '<li>' + escape(step.title) + "</li>").join("");
      return '<section class="day-section" id="dia-' + escape(day.id) + '" data-day="' + escape(day.id) + '" aria-labelledby="title-' + escape(day.id) + '"><header class="day-header"><div class="day-date-number" aria-hidden="true">' + escape(day.id) + '<small>setembro</small></div><div><p class="eyebrow">' + escape(day.weekday) + " · " + escape(day.date) + '</p><h2 id="title-' + escape(day.id) + '">' + escape(day.title) + '</h2><p class="day-summary">' + escape(day.summary) + '</p><dl class="day-facts">' + fact("Saída do hotel", day.departure) + fact("Retorno / fim", day.returnTime) + '</dl></div></header>' + (route ? '<ol class="route-overview" aria-label="Sequência das visitas">' + route + '</ol>' : '') + (day.note ? '<p class="day-note">' + escape(day.note) + '</p>' : '') + '<ol class="timeline" aria-label="Etapas do dia ' + escape(day.id) + '">' + list(day.steps).map((step, index) => stepHTML(day, step, index, list(data.sources))).join("") + "</ol></section>";
    }).join("");
  }

  function sourcesHTML(data) {
    return '<ol class="source-list">' + list(data.sources).map((source) => '<li id="' + sourceID(source.id) + '"><a href="' + safeURL(source.url) + '" target="_blank" rel="noopener noreferrer">' + escape(source.label) + "</a></li>").join("") + "</ol>";
  }

  // The same renderers generate the checked-in HTML, so the whole guide also works without JavaScript.
  const renderers = { hotel: hotelHTML, essentials: essentialsHTML, days: daysHTML, sources: sourcesHTML };
  if (typeof window !== "undefined") window.BEIJING_GUIDE_RENDER = renderers;
  if (typeof document === "undefined") return;

  function init() {
    const data = window.BEIJING_FINAL;
    if (data && list(data.days).length) {
      document.getElementById("hotel-card").innerHTML = hotelHTML(data);
      document.getElementById("essentials").innerHTML = essentialsHTML(data);
      document.getElementById("guide-days").innerHTML = daysHTML(data);
      document.getElementById("guide-sources").innerHTML = sourcesHTML(data);
      document.getElementById("updated-at").textContent = data.updatedAt ? "Informações conferidas em " + data.updatedAt + "." : "";
    }

    const daySections = Array.from(document.querySelectorAll("[data-day]"));
    if (!daySections.length) return;
    document.querySelectorAll(".js-only").forEach((node) => { node.hidden = false; });
    const dayLinks = Array.from(document.querySelectorAll("[data-day-link]"));
    const allButton = document.getElementById("show-all");
    const status = document.getElementById("guide-status");
    let showingAll = false;
    let previousMapFocus = null;
    let previousDetailStates = [];
    let savedOverflow = "";
    const storageKey = "rota-china-pequim-final-2026-etapas-v1";
    let completed = new Set();
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      if (Array.isArray(saved)) completed = new Set(saved.filter((item) => typeof item === "string"));
    } catch (_) { /* Storage is optional, including in private browsing. */ }

    function updateCompleted(button) {
      const done = completed.has(button.dataset.complete);
      button.setAttribute("aria-pressed", String(done));
      button.closest(".step-card").classList.toggle("is-complete", done);
      const title = button.closest(".step-card").querySelector("h3").textContent;
      button.setAttribute("aria-label", (done ? "Desmarcar etapa concluída: " : "Marcar como concluída: ") + title);
    }
    document.querySelectorAll("[data-complete]").forEach(updateCompleted);

    function showDays(dayID, all) {
      showingAll = all;
      daySections.forEach((section) => { section.hidden = !all && section.dataset.day !== dayID; });
      dayLinks.forEach((link) => {
        if (!all && link.dataset.dayLink === dayID) link.setAttribute("aria-current", "date");
        else link.removeAttribute("aria-current");
      });
      allButton.setAttribute("aria-pressed", String(all));
      allButton.textContent = all ? "Os 4 dias estão visíveis" : "Ver os 4 dias";
    }

    function selectHash(scroll) {
      let hash = window.location.hash.slice(1);
      try { hash = decodeURIComponent(hash); } catch (_) { /* Keep a malformed external fragment harmless. */ }
      if (hash === "todos-os-dias") {
        showDays("", true);
        if (scroll) daySections[0].scrollIntoView({ block: "start" });
        return;
      }
      const target = hash ? document.getElementById(hash) : null;
      const day = target && target.closest("[data-day]");
      if (day) {
        showDays(day.dataset.day, false);
        if (scroll) target.scrollIntoView({ block: "start" });
      } else if (!showingAll) showDays(daySections[0].dataset.day, false);
    }
    selectHash(Boolean(window.location.hash));
    window.addEventListener("hashchange", () => selectHash(true));

    allButton.addEventListener("click", () => {
      showDays("", true);
      history.replaceState(null, "", "#todos-os-dias");
      status.textContent = "Os quatro dias estão visíveis.";
    });
    dayLinks.forEach((link) => link.addEventListener("click", () => {
      const id = link.dataset.dayLink;
      showDays(id, false);
      if (window.location.hash === "#dia-" + id) document.getElementById("dia-" + id).scrollIntoView({ block: "start" });
    }));

    async function copyText(button) {
      const value = button.dataset.copy;
      let copied = false;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
          copied = true;
        }
      } catch (_) { /* Fall back to an editable selection. */ }
      if (!copied) {
        const textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        try { copied = document.execCommand("copy"); } catch (_) { copied = false; }
        textarea.remove();
        button.focus({ preventScroll: true });
      }
      const label = button.querySelector("span");
      label.textContent = copied ? "Copiado" : "Selecione o texto acima";
      status.textContent = copied ? "Nome em chinês copiado." : "Não foi possível copiar automaticamente. O texto em chinês está visível acima do botão para selecionar e copiar.";
      if (!copied) {
        const source = button.parentElement.querySelector("[lang]");
        if (source) {
          const range = document.createRange();
          range.selectNodeContents(source);
          const selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
      window.setTimeout(() => { label.textContent = "Copiar"; }, 2500);
    }

    const dialog = document.getElementById("map-dialog");
    document.addEventListener("click", (event) => {
      const copy = event.target.closest("[data-copy]");
      if (copy) { copyText(copy); return; }
      const complete = event.target.closest("[data-complete]");
      if (complete) {
        if (completed.has(complete.dataset.complete)) completed.delete(complete.dataset.complete);
        else completed.add(complete.dataset.complete);
        updateCompleted(complete);
        try { localStorage.setItem(storageKey, JSON.stringify(Array.from(completed))); } catch (_) { /* Completion still works for this page session. */ }
        return;
      }
      const map = event.target.closest("[data-map]");
      if (map) {
        if (typeof dialog.showModal !== "function") {
          window.open(map.dataset.map, "_blank", "noopener,noreferrer");
          return;
        }
        previousMapFocus = map;
        document.getElementById("map-dialog-title").textContent = map.dataset.mapTitle;
        const image = document.getElementById("map-dialog-image");
        image.src = map.dataset.map;
        image.alt = map.dataset.mapAlt;
        document.getElementById("map-dialog-caption").textContent = map.dataset.mapCaption;
        savedOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialog.showModal();
        document.getElementById("close-map").focus();
      }
    });
    document.getElementById("close-map").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
    dialog.addEventListener("close", () => {
      document.body.style.overflow = savedOverflow;
      if (previousMapFocus) previousMapFocus.focus({ preventScroll: true });
    });

    document.getElementById("print-guide").addEventListener("click", () => window.print());
    window.addEventListener("beforeprint", () => {
      previousDetailStates = Array.from(document.querySelectorAll(".step-sources, .predeparture")).map((node) => ({ node, open: node.open }));
      previousDetailStates.forEach(({ node }) => { node.open = true; });
    });
    window.addEventListener("afterprint", () => previousDetailStates.forEach(({ node, open }) => { node.open = open; }));
    document.getElementById("back-top").addEventListener("click", (event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());

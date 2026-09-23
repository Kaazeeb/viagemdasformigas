/* Carrega apenas a ficha solicitada. Scripts clássicos também funcionam em file://. */
(() => {
  'use strict';
  const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  const VERSION_PATTERN = /^[a-f0-9]{64}$/;
  const TIMEOUT_MS = 45000;

  function create(dataset) {
    const descriptors = new Map();
    const loaded = new Map();
    const pending = new Map();
    for (const item of Array.isArray(dataset?.restaurants) ? dataset.restaurants : []) {
      if (!item || typeof item.id !== 'string' || !ID_PATTERN.test(item.id) || descriptors.has(item.id)) throw new Error('Índice de restaurantes inválido.');
      descriptors.set(item.id, { id: item.id, file: item.detailFile, version: item.detailVersion });
    }
    function descriptor(id) {
      const entry = descriptors.get(id);
      if (!entry || !VERSION_PATTERN.test(entry.version)
        || entry.file !== `dados/fichas/${entry.id}-${entry.version.slice(0, 16)}.js`) {
        throw new Error('O caminho ou a versão desta ficha é inválido. Atualize a página e tente novamente.');
      }
      return entry;
    }
    function payload(entry) {
      const registry = window.RESTAURANTES_FICHAS;
      const value = registry && Object.hasOwn(registry, entry.id) ? registry[entry.id] : null;
      if (!value || value.version !== entry.version || !value.restaurant
        || typeof value.restaurant !== 'object' || Array.isArray(value.restaurant)
        || value.restaurant.id !== entry.id || !value.restaurant.rich
        || typeof value.restaurant.rich !== 'object' || Array.isArray(value.restaurant.rich)) {
        throw new Error('A ficha recebida não corresponde à versão deste índice. Atualize a página ou copie novamente a pasta completa.');
      }
      return value.restaurant;
    }
    function peek(id) { return loaded.get(id) || null; }
    function load(id) {
      let entry;
      try { entry = descriptor(id); } catch (error) { return Promise.reject(error); }
      if (loaded.has(id)) return Promise.resolve(loaded.get(id));
      if (pending.has(id)) return pending.get(id);
      const script = document.createElement('script');
      script.async = true;
      script.src = entry.file;
      // Publicar a Promise antes de inserir o script evita até chamadas simultâneas.
      let resolveRequest, rejectRequest;
      const request = new Promise((resolve, reject) => { resolveRequest = resolve; rejectRequest = reject; });
      pending.set(id, request);
      let settled = false;
      let timer;
      function finish(error, restaurant) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        script.onload = null;
        script.onerror = null;
        script.remove();
        pending.delete(id);
        if (error) rejectRequest(error);
        else { loaded.set(id, restaurant); resolveRequest(restaurant); }
      }
      script.onload = () => {
        try { finish(null, payload(entry)); } catch (error) { finish(error); }
      };
      script.onerror = () => finish(new Error('Não foi possível carregar esta ficha. Confira a conexão ou se a pasta dados/fichas foi copiada junto com a página.'));
      timer = setTimeout(() => finish(new Error('O carregamento demorou demais. Confira a conexão e tente novamente.')), TIMEOUT_MS);
      try { document.head.append(script); } catch { finish(new Error('O navegador não permitiu carregar esta ficha. Atualize a página e tente novamente.')); }
      return request;
    }
    return Object.freeze({ load, peek });
  }
  window.RESTAURANTES_CARREGADOR = Object.freeze({ create });
})();

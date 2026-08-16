window.BEIJING_GUIDE_READY = Promise.all([
  fetch("beijing-attractions.json").then((response) => {
    if (!response.ok) throw new Error("Não foi possível carregar as atrações de Pequim.");
    return response.json();
  }),
  fetch("beijing-streets.json").then((response) => {
    if (!response.ok) throw new Error("Não foi possível carregar as ruas de Pequim.");
    return response.json();
  }),
  fetch("beijing-logistics.json").then((response) => {
    if (!response.ok) throw new Error("Não foi possível carregar os dados de transporte e hotéis.");
    return response.json();
  }),
  fetch("beijing-media.json").then((response) => {
    if (!response.ok) throw new Error("Não foi possível carregar as imagens e os mapas.");
    return response.json();
  }),
  fetch("beijing-metro.json").then((response) => {
    if (!response.ok) throw new Error("Não foi possível carregar as linhas e estações de metrô.");
    return response.json();
  }),
]).then(([attractions, streets, logistics, media, metro]) => {
  const imagesByAttraction = media.imagesByAttraction || {};
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
  const method = logistics.hotelMethod || {};
  const hotels = (logistics.hotels || []).map((hotel) => ({
    ...hotel,
    id: hotel.tripHotelId,
    coords: hotel.coordinates ? [hotel.coordinates.lat, hotel.coordinates.lng] : null,
    metro: (hotel.nearestTransit || []).map((stop) => {
      const distance = stop.distanceMeters ? ` · ${stop.distanceMeters} m` : "";
      const lines = stop.lines?.length ? ` · ${stop.lines.join("/")}` : "";
      return `${stop.name}${distance}${lines}`;
    }).join("; "),
    breakfast: `Café oferecido: ${hotel.breakfastOffered || "confirmar formato"}. A inclusão no plano de quarto não foi exposta.`,
    reason: hotel.area?.includes("Airport") || hotel.area?.includes("Tianzhu")
      ? "Útil para voo cedo ou chegada tardia; pouco prático como base turística central."
      : hotel.area?.includes("West Railway")
        ? "Prático para quem chega ou parte por Beijing West; compare o tempo até o centro histórico."
        : `Candidato pela conexão em ${hotel.area || hotel.district}; compare a tarifa final e o deslocamento.`,
    rating: hotel.rating ? `${hotel.rating.score}/${hotel.rating.scale}` : "",
    reviews: hotel.rating?.reviewCount ? hotel.rating.reviewCount.toLocaleString("pt-BR") : "",
    liveUrl: hotel.requestedDateUrl || hotel.propertyUrl,
  }));
  const stations = (logistics.stations || []).map((station) => ({
    ...station,
    code: station.nameZh,
    coords: station.coordinates ? [station.coordinates.lat, station.coordinates.lng] : null,
    metro: station.metroLines?.length ? `Linhas ${station.metroLines.join(" e ")}` : "Confirmar conexão",
    summary: station.mainServices,
    routes: station.mainServices,
  }));
  const airports = (logistics.airports || []).map((airport) => {
    const fare = airport.rail?.fareCny || airport.rail?.ordinaryFareCny;
    const route = airport.rail?.route?.join(" → ") || (airport.rail?.cityTerminal ? `até ${airport.rail.cityTerminal}` : "");
    return {
      ...airport,
      code: airport.iata,
      coords: airport.coordinates ? [airport.coordinates.lat, airport.coordinates.lng] : null,
      metro: `${airport.rail?.name || "Trem aeroportuário"}${fare ? ` · ¥${fare}` : ""}`,
      summary: `${airport.distanceFromCentralBeijingKm} km do centro. ${airport.airportBus || ""}`,
      routes: route,
    };
  });
  return {
    ...logistics,
    ...media,
    hotels,
    stations,
    airports,
    metroStations: metro.stations || logistics.metroStations || [],
    metroLines: metro.lines || [],
    hotelSearchUrl: method.searchUrl,
    hotelMethod: `${method.result || "Nenhuma opção foi confirmada."} ${method.limitation || ""} ${method.holidayNotice || ""}`,
    attractions: attractions.map((attraction) => ({
      ...attraction,
      images: imagesByAttraction[imageKeys[attraction.id]]?.images || [],
    })),
    streets,
    referenceMaps: Object.values(media.referenceMaps || {}).map((item) => ({
      ...item,
      description: `${item.coverage || ""} ${item.title?.includes("metrô") ? "Use como referência e confirme extensões futuras no operador." : "Use para compreender a escala do município, não como mapa de navegação."}`.trim(),
    })),
    sources: [...(logistics.sources || []), ...(media.sources || []), ...(metro.sources || [])],
  };
});

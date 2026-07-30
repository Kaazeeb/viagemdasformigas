"use strict";

const destinations = [
  {
    id: "xian",
    order: 1,
    name: "Xi’an",
    chinese: "西安",
    province: "Shaanxi",
    tag: "História imperial",
    categories: ["history", "food"],
    days: "2–3 dias",
    best: "mar–mai · set–nov",
    rhythm: "Urbano e cultural",
    effort: "Leve a moderado",
    ideal: "Primeira imersão na China antiga",
    base: "Centro histórico",
    short:
      "A melhor porta de entrada para impérios, arqueologia e a antiga Rota da Seda.",
    description:
      "Antiga Chang’an e uma das grandes capitais históricas chinesas, Xi’an alterna monumentos de escala imperial com a energia do Bairro Muçulmano. Reserve um dia quase inteiro para o sítio arqueológico e use o fim da tarde para a muralha.",
    highlights: [
      {
        title: "Exército de Terracota",
        summary:
          "Os três fossos com guerreiros, cavalos e carruagens revelam a escala do complexo do primeiro imperador. O bilhete inclui Lishan Garden.",
        location:
          "Distrito de Lintong, cerca de 35–40 km a nordeste do centro de Xi’an.",
        access:
          "Metrô Linha 9 até Huaqingchi, saída C, seguido dos ônibus Lintong 602 ou 613; conte 1h30–2h desde o centro.",
        admission:
          "RMB 120 adulto; RMB 60 para estudantes elegíveis. Inclui os fossos, Lishan Garden e traslado entre as áreas.",
        hours:
          "16 mar–15 nov: 08:30–17:00; 16 nov–15 mar: 08:30–16:30. De 11 jul a 21 ago/2026, horário ampliado divulgado: 08:00–19:30.",
        duration: "3–4 horas; até 5 horas incluindo Lishan Garden.",
        booking:
          "Reserva nominal antecipada obrigatória. Leve o passaporte original e chegue cerca de 30 minutos antes.",
        priceNote: "Oficial · verão a confirmar",
        sources: [
          {
            label: "Museu oficial — ingressos e horários",
            url: "https://www.bmy.com.cn/jingtai/bmyweb/ticketing.html",
          },
          {
            label: "UNESCO — Mausoléu do Imperador Qin",
            url: "https://whc.unesco.org/en/list/441/",
          },
        ],
      },
      {
        title: "Muralha de Xi’an",
        summary:
          "A fortificação Ming circunda quase 14 km do centro histórico; o trecho de Yongningmen é prático para caminhar, pedalar e ver o pôr do sol.",
        location:
          "Circunda o centro; o acesso principal de Yongningmen fica na extremidade sul do núcleo histórico.",
        access:
          "Metrô Linha 2 até Yongningmen. Também há acessos pelas portas Norte, Leste e Oeste.",
        admission:
          "RMB 54 adulto; RMB 27 para visitantes elegíveis de 7 a 18 anos. Bicicleta e depósito são pagos à parte.",
        hours:
          "Referência desde 1 jul/2026: 08:00–22:00. Portões e saídas disponíveis podem variar durante eventos.",
        duration: "2–3 horas; 3–4 horas para uma volta extensa a pé.",
        booking:
          "Compra no dia costuma ser possível, mas reserve em fins de semana, feriados e eventos noturnos. Leve o passaporte.",
        priceNote: "Referência — confirmar portão e bicicleta",
        sources: [
          {
            label: "Site oficial da Muralha de Xi’an",
            url: "https://www.chinaxiancitywall.com/",
          },
          {
            label: "Tarifa e horário atualizados",
            url: "https://www.travelchinaguide.com/attraction/shaanxi/xian/citywall.htm",
          },
        ],
      },
      {
        title: "Bairro Muçulmano + Grande Mesquita",
        summary:
          "Ruas de comida da comunidade Hui e uma mesquita ativa de pátios chineses, caligrafia árabe e longa história comercial.",
        location:
          "Área da Torre do Tambor; a mesquita fica na Huajue Lane, a 5–10 minutos a pé.",
        access:
          "Metrô Linhas 2 ou 6 até Zhonglou e caminhada de 10–15 minutos pela Torre do Tambor.",
        admission:
          "Bairro grátis. Mesquita: referência de RMB 25 de mar a nov e RMB 15 de dez a fev.",
        hours:
          "Bairro mais ativo do fim da manhã até cerca de 22:00. Mesquita: referência 09:00–20:00 de mar a nov; 09:00–18:00 de dez a fev.",
        duration:
          "1h30–2h30 com refeição; 40–60 minutos dentro da mesquita.",
        booking:
          "Sem reserva habitual. Vista-se discretamente e respeite áreas de fiéis e restrições durante orações.",
        priceNote: "Referência — confirmar na entrada",
        sources: [
          {
            label: "Grande Mesquita — tarifas e horários",
            url: "https://www.chinahighlights.com/xian/attraction/great-mosque.htm",
          },
          {
            label: "Localização e transporte",
            url: "https://www.travelchinaguide.com/attraction/shaanxi/xian/great_mosque.htm",
          },
        ],
      },
      {
        title: "Grande Pagode do Ganso Selvagem",
        summary:
          "Marco budista construído para guardar textos trazidos da Índia por Xuanzang, com pátios, subida opcional e praças iluminadas.",
        location:
          "Distrito de Yanta, cerca de 5 km ao sul da Muralha.",
        access:
          "Metrô Linhas 3 ou 4 até Dayanta e caminhada de 10–15 minutos ao Templo Da Ci’en.",
        admission:
          "RMB 10 para o Templo Da Ci’en; subida ao pagode custa mais RMB 25.",
        hours:
          "1 mar–14 out: 08:30–18:00; 15 out–fev: 08:30–17:40. Entrada encerra uma hora antes.",
        duration:
          "1h30–2 horas; acrescente tempo para a praça e as fontes.",
        booking:
          "Normalmente sem reserva. Leve o passaporte e confirme os horários das fontes, que podem parar por clima ou manutenção.",
        priceNote: "Referência — confirmar fontes e subida",
        sources: [
          {
            label: "Horários, preços e última entrada",
            url: "https://www.travelchinaguide.com/attraction/shaanxi/xian/bigwildgoose.htm",
          },
          {
            label: "UNESCO — corredor Chang’an–Tianshan",
            url: "https://whc.unesco.org/en/list/1442/",
          },
        ],
      },
    ],
    tips: [
      "Reserve o Exército de Terracota nominalmente e leve o mesmo passaporte usado na compra.",
      "Faça o sítio arqueológico cedo; deixe muralha, torres e Bairro Muçulmano para a tarde e a noite.",
      "A muralha é muito exposta. No calor, pedale de manhã ou perto do pôr do sol e leve água.",
    ],
    images: [
      {
        file: "Terracotta Army Pit 1 - 7.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Terracotta_Army_Pit_1_-_7.jpg/1280px-Terracotta_Army_Pit_1_-_7.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Terracotta_Army_Pit_1_-_7.jpg",
        credit: "Maros Mraz",
        license: "CC BY-SA 3.0",
        caption: "Exército de Terracota",
        alt: "Fileiras de guerreiros no fosso principal do Exército de Terracota",
      },
      {
        file: "Xian-Stadtmauer-36-2012-gje.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Xian-Stadtmauer-36-2012-gje.jpg/1280px-Xian-Stadtmauer-36-2012-gje.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Xian-Stadtmauer-36-2012-gje.jpg",
        credit: "Gerd Eichmann",
        license: "CC BY-SA 4.0",
        caption: "Muralha histórica de Xi’an",
        alt: "Muralha histórica de Xi’an e sua arquitetura de telhados",
      },
      {
        file: "Muslim food street market, Xi'an, China - panoramio.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Muslim_food_street_market%2C_Xi%27an%2C_China_-_panoramio.jpg/1280px-Muslim_food_street_market%2C_Xi%27an%2C_China_-_panoramio.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Muslim_food_street_market,_Xi%27an,_China_-_panoramio.jpg",
        credit: "Aaron Zhu",
        license: "CC BY-SA 3.0",
        caption: "Mercado do Bairro Muçulmano",
        alt: "Barracas e letreiros do mercado gastronômico no Bairro Muçulmano de Xi’an",
      },
      {
        file: "Xi'an Bell Tower at night.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Xi%27an_Bell_Tower_at_night.jpg/1280px-Xi%27an_Bell_Tower_at_night.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Xi%27an_Bell_Tower_at_night.jpg",
        credit: "TarnishedPath",
        license: "CC BY-SA 4.0",
        caption: "Torre do Sino à noite",
        alt: "Torre do Sino de Xi’an iluminada contra o céu noturno",
      },
      {
        file: "The Drum Tower of Xi'an.JPG",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/The_Drum_Tower_of_Xi%27an.JPG/1280px-The_Drum_Tower_of_Xi%27an.JPG",
        page: "https://commons.wikimedia.org/wiki/File:The_Drum_Tower_of_Xi%27an.JPG",
        credit: "Wang Zhongyin",
        license: "CC BY-SA 4.0",
        caption: "Torre do Tambor",
        alt: "Fachada tradicional da Torre do Tambor de Xi’an",
      },
      {
        file: "Giant Wild Goose Pagoda, Xi'an, China - 001.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Giant_Wild_Goose_Pagoda%2C_Xi%27an%2C_China_-_001.jpg/1280px-Giant_Wild_Goose_Pagoda%2C_Xi%27an%2C_China_-_001.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Giant_Wild_Goose_Pagoda,_Xi%27an,_China_-_001.jpg",
        credit: "Maros Mraz",
        license: "CC BY-SA 3.0",
        caption: "Grande Pagode do Ganso Selvagem",
        alt: "Grande Pagode do Ganso Selvagem visto entre árvores em Xi’an",
      },
      {
        file: "Great Mosque of Xi'an, prayer hall.JPG",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Great_Mosque_of_Xi%27an%2C_prayer_hall.JPG/1280px-Great_Mosque_of_Xi%27an%2C_prayer_hall.JPG",
        page: "https://commons.wikimedia.org/wiki/File:Great_Mosque_of_Xi%27an,_prayer_hall.JPG",
        credit: "Gaius Cornelius",
        license: "CC BY-SA 3.0",
        caption: "Salão de orações da Grande Mesquita",
        alt: "Salão de orações da Grande Mesquita de Xi’an com arquitetura chinesa",
      },
      {
        file: "Tang Paradise 2.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Tang_Paradise_2.jpg/1280px-Tang_Paradise_2.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Tang_Paradise_2.jpg",
        credit: "Virgil Guo",
        license: "CC BY-SA 4.0",
        caption: "Pavilhões inspirados na Dinastia Tang",
        alt: "Pavilhão e lago do Tang Paradise, complexo inspirado na Dinastia Tang em Xi’an",
      },
    ],
    video: {
      id: "QgNyQMQ5VM8",
      title: "Xi’an China Travel Guide — atrações e dicas",
      url: "https://www.youtube.com/watch?v=QgNyQMQ5VM8",
    },
    sources: [
      {
        label: "UNESCO — Mausoléu do Primeiro Imperador Qin",
        url: "https://whc.unesco.org/en/list/441/",
      },
      {
        label: "Bilheteria oficial do Museu do Exército de Terracota",
        url: "https://www.bmy.com.cn/jingtai/bmyweb/ticketing.html",
      },
    ],
    scores: { history: 5, food: 4, nature: 2, calm: 2, winter: 2 },
    coords: [34.3416, 108.9398],
  },
  {
    id: "chengdu",
    order: 2,
    name: "Chengdu",
    chinese: "成都",
    province: "Sichuan",
    tag: "Pandas e sabores",
    categories: ["food", "calm", "history"],
    days: "3–4 dias",
    best: "mar–mai · set–nov",
    rhythm: "Descontraído",
    effort: "Leve",
    ideal: "Gastronomia, chá e vida urbana",
    base: "Centro de Chengdu",
    short:
      "Pandas pela manhã, casas de chá à tarde e hot pot perfumado pela pimenta de Sichuan.",
    description:
      "Chengdu é uma metrópole que sabe desacelerar. Entre a Base dos Pandas, o Parque do Povo e as panelas de hot pot, a cidade também funciona como base para Dujiangyan e o Monte Qingcheng.",
    highlights: [
      {
        title: "Base dos Pandas",
        summary:
          "Grande centro de conservação com pandas-gigantes, pandas-vermelhos, berçários e espaços educativos entre bambuzais.",
        location:
          "1375 Panda Avenue, distrito de Chenghua, cerca de 10 km ao norte da Praça Tianfu.",
        access:
          "Metrô Linha 3 até Panda Avenue, saída A, e micro-ônibus 408 ao Portão Sul; linha 409 atende o Portão Oeste.",
        admission:
          "RMB 55 adulto; RMB 27 para estudante elegível. Há gratuidade oficial para faixas etárias específicas.",
        hours:
          "Mar–out: 07:30–12:00 e 12:00–17:00; fecha progressivamente às 18:00. Nov–fev: 08:00–16:30; fecha às 17:30.",
        duration: "3–5 horas.",
        booking:
          "Reserva nominal online obrigatória, liberada até 14 dias antes. Estrangeiros devem levar o passaporte original.",
        priceNote: "Oficial · reserva obrigatória",
        sources: [
          {
            label: "Panda Base — ingressos e horários",
            url: "https://m.panda.org.cn/en/service/ticket/",
          },
          {
            label: "Panda Base — transporte público",
            url: "https://m.panda.org.cn/en/service/transit/",
          },
        ],
      },
      {
        title: "Parque do Povo",
        summary:
          "Jardins, dança, mahjong e vida cotidiana; a centenária Casa de Chá Heming é a parada clássica para chá em gaiwan.",
        location:
          "12 Shaocheng Road, distrito de Qingyang, cerca de 1,5 km a oeste da Praça Tianfu.",
        access:
          "Metrô Linha 2 até People’s Park; o parque começa junto às saídas da estação.",
        admission:
          "Parque grátis. Chá na Heming parte de aproximadamente RMB 16–20; opções e apresentações especiais custam mais.",
        hours:
          "Referência: verão 06:00–22:30; inverno 06:30–22:00. A casa de chá pode operar por período menor.",
        duration: "1h30–3 horas.",
        booking:
          "Sem reserva para o parque; mesas à beira do lago são por ordem de chegada. Confirme preços na casa de chá.",
        priceNote: "Referência — consumo pago à parte",
        sources: [
          {
            label: "Site oficial do Parque do Povo",
            url: "https://www.cdpeoplespark.cn/",
          },
          {
            label: "Xinhua — Casa de Chá Heming",
            url: "https://www.news.cn/photo/2023-08/14/c_1129801735.htm",
          },
        ],
      },
      {
        title: "Templo Wuhou e Jinli",
        summary:
          "Museu dos Três Reinos com templos, estátuas e o mausoléu de Liu Bei; a vizinha Jinli reúne lanches, lojas e lanternas.",
        location:
          "231 Wuhouci Street, distrito de Wuhou, cerca de 3 km a sudoeste da Praça Tianfu.",
        access:
          "Metrô Linha 10 até Wuhou Shrine; a estação Gaoshengqiao da Linha 3 é outra opção.",
        admission:
          "Templo Wuhou: RMB 50 adulto e RMB 25 meia-entrada; Jinli é gratuita.",
        hours:
          "Templo 08:30–18:30, venda até 17:30. Jinli não tem catraca e as lojas seguem horários próprios.",
        duration: "2 horas no museu; 3–4 horas incluindo Jinli.",
        booking:
          "Compra oficial antecipada recomendada; leve o passaporte. Festivais podem usar regras e ingressos especiais.",
        priceNote: "Oficial · Jinli gratuita",
        sources: [
          {
            label: "Museu Wuhou — site oficial",
            url: "https://www.wuhouci.net.cn/",
          },
          {
            label: "Prefeitura de Chengdu — Wuhou",
            url: "https://www.chengdu.gov.cn/cdsrmzf/c181931/2026-05/25/content_4815bca2b69a40fc8633f13393031ea4.shtml",
          },
        ],
      },
      {
        title: "Dujiangyan + Monte Qingcheng",
        summary:
          "Sistema hidráulico milenar ainda ativo e uma montanha taoista de floresta e templos; combinar os dois exige um dia longo.",
        location:
          "Dujiangyan fica 60 km a noroeste de Chengdu; a entrada frontal de Qingcheng fica cerca de 20 km adiante.",
        access:
          "Trem desde Xipu até Lidui Gongyuan ou Qingchengshan; use táxi ou ônibus local entre as atrações.",
        admission:
          "RMB 80 para Dujiangyan + RMB 80 para Qingcheng frontal. Teleférico, barco e veículos internos à parte.",
        hours:
          "Em 2026, 08:00–17:00 para ambos. Teleféricos e veículos encerram antes; evite chegar depois das 15:00.",
        duration:
          "7–10 horas combinados; 3–5 horas para cada atração separadamente.",
        booking:
          "Reserve em fins de semana e feriados e leve o passaporte. Chuva forte pode fechar trilhas, teleféricos ou pontes.",
        priceNote: "Oficial · extras cobrados à parte",
        sources: [
          {
            label: "Prefeitura de Chengdu — Dujiangyan",
            url: "https://www.chengdu.gov.cn/cdsrmzf/c181937/2026-04/29/content_9471c0b8c1904784b06177b1ef0795ad.shtml",
          },
          {
            label: "Prefeitura de Chengdu — Qingcheng",
            url: "https://www.chengdu.gov.cn/cdsrmzf/c181931/2026-05/25/content_2c43a37fd8434041802affada70bd84f.shtml",
          },
        ],
      },
    ],
    tips: [
      "Reserve a Base dos Pandas com antecedência e escolha o primeiro horário do dia.",
      "Separe um dia inteiro para Qingcheng e Dujiangyan; em ritmo leve, escolha apenas uma das áreas.",
      "Se o grupo não tolera muita pimenta, peça hot pot com caldo dividido, conhecido como yuanyang.",
    ],
    images: [
      {
        file: "Chengdu Research Base of Giant Panda Breeding, 201907, 04.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Chengdu_Research_Base_of_Giant_Panda_Breeding%2C_201907%2C_04.jpg/1280px-Chengdu_Research_Base_of_Giant_Panda_Breeding%2C_201907%2C_04.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Chengdu_Research_Base_of_Giant_Panda_Breeding,_201907,_04.jpg",
        credit: "Jimmyshjj",
        license: "CC BY-SA 4.0",
        caption: "Base dos Pandas de Chengdu",
        alt: "Panda-gigante na Base de Pesquisa de Chengdu",
      },
      {
        file: "Teahouse in Peoples Park - Chengdu, China - DSC05348.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Teahouse_in_Peoples_Park_-_Chengdu%2C_China_-_DSC05348.jpg/1280px-Teahouse_in_Peoples_Park_-_Chengdu%2C_China_-_DSC05348.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Teahouse_in_Peoples_Park_-_Chengdu,_China_-_DSC05348.jpg",
        credit: "Daderot",
        license: "CC0",
        caption: "Casa de chá no Parque do Povo",
        alt: "Casa de chá com mesas ao ar livre no Parque do Povo em Chengdu",
      },
      {
        file: "Chengdu Hot Pot Yuanyangguo style 2019.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Chengdu_Hot_Pot_Yuanyangguo_style_2019.jpg/1280px-Chengdu_Hot_Pot_Yuanyangguo_style_2019.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Chengdu_Hot_Pot_Yuanyangguo_style_2019.jpg",
        credit: "Breaknet2025",
        license: "CC BY 4.0",
        caption: "Hot pot yuanyang",
        alt: "Panela de hot pot de Chengdu dividida entre caldo picante e caldo suave",
      },
      {
        file: "Jinli Street - Chengdu, China - DSC05399.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Jinli_Street_-_Chengdu%2C_China_-_DSC05399.jpg/1280px-Jinli_Street_-_Chengdu%2C_China_-_DSC05399.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Jinli_Street_-_Chengdu,_China_-_DSC05399.jpg",
        credit: "Daderot",
        license: "CC0 1.0",
        caption: "Rua histórica Jinli",
        alt: "Rua Jinli em Chengdu com fachadas tradicionais, lanternas e visitantes",
      },
      {
        file: "Anshun Bridge Night.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Anshun_Bridge_Night.jpg/1280px-Anshun_Bridge_Night.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Anshun_Bridge_Night.jpg",
        credit: "Limesave",
        license: "CC BY-SA 4.0",
        caption: "Ponte Anshun à noite",
        alt: "Ponte Anshun iluminada e refletida no rio Jin à noite em Chengdu",
      },
      {
        file: "Gateway - Wuhou Shrine - Chengdu, China - DSC05423.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Gateway_-_Wuhou_Shrine_-_Chengdu%2C_China_-_DSC05423.jpg/1280px-Gateway_-_Wuhou_Shrine_-_Chengdu%2C_China_-_DSC05423.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Gateway_-_Wuhou_Shrine_-_Chengdu,_China_-_DSC05423.jpg",
        credit: "Daderot",
        license: "CC0 1.0",
        caption: "Jardim e portal do Templo Wuhou",
        alt: "Portal tradicional entre a vegetação do complexo do Templo Wuhou em Chengdu",
      },
      {
        file: "Dujiang Weir (cropped).jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Dujiang_Weir_%28cropped%29.jpg/1280px-Dujiang_Weir_%28cropped%29.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Dujiang_Weir_(cropped).jpg",
        credit: "星星",
        license: "CC BY-SA 4.0",
        caption: "Sistema de irrigação de Dujiangyan",
        alt: "Panorama do sistema de irrigação de Dujiangyan e dos canais do rio Min",
      },
      {
        file: "Mount Qingcheng (54530904077).jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mount_Qingcheng_%2854530904077%29.jpg/1280px-Mount_Qingcheng_%2854530904077%29.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Mount_Qingcheng_(54530904077).jpg",
        credit: "Xiquinhosilva",
        license: "CC BY 2.0",
        caption: "Floresta e templos do Monte Qingcheng",
        alt: "Caminho entre floresta densa e arquitetura taoista no Monte Qingcheng",
      },
    ],
    video: {
      id: "qxUoWwL_1rw",
      title: "3 dias perfeitos em Chengdu — o que comer, ver e fazer",
      url: "https://www.youtube.com/watch?v=qxUoWwL_1rw",
    },
    sources: [
      {
        label: "Base oficial dos Pandas — ingressos e horários",
        url: "https://m.panda.org.cn/en/service/ticket/",
      },
      {
        label: "UNESCO — Monte Qingcheng e Dujiangyan",
        url: "https://whc.unesco.org/en/list/1001/",
      },
    ],
    scores: { history: 3, food: 5, nature: 3, calm: 4, winter: 1 },
    coords: [30.5728, 104.0668],
  },
  {
    id: "guilin",
    order: 3,
    name: "Guilin + Yangshuo",
    chinese: "桂林",
    province: "Guangxi",
    tag: "Rios e carste",
    categories: ["nature", "calm"],
    days: "3–4 dias",
    best: "abr–mai · set–out",
    rhythm: "Contemplativo",
    effort: "Leve a moderado",
    ideal: "Paisagem, fotografia e bicicleta",
    base: "2 noites em Yangshuo",
    short:
      "Rios verdes atravessam torres calcárias, arrozais e aldeias que parecem pinturas.",
    description:
      "Guilin é a porta de entrada, mas Yangshuo merece pelo menos duas noites. O cruzeiro pelo Rio Li revela a paisagem clássica; bicicleta, jangada e pequenas caminhadas levam ao interior rural.",
    highlights: [
      {
        title: "Cruzeiro pelo Rio Li",
        summary:
          "Viagem de cerca de quatro horas entre picos cársticos e aldeias, funcionando também como deslocamento de ida para Yangshuo.",
        location:
          "Embarque a 28 km do centro: navios 3 estrelas em Mopanshan e 4 estrelas em Zhujiang; chegada em Longtoushan, Yangshuo.",
        access:
          "Táxi, Didi ou traslado ao cais; saia do centro de Guilin cerca de 1h30 antes para retirada e segurança.",
        admission:
          "RMB 215 no navio 3 estrelas; RMB 360 no 4 estrelas. Alimentação e serviço variam por categoria.",
        hours:
          "Saídas geralmente entre 09:00 e 10:00; cais e horário dependem do rio e da embarcação indicada no bilhete.",
        duration:
          "Cerca de 4 horas no rio; reserve 6 horas com traslado e check-in.",
        booking:
          "Pré-venda recomendada no serviço oficial “Lijiang Ticket Office”. Leve o passaporte e confirme embarcação e cais.",
        priceNote: "Oficial · trajeto só de ida",
        sources: [
          {
            label: "Rio Li — tabela oficial de tarifas",
            url: "https://www.liriver.com.cn/mobile/article/lyfw.pwxx",
          },
          {
            label: "Rio Li — cais e pré-venda",
            url: "https://en.liriver.com.cn/mobile/article/lyfw.jtcx",
          },
        ],
      },
      {
        title: "Rio Yulong",
        summary:
          "Balsas conduzidas por barqueiros atravessam arrozais, pontes antigas e pequenos açudes; cada rota tem duração e cais final diferentes.",
        location:
          "Zona rural a oeste de Yangshuo; cais como Jima, Jinlong Bridge e Shuiedi ficam 6–15 km de West Street.",
        access:
          "Táxi, Didi, traslado ou bicicleta ao cais. Bicicletas não entram nas balsas; organize o retorno do cais final.",
        admission:
          "Referência RMB 200–320 por balsa para até 2 pessoas: rotas curtas ~RMB 200; rotas de 80–90 min ~RMB 320.",
        hours:
          "Referência sazonal: cais principais por volta de 07:30–17:30/18:00; rio cheio, vento ou tempestade suspendem saídas.",
        duration:
          "40–90 minutos na água; reserve 2–3 horas com deslocamentos.",
        booking:
          "Bilhetes limitados e nominais pelo WeChat oficial “Yulong River”. Leve o passaporte; pode ser necessário validar no cais.",
        priceNote: "Referência — depende da rota",
        sources: [
          {
            label: "Rotas e reserva nominal",
            url: "https://gl.bendibao.com/tour/2025715/18244.shtm",
          },
          {
            label: "Preços e durações de 2026",
            url: "https://www.yangshuomountainretreat.com/blog/en/bamboo-rafting-yangshuo-the-complete-guide-2026/",
          },
        ],
      },
      {
        title: "Caverna da Flauta de Junco",
        summary:
          "Grandes salões de estalactites e estalagmites com iluminação colorida; opção útil para chuva ou calor intenso.",
        location:
          "1 Ludi Road, distrito de Xiufeng, cerca de 5 km a noroeste do centro de Guilin.",
        access:
          "Ônibus urbano 3, táxi ou Didi; 15–25 minutos desde os lagos centrais.",
        admission:
          "Referência de balcão: RMB 90 adulto; ofertas online a partir de RMB 82. Carrinho externo é cobrado à parte.",
        hours:
          "Em 2026 foi publicado 07:30–18:00; alguns canais encerram vendas para o mesmo dia às 16:30.",
        duration: "1–1h30.",
        booking:
          "Compra no dia costuma ser possível, mas reserve em fins de semana. Leve o passaporte para retirada ou validação.",
        priceNote: "Referência — confirmar última entrada",
        sources: [
          {
            label: "Horário e endereço em 2026",
            url: "https://gl.bendibao.com/tour/2026429/18573.shtm",
          },
          {
            label: "Preço de balcão e reserva",
            url: "https://www.citsguilin.com/menpiao/ludiyan.htm",
          },
        ],
      },
      {
        title: "Terraços de Longji",
        summary:
          "Ping’an, Jinkeng Dazhai e aldeias tradicionais reúnem trilhas e campos que mudam de cor com o calendário agrícola.",
        location:
          "Condado de Longsheng, cerca de 75–80 km ao norte de Guilin; Ping’an e Jinkeng são bases diferentes.",
        access:
          "Ônibus turístico desde Guilin ou carro particular; conte 2–3 horas por sentido e escolha uma zona principal.",
        admission:
          "RMB 80, válido por 3 dias. Teleférico de Jinkeng ao Golden Buddha Peak: referência RMB 70 ida ou RMB 100 ida e volta.",
        hours:
          "Área aberta o ano todo; referência de última admissão às 21:00. Bilheteria, ônibus e teleférico têm horários menores.",
        duration:
          "Dia inteiro desde Guilin; idealmente uma noite para trilhas e amanhecer.",
        booking:
          "Reserve transporte e hospedagem na colheita e feriados. Leve QR code e passaporte; chuva e névoa reduzem a visibilidade.",
        priceNote: "Referência — confirmar transporte interno",
        sources: [
          {
            label: "Site oficial dos Terraços de Longji",
            url: "https://wp.longjitour.com/",
          },
          {
            label: "Tarifas e teleférico em 2026",
            url: "https://m.gl.bendibao.com/tour/18555.shtm",
          },
        ],
      },
    ],
    tips: [
      "Durma ao menos duas noites em Yangshuo para aproveitar cedo e no fim do dia.",
      "O cruzeiro termina em Yangshuo e não é circular: planeje bagagem e retorno antes.",
      "Entre abril e julho, chuva e cheia podem afetar a navegação; deixe alguma flexibilidade.",
    ],
    images: [
      {
        file: "1 li jiang guilin yangshuo 2011.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/1_li_jiang_guilin_yangshuo_2011.jpg/1280px-1_li_jiang_guilin_yangshuo_2011.jpg",
        page: "https://commons.wikimedia.org/wiki/File:1_li_jiang_guilin_yangshuo_2011.jpg",
        credit: "Chensiyuan",
        license: "CC BY-SA 4.0",
        caption: "Jangadas no Rio Li",
        alt: "Jangada no Rio Li diante das montanhas cársticas de Yangshuo",
      },
      {
        file: "Yangshuo-Li-River-2019-Luka-Peternel.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Yangshuo-Li-River-2019-Luka-Peternel.jpg/1280px-Yangshuo-Li-River-2019-Luka-Peternel.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Yangshuo-Li-River-2019-Luka-Peternel.jpg",
        credit: "Luka Peternel",
        license: "CC BY-SA 4.0",
        caption: "Picos cársticos de Yangshuo",
        alt: "Rio Li serpenteando entre formações cársticas em Yangshuo",
      },
      {
        file: "20090502 Yangshuo Yulong River 6125.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/20090502%20Yangshuo%20Yulong%20River%206125.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:20090502_Yangshuo_Yulong_River_6125.jpg",
        credit: "Jakub Hałun",
        license: "CC BY-SA 4.0",
        caption: "Rio Yulong",
        alt: "Rio Yulong serpenteando entre montanhas cársticas perto de Yangshuo",
      },
      {
        file: "Guilin Reed Flute Cave.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Guilin%20Reed%20Flute%20Cave.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Guilin_Reed_Flute_Cave.jpg",
        credit: "Romain Pontida",
        license: "CC BY-SA 3.0",
        caption: "Caverna da Flauta de Junco",
        alt: "Lago e formações calcárias iluminadas dentro da Caverna da Flauta de Junco",
      },
      {
        file: "Longji rice terraces - 2023 10 11 Kaur Virunurm.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Longji%20rice%20terraces%20-%202023%2010%2011%20Kaur%20Virunurm.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Longji_rice_terraces_-_2023_10_11_Kaur_Virunurm.jpg",
        credit: "Kurinurm",
        license: "CC0 1.0",
        caption: "Arrozais de Longji",
        alt: "Camadas verdes dos arrozais em terraços de Longji nas montanhas de Guangxi",
      },
      {
        file: "2018.08.27 广西桂林 象鼻山.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/2018.08.27%20%E5%B9%BF%E8%A5%BF%E6%A1%82%E6%9E%97%20%E8%B1%A1%E9%BC%BB%E5%B1%B1.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:2018.08.27_%E5%B9%BF%E8%A5%BF%E6%A1%82%E6%9E%97_%E8%B1%A1%E9%BC%BB%E5%B1%B1.jpg",
        credit: "Aokisang",
        license: "CC BY-SA 4.0",
        caption: "Colina da Tromba do Elefante",
        alt: "Colina da Tromba do Elefante formando um arco sobre o rio em Guilin",
      },
      {
        file: "Moon Hill - Yangshuo, China.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Moon%20Hill%20-%20Yangshuo%2C%20China.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Moon_Hill_-_Yangshuo,_China.jpg",
        credit: "Maria Ly",
        license: "CC BY 2.0",
        caption: "Moon Hill",
        alt: "Arco natural da Moon Hill acima da paisagem rural de Yangshuo",
      },
      {
        file: "West Street Yangshuo.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/West%20Street%20Yangshuo.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:West_Street_Yangshuo.jpg",
        credit: "Imcall",
        license: "CC BY-SA 3.0",
        caption: "West Street em Yangshuo",
        alt: "Pedestres e fachadas tradicionais na West Street de Yangshuo",
      },
    ],
    video: {
      id: "UmZsYXi6WSo",
      title: "Por que Yangshuo é um dos destinos mais bonitos da China",
      url: "https://www.youtube.com/watch?v=UmZsYXi6WSo",
    },
    sources: [
      {
        label: "UNESCO — Carste do Sul da China",
        url: "https://whc.unesco.org/en/list/1248/",
      },
      {
        label: "Visit Guilin — Rio Li e atrações de Yangshuo",
        url: "https://visitguilin.org/things-to-do/guilin-attractions/li-river/",
      },
    ],
    scores: { history: 2, food: 2, nature: 5, calm: 5, winter: 1 },
    coords: [24.7785, 110.4966],
  },
  {
    id: "zhangjiajie",
    order: 4,
    name: "Zhangjiajie",
    chinese: "张家界",
    province: "Hunan",
    tag: "Natureza monumental",
    categories: ["nature"],
    days: "3–4 dias",
    best: "abr–mai · set–nov",
    rhythm: "Intenso",
    effort: "Alto",
    ideal: "Mirantes, trilhas e escala dramática",
    base: "Perto de Wulingyuan",
    short:
      "Milhares de pilares estreitos de arenito surgem entre florestas, vales e névoa.",
    description:
      "Zhangjiajie é a escolha mais impactante para quem busca natureza dramática. O parque exige estratégia: áreas distantes, ônibus internos, teleféricos, elevador e muitos degraus tornam os dias intensos.",
    highlights: [
      {
        title: "Parque de Zhangjiajie / Wulingyuan",
        summary:
          "O grande conjunto de pilares de arenito reúne Yuanjiajie, Tianzi Mountain, Golden Whip Stream e outras áreas. O bilhete vale vários dias.",
        location:
          "Distrito de Wulingyuan, cerca de 30 km ao norte do centro de Zhangjiajie; hospedar-se em Wulingyuan facilita o Portão Leste.",
        access:
          "Ônibus do terminal central de Zhangjiajie até Wulingyuan. Use o Portão Leste para Tianzi/Bailong ou o Portão Sul para Golden Whip Stream.",
        admission:
          "RMB 165 só a entrada, válida por 4 dias; pacote com ônibus ecológicos por cerca de RMB 236. Teleféricos e elevador são cobrados à parte.",
        hours:
          "Normalmente 07:30–17:00; a faixa reservada determina a entrada e pode mudar por chuva ou controle de fluxo.",
        duration: "2 dias ideais; 1 dia apenas para uma rota de destaques.",
        booking:
          "Reserva nominal antecipada, com número do passaporte. Leve o documento original e confira portão e faixa de entrada.",
        priceNote: "Oficial · bilhete válido por 4 dias",
        sources: [
          {
            label: "Portal oficial de Wulingyuan — bilhetes",
            url: "https://www.hnzjj.com/index.php/Ticket/show/2.html",
          },
          {
            label: "Governo de Hunan — reserva e limite diário",
            url: "https://enghunan.gov.cn/hneng/News/Localnews/202506/t20250623_33717855.html",
          },
        ],
      },
      {
        title: "Yuanjiajie + Tianzi Mountain",
        summary:
          "Yuanjiajie concentra a Hallelujah Mountain e a Primeira Ponte sob o Céu; Tianzi oferece panoramas amplos e chance de mar de nuvens.",
        location:
          "Setores elevados dentro do Parque Florestal, acessíveis pelo Portão Leste de Wulingyuan.",
        access:
          "Ônibus ecológico interno até o Bailong Elevator ou o teleférico de Tianzi; ônibus conectam os mirantes no topo.",
        admission:
          "Incluídos no parque. Bailong Elevator: RMB 65 por trecho; teleférico de Tianzi: RMB 72 por trecho.",
        hours:
          "Acompanham o parque, aproximadamente 07:30–17:00; a última descida pode ocorrer antes do fechamento.",
        duration: "5–7 horas, incluindo deslocamentos e filas.",
        booking:
          "Reserve parque e transportes no canal oficial. No verão e em feriados, defina rota e horários com antecedência.",
        priceNote: "Oficial · transportes não incluídos",
        sources: [
          {
            label: "Portal oficial — Bailong Elevator",
            url: "https://www.hnzjj.com/index.php/Ticket/show/9.html",
          },
          {
            label: "Portal oficial — teleférico de Tianzi",
            url: "https://www.hnzjj.com/index.php/Ticket/show/8.html",
          },
        ],
      },
      {
        title: "Golden Whip Stream",
        summary:
          "Trilha de cerca de 7,5 km junto ao riacho, entre mata e paredões. É possível caminhar apenas um trecho e retornar.",
        location:
          "Setor sul do parque; começa perto do Portão Sul e termina em Shuirao Simen.",
        access:
          "Entre pelo Portão Sul ou use o ônibus ecológico do Portão Leste até Shuirao Simen e caminhe no sentido contrário.",
        admission:
          "Sem cobrança adicional; incluído no ingresso de RMB 165. O ônibus interno exige o pacote correspondente.",
        hours:
          "Durante o horário do parque, normalmente 07:30–17:00; não inicie o percurso integral perto do fechamento.",
        duration:
          "2,5–3,5 horas no percurso integral; 1–1,5 hora em um trecho curto.",
        booking:
          "Usa a reserva e o passaporte do parque. Não alimente os macacos e evite trechos isolados durante chuva forte.",
        priceNote: "Oficial · incluído no parque",
        sources: [
          {
            label: "Portal oficial — ingresso do parque",
            url: "https://www.hnzjj.com/index.php/Ticket/show/2.html",
          },
          {
            label: "Governo de Hunan — roteiro oficial",
            url: "https://www.enghunan.gov.cn/hneng/Tourism/GoldenTravelRoutes/202603/t20260306_33926729.html",
          },
        ],
      },
      {
        title: "Tianmen Mountain",
        summary:
          "Atração separada de Wulingyuan, com Tianmen Cave, passarelas na falésia, trechos de vidro e uma longa viagem panorâmica.",
        location:
          "Distrito de Yongding; estação inferior do teleférico na Dayong Road, no centro de Zhangjiajie.",
        access:
          "Táxi ou ônibus urbano até a estação inferior. A reserva define uma rota A, B ou C combinando teleférico e ônibus.",
        admission:
          "Entrada RMB 72; transportes variam por rota: teleférico RMB 108 por trecho, express RMB 76, escadas rolantes RMB 42 e ônibus RMB 33.",
        hours:
          "Em 2026, bilheteria 07:30–16:00; abertura às 08:00 e última entrada às 16:00.",
        duration: "5–7 horas.",
        booking:
          "Reserva nominal por faixa horária recomendada. Vento, gelo, tempestades ou manutenção podem alterar a rota.",
        priceNote: "Referência — confirmar o pacote da rota",
        sources: [
          {
            label: "Governo de Hunan — operação em 2026",
            url: "https://www.enghunan.gov.cn/hneng/News/Localnews/202605/t20260513_33976257.html",
          },
          {
            label: "Portal oficial — Tianmen Mountain",
            url: "https://www.hnzjj.com/index.php/Ticket/show/6.html",
          },
        ],
      },
    ],
    tips: [
      "Compre entradas e horários de teleférico ou elevador usando o nome exato do passaporte.",
      "Hospede-se perto de Wulingyuan para o parque e trate Tianmen como um passeio separado.",
      "Comece cedo e leve calçado aderente e capa de chuva; a névoa pode esconder os mirantes.",
    ],
    images: [
      {
        file: "1 tianzishan wulingyuan zhangjiajie 2012.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/1_tianzishan_wulingyuan_zhangjiajie_2012.jpg/1280px-1_tianzishan_wulingyuan_zhangjiajie_2012.jpg",
        page: "https://commons.wikimedia.org/wiki/File:1_tianzishan_wulingyuan_zhangjiajie_2012.jpg",
        credit: "Chensiyuan",
        license: "CC BY-SA 4.0",
        caption: "Pilares de Tianzi",
        alt: "Pilares de arenito cobertos por vegetação em Tianzi, Zhangjiajie",
      },
      {
        file: "ZhangjiajieGlassByHighestBridges.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/ZhangjiajieGlassByHighestBridges.jpg/1280px-ZhangjiajieGlassByHighestBridges.jpg",
        page: "https://commons.wikimedia.org/wiki/File:ZhangjiajieGlassByHighestBridges.jpg",
        credit: "HighestBridges",
        license: "CC BY-SA 4.0",
        caption: "Ponte de vidro do Grand Canyon",
        alt: "Ponte de vidro cruzando o Grand Canyon de Zhangjiajie",
      },
      {
        file: "ZhangJiaJie River 1.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/ZhangJiaJie%20River%201.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:ZhangJiaJie_River_1.jpg",
        credit: "Majavar",
        license: "CC BY-SA 3.0",
        caption: "Vales e córregos de Wulingyuan",
        alt: "Córrego claro entre rochas e vegetação no vale de Wulingyuan",
      },
      {
        file: "Bailong Elevator april 2008.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Bailong%20Elevator%20april%202008.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Bailong_Elevator_april_2008.jpg",
        credit: "Kazuhito Kidachi",
        license: "CC BY 2.0",
        caption: "Elevador Bailong",
        alt: "Elevador Bailong instalado na parede de arenito em Wulingyuan",
      },
      {
        file: "Tian Menshan Mountain 5.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tian%20Menshan%20Mountain%205.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Tian_Menshan_Mountain_5.jpg",
        credit: "Huangdan2060",
        license: "Domínio público",
        caption: "Caverna Tianmen",
        alt: "Grande arco natural da Caverna Tianmen na Montanha da Porta do Céu",
      },
      {
        file: "Rock formations in the Wulingyuan Scenic Area of Zhangjiajie.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Rock%20formations%20in%20the%20Wulingyuan%20Scenic%20Area%20of%20Zhangjiajie.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Rock_formations_in_the_Wulingyuan_Scenic_Area_of_Zhangjiajie.jpg",
        credit: "Rocio Gil",
        license: "CC BY-SA 4.0",
        caption: "Formações de arenito de Wulingyuan",
        alt: "Pilares de arenito cobertos de vegetação e névoa na área de Wulingyuan",
      },
      {
        file: "Baofeng Lake.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Baofeng%20Lake.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Baofeng_Lake.jpg",
        credit: "Yoo Chung",
        license: "CC BY-SA 2.5",
        caption: "Lago Baofeng",
        alt: "Água verde do Lago Baofeng cercada pelas montanhas de Zhangjiajie",
      },
      {
        file: "Tianzi Mountain cable car.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Tianzi%20Mountain%20cable%20car.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Tianzi_Mountain_cable_car.jpg",
        credit: "Codas",
        license: "CC BY-SA 4.0",
        caption: "Teleférico de Tianzi",
        alt: "Cabine do teleférico da Montanha Tianzi sobre a floresta de pilares",
      },
    ],
    video: {
      id: "MIWXK7fPRTY",
      title: "Guia completo das montanhas de Zhangjiajie",
      url: "https://www.youtube.com/watch?v=MIWXK7fPRTY",
    },
    sources: [
      {
        label: "UNESCO — Wulingyuan",
        url: "https://whc.unesco.org/en/list/640/",
      },
      {
        label: "Governo de Hunan — atrações de Zhangjiajie",
        url: "https://www.enghunan.gov.cn/hneng/Tourism/TourHunan/Zhangjiajie_1/TouristAttractions_12/index.html",
      },
    ],
    scores: { history: 1, food: 2, nature: 5, calm: 2, winter: 2 },
    coords: [29.1171, 110.478],
  },
  {
    id: "hangzhou",
    order: 5,
    name: "Hangzhou",
    chinese: "杭州",
    province: "Zhejiang",
    tag: "Lago, jardins e chá",
    categories: ["calm", "history", "nature"],
    days: "2–3 dias",
    best: "abr–mai · out–nov",
    rhythm: "Tranquilo",
    effort: "Leve",
    ideal: "Caminhar, pedalar e respirar",
    base: "Arredores do Lago Oeste",
    short:
      "Uma pausa elegante entre o Lago Oeste, jardins, templos e colinas de chá Longjing.",
    description:
      "Hangzhou combina uma cidade moderna com uma paisagem clássica cuidadosamente construída ao redor do Lago Oeste. Funciona especialmente bem para quem quer beleza sem uma agenda fisicamente pesada.",
    highlights: [
      {
        title: "Lago Oeste + Three Pools",
        summary:
          "Margens, jardins, ilhas, diques e pagodes formam a paisagem UNESCO. O barco até Xiaoyingzhou acrescenta a vista dos Três Espelhos da Lua.",
        location:
          "A oeste do centro de Hangzhou; a margem leste fica perto da estação Longxiangqiao.",
        access:
          "Metrô Linha 1 até Longxiangqiao. Ônibus e bicicletas atendem Su Causeway, Broken Bridge e Flower Harbor.",
        admission:
          "Margens e diques grátis. Barco com desembarque em Three Pools: RMB 55 comum ou RMB 70 de luxo, incluindo a ilha.",
        hours:
          "Área externa 24 horas. De abril a agosto, barcos normalmente 08:00–17:00; última saída da ilha por volta de 17:40.",
        duration: "3–5 horas; dia inteiro para contornar o lago com calma.",
        booking:
          "Sem reserva para caminhar. Bilhetes de barco nos píeres; mau tempo pode suspender a navegação.",
        priceNote: "Referência — confirmar no píer",
        sources: [
          {
            label: "UNESCO — West Lake Cultural Landscape",
            url: "https://whc.unesco.org/en/list/1334/",
          },
          {
            label: "Hangzhou — gratuidade dos pontos do lago",
            url: "https://ehangzhou.gov.cn/2020-06/24/c_270462.htm",
          },
        ],
      },
      {
        title: "Lingyin Temple + Feilai Peak",
        summary:
          "Um dos templos budistas mais importantes de Hangzhou, cercado por floresta e centenas de esculturas rupestres.",
        location:
          "Fayun Lane, colinas a noroeste do Lago Oeste, cerca de 5–6 km da margem leste.",
        access:
          "Ônibus 7 desde a região do Lago Oeste ou táxi/Didi; não há metrô junto ao portão.",
        admission:
          "Grátis desde 1º de dezembro de 2025, incluindo Lingyin, Feilai Peak, Yongfu e Taoguang.",
        hours:
          "Reservas divididas em 07:30–12:00 e 12:00–17:00; chegue dentro da faixa escolhida.",
        duration:
          "3–5 horas para Lingyin, Feilai Peak e ao menos um templo secundário.",
        booking:
          "Reserva nominal obrigatória pelo miniprograma “杭州灵隐飞来峰”, de 1 a 7 dias antes. Leve o passaporte original.",
        priceNote: "Oficial · entrada gratuita com reserva",
        sources: [
          {
            label: "Hangzhou — gratuidade desde dezembro de 2025",
            url: "https://www.ehangzhou.gov.cn/2025-12/04/c_295784.htm",
          },
          {
            label: "Regras, horários e documentos",
            url: "https://www.chinajob.com/city/detail.php?cata2=city_life&city_id=l5ywPe0ZhmTuy9cMGn&id=DbC7GuNiZbFIx3ldC6&p=1",
          },
        ],
      },
      {
        title: "Longjing + Meijiawu",
        summary:
          "Aldeias entre plantações de chá Longjing, com trilhas, casas de chá e experiências de colheita e torrefação.",
        location:
          "Colinas a sudoeste do Lago Oeste; Longjing fica a 5–7 km da margem e Meijiawu a cerca de 10 km.",
        access:
          "Ônibus 27 ou 87 até Longjing; ônibus 1314 atende Meijiawu. Táxi/Didi leva 20–40 minutos.",
        admission:
          "Grátis para aldeias e caminhos públicos; degustações, colheita, torrefação e pequenos museus têm preços próprios.",
        hours:
          "Aldeias acessíveis o dia todo; para casas de chá e experiências, visite aproximadamente 08:00–17:00.",
        duration: "2–4 horas; até 5 horas com trilha e experiência de chá.",
        booking:
          "Não é necessária para caminhar. Reserve experiências no fim de março e abril e confirme o preço antes de aceitar chá ou refeição.",
        priceNote: "Referência — serviços têm preço próprio",
        sources: [
          {
            label: "Hangzhou — Meijiawu Tea Culture Village",
            url: "https://www.ehangzhou.gov.cn/2018-08/15/c_262280.htm",
          },
          {
            label: "Portal governamental — chá Longjing",
            url: "https://govt.chinadaily.com.cn/s/202103/17/WS6051a7c6498e7a02c6f69e9b/nothing-replaces-my-cup-of-hangzhou-green-tea.html",
          },
        ],
      },
      {
        title: "Xixi Wetland",
        summary:
          "Zona úmida urbana de canais, lagos, pomares e aldeias. O barco elétrico conecta áreas distantes e reduz a caminhada.",
        location:
          "518 Tianmushan Road, oeste de Hangzhou, cerca de 5 km a oeste do Lago Oeste.",
        access:
          "Metrô Linha 3 até Xixi Wetland South ou Linha 19 até Xixi Wetland North; confira o portão do bilhete.",
        admission:
          "RMB 80; barco elétrico RMB 60; carrinho elétrico RMB 10 por trecho. Alguns corredores públicos são gratuitos.",
        hours:
          "Abr–7 out: 07:30–18:30, última entrada 18:00. 8 out–mar: 08:00–17:30, última entrada 17:00.",
        duration: "4–6 horas.",
        booking:
          "Compre no canal oficial “西溪湿地” ou na bilheteria. Em fins de semana, reserve também o barco.",
        priceNote: "Referência — confirmar temporada e barco",
        sources: [
          {
            label: "Hangzhou — localização, preço e sazonalidade",
            url: "https://www.ehangzhou.gov.cn/2020-04/22/c_269840.htm",
          },
          {
            label: "Horários detalhados e barcos",
            url: "https://m.hz.bendibao.com/jingdian/xixishidigongyuan/",
          },
        ],
      },
    ],
    tips: [
      "Visite o Lago Oeste cedo e retorne no pôr do sol; ele recompensa um passeio sem pressa.",
      "Algumas atrações exigem reserva nominal por horário mesmo quando a entrada é gratuita.",
      "Agrupe Lago Oeste, Lingyin e Longjing por região e leve proteção para chuva e umidade.",
    ],
    images: [
      {
        file: "West Lake - Hangzhou, China.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/West_Lake_-_Hangzhou%2C_China.jpg/1280px-West_Lake_-_Hangzhou%2C_China.jpg",
        page: "https://commons.wikimedia.org/wiki/File:West_Lake_-_Hangzhou%2C_China.jpg",
        credit: "Louisa Salazar",
        license: "CC BY-SA 3.0",
        caption: "Lago Oeste",
        alt: "Pagode Leifeng visto através do Lago Oeste em Hangzhou",
      },
      {
        file: "Tea plantation in hangzhou.JPG",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Tea_plantation_in_hangzhou.JPG/1280px-Tea_plantation_in_hangzhou.JPG",
        page: "https://commons.wikimedia.org/wiki/File:Tea_plantation_in_hangzhou.JPG",
        credit: "Shizhao",
        license: "CC BY 1.0",
        caption: "Plantações de chá Longjing",
        alt: "Fileiras verdes de uma plantação de chá em Hangzhou",
      },
      {
        file: "Hangzhou Lingyin-Temple 20161003.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Hangzhou%20Lingyin-Temple%2020161003.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Hangzhou_Lingyin-Temple_20161003.jpg",
        credit: "Tyg728",
        license: "CC BY-SA 4.0",
        caption: "Templo Lingyin",
        alt: "Grande salão tradicional do Templo Lingyin em Hangzhou",
      },
      {
        file: "Leifeng Pagoda and West Lake, Hangzhou 120529 2.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Leifeng%20Pagoda%20and%20West%20Lake%2C%20Hangzhou%20120529%202.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Leifeng_Pagoda_and_West_Lake,_Hangzhou_120529_2.jpg",
        credit: "Daniel Vorndran / DXR",
        license: "CC BY-SA 3.0",
        caption: "Pagode Leifeng",
        alt: "Pagode Leifeng ao fundo do Lago Oeste com ponte em primeiro plano",
      },
      {
        file: "Su Causeway near West Lake, looking towards north 20120529 1.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Su%20Causeway%20near%20West%20Lake%2C%20looking%20towards%20north%2020120529%201.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Su_Causeway_near_West_Lake,_looking_towards_north_20120529_1.jpg",
        credit: "Daniel Vorndran / DXR",
        license: "CC BY-SA 4.0",
        caption: "Calçada Su",
        alt: "Alameda arborizada da Calçada Su junto ao Lago Oeste",
      },
      {
        file: "Three Pools Mirroring the Moon 01 2020-04.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Three%20Pools%20Mirroring%20the%20Moon%2001%202020-04.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Three_Pools_Mirroring_the_Moon_01_2020-04.jpg",
        credit: "猫猫的日记本",
        license: "CC BY-SA 4.0",
        caption: "Três Espelhos da Lua",
        alt: "Lanternas de pedra do Three Pools Mirroring the Moon no Lago Oeste",
      },
      {
        file: "Xixi Wetland Park, Hangzhou,杭州西溪湿地 - panoramio.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Xixi%20Wetland%20Park%2C%20Hangzhou%2C%E6%9D%AD%E5%B7%9E%E8%A5%BF%E6%BA%AA%E6%B9%BF%E5%9C%B0%20-%20panoramio.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Xixi_Wetland_Park,_Hangzhou,%E6%9D%AD%E5%B7%9E%E8%A5%BF%E6%BA%AA%E6%B9%BF%E5%9C%B0_-_panoramio.jpg",
        credit: "Aaron Zhu",
        license: "CC BY-SA 3.0",
        caption: "Parque Xixi Wetland",
        alt: "Canais, vegetação e reflexos no Parque Nacional das Zonas Úmidas de Xixi",
      },
      {
        file: "Hefang Street, Hangzhou.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Hefang%20Street%2C%20Hangzhou.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Hefang_Street,_Hangzhou.jpg",
        credit: "钉钉",
        license: "CC BY-SA 4.0",
        caption: "Rua Hefang",
        alt: "Fachadas, letreiros e pedestres na histórica Rua Hefang de Hangzhou",
      },
    ],
    video: {
      id: "saxlJnc0exk",
      title: "Amazing China — West Lake, CCTV English",
      url: "https://www.youtube.com/watch?v=saxlJnc0exk",
    },
    sources: [
      {
        label: "UNESCO — Paisagem Cultural do Lago Oeste",
        url: "https://whc.unesco.org/en/list/1334/",
      },
      {
        label: "Hangzhou oficial — Lingyin e reservas",
        url: "https://www.ehangzhou.gov.cn/2025-11/21/c_295693.htm",
      },
    ],
    scores: { history: 3, food: 3, nature: 4, calm: 5, winter: 1 },
    coords: [30.2741, 120.1551],
  },
  {
    id: "lijiang",
    order: 6,
    name: "Lijiang",
    chinese: "丽江",
    province: "Yunnan",
    tag: "Cidade antiga",
    categories: ["history", "nature", "calm"],
    days: "3–4 dias",
    best: "abr–jun · set–nov",
    rhythm: "Contemplativo",
    effort: "Moderado · altitude",
    ideal: "Cultura Naxi e montanhas",
    base: "Dayan ou Shuhe",
    short:
      "Ruas de pedra, canais e telhados Naxi aos pés da Montanha do Dragão de Jade.",
    description:
      "A Cidade Antiga preserva um sistema de canais e um tecido urbano moldado pela cultura Naxi e pela antiga Rota do Chá e dos Cavalos. A 2.400 metros, Lijiang também abre caminho para paisagens alpinas.",
    highlights: [
      {
        title: "Dayan + Black Dragon Pool",
        summary:
          "Dayan preserva canais, pontes e ruas da Rota do Chá e dos Cavalos; o parque oferece a vista clássica da Jade Dragon Snow Mountain.",
        location:
          "Dayan ocupa o centro histórico; Black Dragon Pool fica 1–1,5 km ao norte, seguindo o canal desde a roda-d’água.",
        access:
          "Ônibus ou táxi da estação até os portões de Dayan. O parque fica a 15–25 minutos a pé do portão norte.",
        admission:
          "Taxa de conservação de RMB 50, válida por 365 dias e também aplicável a Shuhe e Baisha; o parque não cobra bilhete separado.",
        hours:
          "Dayan 24 horas. Black Dragon Pool: 07:30–21:00, última entrada 20:30; Elephant Hill costuma fechar às 16:00.",
        duration: "4–6 horas em Dayan e 1–2 horas no parque.",
        booking:
          "Normalmente sem reserva, salvo controle de lotação. Leve o passaporte e guarde o comprovante da taxa.",
        priceNote: "Referência — confirmar controle de acesso",
        sources: [
          {
            label: "UNESCO — Dayan e Black Dragon Pool",
            url: "https://whc.unesco.org/en/list/811/",
          },
          {
            label: "Taxa de conservação de Lijiang",
            url: "https://www.jfdaily.com/news/detail?id=948059",
          },
        ],
      },
      {
        title: "Shuhe + Baisha",
        summary:
          "Núcleos históricos mais tranquilos ligados à cultura Naxi; Baisha guarda murais religiosos de diferentes tradições.",
        location:
          "Shuhe fica cerca de 4 km a noroeste de Dayan; Baisha, aproximadamente 8 km ao norte.",
        access:
          "Ônibus 11 para Shuhe e ônibus 6 para Baisha; táxi/Didi facilita combinar as duas.",
        admission:
          "Aldeias sem bilhete separado, cobertas pela taxa de conservação de RMB 50. Murais de Baisha: RMB 20.",
        hours:
          "Ruas 24 horas; museu de Shuhe aproximadamente 07:30–17:30 e Murais de Baisha 08:00–17:30.",
        duration: "2–3 horas em cada aldeia; 5–6 horas para ambas.",
        booking:
          "Em geral não é necessária. Guarde o comprovante da taxa e confirme o horário dos murais no dia.",
        priceNote: "Referência — confirmar murais no dia",
        sources: [
          {
            label: "UNESCO — Shuhe e Baisha",
            url: "https://whc.unesco.org/en/list/811/",
          },
          {
            label: "Lijiang oficial — Murais de Baisha",
            url: "https://www.lijiang.cn/article/169846.html",
          },
        ],
      },
      {
        title: "Jade Dragon Snow Mountain",
        summary:
          "Complexo de alta montanha com Glacier Park a 4.506 m, Spruce Meadow e os lagos azul-turquesa de Blue Moon Valley.",
        location:
          "Condado de Yulong, ao norte de Lijiang; 60–80 minutos por estrada desde a Cidade Antiga.",
        access:
          "Ônibus turístico 101 desde Zhongyi Market, transfer oficial ou táxi até o centro de visitantes.",
        admission:
          "Entrada RMB 100 + ônibus ecológico RMB 20. Jul–ago/2026: Glacier Park Cableway RMB 120 e Spruce Meadow RMB 40.",
        hours:
          "No verão de 2026: 05:45–16:30. Teleféricos têm faixas próprias e podem parar por vento ou tempestade.",
        duration: "Dia inteiro, 7–10 horas.",
        booking:
          "Reserve entrada e teleférico nos canais oficiais com até 7 dias de antecedência. Compra nominal e passaporte obrigatório.",
        priceNote: "Oficial · tarifa especial jul–ago/2026",
        sources: [
          {
            label: "Lijiang oficial — preços do verão de 2026",
            url: "https://www.lijiang.cn/article/175988.html",
          },
          {
            label: "Lijiang Tourism — horários e reserva",
            url: "https://m.wenlvnews.com/p/753710.html",
          },
        ],
      },
      {
        title: "Tiger Leaping Gorge",
        summary:
          "O setor de Lijiang oferece passarelas e mirantes sobre o rio Jinsha e é mais simples para bate-volta do que a travessia de trekking.",
        location:
          "Longpan Township, condado de Yulong, cerca de 80 km de Lijiang; 1,5–2 horas por estrada.",
        access:
          "Ônibus turístico, excursão ou carro pela estrada Lijiang–Shangri-La. Confirme que o bilhete é do setor de Lijiang.",
        admission:
          "Grátis de 25 jul a 3 ago/2026 após reabertura; tarifa regular de referência do setor de Lijiang: cerca de RMB 65.",
        hours:
          "Referência abr–out: 07:30–16:30; nov–mar: 08:00–16:00. Chuvas podem causar fechamento imediato.",
        duration:
          "2–3 horas no setor panorâmico; dia inteiro com deslocamentos.",
        booking:
          "Confira o aviso oficial na manhã da visita. O parque reabriu em 23 jul/2026 após inspeção de segurança.",
        priceNote: "Referência — status muda com as chuvas",
        sources: [
          {
            label: "Lijiang Tourism — regra temporária de 2026",
            url: "https://m.wenlvnews.com/p/753890.html",
          },
          {
            label: "Aviso de reabertura em 23 jul/2026",
            url: "https://www.sohu.com/a/1053459602_121019331",
          },
        ],
      },
    ],
    tips: [
      "Mantenha o primeiro dia leve: a cidade já está a aproximadamente 2.400 metros.",
      "Reserve transporte e teleférico da Jade Dragon Snow Mountain e leve o documento original.",
      "Confira chuva e condições da Tiger Leaping Gorge antes de qualquer caminhada longa.",
    ],
    images: [
      {
        file: "Lijiang Yunnan Old-town-01.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Lijiang_Yunnan_Old-town-01.jpg/1280px-Lijiang_Yunnan_Old-town-01.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Lijiang_Yunnan_Old-town-01.jpg",
        credit: "CEphoto, Uwe Aranas",
        license: "CC BY-SA 3.0",
        caption: "Cidade Antiga de Lijiang",
        alt: "Telhados tradicionais da Cidade Antiga de Lijiang",
      },
      {
        file: "Lijiang Yunnan China Jade-Dragon-Snow-Mountain-01.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Lijiang_Yunnan_China_Jade-Dragon-Snow-Mountain-01.jpg/1280px-Lijiang_Yunnan_China_Jade-Dragon-Snow-Mountain-01.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Lijiang_Yunnan_China_Jade-Dragon-Snow-Mountain-01.jpg",
        credit: "CEphoto, Uwe Aranas",
        license: "CC BY-SA 3.0",
        caption: "Montanha do Dragão de Jade",
        alt: "Montanha do Dragão de Jade vista a partir de Lijiang",
      },
      {
        file: "Lijiang Yunnan Black-Dragon-Pool-01.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Lijiang%20Yunnan%20Black-Dragon-Pool-01.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Lijiang_Yunnan_Black-Dragon-Pool-01.jpg",
        credit: "CEphoto, Uwe Aranas",
        license: "CC BY-SA 3.0",
        caption: "Lago do Dragão Negro",
        alt: "Lago do Dragão Negro com pavilhão, ponte e a Montanha do Dragão de Jade ao fundo",
      },
      {
        file: "Shuhe - Lijiang Old City.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Shuhe%20-%20Lijiang%20Old%20City.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Shuhe_-_Lijiang_Old_City.jpg",
        credit: "Cedric Vanvelthem",
        license: "CC BY-SA 4.0",
        caption: "Ruas tradicionais de Shuhe",
        alt: "Rua estreita de pedra entre casas tradicionais na cidade antiga de Shuhe",
      },
      {
        file: "1 lijiang old town 2012a.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/1%20lijiang%20old%20town%202012a.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:1_lijiang_old_town_2012a.jpg",
        credit: "Chensiyuan",
        license: "CC BY-SA 4.0",
        caption: "Telhados e vielas da Cidade Antiga",
        alt: "Vista elevada dos telhados e ruas da Cidade Antiga de Lijiang",
      },
      {
        file: "Baisha Old Town (21193749275).jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Baisha%20Old%20Town%20(21193749275).jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Baisha_Old_Town_(21193749275).jpg",
        credit: "Luca Casartelli",
        license: "CC BY-SA 2.0",
        caption: "Vila histórica de Baisha",
        alt: "Casas tradicionais e paisagem rural da antiga vila de Baisha, perto de Lijiang",
      },
      {
        file: "玉龙雪山 蓝月谷 Blue Moon Valley - panoramio.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/%E7%8E%89%E9%BE%99%E9%9B%AA%E5%B1%B1%20%E8%93%9D%E6%9C%88%E8%B0%B7%20Blue%20Moon%20Valley%20-%20panoramio.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:%E7%8E%89%E9%BE%99%E9%9B%AA%E5%B1%B1_%E8%93%9D%E6%9C%88%E8%B0%B7_Blue_Moon_Valley_-_panoramio.jpg",
        credit: "Ma Martin",
        license: "CC BY-SA 3.0",
        caption: "Vale da Lua Azul",
        alt: "Lagos azul-turquesa do Vale da Lua Azul aos pés da Montanha do Dragão de Jade",
      },
      {
        file: "Yunnan China Tiger-Leaping-Gorge-04.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Yunnan%20China%20Tiger-Leaping-Gorge-04.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Yunnan_China_Tiger-Leaping-Gorge-04.jpg",
        credit: "CEphoto, Uwe Aranas",
        license: "CC BY-SA 3.0",
        caption: "Desfiladeiro do Salto do Tigre",
        alt: "Rio Jinsha correndo entre as montanhas íngremes do Desfiladeiro do Salto do Tigre",
      },
    ],
    video: {
      id: "rtNjHIltIFQ",
      title: "Guia de Lijiang — cidade antiga, vilas e montanha",
      url: "https://www.youtube.com/watch?v=rtNjHIltIFQ",
    },
    sources: [
      {
        label: "UNESCO — Cidade Antiga de Lijiang",
        url: "https://whc.unesco.org/en/list/811/",
      },
      {
        label: "Guia oficial — altitude e viagem em Lijiang",
        url: "https://govt.chinadaily.com.cn/s/201907/01/WS5d1974c3498e5314096b6753/q-a-about-travelling-in-lijiang.html",
      },
    ],
    scores: { history: 4, food: 2, nature: 4, calm: 4, winter: 2 },
    coords: [26.8721, 100.2299],
  },
  {
    id: "huangshan",
    order: 7,
    name: "Huangshan",
    chinese: "黄山",
    province: "Anhui",
    tag: "Montanhas icônicas",
    categories: ["nature"],
    days: "3–4 dias",
    best: "abr–mai · set–nov",
    rhythm: "Ativo e fotográfico",
    effort: "Alto",
    ideal: "Trilhas, picos e mar de nuvens",
    base: "1 noite no alto",
    short:
      "Granito, pinheiros retorcidos e picos que parecem ilhas flutuando sobre a névoa.",
    description:
      "Huangshan parece uma pintura chinesa em três dimensões. É patrimônio misto, cultural e natural, e combina trilhas por picos de granito com as vilas históricas de Huizhou.",
    highlights: [
      {
        title: "Área Cênica de Huangshan",
        summary:
          "Núcleo da Montanha Amarela, com pinheiros, granito e trilhas entre Guangmingding, Tiandu e Lianhua.",
        location:
          "Distrito de Huangshan; Tangkou, junto ao Portão Sul, é a base prática, a cerca de 1 hora de Huangshan North.",
        access:
          "Ônibus de Huangshan North a Tangkou. O ônibus interno obrigatório leva a Yungu Temple ou Ciguang Pavilion.",
        admission:
          "RMB 190 de 21 jan a 19 dez/2026; RMB 150 de 20 dez a 20 jan. Teleféricos por trecho: RMB 80–90, com tarifa menor no inverno.",
        hours:
          "25 jul–31 ago/2026: seg–sex 06:30–17:10; sáb–dom 06:00–17:40. Última subida a pé às 15:00.",
        duration:
          "1 dia completo; 2 dias com pernoite para um ritmo mais confortável.",
        booking:
          "Reserva nominal por horário e direção no miniapp oficial, preferencialmente 3 dias antes. Leve o passaporte original.",
        priceNote: "Oficial · preços e horário de 2026",
        sources: [
          {
            label: "Política oficial de preços de 2026",
            url: "https://m.gmw.cn/2025-12/19/content_1304270257.htm",
          },
          {
            label: "Horários oficiais do verão de 2026",
            url: "https://www.ctdsb.net/c1722_202607/2811615.html",
          },
        ],
      },
      {
        title: "Xihai Grand Canyon",
        summary:
          "Escadarias e mirantes dramáticos entre Paiyun Pavilion e Tianhai. O funicular permite reduzir parte da subida.",
        location:
          "Dentro da Área Cênica, entre Paiyun Pavilion e a região de Tianhai/Baiyun.",
        access:
          "Suba por Yungu ou Taiping e caminhe até Paiyun Pavilion; desça pela trilha e retorne pelo funicular de Xihai.",
        admission:
          "Incluído no parque. Funicular: RMB 100 por trecho na temporada regular de 2026 e RMB 80 no inverno.",
        hours:
          "Segue a operação do parque. Costuma fechar no inverno e pode ser interditado por chuva, gelo ou manutenção.",
        duration:
          "4–6 horas na rota completa; 2–3 horas com funicular e rota parcial.",
        booking:
          "Sem reserva separada, mas parque e transporte devem estar reservados. Confira a abertura no dia e comece antes do meio-dia.",
        priceNote: "Oficial · operação sazonal",
        sources: [
          {
            label: "Preços oficiais e funicular em 2026",
            url: "https://m.gmw.cn/2025-12/19/content_1304270257.htm",
          },
          {
            label: "Aviso de reabertura sazonal",
            url: "https://m.gmw.cn/2025-03/19/content_1303994721.htm",
          },
        ],
      },
      {
        title: "Nascer do sol e mar de nuvens",
        summary:
          "Guangmingding, Danxia Peak e Beihai estão entre os pontos procurados para amanhecer e mar de nuvens, sempre dependentes do clima.",
        location:
          "Região alta; Guangmingding fica no setor central e Danxia Peak perto de Xihai Hotel e Paiyun Pavilion.",
        access:
          "Suba no horário normal e durma em hotel autorizado no topo. Não é possível iniciar a subida pela portaria de madrugada.",
        admission:
          "Sem ingresso adicional. Hospedagem, refeições, ônibus e teleféricos são cobrados à parte e têm preços dinâmicos.",
        hours:
          "Mirantes sem horário independente; hotéis informam a previsão do nascer do sol. Portarias e teleféricos fecham de madrugada.",
        duration:
          "1 pernoite, mais 60–90 minutos para deslocamento e observação.",
        booking:
          "Reserve primeiro o hotel no topo e depois o ingresso. Confirme com o hotel o mirante indicado e a previsão meteorológica.",
        priceNote: "Referência — hospedagem tem preço dinâmico",
        sources: [
          {
            label: "Roteiro oficial com pernoite",
            url: "https://wap.huangshan.com.cn/detail/strategy/fjqlyzx",
          },
          {
            label: "Política oficial de ingressos 2026",
            url: "https://m.gmw.cn/2025-12/19/content_1304270257.htm",
          },
        ],
      },
      {
        title: "Hongcun e Xidi",
        summary:
          "Vilas UNESCO de arquitetura Huizhou, com residências, salões ancestrais, canais e ruelas de pedra.",
        location:
          "Condado de Yi, a oeste da cidade de Huangshan; ambas ficam na mesma rota de ônibus.",
        access:
          "Ônibus desde Huangshan North leva cerca de 1h30 e passa por Xidi antes de Hongcun; há transporte entre as vilas.",
        admission:
          "Preço cheio RMB 104 por vila. Em jul/2026, plataformas exibiam RMB 94 por vila e combo por RMB 159.",
        hours:
          "Xidi: 07:30–20:30. Hongcun: referência de 07:30–17:30; confirme acesso noturno e último ônibus.",
        duration:
          "3–5 horas por vila; 7–9 horas para ambas no mesmo dia.",
        booking:
          "Compra antecipada recomendada em fins de semana. Leve o passaporte vinculado ao QR code e confira a regra de reentrada.",
        priceNote: "Referência — promoções variam",
        sources: [
          {
            label: "Site oficial de Xidi — horário e endereço",
            url: "https://www.chinaxidi.com.cn/",
          },
          {
            label: "Operador oficial — preço cheio",
            url: "https://www.chinaxidi.com.cn/run_href.html?typeid=110",
          },
        ],
      },
    ],
    tips: [
      "Uma noite no alto melhora as chances de ver o nascer do sol e o mar de nuvens.",
      "O teleférico reduz a subida, mas não elimina os degraus: leve mochila pequena e calçado aderente.",
      "Consulte clima, teleféricos e trilhas pouco antes; picos podem entrar em fechamento rotativo.",
    ],
    images: [
      {
        file: "Huangshan pic 4.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Huangshan_pic_4.jpg/1280px-Huangshan_pic_4.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Huangshan_pic_4.jpg",
        credit: "Chi King",
        license: "CC BY 2.0",
        caption: "Picos de granito de Huangshan",
        alt: "Picos de granito e pinheiros na paisagem de Huangshan",
      },
      {
        file: "El parque nacional de HuangShan. Un espectacular paisaje de montañas rocosas por encima de las nubes. (15732624395).jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/El_parque_nacional_de_HuangShan._Un_espectacular_paisaje_de_monta%C3%B1as_rocosas_por_encima_de_las_nubes._%2815732624395%29.jpg/1280px-El_parque_nacional_de_HuangShan._Un_espectacular_paisaje_de_monta%C3%B1as_rocosas_por_encima_de_las_nubes._%2815732624395%29.jpg",
        page: "https://commons.wikimedia.org/wiki/File:El_parque_nacional_de_HuangShan._Un_espectacular_paisaje_de_monta%C3%B1as_rocosas_por_encima_de_las_nubes._%2815732624395%29.jpg",
        credit: "Carlos Adampol Galindo",
        license: "CC BY-SA 2.0",
        caption: "Huangshan acima das nuvens",
        alt: "Picos de Huangshan elevando-se acima de um mar de nuvens",
      },
      {
        file: "迎客松 Welcome Pine - panoramio.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/%E8%BF%8E%E5%AE%A2%E6%9D%BE%20Welcome%20Pine%20-%20panoramio.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:%E8%BF%8E%E5%AE%A2%E6%9D%BE_Welcome_Pine_-_panoramio.jpg",
        credit: "Lienyuan Lee",
        license: "CC BY 3.0",
        caption: "Pinheiro da Recepção",
        alt: "Famoso Pinheiro da Recepção crescendo na encosta rochosa de Huangshan",
      },
      {
        file: "Huangshan - Steps to Heaven.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Huangshan%20-%20Steps%20to%20Heaven.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Huangshan_-_Steps_to_Heaven.jpg",
        credit: "Jian-Guo Li (Jakemete)",
        license: "Domínio público",
        caption: "Escadaria rumo ao Pico Tiandu",
        alt: "Escadaria íngreme talhada na rocha subindo em direção ao Pico Tiandu, em Huangshan",
      },
      {
        file: "HuangshanSunrise.JPG",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/HuangshanSunrise.JPG?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:HuangshanSunrise.JPG",
        credit: "Bgwwlm",
        license: "CC BY-SA 3.0",
        caption: "Nascer do sol em Beihai",
        alt: "Luz dourada do nascer do sol sobre os picos de Huangshan vista de Beihai",
      },
      {
        file: "Sea of clouds viewed from the top of Huangshan.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Sea%20of%20clouds%20viewed%20from%20the%20top%20of%20Huangshan.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Sea_of_clouds_viewed_from_the_top_of_Huangshan.jpg",
        credit: "JesseW900",
        license: "CC BY-SA 4.0",
        caption: "Mar de Nuvens",
        alt: "Picos de granito emergindo acima de uma camada espessa de nuvens em Huangshan",
      },
      {
        file: "Hongcun.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Hongcun.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Hongcun.jpg",
        credit: "Udo Schoene",
        license: "CC BY 2.5",
        caption: "Vila histórica de Hongcun",
        alt: "Casas brancas tradicionais de Hongcun refletidas no lago diante da vila",
      },
      {
        file: "Xidi, Anhui.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Xidi%2C%20Anhui.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Xidi,_Anhui.jpg",
        credit: "EditQ",
        license: "CC BY-SA 4.0",
        caption: "Arquitetura tradicional de Xidi",
        alt: "Casas tradicionais, pavilhão e lago na antiga vila de Xidi",
      },
    ],
    video: {
      id: "kaIvczVIBnA",
      title: "Bem-vindo a Huangshan, onde o turismo chinês moderno começou",
      url: "https://www.youtube.com/watch?v=kaIvczVIBnA",
    },
    sources: [
      {
        label: "UNESCO — Monte Huangshan",
        url: "https://whc.unesco.org/en/list/547/",
      },
      {
        label: "UNESCO — Vilas de Xidi e Hongcun",
        url: "https://whc.unesco.org/en/list/1002/",
      },
    ],
    scores: { history: 2, food: 1, nature: 5, calm: 3, winter: 3 },
    coords: [30.1333, 118.1667],
  },
  {
    id: "harbin",
    order: 8,
    name: "Harbin",
    chinese: "哈尔滨",
    province: "Heilongjiang",
    tag: "Bônus de inverno",
    categories: ["winter", "history"],
    days: "2–3 dias",
    best: "fim de dez–meados de fev.",
    rhythm: "Urbano e invernal",
    effort: "Moderado · frio intenso",
    ideal: "Gelo iluminado e arquitetura",
    base: "Centro / Central Avenue",
    short:
      "Palácios de gelo, esculturas monumentais e uma arquitetura russa incomum na China.",
    description:
      "Harbin é o destino mais sazonal da seleção. As esculturas gigantes de gelo e neve mudam a cada inverno, enquanto a Catedral de Santa Sofia e a Central Avenue revelam a influência russa da cidade.",
    highlights: [
      {
        title: "Ice-Snow World",
        summary:
          "Parque noturno de palácios de gelo, esculturas, shows, roda-gigante e supertobogã; entre antes do acendimento das luzes.",
        location:
          "Distrito de Songbei, lado oeste de Sun Island, na margem norte do rio Songhua.",
        access:
          "Metrô Linha 2 até Ice and Snow World, saída 3; o acesso leste fica a cerca de 50 metros.",
        admission:
          "Referência 2025–26: adulto RMB 328 e tarifa reduzida RMB 240. Preço de 2026–27 ainda não anunciado.",
        hours:
          "Referência 2025–26: 10:00–22:00, última entrada por volta de 21:30. Datas de 2026–27 ainda não anunciadas.",
        duration: "4–6 horas.",
        booking:
          "Compre no canal oficial e leve o passaporte. Atrações disputadas podem exigir reserva adicional após a entrada.",
        priceNote: "Referência da edição 2025–26",
        sources: [
          {
            label: "Site oficial — ingressos e transporte",
            url: "https://ice.hrbicesnow.com/",
          },
          {
            label: "Heilongjiang — preço da 27ª edição",
            url: "https://wlt.hlj.gov.cn/wlt/c114169/202510/c00_31879336.shtml",
          },
        ],
      },
      {
        title: "Sun Island Snow Expo",
        summary:
          "Exposição diurna de esculturas monumentais de neve, mais artística e tranquila que o Ice-Snow World.",
        location:
          "Sun Island Scenic Area, distrito de Songbei, entre o centro histórico e o Ice-Snow World.",
        access:
          "Metrô Linha 2 até Sun Island, saídas 2 ou 3; a saída 2 fica mais perto do centro de visitantes.",
        admission:
          "Referência da edição 2025–26: RMB 198; pré-abertura promocional RMB 128.",
        hours:
          "Referência 2025–26: 09:00–17:00, bilheteria até 16:00 e última entrada 16:30.",
        duration: "3–4 horas.",
        booking:
          "Reserve pelo WeChat oficial de Sun Island e leve o documento original. Reconfirme a abertura poucos dias antes.",
        priceNote: "Referência da edição 2025–26",
        sources: [
          {
            label: "38ª edição — preço, horário e entrada",
            url: "https://www.hrbtv.net/folder477/2025-12-25/1112971.html",
          },
          {
            label: "Xinhua — abertura e reserva oficial",
            url: "https://www.news.cn/local/20251227/4077d12f929d4e6dad4e979ca4a032b3/c.html",
          },
        ],
      },
      {
        title: "Central Avenue",
        summary:
          "Mais de um quilômetro de arquitetura europeia, cafés, restaurantes russos e especialidades como sorvete Madier.",
        location:
          "Distrito de Daoli, entre Jingwei Street e o rio Songhua.",
        access:
          "Metrô Linha 2 até Central Avenue; percorra a rua no sentido do Flood Control Monument e do rio.",
        admission: "Gratuito.",
        hours:
          "Via pública aberta 24 horas; lojas, apresentações e restaurantes seguem horários próprios.",
        duration:
          "2–3 horas; 4 horas com refeição e caminhada na margem do rio.",
        booking:
          "Não exige reserva nem documento. No inverno, use calçado antiderrapante e planeje pausas em locais aquecidos.",
        priceNote: "Oficial · acesso livre",
        sources: [
          {
            label: "Heilongjiang — patrimônio arquitetônico",
            url: "https://wlt.hlj.gov.cn/wlt/c114169/202409/c00_31768407.shtml",
          },
          {
            label: "Harbin — atrações gratuitas no exterior",
            url: "https://hrbcredit.harbin.gov.cn/creditMess.do?conId=57e92ca168c5434d8d0ea62663f66ca1&method=showDetailHtml",
          },
        ],
      },
      {
        title: "Catedral de Santa Sofia",
        summary:
          "Marco de tijolos vermelhos e cúpula verde que hoje funciona como galeria de arquitetura; a praça externa é especialmente bonita ao entardecer.",
        location:
          "88 Toulong Street, distrito de Daoli, a 10–15 minutos a pé do trecho sul de Central Avenue.",
        access:
          "Chegue a pé desde Central Avenue, de táxi ou ônibus até Zhaolin Street.",
        admission:
          "Praça externa grátis. Referência jul/2026 para o interior: RMB 25 adulto e RMB 20 reduzido.",
        hours:
          "Referência de 29 jul/2026: 08:30–21:00, última entrada 20:45. Eventos podem alterar o acesso.",
        duration: "45–90 minutos.",
        booking:
          "Praça sem reserva. Para o interior, compre na bilheteria ou plataforma autorizada e leve o passaporte.",
        priceNote: "Referência — confirmar eventos no dia",
        sources: [
          {
            label: "Heilongjiang — descrição oficial",
            url: "https://wlt.hlj.gov.cn/wlt/c114169/202402/c00_31710322.shtml",
          },
          {
            label: "Tarifas consultadas em julho de 2026",
            url: "https://touch.piao.qunar.com/touch/detail_6085.html",
          },
        ],
      },
    ],
    tips: [
      "As datas mudam conforme o clima. Confirme a abertura da edição antes de reservar.",
      "Use segunda pele, isolamento, casaco corta-vento, botas, proteção facial e bateria externa.",
      "Veja Sun Island de dia e entre no Ice-Snow World no fim da tarde para acompanhar as luzes.",
    ],
    images: [
      {
        file: "Harbin Ice and Snow World 2010.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Harbin_Ice_and_Snow_World_2010.jpg/1280px-Harbin_Ice_and_Snow_World_2010.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Harbin_Ice_and_Snow_World_2010.jpg",
        credit: "Dayou_X",
        license: "CC BY-SA 2.0",
        caption: "Ice and Snow World",
        alt: "Estruturas coloridas de gelo iluminado no Ice and Snow World",
      },
      {
        file: "Saint Sophia Cathedral, Harbin 06.01.2026.jpg",
        src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Saint_Sophia_Cathedral%2C_Harbin_06.01.2026.jpg/1280px-Saint_Sophia_Cathedral%2C_Harbin_06.01.2026.jpg",
        page: "https://commons.wikimedia.org/wiki/File:Saint_Sophia_Cathedral,_Harbin_06.01.2026.jpg",
        credit: "SmallSonMarex",
        license: "CC BY-SA 4.0",
        caption: "Catedral de Santa Sofia",
        alt: "Catedral de Santa Sofia em Harbin cercada por neve",
      },
      {
        file: "Central Street (Zhongyang Dajie), Harbin 6.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Central%20Street%20(Zhongyang%20Dajie)%2C%20Harbin%206.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Central_Street_(Zhongyang_Dajie)%2C_Harbin_6.jpg",
        credit: "Enming Yan",
        license: "CC BY-SA 4.0",
        caption: "Avenida Central",
        alt: "Calçadão da Avenida Central de Harbin cercado por edifícios históricos no inverno",
      },
      {
        file: "2011 Harbin Sun Island International Snow Sculpture EXPO 07.JPG",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/2011%20Harbin%20Sun%20Island%20International%20Snow%20Sculpture%20EXPO%2007.JPG?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:2011_Harbin_Sun_Island_International_Snow_Sculpture_EXPO_07.JPG",
        credit: "Caliva",
        license: "CC BY-SA 4.0",
        caption: "Esculturas de neve da Ilha do Sol",
        alt: "Grande escultura branca de neve na exposição de inverno da Ilha do Sol, em Harbin",
      },
      {
        file: "Frozen Songhua River.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Frozen%20Songhua%20River.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Frozen_Songhua_River.jpg",
        credit: "ChiralJon",
        license: "CC BY 2.0",
        caption: "Rio Songhua congelado",
        alt: "Rio Songhua coberto de gelo e neve durante o inverno em Harbin",
      },
      {
        file: "St. Alexeevsky Church - Harbin (15466036705).jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/St.%20Alexeevsky%20Church%20-%20Harbin%20(15466036705).jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:St._Alexeevsky_Church_-_Harbin_(15466036705).jpg",
        credit: "Keith Simpkins",
        license: "CC BY 2.0",
        caption: "Igreja de Santo Aleixo",
        alt: "Fachada vermelha da Igreja de Santo Aleixo, exemplo da arquitetura russa em Harbin",
      },
      {
        file: "Snow and Ice World festival in Harbin, China (3238519038).jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Snow%20and%20Ice%20World%20festival%20in%20Harbin%2C%20China%20(3238519038).jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Snow_and_Ice_World_festival_in_Harbin%2C_China_(3238519038).jpg",
        credit: "Rincewind42",
        license: "CC BY 2.0",
        caption: "Palácios de gelo à noite",
        alt: "Torres e palácios de gelo acesos com luzes coloridas à noite no festival de Harbin",
      },
      {
        file: "Central Street (Zhongyang Dajie), Harbin 13 Ice (snow) sculpture.jpg",
        src: "https://commons.wikimedia.org/wiki/Special:FilePath/Central%20Street%20(Zhongyang%20Dajie)%2C%20Harbin%2013%20Ice%20(snow)%20sculpture.jpg?width=1280",
        page: "https://commons.wikimedia.org/wiki/File:Central_Street_(Zhongyang_Dajie)%2C_Harbin_13_Ice_(snow)_sculpture.jpg",
        credit: "Enming Yan",
        license: "CC BY-SA 4.0",
        caption: "Arte de gelo na Avenida Central",
        alt: "Escultura de gelo e neve instalada na Avenida Central de Harbin durante o inverno",
      },
    ],
    video: {
      id: "h5j9gXh83ck",
      title: "Viajantes no Harbin Ice and Snow World",
      url: "https://www.youtube.com/shorts/h5j9gXh83ck",
    },
    sources: [
      {
        label: "Governo chinês — inverno e temperaturas em Harbin",
        url: "https://english.www.gov.cn/news/202502/06/content_WS67a4b8dfc6d0868f4e8ef69f.html",
      },
      {
        label: "People’s Daily — fechamento da edição 2025–2026",
        url: "https://en.people.cn/n3/2026/0222/c90000-20427284.html",
      },
    ],
    scores: { history: 3, food: 2, nature: 2, calm: 1, winter: 5 },
    coords: [45.8038, 126.535],
    seasonal: true,
  },
];

const categoryLabels = {
  history: "História",
  food: "Gastronomia",
  nature: "Natureza",
  calm: "Tranquilo",
  winter: "Inverno",
};

const vibeCopy = {
  history: "Para mergulhar em camadas de história",
  food: "Para deixar o paladar conduzir o roteiro",
  nature: "Para voltar com a câmera cheia",
  calm: "Para viajar em um ritmo mais leve",
  winter: "Para transformar o frio no protagonista",
};

const state = {
  filter: "all",
  savedOnly: false,
  compare: readStorage("rotaChinaCompare"),
  saved: readStorage("rotaChinaSaved"),
  current: null,
  lightboxIndex: 0,
};

const grid = document.querySelector("[data-destination-grid]");
const emptyState = document.querySelector("[data-empty-state]");
const dialog = document.querySelector("[data-destination-dialog]");
const dialogContent = document.querySelector("[data-dialog-content]");
const lightbox = document.querySelector("[data-image-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxMedia = document.querySelector("[data-lightbox-media]");
const lightboxLoading = document.querySelector("[data-lightbox-loading]");
const lightboxCounter = document.querySelector("[data-lightbox-counter]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxCredit = document.querySelector("[data-lightbox-credit]");
const lightboxResolution = document.querySelector("[data-lightbox-resolution]");
const lightboxOriginal = document.querySelector("[data-lightbox-original]");
const matchResult = document.querySelector("[data-match-result]");
const toast = document.querySelector("[data-toast]");
let toastTimer;
let lightboxTouchStart = null;

function readStorage(key) {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // A experiência continua funcionando quando o armazenamento está bloqueado.
  }
}

function escapeAttribute(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function destinationById(id) {
  return destinations.find((destination) => destination.id === id);
}

function imageMarkup(image, options = {}) {
  const loading = options.eager ? "eager" : "lazy";
  return `<img src="${escapeAttribute(image.src)}" alt="${escapeAttribute(
    image.alt,
  )}" loading="${loading}" decoding="async" referrerpolicy="no-referrer" />`;
}

function originalImageSource(image) {
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    image.file,
  )}`;
}

function cardMarkup(destination) {
  const selected = state.compare.includes(destination.id);
  const saved = state.saved.includes(destination.id);
  const number = String(destination.order).padStart(2, "0");
  const pills = [destination.days, destination.best]
    .map((item) => `<span>${item}</span>`)
    .join("");

  return `
    <article class="destination-card ${destination.seasonal ? "seasonal-card" : ""}" id="destino-${destination.id}">
      <div class="card-media media" data-label="${escapeAttribute(destination.name)}">
        <button type="button" data-open-destination="${destination.id}" aria-label="Abrir guia de ${escapeAttribute(destination.name)}">
          ${imageMarkup(destination.images[0])}
        </button>
        <div class="card-overlay"></div>
        <span class="card-number">${number}</span>
        <span class="card-photo-count">${destination.images.length} fotos</span>
        <span class="card-tag">${destination.tag}</span>
        <button
          type="button"
          class="save-card ${saved ? "is-saved" : ""}"
          data-save-destination="${destination.id}"
          aria-label="${saved ? "Remover" : "Salvar"} ${escapeAttribute(destination.name)} dos favoritos"
          aria-pressed="${saved}"
        >${saved ? "♥" : "♡"}</button>
      </div>
      <div class="card-body">
        <div class="card-meta">
          <span>${destination.province}</span>
          <span>${destination.effort}</span>
        </div>
        <div class="card-title-line">
          <h3>${destination.name}</h3>
          <span class="card-chinese" aria-hidden="true">${destination.chinese}</span>
        </div>
        <p class="card-hook">${destination.short}</p>
        <div class="card-pills">${pills}</div>
        <div class="card-actions">
          <button class="card-open" type="button" data-open-destination="${destination.id}">Ver guia</button>
          <button
            class="compare-toggle ${selected ? "is-selected" : ""}"
            type="button"
            data-compare-destination="${destination.id}"
            aria-pressed="${selected}"
            ${!selected && state.compare.length >= 3 ? "disabled" : ""}
          >${selected ? "✓ Comparando" : "+ Comparar"}</button>
        </div>
      </div>
    </article>
  `;
}

function renderDestinations() {
  const visible = destinations.filter((destination) => {
    const categoryMatch =
      state.filter === "all" || destination.categories.includes(state.filter);
    const savedMatch = !state.savedOnly || state.saved.includes(destination.id);
    return categoryMatch && savedMatch;
  });

  grid.innerHTML = visible.map(cardMarkup).join("");
  emptyState.hidden = visible.length > 0;
  attachImageFallbacks(grid);
  updateCounts();
}

function attachImageFallbacks(root = document) {
  root.querySelectorAll("img").forEach((image) => {
    if (image.dataset.fallbackReady) return;
    image.dataset.fallbackReady = "true";
    image.addEventListener("error", () => {
      const media = image.closest(".media, figure, .compare-card-media");
      if (media) {
        media.classList.add("media", "is-fallback");
        if (!media.dataset.label) media.dataset.label = image.alt || "China";
      }
      image.remove();
    });
  });
}

function setHeroImages() {
  document.querySelectorAll("[data-commons-file]").forEach((image) => {
    const requested = image.dataset.commonsFile;
    const match = destinations
      .flatMap((destination) => destination.images)
      .find((item) => item.file === requested);
    if (match) {
      image.src = match.src;
      image.referrerPolicy = "no-referrer";
    }
  });
  attachImageFallbacks(document);
}

function toggleCompare(id) {
  if (state.compare.includes(id)) {
    state.compare = state.compare.filter((item) => item !== id);
  } else if (state.compare.length >= 3) {
    showToast("Você pode comparar até três destinos.");
    return;
  } else {
    state.compare.push(id);
    showToast(`${destinationById(id).name} entrou na comparação.`);
  }
  writeStorage("rotaChinaCompare", state.compare);
  renderDestinations();
  renderCompare();
  if (state.current === id) updateDialogActions();
}

function toggleSaved(id) {
  const wasSaved = state.saved.includes(id);
  state.saved = wasSaved
    ? state.saved.filter((item) => item !== id)
    : [...state.saved, id];
  writeStorage("rotaChinaSaved", state.saved);
  showToast(wasSaved ? "Destino removido dos favoritos." : "Destino salvo nos favoritos.");
  renderDestinations();
  updateSavedButtons();
  if (state.current === id) updateDialogActions();
}

function updateCounts() {
  document.querySelectorAll("[data-compare-count]").forEach((element) => {
    element.textContent = state.compare.length;
  });
  document.querySelectorAll("[data-saved-count]").forEach((element) => {
    element.textContent = state.saved.length;
  });
}

function updateSavedButtons() {
  document.querySelectorAll("[data-show-saved]").forEach((button) => {
    button.setAttribute("aria-pressed", String(state.savedOnly));
  });
  updateCounts();
}

function renderCompare() {
  const empty = document.querySelector("[data-compare-empty]");
  const content = document.querySelector("[data-compare-content]");
  const selected = state.compare.map(destinationById).filter(Boolean);

  if (!selected.length) {
    empty.hidden = false;
    content.hidden = true;
    content.innerHTML = "";
    updateCounts();
    return;
  }

  empty.hidden = true;
  content.hidden = false;
  content.innerHTML = `
    <div class="compare-grid">
      ${selected
        .map(
          (destination) => `
            <article class="compare-card">
              <div class="compare-card-media media" data-label="${escapeAttribute(destination.name)}">
                ${imageMarkup(destination.images[0])}
              </div>
              <button
                class="compare-remove"
                type="button"
                data-compare-destination="${destination.id}"
                aria-label="Remover ${escapeAttribute(destination.name)} da comparação"
              >×</button>
              <div class="compare-card-body">
                <h3>${destination.name}</h3>
                <dl>
                  <div><dt>Melhor para</dt><dd>${destination.ideal}</dd></div>
                  <div><dt>Duração</dt><dd>${destination.days}</dd></div>
                  <div><dt>Época</dt><dd>${destination.best}</dd></div>
                  <div><dt>Ritmo</dt><dd>${destination.rhythm}</dd></div>
                  <div><dt>Esforço</dt><dd>${destination.effort}</dd></div>
                  <div><dt>Boa base</dt><dd>${destination.base}</dd></div>
                </dl>
                <button class="card-open" type="button" data-open-destination="${destination.id}">Abrir guia</button>
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
  attachImageFallbacks(content);
  updateCounts();
}

function selectVibe(vibe) {
  document.querySelectorAll("[data-vibe]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.vibe === vibe);
    button.setAttribute("aria-pressed", String(button.dataset.vibe === vibe));
  });

  const matches = [...destinations]
    .sort((a, b) => b.scores[vibe] - a.scores[vibe] || a.order - b.order)
    .slice(0, 3);

  matchResult.innerHTML = `
    <p class="kicker">${vibeCopy[vibe]}</p>
    <div class="match-list">
      ${matches
        .map(
          (destination, index) => `
            <button type="button" data-open-destination="${destination.id}">
              <span><small>${String(index + 1).padStart(2, "0")}</small><br><strong>${destination.name}</strong></span>
              <span aria-hidden="true">→</span>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function openDestination(id, updateHash = true) {
  const destination = destinationById(id);
  if (!destination) return;
  state.current = id;

  const highlights = destination.highlights
    .map((item, index) => {
      const source = item.sources?.[0];
      const noteIsReference = /referência|estimad|sazonal|última edição/i.test(
        item.priceNote || "",
      );

      return `
        <article class="attraction-card">
          <div class="attraction-heading">
            <span class="attraction-number">${String(index + 1).padStart(2, "0")}</span>
            <div>
              <h4>${escapeAttribute(item.title)}</h4>
              <p class="attraction-summary">${escapeAttribute(item.summary || item.text)}</p>
            </div>
          </div>

          <dl class="attraction-facts">
            <div>
              <dt>Localização</dt>
              <dd>${escapeAttribute(item.location || "Consulte a fonte oficial")}</dd>
            </div>
            <div>
              <dt>Ingresso</dt>
              <dd>${escapeAttribute(item.admission || "Consulte a fonte oficial")}</dd>
            </div>
            <div>
              <dt>Funcionamento</dt>
              <dd>${escapeAttribute(item.hours || "Consulte a fonte oficial")}</dd>
            </div>
            <div>
              <dt>Tempo de visita</dt>
              <dd>${escapeAttribute(item.duration || "Varia conforme o roteiro")}</dd>
            </div>
          </dl>

          <div class="attraction-logistics">
            <p>
              <strong>Como chegar</strong>
              <span>${escapeAttribute(item.access || "Planeje o deslocamento a partir da base indicada no guia.")}</span>
            </p>
            <p>
              <strong>Reserva e atenção</strong>
              <span>${escapeAttribute(item.booking || "Confirme as regras vigentes antes da visita.")}</span>
            </p>
          </div>

          <footer class="attraction-foot">
            <span class="attraction-status ${noteIsReference ? "is-reference" : ""}">
              ${escapeAttribute(item.priceNote || "Confirme preço e horário antes da visita")}
            </span>
            ${
              source
                ? `<a href="${escapeAttribute(source.url)}" target="_blank" rel="noopener noreferrer">${escapeAttribute(source.label || "Conferir dados")} ↗</a>`
                : ""
            }
          </footer>
        </article>
      `;
    })
    .join("");

  const tips = destination.tips.map((tip) => `<li>${tip}</li>`).join("");
  const gallery = destination.images
    .map(
      (image, index) => `
        <figure class="media" data-label="${escapeAttribute(destination.name)}">
          <button
            type="button"
            class="gallery-zoom"
            data-open-image="${index}"
            aria-label="Ampliar ${escapeAttribute(image.caption || image.alt)}"
          >
            ${imageMarkup(image)}
            <span class="gallery-zoom-badge" aria-hidden="true">⛶</span>
          </button>
          <figcaption>
            <span>${String(index + 1).padStart(2, "0")} / ${String(
              destination.images.length,
            ).padStart(2, "0")}</span>
            <span>${escapeAttribute(image.caption || image.alt)}</span>
            <small>Foto: ${escapeAttribute(image.credit)} · ${escapeAttribute(
              image.license,
            )}</small>
          </figcaption>
        </figure>
      `,
    )
    .join("");

  const mapUrl = `https://www.openstreetmap.org/?mlat=${destination.coords[0]}&mlon=${destination.coords[1]}#map=9/${destination.coords[0]}/${destination.coords[1]}`;

  dialogContent.innerHTML = `
    <section class="dialog-hero media" data-label="${escapeAttribute(destination.name)}">
      ${imageMarkup(destination.images[0], { eager: true })}
      <div class="dialog-hero-copy">
        <p class="kicker">${String(destination.order).padStart(2, "0")} · ${destination.province}</p>
        <h2 id="dialog-title">${destination.name} <span aria-hidden="true">${destination.chinese}</span></h2>
        <p>${destination.short}</p>
      </div>
    </section>
    <div class="dialog-main">
      <dl class="dialog-facts">
        <div><dt>Duração</dt><dd>${destination.days}</dd></div>
        <div><dt>Melhor época</dt><dd>${destination.best}</dd></div>
        <div><dt>Ritmo</dt><dd>${destination.rhythm}</dd></div>
        <div><dt>Esforço</dt><dd>${destination.effort}</dd></div>
      </dl>

      <div class="dialog-layout">
        <div>
          <section class="dialog-section">
            <p class="kicker">Por que escolher</p>
            <h3>${destination.ideal}</h3>
            <p class="dialog-intro">${destination.description}</p>
          </section>

          <section class="dialog-section">
            <p class="kicker">Planejamento atração por atração</p>
            <h3>Informações práticas dos principais pontos</h3>
            <p class="attraction-disclaimer">
              Valores por adulto em renminbi (RMB), salvo indicação diferente.
              Dados revisados em julho de 2026; itens sazonais e preços de
              referência estão identificados e devem ser reconfirmados.
            </p>
            <div class="highlight-list">${highlights}</div>
          </section>

          <section class="dialog-section">
            <p class="kicker">Galeria</p>
            <h3>${destination.images.length} perspectivas do destino</h3>
            <p class="gallery-instruction">
              Toque em uma foto para ampliar e navegar pela galeria em resolução original.
            </p>
            <div class="dialog-gallery">${gallery}</div>
          </section>
        </div>

        <aside class="dialog-sidebar">
          <section class="dialog-section">
            <p class="kicker">Dicas importantes</p>
            <h3>Antes de reservar</h3>
            <ul class="tips-list">${tips}</ul>
          </section>

          <section class="dialog-section">
            <p class="kicker">Aperte o play</p>
            <div class="video-card" data-video-card>
              <button class="video-placeholder" type="button" data-load-video="${destination.video.id}" aria-label="Reproduzir vídeo sobre ${escapeAttribute(destination.name)}">
                <img src="https://i.ytimg.com/vi/${destination.video.id}/hqdefault.jpg" alt="" loading="lazy" referrerpolicy="no-referrer" />
                <span class="play-button" aria-hidden="true">▶</span>
              </button>
              <div class="video-copy">
                <h4>${destination.video.title}</h4>
                <p>Player com privacidade aprimorada. <a href="${destination.video.url}" target="_blank" rel="noopener noreferrer">Abrir no YouTube ↗</a></p>
              </div>
            </div>
          </section>

          <div class="dialog-cta-row">
            <button
              type="button"
              data-dialog-compare
              class="${state.compare.includes(destination.id) ? "is-selected" : ""}"
            >${state.compare.includes(destination.id) ? "✓ Na comparação" : "+ Adicionar à comparação"}</button>
            <a href="${mapUrl}" target="_blank" rel="noopener noreferrer">Abrir no mapa ↗</a>
          </div>
        </aside>
      </div>
    </div>
  `;

  attachImageFallbacks(dialogContent);
  updateDialogActions();
  if (!dialog.open) dialog.showModal();
  document.body.classList.add("dialog-open");
  dialog.scrollTop = 0;

  if (updateHash && location.hash !== `#destino-${id}`) {
    history.pushState({ destination: id }, "", `#destino-${id}`);
  }
}

function updateLightbox() {
  const destination = destinationById(state.current);
  if (!destination) return;

  const image = destination.images[state.lightboxIndex];
  if (!image) return;

  const source = originalImageSource(image);
  const number = String(state.lightboxIndex + 1).padStart(2, "0");
  const total = String(destination.images.length).padStart(2, "0");

  lightboxCounter.textContent = `${number} / ${total} · ${destination.name}`;
  lightboxCaption.textContent = image.caption || image.alt;
  lightboxCredit.textContent = `Foto: ${image.credit} · ${image.license}`;
  lightboxResolution.textContent = "";
  lightboxOriginal.href = source;
  lightboxOriginal.setAttribute(
    "aria-label",
    `Abrir o arquivo original de ${image.caption || destination.name}`,
  );

  lightboxMedia.dataset.label = destination.name;
  lightboxMedia.classList.remove("is-fallback");
  lightboxMedia.classList.add("is-loading");
  lightboxLoading.hidden = false;
  lightboxLoading.textContent = "Carregando foto original…";
  lightboxImage.hidden = false;
  lightboxImage.alt = image.alt;
  lightboxImage.referrerPolicy = "no-referrer";
  lightboxImage.dataset.source = source;

  lightboxImage.onload = () => {
    if (lightboxImage.dataset.source !== source) return;
    lightboxMedia.classList.remove("is-loading");
    lightboxLoading.hidden = true;
    lightboxResolution.textContent = `${lightboxImage.naturalWidth.toLocaleString(
      "pt-BR",
    )} × ${lightboxImage.naturalHeight.toLocaleString("pt-BR")} px · arquivo original`;
  };

  lightboxImage.onerror = () => {
    if (lightboxImage.dataset.source !== source) return;
    lightboxMedia.classList.remove("is-loading");
    lightboxMedia.classList.add("is-fallback");
    lightboxImage.hidden = true;
    lightboxLoading.hidden = false;
    lightboxLoading.textContent =
      "Não foi possível carregar a foto. Use o link do arquivo original.";
  };

  lightboxImage.src = source;
  if (lightboxImage.complete && lightboxImage.naturalWidth > 0) {
    lightboxImage.onload();
  }
}

function openLightbox(index) {
  const destination = destinationById(state.current);
  if (!destination) return;

  const requestedIndex = Number(index);
  state.lightboxIndex = Number.isInteger(requestedIndex)
    ? Math.min(Math.max(requestedIndex, 0), destination.images.length - 1)
    : 0;

  updateLightbox();
  if (!lightbox.open) lightbox.showModal();
  document.body.classList.add("lightbox-open");
}

function showAdjacentImage(step) {
  const destination = destinationById(state.current);
  if (!destination) return;

  state.lightboxIndex =
    (state.lightboxIndex + step + destination.images.length) %
    destination.images.length;
  updateLightbox();
}

function closeLightbox() {
  if (lightbox.open) lightbox.close();
  document.body.classList.remove("lightbox-open");
}

function closeDestination(updateHash = true) {
  if (lightbox.open) closeLightbox();
  if (dialog.open) dialog.close();
  document.body.classList.remove("dialog-open");
  state.current = null;
  if (updateHash && location.hash.startsWith("#destino-")) {
    history.pushState({}, "", `${location.pathname}${location.search}`);
  }
}

function updateDialogActions() {
  if (!state.current) return;
  const saved = state.saved.includes(state.current);
  const compared = state.compare.includes(state.current);
  const saveButton = document.querySelector("[data-dialog-save]");
  const compareButton = dialogContent.querySelector("[data-dialog-compare]");

  if (saveButton) {
    saveButton.classList.toggle("is-saved", saved);
    saveButton.textContent = saved ? "♥" : "♡";
    saveButton.setAttribute("aria-label", saved ? "Remover destino dos favoritos" : "Salvar destino");
  }

  if (compareButton) {
    compareButton.classList.toggle("is-selected", compared);
    compareButton.textContent = compared ? "✓ Na comparação" : "+ Adicionar à comparação";
    compareButton.disabled = !compared && state.compare.length >= 3;
  }
}

function loadVideo(id, button) {
  const iframe = document.createElement("iframe");
  iframe.className = "video-frame";
  iframe.title = "Vídeo do destino";
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = "strict-origin-when-cross-origin";
  button.replaceWith(iframe);
}

async function shareDestination() {
  const destination = destinationById(state.current);
  if (!destination) return;
  const url = `${location.origin}${location.pathname}#destino-${destination.id}`;
  const shareData = {
    title: `${destination.name} — Rota China`,
    text: `Veja por que ${destination.name} pode ser o próximo destino na China.`,
    url,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(url);
      showToast("Link copiado.");
    }
  } catch (error) {
    if (error.name !== "AbortError") showToast("Não foi possível compartilhar agora.");
  }
}

function renderSources() {
  const sources = destinations
    .flatMap((destination) => {
      const attractionSources = destination.highlights.flatMap(
        (highlight) => highlight.sources || [],
      );

      return [...destination.sources, ...attractionSources].map((source) => ({
        ...source,
        destination: destination.name,
      }));
    })
    .filter(
      (source, index, array) =>
        array.findIndex((candidate) => candidate.url === source.url) === index,
    );

  document.querySelector("[data-source-list]").innerHTML = sources
    .map(
      (source) =>
        `<a href="${escapeAttribute(source.url)}" target="_blank" rel="noopener noreferrer"><strong>${escapeAttribute(source.destination)}</strong> — ${escapeAttribute(source.label)} ↗</a>`,
    )
    .join("");

  document.querySelector("[data-credit-list]").innerHTML = destinations
    .flatMap((destination) =>
      destination.images.map(
        (image) =>
          `<a href="${image.page}" target="_blank" rel="noopener noreferrer"><strong>${destination.name}</strong> — ${image.credit}<small>${image.license} · Wikimedia Commons ↗</small></a>`,
      ),
    )
    .join("");
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function toggleSavedView() {
  if (!state.savedOnly && !state.saved.length) {
    showToast("Você ainda não salvou nenhum destino.");
  }
  state.savedOnly = !state.savedOnly;
  updateSavedButtons();
  renderDestinations();
  document.querySelector("#destinos").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) return;

  if (target.matches("[data-open-destination]")) {
    event.preventDefault();
    openDestination(target.dataset.openDestination);
  } else if (target.matches("[data-compare-destination]")) {
    toggleCompare(target.dataset.compareDestination);
  } else if (target.matches("[data-save-destination]")) {
    toggleSaved(target.dataset.saveDestination);
  } else if (target.matches("[data-vibe]")) {
    selectVibe(target.dataset.vibe);
  } else if (target.matches("[data-filter]")) {
    state.filter = target.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((button) => {
      button.classList.toggle("is-active", button === target);
    });
    renderDestinations();
  } else if (target.matches("[data-show-saved]")) {
    toggleSavedView();
  } else if (target.matches("[data-open-image]")) {
    openLightbox(target.dataset.openImage);
  } else if (target.matches("[data-lightbox-close]")) {
    closeLightbox();
  } else if (target.matches("[data-lightbox-prev]")) {
    showAdjacentImage(-1);
  } else if (target.matches("[data-lightbox-next]")) {
    showAdjacentImage(1);
  } else if (target.matches("[data-dialog-close]")) {
    closeDestination();
  } else if (target.matches("[data-dialog-save]")) {
    toggleSaved(state.current);
  } else if (target.matches("[data-dialog-share]")) {
    shareDestination();
  } else if (target.matches("[data-dialog-compare]")) {
    toggleCompare(state.current);
  } else if (target.matches("[data-load-video]")) {
    loadVideo(target.dataset.loadVideo, target);
  }
});

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDestination();
});

dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

lightbox.addEventListener("close", () => {
  document.body.classList.remove("lightbox-open");
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.open) return;

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    showAdjacentImage(-1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    showAdjacentImage(1);
  } else if (event.key === "Escape") {
    event.preventDefault();
    closeLightbox();
  }
});

lightboxMedia.addEventListener(
  "touchstart",
  (event) => {
    if (event.touches.length !== 1) return;
    lightboxTouchStart = {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  },
  { passive: true },
);

lightboxMedia.addEventListener(
  "touchend",
  (event) => {
    if (!lightboxTouchStart || !event.changedTouches.length) return;

    const deltaX = event.changedTouches[0].clientX - lightboxTouchStart.x;
    const deltaY = event.changedTouches[0].clientY - lightboxTouchStart.y;
    lightboxTouchStart = null;

    if (Math.abs(deltaX) < 50 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
    showAdjacentImage(deltaX < 0 ? 1 : -1);
  },
  { passive: true },
);

window.addEventListener("popstate", () => {
  const match = location.hash.match(/^#destino-([a-z0-9-]+)$/);
  if (match) openDestination(match[1], false);
  else if (dialog.open) closeDestination(false);
});

renderDestinations();
renderCompare();
renderSources();
setHeroImages();
updateSavedButtons();

const initialDestination = location.hash.match(/^#destino-([a-z0-9-]+)$/);
if (initialDestination) openDestination(initialDestination[1], false);

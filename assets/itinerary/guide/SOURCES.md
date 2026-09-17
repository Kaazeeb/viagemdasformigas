# Recursos de orientação do roteiro final de Pequim

Seleção preparada em 17/09/2026 a partir do acervo revisado em `apoio/recursos-visuais-pequim-2026-09-16/`.

São 49 recursos únicos: 14 plantas/diagramas/cartões e 35 fotografias. As variantes locais somam 16.53 MiB; entram conforme a etapa, com mapas detalhados abertos sob demanda.

## Como foram preparados

- `maps/`: PNGs/JPEGs detalhados idênticos aos arquivos aprovados, mais previews WebP leves. Fontes chinesas já estão renderizadas nos pixels; nenhum SVG é necessário no celular.
- `photos/`: arquivos WebP integrais, sem corte, setas, remoções ou retoques. Fotos maiores foram limitadas a 1600 px para entrega; os downloads integrais permanecem no acervo de apoio e suas URLs estão no manifesto.
- `selection.json`: escolha editorial, legendas de orientação e associação às etapas.
- `manifest.json`: arquivos, dimensões, hashes de entrada/saída, autoria quando disponível, fontes online, categoria de origem, alterações anteriores, limites e resultados de revisão. Metadados de ancestrais explicam as versões; imagens pendentes/reprovadas não são copiadas.
- `prepare.py`: reprodução da seleção e codificação técnica com Pillow/WebP, sem rede. Exemplo: `python3 assets/itinerary/guide/prepare.py --collection /caminho/para/apoio/recursos-visuais-pequim-2026-09-16`.
- `beijing-final-visuals.js`, na raiz: contrato consumido pela página. Não altera o roteiro-base; mapas oficiais anteriores podem continuar acessíveis como referências separadas.

## Escolhas e limites

Somente recursos aprovados foram selecionados. Aprovação indica utilidade visual para o uso declarado; não certifica operação de saídas, acessibilidade, portões, controles, obras ou equipamentos no dia da visita.

A planta com retas editoriais de Jingshan é suprimida (`referenceMap:false`). O Lama recebe uma planta bilíngue de referência em lugar da imagem original de apenas 328 px. A foto ambígua atribuída a Qianmen foi substituída pelo pailou identificado; Qianmen e Dashilar têm legendas explícitas de perspectiva. Equipamentos de Mutianyu são comparados sem equiparar controle sul das trilhas à entrada da cadeirinha.

As plantas de referência e as composições próprias permanecem distintas. Números, símbolos, ruas esquemáticas e sequência de visita não representam uma trilha contínua comprovada. A2/F/E3 e Taihemen exigem conferência da sinalização/operador; nenhum desvio foi inventado.

## Fontes e proveniência de cada recurso

| Recurso | Origem e fonte | Arquivo detalhado |
|---|---|---|
| `templo-do-ceu-v2` | Edição/composição · [www.tiantanpark.cn](https://www.tiantanpark.cn/navigation_map.html) | [Abrir](maps/templo-do-ceu-v2.png) |
| `ext24-lama-eixo-saloes-v2` | Criação própria · [www.yonghegong.cn](https://www.yonghegong.cn/2016-12/26/content_39984666.htm) | [Abrir](maps/ext24-lama-eixo-saloes-v2.png) |
| `ext24-lama-guozijian-bairro-v2` | Criação própria · [www.yonghegong.cn](https://www.yonghegong.cn/2016-12/26/content_39984666.htm) | [Abrir](maps/ext24-lama-guozijian-bairro-v2.png) |
| `ext24-wangfujing-marcos-v2` | Criação própria · [ditu.amap.com](https://ditu.amap.com/place/B000A842O2) | [Abrir](maps/ext24-wangfujing-marcos-v2.png) |
| `ext25-cidade-proibida-eixo-v1` | Edição/composição · [www.dpm.org.cn](https://www.dpm.org.cn/Visit.html) | [Abrir](maps/ext25-cidade-proibida-eixo-v1.png) |
| `ext25-jingshan-referencias-v1` | Edição/composição · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Jingshanmap.jpg) | [Abrir](maps/ext25-jingshan-referencias-v1.png) |
| `ext25-qianmen-dashilar-trecho-v1` | Criação própria · [xinwen.bjd.com.cn](https://xinwen.bjd.com.cn/content/s676678dde4b000299badaf9c.html) | [Abrir](maps/ext25-qianmen-dashilar-trecho-v1.png) |
| `ext2627-verao-setor-leste-anotado-v2-png` | Edição/composição · [summerpalace.net.cn](https://summerpalace.net.cn/guide_map.html?_isa=1) | [Abrir](maps/ext2627-verao-setor-leste-anotado-v2-png.png) |
| `ext2627-shichahai-posicoes-relativas-v1-png` | Criação própria · [www.zhangjiajieholiday.com](https://www.zhangjiajieholiday.com/City_Tours/Beijing-Guide/701.html) | [Abrir](maps/ext2627-shichahai-posicoes-relativas-v1-png.png) |
| `ext2627-mutianyu-equipamentos-fotograficos-v1-png` | Criação própria · [en.mutianyugreatwall.com](https://en.mutianyugreatwall.com/article/4DlCYuBZ75h) | [Abrir](maps/ext2627-mutianyu-equipamentos-fotograficos-v1-png.png) |
| `extlog-metro-dia24-linhas5-1` | Criação própria · [www.bjsubway.com](https://www.bjsubway.com/station/xltcx/?id=1) | [Abrir](maps/extlog-metro-dia24-linhas5-1.png) |
| `extlog-hotel-xingyi-cartao-endereco` | Criação própria · [tw.trip.com](https://tw.trip.com/hotels/beijing-hotel-detail-90808539/ni-hao-jiu-dian/photo.html) | [Abrir](maps/extlog-hotel-xingyi-cartao-endereco.png) |
| `extlog-pek-t2-fluxo-embarque` | Criação própria · Dados do roteiro informados pelo grupo; confirmar voo e terminal | [Abrir](maps/extlog-pek-t2-fluxo-embarque.png) |
| `dia24-lama-planta-bilingue` | Original online · [www.eastchinatrip.com](https://www.eastchinatrip.com/lama-temple-beijing-guide/) | [Abrir](maps/dia24-lama-planta-bilingue.jpg) |
| `extlog-xingyi-fachada` | Original online · [tw.trip.com](https://tw.trip.com/hotels/beijing-hotel-detail-90808539/ni-hao-jiu-dian/photo.html) | [Abrir](photos/extlog-xingyi-fachada.webp) |
| `ext24-ceu-sul-acesso-2024` | Original online · [news.bjd.com.cn](https://news.bjd.com.cn/2024/04/26/10757698.shtml) | [Abrir](photos/ext24-ceu-sul-acesso-2024.webp) |
| `ext24-ceu-danbi-norte` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:VM_Temple_of_Heaven_-_Danbi_Bridge_4581.jpg) | [Abrir](photos/ext24-ceu-danbi-norte.webp) |
| `extlog-tiantandongmen-a2` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Exit_A2,_Tiantandongmen_Station,_Beijing_Subway.jpg) | [Abrir](photos/extlog-tiantandongmen-a2.webp) |
| `ext24-lama-saida-f` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Exit_F%2C_Yonghegong_Lama_Temple_Station%2C_Beijing_Subway.jpg) | [Abrir](photos/ext24-lama-saida-f.webp) |
| `ext24-lama-zhaotai-turismo` | Original online · [english.visitbeijing.com.cn](https://english.visitbeijing.com.cn/article/4AKpNSjuGAG) | [Abrir](photos/ext24-lama-zhaotai-turismo.webp) |
| `ext24-lama-wanfuge` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Wanfuge_Pavillion_in_Yonghe_Temple.jpg) | [Abrir](photos/ext24-lama-wanfuge.webp) |
| `24-guozijian-foto-02` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Guozijian_Street_East_Entrance.jpg) | [Abrir](photos/24-guozijian-foto-02.webp) |
| `dia24-wangfujing-e3` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Exit_E3_of_Wangfujing_Station_(20220105183233).jpg) | [Abrir](photos/dia24-wangfujing-e3.webp) |
| `dia24-wangfujing-apm` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Beijing_apm_(20211226162707).jpg) | [Abrir](photos/dia24-wangfujing-apm.webp) |
| `dia24-wangfujing-dongtang` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:St_Joseph_(east_cathedral)_Wangfujing_IMG_4974.jpg) | [Abrir](photos/dia24-wangfujing-dongtang.webp) |
| `ext25-donghuamen-exterior-tcg` | Original online · [www.travelchinaguide.com](https://www.travelchinaguide.com/attraction/beijing/forbidden-city/east-prosperity-gate.htm) | [Abrir](photos/ext25-donghuamen-exterior-tcg.webp) |
| `25-palace-foto-04-meridian-gate` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Gfp-beijing-entrance-into-the-forbidden-city.jpg) | [Abrir](photos/25-palace-foto-04-meridian-gate.webp) |
| `dia25-shenwumen-fachada` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Forbidden_City_Beijing_Shenwumen_Gate.JPG) | [Abrir](photos/dia25-shenwumen-fachada.webp) |
| `dia25-jingshan-portao-sul` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Jingshan_Park_from_north_gate_of_Forbidden_City.jpg) | [Abrir](photos/dia25-jingshan-portao-sul.webp) |
| `ext25-jingshan-wanchun-peggy` | Original online · [www.peggysphotos.com](https://www.peggysphotos.com/day-6-beijing-bei-hai-and-jingshan-parks/) | [Abrir](photos/ext25-jingshan-wanchun-peggy.webp) |
| `25-jingshan-foto-curated-01` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki?curid=152097014) | [Abrir](photos/25-jingshan-foto-curated-01.webp) |
| `ext25-tiananmen-monumento-tcg` | Original online · [www.travelchinaguide.com](https://www.travelchinaguide.com/attraction/beijing/tianan.htm) | [Abrir](photos/ext25-tiananmen-monumento-tcg.webp) |
| `dia25-qianmen-pailou` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Gate_of_Qianmen_Street_and_watchtower_of_Zhengyangmen_Gate.JPG) | [Abrir](photos/dia25-qianmen-pailou.webp) |
| `dia25-dashilar-entroncamento` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Gate_of_Dazhalan_Area_on_Qianmen_Street_2.JPG) | [Abrir](photos/dia25-dashilar-entroncamento.webp) |
| `ext25-meishi-ponto-onibus` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Meishijie_Nankou_Bus_Stop_(20210409132657).jpg) | [Abrir](photos/ext25-meishi-ponto-onibus.webp) |
| `ext2627-mutianyu-bilheteria` | Original online · [blog.ipacktravel.com](https://blog.ipacktravel.com/wp/beijing-see-mutianyu-great-wall/) | [Abrir](photos/ext2627-mutianyu-bilheteria.webp) |
| `ext2627-mutianyu-shuttle` | Original online · [blog.ipacktravel.com](https://blog.ipacktravel.com/wp/beijing-see-mutianyu-great-wall/) | [Abrir](photos/ext2627-mutianyu-shuttle.webp) |
| `26-wall-foto-curated-01` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki?curid=77292348) | [Abrir](photos/26-wall-foto-curated-01.webp) |
| `ext2627-verao-portao-leste` | Original online · [www.travelchinaguide.com](https://www.travelchinaguide.com/attraction/beijing/summer/east_gate.htm) | [Abrir](photos/ext2627-verao-portao-leste.webp) |
| `ext2627-verao-renshoudian` | Original online · [www.travelchinaguide.com](https://www.travelchinaguide.com/attraction/beijing/summer/renshou.htm) | [Abrir](photos/ext2627-verao-renshoudian.webp) |
| `ext2627-verao-paiyunmen` | Original online · [www.travelchinaguide.com](https://www.travelchinaguide.com/attraction/beijing/summer/cloud.htm) | [Abrir](photos/ext2627-verao-paiyunmen.webp) |
| `ext2627-sino-fachada-praca` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Beijingbelltower1.jpg) | [Abrir](photos/ext2627-sino-fachada-praca.webp) |
| `ext2627-tambor-fachada-sul` | Original online · [imaginoso.com](https://imaginoso.com/china/beijing/beijing-drum-tower-south-elevation) | [Abrir](photos/ext2627-tambor-fachada-sul.webp) |
| `27-yandai-foto-05` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:%E7%83%9F%E8%A2%8B%E6%96%9C%E8%A1%97.jpg) | [Abrir](photos/27-yandai-foto-05.webp) |
| `ext2627-yinding-ponte` | Original online · [www.tour-beijing.com](https://www.tour-beijing.com/hutong/highlight_one_day_tour.php) | [Abrir](photos/ext2627-yinding-ponte.webp) |
| `ext2627-yaer-placa` | Original online · [www.visitbeijing.com.cn](https://www.visitbeijing.com.cn/article/49WipgMQb47) | [Abrir](photos/ext2627-yaer-placa.webp) |
| `ext2627-qianhai-margem-nordeste` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Qianhai_Lake_near_Yindingqiao_Bridge_20160822-2.jpg) | [Abrir](photos/ext2627-qianhai-margem-nordeste.webp) |
| `ext2627-shichahai-a2-placa` | Original online · [touch.travel.qunar.com](https://touch.travel.qunar.com/comment/10162682216) | [Abrir](photos/ext2627-shichahai-a2-placa.webp) |
| `extlog-pek-t2-espera-2026` | Original online · [commons.wikimedia.org](https://commons.wikimedia.org/wiki/File:Beijing_Capital_International_Airport_T2_Waiting_20260904.jpg) | [Abrir](photos/extlog-pek-t2-espera-2026.webp) |

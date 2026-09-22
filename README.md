# Rota China

Guia visual e comparativo, em português, para escolher entre oito destinos na
China — com uma página especial e completa para planejar uma viagem a Pequim.

O site é mobile-first, não exige instalação nem processo de build e está pronto
para ser publicado no GitHub Pages.

## Publicar no GitHub Pages

1. Descompacte o ZIP.
2. Crie um repositório no GitHub.
3. Envie **o conteúdo desta pasta** para a raiz do repositório.
4. No GitHub, abra **Settings → Pages**.
5. Em **Build and deployment**, escolha **Deploy from a branch**.
6. Selecione a branch `main`, a pasta `/ (root)` e clique em **Save**.

O endereço costuma ficar disponível em alguns minutos.

Se preferir usar Git no terminal:

```bash
git init
git add .
git commit -m "Publica o guia Rota China"
git branch -M main
git remote add origin URL_DO_SEU_REPOSITORIO
git push -u origin main
```

## Visualizar no computador

Para carregar também os arquivos de dados da página de Pequim, rode um servidor
local na pasta:

```bash
python3 -m http.server 8080
```

Depois, acesse `http://localhost:8080`.

## Roteiro final de Pequim

A aba **Roteiro final**, em `beijing-final.html`, é o guia de execução de
24 a 27 de setembro de 2026. A página `beijing.html` continua sendo a área
separada de exploração; seu cronograma antigo está identificado como referência.

O guia final reúne 50 etapas, tempos de caminhada e transporte separados,
estações e acessos, portões, nove plantas e mapas turísticos reais e fotos locais
com créditos. Os mapas podem ser ampliados; suas legendas relacionam portões,
caminhos e edifícios ao roteiro. As fontes estão em
`assets/itinerary/maps/SOURCES.md`.
Inclui seleção por dia, cópia dos nomes chineses, marcação de etapas no navegador
e impressão dos quatro dias. As refeições continuam a definir.

O conteúdo fica em `beijing-final-data.js`. Após editá-lo, execute
`node scripts/render-beijing-final.cjs` para atualizar também o HTML estático,
que permite ler todo o roteiro mesmo sem JavaScript. Não há dependências de
build ou serviços externos para renderizar essa página; o servidor deve servir
também os arquivos locais de fotos, CSS, JS e `assets/itinerary/maps/`.

Fontes operacionais conferidas em 16/09/2026. Os horários são estimativas;
reservas e equipamentos ainda pendentes aparecem explicitamente nas etapas.

## Restaurantes

A aba **Restaurantes**, em `restaurantes/index.html`, reúne 99 restaurantes
distintos em dez grupos geográficos. A revisão retirou sete redes de fast-food
ou similares (Pizza Hut, KFC, McDonald's, Big Pizza, Saizeriya e Yoshinoya),
preservou as outras 90 fichas e adicionou nove restaurantes.

O filtro **Internacionais** tem 16 opções, incluindo os novos Raj e Dastaan
(indianos), Alameen (árabe), Traktir e Moscow (russos). A referência continua
¥200 por pessoa; exceções moderadas podem chegar a ¥250 de média observada e
recebem aviso. O Moscow, média ¥225, exige atenção especial a taxas de serviço
e menus de banquete muito acima do orçamento. Média não é teto garantido da conta.

O filtro **Yunnan** inclui Little Yunnan, Hani Gejiu e In & Out, além da Yun'er
já cadastrada. Jinyang Baiguang acrescenta cozinha de Shanxi. A seleção não força
restaurantes internacionais em cada região: lugares fora dos passeios ficam em
**Outras regiões · Vale o desvio**, com endereço e deslocamento explícitos.
Beiping Garden Beijing Fang continua compartilhado por Dashilar/Qianmen,
sem duplicar ficha ou escolhas. Dados e fotos das opções retiradas ficam em apoio
e no histórico Git; exclusão por preferência não significa restaurante fechado.
A seleção é por região, não por dia. Desvios para ruas adjacentes são indicados
nas fichas; proximidade regional não significa estar na porta da atração ou do hotel.
O almoço de 24/09/2026 continua ligado à seção de Guozijian, sem restaurante definido.

As fichas consideram três adultos e crianças de quatro anos e dezoito meses,
com sugestões de pratos e ressalvas sobre pimenta, ingredientes e orçamento.
Pratos, preços e fotos observados, menus transcritos, ofertas e avaliações
traduzidas ficam disponíveis offline. Cobertura e lacunas aparecem na própria
ficha: menus não são necessariamente atuais/completos, parte dos nomes permanece
em chinês e apenas quatro ofertas tiveram regras detalhadas recuperadas.
Os demais pacotes mantêm as prévias e avisos de validade não confirmada.

Revisão de 22/09: bloco de 20 restaurantes, com 287 preços digitais adicionais
(690 → 977 pratos com preço entre os 1.185 registros do bloco; 208 ainda sem).
As outras 79 fichas não foram alteradas. Foram consultadas até três páginas de
19 catálogos; a rota de XiaoDadong retornou 404. Nenhum catálogo completo anterior
foi substituído por essa amostra. Dezesseis pratos têm referências adicionais de
cardápios fotografados; quando não há preço digital, a ficha mostra a referência
com porção e ressalva de vigência, sem incluí-la no filtro de preços digitais.
As 56 ofertas do bloco foram revisadas: 18 são vales-consumo, não combos; 18
ofertas receberam 25 menções explícitas de pratos separadas da composição completa.
Seis títulos foram traduzidos. A sonda de detalhes retornou 403: nenhuma composição
completa nova nem validade de pacote foi confirmada. Os quatro detalhes anteriores
permanecem preservados. A revisão parou após estas 20 filiais.

Na primeira ampliação de 21/09, as 25 fichas foram capturadas, mas a paginação de pratos
recebeu HTTP 403 e foi interrompida. Há três novos catálogos completos e dois
parciais; nas outras vinte fichas permanecem as prévias e os menus fotografados.
O aviso de cobertura distingue catálogo não consultado de ausência de pratos.

Na rodada western, foram acrescentados 240 registros de prévias de pratos,
31 imagens de menus inspecionadas, 31 ocorrências de ofertas e 30 prévias de
avaliações traduzidas. A API voltou a responder HTTP403 na paginação da Barblu
e no detalhe de um pacote da Pebbles; os recursos foram interrompidos. Dez preços
da primeira página válida da Barblu complementam as prévias, sem reduzir seus
20 registros. Os demais catálogos novos não foram paginados. Nem todos os locais
expuseram avaliações ou menus, e a validade dos novos pacotes continua não confirmada.

As nove fichas da revisão internacional/regional tiveram captura direta, com
pratos sugeridos, fotos, ofertas expostas, avaliações e menus disponíveis. Seus
catálogos completos e regras de pacotes foram adiados por causa dos bloqueios
anteriores desses recursos. O aviso diferencia adiamento de bloqueio individual:
não foi atribuída uma resposta 403 a uma filial não consultada.

Busca por prato, filtros de preço/foto e ordenação usam todo o catálogo coletado
da filial. Apenas 60 cartões são montados por vez; “Mostrar mais” continua a lista.
Escolhas pessoais são separadas por restaurante e a exportação inclui todas as regiões.

O carregamento é sob demanda: `dados/restaurantes.js` contém somente o índice
de comparação/busca (cerca de 1,16 MB, antes 44,72 MB de dados integrais).
Pratos, menus, avaliações e demais informações ficam em 99 arquivos individuais
em `dados/fichas/`, carregados apenas ao clicar no nome do restaurante e
reutilizados na mesma sessão. A mediana por ficha é cerca de 241 KB; o maior
catálogo ocupa 3,41 MB. Nenhum conteúdo foi removido. Busca por prato, filtros,
contagens e escolhas não precisam baixar os catálogos. Falhas permitem nova
tentativa, sem trocar a ficha quando uma resposta antiga chega atrasada.
Para abrir offline no Windows, copie a pasta completa, incluindo `dados/fichas/`
e `imagens/`; não é necessário servidor. Visitar o site online, por si só, não
baixa todos os arquivos para uso offline posterior.

A página é independente, sem iframe nem bibliotecas novas. Não carrega o catálogo
ao visitar as outras abas. Escolhas anteriores do piloto podem ser importadas
por JSON; o armazenamento de `file://` não é transferido automaticamente ao site.
O site contém somente a interface, os dados publicados e as imagens utilizadas.
Coletores, scripts de atualização, testes e evidências ficam fora do repositório,
em `apoio/restaurantes-pequim/`; as instruções de manutenção estão no README dessa
pasta auxiliar. HTML, CSS e JS da interface são mantidos apenas neste repositório.

## Provar em Pequim

A aba `comidas/index.html` tem 30 itens: 17 comidas, oito doces e cinco bebidas sem álcool,
com uma foto real por item, nome em chinês, pinyin, referências de onde procurar
e notas sobre ingredientes/pimenta. Inclui pato de Pequim, churrasco na chapa,
bolinhos de carne de Niujie, lurou huoshao, niurou li, doufunao, chao geda,
zha guanchang e jiaoquan. Dalian huoshao e tanghuoshao foram mantidos sem duplicar.
Chuanr, jiaozi, baozi, macarrão em caldo bovino, tanghulu e cerveja foram retirados
conforme a preferência da família; os outros 24 IDs e conteúdos foram preservados.
Especialidades de outras regiões populares
em Pequim são identificadas, sem apresentá-las como originárias da cidade.

O checklist registra o que já foi provado, com busca, filtros e progresso.
As marcações ficam neste navegador; exportação/importação JSON permite guardar
backup ou trocar de aparelho. Funciona por `file://`, sem servidor, internet ou
dependência do catálogo de restaurantes. Links de fontes precisam de internet.
As 30 fotos somam cerca de 333 KB; são referências visuais dos pratos, não garantia
de apresentação em qualquer restaurante. Proveniência, pesquisa e testes ficam
em `apoio/comidas-pequim/`, fora do repositório do site.

## O que está incluído

- Layout responsivo, com prioridade para celulares.
- Oito guias completos e filtros por estilo de viagem.
- Página dedicada a Pequim com 18 atrações, nove ruas e mercados prioritários,
  roteiro de quatro dias, mapa
  interativo, mapa do metrô, mapa dos 16 distritos, sete estações ferroviárias,
  dois aeroportos, dicas e oito hotéis para conferência no Trip.com.
- Painel retrátil com 306 estações de metrô em 15 linhas relevantes ao roteiro,
  seleção persistente por estação ou linha e traçados sobre o mapa interativo.
- Trinta e duas fichas práticas de atrações, com localização, acesso, preço de
  entrada, horário, duração sugerida e orientação de reserva.
- Dezoito guias “Em profundidade” para os três principais pontos de Xi’an,
  Chengdu, Guilin/Yangshuo, Zhangjiajie, Lijiang e Huangshan, com contexto,
  experiência, roteiro e notas editoriais.
- Favoritos salvos no navegador.
- Duzentas e setenta e uma fotografias selecionadas via Wikimedia Commons,
  incluindo 189 imagens na página de Pequim: exatamente nove para cada uma das
  18 atrações e três para cada uma das nove ruas prioritárias.
- Galeria ampliável em tela cheia, com versões locais otimizadas, setas, teclado
  e gesto lateral no celular; os créditos levam aos arquivos originais.
- Oito vídeos incorporados com o modo de privacidade aprimorada do YouTube.
- Créditos de imagens e fontes editoriais visíveis no próprio site.
- Fallback visual para imagens e link direto caso um vídeo não possa ser
  reproduzido no embed.

## Estrutura

```text
.
├── index.html
├── styles.css
├── deep-dives.js
├── script.js
├── beijing.html
├── beijing.css
├── beijing.js
├── beijing-data.js
├── beijing-attractions.json
├── beijing-streets.json
├── beijing-logistics.json
├── beijing-metro.json
├── beijing-media.json
├── CREDITS.md
├── LICENSE
└── .nojekyll
```

## Observação sobre mídia

As fotografias, os mapas e os vídeos são carregados de seus provedores originais.
Isso evita incorporar arquivos binários ao repositório e mantém compatibilidade com
plataformas de automação, mas requer conexão com a internet. As licenças e os
links de atribuição das fotografias estão em `CREDITS.md` e na seção “Fontes e
créditos” do site. As miniaturas usam tamanhos responsivos; ao ampliar, o site carrega uma versão de até
1920 px adequada para tela. O arquivo original continua disponível pelo link de crédito.

## Personalização rápida

- Ensaios e fotos da seção “Em profundidade”: `deep-dives.js`
- Fichas práticas, destinos, demais fotos e vídeos: `script.js`
- Cores, tipografia e responsividade: `styles.css`
- Título, metadados e estrutura geral: `index.html`
- Página especial de Pequim: `beijing.html`, `beijing.css` e `beijing.js`
- Dados pesquisados de Pequim: os cinco arquivos `beijing-*.json`

Os dados práticos foram revisados em julho e agosto de 2026. Regras de entrada,
ingressos, horários e condições climáticas mudam; por isso, os valores sazonais
ou sem tabela oficial estável aparecem como referência e devem ser
reconfirmados nas fontes indicadas.

Na pesquisa de hotéis de 5 de agosto de 2026, a interface pública do Trip.com
não expôs de forma auditável o inventário de 23–27 de setembro de 2026. Por
isso, os oito hotéis são apresentados como **watchlist**, nunca como opções já
confirmadas abaixo de ¥500 com café. A própria página leva à busca com datas e
ocupação preenchidas. A estadia também coincide com o feriado nacional do
Festival do Meio-Outono em 25–27 de setembro de 2026.

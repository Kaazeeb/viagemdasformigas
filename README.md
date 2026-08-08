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

## O que está incluído

- Layout responsivo, com prioridade para celulares.
- Oito guias completos, filtros e recomendação por estilo de viagem.
- Página dedicada a Pequim com 18 atrações, roteiro de cinco dias, mapa
  interativo, mapa do metrô, mapa dos 16 distritos, sete estações ferroviárias,
  dois aeroportos, dicas e oito hotéis para conferência no Trip.com.
- Painel retrátil com 306 estações de metrô em 15 linhas relevantes ao roteiro,
  seleção persistente por estação ou linha e traçados sobre o mapa interativo.
- Trinta e duas fichas práticas de atrações, com localização, acesso, preço de
  entrada, horário, duração sugerida e orientação de reserva.
- Dezoito guias “Em profundidade” para os três principais pontos de Xi’an,
  Chengdu, Guilin/Yangshuo, Zhangjiajie, Lijiang e Huangshan, com contexto,
  experiência, roteiro e notas editoriais.
- Favoritos e comparação de até três destinos, salvos no navegador.
- Rota sugerida para uma primeira viagem.
- Duzentas e quarenta e quatro fotografias licenciadas via Wikimedia Commons,
  incluindo 162 imagens em alta resolução na página de Pequim: exatamente nove
  para cada uma das 18 atrações.
- Galeria ampliável em tela cheia, com os arquivos originais, setas, teclado e
  gesto lateral no celular.
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
- Dados pesquisados de Pequim: os três arquivos `beijing-*.json`

Os dados práticos foram revisados em julho de 2026. Regras de entrada,
ingressos, horários e condições climáticas mudam; por isso, os valores sazonais
ou sem tabela oficial estável aparecem como referência e devem ser
reconfirmados nas fontes indicadas.

Na pesquisa de hotéis de 5 de agosto de 2026, a interface pública do Trip.com
não expôs de forma auditável o inventário de 23–27 de setembro de 2026. Por
isso, os oito hotéis são apresentados como **watchlist**, nunca como opções já
confirmadas abaixo de ¥500 com café. A própria página leva à busca com datas e
ocupação preenchidas. A estadia também coincide com o feriado nacional do
Festival do Meio-Outono em 25–27 de setembro de 2026.

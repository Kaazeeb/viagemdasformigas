# Rota China

Guia visual e comparativo, em português, para escolher entre oito destinos na
China: Xi’an, Chengdu, Guilin + Yangshuo, Zhangjiajie, Hangzhou, Lijiang,
Huangshan e Harbin.

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

Você pode abrir `index.html` diretamente. Para simular melhor o GitHub Pages,
rode um servidor local na pasta:

```bash
python3 -m http.server 8080
```

Depois, acesse `http://localhost:8080`.

## O que está incluído

- Layout responsivo, com prioridade para celulares.
- Oito guias completos, filtros e recomendação por estilo de viagem.
- Trinta e duas fichas práticas de atrações, com localização, acesso, preço de
  entrada, horário, duração sugerida e orientação de reserva.
- Favoritos e comparação de até três destinos, salvos no navegador.
- Rota sugerida para uma primeira viagem.
- Sessenta e quatro fotografias licenciadas via Wikimedia Commons — oito por
  destino, com atrações variadas.
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
├── script.js
├── CREDITS.md
├── LICENSE
└── .nojekyll
```

## Observação sobre mídia

As fotografias e os vídeos são carregados de seus provedores originais. Isso
mantém o repositório leve, mas requer conexão com a internet. As licenças e os
links de atribuição das fotografias estão em `CREDITS.md` e na seção “Fontes e
créditos” do site. As miniaturas são otimizadas; o arquivo em resolução original
só é carregado quando uma foto é ampliada.

## Personalização rápida

- Textos, destinos, links, fotos e vídeos: `script.js`
- Cores, tipografia e responsividade: `styles.css`
- Título, metadados e estrutura geral: `index.html`

Os dados práticos foram revisados em julho de 2026. Regras de entrada,
ingressos, horários e condições climáticas mudam; por isso, os valores sazonais
ou sem tabela oficial estável aparecem como referência e devem ser
reconfirmados nas fontes indicadas.

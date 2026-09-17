# Integração visual do roteiro final de Pequim

Data: 17/09/2026. Branch: `agent/roteiro-final-pequim`. Página: [beijing-final.html](../beijing-final.html). Esta entrega altera a página na worktree; não houve merge na `main` ou publicação.

## Problema e resultado

O acervo ampliado ainda estava separado do roteiro, que mostrava plantas pouco legíveis, fotografias com identidade ou perspectiva duvidosa e instruções de acesso com fontes inadequadas. A página agora relaciona uma seleção revisada ao momento de uso: 49 recursos, distribuídos pelas 16 visitas, sete etapas de transporte e cartão do hotel. As sete plantas antigas aproveitadas continuam como referências separadas.

O conteúdo renderizado contém 61 ocorrências de imagens, correspondentes a 56 arquivos de prévia/foto distintos. Esses números incluem repetições úteis de uma referência entre etapas e as plantas anteriores; não são 61 criações novas. A entrega selecionada possui 63 arquivos porque 14 recursos têm prévia e arquivo detalhado.

## Correções aplicadas

| Área | Mudança |
|---|---|
| Imagens junto da visita | Esquemas do trecho antes das fotos; plantas extensas em “Consultar planta completa de referência”. |
| Hotel | Fachada identificada e cartão de endereço chinês no próprio cartão do hotel. |
| Legibilidade | Fotos integrais, sem recorte automático de fachadas; legendas maiores no celular; prévias locais com dimensão declarada. |
| Ampliação | Fotos e mapas abrem pelo mesmo controle; imagem detalhada, ajuste integral, ajuste à largura, ampliação e rolagem. |
| Falha de imagem | Estado de carregamento e mensagem de erro com link direto para o arquivo. |
| Navegação por teclado | Controles nomeados, foco no modal, fundo inerte e retorno ao elemento que abriu a imagem. |
| Celular | Grade do título/hotel corrigida para evitar corte horizontal em telas estreitas. |
| Sem JavaScript | Quatro dias e imagens no HTML estático; links de imagem e áreas expansíveis continuam utilizáveis. |
| Falha parcial de script | Se a seleção visual não carregar, manter o HTML já revisado; não recriar a página com imagens antigas descartadas. |
| Qianmen/Dashilar | Foto substituída e perspectivas explícitas; legenda da planta corrigida para virar à direita/oeste ao caminhar para sul. |
| Jingshan e Lama | Retirada da planta com retas de Jingshan; substituição da planta pequena do Lama por referência bilíngue. |
| Acessos | Fontes e instruções revistas em 19 etapas, conforme [registro específico](fontes-acessos-pequim.md). |

## Origem e verificação das imagens

O [manifesto](../assets/itinerary/guide/manifest.json) identifica fontes online, composições, criações, relações entre versões e hashes revisados. Os 14 mapas detalhados são idênticos aos aprovados no acervo. Prévias foram abertas individualmente; fotos foram revisadas em pranchas e detalhes de placas/saídas foram ampliados novamente depois da codificação.

A revisão cruzada do HTML confirmou ausência de recursos pendentes/reprovados, inclusive nos mapas anteriores mantidos. A candidata PBase intitulada “East Gate” foi retirada da integração porque não demonstrava inequivocamente o acesso externo do Templo do Céu. Os registros históricos da curadoria permanecem em `apoio/recursos-visuais-pequim-2026-09-16/`.

## Validação técnica

Os resultados e capturas do navegador ficam em `apoio/recursos-visuais-pequim-2026-09-16/validacao/integracao-pagina/`. Os ensaios usam arquivos locais, sem servidor, com requisições HTTP/HTTPS bloqueadas. Os relatórios distinguem a base anterior, a integração atual e a cópia offline.

A conferência de integridade cobre hashes, formatos, dimensões, aprovações e referências dos 63 arquivos selecionados. A geração estática deve permanecer reproduzível: executar `node scripts/render-beijing-final.cjs` e conferir que uma segunda execução não muda o HTML. A sintaxe do JavaScript e `git diff --check` também são verificados.

## Entrega offline

O empacotador `scripts/package-beijing-final.cjs` copia a página renderizada, seus scripts/estilos e todas as imagens referenciadas, incluindo os arquivos de zoom. Remove apenas os links de navegação para outros guias ausentes no pacote; preserva dias, nomes chineses, fontes e a marca do site.

```bash
node scripts/render-beijing-final.cjs
node scripts/package-beijing-final.cjs /caminho/externo/pequim-offline
```

O destino deve estar vazio e fora da worktree. O pacote contém README e manifesto SHA-256. Na entrega local, abrir `apoio/recursos-visuais-pequim-2026-09-16/entrega/pequim-offline/beijing-final.html`. Manter a pasta inteira junta; extrair o ZIP antes de abrir.

Ler o roteiro e ampliar as imagens incluídas não requer rede. Reservas, fontes externas e aplicativos de transporte continuam precisando de internet. A abertura de HTML local varia entre telefones; esta entrega não configura cache automático do site publicado e não equivale a um teste em iPhone/Android físico.

## Confirmações ainda necessárias

As correções eliminam ambiguidades conhecidas, mas não tornam comprovados acessos que dependem da operação do dia. O roteiro indica essas ações nos trechos correspondentes:

- Confirmar caminho hotel–metrô, travessias e assistência para carrinho nas estações.
- Conferir a circulação permitida durante as obras de Taihemen.
- Confirmar reserva/dispensa e entrada de Tian’anmen para a tarde de 25/09.
- Definir equipamento, bilhete e condições para as crianças em Mutianyu com o operador.
- Combinar pontos permitidos de carro e conferir voo, terminal, balcão e portão.

Novas imagens úteis seriam fotografias atuais dos acessos e travessias ainda sem evidência contínua, e uma planta oficial atual do T2. Não foi criado um caminho fictício para preencher essas lacunas.

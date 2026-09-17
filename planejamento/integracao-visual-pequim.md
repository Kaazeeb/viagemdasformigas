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
| Barra de rolagem | `scrollbar-gutter: stable` reserva espaço no visualizador para a barra não reduzir a área depois do cálculo de “Largura”. Ajuste final deixado para teste visual do usuário. |
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

**Por solicitação do usuário, a validação final foi concluída apenas no shell. O teste visual da versão entregue fica com o usuário.** Nenhum navegador ou servidor foi mantido em execução.

Passaram:

- Sintaxe dos seis arquivos JavaScript: dados, seleção, interface, renderizador, empacotador e verificador.
- Sete grupos de verificações em `node scripts/validate-beijing-final.cjs`: quatro dias/50 etapas/fontes; equivalência do HTML estático; IDs e links locais; 61 imagens com texto alternativo e ampliação por links; seleção aprovada e cobertura; preservação do HTML quando dados/seleção falham; delimitadores do CSS.
- Integridade dos 63 arquivos selecionados: hashes, formatos, dimensões, aprovações e referências, com `assets/itinerary/guide/verify.py`.
- Nova geração do HTML sem diferenças, e `git diff --check` sem problemas.
- Pacote offline: 76 hashes, 255 referências locais do HTML, correspondência dos scripts/estilo com a worktree e integridade dos 77 arquivos no ZIP.

O teste de falha parcial usa VM e um documento mínimo para verificar que a inicialização não substitui o HTML. Não simula a interação dos controles. A checagem de CSS confere delimitadores; não mede layout.

Antes da interrupção dos testes no navegador, foi preservado um ensaio com **183/186 verificações aprovadas**, em 360, 390 e 1280 px, com/sem JavaScript. As três falhas eram o mesmo excesso horizontal de 15 px no controle “Largura” no desktop. O CSS foi ajustado depois; **não houve nova execução para certificar a correção visual**. As capturas e relatórios históricos ficam em `apoio/recursos-visuais-pequim-2026-09-16/validacao/integracao-pagina/`; o cenário adicional de falha do script não foi executado no navegador. Esse ensaio anterior não é aprovação integral da versão final.

## Entrega offline

O empacotador `scripts/package-beijing-final.cjs` copia a página renderizada, seus scripts/estilos e todas as imagens referenciadas, incluindo os arquivos de zoom. Remove apenas os links de navegação para outros guias ausentes no pacote; preserva dias, nomes chineses, fontes e a marca do site.

```bash
node scripts/render-beijing-final.cjs
node scripts/package-beijing-final.cjs /caminho/externo/pequim-offline
```

O destino deve estar vazio e fora da worktree. O pacote entregue contém 77 arquivos, README e manifesto SHA-256, somando 33.620.698 bytes. O ZIP ocupa 32.378.578 bytes. Na entrega local, abrir `apoio/recursos-visuais-pequim-2026-09-16/entrega/pequim-offline/beijing-final.html`; a versão compactada fica em `entrega/pequim-offline.zip`. Manter a pasta inteira junta; extrair o ZIP antes de abrir.

Ler o roteiro e ampliar as imagens incluídas não requer rede. Reservas, fontes externas e aplicativos de transporte continuam precisando de internet. A abertura de HTML local varia entre telefones; esta entrega não configura cache automático do site publicado e não equivale a um teste em iPhone/Android físico.

## Confirmações ainda necessárias

As correções eliminam ambiguidades conhecidas, mas não tornam comprovados acessos que dependem da operação do dia. O roteiro indica essas ações nos trechos correspondentes:

- Confirmar caminho hotel–metrô, travessias e assistência para carrinho nas estações.
- Conferir a circulação permitida durante as obras de Taihemen.
- Confirmar reserva/dispensa e entrada de Tian’anmen para a tarde de 25/09.
- Definir equipamento, bilhete e condições para as crianças em Mutianyu com o operador.
- Combinar pontos permitidos de carro e conferir voo, terminal, balcão e portão.

Novas imagens úteis seriam fotografias atuais dos acessos e travessias ainda sem evidência contínua, e uma planta oficial atual do T2. Não foi criado um caminho fictício para preencher essas lacunas.

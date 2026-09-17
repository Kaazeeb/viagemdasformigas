# Acervo visual para o roteiro final de Pequim

Curadoria, correções e integração em 17/09/2026, a partir do roteiro no commit `079b301`. Trabalho isolado na branch `agent/roteiro-final-pequim`; ainda não publicado.

## Resultado na página

O [roteiro final](../beijing-final.html) incorpora **49 recursos selecionados: 14 plantas, esquemas e cartões, mais 35 fotografias**, cobrindo as 16 visitas e sete etapas de transporte. A fachada e o cartão do hotel ficam junto do endereço. Os mapas completos anteriores continuam como referências expansíveis, exceto a planta pequena do Lama, substituída pela bilíngue, e a planta de Jingshan com retas editoriais, retirada.

Cada visita apresenta as instruções, o esquema do trecho quando disponível e as fotos para reconhecer os lugares. Fotos e mapas abrem em um visualizador com ajuste à tela inteira, ajuste à largura, ampliação, rolagem e retorno do foco ao fechar. Sem JavaScript, o conteúdo permanece no HTML e as imagens abrem por links comuns.

Foram corrigidos o corte do título/cartão do hotel no celular e o recorte das fotos que escondia partes das fachadas. As versões detalhadas dos mapas são carregadas ao ampliar; as prévias e fotos usam arquivos WebP locais. O conjunto selecionado soma **17.331.290 bytes**, dos quais 9.246.904 são mapas detalhados e 8.084.386 são prévias/fotos. Isso não representa o tráfego inicial da página nem inclui todas as plantas antigas mantidas.

As instruções de acesso e suas fontes também foram corrigidas. O [registro de acessos](fontes-acessos-pequim.md) detalha as 19 etapas revistas e as confirmações ainda necessárias. Horários dos blocos, destinos e composição do grupo foram preservados; esta rodada não confirma reservas, voos ou disponibilidade futura.

## Rastreabilidade e reprodução

- [Seleção por etapa](../assets/itinerary/guide/selection.json): legendas, perspectiva e limites de uso.
- [Manifesto da entrega](../assets/itinerary/guide/manifest.json): categoria de origem, fonte, arquivos de origem, alterações, hashes, dimensões e revisão.
- [Fontes das 49 peças](../assets/itinerary/guide/SOURCES.md) e [revisão visual](../assets/itinerary/guide/REVIEW.md).
- `node scripts/render-beijing-final.cjs`: sincroniza os blocos estáticos do HTML com dados, seleção e renderizadores.
- `node scripts/validate-beijing-final.cjs`: verifica conteúdo, arquivos, links e falhas parciais pelo shell, sem navegador ou servidor.
- `python3 assets/itinerary/guide/verify.py`: verifica integridade, aprovação e correspondência das imagens; exige Pillow com WebP.

Os arquivos detalhados dos 14 mapas preservam exatamente os bytes aprovados no acervo. As fotografias foram codificadas para entrega, sem cortes ou retoques, e reinspecionadas. As peças originais online, composições e criações continuam identificadas separadamente no manifesto.

## Entrega local

Pasta: `/home/kaazeeb/viagem/apoio/recursos-visuais-pequim-2026-09-16/`.

- `index.html`: galeria offline com filtros por local, dia, origem e revisão.
- `README.md`: organização, fontes, reprodução, verificação e limites do acervo.
- `cobertura-por-local.md`: avaliação do que existia, melhorias disponíveis e lacunas por região.
- `plano-de-integracao.md`: associação dos recursos às etapas do roteiro.
- `catalogo.json` e `catalogo.csv`: inventário com arquivos, fontes, origem dos derivados e hashes.
- `documentacao/`: relatórios e manifestos das quatro frentes de trabalho.
- `validacao/`: decisões individuais, correções, integridade e checagem de links.

O acervo completo e seus relatórios ficam em `apoio/`, conforme a organização do workspace. A seleção usada na página foi copiada e versionada em `assets/itinerary/guide/`; os originais integrais e as versões descartadas permanecem na pasta de apoio.

## Conteúdo

São **122 recursos visuais distintos**: 99 originais online, 5 edições/composições e 18 criações próprias. Houve 73 adições ao acervo inicial de 49 recursos. As versões reprovadas permanecem identificadas no total para documentar as decisões.

Foram aprovados 90 recursos de referência e 17 complementos; 6 permanecem pendentes e 9 foram reprovados. Aprovação vale para a utilidade descrita na ficha e não certifica operação futura de acesso, equipamento ou travessia.

A ampliação cobre os dias 24–27, hotel, metrô e PEK T2. Inclui 12 peças novas de orientação aprovadas: eixo do Lama; bairro Lama–Guozijian; Wangfujing; Cidade Proibida; Jingshan; Qianmen–Dashilar; setor leste de Verão; posições relativas em Shichahai; equipamentos de Mutianyu; conexões de metrô; cartão do hotel; fluxo de embarque doméstico. Todas tiveram inspeção da versão renderizada e revisão independente.

## Correções prioritárias identificadas

1. **Mutianyu:** o diagrama inicial confundia controle sul de trilhas com acesso da cadeirinha/tobogã. Sua aprovação foi revogada; a nova comparação distingue equipamento, setor e controle do bilhete.
2. **Cidade Proibida:** Taihemen é o portal com aviso de obra, distinto de Taihedian. Não há desvio inventado. A composição também corrige os marcadores dos salões e situa a abordagem oriental entre muro e fosso.
3. **Templo do Céu e Verão:** imagens geradas alteraram arquitetura ou posição de marcos. As tentativas incorretas foram reprovadas. Composições aprovadas preservam a planta ou usam símbolos com limites claros.
4. **Fontes das saídas:** links rotulados como E3 de Wangfujing e F de Yonghegong abriam, respectivamente, uma livraria e a atração. Foram substituídos por fontes que tratam dos acessos.
5. **Perspectiva e identidade:** fotos de Qianmen/Dashilar, portões do Lama, fachada do hotel e partidas do T2 exigiram revisão de legenda ou descarte. Fotografias plausíveis não foram automaticamente aceitas como orientação.

As fontes e evidências estão nos relatórios locais. Permanecem pendentes confirmações de acessos atuais, travessias, situação da obra, equipamento familiar em Mutianyu, ponto de carro e planta atual do T2. Também falta uma foto inequívoca e recente do portão leste externo do Templo do Céu: a candidata intitulada “East Gate” foi retirada da seleção da página. Gerar fotografias fictícias não resolveria essas lacunas.

## Validação

Verificados 122 arquivos principais, 20 SVGs editáveis, 704 links da galeria e 41 relações entre recursos. A comparação exata por SHA-256 não encontrou duplicatas; triagem de semelhança dos 99 originais também não apontou candidatos no limiar registrado. PNG e SVG da mesma peça são agrupados, sem inflar a contagem.

Foram validados a sintaxe do JavaScript e os filtros em simulação de DOM. Não foi realizado teste visual da galeria em navegador. As imagens renderizadas foram abertas e inspecionadas individualmente pelos agentes. As versões SVG dependem das fontes e do renderizador documentados; os PNGs têm os textos chineses já renderizados.

A página foi atualizada nesta branch. O site publicado ainda não recebeu estas alterações. A validação do navegador e a entrega offline são registradas em [integração da página](integracao-visual-pequim.md).

# Acervo visual para o roteiro final de Pequim

Curadoria e revisão concluídas em 17/09/2026, a partir do roteiro no commit `079b301`. Trabalho isolado na branch `agent/roteiro-final-pequim`.

## Entrega local

Pasta: `/home/kaazeeb/viagem/apoio/recursos-visuais-pequim-2026-09-16/`.

- `index.html`: galeria offline com filtros por local, dia, origem e revisão.
- `README.md`: organização, fontes, reprodução, verificação e limites do acervo.
- `cobertura-por-local.md`: avaliação do que existia, melhorias disponíveis e lacunas por região.
- `plano-de-integracao.md`: associação dos recursos às etapas do roteiro.
- `catalogo.json` e `catalogo.csv`: inventário com arquivos, fontes, origem dos derivados e hashes.
- `documentacao/`: relatórios e manifestos das quatro frentes de trabalho.
- `validacao/`: decisões individuais, correções, integridade e checagem de links.

Os recursos ficam fora do repositório, em `apoio/`, conforme a organização do workspace. Este registro versiona a síntese da entrega; as imagens e seus relatórios completos permanecem na pasta local indicada.

## Conteúdo

São **122 recursos visuais distintos**: 99 originais online, 5 edições/composições e 18 criações próprias. Houve 73 adições ao acervo inicial de 49 recursos. As versões reprovadas permanecem identificadas no total para documentar as decisões.

Foram aprovados 90 recursos de referência e 17 complementos; 6 permanecem pendentes e 9 foram reprovados. Aprovação vale para a utilidade descrita na ficha e não certifica operação futura de acesso, equipamento ou travessia.

A ampliação cobre os dias 24–27, hotel, metrô e PEK T2. Inclui 12 peças novas de orientação aprovadas: eixo do Lama; bairro Lama–Guozijian; Wangfujing; Cidade Proibida; Jingshan; Qianmen–Dashilar; setor leste de Verão; posições relativas em Shichahai; equipamentos de Mutianyu; conexões de metrô; cartão do hotel; fluxo de embarque doméstico. Todas tiveram inspeção da versão renderizada e revisão independente.

## Correções prioritárias identificadas

1. **Mutianyu:** o diagrama inicial confundia controle sul de trilhas com acesso da cadeirinha/tobogã. Sua aprovação foi revogada; a nova comparação distingue equipamento, setor e controle do bilhete.
2. **Cidade Proibida:** Taihemen é o portal com aviso de obra, distinto de Taihedian. Não há desvio inventado. A composição também corrige os marcadores dos salões e situa a abordagem oriental entre muro e fosso.
3. **Templo do Céu e Verão:** imagens geradas alteraram arquitetura ou posição de marcos. As tentativas incorretas foram reprovadas. Composições aprovadas preservam a planta ou usam símbolos com limites claros.
4. **Fontes das saídas:** links do roteiro rotulados como E3 de Wangfujing e F de Yonghegong abrem, respectivamente, uma livraria e a atração. A fonte da instrução precisa de correção.
5. **Perspectiva e identidade:** fotos de Qianmen/Dashilar, portões do Lama, fachada do hotel e partidas do T2 exigiram revisão de legenda ou descarte. Fotografias plausíveis não foram automaticamente aceitas como orientação.

As fontes e evidências estão nos relatórios locais. Permanecem pendentes confirmações de acessos atuais, travessias, situação da obra, equipamento familiar em Mutianyu, ponto de carro e planta atual do T2. Gerar fotografias fictícias não resolveria essas lacunas.

## Validação

Verificados 122 arquivos principais, 20 SVGs editáveis, 704 links da galeria e 41 relações entre recursos. A comparação exata por SHA-256 não encontrou duplicatas; triagem de semelhança dos 99 originais também não apontou candidatos no limiar registrado. PNG e SVG da mesma peça são agrupados, sem inflar a contagem.

Foram validados a sintaxe do JavaScript e os filtros em simulação de DOM. Não foi realizado teste visual da galeria em navegador. As imagens renderizadas foram abertas e inspecionadas individualmente pelos agentes. As versões SVG dependem das fontes e do renderizador documentados; os PNGs têm os textos chineses já renderizados.

O site publicado não foi alterado nesta etapa. O plano de integração local define as próximas mudanças por etapa, priorizando orientações que poderiam levar ao acesso errado.

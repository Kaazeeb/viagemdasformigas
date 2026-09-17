# Revisão da seleção entregue à página

Revisão em 17/09/2026 por `integrar_acervo`. Esta revisão cobre os arquivos e a correspondência com as etapas; a revisão do navegador pertence à integração da página.

## Procedimento

1. Conferência do estado aprovado e do hash revisado de cada entrada do acervo antes da cópia/conversão. Arquivo alterado depois da aprovação interrompe a preparação.
2. Preservação integral dos 14 mapas/diagramas/cartões detalhados: PNG/JPEG com os mesmos bytes da versão aprovada. Previews WebP usam o mesmo enquadramento, sem corte.
3. Abertura individual dos 14 previews com `view_image`: verificação de títulos, nomes chineses e portugueses, norte quando existente, números, legendas, avisos e ausência de cortes ou sobreposições novos.
4. Revisão de 36 candidatas em seis pranchas de seis imagens; 35 permanecem na seleção final. Conferência da identidade visível, proporção integral, luz/contraste e utilidade para reconhecer o marco descrito.
5. Abertura adicional em resolução original de E3/Wangfujing, F/Yonghegong, A2/Shichahai, Meishi e dos três marcos do Palácio de Verão. As letras das saídas e os nomes relevantes continuam legíveis após a conversão para WebP.
6. Verificação automática com `verify.py`: arquivos decodificáveis, dimensões e hashes correspondentes, estado aprovado, revisão de entrega registrada, referências locais existentes, nenhuma imagem órfã na seleção, 16 visitas com uma a três fotos e substituições sensíveis mantidas.

Os resultados por recurso estão em `manifest.json`, no campo `deliveryReview`. A preparação preserva esses resultados apenas quando os arquivos produzidos continuam com os mesmos hashes; mudança de pixels reinicia a revisão.

## Decisões de orientação

| Caso | Decisão na seleção |
|---|---|
| Jingshan | Retirar da página a planta anterior com retas editoriais. Usar a composição sobre a planta limpa, acompanhada de foto das escadas reais. A planta continua antiga e não determina uma trilha acessível. |
| Lama | Esquema bilíngue legível como guia de ordem; planta publicada de 630×1770 px como referência ampliável. Não desenhar retorno por corredor lateral desconhecido. |
| Qianmen | Substituir a fotografia pendente pelo pailou identificado. Legenda explícita: foto olha para norte, passeio segue para sul. |
| Dashilar | Identificar o letreiro e Xianyukou ao fundo, com a orientação oposta à caminhada: foto para leste, passeio para oeste. |
| Mutianyu | Usar comparação fotográfica revisada dos equipamentos. Não equiparar o controle sul das trilhas à entrada da cadeirinha/tobogã. |
| Cidade Proibida | Distinguir 太和门 Taihemen de 太和殿 Taihedian. Nenhuma seta certifica passagem pela obra ou inventa desvio. |
| Portão leste do Templo do Céu | Retirar a candidata `ext24-ceu-leste-pbase` da integração. A fonte PBase intitula a foto de 2009 “East Gate”, mas falta comprovação adicional para distingui-la do portão interno. O texto e a planta oficial guiam a saída; continua faltando uma foto atual inequívoca do acesso externo. |
| Palácio de Verão | Usar composição revisada que conserva as posições da planta. O marcador 5 identifica a região Paiyunmen; a linha escura preexistente não é o percurso do grupo. |
| Hotel e aeroporto | Cartões de nome/endereço e vocabulário de embarque; não são plantas de circulação ou confirmação futura do voo. |
| A2/F/E3 | Fotos para reconhecimento. Conferir acesso em operação e seguir o ponto de embarque permitido; não deduzir acessibilidade das fotos. |

## Peso e preservação

O conjunto inclui aproximadamente 17,3 MB: 9,25 MB de mapas detalhados idênticos aos aprovados, abertos sob demanda, e cerca de 8 MB de previews e fotos distribuídos pelas etapas. O valor exato é calculado no manifesto.

Os mapas detalhados permanecem sem perda de conteúdo para leitura ampliada. As fotos maiores foram reduzidas para até 1600 px com qualidade WebP 80; nenhum original foi ampliado. Os downloads integrais continuam na pasta de apoio com fonte e hash registrados.

Esta etapa não mede tráfego real, cache offline ou layout do celular. Esses comportamentos precisam ser verificados no renderizador integrado; o contrato fornece largura/altura e separa o preview do arquivo detalhado para que a página possa carregar e ampliar corretamente.

# Verificação da ficha

Data: 04/10/2026.

## Layout e conteúdo

Conferência no navegador integrado, com leitura da estrutura renderizada e inspeção visual das páginas completas:

| Tela | Resultado |
| --- | --- |
| 1440 px, computador | 3 colunas no inventário; retrato carregado; sem rolagem horizontal |
| 768 px, tablet | 2 colunas no inventário; sem rolagem horizontal |
| 390 px, celular | 1 coluna no inventário; seções empilhadas; sem rolagem horizontal |
| 320 px, celular pequeno | Sem elementos ultrapassando a largura da página na medição do navegador |
| Protótipo, 768 px | Quatro seções presentes; sem rolagem horizontal; inspeção visual concluída |

## Verificações de estrutura

- Todos os destinos das âncoras internas existem.
- O botão “Explorar habilidades” altera o endereço para `#atributos`.
- O retrato carrega corretamente e possui texto alternativo.
- Arquivos locais referenciados por HTML e protótipo existem.
- A ficha e o protótipo não contêm scripts.
- As quatro barras têm valores numéricos visíveis e nomes acessíveis.
- As quatro seções obrigatórias estão presentes.
- Navegação usa links nativos; CSS inclui foco visível e preferência por movimento reduzido.

## Contraste calculado

Razões calculadas pela fórmula de luminância relativa da WCAG:

| Texto / fundo | Razão |
| --- | --- |
| `#F0F3F7` / `#080F18` | 17,28:1 |
| `#ADBACA` / `#101D2B` | 8,64:1 |
| `#82D9F7` / `#101D2B` | 10,72:1 |
| `#D9B77B` / `#202932` | 7,73:1 |
| `#080F18` / `#82D9F7` | 12,11:1 |

Essas combinações superam 4,5:1. Não foi feita uma auditoria completa com leitor de tela ou de todos os critérios WCAG.

## Limites da Parte 1

- Atributos e habilidades são estáticos, conforme a etapa de HTML/CSS.
- O contato é fictício, identificado na página; nenhum e-mail foi enviado durante a verificação.
- O Discord é um link à plataforma, não a um servidor do personagem.
- As fontes externas precisam de conexão, com alternativas locais configuradas.
- A publicação online privada não substitui a entrega ao professor. Para entregar por pasta compactada, use o ZIP completo. Para a opção GitHub, ainda é necessário enviar o projeto ao repositório escolhido e fornecer os links exigidos.


## Revisão visual com efeitos

- Confirmados HTML sem scripts, uma coluna a 390 px e três colunas a 1232 px, sem transbordamento horizontal nas medições do navegador.
- Conferida a entrada do retrato e o acabamento do cabeçalho na prévia local.
- As media queries originais de tablet foram preservadas.
- As regras de movimento reduzido agora também desativam todas as novas animações e transformações de hover.
- O arquivo original do retrato permanece inalterado.
- A revisão foi aplicada aos arquivos locais; a publicação online continua pendente pelo bloqueio da sessão de hospedagem.

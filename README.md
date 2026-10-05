# Nero Vael — O Portador da Chama Azul

Projeto prático individual — Parte 1: Ficha de Herói em HTML e CSS.

**Aluno:** João Pedro de Souza Garcia  
**Turma:** Noturno — segunda-feira

## Sobre o personagem e o projeto

Nero Vael é um guardião piromante de nível 24, sobrevivente da cidade de Vhalora. Ele protege a última chama que preserva as memórias de seu povo. Sua missão é recuperar os três fragmentos de um farol e reunir os sobreviventes. O uso excessivo da magia apaga suas próprias lembranças.

A página apresenta quatro seções: **Sobre o Herói**, **Atributos & Habilidades**, **Inventário & Conquistas** e **Contato com a Guilda**. O projeto usa apenas HTML e CSS, sem JavaScript, frameworks ou instalação de dependências. Os números e habilidades são fictícios; esta parte é uma ficha estática.

## Como abrir

1. Extraia a pasta `ficha-heroi-parte1` do ZIP.
2. Abra `index.html` no navegador.
3. Para ver o planejamento visual, abra `prototipo/index.html`.

As fontes Cinzel e Manrope são carregadas do Google Fonts e precisam de internet. Sem conexão, a página continua funcionando com Georgia e Arial. O retrato é um arquivo local. O link externo do Discord também precisa de internet.

## Organização

```text
ficha-heroi-parte1/
├── index.html
├── style.css
├── README.md
├── PERSONAGEM.md
├── VERIFICACAO.md
├── imagens/
│   └── nero-vael.png
└── prototipo/
    ├── index.html
    └── prototipo.css
```

## Protótipo

O protótipo de baixa fidelidade foi feito em HTML/CSS antes da ficha final. Ele apresenta as quatro seções, posição do avatar, títulos, textos, ícones, barras, cards, botões e navegação por âncoras. Inclui notas de paleta, tipografia e adaptação de tela. Pode ser aberto diretamente e também impresso pelo navegador.

Foi escolhido um protótipo em código como alternativa de prototipagem. O edital aceita alternativas ao Figma e cita prototipagem diretamente em código. O protótipo está em `prototipo/index.html`; não depende de conta de serviço de design.

## Decisões de UI/UX

1. **Hierarquia visual.** O nome em Cinzel, o retrato e o título do personagem recebem maior destaque. As seções numeradas conduzem da apresentação aos atributos, inventário e guilda. O texto corrido usa Manrope e tamanho-base de 16 px; títulos mantêm hierarquia `h1` → `h2` → `h3` → `h4`.
2. **Contraste e legibilidade.** O fundo azul-noturno `#080F18` e os painéis `#101D2B` recebem texto claro `#F0F3F7` e texto secundário `#ADBACA`. Azul-chama `#82D9F7` identifica afinidade mágica; ouro `#D9B77B` identifica relíquias e metadados. As combinações de texto foram calculadas para superar o mínimo AA de 4,5:1 para texto comum. Isso é uma verificação de contraste, não uma certificação integral de acessibilidade.
3. **Consistência.** Cores, tipografia e espaçamentos são centralizados em `:root`. Os cards repetem a mesma estrutura: raridade, ícone, categoria, nome, descrição e efeito. As barras usam a mesma escala de 0 a 100.
4. **Affordance e feedback.** Links do menu mudam de cor no hover e possuem foco visível. Os links com aparência de botão mudam de fundo e aumentam levemente, com `transition`. Cards são informativos e não fingem ser botões. Não há promessa de envio de formulário ou ação dinâmica inexistente.
5. **Área de toque.** Links de navegação têm altura mínima de 44 px e os botões, 50 px. Essa escolha amplia o espaço de interação no celular; não equivale a afirmar que todos os critérios de acessibilidade foram auditados.
6. **Proximidade e agrupamento.** Nome, valor numérico e barra de cada atributo ficam juntos. Cada habilidade agrupa ícone, descrição e custo. Raridade e efeito permanecem dentro do card correspondente.
7. **Fluxo de leitura e acessibilidade.** A ordem do HTML acompanha a leitura visual. Há link para pular ao conteúdo, landmarks semânticos, texto alternativo no retrato e números explícitos nas barras. Raridades são escritas, sem depender apenas da cor. Ícones decorativos usam `aria-hidden="true"`. A preferência `prefers-reduced-motion` desativa deslocamento suave e transformações.

### Referências consultadas

- W3C WAI — Estrutura de páginas: https://www.w3.org/WAI/tutorials/page-structure/
- W3C WCAG 2.2 — Contraste mínimo: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- W3C WCAG 2.2 — Tamanho mínimo dos alvos: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- Nielsen Norman Group — Hierarquia visual: https://www.nngroup.com/articles/visual-hierarchy-ux-definition/
- Nielsen Norman Group — Proximidade: https://www.nngroup.com/articles/gestalt-proximity/

Consulta realizada em 04/10/2026. As decisões acima são aplicações próprias desses princípios ao personagem.

## Requisitos técnicos implementados

| Requisito | Implementação |
| --- | --- |
| HTML semântico | `header`, `nav`, `main`, quatro `section`, `footer`, títulos, parágrafos, imagem, links e listas |
| CSS externo | `style.css` vinculado por `link` |
| Classes e IDs temáticos | `.barra-atributo`, `.card-item`, `.guilda`, `#sobre`, `#inventario` |
| Flexbox | `.menu` e demais alinhamentos |
| CSS Grid | `.grade-inventario` |
| Responsividade | 1 coluna abaixo de 640 px; 2 entre 640 e 1023 px; 3 a partir de 1024 px |
| Variáveis CSS | Paleta, espaçamentos e famílias de fontes em `:root` |
| Barras de atributos | `div` interna com `width` percentual; valores acessíveis com `role="meter"` |
| Transição | Fundo e escala em `.botao-primario:hover` |
| Pseudo-elemento opcional | `.item-lendario::before`, detalhe dourado do card |
| Organização | CSS comentado por seção |
| Ícones | Símbolos temáticos Unicode, sem biblioteca externa |
| Google Fonts | Cinzel e Manrope, com fontes alternativas locais |
| Biografia e imagem | Seção Sobre o Herói e retrato em `imagens/` |
| Item de destaque | Coração de Vhalora, raridade lendária e descrição |
| Comunidade | Link para a página oficial do Discord |
| Documentação | Este README, dossiê do personagem e registro de verificação |

## Contato fictício

O endereço `vigilia@example.com` é ilustrativo. O botão abre o aplicativo de e-mail, mas não há uma caixa real da guilda nem garantia de envio. O link do Discord abre a plataforma, não um servidor criado para este trabalho. A página informa isso claramente.

## Conteúdo e recursos

Personagem, história, textos e código foram elaborados especificamente para este projeto com assistência de IA (Codex). O retrato foi gerado com IA para representar o personagem, sem usar uma ficha pronta de terceiros. Ícones usam caracteres Unicode. As fontes são distribuídas pelo Google Fonts.

Antes da entrega, revise, personalize e compreenda o código. Registre a autoria acadêmica de acordo com as orientações do professor, mantendo transparente a assistência utilizada.

## Entrega e continuação

- **Pasta compactada:** entregar a pasta em ZIP com todos os arquivos, incluindo o protótipo.
- **GitHub:** criar um repositório, enviar os arquivos e apresentar o link do repositório e do protótipo. Um link de site privado não substitui o repositório nem garante acesso ao professor.
- **Parte 2:** continuar no mesmo projeto. Futuras interações podem atualizar atributos ou selecionar habilidades; nenhuma dessas funções foi adicionada nesta etapa.

Os resultados dos testes desta versão estão em `VERIFICACAO.md`.


## Aprimoramento visual

A versão revisada preserva a estrutura e o retrato originais e acrescenta:

- iluminação ambiente azul com pulsação lenta de opacidade;
- entrada suave do nome e do retrato;
- moldura dupla com luz azul e selo de nível;
- reflexo que atravessa os botões ao passar o mouse ou receber foco;
- sublinhado animado no menu;
- barras com preenchimento inicial animado e gradiente luminoso;
- molduras circulares nos símbolos das relíquias, cantos ornamentais e destaque dourado do item lendário;
- elevação discreta dos cards e aproximação do retrato em dispositivos com mouse;
- fundos e enquadramento mais definidos nas conquistas e na citação.

São efeitos exclusivamente em CSS. A preferência por movimento reduzido desativa animações, transições e aproximações. O conteúdo permanece legível sem animação e os cards continuam informativos, sem cursor de botão. Nenhum arquivo de imagem foi comprimido ou substituído nesta revisão; o foco foi o acabamento visual.

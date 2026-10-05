# 1. Cores

**Legenda:** O = observado; E = estimado pela imagem; P = proposta de implementação, não exibida. Os HEX são aproximações da reprodução raster, não valores recuperados do código original. As três referências representam temas distintos; não combinar suas paletas indiscriminadamente.

| Tema | Token | HEX | Uso | Evidência |
|---|---|---|---|---|
| 1 · quente | `--color-brand` | `#FF7908` | CTA principal, destaque do título e marca | E |
| 1 · quente | `--color-bg` | `#C94D03` | Campo laranja do hero | E |
| 1 · quente | `--color-bg-deep` | `#280902` | Escurecimento inferior e sombras | E |
| 1 · quente | `--color-secondary` | `#7F3107` | Botão secundário e superfícies escuras | E |
| 1 · quente | `--color-text` | `#FFF7EA` | Título branco e navegação | E |
| 1 · quente | `--color-muted` | `#E8CCAD` | Descrição e provas de confiança | E |
| 2 · escuro | `--color-brand` | `#DC7B29` | CTA, link ativo e indicador da miniatura | E |
| 2 · escuro | `--color-bg` | `#08090E` | Fundo dominante | E |
| 2 · escuro | `--color-surface` | `#191923` | Halo escuro atrás do produto | E |
| 2 · escuro | `--color-text` | `#F8F7F2` | Título, ícones e navegação | E |
| 2 · escuro | `--color-muted` | `#C4C4C8` | Descrição | E |
| 2 · escuro | `--color-border` | `#8A8589` | Contorno das miniaturas | E |
| 3 · catálogo | `--color-brand` | `#B11A1A` | Hero, categorias e bloco promocional | E |
| 3 · catálogo | `--color-secondary` | `#FFC400` | Cabeçalho, CTA e categoria destacada | E |
| 3 · catálogo | `--color-bg` | `#F5F0E5` | Fundo da página | E |
| 3 · catálogo | `--color-surface` | `#FFFDFC` | Área de informações dos produtos | E |
| 3 · catálogo | `--color-surface-warm` | `#F7E1BF` | Bloco de entrega e imagens dos cards | E |
| 3 · catálogo | `--color-text` | `#171410` | Textos sobre superfícies claras | E |
| 3 · catálogo | `--color-muted` | `#625C52` | Descrições e metadados | P |
| Todos | `--color-error` | `#B42318` | Mensagem, ícone e borda de erro | P |
| Todos | `--color-success` | `#18703B` | Confirmação de pedido ou ação | P |

**Estados:** a referência 2 exibe navegação ativa laranja e miniatura selecionada com contorno quente e triângulo superior. A referência 3 mostra um card de categoria amarelo entre cards vermelhos; sua função como seleção não é confirmável. Hover, pressionado, erro e sucesso não aparecem nas imagens.

| Estado | Tema quente | Tema escuro | Tema catálogo | Aplicação proposta |
|---|---|---|---|---|
| Hover do CTA | `#E86A00` | `#C76B20` | `#E9B300` | Escurecer a superfície sem mudar dimensões |
| Pressionado | `#CD5B00` | `#AC5919` | `#D39F00` | Cor mais profunda |
| Foco | `#FFF7EA` | `#F8F7F2` | `#171410` | Outline de 3 px com afastamento |
| Desabilitado | — | — | — | Opacidade 0,5; sem hover; validar legibilidade |

# 2. Tipografia

As famílias exatas não são identificáveis pelas imagens. As opções abaixo são substituições propostas para reproduzir a categoria visual. Tamanhos descrevem a escala para implementação, não medidas do CSS original.

| Uso | Característica observada | Família proposta | Tamanho desktop / mobile | Peso | Line-height | Letter-spacing |
|---|---|---|---|---|---|---|
| H1 · tema 1 | Sans pesada, três linhas, trecho laranja | Inter, Arial, sans-serif | 56–64 / 40–48 px | 800–900 | 0,95–1 | -0,03em |
| H1 · tema 2 | Display condensada, irregular, caixa alta, duas linhas | Lilita One, Impact, sans-serif | 64–72 / 40–48 px | 400 na Lilita One | 1–1,05 | 0 |
| H1 · tema 3 | Sans pesada, três linhas, branca | Inter, Arial, sans-serif | 48–56 / 36–44 px | 900 | 1–1,05 | -0,035em |
| H2 | Título promocional forte | Mesma sans do tema | 28–36 / 24–28 px | 800 | 1,15 | -0,02em |
| Nome de produto | Preto, compacto e pesado | Mesma sans do tema | 18–20 / 18 px | 800 | 1,2 | -0,015em |
| Descrição | Sans regular com hierarquia inferior | Inter, Arial, sans-serif | 14–16 / 16 px | 400 | 1,4–1,5 | 0 |
| Navegação e CTA | Sans de peso médio a forte | Inter, Arial, sans-serif | 14–16 / 14–16 px | 600–700 | 1,2 | 0 |
| Preço | Preto e forte, leitura rápida | Mesma sans do tema | 18–20 / 18 px | 800 | 1,2 | 0 |
| Badge e metadados | Texto menor | Mesma sans do tema | 12–13 / 12–13 px | 500–700 | 1,3 | 0 |

- Limitar o texto introdutório a aproximadamente 35–55 caracteres por linha.
- Preservar as quebras expressivas do hero em desktop; deixar o texto refluir em telas estreitas.
- Não reproduzir as palavras deformadas ou ilegíveis da referência 3. Usar conteúdo real e revisado.

# 3. Tokens CSS

Todos os valores dimensionais são E/P. Cores por tema seguem a seção 1. O tema catálogo é a base por ser a referência com maior variedade de componentes.

| Grupo | Tokens | Escala |
|---|---|---|
| Espaçamento | `--space-1` a `--space-9` | 4, 8, 12, 16, 24, 32, 48, 64, 96 px |
| Raios | `--radius-sm/md/lg/pill` | 6, 10, 16, 999 px |
| Tipografia | `--text-xs/sm/base/lg/xl` | 12, 14, 16, 20, 32 px |
| Layout | `--container`, `--gutter` | 1200 px; 20–48 px |
| Interação | `--control-height`, `--focus-width` | 44 px; 3 px |
| Movimento | `--duration`, `--ease` | 160 ms; ease-out |

```css
:root {
  --color-brand: #b11a1a;
  --color-secondary: #ffc400;
  --color-bg: #f5f0e5;
  --color-bg-deep: #891313;
  --color-surface: #fffdfc;
  --color-surface-warm: #f7e1bf;
  --color-text: #171410;
  --color-muted: #625c52;
  --color-on-brand: #fffdfc;
  --color-on-action: #171410;
  --color-action: #ffc400;
  --color-action-hover: #e9b300;
  --color-action-pressed: #d39f00;
  --color-border: #d7cdbb; /* P */
  --color-focus: #171410;
  --color-error: #b42318;
  --color-success: #18703b;

  --font-body: Inter, Arial, sans-serif;
  --font-display: var(--font-body);
  --weight-body: 400;
  --weight-label: 600;
  --weight-heading: 900;
  --text-xs: .75rem;
  --text-sm: .875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 2rem;
  --text-hero: clamp(2.25rem, 5vw, 3.5rem);
  --leading-body: 1.5;
  --leading-heading: 1.02;
  --tracking-heading: -.035em;

  --space-1: .25rem;
  --space-2: .5rem;
  --space-3: .75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-7: 3rem;
  --space-8: 4rem;
  --space-9: 6rem;
  --radius-sm: .375rem;
  --radius-md: .625rem;
  --radius-lg: 1rem;
  --radius-pill: 999px;
  --shadow-card: none; /* cards claros sem sombra marcante */
  --shadow-cta: 0 8px 24px rgb(220 123 41 / 18%); /* P, tema 2 */
  --container: 75rem;
  --gutter: clamp(1.25rem, 4vw, 3rem);
  --control-height: 2.75rem;
  --focus-width: 3px;
  --duration: 160ms;
  --ease: ease-out;
}

[data-theme="warm"] {
  --color-brand: #ff7908;
  --color-secondary: #7f3107;
  --color-bg: #c94d03;
  --color-bg-deep: #280902;
  --color-surface: #7f3107;
  --color-text: #fff7ea;
  --color-muted: #e8ccad;
  --color-border: #a84a15;
  --color-action: #ff7908;
  --color-action-hover: #e86a00;
  --color-action-pressed: #cd5b00;
  --color-on-action: #280902; /* P: melhora contraste do CTA */
  --color-focus: #fff7ea;
  --text-hero: clamp(2.5rem, 5.5vw, 4rem);
}

[data-theme="dark"] {
  --color-brand: #dc7b29;
  --color-bg: #08090e;
  --color-bg-deep: #08090e;
  --color-surface: #191923;
  --color-text: #f8f7f2;
  --color-muted: #c4c4c8;
  --color-border: #8a8589;
  --color-action: #dc7b29;
  --color-action-hover: #c76b20;
  --color-action-pressed: #ac5919;
  --color-on-action: #08090e; /* P: contraste */
  --color-focus: #f8f7f2;
  --font-display: "Lilita One", Impact, sans-serif;
  --weight-heading: 400;
  --tracking-heading: 0;
  --text-hero: clamp(2.5rem, 6vw, 4.5rem);
}
```

# 4. Layout

| Região | Padrão observado | Especificação E/P |
|---|---|---|
| Cabeçalho 1 | Marca esquerda, links centro/direita, CTA e carrinho à direita | Uma linha; altura 64–80 px |
| Cabeçalho 2 | Logo pequeno à esquerda, quatro links centrais, ícones à direita | Uma linha; altura 72–88 px |
| Cabeçalho 3 | Faixa amarela, logo circular sobreposto à borda inferior | Altura 64–80 px; sobreposição controlada |
| Hero 1 | Texto à esquerda; produto ocupa cerca de 60% da largura; confiança embaixo | Grid 40% / 60%; fundo laranja com base escura |
| Hero 2 | Título e CTA à esquerda; produto flutuante à direita; miniaturas abaixo do texto | Grid próximo de 52% / 48%; imagem pode exceder seu quadro |
| Hero 3 | Texto à esquerda e produto à direita, sobre vermelho | Grid 50% / 50%; separador com ponta triangular abaixo |
| Categorias 3 | Três cards coloridos com imagem, rótulo e ponta inferior | Três colunas iguais; gap 24 px |
| Produtos 3 | Três cards claros, foto acima e informações abaixo | Três colunas iguais; gap 24 px |
| Promoções 3 | Card de entrega largo e card de bebida estreito | Grid 2fr / 1fr; gap 24 px |

**Proporções da composição:** margens laterais aproximadas de 6–7% nos temas 1/2 e 12–13% no tema 3. São proporções das imagens, não breakpoints comprovados. Na referência 3, categorias e produtos compartilham alinhamentos verticais; o bloco inferior mantém a mesma largura total.

**Grid proposto:** container central de até 1200 px; hero em duas colunas; catálogo em três. Um grid de 12 colunas pode auxiliar o desenvolvimento, mas não é comprovado pelas imagens. Espaçamento entre seções: 32–64 px; padding de cards: 16–24 px; gap entre texto e CTA: 24–32 px.

# 5. Componentes

| Componente | Anatomia e variantes observadas | Estados e implementação |
|---|---|---|
| Botão principal | Tema 1: laranja, cantos arredondados; tema 2: laranja com brilho discreto; tema 3: amarelo com texto escuro | Hover/pressed/foco/desabilitado: P; mínimo 44 px de altura |
| Botão secundário | Tema 1: superfície marrom escura; tema 2: link laranja sem caixa | Preservar a diferença por tema; não aplicar contorno genérico |
| Navegação | Links em linha; `Home` laranja no tema 2 | Ativo: `aria-current="page"`; hover com sublinhado ou mudança de cor: P |
| Ação por ícone | Carrinho, conta, busca e favorito; principalmente contornos claros/escuros | Nome acessível, área 44 × 44 px; badge numérico quando real |
| Badge | Selo de destaque no hero 1; pequenos selos vermelhos nos produtos 3 | Texto curto e legível; significado dos selos do catálogo não identificável |
| Confiança | Três itens compactos com ícone, título e subtítulo no tema 1 | Separadores verticais leves; empilhar quando faltar largura |
| Miniatura | Quatro imagens quadradas no tema 2; borda fina e raio pequeno | Seleção com borda laranja e indicador triangular; teclado e estado acessível: P |
| Categoria | Vermelho ou amarelo, produto central, rótulo forte e ponta inferior | Se for filtro, usar botão e estado selecionado explícito; P |
| Card de produto | Foto em fundo creme, bloco branco com nome, descrição, preço e pequeno CTA amarelo | Área da imagem consistente; CTA com alvo de toque ampliado |
| Card promocional | Entrega: fundo bege, pessoa/scooter e lista; bebida: fundo vermelho | Preservar proporção 2:1 das colunas em desktop |
| Input | Não aparece | P: label externo, fundo claro, borda 1 px, altura ≥44 px, raio 10 px; foco e erro por texto/ícone |
| Modal | Não aparece | P: painel creme no catálogo ou escuro no tema 2; raio 16 px; padding 24 px; overlay preto 60% |

**Modais propostos:** fechar por botão nomeado e Escape; manter foco dentro; devolver foco ao acionador; usar título associado; rolagem interna se necessário. Nenhum modal é inferido como parte do layout original.

```css
.button {
  min-height: var(--control-height);
  padding: .75rem 1.5rem;
  border: 0;
  border-radius: var(--radius-md);
  background: var(--color-action);
  color: var(--color-on-action);
  font: 700 var(--text-sm)/1.2 var(--font-body);
  cursor: pointer;
  transition: background-color var(--duration) var(--ease);
}
.button:hover { background: var(--color-action-hover); }
.button:active { background: var(--color-action-pressed); }
.button:disabled { opacity: .5; cursor: not-allowed; }
.button:disabled:hover { background: var(--color-action); }
:where(a, button, input, select, textarea):focus-visible {
  outline: var(--focus-width) solid var(--color-focus);
  outline-offset: 4px;
}
.product-card {
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
}
.product-card__media { aspect-ratio: 1.1; }
.product-card__image {
  width: 100%; height: 100%; object-fit: contain;
}
.product-card__body { padding: var(--space-4); }
.field__input {
  width: 100%; min-height: var(--control-height);
  padding: .75rem 1rem;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface); color: var(--color-text);
  font: inherit;
}
.field__input[aria-invalid="true"] { border-color: var(--color-error); }
```

# 6. Responsividade

As referências exibem composições desktop. A imagem 3 é uma captura vertical de página com três colunas, não evidência de uma versão mobile. Os comportamentos abaixo são P, mantendo a direção visual observada.

| Faixa proposta | Hero | Navegação | Catálogo e promoções |
|---|---|---|---|
| Mobile · abaixo de 640 px | Texto, CTA e produto em coluna; imagem sem sobrepor o texto | Logo, carrinho e botão de menu; links em painel acessível | Uma coluna; categorias podem usar faixa rolável; promoções empilhadas |
| Tablet · 640–1023 px | Duas colunas apenas se texto e imagem couberem; caso contrário manter pilha | Menu compacto conforme espaço disponível | Dois produtos por linha; promoções empilhadas |
| Desktop · a partir de 1024 px | Duas colunas com as proporções da seção 4 | Links completos e ações à direita | Três produtos; promoções em 2fr / 1fr |

```css
.container {
  width: min(calc(100% - 2 * var(--gutter)), var(--container));
  margin-inline: auto;
}
.hero__grid, .product-grid, .promo-grid {
  display: grid; gap: var(--space-5);
  grid-template-columns: minmax(0, 1fr);
}
.hero__title {
  font: var(--weight-heading) var(--text-hero)/var(--leading-heading)
    var(--font-display);
  letter-spacing: var(--tracking-heading);
}
.hero__image { display: block; width: 100%; height: auto; }
@media (min-width: 40rem) {
  .product-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 64rem) {
  .hero__grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
  [data-theme="warm"] .hero__grid {
    grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  }
  .product-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .promo-grid { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition: none !important;
    scroll-behavior: auto !important;
  }
}
```

- Não reduzir o desktop inteiro para caber no celular.
- Conter respingos e elementos decorativos sem gerar rolagem horizontal.
- Permitir quebra nos CTAs e nos itens de confiança; não fixar altura do hero com texto variável.
- As miniaturas devem permanecer acessíveis por teclado mesmo em faixa rolável.

# 7. Usabilidade e acessibilidade

| Critério | Aplicação |
|---|---|
| Contraste textual | Validar pelo menos 4,5:1 para texto comum e 3:1 para texto grande |
| Risco observado | Branco sobre laranja nos CTAs 1/2 e laranja sobre fundo quente no título 1 podem falhar; avaliar a cor local do gradiente |
| Ajuste proposto | Texto escuro nos CTAs laranja/amarelo; no título 1, escurecer o fundo atrás do destaque ou ajustar a cor do texto |
| Área de toque | Adotar 44 × 44 px; os pequenos CTAs e ícones do catálogo precisam de área interativa maior que sua aparência |
| Foco | Outline de 3 px com 4 px de offset; escolher cor contrastante com a superfície local |
| Hierarquia | Um H1, H2 por seção, H3 para nomes de produto; preço destacado e descrição secundária |
| Informação de estado | Seleção e erro também indicados por texto, ícone ou forma, além da cor |
| Imagens | Produto com alt descritivo; respingos, folhas e contornos decorativos com alt vazio |
| Controles | Ícones com nome acessível; links para navegação e botões para ações |
| Atualizações | Quantidade no carrinho anunciada após ação; evitar anúncios repetitivos |

A captura não comprova conformidade de acessibilidade. Gradientes e imagens exigem validação no contexto real, incluindo foco, zoom e conteúdo final.

# 8. Direção de imagens

| Referência | Estilo | Tratamento | Enquadramento e uso |
|---|---|---|---|
| 1 | Hambúrguer muito próximo, ingredientes espessos, brilho e textura intensos | Luz quente, contraste alto, sombra inferior; produto recortado sobre laranja | Produto dominante à direita, ocupando quase toda a altura do hero |
| 2 | Produto suspenso com respingos de molho e partículas | Fundo quase preto, halo discreto, iluminação dramática | Composição vertical à direita; preservar respingos, evitar cortes no pão |
| 3 | Produtos isolados e centralizados; scooter/pessoa no bloco de entrega | Fundo vermelho, amarelo ou creme; sombras de contato suaves | Hero horizontal; fotos de catálogo próximas do quadrado; bebida em card vertical |

- A origem fotográfica ou sintética não pode ser comprovada pelas capturas.
- Usar recortes com transparência para composição sobre os fundos; AVIF/WebP para fotos opacas quando adequado.
- Manter luz, escala e altura aparente dos produtos consistentes no catálogo.
- Preservar textura do pão, queijo, carne e vegetais; evitar filtros frios e saturação que apague detalhes.
- Proporções propostas: hero 4:3 ou recorte livre; miniaturas 1:1; mídia de produto aproximadamente 1.1:1; bebida em composição vertical.
- Ícones observados: traço simples, monocromáticos, com detalhes alimentares no tema 1. Padronizar família, espessura e tamanho de 20–24 px; não misturar emoji e SVG no mesmo conjunto funcional.
- Os efeitos de levitação são composição visual estática; as imagens não comprovam animações.

# 9. Regras de implementação

- Aplicar um tema por página com `data-theme="warm|dark|catalog"`; reservar misturas para decisões explícitas.
- Usar tokens semânticos: `--color-action`, `--color-surface`, `--color-muted`; componentes não devem repetir HEX soltos.
- Usar classes de componente com elementos: `.hero__title`, `.product-card__price`, `.nav__link`; modificadores como `.button--secondary`.
- Preservar os traços específicos: produto grande no hero, contraste cromático forte, títulos pesados, catálogo alinhado, miniaturas contornadas no tema escuro.
- Definir dimensões intrínsecas das imagens; carregar o produto principal prioritariamente e usar lazy loading abaixo da dobra.
- Evitar alturas fixas para textos e cards; manter preço e CTA alinhados por layout flex/grid, sem espaços artificiais.
- Criar pontas triangulares das categorias/separadores com pseudo-elementos; mantê-las decorativas e fora da área de texto.
- Não inventar glassmorphism, gradientes roxos, bordas em todos os blocos, sombras fortes no catálogo ou raios exagerados.
- Não copiar como conteúdo os textos deformados das referências; revisar nomes, moeda, preços e chamadas para ação.
- Não afirmar que fontes, medidas, breakpoints ou estados propostos pertencem ao projeto original.
- Validar em 360, 390, 768, 1024 e 1440 px, com teclado, zoom de 200%, nomes longos e imagens ausentes.

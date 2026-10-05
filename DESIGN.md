# Design System — Will Sanduíches

## Direção

**Cozinha aberta / passa-pratos editorial.** A interface mostra o cardápio como uma cozinha bem organizada: títulos grandes funcionam como chamadas, linhas e etiquetas orientam o olhar e cada produto ocupa uma ficha clara. O acabamento é contemporâneo, acolhedor e honesto.

## Princípios visuais

- Creme domina a página; carvão estrutura títulos, navegação e rodapé.
- Terracota conduz ações principais; oliva identifica categorias e pequenos estados.
- Tipografia de display condensada e pesada para títulos; sans-serif neutra para leitura.
- Fotografias só entram quando forem ativos reais da marca. Até lá, mídias provisórias usam composições abstratas por categoria.
- Linhas finas, cantos discretos e sombras mínimas substituem ornamentos rústicos.

## Tokens

- Carvão: `#24211E`
- Creme: `#F5EFE4`
- Terracota: `#A4472D`
- Areia: `#E5D7C3`
- Oliva: `#525B3D`
- Container máximo: `1200px`
- Raios: 10px, 16px e 24px
- Display: Barlow Condensed
- Texto: Inter

## Sistema de interação

- Busca e categorias permanecem próximas ao início do cardápio.
- O estado ativo é comunicado por forma, contraste e texto, não apenas cor.
- Cards usam rodapé alinhado com preço e ação.
- Movimentos são breves e funcionais; `prefers-reduced-motion` desativa transições e entradas.

## Adaptação

- Desktop: hero em duas colunas e catálogo em três.
- Tablet: catálogo em duas colunas.
- Mobile: fluxo único, filtros em faixa horizontal e navegação em painel acessível.

# Design System — Will Sanduíches

## Direção

**Cozinha aberta / passa-pratos editorial.** A interface funciona como a fachada da marca: o produto ocupa o palco, títulos grandes criam ritmo e composições editoriais conduzem do desejo ao pedido. O acabamento é contemporâneo, acolhedor, premium e honesto.

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

- CTAs de pedido aparecem nos principais momentos de decisão e sempre levam ao delivery externo.
- Produtos em destaque usam composição editorial; fotografias ausentes recebem estados pendentes honestos.
- No mobile, o CTA fixo aparece depois da primeira viewport e respeita a safe area.
- Movimentos são breves e funcionais; `prefers-reduced-motion` desativa transições e entradas.

## Adaptação

- Desktop: hero em duas colunas, produtos em faixas editoriais e amplo espaço negativo.
- Tablet: composições passam para fluxo único sem perder escala visual.
- Mobile: produto grande, texto curto, navegação compacta e pedido sempre acessível.

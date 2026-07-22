---
name: css
description: Guia CSS para cascade, especificidade, flex/grid, tokens tipográficos, layout responsivo e motion. Use when writing or reviewing CSS, layouts, flexbox, grid, design tokens, or responsive styles.
---

# CSS

## Raiz

CSS aplica apresentação em cascata sobre o box model. Controle especificidade com seletores rasos e tokens; layout 1D com Flex, 2D com Grid. Mobile-first, motion acessível. Tailwind utilities → `tailwind`; contraste → `ui`.

## Como trabalhar

1. Identifique: cascade, layout, tokens ou responsivo.
2. Leia a reference do mapa.
3. Use tokens do repo antes de valores soltos.
4. Valide contraste e touch targets.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Box model, unidades, camadas | [references/raiz.md](references/raiz.md) |
| Especificidade, @layer | [references/cascade-especificidade.md](references/cascade-especificidade.md) |
| Flexbox, Grid, overflow | [references/layout-flex-grid.md](references/layout-flex-grid.md) |
| Tokens, tipografia, fonts | [references/tipografia-tokens.md](references/tipografia-tokens.md) |
| Breakpoints, motion, touch | [references/responsivo-motion.md](references/responsivo-motion.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Tokens em vez de magic numbers
- [ ] Seletores de baixa especificidade
- [ ] min-width: 0 em flex text children
- [ ] prefers-reduced-motion

## Anti-padrões rápidos

- !important para vencer tudo
- float layout
- 100vh sem dvh em mobile
- Hover-only sem touch fallback

---
name: tailwind
description: Guia Tailwind CSS para tokens, config, utilities, variants responsivos, composição com cn() e focus a11y. Use when writing Tailwind classes, tailwind.config, @apply, dark mode, or utility-first styling.
---

# Tailwind CSS

## Raiz

Utility-first: tokens no config, composição no markup. Extraia componente quando padrão repete; use `cn()` + merge. Mobile-first breakpoints; focus-visible obrigatório. CSS profundo → `css`; contraste → `ui`.

## Como trabalhar

1. Identifique: token, composição, responsive ou a11y.
2. Leia reference do mapa.
3. Prefira semantic tokens sobre hex arbitrário.
4. Extraia componente após 3 repetições.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Utility-first, Preflight, @apply | [references/raiz.md](references/raiz.md) |
| tailwind.config, CSS variables | [references/tokens-config.md](references/tokens-config.md) |
| cn(), group/peer, arbitrary | [references/utilities-composicao.md](references/utilities-composicao.md) |
| breakpoints, dark, data-* | [references/variants-responsive.md](references/variants-responsive.md) |
| focus-visible, sr-only, motion | [references/a11y-focus.md](references/a11y-focus.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Tokens semânticos no config
- [ ] content globs corretos
- [ ] focus-visible em interativos
- [ ] Componente se classes repetem

## Anti-padrões rápidos

- bg-[#hex] everywhere
- outline-none global
- Class string gigante copy-paste
- content path faltando no monorepo

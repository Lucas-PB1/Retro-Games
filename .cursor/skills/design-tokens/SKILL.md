---
name: design-tokens
description: Guia genérico de design tokens — cor semântica, espaçamento, tipografia, tema claro/escuro e CSS variables. Use when defining design tokens, theme variables, spacing scale, semantic colors, or design system foundations — framework-agnostic.
---

# Design Tokens

## Raiz

Tokens são a **fonte da verdade visual**: cor, espaço, tipo, raio, sombra, motion. Separe **primitivos** ( Paleta ) de **semânticos** (`color-danger`, `space-md`). Genérico para CSS variables, Tailwind theme, Style Dictionary — use o mecanismo do projeto.

## Como trabalhar

1. Identifique se o problema é token novo, inconsistência ou tema.
2. Leia a reference do subproblema.
3. Não hardcode valores mágicos se o DS já tem escala.
4. Implementação → `css` / `tailwind`; hierarquia → `ui`.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Modelo mental tokens | [references/raiz.md](references/raiz.md) |
| Primitivos vs semânticos | [references/primitivos-semanticos.md](references/primitivos-semanticos.md) |
| Cor e tema | [references/cor-tema.md](references/cor-tema.md) |
| Espaço, tipo, raio | [references/espaco-tipo.md](references/espaco-tipo.md) |
| Naming e camadas | [references/naming.md](references/naming.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Semântico na UI; primitivo só na definição do tema
- [ ] Escala de espaço/tipo usada (não valores soltos)
- [ ] Contraste validado nos pares semânticos
- [ ] Dark/light só se o produto já tiver tema

## Anti-padrões rápidos

- `#ff0000` no componente
- 17 tons de cinza sem escala
- Token com nome de componente (`button-blue-2`)

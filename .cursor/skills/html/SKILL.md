---
name: html
description: Guia HTML para semântica, landmarks, formulários acessíveis, ARIA e mídia responsiva. Use when writing HTML, semantic markup, forms, accessibility, ARIA attributes, or document structure.
---

# HTML

## Raiz

HTML estrutura significado — tags certas para browsers, SEO e leitores de tela. Um main, headings lógicos, labels em forms, ARIA só quando nativo não basta. Estilo → `css`/`tailwind`; UX → `ux`.

## Como trabalhar

1. Identifique: semântica, form, a11y ou mídia.
2. Leia a reference do mapa.
3. Prefira elemento nativo antes de ARIA.
4. Teste keyboard + screen reader em widgets custom.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Documento, semântica base | [references/raiz.md](references/raiz.md) |
| main, nav, headings, links | [references/semantica-landmarks.md](references/semantica-landmarks.md) |
| labels, validation, autocomplete | [references/formularios.md](references/formularios.md) |
| ARIA, focus, live regions | [references/acessibilidade-aria.md](references/acessibilidade-aria.md) |
| img, video, responsive | [references/midia.md](references/midia.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] lang e title corretos
- [ ] Um main; headings sem pulos
- [ ] Input com label
- [ ] Focus visible; alt em imagens

## Anti-padrões rápidos

- div onclick em vez de button
- placeholder como label
- role quando tag nativa existe
- Múltiplos main

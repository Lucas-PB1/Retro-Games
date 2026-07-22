---
name: ui
description: Guia UI para hierarquia visual, tipografia, espaçamento, estados de componentes e contraste de cor. Use when designing interfaces, component states, visual hierarchy, spacing systems, or color accessibility.
---

# UI

## Raiz

UI comunica prioridade e estado via **hierarquia, tokens e affordance**. Sistema > tela isolada; estados completos (loading, error, disabled). Contraste WCAG AA. Implementação → `tailwind`/`css`; fluxo → `ux`.

## Como trabalhar

1. Identifique componente ou página e estados necessários.
2. Leia reference de hierarquia, tipo, estados ou cor.
3. Aplique tokens do design system do repo.
4. Valide contraste e focus-visible.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Design system, affordance | [references/raiz.md](references/raiz.md) |
| Focal point, Gestalt, scan | [references/hierarquia-visual.md](references/hierarquia-visual.md) |
| Escala tipo, 8px grid | [references/tipografia-espaco.md](references/tipografia-espaco.md) |
| hover, focus, loading, error | [references/estados-componentes.md](references/estados-componentes.md) |
| WCAG contrast, tokens cor | [references/cor-contraste.md](references/cor-contraste.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Hierarquia clara; uma primary
- [ ] Estados: focus, disabled, loading, error
- [ ] Contraste AA no body text
- [ ] Estado não só por cor

## Anti-padrões rápidos

- Múltiplos CTAs primários
- Placeholder como label visual
- Disabled ilegível
- Cor sem ícone/texto

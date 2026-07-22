---
name: ux
description: Guia UX para fluxos de tarefa, heurísticas Nielsen, feedback de erros e acessibilidade de uso. Use when designing user flows, forms, error messages, empty states, or evaluating product usability.
---

# UX

## Raiz

UX mede quão bem o usuário **completa tarefas** — fluxo, fricção, feedback e recuperação de erro. Heurísticas guiam; teste com keyboard e cenários reais. Visual → `ui`; ARIA técnico → `html`.

## Como trabalhar

1. Identifique a tarefa principal do usuário.
2. Leia reference de fluxo, heurística ou feedback conforme o gap.
3. Prototipe estados: empty, loading, error, success.
4. Valide a11y de uso, não só pixels.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Job to be done, carga cognitiva | [references/raiz.md](references/raiz.md) |
| Wizard, empty state, fricção | [references/tarefa-fluxo.md](references/tarefa-fluxo.md) |
| Nielsen, Hick, Fitts | [references/heuristicas.md](references/heuristicas.md) |
| Erros, toasts, loading | [references/feedback-erros.md](references/feedback-erros.md) |
| Keyboard, contraste, inclusão | [references/acessibilidade-uso.md](references/acessibilidade-uso.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Tarefa principal evidente
- [ ] Erro diz como corrigir
- [ ] Loading impede double submit
- [ ] Fluxo keyboard ok

## Anti-padrões rápidos

- Feature dump
- Confirm shaming
- Erro genérico 400
- Hover-only crítico

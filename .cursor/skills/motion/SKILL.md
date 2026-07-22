---
name: motion
description: Guia genérico de motion para UI — princípios, reduced-motion, CSS vs JS, coreografia e microinterações. Use when adding animation, transitions, motion design, framer-motion, CSS keyframes, enter/exit, or prefers-reduced-motion — framework-agnostic.
---

# Motion

## Raiz

Motion reforça **causa → efeito** e hierarquia — não enfeita. Prefira pouco movimento com intenção. Sempre respeite `prefers-reduced-motion`. Genérico: CSS, WAAPI ou lib do projeto (Framer, Motion One, GSAP…) — siga o que o repo já usa.

## Como trabalhar

1. Defina o propósito (feedback, orientação, continuidade) — se nenhum, não anime.
2. Leia só a reference do subproblema.
3. Implemente com a stack de motion do projeto; senão CSS primeiro.
4. Some `ui` (hierarquia) e `ux` (fricção/feedback) se couber.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Quando animar, princípios | [references/raiz.md](references/raiz.md) |
| Duração, easing, distância | [references/timing-easing.md](references/timing-easing.md) |
| Reduced motion / a11y | [references/reduced-motion.md](references/reduced-motion.md) |
| CSS vs JS / libs | [references/css-vs-js.md](references/css-vs-js.md) |
| Enter/exit, sequências | [references/coreografia.md](references/coreografia.md) |
| Hover, press, loading | [references/microinteracoes.md](references/microinteracoes.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Propósito claro (não decoração vazia)
- [ ] `prefers-reduced-motion` tratado
- [ ] Duração curta em UI (≈100–300ms feedback; entradas ≤500ms)
- [ ] Não bloqueia tarefa (pode pular/ignorar)

## Anti-padrões rápidos

- Animar tudo que aparece
- Loop infinito sem necessidade
- Ignorar reduced-motion
- Layout thrash (animar `top/left/width` sem necessidade)

---
name: react
description: Guia React para composição, estado, hooks, efeitos e listas. Use when working with React components, hooks, JSX/TSX, useState, useEffect, state management, or client UI built on React.
---

# React

## Raiz

UI = f(state). Descreva a árvore; React reconcilia o DOM. Estado o mais local possível; effects sincronizam mundo externo — não derivam dados. Composição vence prop drilling. Next.js → `nextjs`; tipos → `typescript`.

## Como trabalhar

1. Identifique: estado, effect, composição ou lista.
2. Leia a reference do mapa.
3. Aplique checklist; preserve padrões do repo (Query, RSC, etc.).
4. Tipagem e props → `typescript`.
5. Context API em profundidade → skill `context-api`.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Modelo mental, fluxo render | [references/raiz.md](references/raiz.md) |
| useState, context overview, server state | [references/estado.md](references/estado.md) |
| useEffect, useMemo, custom hooks | [references/hooks-efeitos.md](references/hooks-efeitos.md) |
| children, compound components | [references/composicao.md](references/composicao.md) |
| key, virtualização, memo | [references/listas-keys.md](references/listas-keys.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Estado mínimo; sem mutação direta
- [ ] Effect só para externo; cleanup ok
- [ ] key estável em listas
- [ ] Componente com responsabilidade clara

## Anti-padrões rápidos

- useEffect derivando state de props
- key={index} em lista reordenável
- Context para evitar todo design de props
- memo/useCallback everywhere

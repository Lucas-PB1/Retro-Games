---
name: context-api
description: Guia React Context API para providers, split de contexto, performance e quando NÃO usar Context. Use when working with createContext, useContext, providers, prop drilling alternatives, or React context performance.
---

# React Context API

## Raiz

Context compartilha valor na árvore **sem prop drilling**. Serve para dados de **baixa frequência** (tema, auth session, locale) — não para estado que muda a cada keystroke. Provider no lugar errado ou value instável = re-renders em cascata. Estado local → `react`; server state → Query/RSC.

## Como trabalhar

1. Confirme que Context é o fit (vs props, URL, store, server cache).
2. Leia a reference do mapa.
3. Separe contexts por frequência de update; value estável.
4. Performance e anti-padrões → checklist.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Modelo mental, createContext | [references/raiz.md](references/raiz.md) |
| Provider pattern, composition | [references/provider-pattern.md](references/provider-pattern.md) |
| Split, memo value, selectors | [references/performance-split.md](references/performance-split.md) |
| Quando não usar Context | [references/when-not-context.md](references/when-not-context.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Escopo certo (não “global store” acidental)
- [ ] Value estável ou split por frequência
- [ ] Hook tipado (`useX`) com guard fora do Provider
- [ ] Sem Context para form field / lista filtrada

## Anti-padrões rápidos

- Um mega-Context com tudo
- `value={{ ... }}` novo a cada render sem memo/split
- Context para dados de servidor sem cache strategy
- Substituir bom design de props por Context

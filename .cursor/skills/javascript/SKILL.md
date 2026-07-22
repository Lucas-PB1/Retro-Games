---
name: javascript
description: Guia JavaScript para tipos, coerção, async/event loop, closures, this e módulos ESM. Use when writing JavaScript, promises, async/await, modules, or debugging JS runtime behavior.
---

# JavaScript

## Raiz

JS é single-threaded com event loop — async via promises/microtasks. Use ===, immutability shallow, ESM. Closures capturam scope lexical; arrow fixa this. Tipos estáticos → `typescript`.

## Como trabalhar

1. Identifique: coerção, async, closure/this ou módulos.
2. Leia a reference do mapa.
3. Trate errors em boundaries async.
4. Siga module system do repo.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Primitivos, equality, immutability | [references/raiz.md](references/raiz.md) |
| Coerção, truthy, ?? vs \|\| | [references/tipos-coercao.md](references/tipos-coercao.md) |
| Promises, await, event loop | [references/async-event-loop.md](references/async-event-loop.md) |
| Closures, this, destructuring | [references/closures-this.md](references/closures-this.md) |
| ESM, dynamic import | [references/modulos.md](references/modulos.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] === ; const/let
- [ ] Errors em async tratados
- [ ] Sem floating promises
- [ ] AbortController em fetch longo

## Anti-padrões rápidos

- == e var
- await sequencial desnecessário
- Truthy check em número 0
- Circular module deps

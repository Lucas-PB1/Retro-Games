# JavaScript — modelo mental raiz

## O que importa

JavaScript é **single-threaded** com event loop: call stack + task/microtask queues. Valores têm tipos dinâmicos em runtime; entenda **coerção**, **escopo** e **async** antes de frameworks.

## Valores primitivos vs objetos

Primitivos: string, number, bigint, boolean, undefined, symbol, null.
Objetos: arrays, functions, plain objects — passados por **referência**.

## Equality

```javascript
===  // strict — prefira sempre
==   // coerção — evite
Object.is(NaN, NaN)  // true
```

## Immutability prática

```javascript
const next = { ...user, name: 'Ana' }
const items = [...arr, newItem]
```

## Modules ESM

```javascript
import { fetchData } from './api.js'
export function helper() { }
```

Default no repo: ESM ou bundler — siga convenção existente.

## Fronteiras

| Tópico | Skill |
|---|---|
| Tipos estáticos | `typescript` |
| React | `react` |
| Node/Nest | `nestjs` |

## Anti-padrões

- var em código novo.
- Mutação profunda acidental.
- Callback hell sem async/await.

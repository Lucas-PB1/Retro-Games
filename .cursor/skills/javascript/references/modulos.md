# Módulos JavaScript

## ESM (preferido)

```javascript
// api.js
export async function getUser(id) { ... }
export default class Client { }

// app.js
import Client, { getUser } from './api.js'
```

Extensão `.js` em Node ESM — siga repo.

## Named vs default export

| Named | Default |
|---|---|
| Refactor-friendly | Um export principal |
| Tree-shake claro | Import name arbitrário |

Consistência do repo > preferência pessoal.

## Dynamic import

```javascript
const mod = await import('./heavy.js')
```

Code splitting, lazy routes.

## Circular dependencies

Evite — extraia shared module. Sintoma: undefined no import.

## package.json type

```json
{ "type": "module" }
```

CommonJS legacy: `require` — não misture sem interop consciente.

## Checklist

- [ ] ESM consistente com repo
- [ ] Side effects isolados (init em entry)
- [ ] Barrel exports (index) não re-export tudo pesado
- [ ] Dynamic import para chunks grandes
- [ ] Sem circular deps

## Anti-padrões

- Import de implementation detail de outro feature module.
- Global window pollution.
- require em arquivo ESM sem createRequire.

# Closures e this

## Closures

Função "lembra" lexical scope:

```javascript
function makeCounter() {
  let n = 0
  return () => ++n
}
```

Cuidado com closure em loop var — use let ou forEach.

## this

| Modo | this |
|---|---|
| Method call | obj |
| Plain function | undefined (strict) / global |
| Arrow | lexical (outer) |
| new | new object |
| call/apply/bind | explícito |

```javascript
class Handler {
  constructor() { this.count = 0 }
  handle = () => { this.count++ }  // arrow — estável em React class legacy
}
```

## bind vs arrow

Em React moderno (hooks), arrow fields raramente necessários.

## Destructuring

```javascript
const { name, ...rest } = user
const [first, ...others] = items
```

Default values: `{ role = 'user' }`.

## Spread vs rest

Spread copia/shallow merge; rest agrupa.

## Checklist

- [ ] let/const — nunca var
- [ ] Arrow quando this lexical necessário
- [ ] Closure não captura variável mutável stale sem intenção
- [ ] Destructuring com defaults
- [ ] Shallow copy consciente (nested objects)

## Anti-padrões

- this rebinding confuso — prefira funções puras.
- for (var i...) com async callback.
- JSON.parse(JSON.stringify(obj)) como deep clone universal.

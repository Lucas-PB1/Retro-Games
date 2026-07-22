# Narrowing e unions

## Union types

```typescript
type Result = { ok: true; data: User } | { ok: false; error: string }
```

## Discriminated unions

```typescript
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rect'; w: number; h: number }

function area(s: Shape) {
  switch (s.kind) {
    case 'circle': return Math.PI * s.radius ** 2
    case 'rect': return s.w * s.h
  }
}
```

## Narrowing techniques

| Técnica | Exemplo |
|---|---|
| typeof | `typeof x === 'string'` |
| instanceof | `e instanceof Error` |
| in | `'swim' in animal` |
| Equality | `x === null` |
| Type predicate | `function isUser(x): x is User` |

## unknown vs any

```typescript
function parse(json: string): unknown {
  return JSON.parse(json)
}
// Narrow antes de usar
if (typeof data === 'object' && data !== null && 'id' in data) { ... }
```

Prefira **unknown** em fronteiras externas.

## never e exhaustiveness

```typescript
default: {
  const _exhaustive: never = s
  return _exhaustive
}
```

## Checklist

- [ ] Unions discriminadas para estados mutuamente exclusivos
- [ ] Switch/if narrow antes de acessar campos
- [ ] unknown em JSON/API externa
- [ ] Type guards reutilizáveis
- [ ] never no default de switch exhaustivo

## Anti-padrões

- Cast `as User` sem validação em boundary.
- Optional chaining em cadeia longa mascarando modelagem ruim.
- Boolean flags (`isLoading`, `isError`) em vez de union de estado.

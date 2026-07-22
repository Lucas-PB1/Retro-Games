# Fronteiras runtime

## TypeScript ≠ runtime

Tipos somem no build — **validação na fronteira** para dados externos:

```typescript
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
})
type User = z.infer<typeof UserSchema>

const user = UserSchema.parse(await res.json())
```

## Fronteiras típicas

- fetch / API responses
- localStorage / cookies parse
- env vars
- form input
- WebSocket messages

## Assertion functions

```typescript
function assertIsUser(v: unknown): asserts v is User {
  if (!isUser(v)) throw new Error('Invalid user')
}
```

## satisfies

```typescript
const config = {
  theme: 'dark',
  pages: ['home', 'about'],
} satisfies Config  // narrow sem perder literal types
```

## Brand types (nominal)

```typescript
type UserId = string & { readonly __brand: unique symbol }
```

Evita trocar string IDs incompatíveis.

## Checklist

- [ ] Schema validation (Zod/etc.) em API boundary
- [ ] z.infer como single source of type
- [ ] Env validated at startup
- [ ] Sem `as` cast em JSON.parse result
- [ ] Errors de parse tratados

## Anti-padrões

- Confiar em tipo de `@types` de API desatualizada sem verify.
- Duplicar interface manual + schema divergente.
- parse sem try/catch em user-facing path.

# Conhecimento único

## Tipos de duplicação

| Tipo | Exemplo | Ação |
|---|---|---|
| Conhecimento | Regra validação email 2 lugares | Unificar |
| Acidental | Loop similar por coincidência | Talvez unificar |
| Boilerplate | CRUD repetitivo | Generator/template |
| Arquitetural | Microservices copiando DTO | Platform pattern |

## SSOT patterns

```typescript
// Schema + type
const UserSchema = z.object({ email: z.string().email() })
type User = z.infer<typeof UserSchema>

// Constantes
export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
} as const
```

## Config centralizada

Env validation once at boot — Nest ConfigModule, Next env schema.

## Documentation DRY

Link para fonte — não copie doc inteira em 3 READMEs.

## Tests

Factory/fixtures compartilhados — não copy setup 50x.

## Checklist

- [ ] Regra de negócio em um módulo
- [ ] Types derivados de schema
- [ ] Constants export único
- [ ] Mudança de regra = um PR focal
- [ ] Docs apontam canonical source

## Anti-padrões

- Validar email regex inline em 5 forms.
- Enum TS duplicando string literals DB sem sync.
- README desatualizado copiado de outro service.

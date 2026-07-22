# TypeScript — modelo mental raiz

## O que importa

TypeScript adiciona **tipos estáticos** ao JavaScript — erros em compile-time, não substituto de validação runtime. Tipos descrevem **formas de dados** e **contratos de API**.

## strict mode

Mantenha `"strict": true` — `noImplicitAny`, `strictNullChecks` etc. Desligar strict mascara bugs.

## Inferência

Deixe TS inferir quando óbvio:

```typescript
const items = ['a', 'b']  // string[]
const double = (n: number) => n * 2  // return inferido
```

Anote quando API pública ou inferência falha.

## Tipos vs interfaces

| type | interface |
|---|---|
| Unions, primitives, mapped | Extends, declaration merge |
| Prefer para unions | Prefer para object shapes públicos |

Consistência do repo vence debate.

## Fronteiras

| Tópico | Skill |
|---|---|
| JS runtime | `javascript` |
| React props | `react` |
| Validação runtime | zod/io-ts patterns em fronteiras |

## Anti-padrões

- `any` como escape permanente.
- `@ts-ignore` sem comentário e ticket.
- Tipos duplicando runtime sem single source (DTO vs Zod).

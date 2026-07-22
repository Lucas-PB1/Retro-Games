---
name: typescript
description: Guia TypeScript para narrowing, unions, genéricos, utilitários e validação runtime. Use when writing TypeScript, types, interfaces, generics, type guards, Zod schemas, or strict typing.
---

# TypeScript

## Raiz

TS adiciona contratos estáticos ao JS — some no runtime. strict on; narrow unions; valide dados externos com schema (Zod). unknown nas fronteiras, any proibido como hábito. JS runtime → `javascript`; React props → `react`.

## Como trabalhar

1. Identifique: union/narrowing, generic, boundary ou utility.
2. Leia a reference do mapa.
3. Schema + z.infer para dados externos.
4. Siga strict do tsconfig do repo.

## Mapa de references

| Situação | Arquivo |
|---|---|
| strict, inferência, type vs interface | [references/raiz.md](references/raiz.md) |
| Discriminated unions, type guards | [references/narrowing-unions.md](references/narrowing-unions.md) |
| Generics, constraints, infer | [references/genericos.md](references/genericos.md) |
| Zod, env, JSON boundaries | [references/fronteiras-runtime.md](references/fronteiras-runtime.md) |
| Pick, Omit, mapped types | [references/utilitarios.md](references/utilitarios.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] strict; sem any casual
- [ ] Union discriminada para estados
- [ ] Schema valida input externo
- [ ] Narrow antes de acessar campos

## Anti-padrões rápidos

- as User em JSON.parse
- @ts-ignore silencioso
- Tipos duplicados do schema
- Generic em código single-use

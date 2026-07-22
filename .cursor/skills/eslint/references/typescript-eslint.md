# TypeScript-ESLint

## Setup típico

Use o pacote `typescript-eslint` (flat) alinhado à versão do TS do projeto.

- `recommended` — base
- `strict` / type-checked — só se o repo já usa (precisa `parserOptions.project`)

Type-aware lint é mais lento e exige tsconfig correto — não ligue em monorepo sem seguir o padrão existente.

## Regras frequentes

| Regra | Nota |
|---|---|
| `no-explicit-any` | Prefira `unknown` + narrowing |
| `no-unused-vars` | Use variante TS; `_` prefix |
| `no-floating-promises` | (type-checked) async sem await/void |
| `consistent-type-imports` | Se o projeto já padronizou |

## Next / React

Se existir `eslint-config-next`, preserve-a — é a fonte de verdade do app Next.

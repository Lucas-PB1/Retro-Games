# ESLint + Prettier

## Divisão

| Ferramenta | Responsável |
|---|---|
| Prettier | aspas, vírgulas, wrap, espaços |
| ESLint | bugs, imports unused, hooks, a11y rules, etc. |

## Evitar conflito

1. `eslint-config-prettier` desliga regras ESLint de formatação
2. Opcional: `eslint-plugin-prettier` (muitos times preferem rodar Prettier separado)

Não configure as mesmas decisões nos dois. Skill `prettier` para `.prettierrc`.

## Ordem mental no CI

`tsc` / typecheck → `eslint` → `prettier --check` (ou o script unificado do repo).

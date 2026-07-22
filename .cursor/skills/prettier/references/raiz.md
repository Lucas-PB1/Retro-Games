# Prettier — raiz

## Comando

```bash
pnpm format          # se existir
npx prettier --write .
npx prettier --check .   # CI
```

Use sempre o bin/script do projeto (versão pinada).

## O que Prettier faz

Formata AST → texto. Não remove `any`, não acha bugs, não ordena imports a menos que plugin (ex.: `@trivago/prettier-plugin-sort-imports`) **já esteja** no projeto.

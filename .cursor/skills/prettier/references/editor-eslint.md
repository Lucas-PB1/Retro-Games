# Editor e ESLint

## Editor

Format on save com Prettier como default formatter para JS/TS/JSON/MD — alinhado ao repo.

## ESLint

- Desligue regras de formatação via `eslint-config-prettier`
- Rode Prettier como step separado (preferido) ou plugin se o repo já usa

## Conflito “salva e relinta”

Se ESLint e Prettier brigam no save: falta `eslint-config-prettier` ou extensão errada. Corrija config; não desligue Prettier no meio do feature PR.

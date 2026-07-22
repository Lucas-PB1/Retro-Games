---
name: eslint
description: Guia ESLint para flat config, rules, ignores, TypeScript-ESLint e integração com Prettier. Use when configuring or fixing ESLint, eslint.config, lint errors, or eslint-disable comments.
---

# ESLint

## Raiz

ESLint analisa código por **regras** (bugs, smells, estilo de lógica). Config moderna = **flat config** (`eslint.config.js` / `.mjs`). TypeScript → `@typescript-eslint`. Formatação visual → `prettier` (não duplicate rules de estilo). Sempre respeite a config **do projeto** — não invente plugins.

## Como trabalhar

1. Identifique: setup, regra quebrando, ignore ou conflito com Prettier.
2. Leia a reference do mapa.
3. Prefira corrigir o código a `eslint-disable` largo.
4. Rode o comando de lint do repo antes de declarar “ok”.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Flat config, CLI | [references/raiz.md](references/raiz.md) |
| Rules, severity, overrides | [references/rules-overrides.md](references/rules-overrides.md) |
| TypeScript-ESLint | [references/typescript-eslint.md](references/typescript-eslint.md) |
| Prettier + ESLint | [references/com-prettier.md](references/com-prettier.md) |
| Disable, ignores, CI | [references/disable-ignores.md](references/disable-ignores.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Config do projeto seguida (flat vs legacy)
- [ ] Fix no código > disable amplo
- [ ] Sem regras de formatação conflitantes com Prettier
- [ ] Ignores: `dist`, `.next`, coverage

## Anti-padrões rápidos

- `eslint-disable` no topo do arquivo sem motivo
- Misturar `.eslintrc` e flat config
- “Desligar” `no-explicit-any` globalmente sem acordo do time

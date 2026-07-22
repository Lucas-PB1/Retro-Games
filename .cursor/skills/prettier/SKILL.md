---
name: prettier
description: Guia Prettier para formatação, config, ignore, IDE e convivência com ESLint. Use when configuring Prettier, .prettierrc, format-on-save, or resolving format conflicts.
---

# Prettier

## Raiz

Prettier é **formatador opinionado** — pouca discussão de estilo, muita consistência. Não é linter. Opções mínimas no `.prettierrc`; o resto é default. Conflito com ESLint → skill `eslint` + `eslint-config-prettier`.

## Como trabalhar

1. Respeite o `.prettierrc` / `prettier` key do `package.json` do projeto.
2. Não reformate o monorepo inteiro sem pedido.
3. Ignore: build, lockfiles, generated.
4. Rode o script `format` / `prettier --check` do repo.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Papel, defaults | [references/raiz.md](references/raiz.md) |
| Opções comuns | [references/opcoes.md](references/opcoes.md) |
| ignore e generated | [references/ignore.md](references/ignore.md) |
| Editor + ESLint | [references/editor-eslint.md](references/editor-eslint.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Config do projeto seguida
- [ ] Diff só do que a tarefa pede
- [ ] Sem reformat massivo acidental
- [ ] `.prettierignore` cobre artefatos

## Anti-padrões rápidos

- Reformatar 200 arquivos num PR de bugfix
- Duplicar regras de estilo no ESLint
- Commitar código “só meu estilo” fora do Prettier do time

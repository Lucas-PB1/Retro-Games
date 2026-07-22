---
name: vitest
description: Guia Vitest para unit/integration tests, config, mocks, coverage e UI. Use when writing or fixing Vitest tests, vitest.config, vi.mock, or migrating from Jest to Vitest.
---

# Vitest

## Raiz

Vitest é o test runner alinhado ao Vite (ESM, TS rápido, API familiar ao Jest: `describe`/`it`/`expect`/`vi`). Prefira o padrão **já no repo** (`vitest.config.*`, environment `node` vs `jsdom`). Princípios de teste → skill `testing`; e2e browser → `cypress`.

## Como trabalhar

1. Confirme config e scripts (`pnpm test`).
2. Reference do mapa (mock, async, config).
3. Teste comportamento, não detalhes de implementação.
4. Rode só o arquivo afetado durante o ciclo; suite completa antes de ship.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Setup, CLI, config | [references/raiz.md](references/raiz.md) |
| API, async, expect | [references/api-asserts.md](references/api-asserts.md) |
| vi.mock, fake timers | [references/mocks.md](references/mocks.md) |
| Environment, path aliases | [references/environment.md](references/environment.md) |
| Coverage, CI, watch | [references/coverage-ci.md](references/coverage-ci.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Nome do teste descreve comportamento
- [ ] Arrange–Act–Assert claro
- [ ] Mocks mínimos e restaurados
- [ ] Sem dependência de ordem entre arquivos

## Anti-padrões rápidos

- Snapshot gigante sem necessidade
- Mockar tudo até o teste não testar nada
- `test.only` commitado
- Duplicar setup em vez de `beforeEach` / helpers do projeto

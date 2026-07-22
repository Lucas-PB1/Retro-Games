---
name: testing
description: Guia geral de testes — pirâmide, o que testar, AAA, doubles, flake e estratégia unit/integration/e2e. Use when designing test strategy, writing any tests, reviewing test quality, or choosing unit vs integration vs e2e.
---

# Testing

## Raiz

Testes protegem **comportamento observável** e permitem refactor. Pirâmide: muitos unitários baratos, integration nos contratos, poucos e2e críticos. Ferramenta: `vitest` (unit/integration), `cypress` (e2e). Não meça sucesso só por % coverage.

## Como trabalhar

1. Classifique o risco (regra de negócio, borda HTTP, UI).
2. Escolha o nível certo (mapa abaixo).
3. AAA claro; um assert conceitual por teste (pode ser várias expects do mesmo fato).
4. Delete testes que só espelham implementação.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Pirâmide e ROI | [references/raiz.md](references/raiz.md) |
| O que testar / não testar | [references/o-que-testar.md](references/o-que-testar.md) |
| AAA, nomes, estrutura | [references/estrutura-aaa.md](references/estrutura-aaa.md) |
| Mocks, fakes, stubs | [references/test-doubles.md](references/test-doubles.md) |
| Flake, dados, isolation | [references/isolamento-flake.md](references/isolamento-flake.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Nível certo (unit vs integration vs e2e)
- [ ] Nome descreve comportamento
- [ ] Independente e determinístico
- [ ] Falha legível (mensagem / expect claro)

## Anti-padrões rápidos

- E2E para toda regra de negócio
- Teste acoplado a CSS/structure interna
- Sleeps e ordem entre arquivos
- Coverage theater (tests sem assert útil)

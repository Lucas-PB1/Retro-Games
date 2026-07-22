---
name: clean-code
description: Guia clean code para nomes, funções, comentários, formatação e code smells. Use when reviewing code readability, naming, function size, comments, or refactoring for maintainability.
---

# Clean Code

## Raiz

Código limpo comunica intenção: nomes claros, funções pequenas, comentários só para o "por quê". Boy Scout Rule incremental. Deduplicação → `dry`; design OOP → `solid`.

## Como trabalhar

1. Leia como estranho — nomes e fluxo claros?
2. Abra reference de nomes, funções, smells conforme achado.
3. Refatore em passos pequenos com testes.
4. Formatter do repo sempre.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Mental model, YAGNI | [references/raiz.md](references/raiz.md) |
| Variáveis, métodos, consistência | [references/nomes.md](references/nomes.md) |
| Tamanho, params, command/query | [references/funcoes.md](references/funcoes.md) |
| Why-comments, Prettier | [references/comentarios-formatacao.md](references/comentarios-formatacao.md) |
| Smells, refactor seguro | [references/smells.md](references/smells.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Nomes revelam intenção
- [ ] Funções focadas; early return
- [ ] Comentários explicam why
- [ ] Formatter aplicado

## Anti-padrões rápidos

- data, info, handleData
- Função 200 linhas
- Código comentado morto
- Cleverness sem teste

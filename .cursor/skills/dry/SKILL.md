---
name: dry
description: Guia DRY para single source of truth, quando duplicar é correto e evitar abstração prematura. Use when evaluating code duplication, extracting shared logic, or deciding whether to abstract repeated patterns.
---

# DRY

## Raiz

DRY elimina duplicação de **conhecimento**, não de caracteres. Uma fonte autoritativa por regra. Duplicar ok entre domínios distintos; abstrair após terceira ocorrência. Clean naming → `clean-code`; OCP → `solid`.

## Como trabalhar

1. Pergunte: mesma **razão de mudança**?
2. Se sim → unifique (reference conhecimento único).
3. Se não → duplique conscientemente.
4. Evite abstrair antes do rule of three.

## Mapa de references

| Situação | Arquivo |
|---|---|
| DRY vs dedup mecânica | [references/raiz.md](references/raiz.md) |
| SSOT, schema, constants | [references/conhecimento-unico.md](references/conhecimento-unico.md) |
| Quando copiar é certo | [references/quando-duplicar.md](references/quando-duplicar.md) |
| YAGNI, framework interno | [references/abstracao-prematura.md](references/abstracao-prematura.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Regra repetida → uma fonte
- [ ] z.infer / shared constants
- [ ] Abstração só com 3+ usos
- [ ] Duplicação intencional documentada

## Anti-padrões rápidos

- Utils grab-bag
- Interface com 1 impl forever
- DRY across bounded contexts forçado
- Extract após 2 linhas iguais

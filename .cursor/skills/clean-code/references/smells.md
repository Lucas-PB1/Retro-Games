# Code smells

## Smells comuns

| Smell | Sinal | Ação |
|---|---|---|
| Long method | >40 linhas | Extract |
| Large class | Múltiplas razões change | Split |
| Duplicate code | Copy-paste | Extract — ver `dry` |
| Feature envy | Usa mais dados de outra class | Move method |
| Data clumps | Mesmos 4 params juntos | Introduce object |
| Primitive obsession | string para email, money | Value types |
| Switch statements | Type switch repetido | Polymorphism — ver `solid` |
| Speculative generality | Abstração unused | Delete |

## Refactor seguro

1. Testes cobrindo comportamento (ou characterization test).
2. Small steps — extract, rename, move.
3. Commit frequente.

## When NOT refactor

Código estável raramente tocado com deadline apertado — documente debt; não "limpe" arriscado sem ROI.

## Checklist

- [ ] Smell identificado nomeado
- [ ] Testes antes de extract grande
- [ ] Refactor separado de feature commit
- [ ] Dead code removido
- [ ] Duplicação triangulada (3x rule)

## Anti-padrões

- Big bang rewrite.
- Refactor durante bugfix crítico misturado.
- Abstração para 2 linhas idênticas apenas.

## Skills relacionadas

| Tópico | Skill |
|---|---|
| DRY | `dry` |
| SOLID | `solid` |

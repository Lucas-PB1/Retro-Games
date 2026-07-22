# O que testar

## Priorize

- Regras de negócio e invariants
- Authz / boundaries de tenant
- Parsers, money/date, state machines
- Contratos de API (status + shape) em integration
- Bugs que já voltaram (regressão)

## Evite ou minimize

- Re-testar o framework (Next/React internals)
- Snapshots enormes de UI sem intenção
- Detalhe privado (chamar método privado / inspecionar state interno)
- Duplicar o mesmo fato em unit + e2e sem ganho

## Heurística

Se o teste quebra em todo refactor inocente → está acoplado à implementação. Reescreva para assertir resultado observável.

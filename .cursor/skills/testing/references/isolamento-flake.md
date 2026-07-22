# Isolamento e flake

## Isolamento

- Cada teste prepara o que precisa
- Sem ordem implícita entre arquivos
- Limpe DB/timers/mocks no teardown
- RNG/time: seed ou fake timers

## Causas comuns de flake

- `sleep` / waits arbitrários
- Dependência de clock real / timezone
- Shared mutable state
- Rede real sem stub
- Parallel tests com mesmo recurso

## Dados

Factories determinísticas > “peguei o id 1 do seed” frágil. Em e2e, isole usuário/tenant por teste quando possível.

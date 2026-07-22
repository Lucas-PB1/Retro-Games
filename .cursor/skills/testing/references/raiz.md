# Testing — raiz

## Pirâmide

```
      /\        E2E (poucos, críticos)
     /  \       Integration (contratos, DB/API real ou testcontainer)
    /____\      Unit (domínio, pure functions, use cases)
```

| Nível | Velocidade | Custo | Quando |
|---|---|---|---|
| Unit | Alta | Baixo | Regras, parsing, reducers |
| Integration | Média | Médio | Handler+schema, repo+DB test |
| E2E | Baixa | Alto | Login, checkout, permissões visíveis |

## ROI

Escreva testes onde regressão dói. UI cosmético puro raramente merece e2e. Domínio financeiro/autorização merece unit + integration.

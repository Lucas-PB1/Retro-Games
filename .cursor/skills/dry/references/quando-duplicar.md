# Quando duplicar

## Duplicação é ok quando

1. **Coupling cost > maintenance cost** — unificar forçaria dependência artificial.
2. **Domínios diferentes** — mesma sintaxe, razões de mudança distintas.
3. **Estabilidade** — código congelado raramente muda.
4. **Boundary** — client/server, microservices — alguma duplicação de DTO é tolerável com contract test.

## Exemplo: duplicar é melhor

```typescript
// Billing calculateTax — muda com legislação
// Shipping calculateTax — muda com carrier API
// Unificar em calculateTax(data) ← wrong abstraction
```

## Rule of Three

Espere terceira ocorrência antes de abstrair — vê padrão real.

## WET em protótipo

Spike/descartável — duplicar ok; não carry para prod sem consolidate.

## Fork temporário

Branch feature diverge — merge back quando estabilizar; documente.

## Checklist

- [ ] Duplicação intencional documentada (comment/ticket)
- [ ] Razões de mudança realmente distintas
- [ ] Unificar não cria dependência circular
- [ ] Contract test se DTO duplicado entre services
- [ ] Revisit periódico se duplicação envelheceu

## Anti-padrões

- Abstrair após 2 linhas iguais.
- Shared lib acoplada usada por 2 modules só.
- DRY across bounded contexts via shared DB table hack.

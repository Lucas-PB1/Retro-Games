# Open/Closed Principle (OCP)

## Definição

Aberto para **extensão**, fechado para **modificação** — adicionar behavior sem editar código estável existente.

## Padrões

| Padrão | Uso |
|---|---|
| Strategy | Algoritmos intercambiáveis |
| Plugin registry | Handlers por tipo |
| Decorator | Cross-cutting |

```typescript
interface PaymentProcessor {
  charge(amount: Money): Promise<Receipt>
}

class StripeProcessor implements PaymentProcessor { }
class PixProcessor implements PaymentProcessor { }

function processPayment(p: PaymentProcessor, amount: Money) {
  return p.charge(amount)
}
```

Novo processor = nova class, zero edit em `processPayment`.

## Quando NÃO over-engineer

2 payment methods estáveis — if/switch ok até terceiro.

## Config vs code extension

Feature flags extendem behavior sem redeploy core — complementar, não substituto OCP.

## Checklist

- [ ] Novo variant via new class/handler, não edit switch central
- [ ] Switch/type if limitado e estável
- [ ] Registry/map para open set de types
- [ ] Core module testado não muda por new plugin
- [ ] Abstração justificada por extensão real

## Anti-padrões

- AbstractFactory para 2 cases.
- Edit giant switch every sprint.
- Extension via copy-paste fork of core class.

## Skills relacionadas

| Tópico | Skill |
|---|---|
| Premature abstraction | `dry` |

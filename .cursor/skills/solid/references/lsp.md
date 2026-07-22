# Liskov Substitution Principle (LSP)

## Definição

Subtipos devem ser **substituíveis** por seus base types sem quebrar correctness — contrato preservado.

## Violações clássicas

```typescript
class Bird { fly() {} }
class Penguin extends Bird {
  fly() { throw new Error("Can't fly") }  // LSP violation
}
```

Prefer composição: `FlyingBird`, `FlightlessBird`.

## Contratos

- Pré-condições não fortalecidas em subtype.
- Pós-condições não enfraquecidas.
- Invariantes mantidas.

## TS practical

Se `Rectangle` com `setWidth` que altera height quebra expectativa de `Square extends Rectangle` — modelagem errada.

## Interfaces honestas

Interface pequena que subtype realmente implementa completamente.

## Checklist

- [ ] Subclass não throw unexpected em métodos base
- [ ] Override respeita semântica do parent
- [ ] Nullable return não mais restritivo que base
- [ ] Testes rodam contra interface type
- [ ] Composição preferida sobre inheritance forçada

## Anti-padrões

- Empty override `return super()` nonsense.
- NotImplementedException em subclass production.
- Inheritance só para reuse de código (use delegation).

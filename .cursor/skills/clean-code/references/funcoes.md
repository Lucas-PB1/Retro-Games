# Funções

## Pequenas e focadas

Uma função → **um nível de abstração**, uma responsabilidade clara.

```typescript
async function placeOrder(cart: Cart, user: User): Promise<Order> {
  validateCart(cart)
  const total = calculateTotal(cart)
  const payment = await chargePayment(user, total)
  return createOrderRecord(cart, user, payment)
}
```

## Parâmetros

Ideal 0–2; >3 considere object parameter:

```typescript
function createUser({ email, name, role }: CreateUserParams) { }
```

Flag arguments (`sendEmail: boolean`) → split funções ou strategy.

## Níveis de abstração

Não misture SQL string building com formatação HTTP na mesma função.

## Command vs Query

- **Query**: retorna valor, sem efeito colateral.
- **Command**: muda estado, void ou ack.

## Error handling

Prefer early return / throw domain errors — evite deep nesting:

```typescript
if (!user) throw new UnauthorizedError()
if (!cart.items.length) throw new EmptyCartError()
```

## Checklist

- [ ] Função cabe na tela (~20 linhas guia)
- [ ] Um nível abstração por função
- [ ] ≤3 params ou object
- [ ] Sem flag params
- [ ] Side effects explícitos no nome (`save`, `send`)

## Anti-padrões

- Função 200 linhas "temporária".
- Boolean trap `render(true, false, true)`.
- Efeito colateral escondido em getter.

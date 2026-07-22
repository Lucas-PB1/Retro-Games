# Cloud Functions Firebase

## Triggers

| Trigger | Uso |
|---|---|
| onDocumentCreated | Side effects pós-write |
| onCall | RPC autenticado do client |
| HTTPS | Webhooks REST |
| Scheduler | Cron jobs |

```typescript
export const onOrderCreated = onDocumentCreated('orders/{id}', async (event) => {
  const data = event.data?.data()
  // send email, update aggregate...
})
```

## Callable functions

```typescript
export const placeOrder = onCall({ enforceAppCheck: true }, async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', '...')
  // lógica privilegiada com Admin SDK
})
```

## Idempotência

Triggers podem reexecutar — use transaction ou doc de dedup.

## Admin SDK

Bypass rules — use para operações privilegiadas nunca expostas ao client.

## Checklist

- [ ] Lógica crítica (pagamento, claims) em Functions
- [ ] enforceAppCheck em callables públicos
- [ ] Timeout e memory adequados
- [ ] Secrets via defineSecret / env
- [ ] Idempotência em triggers

## Anti-padrões

- Function monolítica com toda lógica.
- Admin SDK no client bundle.
- Trigger chain infinita (A updates B triggers A).

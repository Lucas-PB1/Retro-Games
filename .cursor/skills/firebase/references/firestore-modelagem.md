# Firestore — modelagem

## Estrutura

```
/collections/{docId}/subcollections/{docId}
```

Documento = mapa JSON flat-ish; limite 1MB/doc.

## Modelagem por query

Desenhe **queries primeiro**, schema depois — Firestore exige índices compostos para filtros múltiplos.

```typescript
// Query: orders by user, recent first
// Collection: orders { userId, createdAt, total, ... }
// Index: userId ASC, createdAt DESC
const q = query(
  collection(db, 'orders'),
  where('userId', '==', uid),
  orderBy('createdAt', 'desc'),
  limit(20)
)
```

## Relacionamentos

| Padrão | Quando |
|---|---|
| Referência (ID) | Entidade grande, lifecycle independente |
| Embed | Dados pequenos, lidos juntos |
| Denormalize | Read-heavy, tolera eventual consistency |

## Contadores e agregados

Use **Cloud Function** ou `increment()` — não confie em read-modify-write concorrente no client.

## Paginação

```typescript
query(..., startAfter(lastDoc), limit(20))
```

Cursor-based — não offset.

## Checklist

- [ ] Schema orientado às queries do app
- [ ] Índices compostos declarados (firestore.indexes.json)
- [ ] userId/tenantId em todo doc multi-tenant
- [ ] Timestamps com serverTimestamp()
- [ ] Batch writes para updates atômicos multi-doc

## Anti-padrões

- Deep nesting ilimitado ( difícil query cross-collection).
- Array unbounded em documento.
- GET de collection inteira sem limit.
- Mesmo doc escrito por muitos clients (hotspot).

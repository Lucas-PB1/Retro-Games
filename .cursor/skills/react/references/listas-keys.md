# Listas e keys

## Keys estáveis

React usa `key` para identidade entre re-renders:

```tsx
{items.map(item => (
  <Row key={item.id} item={item} />
))}
```

**key={index}** só se lista estática, nunca reordena/filtra.

## Reconciliação

Key errada → state interno "pula" entre rows (input values, animações).

## Listas grandes

| Abordagem | Quando |
|---|---|
| Virtualização (react-window) | Milhares de rows |
| Paginação/infinite scroll | Data remota |
| Memo Row | Row caro de render |

```tsx
const Row = memo(function Row({ item }: { item: Item }) { ... })
```

## Filtro e sort

Ordene/filtre **antes** do map — ou memoize lista processada.

## Checklist

- [ ] key = id estável do domínio
- [ ] Sem index key em listas mutáveis
- [ ] Virtualização se > ~100 rows visíveis pesadas
- [ ] Item component memoizado se perf issue
- [ ] Empty/loading states explícitos

## Anti-padrões

- key={Math.random()} — remount total.
- Inline object/array em props de list item → memo inútil.
- Fetch dentro de map (N+1 client-side).

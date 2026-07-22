# Estado React

## Onde colocar estado

| Escopo | Quando |
|---|---|
| useState local | Só este componente precisa |
| Lifted state | Irmãos compartilham |
| Context | Tema, auth, i18n — baixa frequência de update |
| URL | Shareable, bookmarkable |
| Server cache | React Query, SWR, RSC |

**Regra**: estado o mais baixo possível; suba só quando necessário.

## Estado mínimo

Derive valores em render — não duplique:

```tsx
// ERRADO: fullName no state sincronizado por effect
const fullName = `${first} ${last}`  // CORRETO: derivado
```

## useReducer

Preferir quando transições são complexas ou interdependentes:

```tsx
const [state, dispatch] = useReducer(reducer, initialState)
```

## Context performance

Split contexts por frequência de update. Memoize value ou passe dispatch estável.

## Server state

Não duplique dados do servidor no useState sem estratégia:

```tsx
const { data, isLoading } = useQuery({ queryKey: ['orders'], queryFn: fetchOrders })
```

## Checklist

- [ ] Estado mínimo; derivados calculados no render
- [ ] Lift só quando irmãos precisam
- [ ] Context para cross-cutting, não para todo prop
- [ ] Server data via cache library ou RSC
- [ ] Imutabilidade em updates

## Anti-padrões

- useEffect para sincronizar state derivado.
- Context com objeto novo a cada render sem memo.
- Duplicar server payload em local state "por conveniência".
- Prop drilling 8 níveis sem composição (children/slots).

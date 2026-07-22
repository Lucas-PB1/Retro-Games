# Hooks e efeitos

## Rules of Hooks

- Só no top level — não em if/loop.
- Só em function components ou custom hooks.

## useEffect — sincronização externa

Use para: fetch com deps, subscriptions, timers, integração DOM/third-party.

**Não use** para derivar state de props (calcule no render).

```tsx
useEffect(() => {
  const sub = api.subscribe(id, handler)
  return () => sub.unsubscribe()  // cleanup
}, [id])
```

## Dependências

ESLint `exhaustive-deps` é guia — corrija deps, não silencie sem motivo.

## useMemo / useCallback

Só quando há custo mensurável ou referência estável para memo child:

```tsx
const sorted = useMemo(() => items.sort(...), [items])
const onSubmit = useCallback((data) => ..., [dep])
```

Premature memoization adiciona complexidade.

## Custom hooks

Extraia lógica reutilizável:

```tsx
function useDebounce<T>(value: T, ms: number) { ... }
```

## useRef

Valor mutável sem re-render; referência DOM.

## Checklist

- [ ] Effect com propósito externo claro
- [ ] Cleanup em subscriptions/timers
- [ ] Deps completas e corretas
- [ ] Sem effect para derived state
- [ ] memo/useCallback só com evidência

## Anti-padrões

- Effect vazio "para montar".
- Fetch sem cancel/ignore stale (AbortController).
- useCallback em todo handler "por padrão".
- setState em effect sem deps → loop infinito.

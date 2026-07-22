# Performance e split

## Split por frequência

Separe o que muda junto:

| Context | Frequência típica |
|---|---|
| Theme / locale | Rara |
| Auth user | Baixa |
| UI ephemeral (sidebar open) | Alta — considere state local ou store |

Dois contexts: `UserContext` + `UserDispatchContext` (ou actions estáveis) evita re-render em quem só dispara ações.

## Value estável

```tsx
// Ruim: objeto novo todo render do Provider
<Ctx.Provider value={{ user, setUser }}>

// Melhor: memo ou state+dispatch separados
const value = useMemo(() => ({ user }), [user])
```

`useCallback`/`useMemo` só quando o split ainda re-renderiza demais — meça antes de memoizar tudo.

## React 19 / use

Onde o projeto usa `use(Context)`, preserve o mesmo contrato de Provider. Não misture padrões sem alinhar ao repo.

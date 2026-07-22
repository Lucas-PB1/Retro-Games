# Context API — raiz

## API mínima

```tsx
const ThemeContext = createContext<Theme | null>(null)

function ThemeProvider({ children, theme }: { children: React.ReactNode; theme: Theme }) {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider")
  return ctx
}
```

## Semântica

- Consumers re-renderizam quando o **value** do Provider muda (Object.is).
- Filho não-consumer **não** evita re-render dos netos consumers se o value mudou.
- Default do `createContext` só vale fora de Provider — prefira `null` + guard no hook.

## Colocação do Provider

Coloque o Provider no **menor ancestral comum** dos consumers — não no root “por precaução”.

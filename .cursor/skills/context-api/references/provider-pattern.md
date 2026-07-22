# Provider pattern

## Um concern por Provider

```tsx
<AuthProvider>
  <ThemeProvider>
    <LocaleProvider>{children}</LocaleProvider>
  </ThemeProvider>
</AuthProvider>
```

Compose Providers; não funda auth+tema+carrinho num único value.

## Hook de domínio

Exporte `useAuth`, `useTheme` — nunca force `useContext(X)` espalhado. Guard claro fora do Provider.

## Composition com children

Provider que só passa value estático pode ser thin. Se o Provider gerencia state interno, mantenha a API pública pequena (`login`, `logout`, `user`).

## Next.js / RSC

Providers de client state precisam de `"use client"`. Não envolva o app inteiro se só uma rota usa o contexto — coloque no layout da rota.

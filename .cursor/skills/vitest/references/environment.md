# Environment e aliases

## DOM

Componentes React: `environment: 'jsdom'` (ou por arquivo):

```ts
// @vitest-environment jsdom
```

Testing Library: use se o projeto já tiver `@testing-library/react` + cleanup no setup.

## Path aliases

Espelhe o `resolve.alias` / `tsconfig` paths no Vitest/Vite — senão imports quebram só nos testes.

## Node builtins

Preferir APIs ESM. Para CJS legado, siga o padrão do repo (`deps.inline`, etc.) — não chute config nova sem necessidade.

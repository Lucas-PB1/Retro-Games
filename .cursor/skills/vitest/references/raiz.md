# Vitest — raiz

## Scripts típicos

```bash
pnpm test           # vitest run (CI) ou watch — veja package.json
pnpm test -- path/to/file.test.ts
```

## Config

`vitest.config.ts` / `vite.config.ts` com `test: { ... }`. Respeite:

- `environment`: `node` (default backend) vs `jsdom`/`happy-dom` (DOM)
- `globals`: se `true`, não importe `describe`/`it` — siga o repo
- `setupFiles`: matchers, cleanup

## Estrutura de arquivos

| Padrão | Exemplo |
|---|---|
| Colocado | `foo.ts` + `foo.test.ts` |
| Pasta | `tests/` ou `__tests__/` |

Siga o que o projeto já usa. Extensões: `.test.ts`, `.spec.ts`.

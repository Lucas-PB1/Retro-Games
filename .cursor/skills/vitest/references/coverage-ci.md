# Coverage e CI

```bash
pnpm test -- --coverage   # se configurado
```

## Coverage

- Provider: `v8` (comum) — veja config do repo
- Thresholds só se o time já impõe; não invente % num PR lateral
- Coverage ≠ qualidade: teste o que importa

## CI

- `vitest run` (não watch) no CI
- Falha em `test.only` / `describe.only` (`allowOnly: false` em CI se configurável)
- Relatórios JUnit só se o pipeline já consome

## Watch local

`vitest` watch para feedback rápido; rode a suite afetada antes do push.

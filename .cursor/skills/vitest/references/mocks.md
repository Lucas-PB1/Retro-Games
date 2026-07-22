# Mocks (vi)

```ts
import { vi, describe, it, expect, beforeEach } from 'vitest'

const send = vi.fn()

vi.mock('./mailer', () => ({
  sendEmail: (...args: unknown[]) => send(...args),
})

beforeEach(() => {
  send.mockClear()
})
```

## Regras

- Mock **bordas** (HTTP, DB, clock), não o SUT inteiro
- `vi.restoreAllMocks()` / clear no `afterEach` se o projeto padronizou
- `vi.useFakeTimers()` + `vi.useRealTimers()` no cleanup

## Spy

```ts
vi.spyOn(api, 'get').mockResolvedValue({ ok: true })
```

Hoisting: `vi.mock` é hoistado — cuidado com variáveis não inicializadas; use `vi.hoisted`.

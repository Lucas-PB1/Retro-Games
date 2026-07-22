# API e asserts

```ts
import { describe, it, expect, beforeEach } from 'vitest'

describe('sum', () => {
  it('adds two numbers', () => {
    expect(sum(1, 2)).toBe(3)
  })
})
```

## Async

```ts
it('resolves', async () => {
  await expect(fetchUser('1')).resolves.toMatchObject({ id: '1' })
})

it('rejects', async () => {
  await expect(fetchUser('')).rejects.toThrow(/invalid/)
})
```

## Expect úteis

`toBe`, `toEqual`, `toMatchObject`, `toHaveBeenCalledWith`, `toThrow`

Prefira `toMatchObject` a igualdade profunda frágil em objetos grandes.

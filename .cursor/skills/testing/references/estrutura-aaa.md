# Estrutura AAA

```ts
it('rejects expired token', async () => {
  // Arrange
  const token = expiredToken()

  // Act
  const result = await auth.verify(token)

  // Assert
  expect(result).toEqual({ ok: false, code: 'EXPIRED' })
})
```

## Nomes

- `it('returns 404 when order is missing')` — comportamento
- Evite `it('works')` / `it('test1')`

## Um comportamento

Vários `expect` ok se validam o **mesmo** resultado. Novos cenários → novos `it`.

## Helpers

Factories/`buildUser()` > copy-paste. Shared `beforeEach` só para o mínimo — excesso esconde o Arrange.

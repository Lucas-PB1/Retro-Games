# Genéricos TypeScript

## Função genérica

```typescript
function first<T>(arr: T[]): T | undefined {
  return arr[0]
}
```

Inferência de T a partir do argumento — evite anotar T manualmente no call site.

## Constraints

```typescript
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b
}
```

## Genéricos em interfaces

```typescript
interface ApiResponse<T> {
  data: T
  meta: { page: number }
}
```

## infer keyword

```typescript
type ElementType<T> = T extends (infer U)[] ? U : never
```

## Quando NÃO genericizar

Se só um tipo concreto existe no repo — YAGNI. Genérico prematuro obscurece.

## React

```typescript
function useLocalStorage<T>(key: string, initial: T) { ... }
```

## Checklist

- [ ] T inferido quando possível
- [ ] extends constraint quando acessa propriedades
- [ ] Nome descritivo (TEntity, não T só)
- [ ] Export types públicos da lib
- [ ] Sem generic em função usada uma vez

## Anti-padrões

- `<T extends any>`.
- 4 type params onde 1 objeto config basta.
- Generic component wrapping só por "flexibilidade futura".

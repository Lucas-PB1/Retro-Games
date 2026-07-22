# Utilitários TypeScript

## Mapped e conditional (uso prático)

```typescript
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type ReadonlyDeep<T> = { readonly [P in keyof T]: ReadonlyDeep<T[P]> }
```

## Built-ins essenciais

| Utility | Uso |
|---|---|
| Partial<T> | Updates PATCH |
| Required<T> | Garantir campos |
| Pick / Omit | Slice de tipo |
| Record<K,V> | Dict |
| Extract / Exclude | Manipular union |
| NonNullable<T> | Remove null/undefined |
| ReturnType / Parameters | Infer de função |

```typescript
type UpdateUser = Partial<Pick<User, 'name' | 'email'>>
type UserKeys = keyof User
```

## const type parameters (TS 5+)

```typescript
function createRoutes<const T extends readonly string[]>(routes: T) { ... }
```

## Template literal types

```typescript
type EventName = `on${Capitalize<string>}`
```

## Checklist

- [ ] Pick/Omit em vez de re-declarar campos
- [ ] ReturnType para wrappers de função
- [ ] Record para maps tipados
- [ ] Utility local documentado se não built-in
- [ ] Evitar tipos ilegíveis > 3 níveis nested

## Anti-padrões

- Recriar Partial manualmente.
- Type gymnastics onde interface simples basta.
- Exportar 20 utility types não usados.

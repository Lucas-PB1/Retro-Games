# Interface Segregation Principle (ISP)

## Definição

Clientes não devem depender de métodos que **não usam** — interfaces pequenas e específicas.

## Fat interface smell

```typescript
interface Worker {
  work(): void
  eat(): void
  sleep(): void
}

class Robot implements Worker {
  eat() { throw new Error('N/A') }  // ISP violation
}
```

Split: `Workable`, `HumanNeeds`.

## TS/API design

```typescript
interface UserReader {
  findById(id: string): Promise<User | null>
}
interface UserWriter {
  create(data: CreateUser): Promise<User>
}
```

Read service só importa Reader.

## NestJS

Provider exports mínimos do module — consumer não vê métodos internos.

## Checklist

- [ ] Interface ≤5 métodos coesos típico
- [ ] Client importa interface mínima
- [ ] Sem stub methods NotImplemented
- [ ] Split quando clients usam subsets distintos
- [ ] Optional methods evitados — split interface

## Anti-padrões

- IUserManagerServiceProvider com 40 métodos.
- Implementação vazia de métodos unused.
- type intersection gigante como "interface".

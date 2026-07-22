# Dependency Inversion Principle (DIP)

## Definição

Módulos high-level não dependem de low-level — ambos dependem de **abstrações**. Abstrações não dependem de detalhes.

## Antes/depois

```typescript
// Violation: high-level depende de Postgres concreto
class OrderService {
  private db = new PostgresClient()
}

// DIP: depende de interface
class OrderService {
  constructor(private orders: OrderRepository) {}
}
```

Infra implementa `OrderRepository`; domain não importa pg.

## DI container

NestJS, Inversify — wiring na composition root.

## Testabilidade

Mock `OrderRepository` em unit test — sem DB.

## Não inverter tudo

Função pura que usa `Math.random` — abstrair só se test determinístico exige.

## Checklist

- [ ] Domain não importa driver/SDK concreto
- [ ] Ports/adapters boundary claro
- [ ] Inject via constructor
- [ ] Composition root único (module)
- [ ] Fake/in-memory adapter para tests

## Anti-padrões

- Import prisma client em every service file.
- Interface com single impl mas 5 indirection layers "for DIP".
- Service locator global `getInstance()`.

## Skills relacionadas

| Tópico | Skill |
|---|---|
| Nest DI | `nestjs` |

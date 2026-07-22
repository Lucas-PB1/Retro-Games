# Single Responsibility Principle (SRP)

## Definição

Um módulo deve ter **uma razão para mudar** — um actor/stakeholder responsável.

## Sinais de violação

- Classe `UserService` com auth, email, billing, avatar upload.
- Mudança em SMTP força deploy de payment code.

## Split por responsabilidade

```typescript
class UserRepository { /* persistence */ }
class UserNotifier { /* email */ }
class RegisterUserUseCase {
  constructor(private repo: UserRepository, private notifier: UserNotifier) {}
}
```

## Granularidade

SRP não significa **uma função por arquivo** — agrupe coesão alta.

## NestJS mapping

Controller (HTTP) ≠ Service (use case) ≠ Repository.

## Checklist

- [ ] Classe/módulo nome descreve uma responsabilidade
- [ ] Mudança externa (SMTP API) isolada
- [ ] Testes focados por módulo
- [ ] File não mistura HTTP + SQL + template email
- [ ] Extract quando segunda razão de mudança clara

## Anti-padrões

- God service 2000 linhas.
- "Utils" com 40 unrelated functions.
- Split artificial one-method classes everywhere.

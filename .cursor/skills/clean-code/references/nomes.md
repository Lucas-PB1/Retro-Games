# Nomes

## Intenção revelada

```typescript
// Ruim
const d = 86400
const data = fetch()

// Bom
const SECONDS_PER_DAY = 86400
const activeUsers = await userRepository.findActive()
```

## Classes e métodos

- Classe: substantivo (`OrderService`, `PaymentGateway`)
- Método: verbo (`calculateTotal`, `sendConfirmation`)
- Boolean: `is`, `has`, `can` (`isValid`, `hasPermission`)

## Evite noise

`UserData`, `Info`, `Manager` sem qualificador — prefira específico.

## Consistência

Um conceito, um termo — não misture `fetch`, `get`, `retrieve` para mesma operação no repo.

## Escopo e tamanho

Variável curta ok em loop `i`; negócio exige nome completo. Funções: verbos + objeto.

## Searchable

Evite constantes mágicas — nomeie e centralize.

## Checklist

- [ ] Nomes pronunciáveis
- [ ] Sem abreviações obscuras
- [ ] Boolean com prefixo is/has/can
- [ ] Mesmo vocabulário do domínio ubíquo
- [ ] Constantes nomeadas vs magic numbers

## Anti-padrões

- Hungarian notation em TS tipado (`strName`).
- Nomes genéricos `handleData`, `process`, `util`.
- Siglas não universalmente conhecidas sem glossário.

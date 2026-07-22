# Abstração prematura

## Sinais

- Parameter object com 12 campos opcionais "future proof".
- Interface com uma implementação há 2 anos.
- Factory/Strategy para um case.
- Hook generic `useEntity` substituindo 2 hooks claros.

## Custo da abstração

Indirection + naming mental + jump to definition. Deve pagar redução de duplicação **real**.

## Evolução incremental

```
duplicate → triplicate → extract function → extract module (if needed)
```

Não pule direto para framework interno.

## YAGNI vs DRY

YAGNI: não construa. DRY: não duplique conhecimento **existente**. Compatíveis — extraia o que já repetiu.

## Framework interno

Só quando 3+ consumidores com mesmo pattern estável — senão copy-modify é mais barato.

## Checklist

- [ ] Abstração tem ≥3 usos concretos
- [ ] API da abstração mais simples que duplicata
- [ ] Nome da abstração reflete domínio, não generic
- [ ] Remover abstração unused (dead abstraction)
- [ ] PR review questiona "precisamos disso agora?"

## Anti-padrões

- BaseClass com 30 protected hooks.
- Config-driven behavior para 2 variants.
- Micro-framework in repo de app produto.

## Skills relacionadas

| Tópico | Skill |
|---|---|
| SOLID OCP | `solid` |
| Clean code smells | `clean-code` |

# Microinterações

## Onde usar

| Gatilho | Motion típico |
|---|---|
| Hover | cor / elevation leve (desktop) |
| Press/active | scale 0.98 ou feedback tátil visual |
| Sucesso | check breve / highlight |
| Erro | shake mínimo ou flash — sem punir |
| Loading | skeleton/spinner; não layout jump |

## Regras

- Hover não é o único indicador (teclado/touch)
- Feedback < 150ms para parecer instantâneo
- Não anime labels de formulário de forma que atrapalhe digitação

## Checklist

- [ ] Estado também visível sem motion
- [ ] Touch: hit target ok (ver `responsive`)
- [ ] Loading não causa CLS agressivo

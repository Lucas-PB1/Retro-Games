# Container queries

## Quando usar

Card/widget que muda em sidebar vs main — independente da viewport.

```css
.card { container-type: inline-size; }
@container (min-width: 24rem) { .card { ... } }
```

## Quando NÃO usar

- Layout de página inteira (viewport media basta)
- Ambiente sem suporte e sem fallback (verifique o target do projeto)

## Checklist

- [ ] `container-type` no pai certo
- [ ] Fallback aceitável se CQ indisponível
- [ ] Não misturar CQ e media sem necessidade

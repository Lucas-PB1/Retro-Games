# Timing e easing

## Durações guia (ajuste ao DS do projeto)

| Tipo | Faixa típica |
|---|---|
| Microfeedback (hover/press) | 80–150ms |
| Estado UI (abrir menu, toggle) | 150–250ms |
| Entrada de painel/modais | 200–400ms |
| Narrativa / hero | raro; só com pedido |

## Easing

- **Ease-out** — entradas / elementos que chegam (desaceleram)
- **Ease-in** — saídas que somem
- **Ease-in-out** — move no lugar (arrastar, pan)
- Evite `linear` em UI orgânica (exceto progresso indeterminado)

## Distância

Pequenos deslocamentos (4–16px) bastam para feedback. Grandes slides cansam.

## Checklist

- [ ] Duração alinhada ao tipo de interação
- [ ] Easing coerente com a família do produto
- [ ] Sem bounce excessivo em apps sérios (salvo brand)

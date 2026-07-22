# Fluido

## Técnicas

- `clamp()` para type/spacing fluidos
- Grid `fr` / `minmax(0, 1fr)` para evitar overflow
- Imagens: `max-width: 100%; height: auto`
- Evite `100vh` problemático — prefira `dvh` se necessário

## Checklist

- [ ] Tipografia não salta bruto entre breakpoints se fluido resolve
- [ ] Containers com largura máxima + padding lateral
- [ ] Overflow controlado (`min-width: 0` em flex filhos)

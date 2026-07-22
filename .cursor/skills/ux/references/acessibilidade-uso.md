# Acessibilidade de uso

## Inclusão além de compliance

WCAG é piso — teste com teclado, zoom 200%, screen reader, contraste.

## Perceivable

- Texto alternativo significativo.
- Não só cor para estado (ícone + label).
- Captions/transcripts.

## Operable

- Tab order lógico.
- Skip links.
- Sem keyboard trap (exceto modal com escape).
- Touch target ≥44px.

## Understandable

- Linguagem clara.
- Comportamento previsível (links abrem mesma tab salvo aviso).
- Labels persistentes.

## Robust

- HTML semântico primeiro → `html`.
- ARIA quando widget custom.

## Motion sensitivity

Respeite `prefers-reduced-motion` — skill `css`.

## Checklist

- [ ] Fluxo completo via keyboard
- [ ] Focus visible
- [ ] Contraste AA mínimo (texto normal 4.5:1)
- [ ] Form labels e errors acessíveis
- [ ] Zoom não quebra layout crítico

## Anti-padrões

- Drag-only sem alternativa keyboard.
- Autoplay distraindo.
- Timeout session sem aviso estendível.
- Hover-only tooltips sem focus equivalent.

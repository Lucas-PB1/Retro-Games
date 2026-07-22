# Estados de componentes

## Estados obrigatórios

| Estado | UI |
|---|---|
| default | Baseline |
| hover | Feedback sutil (desktop) |
| focus-visible | Ring claro — a11y |
| active/pressed | Feedback click |
| disabled | Opacity + cursor + no pointer |
| loading | Spinner/skeleton, disabled interact |
| error | Border/ring vermelho + message |
| empty | Illustration + CTA |

## Botões

```tsx
// Hierarquia: primary > secondary > ghost > destructive
<button disabled={loading}>
  {loading ? <Spinner /> : 'Salvar'}
</button>
```

Uma primary por contexto visual.

## Inputs

Label sempre visível; placeholder complementar. Error below field.

## Selection

Checkbox/radio: hit area grande; selected state óbvio.

## Data display

Skeleton mirrors layout final — evita layout shift.

## Checklist

- [ ] Todos estados desenhados (não só happy path)
- [ ] focus-visible distinto de hover
- [ ] disabled não focusable
- [ ] loading previne duplicate action
- [ ] error + success distinguíveis sem só cor

## Anti-padrões

- opacity: 0.3 disabled ilegível.
- Spinner sem disable click.
- Hover effect em touch-only (ok se não essencial).
- Error só border vermelha sem texto.

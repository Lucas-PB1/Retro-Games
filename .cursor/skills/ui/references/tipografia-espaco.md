# Tipografia e espaço

## Escala tipográfica

Use escala modular (1.125, 1.25, 1.333) — 4–6 tamanhos no sistema:

| Nível | Uso típico |
|---|---|
| xs/sm | Meta, badges |
| base | Body |
| lg/xl | Subhead |
| 2xl–4xl | Títulos |

## Line height

Body 1.5–1.6; headings 1.2–1.3; UI compacto 1.4 max.

## Spacing scale

Base 4px ou 8px grid:

```
4, 8, 12, 16, 24, 32, 48, 64
```

Padding interno de componente consistente (ex: button py-2 px-4).

## Rhythm vertical

Mesmo gap entre sections (`space-y-8`); dentro de card gap menor (`space-y-4`).

## Letter spacing

Títulos uppercase: tracking wider. Body: default.

## Checklist

- [ ] Escala limitada (não 14 tamanhos)
- [ ] 8px grid para spacing
- [ ] line-height por nível
- [ ] max-width texto ~65ch
- [ ] Consistência button/input height

## Anti-padrões

- margin-top arbitrário por elemento (mt-3, mt-7, mt-5 misturados).
- Font-size inline px diferentes por tela sem token.
- Leading tight em parágrafos longos.

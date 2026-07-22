# Tipografia e tokens

## Tokens CSS

Centralize decisões repetíveis:

```css
:root {
  --font-sans: system-ui, sans-serif;
  --text-base: 1rem;
  --leading-normal: 1.5;
  --space-4: 1rem;
  --color-text: #1a1a1a;
  --radius-md: 0.5rem;
}
```

Componentes consomem tokens — não valores mágicos espalhados.

## Escala tipográfica

| Token | Uso |
|---|---|
| text-sm | Captions, meta |
| text-base | Body |
| text-lg/xl | Lead |
| text-2xl+ | Headings |

`line-height` proporcional: headings tighter (1.2), body 1.5–1.6.

## Legibilidade

- **max-width** ~65–75ch para blocos de texto.
- `font-feature-settings` para números tabulares em tabelas.
- Contraste WCAG → skill `ui`.

## font-face

```css
@font-face {
  font-family: 'Brand';
  src: url('/fonts/brand.woff2') format('woff2');
  font-display: swap;
}
```

Subset e woff2; preload font crítica no HTML.

## Dark mode

```css
@media (prefers-color-scheme: dark) { ... }
/* ou */
[data-theme="dark"] { ... }
```

Tokens duplicados ou `color-mix` para derivar.

## Checklist

- [ ] Tokens para cor, space, radius, font
- [ ] rem para font-size (acessibilidade zoom)
- [ ] line-height adequado por nível
- [ ] font-display: swap
- [ ] Contraste validado

## Anti-padrões

- 14px body como mínimo em mobile (prefira 16px).
- 8 famílias de fonte no projeto.
- Cores hardcoded #333 em 200 arquivos.

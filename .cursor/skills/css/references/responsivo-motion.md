# Responsivo e motion

## Mobile-first

Escreva base para mobile; expanda com `min-width`:

```css
.sidebar { display: none; }
@media (min-width: 1024px) {
  .sidebar { display: block; width: 280px; }
}
```

## Breakpoints

Use breakpoints do **design**, não dispositivos específicos. Alinhe com tokens do repo ou Tailwind config.

## Unidades viewport modernas

```css
.hero { min-height: 100dvh; }  /* dynamic viewport — mobile URL bar */
```

## Container queries

```css
.card-grid {
  container-type: inline-size;
}
@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

Componente responsivo independente da page width.

## Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

Animações curtas (<300ms) para feedback UI; evite motion decorativo contínuo.

## Touch targets

Mínimo ~44×44px para controles interativos (WCAG 2.5.5).

## Checklist

- [ ] Mobile-first min-width
- [ ] dvh/svh onde 100vh quebra mobile
- [ ] prefers-reduced-motion respeitado
- [ ] Touch targets adequados
- [ ] Imagens responsive (max-width: 100%)

## Anti-padrões

- Desktop-first com dezenas de max-width overrides.
- Hover-only interactions sem alternativa touch.
- Parallax pesado em mobile.
- breakpoint por device name (iphone, ipad).

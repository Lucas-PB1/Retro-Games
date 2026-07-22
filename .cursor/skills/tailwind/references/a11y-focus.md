# A11y e focus Tailwind

## Focus visible

```html
<button class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
```

Nunca `outline-none` sem substituto.

## Screen reader only

```html
<span class="sr-only">Fechar modal</span>
```

## Contraste

Valide tokens `text-muted` etc. contra background — skill `ui`.

## Motion

```html
<div class="motion-safe:animate-fade motion-reduce:transition-none">
```

## Touch targets

`min-h-11 min-w-11` ou padding equivalente (~44px).

## Skip link pattern

```html
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">
```

## Checklist

- [ ] focus-visible ring em buttons/links
- [ ] sr-only para icon-only buttons
- [ ] motion-reduce respeitado
- [ ] Contraste tokens validado
- [ ] Não remover outline globalmente

## Anti-padrões

- `focus:outline-none` em * selector global.
- Icon button sem aria-label.
- text-xs para body principal.

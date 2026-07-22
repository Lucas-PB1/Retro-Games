# Variants e responsivo

## Breakpoints default

| Prefix | Min width |
|---|---|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

Mobile-first: `md:flex` = flex desde md up.

```html
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
```

## State variants

```
hover: focus: focus-visible: active: disabled:
```

Prefira `focus-visible:` sobre `focus:` para keyboard-only ring.

## dark:

```
class="bg-white dark:bg-gray-900"
```

Ou CSS variables com single class toggle.

## data-* e aria variants (v3.4+)

```
data-[state=open]:animate-in
aria-expanded:rotate-180
```

Radix/shadcn patterns.

## Container queries

```html
<div class="@container">
  <div class="@md:flex-row flex flex-col">
```

## Print

`print:hidden` para nav em impressão.

## Checklist

- [ ] Mobile-first breakpoints
- [ ] focus-visible em interativos
- [ ] dark mode consistente com tokens
- [ ] Container query quando componente, não page
- [ ] disabled: styles

## Anti-padrões

- Desktop-first `max-md:` everywhere.
- hover: como único feedback (touch).
- Breakpoint custom por componente sem alinhar design system.

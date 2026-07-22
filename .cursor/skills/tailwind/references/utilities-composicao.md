# Utilities e composição

## Ordem sugerida (legibilidade)

layout → box → typography → visual → interactive → misc

```
flex items-center gap-2 rounded-lg border px-3 py-2 text-sm
```

## Component extraction

Quando padrão repete 3+ vezes:

```tsx
function Button({ variant = 'primary', className, ...props }) {
  return (
    <button
      className={cn(
        'rounded-md px-4 py-2 font-medium focus-visible:ring-2',
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
```

Use `cn()` / `clsx` + `tailwind-merge` para conflitos.

## Arbitrary values

```
w-[137px]  top-[117px]
```

Só quando token não existe — depois promova a token.

## Group / peer

```html
<div class="group">
  <span class="group-hover:text-primary">...</span>
</div>
<input class="peer" />
<p class="peer-invalid:text-danger">...</p>
```

## @layer components

```css
@layer components {
  .btn { @apply rounded-md px-4 py-2 font-medium; }
}
```

## Checklist

- [ ] Padrão repetido virou componente ou @apply
- [ ] tailwind-merge em className props
- [ ] Arbitrary value justificado
- [ ] group/peer para state sibling
- [ ] Sem duplicate conflicting utilities

## Anti-padrões

- Copy-paste 20 classes em 15 buttons.
- Dynamic class sem safelist quando build purge quebra.
- template string `${active ? 'bg-blue-500' : 'bg-gray-200'}` sem merge.

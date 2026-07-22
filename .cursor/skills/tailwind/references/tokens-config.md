# Tokens e config

## tailwind.config

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#2563eb', foreground: '#fff' },
        surface: 'hsl(var(--surface))',
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      spacing: { 18: '4.5rem' },
    },
  },
}
```

## CSS variables + Tailwind

```css
@layer base {
  :root {
    --surface: 0 0% 100%;
    --primary: 221 83% 53%;
  }
}
```

```html
<div class="bg-surface text-foreground">
```

Dark: `[data-theme=dark]` ou `class` strategy.

## Semantic naming

Prefira `primary`, `muted`, `destructive` sobre `blue-500` espalhado.

## Plugins

`@tailwindcss/forms`, `typography`, `container-queries` — só se usados.

## Content paths

```javascript
content: ['./app/**/*.{tsx,ts}', './components/**/*.{tsx,ts}']
```

Paths errados = purge remove classes usadas.

## Checklist

- [ ] Tokens em extend, não valores mágicos no JSX
- [ ] content globs completos
- [ ] Semantic color names
- [ ] darkMode strategy definida
- [ ] Plugins documentados

## Anti-padrões

- Copiar config gigante de template sem usar metade.
- Hardcode `text-gray-600` em 100 files — use `text-muted`.
- Esquecer content path em monorepo package.

# Mídia HTML

## Imagens responsivas

```html
<img
  src="hero-800.webp"
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Descrição"
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
>
```

`width`/`height` evitam CLS — CSS pode redimensionar.

## picture / art direction

```html
<picture>
  <source media="(min-width: 768px)" srcset="wide.webp">
  <img src="narrow.webp" alt="...">
</picture>
```

## Video / audio

```html
<video controls preload="metadata" poster="thumb.jpg">
  <source src="clip.webm" type="video/webm">
  <track kind="captions" src="captions.vtt" srclang="pt" label="Português">
</video>
```

Legendas para a11y e ambientes silenciosos.

## iframe

```html
<iframe title="Mapa da loja" src="..." loading="lazy"></iframe>
```

`title` obrigatório.

## SVG

Inline para ícones com `aria-hidden="true"` se decorativo; `role="img"` + `aria-label` se significativo.

## Next.js

Use `next/image` — skill `nextjs`.

## Checklist

- [ ] alt apropriado
- [ ] dimensions ou aspect-ratio anti-CLS
- [ ] lazy below fold
- [ ] Captions em video
- [ ] Formato moderno (webp/avif)

## Anti-padrões

- img sem dimensions em layout crítico.
- Autoplay video com som.
- iframe sem title.
- PNG gigante quando WebP basta.

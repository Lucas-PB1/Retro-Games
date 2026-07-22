# Reduced motion

## Obrigatório

Respeitar `prefers-reduced-motion: reduce`:

- Remover / reduzir parallax, autoplay, grandes deslocamentos
- Manter feedback essencial (opacity curta ou troca instantânea de estado)
- Nunca depender só de movimento para transmitir informação

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

(Adapte: preferível reduzir seletivamente ao nuke global se o DS tiver tokens.)

## Em JS / libs

- Ler `matchMedia('(prefers-reduced-motion: reduce)')`
- Desligar `animate` / variants longas; manter estado final

## Checklist

- [ ] Caminho reduced testado
- [ ] Informação não some só porque animação desliga
- [ ] Autoplay de vídeo/carrossel pausável e respeita preferência

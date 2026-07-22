# CSS vs JS / libs

## Preferir CSS quando

- Hover, focus, toggles simples
- Transições de cor/opacity/transform
- Sem orquestração complexa de sequência

## Preferir JS / lib do projeto quando

- Enter/exit com unmount (lista, modal)
- Gestos, drag, scroll-linked (com parcimônia)
- Sequências coordenadas entre vários nós

## Regras genéricas

1. Use a **lib já no repo** (não introduza Framer/GSAP sem pedido).
2. Sem lib: CSS transitions/keyframes ou WAAPI.
3. Anime `transform` e `opacity`; evite layout properties.
4. `will-change` só pontual e temporário.

## Checklist

- [ ] Não adicionou dependência nova sem necessidade
- [ ] Props animáveis baratas
- [ ] Cleanup de listeners/animations ao unmount

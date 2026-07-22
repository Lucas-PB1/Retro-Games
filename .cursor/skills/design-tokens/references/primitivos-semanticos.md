# Primitivos vs semânticos

## Primitivos

Valores crus: `gray-100`, `space-4`, `font-size-14`, `blue-600`.

## Semânticos

Papel no produto: `color-bg-default`, `color-text-muted`, `color-danger`, `space-section`.

## Regra

Componentes consomem **semânticos**. Primitivos só na definição do tema/alias.

## Checklist

- [ ] UI não referencia primitivo de marca diretamente (salvo exceção do DS)
- [ ] Semântico mapeia para primitivo(s)
- [ ] Renomear primitivo não quebra intenção semântica

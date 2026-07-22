# Design tokens — raiz

## O que importa

Tokens permitem mudar o visual do produto **sem caçar valores** no código. Um token = uma decisão de design nomeada.

## Camadas

```
Primitivos (blue-500) → Semânticos (color-action-primary) → Componente (usa semântico)
```

## Quando criar token

- Valor se repete ou representa decisão de marca
- Precisa tematizar (light/dark, white-label)

## Quando NÃO criar

- Uso único sem chance de reaparecer
- Token “por se acaso” antes do padrão existir (ver `dry`)

## Relação

- UI → `ui`
- Motion durations → `motion`
- Tailwind config / CSS vars → `tailwind` / `css`

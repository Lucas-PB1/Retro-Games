# Responsive — raiz

## O que importa

Adapte **estrutura e prioridade** ao viewport/container — não apenas encolha.

## Estratégias

1. **Fluido** — cresce/encolhe sem breakpoint
2. **Breakpoint** — muda layout (1 col → 2 col)
3. **Container** — componente responde ao pai, não à viewport

## Relação

- Tokens → `design-tokens`
- Flex/Grid detalhe → `css`
- Utilities → `tailwind`
- Motion em resize → evitar animar layout o tempo todo (`motion`)

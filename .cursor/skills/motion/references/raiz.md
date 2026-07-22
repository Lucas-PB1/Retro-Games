# Motion — raiz

## O que importa

Movimento comunica: **feedback** (cliquei), **orientação** (de onde veio), **continuidade** (mesmo objeto). Se não comunica, remova.

## Princípios (genéricos)

1. **Intenção** — um motivo por animação
2. **Sutileza** — UI ≠ trailer
3. **Performance** — preferir `transform`/`opacity`
4. **Interrompível** — usuário no controle
5. **Consistência** — mesma família de easing/duração no produto

## Quando NÃO animar

- Conteúdo denso de leitura/dados tabulares críticos
- Preferência reduced-motion
- Primeira paint crítica sem ganho de UX
- Protótipo onde motion atrasa validação

## Relação

- Hierarquia visual → `ui`
- Fluxo/fricção → `ux`
- Implementação CSS → `css` / `tailwind`
- Tokens de duração → `design-tokens`

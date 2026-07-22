# React — modelo mental raiz

## O que importa

React renderiza UI como **função do estado**: `UI = f(state)`. Você descreve a árvore; o reconciler diffa e atualiza o DOM. Componentes são unidades de composição — não classes de estilo.

## Fluxo de render

1. State/props mudam → re-render.
2. Reconciler compara árvore virtual.
3. Commit aplica mudanças no DOM.

Re-renders são baratos se você não propaga mudança desnecessária.

## Componentes funcionais

Padrão atual: função + hooks. Sem lifecycle class-based em código novo.

```tsx
function OrderSummary({ order }: { order: Order }) {
  return <p>Total: {order.total}</p>
}
```

## Unidirecionalidade

Dados descem (props); eventos sobem (callbacks). Estado mutável local ou store — nunca mutar props/state diretamente.

## Fronteiras

| Tópico | Skill |
|---|---|
| Next.js App Router | `nextjs` |
| TypeScript props | `typescript` |
| Tailwind styling | `tailwind` |
| UX patterns | `ux` |

## Anti-padrões

- DOM imperativo onde declarativo basta.
- Estado global para tudo.
- Componente "God" com 500 linhas.

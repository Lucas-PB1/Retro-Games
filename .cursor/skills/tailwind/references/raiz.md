# Tailwind — modelo mental raiz

## O que importa

Tailwind é **utility-first CSS**: classes atômicas compõem UI no markup. Design decisions vivem em `tailwind.config` (tokens); markup usa utilities, não CSS files por componente (salvo exceções).

## Composição

```html
<button class="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 focus-visible:ring-2">
  Salvar
</button>
```

## @apply — use com moderação

Ok para repeated complex pattern em component lib; evite recriar CSS tradicional escondido.

## Preflight

Reset opinionated — conheça defaults (margins zeroed, border-box).

## Fronteiras

| Tópico | Skill |
|---|---|
| CSS puro | `css` |
| UI tokens | `ui` |
| React | `react` |

## Anti-padrões

- String class de 200 chars sem extract component.
- Cores hex arbitrárias `bg-[#3a3a3a]` everywhere.
- Fighting Preflight sem @layer base custom.

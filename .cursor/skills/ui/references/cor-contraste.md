# Cor e contraste

## Paleta funcional

| Role | Uso |
|---|---|
| primary | Ação principal, links |
| neutral | Texto, borders, bg |
| success | Confirmação |
| warning | Atenção, não bloqueio |
| danger | Destrutivo, erro crítico |

## Contraste WCAG

| Texto | Mínimo AA |
|---|---|
| Normal (<18px) | 4.5:1 |
| Large (≥18px bold ou 24px) | 3:1 |
| UI components / icons | 3:1 |

Ferramentas: contrast checker, Figma plugins, axe.

## Não só cor

Erro = ícone + texto + cor. Success idem.

```html
<span class="text-danger">⚠ Senha fraca</span>
```

## Dark mode

Tokens semânticos (`text-primary`, `bg-surface`) — não hardcode #fff.

## Brand vs functional

Brand accent para marketing; UI funcional prioriza legibilidade sobre saturação.

## Checklist

- [ ] Body text passa 4.5:1
- [ ] Large text e icons passam 3:1
- [ ] Estado não comunicado só por cor
- [ ] Tokens semânticos light/dark
- [ ] Danger distinto de warning

## Anti-padrões

- Cinza #999 em branco (fail contrast).
- Verde/vermelho como único indicador.
- Gradient text em parágrafos longos.
- 12 cores accent sem sistema.

## Skills relacionadas

| Tópico | Skill |
|---|---|
| CSS tokens | `css` |
| Tailwind config | `tailwind` |

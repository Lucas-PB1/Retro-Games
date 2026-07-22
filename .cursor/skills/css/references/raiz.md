# CSS — modelo mental raiz

## O que importa

CSS descreve **apresentação** em cascata: regras competem por especificidade, ordem e origem. O modelo mental é **seletor → propriedades → valores** aplicados ao box model de cada elemento.

## Box model

```
margin → border → padding → content
```

`box-sizing: border-box` — padrão moderno; padding não estoura width declarada.

## Camadas de estilo

1. User agent defaults
2. Reset/normalize do projeto
3. Tokens/design system
4. Component styles
5. Utilities (Tailwind) ou overrides pontuais

## Unidades

| Unidade | Uso |
|---|---|
| rem | Tipografia, spacing escalável |
| em | Relativo ao parent (component scope) |
| % | Relativo ao containing block |
| vw/vh | Viewport (cuidado mobile keyboard) |
| ch | Largura de texto (~80ch legível) |

## Fronteiras

| Tópico | Skill |
|---|---|
| Utility-first | `tailwind` |
| Semântica HTML | `html` |
| UI visual | `ui` |

## Anti-padrões

- !important como primeira ferramenta.
- px fixo para tudo em app responsivo.
- Estilo inline massivo sem tokens.

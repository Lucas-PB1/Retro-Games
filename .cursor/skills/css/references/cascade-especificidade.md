# Cascade e especificidade

## Ordem de resolução

1. Origem e importance (`!important`)
2. Especificidade
3. Ordem no código (último ganha)

## Especificidade (a, b, c)

| Seletor | (a,b,c) |
|---|---|
| `#id` | (1,0,0) |
| `.class`, `[attr]`, `:pseudo` | (0,1,0) |
| `element` | (0,0,1) |
| inline style | (1,0,0,0) |

```css
.card.title { }      /* 0,2,0 — vence .card */
#sidebar .nav a { }  /* 1,1,1 */
```

## Estratégia de baixa especificidade

Prefira **uma classe por concern**:

```css
.button { }
.button--primary { }  /* BEM-like */
```

Evite `#id` para estilo — acopla HTML e dificulta override.

## Cascade layers (@layer)

```css
@layer reset, tokens, components, utilities;
@layer components {
  .card { ... }
}
```

Utilities sempre ganham de components previsivelmente.

## !important

Só escape hatch — documente motivo. Em design systems, reserve `@layer utilities` em vez de !important.

## Checklist

- [ ] Seletores rasos (0-1-0 típico)
- [ ] Sem ID para styling
- [ ] @layer se conflitos entre lib e custom
- [ ] Variáveis CSS para tokens repetidos
- [ ] Override localizado, não global agressivo

## Anti-padrões

- Seletor de 5 níveis `.a .b .c .d .e`.
- Duplicar regra com !important para "consertar".
- Especificidade arms race com parceiro Tailwind mal configurado.

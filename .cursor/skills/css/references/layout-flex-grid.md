# Layout — Flexbox e Grid

## Quando usar qual

| Flexbox | Grid |
|---|---|
| Uma dimensão (row OU column) | Duas dimensões |
| Nav, toolbar, align items | Page layout, cards matrix |
| Distribuição de espaço flex | Áreas nomeadas |

## Flexbox essencial

```css
.container {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}
.item { flex: 1 1 auto; min-width: 0; }  /* min-width evita overflow */
```

`flex-shrink: 0` para ícones/botões que não devem encolher.

## Grid essencial

```css
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
```

`auto-fill` + `minmax` = responsive sem media query.

## Stack responsivo

```css
.stack { display: flex; flex-direction: column; gap: var(--space-4); }
@media (min-width: 768px) {
  .split { flex-direction: row; }
}
```

## Overflow

Text truncate: `overflow: hidden; text-overflow: ellipsis; white-space: nowrap` + `min-width: 0` no flex child.

## Checklist

- [ ] gap em vez de margin hack entre irmãos
- [ ] min-width: 0 em flex children com texto
- [ ] Grid para layouts 2D principais
- [ ] Container queries quando componente, não viewport, dita breakpoint
- [ ] aspect-ratio para mídia

## Anti-padrões

- float para layout (legado).
- height: 100vh em mobile sem dvh fallback.
- position absolute para todo alinhamento.
- Flex sem wrap quando conteúdo pode overflow.

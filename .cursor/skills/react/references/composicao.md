# Composição React

## Composição > herança

Prefira **children**, **render props** ou **slots** explícitos:

```tsx
function Card({ children, footer }: { children: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <article>
      <div className="body">{children}</div>
      {footer}
    </article>
  )
}
```

## Compound components

```tsx
<Select>
  <Select.Trigger />
  <Select.List>
    <Select.Option value="a">A</Select.Option>
  </Select.List>
</Select>
```

Context interno compartilha estado sem expor props drilling.

## Container / presentational

- **Presentational**: UI pura, props in.
- **Container**: data fetching, wiring.

## Extração

Extraia componente quando:
- JSX repetido 3+ vezes.
- Bloco com responsabilidade distinta.
- Testabilidade isolada ajuda.

## Fragments e portals

```tsx
createPortal(modal, document.body)
```

Modais, tooltips — escape stacking context.

## Checklist

- [ ] Uma responsabilidade por componente
- [ ] children para flexibilidade de layout
- [ ] Props API mínima e nomeada por comportamento
- [ ] Sem prop explosion — agrupe em objeto tipado
- [ ] Acessibilidade no componente leaf (ver `html`)

## Anti-padrões

- boolean props proliferando (`isX`, `hasY`, `showZ`).
- Render prop aninhada 4 níveis (callback hell).
- Componente exportando 20 variants via props.

# Acessibilidade e ARIA

## Primeira regra ARIA

**Não use ARIA se HTML nativo resolve.**

Prefer `<button>` a `<div role="button" tabindex="0">`.

## Quando ARIA ajuda

- Widgets custom (combobox, tabs) sem primitive nativo.
- Live regions para feedback dinâmico.
- Descrever relações (`aria-labelledby`, `aria-describedby`).

## Padrões comuns

```html
<button aria-expanded="false" aria-controls="menu-id">Menu</button>
<ul id="menu-id" hidden>...</ul>

<div role="alert" aria-live="assertive">Erro ao salvar</div>

<input aria-invalid="true" aria-describedby="email-error">
<span id="email-error">Email inválido</span>
```

## Focus

- Ordem tab lógica (DOM order).
- `:focus-visible` para ring — não remova outline sem substituto.
- Trap focus em modal com restore ao fechar.

## Imagens

```html
<img src="chart.png" alt="Vendas subiram 12% em julho">
<img src="decorative.png" alt="">
```

## Teste

Keyboard-only, VoiceOver/NVDA, axe/lighthouse a11y audit.

## Checklist

- [ ] HTML nativo primeiro
- [ ] aria-* só quando necessário
- [ ] Focus visible
- [ ] Live regions para toasts/erros dinâmicos
- [ ] alt meaningful ou vazio decorativo

## Anti-padrões

- aria-label duplicando texto visível.
- role="presentation" em conteúdo importante.
- tabindex > 0.
- Cor como único indicador de estado.

## Skills relacionadas

| Tópico | Skill |
|---|---|
| UX feedback | `ux` |
| Contraste visual | `ui` |

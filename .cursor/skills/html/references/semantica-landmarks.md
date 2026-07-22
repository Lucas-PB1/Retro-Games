# Semântica e landmarks

## Landmarks ARIA implícitos

| Elemento | Landmark |
|---|---|
| `<header>` (top-level) | banner |
| `<nav>` | navigation |
| `<main>` | main |
| `<aside>` | complementary |
| `<footer>` (top-level) | contentinfo |

Um **único** `<main>` por página — skip link aponta para ele.

## Headings

Hierarquia lógica — não pule níveis por tamanho visual (use CSS):

```html
<main>
  <h1>Pedidos</h1>
  <section aria-labelledby="recent-heading">
    <h2 id="recent-heading">Recentes</h2>
  </section>
</main>
```

## listas

Dados tabulares → `<table>`. Lista de items → `<ul>`/`<ol>`. Não fake table com divs.

## Links vs buttons

| Elemento | Ação |
|---|---|
| `<a href>` | Navegação, nova URL |
| `<button>` | Ação na página |

```html
<button type="button" aria-expanded="false">Menu</button>
<a href="/about">Sobre</a>
```

## Skip link

```html
<a href="#main" class="skip-link">Pular para conteúdo</a>
<main id="main">...</main>
```

## Checklist

- [ ] Um main por página
- [ ] Headings hierárquicos
- [ ] nav para blocos de links
- [ ] button vs a correto
- [ ] lang no html

## Anti-padrões

- div com role="button" sem keyboard support completo.
- h1 só para SEO escondido visualmente sem técnica acessível.
- section sem heading (genérico demais).

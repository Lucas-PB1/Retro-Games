# HTML — modelo mental raiz

## O que importa

HTML é **semântica e estrutura** — significado antes de aparência. Browsers, leitores de tela e crawlers inferem função pelas tags corretas. CSS cuida do visual; JS do comportamento.

## Documento válido

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Página — Site</title>
</head>
<body>...</body>
</html>
```

`lang` obrigatório para acessibilidade e SEO.

## Semântica vs div soup

| Intenção | Tag |
|---|---|
| Navegação principal | `<nav>` |
| Conteúdo principal | `<main>` (único) |
| Seção temática | `<section>` + heading |
| Conteúdo independente | `<article>` |
| Sidebar/auxiliar | `<aside>` |
| Rodapé | `<footer>` |

## Fronteiras

| Tópico | Skill |
|---|---|
| ARIA detalhado | references nesta skill |
| Estilo | `css`, `tailwind` |
| React/Next | `react`, `nextjs` |

## Anti-padrões

- `<div onclick>` em vez de `<button>`.
- Múltiplos `<main>`.
- Heading levels pulados (h1 → h4).

---
name: responsive
description: Guia genérico de layout responsivo — mobile-first, breakpoints, fluid type/space, container queries e touch targets. Use when building responsive layouts, breakpoints, fluid design, container queries, or mobile adaptation — framework-agnostic.
---

# Responsive

## Raiz

Responsivo é **conteúdo adaptável**, não “esconder no mobile”. Prefira fluido (%, `fr`, `clamp`) + breakpoints quando a estrutura muda. Genérico: CSS, Tailwind screens, ou tokens do projeto.

## Como trabalhar

1. Defina o eixo do problema (coluna, tipografia, navegação, toque).
2. Leia a reference do subproblema.
3. Siga mobile-first se o projeto já segue; senão, o padrão do repo.
4. Some `ui` / `css` / `tailwind` na implementação.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Modelo mental | [references/raiz.md](references/raiz.md) |
| Mobile-first, breakpoints | [references/breakpoints.md](references/breakpoints.md) |
| Fluid type/space | [references/fluido.md](references/fluido.md) |
| Container queries | [references/container-queries.md](references/container-queries.md) |
| Touch, safe areas | [references/touch-safe.md](references/touch-safe.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Layout usável no menor viewport alvo
- [ ] Sem scroll horizontal acidental
- [ ] Targets tocáveis adequados
- [ ] Imagens/mídia não estourem o container

## Anti-padrões rápidos

- Só `display:none` como “responsivo”
- Breakpoints demais (xs/sm/md/lg/xl/xxl sem necessidade)
- Fixed widths que quebram em 320–360px

# DRY — modelo mental raiz

## O que importa

**Don't Repeat Yourself**: cada pedaço de **conhecimento** deve ter **uma representação autoritativa** no sistema. Duplicação de conhecimento = quando mudar regra, mudar em N lugares.

## DRY ≠ deduplicação mecânica

Duas funções com sintaxe similar mas **razões de mudança diferentes** — duplicar pode ser correto (ver `quando-duplicar.md`).

## Single Source of Truth

Schema Zod → type inferido. Constante de negócio → um módulo. Config → um lugar.

## Copy-paste triangulation

Duplicação 2x: tolerável temporariamente. 3x: extraia.

## Fronteiras

| Tópico | Skill |
|---|---|
| Abstração excessiva | references nesta skill |
| SOLID SRP | `solid` |
| Naming extract | `clean-code` |

## Anti-padrões

- DRY extremo unificando código que só parece igual.
- Shared "utils" junk drawer.
- Herança para compartilhar 3 linhas.

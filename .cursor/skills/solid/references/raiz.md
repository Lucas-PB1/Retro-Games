# SOLID — modelo mental raiz

## O que importa

SOLID são **cinco heurísticas** para módulos orientados a objetos/módulos TS — reduzem acoplamento e facilitam change. Não são checklist religioso; aplique quando pain aparece.

## Siglas

| Princípio | Essência |
|---|---|
| SRP | Uma razão para mudar |
| OCP | Estenda sem editar core |
| LSP | Subtipos substituíveis |
| ISP | Interfaces pequenas |
| DIP | Dependa de abstrações |

## Quando usar

Services, domains, plugins, adapters — menos relevante em script linear.

## vs outros skills

| Tópico | Skill |
|---|---|
| Funções pequenas | `clean-code` |
| Duplicação | `dry` |
| NestJS modules | `nestjs` |

## Anti-padrões

- 5 classes para feature trivial.
- Interface por classe "because SOLID".
- SOLID em nomes apenas, não em design.

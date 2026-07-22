---
name: solid
description: Guia SOLID para SRP, OCP, LSP, ISP e DIP em design de módulos TypeScript/NestJS. Use when designing classes, interfaces, dependency injection, or evaluating OOP/module structure against SOLID principles.
---

# SOLID

## Raiz

Cinco heurísticas para módulos coesos e desacoplados: uma responsabilidade, extensão sem editar core, subtipos honestos, interfaces pequenas, dependência de abstrações. Aplique onde dor de change aparece — não ceremony. Nest DI → `nestjs`; nomes → `clean-code`.

## Como trabalhar

1. Identifique smell (god class, switch infinito, stub methods).
2. Abra princípio correspondente no mapa.
3. Refatore incremental com tests.
4. Evite interfaces ceremony sem extensão real.

## Mapa de references

| Situação | Arquivo |
|---|---|
| Overview dos cinco princípios | [references/raiz.md](references/raiz.md) |
| Single Responsibility | [references/srp.md](references/srp.md) |
| Open/Closed, strategy | [references/ocp.md](references/ocp.md) |
| Liskov Substitution | [references/lsp.md](references/lsp.md) |
| Interface Segregation | [references/isp.md](references/isp.md) |
| Dependency Inversion | [references/dip.md](references/dip.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Módulo com responsabilidade clara (SRP)
- [ ] Novo behavior via extensão quando set aberto (OCP)
- [ ] Interface mínima para client (ISP)
- [ ] Domain não importa SDK concreto (DIP)

## Anti-padrões rápidos

- Interface por classe
- Penguin extends Bird
- God service
- getInstance service locator

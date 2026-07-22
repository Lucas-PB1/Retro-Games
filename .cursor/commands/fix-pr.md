---
description: Corrige feedback de PR (comentários CI/review) com diff mínimo
---

# /fix-pr

Objetivo: endereçar comentários de review / falhas de CI no PR atual.

1. Colete o feedback (comentários GitHub MCP, paste do usuário, ou logs CI).
2. Agrupe por arquivo; priorize Critical/blocker.
3. Implemente **diff mínimo** — sem refactors de brinde.
4. Rode os checks locais que o projeto já usa (test/lint/typecheck).
5. Resuma o que mudou vs o que ficou de propósito.

Se GitHub MCP estiver ativo, use-o para ler review threads. Senão, peça o texto/link.

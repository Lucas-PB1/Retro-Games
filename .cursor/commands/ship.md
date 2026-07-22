---
description: Checklist pré-merge / ship (tests, secrets, SEO, preview)
---

# /ship

Checklist antes de merge/deploy:

- [ ] Diff revisado; sem secrets / `.env` / tokens
- [ ] Types/lint/test do projeto passam (rode os comandos do repo)
- [ ] Preview/Vercel ok se aplicável
- [ ] Migrations/RLS consideradas se tocou DB
- [ ] SEO: metadata se página pública
- [ ] Cypress/e2e críticos se o fluxo mudou
- [ ] PR description clara (por quê)

Faça só o que faltar; reporte blockers vs nice-to-have. Não faça force push / deploy prod sem pedido explícito.

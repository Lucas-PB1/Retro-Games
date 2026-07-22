---
description: Review focado do diff atual (Next/API/UI/segurança) com findings ranqueados
---

# /review

Revise as mudanças **atuais** (diff não commitado ou o escopo que o usuário indicar).

1. Liste arquivos tocados; ignore ruído (lockfile cosmético).
2. Aplique checklists relevantes:
   - Next/RSC → agent/skill `next-reviewer` / `nextjs`
   - API → `api-reviewer`
   - UI/motion → `ui-motion`
   - Auth/secrets → `security-reviewer`
   - SEO metadata → `seo-reviewer`
3. Não reescreva o mundo — só findings acionáveis.

Formato:
- **Critical** / **Warning** / **Suggestion**
- Arquivo + por quê + fix concreto

Responda no idioma do usuário (PT se escrever em PT).

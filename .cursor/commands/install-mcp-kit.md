---
description: Instala kit MCP global (Supabase, Vercel, Context7, GitHub, Cypress)
---

# Install MCP kit

```bash
pnpm mcp:install all
```

Status:

```bash
pnpm mcp:install -- --status
```

Opcionais:

```bash
pnpm mcp:install supabase-local
pnpm mcp:install context7 -- --context7-key SUA_KEY
```

Depois:

1. Autenticar em **Settings → Tools & MCP** (OAuth Supabase/Vercel/Cypress)
2. GitHub: env `GITHUB_PERSONAL_ACCESS_TOKEN` no processo Cursor
3. **Developer: Reload Window**
4. Preferir projetos de **dev**, não produção

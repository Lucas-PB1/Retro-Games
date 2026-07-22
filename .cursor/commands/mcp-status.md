---
description: Mostra status do mcp.json global do Cursor e presets disponíveis
---

# MCP status

Execute:

```bash
pnpm mcp:install -- --status
```

Presets do kit `shared-ai`:

| Preset | Endpoint |
|--------|----------|
| `supabase` | `https://mcp.supabase.com/mcp?read_only=true` |
| `supabase-local` | `http://localhost:54321/mcp` |
| `vercel` | `https://mcp.vercel.com` |
| `context7` | `https://mcp.context7.com/mcp` |
| `github` | `https://api.githubcopilot.com/mcp/` (PAT via env) |
| `cypress` | `https://mcp.cypress.io/mcp` |
| `all` | supabase + vercel + context7 + github + cypress |

Arquivo global: `~/.cursor/mcp.json` (Windows: `%USERPROFILE%\.cursor\mcp.json`).

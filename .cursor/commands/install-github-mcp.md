---
description: Instala GitHub MCP oficial (requer GITHUB_PERSONAL_ACCESS_TOKEN)
---

# Install GitHub MCP

```bash
pnpm mcp:install github
```

Configure no ambiente do processo Cursor:

- `GITHUB_PERSONAL_ACCESS_TOKEN` = PAT com escopos necessários (repo, etc.)

O preset grava header `Authorization: Bearer ${env:GITHUB_PERSONAL_ACCESS_TOKEN}`.

Depois: Reload Window. Teste pedindo issues/PRs do repo atual.

# Ignore

`.prettierignore` típico:

```
dist
build
.next
coverage
node_modules
pnpm-lock.yaml
package-lock.json
*.min.js
```

Não formate dumps gerados, snapshots enormes se o time pediu exclusão, ou vendor.

Em monorepo: ignore na raiz + configs por pacote se já existir esse padrão.

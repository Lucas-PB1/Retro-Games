# ESLint — raiz

## Flat config (padrão atual)

```js
// eslint.config.mjs
import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ['dist/**', '.next/**', 'coverage/**'] },
)
```

Legacy (`.eslintrc.*`) só se o **projeto ainda usa** — não migre sem pedido.

## CLI

```bash
# use o script do package.json do projeto
pnpm lint
# ou
npx eslint . --fix   # só se o time aceitar autofix
```

## Papel

- ESLint: qualidade / correção / algumas convenções
- Prettier: formatação
- TypeScript `tsc`: tipos

Não use ESLint para substituir o typechecker.

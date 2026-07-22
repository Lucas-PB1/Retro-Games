# Rules e overrides

## Severidade

`off` | `warn` | `error` — CI costuma falhar só em `error`.

## Escopo

```js
{
  files: ['**/*.{ts,tsx}'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
},
{
  files: ['**/*.test.ts', '**/tests/**'],
  rules: { /* relaxações conscientes */ },
}
```

## Princípio

- Ative regras que o time consegue cumprir
- Prefira recommended sets do ecossistema do projeto (Next, Nest, React) se já estiverem instalados
- Não adicione 20 plugins “porque sim”

## Autofix

Só `--fix` em regras safe. Diff de formatação massivo → alinhar com Prettier / pedido explícito.

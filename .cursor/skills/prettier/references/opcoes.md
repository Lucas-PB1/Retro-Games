# Opções comuns

Respeite o arquivo do repo. Referência típica:

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

| Opção | Nota |
|---|---|
| `printWidth` | Soft wrap — não é “erro” passar um pouco |
| `trailingComma` | `all` ajuda diffs |
| `arrowParens` | `always` vs `avoid` — siga o repo |

Não invente opções novas num PR lateral. Mudança de config = PR próprio / pedido explícito.

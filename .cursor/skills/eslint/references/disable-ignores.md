# Disable, ignores, CI

## eslint-disable

```ts
// aceitável: linha única, com comentário do porquê
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- lib X tipa mal
```

Evite:
- disable de arquivo inteiro
- disable de regra sem nome
- deixar disable após o fix possível

## ignores

Sempre ignore artefatos: `dist`, `build`, `.next`, `coverage`, `node_modules`.

## CI

Lint deve ser reproduzível localmente com o mesmo comando do CI. Não “passe” só desligando regra no PR sem acordo.

# Comentários e formatação

## Comentários

Explique **por quê**, não **o quê**:

```typescript
// Retry 3x porque gateway externo rate-limit intermitente (INC-4521)
await retry(charge, { attempts: 3 })
```

Delete comentários obsoletos — mentem.

## Quando comentar

- Invariantes não óbvias
- Workarounds com ticket/link
- Regex ou algoritmo denso
- Public API (JSDoc export)

## Não comentar

Código autoexplicativo; blocos comentados "por segurança" — delete (git history).

## Formatação

Siga formatter do repo (Prettier). Consistência > preferência pessoal.

## Vertical density

Linhas relacionadas juntas; blank line separa conceitos.

## Imports

Ordem convention do repo — geralmente: external → internal → relative.

## Checklist

- [ ] Comentário explica why, not what
- [ ] Sem código morto comentado
- [ ] Formatter aplicado
- [ ] JSDoc em public API não óbvia
- [ ] TODO com ticket owner

## Anti-padrões

- Commented-out code blocks.
- Javadoc em todo getter privado.
- Formatting wars manual.
- Emoji comments em prod code (repo-dependent).

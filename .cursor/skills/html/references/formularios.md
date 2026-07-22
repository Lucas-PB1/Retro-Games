# Formulários HTML

## Estrutura acessível

```html
<form action="/search" method="get">
  <label for="q">Buscar</label>
  <input id="q" name="q" type="search" required autocomplete="off">
  <button type="submit">Buscar</button>
</form>
```

**label** associado via `for`/`id` — nunca só placeholder.

## Tipos de input

Use type semântico: `email`, `tel`, `url`, `number`, `date` — teclado mobile correto.

## Agrupamento

```html
<fieldset>
  <legend>Endereço de entrega</legend>
  ...
</fieldset>
```

## Validação

- HTML5: `required`, `pattern`, `min`, `max`.
- Mensagens de erro ligadas: `aria-describedby="err-id"`.
- Não bloqueie submit só no JS — server valida também.

## Autocomplete

```html
<input autocomplete="email" name="email" type="email">
```

Ajuda password managers e a11y.

## Checklist

- [ ] Todo input tem label visível ou aria-label justificado
- [ ] type adequado
- [ ] Erros com aria-describedby / aria-invalid
- [ ] fieldset/legend para grupos
- [ ] autocomplete em login/endereço

## Anti-padrões

- Placeholder como único label.
- `<input type="text">` para email.
- Custom select sem keyboard/roving tabindex.
- disabled submit sem explicar por quê.

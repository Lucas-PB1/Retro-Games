# Tipos e coerção

## typeof quirks

```javascript
typeof null        // 'object' (histórico)
typeof []          // 'object'
Array.isArray([])  // true
```

## Coerção implícita

```javascript
'' + 1      // '1'
'5' - 1     // 4
!!value     // boolean — ok explícito
value == null  // null OU undefined — raro, documente
```

Evite `==`; use `===` e comparações explícitas.

## Truthy / falsy

Falsy: `false`, `0`, `-0`, `0n`, `''`, `null`, `undefined`, `NaN`.
**Cuidado**: `[]` e `{}` são truthy.

```javascript
// ERRADO para número que pode ser 0
if (count) { }

// CORRETO
if (count !== undefined) { }
```

## Number e parsing

```javascript
Number('42')     // 42
parseInt('42px', 10)
Number.isNaN(x)  // não confundir com global isNaN
```

Decimal money: evite float — use integer cents ou decimal lib.

## Optional chaining / nullish coalescing

```javascript
user?.address?.city
config.timeout ?? 5000  // só null/undefined — não 0
```

## Checklist

- [ ] === por default
- [ ] Array.isArray para arrays
- [ ] ?? vs || consciente (0 e '')
- [ ] parseInt com radix 10
- [ ] Sem coerção implícita em comparações críticas

## Anti-padrões

- `if (arr)` para checar vazio (array vazio é truthy!).
- + para concatenar quando template literal basta.
- Math random para IDs únicos.

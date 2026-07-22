# Naming de tokens

## Boas práticas

- `{categoria}-{papel}-{variante}` → `color-text-muted`, `space-stack-md`
- Evite nome de componente no token de base (`btn-padding` só se for componente-token explícito do DS)
- Inglês ou PT — **um** idioma, o do repo

## Versionamento mental

Mudança de primitivo é breaking para quem mapeia; semântico estável protege UI.

## Checklist

- [ ] Nomes legíveis sem olhar o valor
- [ ] Sem abreviações opacas (`c-p-2`)
- [ ] Documente tokens novos no padrão do projeto

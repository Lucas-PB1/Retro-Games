# Tarefa e fluxo

## Mapeie o fluxo

```
Entrada → orientação → ação → feedback → conclusão
```

Identifique passos **obrigatórios** vs opcionais; elimine passos que não agregam.

## Redução de fricção

| Técnica | Exemplo |
|---|---|
| Defaults | País pré-selecionado por geo |
| Autofill | autocomplete HTML |
| Inline edit | Editar nome no lugar |
| Bulk actions | Selecionar vários itens |

## Wizard vs single page

Wizard quando: muitos campos, dependências entre etapas, onboarding.
Single page quando: poucos campos, overview importante.

## Empty states

Empty não é erro — é oportunidade de orientar próxima ação:

> "Nenhum pedido ainda. Crie seu primeiro pedido."

## Exit e recovery

- Salvar rascunho automático em forms longos.
- Confirmar só ações **destrutivas/irreversíveis**.
- Breadcrumbs ou back previsível.

## Checklist

- [ ] Tarefa principal óbvia em 5s
- [ ] Mínimo de campos obrigatórios
- [ ] Empty state acionável
- [ ] Destructive action confirmada
- [ ] Usuário sabe "onde está" no fluxo

## Anti-padrões

- Modal sobre modal.
- Forçar cadastro antes de mostrar valor.
- Reset form inteiro por erro em um campo.
- 12 cliques para ação frequente.

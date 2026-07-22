# Feedback e erros

## Tipos de feedback

| Tipo | Quando | Exemplo |
|---|---|---|
| Inline validation | Campo perde focus | "Email inválido" |
| Toast | Ação global concluída | "Salvo" |
| Banner | Erro de sistema | "Sem conexão" |
| Modal | Confirmação crítica | "Excluir conta?" |

## Mensagens de erro

Estrutura: **O quê** + **por quê** (se útil) + **como corrigir**.

```
❌ "Erro 400"
✅ "Senha deve ter pelo menos 8 caracteres"
```

## Associação erro-campo

Erro junto ao campo (`aria-describedby`); scroll/focus no primeiro erro em submit.

## Sucesso

Confirme ações irreversíveis ou demoradas. Sucesso silencioso ok para autosave frequente com indicador sutil.

## Loading states

- Skeleton para layout conhecido.
- Spinner para ação pontual.
- Progress bar para operações >3s com ETA.

## Checklist

- [ ] Erro específico e acionável
- [ ] Erro ligado ao campo
- [ ] Loading evita double submit
- [ ] Sucesso claro em ações importantes
- [ ] Retry em falha de rede

## Anti-padrões

- alert() nativo.
- Toast que some antes de ler.
- Form submit sem disable button.
- Mensagem genérica "Something went wrong" sem next step.

## Skills relacionadas

| Tópico | Skill |
|---|---|
| ARIA live regions | `html` |
| Estados visuais | `ui` |

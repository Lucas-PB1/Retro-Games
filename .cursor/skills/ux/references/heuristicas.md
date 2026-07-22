# Heurísticas de UX

## Nielsen (aplicação prática)

| # | Heurística | Ação |
|---|---|---|
| 1 | Visibilidade status | Loading, saved, progress |
| 2 | Match mundo real | Linguagem do usuário |
| 3 | Controle liberdade | Undo, cancel, back |
| 4 | Consistência | Mesmos padrões no produto |
| 5 | Prevenção erro | Disable, validate inline |
| 6 | Reconhecimento > recall | Labels visíveis, não memorizar |
| 7 | Flexibilidade | Shortcuts para power users |
| 8 | Design minimal | Remova ruído |
| 9 | Recuperação erro | Mensagem + como corrigir |
| 10 | Ajuda | Docs contextual, tooltips |

## Lei de Hick

Mais opções → decisão mais lenta. Agrupe, priorize ação primária única por contexto.

## Lei de Fitts

Alvos grandes e próximos para ações frequentes (CTA mobile full-width).

## Feedback imediato

<100ms perceived para click; skeleton/spinner se >300ms.

## Checklist

- [ ] Status visível em operações async
- [ ] Uma ação primária destacada
- [ ] Undo onde possível
- [ ] Linguagem sem jargão interno
- [ ] Opções avançadas escondidas até expandir

## Anti-padrões

- Silêncio total após submit (usuário clica 2x).
- Termos técnicos ("422", "UUID") na UI consumer.
- Todas ações com mesma cor/peso visual.

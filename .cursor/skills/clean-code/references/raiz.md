# Clean Code — modelo mental raiz

## O que importa

Código limpo é **legível por humanos** que mantêm o sistema — nomes revelam intenção, funções fazem uma coisa, abstrações mínimas necessárias. Não é estética: reduz bugs e tempo de change.

## Leitura > escrita

Você lê código 10x mais do que escreve — otimize para leitor.

## Boy Scout Rule

Deixe o arquivo um pouco melhor que encontrou — refactors pequenos incrementais.

## YAGNI

Não implemente flexibilidade "para o futuro" sem demanda presente.

## Fronteiras

| Tópico | Skill |
|---|---|
| Deduplicação | `dry` |
| OOP design | `solid` |
| Smells específicos | references nesta skill |

## Anti-padrões

- Clever code que exige comentário longo.
- Padrão enterprise em script de 50 linhas.
- Refactor massivo sem testes de segurança.

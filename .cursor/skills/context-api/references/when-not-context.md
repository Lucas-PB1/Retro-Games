# Quando NÃO usar Context

| Precisa de… | Prefira |
|---|---|
| Props 1–2 níveis | Props |
| URL shareable / bookmark | Search params / path |
| Server data / cache | RSC, React Query, SWR |
| Form fields | State local / form lib |
| Lista com filtro frequente | State local ou store dedicada |
| Estado cross-app complexo | Zustand/Jotai/Redux se o projeto já usa |

## Sinais de abuso

- “Vou jogar no Context” sem desenhar ownership
- Consumer re-renderiza a cada tecla
- Debug difícil de quem atualiza o value

Context não substitui arquitetura de estado — só remove drilling quando o compartilhamento é real e estável.

---
description: Reproduz e isola bug com hipóteses e evidência (logs/Cypress/CI)
---

# /repro

Modo debug estruturado:

1. Capture: erro exato, comando, ambiente, passos.
2. Reproduza (ou confirme irreprodutível).
3. 1–3 hipóteses baratas primeiro.
4. Evidência: stack, log, Cypress Cloud MCP, network.
5. Fix da **causa raiz**; teste de regressão se couber.
6. Evite patch cosmético (“catch e engole”).

Use agent `debugger` e skill `cypress` quando for e2e. Responda em PT se o usuário escrever em PT.

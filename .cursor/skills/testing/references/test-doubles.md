# Test doubles

| Tipo | Uso |
|---|---|
| Stub | Resposta fixa |
| Mock | Verifica interação (`toHaveBeenCalled`) |
| Fake | Implementação leve (in-memory repo) |
| Spy | Observa real + opcional stub |

## Preferência

1. Input/output puro sem double
2. Fake in-memory para repositório
3. Mock de HTTP client na borda
4. Evite mock de classes internas profundas

Over-mocking = teste verde que não pega bug real. Under-mocking = suite lenta/flaky.

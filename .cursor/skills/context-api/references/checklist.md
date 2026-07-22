# Checklist Context API

- [ ] Justificativa clara (não é prop drilling de 1 nível)
- [ ] Provider no menor ancestral comum
- [ ] Hook tipado + erro fora do Provider
- [ ] Split por frequência de update
- [ ] Value estável (ou contexts separados)
- [ ] `"use client"` só onde necessário (Next)
- [ ] Sem dados server-only sensíveis no Context client
- [ ] Alternativas consideradas (URL, Query, props)

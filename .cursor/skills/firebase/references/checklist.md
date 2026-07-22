# Firebase — checklist consolidado

## Modelagem

- [ ] Schema por query; índices compostos
- [ ] userId/tenantId em docs multi-tenant
- [ ] Paginação cursor-based

## Segurança

- [ ] Rules default deny
- [ ] Validação create/update
- [ ] Emulator tests no CI
- [ ] Custom claims via Admin SDK

## Auth

- [ ] onAuthStateChanged
- [ ] verifyIdToken server-side

## Functions

- [ ] Lógica crítica server-side
- [ ] Idempotência em triggers

## Anti-padrões

- allow if true
- Firestore como SQL
- Hot document writes

## Skills relacionadas

| Tópico | Skill |
|---|---|
| React client | `react` |
| TypeScript | `typescript` |

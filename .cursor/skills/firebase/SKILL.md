---
name: firebase
description: Guia Firebase para Firestore modelagem, Security Rules, Auth, Cloud Functions e Storage. Use when working with Firebase, Firestore queries, security rules, Firebase Auth, or Cloud Functions triggers.
---

# Firebase

## Raiz

Firebase é BaaS client-first: Firestore (NoSQL document), Auth, Storage e Functions. **Security Rules** são o firewall — assuma client hostil. Modele por query, não por normalização SQL. SQL relacional → `sql`/`postgres`.

## Como trabalhar

1. Identifique: modelagem, rules, auth ou functions.
2. Leia a reference do mapa.
3. Teste rules no Emulator.
4. Lógica crítica no server (Functions + Admin SDK).

## Mapa de references

| Situação | Arquivo |
|---|---|
| Arquitetura, Firestore vs RTDB | [references/raiz.md](references/raiz.md) |
| Collections, índices, denormalização | [references/firestore-modelagem.md](references/firestore-modelagem.md) |
| Rules Firestore/Storage | [references/security-rules.md](references/security-rules.md) |
| Auth, custom claims, SSR | [references/auth.md](references/auth.md) |
| Triggers, callables, Admin SDK | [references/functions.md](references/functions.md) |
| Checklist final | [references/checklist.md](references/checklist.md) |

## Checklist mínimo

- [ ] Rules default deny; testadas no emulator
- [ ] Schema alinhado às queries
- [ ] userId imutável em updates
- [ ] Operações privilegiadas em Functions

## Anti-padrões rápidos

- allow read, write: if true
- Admin SDK no client
- Array/doc unbounded
- Read-modify-write concorrente sem transaction

# Firebase — modelo mental raiz

## O que importa

Firebase é **BaaS Google**: Firestore/RTDB (NoSQL), Auth, Storage, Functions, Hosting. Modelo **client-first** com **Security Rules** como firewall — rules são a linha de defesa, não o código do app.

## Produtos principais

| Produto | Uso |
|---|---|
| Firestore | Document DB, queries indexadas |
| Auth | Identidade, providers |
| Storage | Arquivos binários |
| Cloud Functions | Triggers, APIs, webhooks |
| Hosting | SPA/static |

## Firestore vs RTDB

Prefira **Firestore** para apps novos — queries compostas, offline, escalabilidade. RTDB: latência ultra-baixa, estrutura JSON tree legada.

## Denormalização consciente

NoSQL favorece reads rápidos com dados duplicados — cada duplicação precisa estratégia de update (batch, function).

## Fronteiras

| Tópico | Skill |
|---|---|
| SQL relacional | `sql`, `postgres` |
| React client | `react`, `nextjs` |

## Anti-padrões

- Firestore como SQL relacional forçado.
- Rules permissivas em dev que vão para prod.
- Lógica crítica só no client.

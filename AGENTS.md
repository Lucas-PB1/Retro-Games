# AGENTS.md — Retro-Games

Contrato local do repositório. O kit em `.cursor/` cobre o genérico; este arquivo descreve **este** app.

## Stack

- Framework: React 19 + Vite 6 (SPA, sem Next.js)
- UI: Tailwind CSS 4 + lucide-react + motion
- Dados/Auth: Firebase Auth (Google) + Firestore
- Linguagem: TypeScript
- Deploy: (não padronizado no repo)

## Comandos

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint     # tsc --noEmit
npm run preview
```

## Não fazer

- Não commit secrets / `.env` / `.env.local`
- Não force push em `main`
- Não introduzir Next.js, Nest, Supabase ou Cypress sem pedido explícito
- Não inventar pastas/padrões fora do que o repo já usa

## Onde olhar

- App / UI: `src/App.tsx`, `src/components/`
- Firebase: `src/lib/firebase.ts`, `firebase-applet-config.json`, `firestore.rules`
- Tipos: `src/types.ts`
- Estilos: `src/index.css`

## MCP / ferramentas

- Preferir Context7 para docs de libs (React, Vite, Firebase, Tailwind, Motion)
- GitHub MCP para PRs/issues se configurado
- Skill `firebase` para Auth/Firestore/Rules

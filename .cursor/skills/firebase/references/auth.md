# Auth Firebase

## Providers

Email, Google, Apple, anonymous, custom token (backend).

```typescript
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

onAuthStateChanged(auth, (user) => {
  // user null = signed out
})
```

## Custom claims (roles)

Set no **Admin SDK** server-side only:

```javascript
await admin.auth().setCustomUserClaims(uid, { admin: true })
// Client precisa refresh token para ver claims
await user.getIdToken(true)
```

Rules leem `request.auth.token.admin`.

## Persistência

Browser: indexedDB/local por default. SSR (Next.js): auth state via cookies + Admin verifyIdToken.

## Multi-tenant

Claim `tenantId` ou membership doc — rules validam match.

## Checklist

- [ ] onAuthStateChanged para gate de UI
- [ ] Custom claims só via Admin SDK
- [ ] Token refresh após set claims
- [ ] verifyIdToken no server para APIs sensíveis
- [ ] Anonymous auth só se fluxo exige

## Anti-padrões

- Role admin como field editável no Firestore doc.
- UID hardcoded em rules.
- Auth state só em memória sem listener.

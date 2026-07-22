# Security Rules Firebase

## O que importa

Rules avaliam **cada read/write** no servidor. Sintaxe declarativa; teste com Emulator Suite.

## Firestore rules básicas

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow read: if request.auth != null
                  && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null
                    && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null
                    && resource.data.userId == request.auth.uid
                    && request.resource.data.userId == resource.data.userId;
    }
  }
}
```

## Funções reutilizáveis

```javascript
function isOwner(userId) {
  return request.auth != null && request.auth.uid == userId;
}
```

## Storage rules

```javascript
match /b/{bucket}/o {
  match /users/{userId}/{fileName} {
    allow read, write: if request.auth.uid == userId;
  }
}
```

## Validação de dados

```javascript
allow create: if request.resource.data.keys().hasAll(['title', 'userId'])
              && request.resource.data.title is string
              && request.resource.data.title.size() <= 200;
```

## Checklist

- [ ] Default deny — allow explícito por path
- [ ] userId imutável em update (compare resource vs request)
- [ ] Validação de shape e tamanho em create
- [ ] Rules testadas no emulator
- [ ] Sem allow read, write: if true em prod

## Anti-padrões

- Rules complexas duplicando toda lógica de negócio.
- Confiança em campos client-set sem validação (role: 'admin').
- Testar só no console, não no CI.

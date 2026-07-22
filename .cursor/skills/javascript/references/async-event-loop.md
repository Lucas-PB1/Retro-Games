# Async e event loop

## Event loop (resumo)

1. Call stack executa sync.
2. Web APIs (setTimeout, fetch) callback → task queue.
3. Promises → microtask queue (prioridade sobre tasks).
4. Stack vazio → microtasks → próxima task.

## Promises

```javascript
const result = await fetch(url).then(r => {
  if (!r.ok) throw new Error(`HTTP ${r.status}`)
  return r.json()
})
```

## async/await

```javascript
async function load() {
  try {
    const data = await fetchData()
    return data
  } catch (e) {
    // handle
    throw e
  }
}
```

## Paralelismo

```javascript
const [users, orders] = await Promise.all([
  fetchUsers(),
  fetchOrders(),
])
```

`Promise.allSettled` quando falhas parciais ok.

## Race e cancelamento

```javascript
const controller = new AbortController()
fetch(url, { signal: controller.signal })
controller.abort()
```

## setTimeout / setInterval

Sempre clear no cleanup (React useEffect).

## Checklist

- [ ] await com try/catch ou .catch em boundary
- [ ] Promise.all para independentes
- [ ] AbortController em fetch cancelável
- [ ] Não bloquear loop com sync pesado
- [ ] Microtask flood evitado (recursive Promise.resolve)

## Anti-padrões

- async function sem await (fake async).
- Floating promise (eslint no-floating-promises).
- await em loop sequencial quando parallel possível.
- Callback pyramid em código novo.

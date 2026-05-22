# Security Specification for Retro Hack 60s

## 1. Data Invariants
- **Hack Codes Collection (`hack_codes`)**:
  - `id`: String, length <= 128, alphanumeric + `_-`.
  - `nome`: String, size between 1 and 100 characters.
  - `movimentos`: String, size between 1 and 100 characters.
  - `revelado`: Boolean value.
  - `userId`: String, matches current `request.auth.uid`.
  - `createdAt`: Timestamp, must match `request.time` exactly on creation.

- **Consequences Collection (`consequences`)**:
  - `id`: String, length <= 128, alphanumeric + `_-`.
  - `nome`: String, size between 1 and 100 characters.
  - `desc`: String, size between 1 and 250 characters.
  - `userId`: String, matches current `request.auth.uid`.
  - `createdAt`: Timestamp, must match `request.time` exactly on creation.

- **Logs Collection (`logs`)**:
  - `id`: String, length <= 128, alphanumeric + `_-`.
  - `userId`: String, matches current `request.auth.uid`.
  - `userEmail`: String, format length <= 128.
  - `userName`: String, format length <= 128.
  - `photoURL`: String or null, length <= 500.
  - `tipo`: String, must be one of: `roll_hack`, `consequence`, `reset`.
  - `hackNome`: String or null.
  - `hackMovimentos`: String or null.
  - `conseqNome`: String or null.
  - `conseqDesc`: String or null.
  - `createdAt`: Timestamp, must match `request.time` exactly.

---

## 2. The "Dirty Dozen" Payloads (Aesthetic & Security Breaches)

1. **Unauthenticated Hack Code Write**: Hack Code write without auth. (Expected: `PERMISSION_DENIED`)
2. **Hack Code Identity Spoofing**: User `buyer` tries to write `hack_code` with `userId = 'admin'`. (Expected: `PERMISSION_DENIED`)
3. **Invalid Hack Code Schema (Missing Movimentos)**: Hack write with name but no movements. (Expected: `PERMISSION_DENIED`)
4. **Denial of Wallet Name Padding**: Write hack code with a 1MB `nome` field to expand database payload size. (Expected: `PERMISSION_DENIED`)
5. **Junk Characters ID Poisoning**: Write document using a 10KB ID string with unicode junk characters. (Expected: `PERMISSION_DENIED`)
6. **False Status Shortcut**: Directly create or update a hack code with unvalidated status/arbitrary properties. (Expected: `PERMISSION_DENIED`)
7. **Manipulating Creation Clock**: Send a client-side timestamp as `createdAt` instead of using `request.time`. (Expected: `PERMISSION_DENIED`)
8. **Consequence Name Spoofing**: Post a consequence using someone else's authenticated uid. (Expected: `PERMISSION_DENIED`)
9. **Log Type Spoofing**: Try to write action logs with an invalid type like `super_admin_hack`. (Expected: `PERMISSION_DENIED`)
10. **Admin Bypass without Verification**: Attempting write operations when `request.auth.token.email_verified` is false (for active admins). (Expected: `PERMISSION_DENIED`)
11. **Altering Immutable Fields**: Update an existing hack code by modifying its `createdAt` or `userId`. (Expected: `PERMISSION_DENIED`)
12. **Blanket Query Scraping**: Try to query the entire database collections through unrestricted client list queries. (Expected: `PERMISSION_DENIED`)

---

## 3. Test Cases Configuration
All unit/integration queries and rule tests will assert that these 12 operations are safely rejected.

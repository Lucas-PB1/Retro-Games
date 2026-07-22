/** Limites alinhados a firestore.rules (isValidHackCode / isValidConsequence / isValidLog). */
export const FIELD_MAX = {
  nome: 100,
  movimentos: 100,
  desc: 250,
  userEmail: 128,
  userName: 128,
  docId: 128,
  photoURL: 2048,
  hackNome: 250,
} as const;

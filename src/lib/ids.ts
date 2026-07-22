import { writeBatch, type WriteBatch } from "firebase/firestore";
import { db } from "./firebase";

/** IDs seguros para docs Firestore (alinhados a isValidId nas rules). */
export function createDocId(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 14)}`;
}

/** Firestore writeBatch aceita no máx. 500 ops. */
export const FIRESTORE_BATCH_LIMIT = 500;

export function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

export function truncate(value: string, max: number): string {
  return value.length > max ? value.substring(0, max) : value;
}

/** Aplica `apply` em chunks e faz commit de cada writeBatch. */
export async function commitBatched<T>(
  items: T[],
  apply: (batch: WriteBatch, item: T) => void
): Promise<void> {
  for (const group of chunkArray(items, FIRESTORE_BATCH_LIMIT)) {
    const batch = writeBatch(db);
    for (const item of group) {
      apply(batch, item);
    }
    await batch.commit();
  }
}

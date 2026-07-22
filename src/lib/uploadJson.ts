import { collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { commitBatched, createDocId } from "./ids";
import {
  parseConsequenceInputs,
  parseHackInputs,
  parseJsonArray,
  type ConsequenceInput,
  type HackInput,
} from "./parseJsonCatalog";

export type UploadType = "hacks" | "consequences";

export async function uploadHacksFromJson(jsonText: string, userId: string): Promise<number> {
  const hacks = parseHackInputs(parseJsonArray(jsonText));
  await writeHackDocs(hacks, userId);
  return hacks.length;
}

export async function uploadConsequencesFromJson(
  jsonText: string,
  userId: string
): Promise<number> {
  const consequences = parseConsequenceInputs(parseJsonArray(jsonText));
  await writeConsequenceDocs(consequences, userId);
  return consequences.length;
}

async function writeHackDocs(hacks: HackInput[], userId: string): Promise<void> {
  await commitBatched(hacks, (batch, item) => {
    const safeId = createDocId("hack");
    batch.set(doc(collection(db, "hack_codes"), safeId), {
      id: safeId,
      nome: item.nome,
      movimentos: item.movimentos,
      desc: item.desc,
      revelado: false,
      userId,
      createdAt: serverTimestamp(),
    });
  });
}

async function writeConsequenceDocs(
  consequences: ConsequenceInput[],
  userId: string
): Promise<void> {
  await commitBatched(consequences, (batch, item) => {
    const safeId = createDocId("consq");
    batch.set(doc(collection(db, "consequences"), safeId), {
      id: safeId,
      nome: item.nome,
      desc: item.desc,
      userId,
      createdAt: serverTimestamp(),
    });
  });
}

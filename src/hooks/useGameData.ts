import type { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { HackCode, Consequence, GameLog, LogTipo } from "../types";
import { useOrderedCollection } from "./useOrderedCollection";

const LOG_TIPOS: readonly LogTipo[] = ["roll_hack", "consequence", "reset"];

function asLogTipo(value: unknown): LogTipo {
  if (typeof value === "string" && (LOG_TIPOS as readonly string[]).includes(value)) {
    return value as LogTipo;
  }
  return "reset";
}

function asHack(d: QueryDocumentSnapshot<DocumentData>): HackCode {
  const data = d.data();
  return {
    id: String(data.id ?? d.id),
    nome: String(data.nome ?? ""),
    movimentos: String(data.movimentos ?? ""),
    desc: String(data.desc ?? ""),
    revelado: Boolean(data.revelado),
    userId: String(data.userId ?? ""),
    createdAt: data.createdAt ?? null,
  };
}

function asConsequence(d: QueryDocumentSnapshot<DocumentData>): Consequence {
  const data = d.data();
  return {
    id: String(data.id ?? d.id),
    nome: String(data.nome ?? ""),
    desc: String(data.desc ?? ""),
    userId: String(data.userId ?? ""),
    createdAt: data.createdAt ?? null,
  };
}

function asGameLog(d: QueryDocumentSnapshot<DocumentData>): GameLog {
  const data = d.data();
  return {
    id: String(data.id ?? d.id),
    userId: String(data.userId ?? ""),
    userEmail: String(data.userEmail ?? ""),
    userName: String(data.userName ?? ""),
    photoURL: data.photoURL ? String(data.photoURL) : undefined,
    tipo: asLogTipo(data.tipo),
    hackNome: data.hackNome ?? null,
    hackMovimentos: data.hackMovimentos ?? null,
    conseqNome: data.conseqNome ?? null,
    conseqDesc: data.conseqDesc ?? null,
    createdAt: data.createdAt ?? null,
  };
}

export function useGameData(enabled: boolean) {
  const hacks = useOrderedCollection("hack_codes", asHack, enabled);
  const consequences = useOrderedCollection("consequences", asConsequence, enabled);
  const logs = useOrderedCollection("logs", asGameLog, enabled);

  return { hacks, consequences, logs };
}

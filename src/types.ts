import type { Timestamp } from "firebase/firestore";

export type LogTipo = "roll_hack" | "consequence" | "reset";

export type LogAdditional = {
  hackNome?: string;
  hackMovimentos?: string;
  conseqNome?: string;
  conseqDesc?: string;
  custom?: string;
};

export type WriteLogFn = (
  tipo: LogTipo,
  additional?: LogAdditional
) => Promise<void>;

export interface HackCode {
  id: string;
  nome: string;
  movimentos: string;
  desc: string;
  revelado: boolean;
  userId: string;
  createdAt: Timestamp | null;
}

export interface Consequence {
  id: string;
  nome: string;
  desc: string;
  userId: string;
  createdAt: Timestamp | null;
}

export interface GameLog {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  photoURL?: string;
  tipo: LogTipo;
  hackNome?: string | null;
  hackMovimentos?: string | null;
  conseqNome?: string | null;
  conseqDesc?: string | null;
  createdAt: Timestamp | null;
}

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

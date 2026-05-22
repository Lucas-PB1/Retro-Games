export interface HackCode {
  id: string;
  nome: string;
  movimentos: string;
  desc: string;
  revelado: boolean;
  userId: string;
  createdAt: any; // Firestore Timestamp
}

export interface Consequence {
  id: string;
  nome: string;
  desc: string;
  userId: string;
  createdAt: any; // Firestore Timestamp
}

export interface GameLog {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  photoURL?: string;
  tipo: "roll_hack" | "consequence" | "reset";
  hackNome?: string;
  hackMovimentos?: string;
  conseqNome?: string;
  conseqDesc?: string;
  createdAt: any; // Firestore Timestamp
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
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

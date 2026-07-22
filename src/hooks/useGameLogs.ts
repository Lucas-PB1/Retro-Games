import { useCallback } from "react";
import type { User } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, handleFirestoreError } from "../lib/firebase";
import { createDocId, commitBatched } from "../lib/ids";
import { LogAdditional, LogTipo, OperationType, WriteLogFn } from "../types";

export function useGameLogs(user: User | null) {
  const writeLog: WriteLogFn = useCallback(
    async (tipo: LogTipo, additional?: LogAdditional) => {
      if (!user) return;

      const logId = createDocId("log");
      const path = `logs/${logId}`;

      try {
        await setDoc(doc(db, "logs", logId), {
          id: logId,
          userId: user.uid,
          userEmail: user.email || "anon@retro.com",
          userName: user.displayName || "Operador Anônimo",
          photoURL: user.photoURL || "",
          tipo,
          hackNome: additional?.hackNome || additional?.custom || null,
          hackMovimentos: additional?.hackMovimentos || null,
          conseqNome: additional?.conseqNome || null,
          conseqDesc: additional?.conseqDesc || null,
          createdAt: serverTimestamp(),
        });
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, path);
      }
    },
    [user]
  );

  const clearLogs = useCallback(async () => {
    if (!user) return;

    const snap = await getDocs(collection(db, "logs"));
    await commitBatched(snap.docs, (batch, d) => {
      batch.delete(d.ref);
    });

    await writeLog("reset", {
      custom: "Fita de telemetria limpa pelo operador.",
    });
  }, [user, writeLog]);

  return { writeLog, clearLogs };
}

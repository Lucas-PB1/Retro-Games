import { useCallback, useState } from "react";
import type { User } from "firebase/auth";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db, handleFirestoreError } from "../lib/firebase";
import { createDocId, commitBatched, truncate } from "../lib/ids";
import { FIELD_MAX } from "../lib/limits";
import { LogAdditional, LogTipo, OperationType, WriteLogFn } from "../types";

export function useGameLogs(user: User | null) {
  const [clearing, setClearing] = useState(false);

  const writeLog: WriteLogFn = useCallback(
    async (tipo: LogTipo, additional?: LogAdditional) => {
      if (!user) return;

      const logId = createDocId("log");
      const path = `logs/${logId}`;
      const hackNomeRaw = additional?.hackNome || additional?.custom || null;

      try {
        await setDoc(doc(db, "logs", logId), {
          id: logId,
          userId: user.uid,
          userEmail: truncate(user.email || "anon@retro.com", FIELD_MAX.userEmail),
          userName: truncate(user.displayName || "Operador Anônimo", FIELD_MAX.userName),
          photoURL: truncate(user.photoURL || "", FIELD_MAX.photoURL),
          tipo,
          hackNome: hackNomeRaw ? truncate(hackNomeRaw, FIELD_MAX.hackNome) : null,
          hackMovimentos: additional?.hackMovimentos
            ? truncate(additional.hackMovimentos, FIELD_MAX.movimentos)
            : null,
          conseqNome: additional?.conseqNome
            ? truncate(additional.conseqNome, FIELD_MAX.nome)
            : null,
          conseqDesc: additional?.conseqDesc
            ? truncate(additional.conseqDesc, FIELD_MAX.desc)
            : null,
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

    setClearing(true);
    try {
      const snap = await getDocs(collection(db, "logs"));
      await commitBatched(snap.docs, (batch, d) => {
        batch.delete(d.ref);
      });

      await writeLog("reset", {
        custom: "Fita de telemetria limpa pelo operador.",
      });
    } finally {
      setClearing(false);
    }
  }, [user, writeLog]);

  return { writeLog, clearLogs, clearing };
}

import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import type { HackCode, Consequence, WriteLogFn } from "../types";
import { OperationType } from "../types";
import { db, errorMessage, handleFirestoreError } from "../lib/firebase";
import { commitBatched } from "../lib/ids";
import { pickRandom } from "../lib/random";
import { useRollAnimation } from "./useRollAnimation";

export function useHackSelector(
  hacks: HackCode[],
  consequences: Consequence[],
  onLogAction: WriteLogFn
) {
  const [isRollingHack, setIsRollingHack] = useState(false);
  const [selectedHack, setSelectedHack] = useState<HackCode | null>(null);
  const [highlightedName, setHighlightedName] = useState("SISTEMA PRONTO");
  const [isRollingConseq, setIsRollingConseq] = useState(false);
  const [selectedConsequence, setSelectedConsequence] = useState<Consequence | null>(null);
  const [isResettingProgress, setIsResettingProgress] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);

  const hackRoll = useRollAnimation();
  const conseqRoll = useRollAnimation();

  const unrevealed = hacks.filter((h) => !h.revelado);
  const revealed = hacks.filter((h) => h.revelado);

  useEffect(() => {
    if (hacks.length === 0) {
      setSelectedHack(null);
    }
  }, [hacks]);

  const updateHackAsRevealed = async (hack: HackCode) => {
    try {
      await updateDoc(doc(db, "hack_codes", hack.id), { revelado: true });
      await onLogAction("roll_hack", {
        hackNome: hack.nome,
        hackMovimentos: hack.movimentos,
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `hack_codes/${hack.id}`);
    }
  };

  const rollHackCode = () => {
    if (unrevealed.length === 0 || isRollingHack) return;

    setIsRollingHack(true);
    setSelectedHack(null);
    setSelectedConsequence(null);
    setResetError(null);

    hackRoll.run(
      15,
      () => setHighlightedName(pickRandom(hacks).nome),
      () => {
        const finalHack = pickRandom(unrevealed);
        setSelectedHack(finalHack);
        setIsRollingHack(false);
        setHighlightedName(finalHack.nome);
        void updateHackAsRevealed(finalHack);
      }
    );
  };

  const rollConsequence = () => {
    if (consequences.length === 0 || isRollingConseq) return;

    setIsRollingConseq(true);
    setSelectedConsequence(null);

    conseqRoll.run(10, () => {}, () => {
      const finalConseq = pickRandom(consequences);
      setSelectedConsequence(finalConseq);
      setIsRollingConseq(false);

      void onLogAction("consequence", {
        conseqNome: finalConseq.nome,
        conseqDesc: finalConseq.desc,
      });
    });
  };

  const resetRevealedProgress = async () => {
    setIsResettingProgress(true);
    setResetError(null);
    try {
      await commitBatched(revealed, (batch, hack) => {
        batch.update(doc(db, "hack_codes", hack.id), { revelado: false });
      });

      await onLogAction("reset", {
        custom: "Fita de códigos rebobinada! Todas as seleções voltaram ao estado inicial.",
      });

      setSelectedHack(null);
      setSelectedConsequence(null);
    } catch (error) {
      console.error("Erro ao rebobinar progresso:", error);
      setResetError(
        "Falha ao rebobinar. Verifique a conexão e tente novamente: " + errorMessage(error)
      );
    } finally {
      setIsResettingProgress(false);
    }
  };

  return {
    selectedHack,
    selectedConsequence,
    highlightedName,
    isRollingHack,
    isRollingConseq,
    isResettingProgress,
    resetError,
    unrevealedCount: unrevealed.length,
    revealed,
    rollHackCode,
    rollConsequence,
    resetRevealedProgress,
  };
}

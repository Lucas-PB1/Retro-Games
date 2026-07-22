import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { HackCode, Consequence, WriteLogFn, OperationType } from "../types";
import { db, errorMessage, handleFirestoreError } from "../lib/firebase";
import { commitBatched } from "../lib/ids";
import { pickRandom } from "../lib/random";
import { useRollAnimation } from "../hooks/useRollAnimation";
import HackMonitor from "./HackMonitor";
import HackRollControls from "./HackRollControls";
import ConsequenceResult from "./ConsequenceResult";
import RevealedHacksPanel from "./RevealedHacksPanel";

interface HackSelectorProps {
  hacks: HackCode[];
  consequences: Consequence[];
  onLogAction: WriteLogFn;
}

export default function HackSelector({
  hacks,
  consequences,
  onLogAction,
}: HackSelectorProps) {
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

  const handleResetRevealedProgress = async () => {
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

  return (
    <div
      id="retro-selector-panel"
      className="crt-screen p-2 sm:p-4 bg-[#1a140f] border-2 border-[#ffb000] rounded-none flex flex-col items-stretch relative overflow-hidden crt-container"
    >
      <div className="absolute inset-0 bg-[#0d0a08] opacity-70 z-0 pointer-events-none crt-flicker" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-xl pointer-events-none z-10" />

      <div className="relative z-10 w-full flex flex-col h-full justify-between">
        <HackMonitor
          selectedHack={selectedHack}
          isRollingHack={isRollingHack}
          isRollingConseq={isRollingConseq}
          highlightedName={highlightedName}
        />

        <HackRollControls
          hacksTotal={hacks.length}
          unrevealedCount={unrevealed.length}
          consequencesTotal={consequences.length}
          hasSelectedHack={Boolean(selectedHack)}
          isRollingHack={isRollingHack}
          isRollingConseq={isRollingConseq}
          onRollHack={rollHackCode}
          onRollConsequence={rollConsequence}
        />

        <ConsequenceResult consequence={selectedConsequence} />

        <RevealedHacksPanel
          revealed={revealed}
          hacksTotal={hacks.length}
          isResetting={isResettingProgress}
          resetError={resetError}
          onReset={handleResetRevealedProgress}
        />
      </div>
    </div>
  );
}

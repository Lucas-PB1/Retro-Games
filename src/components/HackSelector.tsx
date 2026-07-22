import type { HackCode, Consequence, WriteLogFn } from "../types";
import { useHackSelector } from "../hooks/useHackSelector";
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
  const {
    selectedHack,
    selectedConsequence,
    highlightedName,
    isRollingHack,
    isRollingConseq,
    isResettingProgress,
    resetError,
    unrevealedCount,
    revealed,
    rollHackCode,
    rollConsequence,
    resetRevealedProgress,
  } = useHackSelector(hacks, consequences, onLogAction);

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
          unrevealedCount={unrevealedCount}
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
          onReset={resetRevealedProgress}
        />
      </div>
    </div>
  );
}

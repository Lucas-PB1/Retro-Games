import { Dice5, Shuffle } from "lucide-react";
import { cn } from "../lib/cn";

interface HackRollControlsProps {
  hacksTotal: number;
  unrevealedCount: number;
  consequencesTotal: number;
  hasSelectedHack: boolean;
  isRollingHack: boolean;
  isRollingConseq: boolean;
  onRollHack: () => void;
  onRollConsequence: () => void;
}

export default function HackRollControls({
  hacksTotal,
  unrevealedCount,
  consequencesTotal,
  hasSelectedHack,
  isRollingHack,
  isRollingConseq,
  onRollHack,
  onRollConsequence,
}: HackRollControlsProps) {
  const hackDisabled = isRollingHack || unrevealedCount === 0;
  const conseqDisabled = isRollingConseq || consequencesTotal === 0 || !hasSelectedHack;

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col items-center">
        <span className="text-[9px] text-[#ffb000] font-retro tracking-widest uppercase mb-1">
          CHASSI DE SELEÇÃO
        </span>
        <button
          id="btn-roll-hack-code"
          type="button"
          onClick={onRollHack}
          disabled={hackDisabled}
          className={cn(
            "w-full py-2.5 px-6 retro-switch retro-switch-green md:text-sm text-xs font-retro tracking-wider rounded-none text-white font-bold flex items-center justify-center gap-2 cursor-pointer",
            unrevealedCount === 0 && "opacity-40 cursor-not-allowed bg-slate-800 border-slate-700"
          )}
        >
          <Shuffle className="w-4 h-4" />
          {isRollingHack ? "GIRANDO TAMBOR..." : "REVELAR CÓDIGO"}
        </button>
        {hacksTotal === 0 ? (
          <p className="text-[10px] font-mono text-[#ffb000]/60 mt-2 text-center">
            * Upload fita JSON de Códigos abaixo para iniciar
          </p>
        ) : unrevealedCount === 0 ? (
          <p className="text-[10px] font-mono text-red-500 mt-2 text-center animate-pulse tracking-wide font-bold">
            * TODOS OS CÓDIGOS REVELADOS! PEÇA REBOBINAR ABAIXO.
          </p>
        ) : (
          <p className="text-[10px] font-mono text-[#ffb000]/60 mt-2 text-center">
            * Restam {unrevealedCount} códigos não revelados
          </p>
        )}
      </div>

      <div className="flex flex-col items-center">
        <span className="text-[9px] text-[#ffb000] font-retro tracking-widest uppercase mb-1">
          EFEITOS DE SISTEMA
        </span>
        <button
          id="btn-roll-consequence"
          type="button"
          onClick={onRollConsequence}
          disabled={conseqDisabled}
          className={cn(
            "w-full py-2.5 px-6 retro-switch retro-switch-amber md:text-sm text-xs font-retro tracking-wider rounded-none text-white font-bold flex items-center justify-center gap-2 cursor-pointer",
            (consequencesTotal === 0 || !hasSelectedHack) && "opacity-40 cursor-not-allowed"
          )}
        >
          <Dice5 className="w-4 h-4" />
          {isRollingConseq ? "GERANDO EFEITO..." : "CONSEQUÊNCIA (+)"}
        </button>
        {!hasSelectedHack && consequencesTotal > 0 && (
          <p className="text-[10px] font-mono text-[#ffb000]/60 mt-2 text-center">
            * Sorteie primeiro um Código de Hack
          </p>
        )}
        {consequencesTotal === 0 && (
          <p className="text-[10px] font-mono text-[#ffb000]/60 mt-2 text-center">
            * Insira JSON de consequências abaixo para habilitar
          </p>
        )}
      </div>
    </div>
  );
}

import type { HackCode } from "../types";

interface RevealedHacksPanelProps {
  revealed: HackCode[];
  hacksTotal: number;
  isResetting: boolean;
  resetError: string | null;
  onReset: () => void;
}

export default function RevealedHacksPanel({
  revealed,
  hacksTotal,
  isResetting,
  resetError,
  onReset,
}: RevealedHacksPanelProps) {
  return (
    <div className="mt-6 border border-[#ffb000]/30 bg-[#0d0a08] p-3 text-[#ffb000]">
      <div className="flex items-center justify-between border-b border-[#ffb000]/20 pb-1.5 mb-2">
        <span className="font-retro text-[9px] tracking-wide uppercase flex items-center gap-1.5">
          <span className="inline-block w-1.5 h-1.5 bg-[#ffb000]" />
          Fitas Reveladas ({revealed.length} de {hacksTotal})
        </span>
        {revealed.length > 0 && (
          <button
            type="button"
            onClick={onReset}
            disabled={isResetting}
            className="text-[9px] font-mono text-[#ffb000]/60 hover:text-[#ffb000] underline focus:outline-none cursor-pointer disabled:opacity-50"
          >
            [ {isResetting ? "REBOBINANDO..." : "REBOBINAR TODAS SELEÇÕES"} ]
          </button>
        )}
      </div>

      {resetError && (
        <p role="alert" className="mb-2 font-mono text-[10px] text-red-400">
          {resetError}
        </p>
      )}

      <div className="max-h-24 overflow-y-auto space-y-1 pr-1 font-mono text-[10px] scrollbar-thin">
        {revealed.length === 0 ? (
          <div className="text-center text-[#ffb000]/30 italic py-2 uppercase">
            [ NENHUM CÓDIGO REVELADO AINDA ]
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {revealed.map((h) => (
              <div
                key={h.id}
                className="p-1 px-1.5 border border-[#ffb000]/10 bg-[#16120e] flex items-center justify-between gap-1"
              >
                <span className="truncate text-[#ffb000]/80">{h.nome}</span>
                <span className="text-[#ffb000]/40 text-[9px] shrink-0 font-mono">[SAIU]</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

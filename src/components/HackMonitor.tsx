import { motion, AnimatePresence } from "motion/react";
import type { HackCode } from "../types";

interface HackMonitorProps {
  selectedHack: HackCode | null;
  isRollingHack: boolean;
  isRollingConseq: boolean;
  highlightedName: string;
}

export default function HackMonitor({
  selectedHack,
  isRollingHack,
  isRollingConseq,
  highlightedName,
}: HackMonitorProps) {
  if (!selectedHack && !isRollingHack) {
    return (
      <div className="py-2 flex flex-col items-center justify-center">
        <h2 className="font-retro text-[12px] md:text-sm leading-relaxed text-[#ffb000] mb-1 glow-amber">
          CENTRAL DE CODIFICAÇÃO AMBER
        </h2>
        <p className="text-[9px] font-mono text-[#ffb000]/50 uppercase tracking-widest animate-pulse">
          SISTEMA PRONTO PARA SORTEIO
        </p>
      </div>
    );
  }

  const acquisitionActive = isRollingHack || isRollingConseq;

  return (
    <div className="bg-[#0d0a08] border border-[#ffb000] p-3 rounded-none shadow-inner relative flex flex-col justify-center min-h-[120px]">
      <div className="absolute top-2 left-3 flex items-center gap-1.5 font-mono text-[9px] text-[#ffb000]">
        <span
          className={`w-2 h-2 rounded-full ${
            acquisitionActive ? "bg-red-500 animate-pulse" : "bg-[#ffb000]"
          }`}
        />
        <span>{acquisitionActive ? "AQUISIÇÃO ATIVA" : "MONITOR ESTÁVEL"}</span>
      </div>

      <div className="absolute top-2 right-3 font-mono text-[9px] text-[#ffb000]/50 uppercase">
        Série 1968
      </div>

      <div className="py-2 mt-4">
        {isRollingHack ? (
          <div className="h-16 flex items-center justify-center">
            <span className="font-retro text-[11px] text-[#ffb000] glow-amber uppercase animate-bounce">
              {highlightedName}
            </span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {selectedHack && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <span className="font-mono text-[9px] text-[#ffb000] px-2 py-0.5 border border-[#ffb000]/40 bg-[#332200] inline-block uppercase">
                  SINAL DETECTADO
                </span>
                <h3 className="font-retro text-[12px] text-[#ffb000] glow-amber uppercase block">
                  {selectedHack.nome}
                </h3>

                <div className="p-2 border border-dashed border-[#ffb000]/40 bg-[#1a140f] rounded-none">
                  <span className="font-mono text-[9px] text-[#ffb000]/60 block uppercase">
                    Série de Comandos:
                  </span>
                  <code className="text-[#ffb000] glow-amber text-[14px] font-retro tracking-widest break-words leading-relaxed block py-1">
                    {selectedHack.movimentos}
                  </code>
                  {selectedHack.desc && (
                    <div className="mt-1.5 pt-1.5 border-t border-[#ffb000]/20 text-left">
                      <span className="font-mono text-[9px] text-[#ffb000]/50 block uppercase">
                        efeito / descrição:
                      </span>
                      <span className="font-mono text-xs text-[#ffb000]/90 leading-relaxed block">
                        {selectedHack.desc}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

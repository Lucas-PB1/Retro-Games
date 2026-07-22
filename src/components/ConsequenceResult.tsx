import { Dice5 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { Consequence } from "../types";

interface ConsequenceResultProps {
  consequence: Consequence | null;
}

export default function ConsequenceResult({ consequence }: ConsequenceResultProps) {
  return (
    <AnimatePresence>
      {consequence && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-6 border border-[#ffb000] bg-[#0d0a08] p-4 rounded-none text-[#ffb000] relative overflow-hidden"
        >
          <div className="absolute top-1.5 right-2 font-mono text-[9px] text-[#ffb000]/50 uppercase tracking-widest">
            EFEITO DE EVENTO ATIVO
          </div>
          <div className="flex gap-2 items-start mt-1">
            <Dice5 className="w-6 h-6 text-[#ffb000] flex-shrink-0 animate-bounce" />
            <div className="w-full">
              <h4 className="font-retro text-[10px] uppercase tracking-wide glow-amber underline">
                {consequence.nome}
              </h4>
              <p className="font-mono text-xs text-[#ffb000]/90 mt-1 leading-relaxed">
                {consequence.desc}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect } from "react";
import { HackCode, Consequence } from "../types";
import { collection, doc, updateDoc, serverTimestamp, getDocs, writeBatch } from "firebase/firestore";
import { db, handleFirestoreError } from "../lib/firebase";
import { OperationType } from "../types";
import { Sparkles, Dice5, Eye, HelpCircle, Shuffle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { db as firestoreDb } from "../lib/firebase";

interface HackSelectorProps {
  userId: string;
  hacks: HackCode[];
  consequences: Consequence[];
  onActionTrigger: () => void; // Reload data
  onLogAction: (tipo: "roll_hack" | "consequence" | "reset", additional?: any) => Promise<void>;
}

export default function HackSelector({
  userId,
  hacks,
  consequences,
  onActionTrigger,
  onLogAction
}: HackSelectorProps) {
  const [isRollingHack, setIsRollingHack] = useState<boolean>(false);
  const [selectedHack, setSelectedHack] = useState<HackCode | null>(null);
  const [highlightedName, setHighlightedName] = useState<string>("SISTEMA PRONTO");
  const [isRollingConseq, setIsRollingConseq] = useState<boolean>(false);
  const [selectedConsequence, setSelectedConsequence] = useState<Consequence | null>(null);
  const [isResettingProgress, setIsResettingProgress] = useState<boolean>(false);

  // Reset roll state if hacks list changes
  useEffect(() => {
    if (hacks.length === 0) {
      setSelectedHack(null);
    }
  }, [hacks]);

  // Roll Random Hack Code (Roulette Animation without duplicates)
  const rollHackCode = () => {
    const unrevealed = hacks.filter((h) => !h.revelado);
    if (unrevealed.length === 0) return;
    
    setIsRollingHack(true);
    setSelectedHack(null);
    setSelectedConsequence(null);

    let counter = 0;
    const interval = setInterval(() => {
      // Still visual-randomize across all hack names for retro console feel
      const idx = Math.floor(Math.random() * hacks.length);
      setHighlightedName(hacks[idx].nome);
      counter++;
      if (counter > 15) {
        clearInterval(interval);
        // Land on true random hack code from the UNREVEALED set
        const finalHack = unrevealed[Math.floor(Math.random() * unrevealed.length)];
        setSelectedHack(finalHack);
        setIsRollingHack(false);
        setHighlightedName(finalHack.nome);

        // Update database: set revealed to true
        updateHackAsRevealed(finalHack);
      }
    }, 110);
  };

  const handleResetRevealedProgress = async () => {
    setIsResettingProgress(true);
    try {
      const batchRef = writeBatch(firestoreDb);
      const revealed = hacks.filter((h) => h.revelado);
      revealed.forEach((hack) => {
        const docRef = doc(firestoreDb, "hack_codes", hack.id);
        batchRef.update(docRef, { revelado: false });
      });
      await batchRef.commit();

      // Log reset progress event
      await onLogAction("reset", { custom: "Fita de códigos rebobinada! Todas as seleções voltaram ao estado inicial." });

      setSelectedHack(null);
      setSelectedConsequence(null);
      onActionTrigger();
    } catch (error) {
      console.error("Erro ao rebobinar progresso:", error);
    } finally {
      setIsResettingProgress(false);
    }
  };

  const updateHackAsRevealed = async (hack: HackCode) => {
    try {
      const docRef = doc(firestoreDb, "hack_codes", hack.id);
      await updateDoc(docRef, {
        revelado: true
      });
      
      // Log roll action
      await onLogAction("roll_hack", {
        hackNome: hack.nome,
        hackMovimentos: hack.movimentos
      });

      // Reload lists
      onActionTrigger();
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `hack_codes/${hack.id}`);
    }
  };

  // Roll Random Consequence
  const rollConsequence = () => {
    if (consequences.length === 0) return;
    setIsRollingConseq(true);
    setSelectedConsequence(null);

    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      if (counter > 10) {
        clearInterval(interval);
        // Secure random consequence
        const finalConseq = consequences[Math.floor(Math.random() * consequences.length)];
        setSelectedConsequence(finalConseq);
        setIsRollingConseq(false);

        // Write to system logs
        onLogAction("consequence", {
          conseqNome: finalConseq.nome,
          conseqDesc: finalConseq.desc
        }).then(() => {
          onActionTrigger();
        });
      }
    }, 110);
  };

  return (
    <div id="retro-selector-panel" className="crt-screen p-2 sm:p-4 bg-[#1a140f] border-2 border-[#ffb000] rounded-none flex flex-col items-stretch relative overflow-hidden crt-container">
      <div className="absolute inset-0 bg-[#0d0a08] opacity-70 z-0 pointer-events-none crt-flicker"></div>
      
      {/* Curved glossy reflection decoration */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-white/10 to-transparent rounded-full blur-xl pointer-events-none z-10"></div>

      <div className="relative z-10 w-full flex flex-col h-full justify-between">
        
        {/* CRT Main TV screen display readout - Only show when rolling or selected */}
        {selectedHack || isRollingHack ? (
          <div className="bg-[#0d0a08] border border-[#ffb000] p-3 rounded-none shadow-inner relative flex flex-col justify-center min-h-[120px]">
            {/* LED Active State */}
            <div className="absolute top-2 left-3 flex items-center gap-1.5 font-mono text-[9px] text-[#ffb000]">
              <span className={`w-2 h-2 rounded-full ${isRollingHack || isRollingConseq ? "bg-red-500 animate-pulse" : "bg-[#ffb000]"}`}></span>
              <span>{isRollingHack || isRollingConseq ? "AQUISIÇÃO ATIVA" : "MONITOR ESTÁVEL"}</span>
            </div>

            <div className="absolute top-2 right-3 font-mono text-[9px] text-[#ffb000]/50 uppercase">
              Série 1968
            </div>

            <div className="py-2 mt-4">
              {/* Animated rolling text */}
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
                      
                      {/* Revealed Combination Movements */}
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
        ) : (
          <div className="py-2 flex flex-col items-center justify-center">
            <h2 className="font-retro text-[12px] md:text-sm leading-relaxed text-[#ffb000] mb-1 glow-amber">
              CENTRAL DE CODIFICAÇÃO AMBER
            </h2>
            <p className="text-[9px] font-mono text-[#ffb000]/50 uppercase tracking-widest animate-pulse">
              SISTEMA PRONTO PARA SORTEIO
            </p>
          </div>
        )}

        {/* Dashboard Switch Control Board */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Sorteador de Hack Code */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-[#ffb000] font-retro tracking-widest uppercase mb-1">
              CHASSI DE SELEÇÃO
            </span>
            <button
              id="btn-roll-hack-code"
              onClick={rollHackCode}
              disabled={isRollingHack || hacks.length === 0 || hacks.filter(h => !h.revelado).length === 0}
              className={`w-full py-2.5 px-6 retro-switch retro-switch-green md:text-sm text-xs font-retro tracking-wider rounded-none text-white font-bold flex items-center justify-center gap-2 cursor-pointer ${
                hacks.length === 0 || hacks.filter(h => !h.revelado).length === 0 ? "opacity-40 cursor-not-allowed bg-slate-800 border-slate-700" : ""
              }`}
            >
              <Shuffle className="w-4 h-4" />
              {isRollingHack ? "GIRANDO TAMBOR..." : "REVELAR CÓDIGO"}
            </button>
            {hacks.length === 0 ? (
              <p className="text-[10px] font-mono text-[#ffb000]/60 mt-2 text-center">
                * Upload fita JSON de Códigos abaixo para iniciar
              </p>
            ) : hacks.filter(h => !h.revelado).length === 0 ? (
              <p className="text-[10px] font-mono text-red-500 mt-2 text-center animate-pulse tracking-wide font-bold">
                * TODOS OS CÓDIGOS REVELADOS! PEÇA REBOBINAR ABAIXO.
              </p>
            ) : (
              <p className="text-[10px] font-mono text-[#ffb000]/60 mt-2 text-center">
                * Restam {hacks.filter(h => !h.revelado).length} códigos não revelados
              </p>
            )}
          </div>

          {/* Sorteador de Consequências */}
          <div className="flex flex-col items-center">
            <span className="text-[9px] text-[#ffb000] font-retro tracking-widest uppercase mb-1">
              EFEITOS DE SISTEMA
            </span>
            <button
              id="btn-roll-consequence"
              onClick={rollConsequence}
              disabled={isRollingConseq || consequences.length === 0 || !selectedHack}
              className={`w-full py-2.5 px-6 retro-switch retro-switch-amber md:text-sm text-xs font-retro tracking-wider rounded-none text-white font-bold flex items-center justify-center gap-2 cursor-pointer ${
                consequences.length === 0 || !selectedHack ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              <Dice5 className="w-4 h-4" />
              {isRollingConseq ? "GERANDO EFEITO..." : "CONSEQUÊNCIA (+)"}
            </button>
            {(!selectedHack && consequences.length > 0) && (
              <p className="text-[10px] font-mono text-[#ffb000]/60 mt-2 text-center">
                * Sorteie primeiro um Código de Hack
              </p>
            )}
            {consequences.length === 0 && (
              <p className="text-[10px] font-mono text-[#ffb000]/60 mt-2 text-center">
                * Insira JSON de consequências abaixo para habilitar
              </p>
            )}
          </div>
        </div>

        {/* Consequence Modal / Slideout Screen overlay */}
        <AnimatePresence>
          {selectedConsequence && (
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
                    {selectedConsequence.nome}
                  </h4>
                  <p className="font-mono text-xs text-[#ffb000]/90 mt-1 leading-relaxed">
                    {selectedConsequence.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Histórico de Códigos Revelados */}
        <div className="mt-6 border border-[#ffb000]/30 bg-[#0d0a08] p-3 text-[#ffb000]">
          <div className="flex items-center justify-between border-b border-[#ffb000]/20 pb-1.5 mb-2">
            <span className="font-retro text-[9px] tracking-wide uppercase flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 bg-[#ffb000]" />
              Fitas Reveladas ({hacks.filter(h => h.revelado).length} de {hacks.length})
            </span>
            {hacks.filter(h => h.revelado).length > 0 && (
              <button
                onClick={handleResetRevealedProgress}
                disabled={isResettingProgress}
                className="text-[9px] font-mono text-[#ffb000]/60 hover:text-[#ffb000] underline focus:outline-none cursor-pointer disabled:opacity-50"
              >
                [ {isResettingProgress ? "REBOBINANDO..." : "REBOBINAR TODAS SELEÇÕES"} ]
              </button>
            )}
          </div>

          <div className="max-h-24 overflow-y-auto space-y-1 pr-1 font-mono text-[10px] scrollbar-thin">
            {hacks.filter(h => h.revelado).length === 0 ? (
              <div className="text-center text-[#ffb000]/30 italic py-2 uppercase">
                [ NENHUM CÓDIGO REVELADO AINDA ]
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {hacks.filter(h => h.revelado).map((h) => (
                  <div key={h.id} className="p-1 px-1.5 border border-[#ffb000]/10 bg-[#16120e] flex items-center justify-between gap-1">
                    <span className="truncate text-[#ffb000]/80">{h.nome}</span>
                    <span className="text-[#ffb000]/40 text-[9px] shrink-0 font-mono">[SAIU]</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

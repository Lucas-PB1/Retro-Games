import { useState, useEffect } from "react";
import type { Timestamp } from "firebase/firestore";
import { ListRestart, Terminal, ShieldAlert } from "lucide-react";
import { GameLog } from "../types";

interface RetroLogViewerProps {
  logs: GameLog[];
  onClearLogs: () => Promise<void>;
  loadingClear: boolean;
}

function formatTime(ts: Timestamp | null | undefined): string {
  if (!ts) return "00:00:00";
  const d = typeof ts.toDate === "function" ? ts.toDate() : new Date(String(ts));
  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function describeLog(log: GameLog): { badgeColor: string; logText: string } {
  if (log.tipo === "roll_hack") {
    return {
      badgeColor: "text-[#ffb000] border-[#ffb000]/30 bg-[#332200]",
      logText: `CÓDIGO REVELADO: ${log.hackNome || "Desconhecido"} -> [${log.hackMovimentos || ""}]`,
    };
  }
  if (log.tipo === "consequence") {
    return {
      badgeColor: "text-[#ffb000] border-[#ffb000]/30 bg-[#332200]",
      logText: `EFETIVADO: [${log.conseqNome || ""}] - ${log.conseqDesc || ""}`,
    };
  }
  return {
    badgeColor: "text-red-500 border-red-500/30 bg-red-950/20",
    logText: `RESET GERAL: ${log.hackNome || "O banco de dados foi formatado ao padrão."}`,
  };
}

export default function RetroLogViewer({
  logs,
  onClearLogs,
  loadingClear,
}: RetroLogViewerProps) {
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    if (!confirmReset) return;
    const timer = setTimeout(() => setConfirmReset(false), 4000);
    return () => clearTimeout(timer);
  }, [confirmReset]);

  return (
    <div
      id="retro-log-panel"
      className="border-2 border-[#ffb000] bg-[#1a140f] p-4 relative font-sans text-[#ffb000]"
    >
      <div className="flex items-center justify-between border-b-2 border-[#ffb000] pb-2 mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#ffb000]" />
          <span className="font-retro text-xs text-[#ffb000] tracking-wider">TELEMETRIA // LOGS</span>
        </div>
        <div className="text-[10px] text-[#ffb000]/60 font-mono tracking-widest uppercase">
          CONEXÃO REAL-TIME
        </div>
      </div>

      <div
        id="serial-terminal-viewport"
        className="h-44 overflow-y-auto bg-[#0d0a08] p-3 rounded-none font-mono text-xs border border-[#ffb000]/40 leading-relaxed scrollbar-thin"
      >
        {logs.length === 0 ? (
          <div className="text-[#ffb000]/40 text-center py-10 uppercase italic">
            [ FITA VAZIA. INSIRA CODIGOS OU SORTEIE RESULTADOS PARA POPULAR A TELEMETRIA. ]
          </div>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => {
              const { badgeColor, logText } = describeLog(log);
              return (
                <div
                  key={log.id}
                  className="p-1.5 border border-[#ffb000]/20 bg-[#1a140f] flex flex-col md:flex-row md:items-start gap-1 justify-between transition-all hover:bg-[#332200]"
                >
                  <div className="flex items-start gap-2 max-w-full">
                    <span className="text-[#ffb000]/50 text-[10px] shrink-0 pt-0.5 select-none font-mono">
                      [{formatTime(log.createdAt)}]
                    </span>
                    <span
                      className={`text-[9px] uppercase font-retro px-1 border rounded-none shrink-0 ${badgeColor}`}
                    >
                      {log.tipo}
                    </span>
                    <p className="text-[#ffb000]/90 text-xs font-mono break-all leading-tight">
                      {logText}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 pt-1 md:pt-0 self-end md:self-auto">
                    {log.photoURL ? (
                      <img
                        src={log.photoURL}
                        referrerPolicy="no-referrer"
                        alt=""
                        className="w-3.5 h-3.5 rounded-full border border-[#ffb000]/30"
                      />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full bg-[#0d0a08] border border-[#ffb000]/30 block" />
                    )}
                    <span
                      className="text-[10px] text-[#ffb000]/60 max-w-[80px] truncate font-mono"
                      title={log.userEmail}
                    >
                      {log.userName.split(" ")[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-[#ffb000]/30 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono">
        <div className="flex items-center gap-2 text-[10px] text-[#ffb000]/60 uppercase">
          <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>Controle do Histórico</span>
        </div>
        {confirmReset ? (
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              id="btn-confirm-reset"
              type="button"
              disabled={loadingClear}
              onClick={async () => {
                await onClearLogs();
                setConfirmReset(false);
              }}
              className="w-full sm:w-auto px-3 py-1 bg-red-600 hover:bg-red-700 text-white font-retro text-[9px] uppercase tracking-wider rounded-none transition-all cursor-pointer flex items-center justify-center gap-1 focus:outline-none"
            >
              [ CONFIRMAR LIMPAR LOGS ]
            </button>
            <button
              id="btn-cancel-reset"
              type="button"
              onClick={() => setConfirmReset(false)}
              className="px-2 py-1 border border-[#ffb000]/60 hover:bg-[#332200] text-[#ffb000] font-mono text-[9px] uppercase rounded-none transition-all cursor-pointer focus:outline-none"
            >
              [ CANCELAR ]
            </button>
          </div>
        ) : (
          <button
            id="btn-trigger-reset-database"
            type="button"
            disabled={loadingClear}
            onClick={() => setConfirmReset(true)}
            className="w-full sm:w-auto py-1 px-3 border border-red-500 hover:bg-red-950/20 text-red-500 font-retro text-[10px] uppercase tracking-wider rounded-none transition-all cursor-pointer flex items-center justify-center gap-1 focus:outline-none"
          >
            <ListRestart className="w-3.5 h-3.5" />
            {loadingClear ? "PROCESSANDO LIMPEZA..." : "Limpar Fita de Logs"}
          </button>
        )}
      </div>
    </div>
  );
}

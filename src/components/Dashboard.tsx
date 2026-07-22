import { useState } from "react";
import { Gamepad2, LogOut, Cpu, Terminal } from "lucide-react";
import HackSelector from "./HackSelector";
import JSONUploader from "./JSONUploader";
import RetroLogViewer from "./RetroLogViewer";
import SystemNotification from "./SystemNotification";
import RetroTab from "./RetroTab";
import type { HackCode, Consequence, GameLog, WriteLogFn } from "../types";
import type { Notification } from "../hooks/useNotification";

type ActiveTab = "controller" | "terminal";

interface DashboardProps {
  userId: string;
  hacks: HackCode[];
  consequences: Consequence[];
  logs: GameLog[];
  onLogAction: WriteLogFn;
  onClearLogs: () => Promise<void>;
  loadingClear: boolean;
  onLogout: () => void;
  logoutBusy: boolean;
  notification: Notification | null;
}

export default function Dashboard({
  userId,
  hacks,
  consequences,
  logs,
  onLogAction,
  onClearLogs,
  loadingClear,
  onLogout,
  logoutBusy,
  notification,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>("controller");

  return (
    <div className="min-h-screen bg-[#0d0a08] text-[#ffb000] font-sans p-2 sm:p-6 lg:p-8 flex flex-col justify-between selection:bg-[#332200] selection:text-[#ffb000]">
      <header className="max-w-7xl w-full mx-auto bg-[#1a140f] border border-[#ffb000]/60 sm:border-2 sm:border-[#ffb000] p-2.5 sm:p-3 rounded-none mb-4 sm:mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 sm:p-2 bg-[#332200] border border-[#ffb000]/30 rounded-none">
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffb000]" />
          </div>
          <h1 className="font-retro text-[10px] sm:text-[11px] text-[#ffb000] glow-amber font-black tracking-normal uppercase">
            RETRO HACK 60S
          </h1>
        </div>

        <button
          id="btn-account-logout"
          type="button"
          onClick={onLogout}
          disabled={logoutBusy}
          aria-busy={logoutBusy}
          title="Sair do Terminal"
          className="p-1 sm:p-1.5 border border-[#ffb000]/30 hover:border-red-500 bg-[#0d0a08] hover:bg-red-950/20 text-[#ffb000] hover:text-red-400 rounded-none transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 flex items-center gap-1.5 font-retro text-[9px] uppercase tracking-wider disabled:opacity-50 disabled:cursor-wait"
        >
          <span className="hidden sm:inline">{logoutBusy ? "Saindo" : "Sair"}</span>
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </header>

      <div
        role="tablist"
        aria-label="Módulos do terminal"
        className="max-w-7xl w-full mx-auto mb-4 sm:mb-6 grid grid-cols-2 border border-[#ffb000]/60 sm:border-2 sm:border-[#ffb000] bg-[#0d0a08] p-0.5 sm:p-1 gap-1"
      >
        <RetroTab
          id="tab-controller"
          active={activeTab === "controller"}
          onClick={() => setActiveTab("controller")}
        >
          <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Controle (Roleta)</span>
        </RetroTab>
        <RetroTab
          id="tab-terminal"
          active={activeTab === "terminal"}
          onClick={() => setActiveTab("terminal")}
        >
          <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Fitas e Logs ({hacks.length})</span>
        </RetroTab>
      </div>

      <main className="max-w-7xl w-full mx-auto flex-grow">
        {activeTab === "controller" ? (
          <div
            role="tabpanel"
            aria-labelledby="tab-controller"
            className="wood-bezel w-full rounded-none p-1 sm:p-2 mb-4 border border-[#ffb000]/60 sm:border-2 sm:border-[#ffb000] bg-[#1a140f] shadow-inner relative"
          >
            <HackSelector
              hacks={hacks}
              consequences={consequences}
              onLogAction={onLogAction}
            />
          </div>
        ) : (
          <div
            role="tabpanel"
            aria-labelledby="tab-terminal"
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 animate-fade-in"
          >
            <div className="lg:col-span-6 flex flex-col">
              <RetroLogViewer
                logs={logs}
                onClearLogs={onClearLogs}
                loadingClear={loadingClear}
              />
            </div>

            <div className="lg:col-span-6 flex flex-col">
              <JSONUploader
                userId={userId}
                onUploadSuccess={() => setActiveTab("controller")}
                onLogAction={onLogAction}
                existingHacksCount={hacks.length}
                existingConsequencesCount={consequences.length}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="max-w-7xl w-full mx-auto mt-6 pt-4 border-t border-[#ffb000]/15 hidden md:flex flex-col md:flex-row items-center justify-between text-xs text-[#ffb000]/50 font-mono gap-3">
        <p>© 1965 TELEMETRIA INTEGRADA INC. DIREITOS RESERVADOS.</p>
        <p className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb000] inline-block animate-ping" />
          STATUS DO SISTEMA: <span className="text-[#ffb000] font-bold">ONLINE</span>
        </p>
      </footer>

      {notification && <SystemNotification notification={notification} />}
    </div>
  );
}

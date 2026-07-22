import { RefreshCw } from "lucide-react";

export default function AuthLoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0d0a08] flex flex-col items-center justify-center font-sans text-[#ffb000] p-6 crt-container relative">
      <div className="absolute inset-0 bg-[#1a140f] opacity-90 z-0 pointer-events-none crt-screen animate-pulse" />
      <div className="z-10 flex flex-col items-center text-center">
        <RefreshCw className="w-10 h-10 animate-spin mb-4 text-[#ffb000]" />
        <h2 className="font-retro text-[9px] uppercase tracking-widest glow-amber">
          INICIALIZANDO SUBSISTEMA...
        </h2>
        <p className="font-mono text-xs text-[#ffb000]/60 mt-2">CANAL 03 UHF - CONEXÃO ATIVA</p>
      </div>
    </div>
  );
}

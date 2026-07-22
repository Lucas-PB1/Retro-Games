import { Gamepad2, CircleUser } from "lucide-react";

interface LoginScreenProps {
  onLogin: () => void;
  authError: string | null;
}

export default function LoginScreen({ onLogin, authError }: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-[#0d0a08] flex flex-col items-center justify-center p-4 sm:p-6 crt-container relative selection:bg-[#332200] selection:text-[#ffb000]">
      <div className="absolute inset-0 bg-[#1a140f] opacity-90 z-0 pointer-events-none crt-screen" />

      <div className="wood-bezel w-full max-w-sm p-6 sm:p-8 rounded-none z-10 text-center relative border-2 border-[#ffb000]">
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

        <div className="mb-6">
          <div className="inline-flex p-3 bg-[#332200] border border-[#ffb000] rounded-none mb-3 shadow-inner glow-amber">
            <Gamepad2 className="w-8 h-8 text-[#ffb000]" />
          </div>

          <h1 className="font-retro text-[12px] leading-relaxed text-[#ffb000] glow-amber uppercase mt-2">
            RETRO 60S HACK WHEEL
          </h1>
          <p className="font-mono text-xs text-[#ffb000]/70 uppercase tracking-widest mt-1">
            PAINEL DE CONTROLE SECURE
          </p>
        </div>

        <div className="bg-[#0d0a08] border border-[#ffb000]/40 p-4 rounded-none text-left mb-6 font-mono text-xs text-[#ffb000]/80 leading-relaxed">
          <p className="mb-2 text-center text-[#ffb000] font-retro text-[9px] uppercase tracking-widest">
            -- SISTEMA DE ENTRADA --
          </p>
          <p>1. ESTABELECE CONEXÃO COM TELEMETRIA FIREBASE.</p>
          <p>2. AUTORIZA OPERAÇÃO DE LEITURA DE CÓDIGOS DE RECOMPENSA.</p>
          <p>3. GUARDA HISTÓRICO LOCAL REAL-TIME DE CONSEQUÊNCIAS.</p>
          <div className="mt-3 text-center text-[9px] text-[#ffb000] font-retro animate-pulse">
            * SOMENTE ADMINS CREDENCIADOS *
          </div>
        </div>

        <button
          id="btn-google-auth-login"
          type="button"
          onClick={onLogin}
          className="w-full py-4 px-6 retro-switch retro-switch-green font-retro text-[10px] tracking-wider rounded-none text-black font-bold flex items-center justify-center gap-3 cursor-pointer border-2 border-[#ffb000]"
        >
          <CircleUser className="w-4 h-4 text-black" />
          ACESSAR COM GOOGLE
        </button>

        {authError && (
          <p
            role="alert"
            className="mt-3 font-mono text-[10px] text-red-400 border border-red-500/40 bg-red-950/20 p-2 text-left break-words"
          >
            FALHA DE AUTENTICAÇÃO: {authError}
          </p>
        )}

        <div className="mt-8 pt-4 border-t border-[#ffb000]/20 flex justify-between items-center text-[9px] font-mono text-[#ffb000]/40 uppercase">
          <span>MODELO-1965</span>
          <span>CHAS-0294</span>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  setDoc,
  getDocs,
  writeBatch,
  serverTimestamp,
  getDocFromServer
} from "firebase/firestore";
import { auth, db, googleProvider, handleFirestoreError } from "./lib/firebase";
import { HackCode, Consequence, GameLog, OperationType } from "./types";
import { LogOut, Gamepad2, User2, RefreshCw, Cpu, Database, CircleUser, HelpCircle, Terminal } from "lucide-react";
import HackSelector from "./components/HackSelector";
import JSONUploader from "./components/JSONUploader";
import RetroLogViewer from "./components/RetroLogViewer";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [hacks, setHacks] = useState<HackCode[]>([]);
  const [consequences, setConsequences] = useState<Consequence[]>([]);
  const [logs, setLogs] = useState<GameLog[]>([]);
  const [loadingReset, setLoadingReset] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"controller" | "terminal">("controller");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Auto-clear notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // 1. Validate Connection to Firestore on initial boot (as mandated by firebase skill)
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, "test", "connection"));
      } catch (error) {
        if (error instanceof Error && error.message.includes("offline")) {
          console.error("Please check your Firebase configuration or network status.");
        }
      }
    }
    testConnection();
  }, []);

  // 2. Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 3. Real-time Firestore Sync (triggered only when user is logged in)
  useEffect(() => {
    if (!user) return;

    // Real-time synchronization for Hacks
    const qHacks = query(collection(db, "hack_codes"), orderBy("createdAt", "desc"));
    const unsubscribeHacks = onSnapshot(
      qHacks,
      (snapshot) => {
        const hList = snapshot.docs.map((d) => d.data() as HackCode);
        setHacks(hList);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, "hack_codes");
      }
    );

    // Real-time synchronization for Consequences
    const qConsq = query(collection(db, "consequences"), orderBy("createdAt", "desc"));
    const unsubscribeConsq = onSnapshot(
      qConsq,
      (snapshot) => {
        const cList = snapshot.docs.map((d) => d.data() as Consequence);
        setConsequences(cList);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, "consequences");
      }
    );

    // Real-time synchronization for Logs (limit to last 50 entries)
    const qLogs = query(collection(db, "logs"), orderBy("createdAt", "desc"));
    const unsubscribeLogs = onSnapshot(
      qLogs,
      (snapshot) => {
        const lList = snapshot.docs.map((d) => d.data() as GameLog);
        setLogs(lList);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, "logs");
      }
    );

    return () => {
      unsubscribeHacks();
      unsubscribeConsq();
      unsubscribeLogs();
    };
  }, [user]);

  // Handle Google Login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login Error: ", error);
    }
  };

  // Handle Sign Out
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  // Audit logger writer helper
  const handleWriteLog = async (
    tipo: "roll_hack" | "consequence" | "reset",
    additional?: {
      hackNome?: string;
      hackMovimentos?: string;
      conseqNome?: string;
      conseqDesc?: string;
      custom?: string;
    }
  ) => {
    if (!user) return;

    const logId = "log_" + Math.random().toString(36).substring(2, 14);
    const path = `logs/${logId}`;

    try {
      const logDocRef = doc(db, "logs", logId);
      await setDoc(logDocRef, {
        id: logId,
        userId: user.uid,
        userEmail: user.email || "anon@retro.com",
        userName: user.displayName || "Operador Anônimo",
        photoURL: user.photoURL || "",
        tipo: tipo,
        hackNome: additional?.hackNome || additional?.custom || null,
        hackMovimentos: additional?.hackMovimentos || null,
        conseqNome: additional?.conseqNome || null,
        conseqDesc: additional?.conseqDesc || null,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  // Limpar os logs de telemetria sem afetar hacks ou consequências
  const handleClearLogs = async () => {
    if (!user) return;
    setLoadingReset(true);

    try {
      const batchRef = writeBatch(db);

      // Busca e deleta de forma exclusiva os logs da coleção "logs"
      const lSnap = await getDocs(collection(db, "logs"));
      lSnap.docs.forEach((doc) => {
        batchRef.delete(doc.ref);
      });

      await batchRef.commit();

      // Grava o log de reinicialização para indicar fita limpa
      await handleWriteLog("reset", { custom: "Fita de telemetria limpa pelo operador." });
      setNotification({ message: "Sucesso: Histórico de logs limpo com sucesso!", type: "success" });
    } catch (error: any) {
      console.error("Erro ao limpar logs: ", error);
      setNotification({ message: "Erro ao deletar logs: " + (error.message || error), type: "error" });
    } finally {
      setLoadingReset(false);
    }
  };

  // Auth Loading screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0d0a08] flex flex-col items-center justify-center font-sans text-[#ffb000] p-6 crt-container relative">
        <div className="absolute inset-0 bg-[#1a140f] opacity-90 z-0 pointer-events-none crt-screen animate-pulse"></div>
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

  // Not authenticated screen (gorgeous 60s TV Arcade Cabinet interface)
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0d0a08] flex flex-col items-center justify-center p-4 sm:p-6 crt-container relative selection:bg-[#332200] selection:text-[#ffb000]">
        <div className="absolute inset-0 bg-[#1a140f] opacity-90 z-0 pointer-events-none crt-screen"></div>
        
        {/* Vintage Wood Bezel outer television frame */}
        <div className="wood-bezel w-full max-w-sm p-6 sm:p-8 rounded-none z-10 text-center relative border-2 border-[#ffb000]">
          
          {/* Glass glare overlay */}
          <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
          
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
            onClick={handleGoogleLogin}
            className="w-full py-4 px-6 retro-switch retro-switch-green font-retro text-[10px] tracking-wider rounded-none text-black font-bold flex items-center justify-center gap-3 cursor-pointer border-2 border-[#ffb000]"
          >
            <CircleUser className="w-4 h-4 text-black" />
            ACESSAR COM GOOGLE
          </button>

          <div className="mt-8 pt-4 border-t border-[#ffb000]/20 flex justify-between items-center text-[9px] font-mono text-[#ffb000]/40 uppercase">
            <span>MODELO-1965</span>
            <span>CHAS-0294</span>
          </div>
        </div>
      </div>
    );
  }

  // Active Admin Dashboard
  return (
    <div className="min-h-screen bg-[#0d0a08] text-[#ffb000] font-sans p-2 sm:p-6 lg:p-8 flex flex-col justify-between selection:bg-[#332200] selection:text-[#ffb000]">
      
      {/* Top Banner Control Panel Nav - Reduced padding, border, and gaps on mobile */}
      <header className="max-w-7xl w-full mx-auto bg-[#1a140f] border border-[#ffb000]/60 sm:border-2 sm:border-[#ffb000] p-2.5 sm:p-3 rounded-none mb-4 sm:mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 sm:p-2 bg-[#332200] border border-[#ffb000]/30 rounded-none">
            <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffb000]" />
          </div>
          <h1 className="font-retro text-[10px] sm:text-[11px] text-[#ffb000] glow-amber font-black tracking-normal uppercase">
            RETRO HACK 60S
          </h1>
        </div>

        {/* Exit button */}
        <button
          id="btn-account-logout"
          onClick={handleLogout}
          title="Sair do Terminal"
          className="p-1 sm:p-1.5 border border-[#ffb000]/30 hover:border-red-500 bg-[#0d0a08] hover:bg-red-950/20 text-[#ffb000] hover:text-red-400 rounded-none transition-all cursor-pointer focus:outline-none flex items-center gap-1.5 font-retro text-[9px] uppercase tracking-wider"
        >
          <span className="hidden sm:inline">Sair</span>
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Top Tab Bar Navigation - Optimized for mobile controllers */}
      <div className="max-w-7xl w-full mx-auto mb-4 sm:mb-6 grid grid-cols-2 border border-[#ffb000]/60 sm:border-2 sm:border-[#ffb000] bg-[#0d0a08] p-0.5 sm:p-1 gap-1">
        <button
          id="tab-controller"
          onClick={() => setActiveTab("controller")}
          className={`py-2 px-3 sm:py-3.5 sm:px-4 font-retro text-[9px] sm:text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 rounded-none cursor-pointer focus:outline-none ${
            activeTab === "controller"
              ? "bg-[#332200] text-[#ffb000] border border-[#ffb000] font-bold glow-amber"
              : "bg-[#16120e] text-[#ffb000]/50 hover:bg-[#211a14] hover:text-[#ffb000]/80"
          }`}
        >
          <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Controle (Roleta)</span>
        </button>
        <button
          id="tab-terminal"
          onClick={() => setActiveTab("terminal")}
          className={`py-2 px-3 sm:py-3.5 sm:px-4 font-retro text-[9px] sm:text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 rounded-none cursor-pointer focus:outline-none ${
            activeTab === "terminal"
              ? "bg-[#332200] text-[#ffb000] border border-[#ffb000] font-bold glow-amber"
              : "bg-[#16120e] text-[#ffb000]/50 hover:bg-[#211a14] hover:text-[#ffb000]/80"
          }`}
        >
          <Terminal className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Fitas e Logs ({hacks.length})</span>
        </button>
      </div>

      {/* Main dashboard grid layouts - Responsive & isolated per user intent */}
      <main className="max-w-7xl w-full mx-auto flex-grow">
        {activeTab === "controller" ? (
          /* PRIMARY CONTROLLER MODULE - Reduced borders and padding for mobile density */
          <div className="wood-bezel w-full rounded-none p-1 sm:p-2 mb-4 border border-[#ffb000]/60 sm:border-2 sm:border-[#ffb000] bg-[#1a140f] shadow-inner relative">
            <HackSelector
              userId={user.uid}
              hacks={hacks}
              consequences={consequences}
              onActionTrigger={() => {}} // Live snapshot sync updates without trigger!
              onLogAction={handleWriteLog}
            />
          </div>
        ) : (
          /* CONFIGURATION & DECK LOADER BACKSTAGE MODULE */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 animate-fade-in">
            {/* Realtime commands serial feed log */}
            <div className="lg:col-span-6 flex flex-col">
              <RetroLogViewer
                logs={logs}
                onClearLogs={handleClearLogs}
                loadingClear={loadingReset}
              />
            </div>

            {/* Pasting custom memory sets JSON */}
            <div className="lg:col-span-6 flex flex-col">
              <JSONUploader
                userId={user.uid}
                onUploadSuccess={() => setActiveTab("controller")} // Go back to controller as a sweet UX shortcut
                onLogAction={handleWriteLog}
                existingHacksCount={hacks.length}
                existingConsequencesCount={consequences.length}
              />
            </div>
          </div>
        )}
      </main>

      {/* Retro mainframe status footer - ONLY shown on md screens, completely removed on mobile */}
      <footer className="max-w-7xl w-full mx-auto mt-6 pt-4 border-t border-[#ffb000]/15 hidden md:flex flex-col md:flex-row items-center justify-between text-xs text-[#ffb000]/50 font-mono gap-3">
        <p>© 1965 TELEMETRIA INTEGRADA INC. DIREITOS RESERVADOS.</p>
        <p className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb000] inline-block animate-ping"></span>
          STATUS DO SISTEMA: <span className="text-[#ffb000] font-bold">ONLINE</span>
        </p>
      </footer>

      {/* Floating retro-designed notification banner to replace window.alert */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0d0a08] border-2 border-[#ffb000] p-4 text-[#ffb000] rounded-none max-w-sm shadow-[#ffb000]/10 shadow-2xl animate-fade-in">
          <p className="font-retro text-[9px] uppercase tracking-widest text-[#ffb000] border-b border-[#ffb000]/20 pb-1 mb-2 flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 bg-[#ffb000] animate-pulse" />
            [ NOTIFICADOR DO SISTEMA ]
          </p>
          <p className="font-mono text-xs text-stone-200">{notification.message}</p>
        </div>
      )}
    </div>
  );
}

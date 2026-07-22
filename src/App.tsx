import { useState } from "react";
import AuthLoadingScreen from "./components/AuthLoadingScreen";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./hooks/useAuth";
import { useGameData } from "./hooks/useGameData";
import { useGameLogs } from "./hooks/useGameLogs";
import { useNotification } from "./hooks/useNotification";
import { errorMessage } from "./lib/firebase";

export default function App() {
  const { user, authLoading, authError, loginWithGoogle, logout } = useAuth();
  const { hacks, consequences, logs } = useGameData(Boolean(user));
  const { writeLog, clearLogs } = useGameLogs(user);
  const { notification, setNotification } = useNotification();
  const [loadingReset, setLoadingReset] = useState(false);

  const handleClearLogs = async () => {
    if (!user) return;
    setLoadingReset(true);
    try {
      await clearLogs();
      setNotification({
        message: "Sucesso: Histórico de logs limpo com sucesso!",
        type: "success",
      });
    } catch (error) {
      console.error("Erro ao limpar logs:", error);
      setNotification({
        message: "Erro ao deletar logs: " + errorMessage(error),
        type: "error",
      });
    } finally {
      setLoadingReset(false);
    }
  };

  if (authLoading) {
    return <AuthLoadingScreen />;
  }

  if (!user) {
    return <LoginScreen onLogin={loginWithGoogle} authError={authError} />;
  }

  return (
    <Dashboard
      userId={user.uid}
      hacks={hacks}
      consequences={consequences}
      logs={logs}
      onLogAction={writeLog}
      onClearLogs={handleClearLogs}
      loadingClear={loadingReset}
      onLogout={logout}
      notification={notification}
    />
  );
}

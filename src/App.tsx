import AuthLoadingScreen from "./components/AuthLoadingScreen";
import LoginScreen from "./components/LoginScreen";
import Dashboard from "./components/Dashboard";
import { useAuth } from "./hooks/useAuth";
import { useGameData } from "./hooks/useGameData";
import { useGameLogs } from "./hooks/useGameLogs";
import { useNotification } from "./hooks/useNotification";
import { errorMessage } from "./lib/firebase";

export default function App() {
  const { user, authLoading, authBusy, authError, loginWithGoogle, logout } = useAuth();
  const { hacks, consequences, logs } = useGameData(Boolean(user));
  const { writeLog, clearLogs, clearing } = useGameLogs(user);
  const { notification, notifySuccess, notifyError } = useNotification();

  const handleClearLogs = async () => {
    if (!user || clearing) return;
    try {
      await clearLogs();
      notifySuccess("Sucesso: Histórico de logs limpo com sucesso!");
    } catch (error) {
      console.error("Erro ao limpar logs:", error);
      notifyError("Erro ao deletar logs: " + errorMessage(error));
    }
  };

  if (authLoading) {
    return <AuthLoadingScreen />;
  }

  if (!user) {
    return (
      <LoginScreen
        onLogin={loginWithGoogle}
        authError={authError}
        authBusy={authBusy}
      />
    );
  }

  return (
    <Dashboard
      userId={user.uid}
      hacks={hacks}
      consequences={consequences}
      logs={logs}
      onLogAction={writeLog}
      onClearLogs={handleClearLogs}
      loadingClear={clearing}
      onLogout={logout}
      logoutBusy={authBusy}
      notification={notification}
    />
  );
}

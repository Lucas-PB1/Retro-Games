import { useState, useEffect } from "react";
import { User, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider, errorMessage } from "../lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    if (authBusy) return;
    setAuthError(null);
    setAuthBusy(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login Error:", error);
      setAuthError(errorMessage(error));
    } finally {
      setAuthBusy(false);
    }
  };

  const logout = async () => {
    if (authBusy) return;
    setAuthError(null);
    setAuthBusy(true);
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
      setAuthError(errorMessage(error));
    } finally {
      setAuthBusy(false);
    }
  };

  return { user, authLoading, authBusy, authError, loginWithGoogle, logout };
}

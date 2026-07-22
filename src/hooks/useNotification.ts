import { useState, useEffect, useCallback } from "react";

export type Notification = { message: string; type: "success" | "error" };

export function useNotification(ms = 5000) {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), ms);
    return () => clearTimeout(timer);
  }, [notification, ms]);

  const notifySuccess = useCallback((message: string) => {
    setNotification({ message, type: "success" });
  }, []);

  const notifyError = useCallback((message: string) => {
    setNotification({ message, type: "error" });
  }, []);

  return { notification, setNotification, notifySuccess, notifyError };
}

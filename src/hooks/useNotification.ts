import { useState, useEffect } from "react";

export type Notification = { message: string; type: "success" | "error" };

export function useNotification(ms = 5000) {
  const [notification, setNotification] = useState<Notification | null>(null);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), ms);
    return () => clearTimeout(timer);
  }, [notification, ms]);

  return { notification, setNotification };
}

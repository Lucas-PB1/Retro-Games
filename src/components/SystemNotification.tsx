import type { Notification } from "../hooks/useNotification";

interface SystemNotificationProps {
  notification: Notification;
}

export default function SystemNotification({ notification }: SystemNotificationProps) {
  const isError = notification.type === "error";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-50 bg-[#0d0a08] border-2 p-4 rounded-none max-w-sm shadow-2xl animate-fade-in ${
        isError
          ? "border-red-500 text-red-400 shadow-red-500/10"
          : "border-[#ffb000] text-[#ffb000] shadow-[#ffb000]/10"
      }`}
    >
      <p
        className={`font-retro text-[9px] uppercase tracking-widest border-b pb-1 mb-2 flex items-center gap-1.5 ${
          isError ? "text-red-400 border-red-500/20" : "text-[#ffb000] border-[#ffb000]/20"
        }`}
      >
        <span
          className={`inline-block w-1.5 h-1.5 animate-pulse ${
            isError ? "bg-red-500" : "bg-[#ffb000]"
          }`}
        />
        [ NOTIFICADOR DO SISTEMA ]
      </p>
      <p className="font-mono text-xs text-stone-200">{notification.message}</p>
    </div>
  );
}

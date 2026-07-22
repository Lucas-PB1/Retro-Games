import type { ReactNode } from "react";
import { cn } from "../lib/cn";

interface RetroTabProps {
  id: string;
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

export default function RetroTab({ id, active, onClick, children }: RetroTabProps) {
  return (
    <button
      id={id}
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "py-2 px-3 sm:py-3.5 sm:px-4 font-retro text-[9px] sm:text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 rounded-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ffb000]",
        active
          ? "bg-[#332200] text-[#ffb000] border border-[#ffb000] font-bold glow-amber"
          : "bg-[#16120e] text-[#ffb000]/50 hover:bg-[#211a14] hover:text-[#ffb000]/80"
      )}
    >
      {children}
    </button>
  );
}

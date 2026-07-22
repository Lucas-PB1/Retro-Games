import { cn } from "../lib/cn";
import type { UploadType } from "../lib/uploadJson";

interface UploadTypeTabsProps {
  uploadType: UploadType;
  onChange: (type: UploadType) => void;
}

export default function UploadTypeTabs({ uploadType, onChange }: UploadTypeTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="Tipo de fita JSON"
      className="grid grid-cols-2 gap-2 mb-4"
    >
      <button
        id="tab-hacks-upload"
        type="button"
        role="tab"
        aria-selected={uploadType === "hacks"}
        onClick={() => onChange("hacks")}
        className={cn(
          "py-2 px-3 text-xs uppercase font-retro flex items-center justify-center gap-1.5 rounded-none transition-all border-2 cursor-pointer",
          uploadType === "hacks"
            ? "bg-[#ffb000] border-[#ffb000] text-[#0d0a08] font-black"
            : "border-[#ffb000]/30 text-[#ffb000]/60 hover:text-[#ffb000] hover:bg-[#332200]"
        )}
      >
        Lista de Códigos
      </button>
      <button
        id="tab-consq-upload"
        type="button"
        role="tab"
        aria-selected={uploadType === "consequences"}
        onClick={() => onChange("consequences")}
        className={cn(
          "py-2 px-3 text-xs uppercase font-retro flex items-center justify-center gap-1.5 rounded-none transition-all border-2 cursor-pointer",
          uploadType === "consequences"
            ? "bg-[#ffb000] border-[#ffb000] text-[#0d0a08] font-black"
            : "border-[#ffb000]/30 text-[#ffb000]/60 hover:text-[#ffb000] hover:bg-[#332200]"
        )}
      >
        Consequências
      </button>
    </div>
  );
}

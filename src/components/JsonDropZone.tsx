import { useRef, type ChangeEvent, type DragEvent } from "react";
import { FileJson } from "lucide-react";
import { cn } from "../lib/cn";

interface JsonDropZoneProps {
  dragActive: boolean;
  selectedFileName: string | null;
  onDragState: (active: boolean) => void;
  onFile: (file: File) => void;
}

export default function JsonDropZone({
  dragActive,
  selectedFileName,
  onDragState,
  onFile,
}: JsonDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      onDragState(true);
    } else if (e.type === "dragleave") {
      onDragState(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onDragState(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onFile(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={cn(
        "border-2 border-dashed rounded-none p-6 text-center transition-all relative mb-4 flex flex-col items-center justify-center cursor-pointer min-h-[140px]",
        dragActive
          ? "border-emerald-500 bg-emerald-950/20 text-[#ffb000] scale-[1.01]"
          : "border-[#ffb000]/40 hover:border-[#ffb000] bg-[#0d0a08]"
      )}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Carregar arquivo JSON"
    >
      <input
        id="file-loader-input"
        ref={inputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />

      <FileJson
        className={cn(
          "w-8 h-8 mb-2",
          dragActive ? "text-emerald-400 animate-bounce" : "text-[#ffb000]/60"
        )}
      />

      {selectedFileName ? (
        <div>
          <p className="font-retro text-[9px] text-emerald-400 uppercase glow-emerald mb-1">
            Fita de Dados Acoplada com Sucesso
          </p>
          <p className="font-mono text-xs text-[#ffb000] font-bold border border-[#ffb000]/30 py-1 px-2.5 bg-[#1a140f] max-w-xs truncate mx-auto">
            [ {selectedFileName} ]
          </p>
          <p className="font-mono text-[9px] text-[#ffb000]/50 mt-1 uppercase">
            Arraste outro arquivo ou clique aqui para alterar
          </p>
        </div>
      ) : (
        <div>
          <p className="font-retro text-[9px] text-[#ffb000]/90 uppercase tracking-widest">
            Inserir Fita Magnética (.JSON)
          </p>
          <p className="font-mono text-xs text-[#ffb000]/65 mt-1 max-w-xs mx-auto">
            Arraste seu arquivo JSON aqui ou clique para selecionar.
          </p>
        </div>
      )}
    </div>
  );
}

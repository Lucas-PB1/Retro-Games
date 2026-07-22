import { Play, Sparkles, FileJson } from "lucide-react";
import type { WriteLogFn } from "../types";
import { useJsonUploadForm } from "../hooks/useJsonUploadForm";
import MemoryStats from "./MemoryStats";
import UploadTypeTabs from "./UploadTypeTabs";
import JsonDropZone from "./JsonDropZone";
import JsonManualEditor from "./JsonManualEditor";
import UploadFeedback from "./UploadFeedback";

interface JSONUploaderProps {
  userId: string;
  onUploadSuccess: () => void;
  onLogAction: WriteLogFn;
  existingHacksCount: number;
  existingConsequencesCount: number;
}

export default function JSONUploader({
  userId,
  onUploadSuccess,
  onLogAction,
  existingHacksCount,
  existingConsequencesCount,
}: JSONUploaderProps) {
  const form = useJsonUploadForm(userId, onLogAction, onUploadSuccess);

  return (
    <div
      id="retro-loader-panel"
      className="border-2 border-[#ffb000] bg-[#1a140f] p-4 relative font-sans text-[#ffb000]"
    >
      <div className="flex items-center justify-between border-b-2 border-[#ffb000] pb-2 mb-4">
        <div className="flex items-center gap-2">
          <FileJson className="w-5 h-5 text-[#ffb000]" />
          <span className="font-retro text-xs tracking-wider text-[#ffb000]">
            FILTRE DISQUETES // JSON
          </span>
        </div>
        <div className="text-right text-[10px] uppercase font-mono text-[#ffb000]/60">
          Setor de memória ativa
        </div>
      </div>

      <MemoryStats
        hacksCount={existingHacksCount}
        consequencesCount={existingConsequencesCount}
      />

      <UploadTypeTabs uploadType={form.uploadType} onChange={form.setUploadTypeAndClear} />

      <JsonDropZone
        dragActive={form.dragActive}
        selectedFileName={form.selectedFileName}
        onDragState={form.setDragActive}
        onFile={form.processFile}
      />

      <JsonManualEditor
        uploadType={form.uploadType}
        value={form.jsonInput}
        onChange={form.setJsonInput}
      />

      <UploadFeedback errorMsg={form.errorMsg} successMsg={form.successMsg} />

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          id="btn-load-retro-presets"
          type="button"
          onClick={form.loadPresets}
          className="flex-1 py-2 px-3 border border-[#ffb000] bg-[#332200] hover:bg-[#4d3300] text-[10px] rounded-none font-retro flex items-center justify-center gap-1.5 text-[#ffb000]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ffb000]" />
          CARREGAR PRESET 1965
        </button>

        <button
          id="btn-confirm-upload"
          type="button"
          disabled={form.loading}
          onClick={form.upload}
          className="flex-1 py-2 px-4 bg-[#ffb000] hover:bg-[#ffc845] disabled:bg-[#332200] disabled:text-[#ffb000]/40 border-2 border-[#ffb000] text-[#0d0a08] font-retro text-[11px] font-black rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {form.loading ? (
            "PROCESSANDO..."
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-[#0d0a08]" />
              SINCRONIZAR FIREBASE
            </>
          )}
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Play, Sparkles, FileJson } from "lucide-react";
import { WriteLogFn } from "../types";
import { errorMessage } from "../lib/firebase";
import { PRESET_CONSEQUENCES, PRESET_HACKS } from "../lib/presets";
import {
  uploadConsequencesFromJson,
  uploadHacksFromJson,
  type UploadType,
} from "../lib/uploadJson";
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
  const [jsonInput, setJsonInput] = useState("");
  const [uploadType, setUploadType] = useState<UploadType>("hacks");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const processFile = (file: File) => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!file.name.endsWith(".json")) {
      setErrorMsg("O arquivo transmitido precisa ser obrigatoriamente da extensão '.json'.");
      setSelectedFileName(null);
      return;
    }

    setSelectedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = String(event.target?.result ?? "");
        JSON.parse(text);
        setJsonInput(text);
        setSuccessMsg(`Fita de dados "${file.name}" carregada com sucesso no buffer.`);
      } catch (err) {
        setErrorMsg(`Erro de sintaxe no arquivo JSON: ${errorMessage(err)}`);
        setSelectedFileName(null);
      }
    };
    reader.onerror = () => {
      setErrorMsg("Falha crítica ao ler o arquivo físico.");
      setSelectedFileName(null);
    };
    reader.readAsText(file);
  };

  const clearInput = () => {
    setJsonInput("");
    setErrorMsg(null);
    setSuccessMsg(null);
    setSelectedFileName(null);
  };

  const handleTypeChange = (type: UploadType) => {
    setUploadType(type);
    clearInput();
  };

  const handleLoadPresets = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSelectedFileName("PRESET_INTERNO_1965.json");
    setJsonInput(
      JSON.stringify(uploadType === "hacks" ? PRESET_HACKS : PRESET_CONSEQUENCES, null, 2)
    );
  };

  const handleUpload = async () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    if (!jsonInput.trim()) {
      setErrorMsg("O campo JSON está vazio! Digite ou carregue o modelo sugerido.");
      setLoading(false);
      return;
    }

    try {
      if (uploadType === "hacks") {
        const count = await uploadHacksFromJson(jsonInput, userId);
        await onLogAction("reset", {
          custom: `Carregou ${count} códigos de Hack via JSON.`,
        });
        setSuccessMsg(
          `GRAVADO COM SUCESSO! ${count} novos códigos foram fundidos na fita de memória.`
        );
      } else {
        const count = await uploadConsequencesFromJson(jsonInput, userId);
        await onLogAction("reset", {
          custom: `Carregou ${count} Consequências via JSON.`,
        });
        setSuccessMsg(
          `GRAVADO COM SUCESSO! ${count} novas Consequências de fita de energia foram consolidadas.`
        );
      }

      onUploadSuccess();
      setJsonInput("");
    } catch (err) {
      console.error(err);
      if (err instanceof SyntaxError) {
        setErrorMsg(`ERRO DE SINTAXE JSON: ${err.message}. Verifique vírgulas, aspas duplas, etc.`);
      } else {
        setErrorMsg(`ERRO DE CARREGAMENTO: ${errorMessage(err)}`);
      }
    } finally {
      setLoading(false);
    }
  };

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

      <UploadTypeTabs uploadType={uploadType} onChange={handleTypeChange} />

      <JsonDropZone
        dragActive={dragActive}
        selectedFileName={selectedFileName}
        onDragState={setDragActive}
        onFile={processFile}
      />

      <JsonManualEditor
        uploadType={uploadType}
        value={jsonInput}
        onChange={setJsonInput}
      />

      <UploadFeedback errorMsg={errorMsg} successMsg={successMsg} />

      <div className="flex flex-col sm:flex-row gap-2">
        <button
          id="btn-load-retro-presets"
          type="button"
          onClick={handleLoadPresets}
          className="flex-1 py-2 px-3 border border-[#ffb000] bg-[#332200] hover:bg-[#4d3300] text-[10px] rounded-none font-retro flex items-center justify-center gap-1.5 text-[#ffb000]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#ffb000]" />
          CARREGAR PRESET 1965
        </button>

        <button
          id="btn-confirm-upload"
          type="button"
          disabled={loading}
          onClick={handleUpload}
          className="flex-1 py-2 px-4 bg-[#ffb000] hover:bg-[#ffc845] disabled:bg-[#332200] disabled:text-[#ffb000]/40 border-2 border-[#ffb000] text-[#0d0a08] font-retro text-[11px] font-black rounded-none transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {loading ? (
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

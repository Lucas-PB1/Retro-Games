import { useState, type ChangeEvent, type DragEvent } from "react";
import { Play, Sparkles, AlertTriangle, CheckCircle, FileJson } from "lucide-react";
import { WriteLogFn } from "../types";
import { errorMessage } from "../lib/firebase";
import { PRESET_CONSEQUENCES, PRESET_HACKS } from "../lib/presets";
import {
  uploadConsequencesFromJson,
  uploadHacksFromJson,
  type UploadType,
} from "../lib/uploadJson";

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const clearInput = () => {
    setJsonInput("");
    setErrorMsg(null);
    setSuccessMsg(null);
    setSelectedFileName(null);
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
          <span className="font-retro text-xs tracking-wider text-[#ffb000]">FILTRE DISQUETES // JSON</span>
        </div>
        <div className="text-right text-[10px] uppercase font-mono text-[#ffb000]/60">
          Setor de memória ativa
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 text-center font-mono text-xs">
        <div className="p-2 border border-[#ffb000]/30 bg-[#0d0a08] rounded-none">
          <p className="text-[#ffb000]/60 text-[10px]">MEMÓRIA HACKS</p>
          <p className="text-sm font-bold text-[#ffb000] glow-amber">{existingHacksCount} CÓDIGOS</p>
        </div>
        <div className="p-2 border border-[#ffb000]/30 bg-[#0d0a08] rounded-none">
          <p className="text-[#ffb000]/60 text-[10px]">MEMÓRIA CONSEQ.</p>
          <p className="text-sm font-bold text-[#ffb000] glow-amber">
            {existingConsequencesCount} EFEITOS
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          id="tab-hacks-upload"
          onClick={() => {
            setUploadType("hacks");
            clearInput();
          }}
          className={`py-2 px-3 text-xs uppercase font-retro flex items-center justify-center gap-1.5 rounded-none transition-all border-2 cursor-pointer ${
            uploadType === "hacks"
              ? "bg-[#ffb000] border-[#ffb000] text-[#0d0a08] font-black"
              : "border-[#ffb000]/30 text-[#ffb000]/60 hover:text-[#ffb000] hover:bg-[#332200]"
          }`}
        >
          Lista de Códigos
        </button>
        <button
          id="tab-consq-upload"
          onClick={() => {
            setUploadType("consequences");
            clearInput();
          }}
          className={`py-2 px-3 text-xs uppercase font-retro flex items-center justify-center gap-1.5 rounded-none transition-all border-2 cursor-pointer ${
            uploadType === "consequences"
              ? "bg-[#ffb000] border-[#ffb000] text-[#0d0a08] font-black"
              : "border-[#ffb000]/30 text-[#ffb000]/60 hover:text-[#ffb000] hover:bg-[#332200]"
          }`}
        >
          Consequências
        </button>
      </div>

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-none p-6 text-center transition-all relative ${
          dragActive
            ? "border-emerald-500 bg-emerald-950/20 text-[#ffb000] scale-[1.01]"
            : "border-[#ffb000]/40 hover:border-[#ffb000] bg-[#0d0a08]"
        } mb-4 flex flex-col items-center justify-center cursor-pointer min-h-[140px]`}
        onClick={() => document.getElementById("file-loader-input")?.click()}
      >
        <input
          id="file-loader-input"
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />

        <FileJson
          className={`w-8 h-8 mb-2 ${dragActive ? "text-emerald-400 animate-bounce" : "text-[#ffb000]/60"}`}
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

      <details className="mb-4 font-mono select-none group text-xs text-[#ffb000]/80">
        <summary className="cursor-pointer list-none flex items-center justify-between p-1.5 border border-[#ffb000]/20 bg-[#16120e] hover:bg-[#261d15] transition-all">
          <span className="text-[10px] uppercase font-retro tracking-wide">
            [ + ] Visualizar / Editar Código JSON Manual
          </span>
          <span className="text-[9px] text-[#ffb000]/50 uppercase tracking-widest group-open:hidden">
            Expandir
          </span>
          <span className="text-[9px] text-[#ffb000]/50 uppercase tracking-widest hidden group-open:inline">
            Recolher
          </span>
        </summary>
        <div className="p-3 border-x border-b border-[#ffb000]/20 bg-[#0d0a08] space-y-1">
          <label className="block text-[10px] uppercase tracking-wider text-[#ffb000]/65 mb-1">
            Buffer de comandos carregados (Edição habilitada):
          </label>
          <textarea
            id="json-textarea-input"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder={
              uploadType === "hacks"
                ? '[\n  {\n    "nome": "Vida Infinita",\n    "movimentos": "CIMA, CIMA, BAIXO, B, A",\n    "desc": "Te deixa com vida ilimitada para sobreviver a qualquer inimigo."\n  }\n]'
                : '[\n  {\n    "nome": "Ruído Verde",\n    "desc": "Fique pulando em um pé só por 30 segundos"\n  }\n]'
            }
            className="w-full h-32 bg-[#0d0a08] border border-[#ffb000]/40 rounded-none p-2 font-mono text-xs text-[#ffb000] focus:outline-none focus:border-[#ffb000] resize-none"
          />
        </div>
      </details>

      {errorMsg && (
        <div
          id="upload-panel-error"
          className="mb-4 p-3 border border-red-500 bg-red-950/20 text-red-400 rounded-none text-xs flex gap-2 items-start font-mono"
        >
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <div>
            <strong className="block uppercase text-red-500">Erro de Sintaxe:</strong>
            {errorMsg}
          </div>
        </div>
      )}

      {successMsg && (
        <div
          id="upload-panel-success"
          className="mb-4 p-3 border border-emerald-500 bg-emerald-950/20 text-emerald-400 rounded-none text-xs flex gap-2 items-start font-mono"
        >
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <strong className="block uppercase text-emerald-500">Transmissão Completa:</strong>
            {successMsg}
          </div>
        </div>
      )}

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

import React, { useState } from "react";
import { HackCode, Consequence } from "../types";
import { collection, doc, writeBatch, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError } from "../lib/firebase";
import { OperationType } from "../types";
import { Play, Sparkles, AlertTriangle, CheckCircle, FileJson, Trash2 } from "lucide-react";
import { db as firestoreDb } from "../lib/firebase";

interface JSONUploaderProps {
  userId: string;
  onUploadSuccess: () => void;
  onLogAction: (tipo: "roll_hack" | "consequence" | "reset", additional?: any) => Promise<void>;
  existingHacksCount: number;
  existingConsequencesCount: number;
}

// Retro 1960s Preset lists
const PRESET_HACKS = [
  { nome: "Konami Code (Vidas Extra)", movimentos: "A, B, CIMA, BAIXO, ESQUERDA, DIREITA, ESQUERDA, DIREITA, SELECT, START", desc: "Fornece 30 vidas adicionais para sobreviver a qualquer desafio extremo nos clássicos." },
  { nome: "God Mode (Invencibilidade)", movimentos: "DIREITA, L1, L2, CIMA, ESQUERDA, BAIXO, B, A, START", desc: "Torna o operador completamente imune a qualquer tipo de dano ou colisão hostil." },
  { nome: "Moon Jump (Gravidade Zero)", movimentos: "CIMA, CIMA, TRIANGULO, TRIANGULO, QUADRADO, QUADRADO, CIRCULO, X", desc: "Reduz a força gravitacional local permitindo saltos extremamente altos e flutuações." },
  { nome: "Unlock All Levels (Tudo Liberado)", movimentos: "L1, R1, L1, R2, BAIXO, CIMA, DIREITA, ESQUERDA", desc: "Desbloqueia imediatamente o acesso a todas as salas, fases e segredos do circuito." },
  { nome: "Turbo Speed (Velocidade Máxima)", movimentos: "R1, R2, L1, L2, ESQUERDA, BAIXO, DIREITA, CIMA", desc: "Aumenta drasticamente a velocidade de movimentação e reação do personagem." }
];

const PRESET_CONSEQUENCES = [
  { nome: "Tela de Ruído CRT", desc: "A tela da sua TV antiga chiar no canal 3! Fique sem olhar para a tela por 15 segundos." },
  { nome: "Controles Invertidos", desc: "Sua coordenação motora falhou! Seus eixos principais de direção ficam invertidos." },
  { nome: "Perda de Áudio", desc: "O cabo de áudio RCA soltou! Jogue em completo silêncio absoluto no próximo desafio." },
  { nome: "Modo Preto e Branco", desc: "O fósforo colorido queimou! Toda a sala de jogos entra no modo analógico monocromático." },
  { nome: "Pane no Sistema", desc: "Sobrecarga de energia no transformador do console. Reinicie o último puzzle do zero." }
];

export default function JSONUploader({
  userId,
  onUploadSuccess,
  onLogAction,
  existingHacksCount,
  existingConsequencesCount
}: JSONUploaderProps) {
  const [jsonInput, setJsonInput] = useState<string>("");
  const [uploadType, setUploadType] = useState<"hacks" | "consequences">("hacks");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
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
        const text = event.target?.result as string;
        // Verify JSON syntax right away for early feedback
        JSON.parse(text);
        setJsonInput(text);
        setSuccessMsg(`Fita de dados "${file.name}" carregada com sucesso no buffer.`);
      } catch (err: any) {
        setErrorMsg(`Erro de sintaxe no arquivo JSON: ${err.message}`);
        setSelectedFileName(null);
      }
    };
    reader.onerror = () => {
      setErrorMsg("Falha crítica ao ler o arquivo físico.");
      setSelectedFileName(null);
    };
    reader.readAsText(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleLoadPresets = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSelectedFileName("PRESET_INTERNO_1965.json");
    if (uploadType === "hacks") {
      setJsonInput(JSON.stringify(PRESET_HACKS, null, 2));
    } else {
      setJsonInput(JSON.stringify(PRESET_CONSEQUENCES, null, 2));
    }
  };

  const clearInput = () => {
    setJsonInput("");
    setErrorMsg(null);
    setSuccessMsg(null);
    setSelectedFileName(null);
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
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) {
        throw new Error("O JSON precisa ser obrigatoriamente um ARRAY de objetos.");
      }

      const batch = writeBatch(firestoreDb);

      if (uploadType === "hacks") {
        // Validate fields for Hacks: nome, movimentos and desc (all string)
        for (const item of parsed) {
          if (!item.nome || typeof item.nome !== "string") {
            throw new Error(`Contém item com campo 'nome' inválido ou ausente: ${JSON.stringify(item)}`);
          }
          if (!item.movimentos || typeof item.movimentos !== "string") {
            throw new Error(`Contém item com campo 'movimentos' inválido ou ausente: ${JSON.stringify(item)}`);
          }
          if (!item.desc || typeof item.desc !== "string") {
            throw new Error(`Contém item com campo 'desc' (descrição) inválido ou ausente: ${JSON.stringify(item)}`);
          }

          // Enforce size protections (as requested in rules)
          if (item.nome.length > 100) item.nome = item.nome.substring(0, 100);
          if (item.movimentos.length > 100) item.movimentos = item.movimentos.substring(0, 100);
          if (item.desc.length > 250) item.desc = item.desc.substring(0, 250);

          // Generate sequential IDs cleanly without special characters or long junk
          const safeId = "hack_" + Math.random().toString(36).substring(2, 10);
          const hackDocRef = doc(collection(firestoreDb, "hack_codes"), safeId);

          batch.set(hackDocRef, {
            id: safeId,
            nome: item.nome,
            movimentos: item.movimentos,
            desc: item.desc,
            revelado: false,
            userId: userId,
            createdAt: serverTimestamp()
          });
        }

        await batch.commit();
        await onLogAction("reset", { custom: `Carregou ${parsed.length} códigos de Hack via JSON.` });
        setSuccessMsg(`GRAVADO COM SUCESSO! ${parsed.length} novos códigos foram fundidos na fita de memória.`);
      } else {
        // Validate fields for Consequences: nome and desc (both string)
        for (const item of parsed) {
          if (!item.nome || typeof item.nome !== "string") {
            throw new Error(`Contém item com campo 'nome' inválido ou ausente: ${JSON.stringify(item)}`);
          }
          if (!item.desc || typeof item.desc !== "string") {
            throw new Error(`Contém item com campo 'desc' (descrição) inválido ou ausente: ${JSON.stringify(item)}`);
          }

          // Limit length for security
          if (item.nome.length > 100) item.nome = item.nome.substring(0, 100);
          if (item.desc.length > 250) item.desc = item.desc.substring(0, 250);

          const safeId = "consq_" + Math.random().toString(36).substring(2, 10);
          const consqDocRef = doc(collection(firestoreDb, "consequences"), safeId);

          batch.set(consqDocRef, {
            id: safeId,
            nome: item.nome,
            desc: item.desc,
            userId: userId,
            createdAt: serverTimestamp()
          });
        }

        await batch.commit();
        await onLogAction("reset", { custom: `Carregou ${parsed.length} Consequências via JSON.` });
        setSuccessMsg(`GRAVADO COM SUCESSO! ${parsed.length} novas Consequências de fita de energia foram consolidadas.`);
      }

      onUploadSuccess();
      setJsonInput("");
    } catch (err: any) {
      console.error(err);
      if (err instanceof SyntaxError) {
        setErrorMsg(`ERRO DE SINTAXE JSON: ${err.message}. Verifique vírgulas, aspas duplas, etc.`);
      } else {
        setErrorMsg(`ERRO DE CARREGAMENTO: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="retro-loader-panel" className="border-2 border-[#ffb000] bg-[#1a140f] p-4 relative font-sans text-[#ffb000]">
      {/* Upper Retro Dial Label */}
      <div className="flex items-center justify-between border-b-2 border-[#ffb000] pb-2 mb-4">
        <div className="flex items-center gap-2">
          <FileJson className="w-5 h-5 text-[#ffb000]" />
          <span className="font-retro text-xs tracking-wider text-[#ffb000]">FILTRE DISQUETES // JSON</span>
        </div>
        <div className="text-right text-[10px] uppercase font-mono text-[#ffb000]/60">
          Setor de memória ativa
        </div>
      </div>

      {/* Database Quick Counters */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-center font-mono text-xs">
        <div className="p-2 border border-[#ffb000]/30 bg-[#0d0a08] rounded-none">
          <p className="text-[#ffb000]/60 text-[10px]">MEMÓRIA HACKS</p>
          <p className="text-sm font-bold text-[#ffb000] glow-amber">{existingHacksCount} CÓDIGOS</p>
        </div>
        <div className="p-2 border border-[#ffb000]/30 bg-[#0d0a08] rounded-none">
          <p className="text-[#ffb000]/60 text-[10px]">MEMÓRIA CONSEQ.</p>
          <p className="text-sm font-bold text-[#ffb000] glow-amber">{existingConsequencesCount} EFEITOS</p>
        </div>
      </div>

      {/* Select Category Dial Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <button
          id="tab-hacks-upload"
          onClick={() => { setUploadType("hacks"); clearInput(); }}
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
          onClick={() => { setUploadType("consequences"); clearInput(); }}
          className={`py-2 px-3 text-xs uppercase font-retro flex items-center justify-center gap-1.5 rounded-none transition-all border-2 cursor-pointer ${
            uploadType === "consequences"
              ? "bg-[#ffb000] border-[#ffb000] text-[#0d0a08] font-black"
              : "border-[#ffb000]/30 text-[#ffb000]/60 hover:text-[#ffb000] hover:bg-[#332200]"
          }`}
        >
          Consequências
        </button>
      </div>

      {/* GLORIOUS RETRO DROPZONE (Leitor de Cartão Perfurado) */}
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
        
        <FileJson className={`w-8 h-8 mb-2 ${dragActive ? "text-emerald-400 animate-bounce" : "text-[#ffb000]/60"}`} />
        
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

      {/* Collapsible Text Area for Input (Verification / Tweak mode) */}
      <details className="mb-4 font-mono select-none group text-xs text-[#ffb000]/80">
        <summary className="cursor-pointer list-none flex items-center justify-between p-1.5 border border-[#ffb000]/20 bg-[#16120e] hover:bg-[#261d15] transition-all">
          <span className="text-[10px] uppercase font-retro tracking-wide">
            [ + ] Visualizar / Editar Código JSON Manual
          </span>
          <span className="text-[9px] text-[#ffb000]/50 uppercase tracking-widest group-open:hidden">Expandir</span>
          <span className="text-[9px] text-[#ffb000]/50 uppercase tracking-widest hidden group-open:inline">Recolher</span>
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

      {/* Error & Success indicators */}
      {errorMsg && (
        <div id="upload-panel-error" className="mb-4 p-3 border border-red-500 bg-red-950/20 text-red-400 rounded-none text-xs flex gap-2 items-start font-mono">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <div>
            <strong className="block uppercase text-red-500">Erro de Sintaxe:</strong>
            {errorMsg}
          </div>
        </div>
      )}

      {successMsg && (
        <div id="upload-panel-success" className="mb-4 p-3 border border-emerald-500 bg-emerald-950/20 text-emerald-400 rounded-none text-xs flex gap-2 items-start font-mono">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <strong className="block uppercase text-emerald-500">Transmissão Completa:</strong>
            {successMsg}
          </div>
        </div>
      )}

      {/* Action switches panel */}
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
          {loading ? "PROCESSANDO..." : (
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

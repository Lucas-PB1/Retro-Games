import { useState } from "react";
import type { WriteLogFn } from "../types";
import { errorMessage } from "../lib/firebase";
import { PRESET_CONSEQUENCES, PRESET_HACKS } from "../lib/presets";
import {
  uploadConsequencesFromJson,
  uploadHacksFromJson,
  type UploadType,
} from "../lib/uploadJson";

export function useJsonUploadForm(
  userId: string,
  onLogAction: WriteLogFn,
  onUploadSuccess: () => void
) {
  const [jsonInput, setJsonInput] = useState("");
  const [uploadType, setUploadType] = useState<UploadType>("hacks");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const clearInput = () => {
    setJsonInput("");
    setErrorMsg(null);
    setSuccessMsg(null);
    setSelectedFileName(null);
  };

  const setUploadTypeAndClear = (type: UploadType) => {
    setUploadType(type);
    clearInput();
  };

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

  const loadPresets = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    setSelectedFileName("PRESET_INTERNO_1965.json");
    setJsonInput(
      JSON.stringify(uploadType === "hacks" ? PRESET_HACKS : PRESET_CONSEQUENCES, null, 2)
    );
  };

  const upload = async () => {
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

  return {
    jsonInput,
    setJsonInput,
    uploadType,
    setUploadTypeAndClear,
    errorMsg,
    successMsg,
    loading,
    dragActive,
    setDragActive,
    selectedFileName,
    processFile,
    loadPresets,
    upload,
  };
}

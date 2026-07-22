import { AlertTriangle, CheckCircle } from "lucide-react";

interface UploadFeedbackProps {
  errorMsg: string | null;
  successMsg: string | null;
}

export default function UploadFeedback({ errorMsg, successMsg }: UploadFeedbackProps) {
  return (
    <>
      {errorMsg && (
        <div
          id="upload-panel-error"
          role="alert"
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
          role="status"
          className="mb-4 p-3 border border-emerald-500 bg-emerald-950/20 text-emerald-400 rounded-none text-xs flex gap-2 items-start font-mono"
        >
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <div>
            <strong className="block uppercase text-emerald-500">Transmissão Completa:</strong>
            {successMsg}
          </div>
        </div>
      )}
    </>
  );
}

import type { UploadType } from "../lib/uploadJson";

interface JsonManualEditorProps {
  uploadType: UploadType;
  value: string;
  onChange: (value: string) => void;
}

const PLACEHOLDER_HACKS = `[
  {
    "nome": "Vida Infinita",
    "movimentos": "CIMA, CIMA, BAIXO, B, A",
    "desc": "Te deixa com vida ilimitada para sobreviver a qualquer inimigo."
  }
]`;

const PLACEHOLDER_CONSEQUENCES = `[
  {
    "nome": "Ruído Verde",
    "desc": "Fique pulando em um pé só por 30 segundos"
  }
]`;

export default function JsonManualEditor({
  uploadType,
  value,
  onChange,
}: JsonManualEditorProps) {
  return (
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
        <label
          htmlFor="json-textarea-input"
          className="block text-[10px] uppercase tracking-wider text-[#ffb000]/65 mb-1"
        >
          Buffer de comandos carregados (Edição habilitada):
        </label>
        <textarea
          id="json-textarea-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={uploadType === "hacks" ? PLACEHOLDER_HACKS : PLACEHOLDER_CONSEQUENCES}
          className="w-full h-32 bg-[#0d0a08] border border-[#ffb000]/40 rounded-none p-2 font-mono text-xs text-[#ffb000] focus:outline-none focus:border-[#ffb000] resize-none"
        />
      </div>
    </details>
  );
}

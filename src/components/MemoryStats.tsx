interface MemoryStatsProps {
  hacksCount: number;
  consequencesCount: number;
}

export default function MemoryStats({ hacksCount, consequencesCount }: MemoryStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 mb-4 text-center font-mono text-xs">
      <div className="p-2 border border-[#ffb000]/30 bg-[#0d0a08] rounded-none">
        <p className="text-[#ffb000]/60 text-[10px]">MEMÓRIA HACKS</p>
        <p className="text-sm font-bold text-[#ffb000] glow-amber">{hacksCount} CÓDIGOS</p>
      </div>
      <div className="p-2 border border-[#ffb000]/30 bg-[#0d0a08] rounded-none">
        <p className="text-[#ffb000]/60 text-[10px]">MEMÓRIA CONSEQ.</p>
        <p className="text-sm font-bold text-[#ffb000] glow-amber">{consequencesCount} EFEITOS</p>
      </div>
    </div>
  );
}

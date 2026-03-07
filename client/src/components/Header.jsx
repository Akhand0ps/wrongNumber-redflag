export default function Header() {
  return (
    <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto w-full">
      <div className="flex items-center gap-2">
        <span className="text-white font-bold text-base tracking-tight">
          wrong<span className="text-red-500">Number</span>
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">
          RedFlag
        </span>
      </div>
      <span className="text-[11px] text-white/20 tracking-wide hidden sm:block">
        LPU Computing & AI Expo 2026
      </span>
    </header>
  )
}

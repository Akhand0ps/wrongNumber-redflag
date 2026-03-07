export default function ErrorBlock({ error }) {
  if (!error) return null
  return (
    <div className="mt-6 w-full max-w-xl bg-red-500/5 border border-red-500/20 rounded-2xl px-4 py-3 text-red-400 text-sm flex items-center gap-2">
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      {error}
    </div>
  )
}

import { useState } from "react"
import axios from "axios"

const API_URL = "http://localhost:3000/api/v1/analyze"

const riskConfig = {
  DANGER:  {
    border: "border-red-500",
    glow: "shadow-red-500/20",
    badge: "bg-red-500/10 text-red-400 border border-red-500/30",
    bar: "bg-red-500",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
    label: "HIGH RISK",
    sub: "Likely Fraud — Do not respond or click any links",
    color: "text-red-400",
  },
  WARNING: {
    border: "border-yellow-500",
    glow: "shadow-yellow-500/20",
    badge: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
    bar: "bg-yellow-500",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3.75h.007v.008H12v-.008zm0-16.5C6.201 0 1.5 4.701 1.5 10.5S6.201 21 12 21s10.5-4.701 10.5-10.5S17.799 0 12 0z" />
      </svg>
    ),
    label: "SUSPICIOUS",
    sub: "Proceed with caution — Verify through official channels",
    color: "text-yellow-400",
  },
  SAFE: {
    border: "border-emerald-500",
    glow: "shadow-emerald-500/20",
    badge: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    bar: "bg-emerald-500",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: "SAFE",
    sub: "Looks legitimate — No fraud indicators detected",
    color: "text-emerald-400",
  },
}

const SAMPLES = [
  "Your UPI account will be blocked. Verify KYC immediately at bit.ly/upi-kyc",
  "Congratulations! You've won ₹50,000. Send ₹500 processing fee to claim prize.",
  "UPI payment of Rs.350 to BigBasket successful. Thank you for shopping.",
]

const DETECTS = [
  { label: "UPI Scams", icon: "💳" },
  { label: "Phishing Links", icon: "🔗" },
  { label: "Fake KYC Alerts", icon: "🪪" },
  { label: "Loan App Fraud", icon: "💸" },
  { label: "Prize / Lottery Scams", icon: "🎰" },
  { label: "OTP Theft Attempts", icon: "🔐" },
]

export default function App() {
  const [message, setMessage] = useState("")
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const analyze = async () => {
    if (!message.trim()) return
    setLoading(true)
    setResult(null)
    setError(null)
    try {
      const res = await axios.post(API_URL, { message })
      setResult(res.data.result)
    } catch {
      setError("Service unavailable. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) analyze()
  }

  const risk = result ? riskConfig[result.risk_level] : null

  return (
    <div className="min-h-screen bg-[#080810] text-white flex flex-col">

      {/* ── Top Nav ── */}
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

      {/* ── Hero ── */}
      <main className="flex-1 flex flex-col items-center px-4 pt-14 pb-20">
        <div className="text-center max-w-xl mb-10">
          {/* Shield icon */}
          <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            Detect Fraud Before<br />
            <span className="text-red-500">It Costs You</span>
          </h1>
          <p className="mt-3 text-white/40 text-sm leading-relaxed max-w-md mx-auto">
            AI-trained on Indian fraud datasets to identify UPI scams, phishing messages,
            fake KYC alerts, and more — in real time.
          </p>
        </div>

        {/* ── Detect chips ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-lg">
          {DETECTS.map(d => (
            <span key={d.label} className="text-xs text-white/40 border border-white/8 rounded-full px-3 py-1 flex items-center gap-1.5">
              <span>{d.icon}</span>{d.label}
            </span>
          ))}
        </div>

        {/* ── Input card ── */}
        <div className="w-full max-w-xl">
          <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-1.5">
            <textarea
              rows={5}
              className="w-full bg-transparent rounded-xl px-4 pt-3.5 pb-2 text-sm text-white/80 placeholder-white/20 focus:outline-none resize-none leading-relaxed"
              placeholder="Paste a suspicious message, UPI ID, or loan offer here..."
              value={message}
              onChange={e => { setMessage(e.target.value); setResult(null); setError(null) }}
              onKeyDown={handleKey}
            />
            <div className="flex items-center justify-between px-3 pb-2">
              <span className="text-[11px] text-white/15">Ctrl+Enter to analyze</span>
              <button
                onClick={analyze}
                disabled={loading || !message.trim()}
                className="bg-red-600 hover:bg-red-500 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    Analyzing
                  </span>
                ) : "Analyze"}
              </button>
            </div>
          </div>

          {/* Sample messages */}
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="text-[11px] text-white/20 self-center">Try:</span>
            {SAMPLES.map((s, i) => (
              <button
                key={i}
                onClick={() => { setMessage(s); setResult(null); setError(null) }}
                className="text-[11px] text-white/30 hover:text-white/60 border border-white/8 hover:border-white/20 rounded-full px-3 py-1 transition-all truncate max-w-[200px]"
              >
                {s.slice(0, 38)}…
              </button>
            ))}
          </div>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="mt-6 w-full max-w-xl bg-red-500/5 border border-red-500/20 rounded-2xl px-4 py-3 text-red-400 text-sm flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            {error}
          </div>
        )}

        {/* ── Result ── */}
        {result && risk && (
          <div className={`mt-6 w-full max-w-xl bg-white/[0.02] border ${risk.border} rounded-2xl p-5 shadow-xl ${risk.glow}`}>
            {/* Verdict */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className={`flex items-center gap-2 ${risk.color} font-bold text-lg`}>
                  {risk.icon}
                  {risk.label}
                </div>
                <p className="text-white/40 text-xs mt-0.5">{risk.sub}</p>
              </div>
              <span className={`shrink-0 text-sm font-bold px-3 py-1 rounded-full ${risk.badge}`}>
                {result.confidence}%
              </span>
            </div>

            {/* Confidence bar */}
            <div className="mt-4">
              <div className="flex justify-between text-[11px] text-white/25 mb-1.5">
                <span>Confidence Score</span>
                <span>{result.confidence}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${risk.bar}`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>

            {/* Analyzed text */}
            <div className="mt-4 bg-white/[0.03] border border-white/8 rounded-xl p-3">
              <p className="text-[11px] text-white/25 mb-1 uppercase tracking-wider">Message analyzed</p>
              <p className="text-white/55 text-xs leading-relaxed break-words">{message}</p>
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 py-5 text-center px-4">
        <p className="text-[11px] text-white/15 tracking-wide">
          wrongNumber: RedFlag &nbsp;·&nbsp; AI Fraud Detection &nbsp;·&nbsp; LPU Computing & AI Expo 2026
        </p>
      </footer>

    </div>
  )
}
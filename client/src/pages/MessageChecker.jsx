import { useState } from "react"
import { analyzeMessage } from "../api"
import ResultCard from "../components/ResultCard"
import ErrorBlock from "../components/ErrorBlock"
import Spinner from "../components/Spinner"

const SAMPLES = [
  "Your UPI account will be blocked. Verify KYC immediately at bit.ly/upi-kyc",
  "Congratulations! You've won ₹50,000. Send ₹500 processing fee to claim prize.",
  "UPI payment of Rs.350 to BigBasket successful. Thank you for shopping.",
]

export default function MessageChecker() {
  const [message, setMessage] = useState("")
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const analyze = async () => {
    if (!message.trim()) return
    setLoading(true); setResult(null); setError(null)
    try {
      const res = await analyzeMessage(message)
      setResult(res.data.result)
    } catch {
      setError("Service unavailable. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const reset = (val = "") => { setMessage(val); setResult(null); setError(null) }

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-white/35 text-sm text-center max-w-md mb-7 leading-relaxed">
        Paste a suspicious SMS, WhatsApp message, or UPI alert. Detects phishing,
        fake KYC alerts, prize scams, and more.
      </p>

      <div className="w-full max-w-xl">
        <div className="bg-white/3 border border-white/8 rounded-2xl p-1.5">
          <textarea
            rows={5}
            className="w-full bg-transparent rounded-xl px-4 pt-3.5 pb-2 text-sm text-white/80 placeholder-white/20 focus:outline-none resize-none leading-relaxed"
            placeholder="Paste a suspicious message here..."
            value={message}
            onChange={e => reset(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (e.ctrlKey || e.metaKey) && analyze()}
          />
          <div className="flex items-center justify-between px-3 pb-2">
            <span className="text-[11px] text-white/15">Ctrl+Enter to analyze</span>
            <button
              onClick={analyze}
              disabled={loading || !message.trim()}
              className="bg-red-600 hover:bg-red-500 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all"
            >
              {loading ? <Spinner /> : "Analyze"}
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-[11px] text-white/20 self-center">Try:</span>
          {SAMPLES.map((s, i) => (
            <button
              key={i}
              onClick={() => reset(s)}
              className="text-[11px] text-white/30 hover:text-white/60 border border-white/8 hover:border-white/20 rounded-full px-3 py-1 transition-all truncate max-w-50"
            >
              {s.slice(0, 38)}…
            </button>
          ))}
        </div>
      </div>

      <ErrorBlock error={error} />
      <ResultCard result={result} analyzed={message} analyzedLabel="Message analyzed" />
    </div>
  )
}

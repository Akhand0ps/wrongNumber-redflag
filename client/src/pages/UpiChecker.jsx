import { useState } from "react"
import { checkUpi } from "../api"
import ResultCard from "../components/ResultCard"
import ErrorBlock from "../components/ErrorBlock"
import Spinner from "../components/Spinner"

const SAMPLES = ["cashprize@ybl", "akhand@oksbi", "kyc.verify@paytm"]

export default function UpiChecker() {
  const [upiId, setUpiId]   = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState(null)

  const check = async () => {
    if (!upiId.trim()) return
    setLoading(true); setResult(null); setError(null)
    try {
      const res = await checkUpi(upiId)
      setResult(res.data.res)
    } catch {
      setError("Service unavailable. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const reset = (val = "") => { setUpiId(val); setResult(null); setError(null) }

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-white/35 text-sm text-center max-w-md mb-7 leading-relaxed">
        Enter a UPI ID to check if it belongs to a legitimate bank handle
        or shows common fraud patterns.
      </p>

      <div className="w-full max-w-xl">
        <div className="bg-white/3 border border-white/8 rounded-2xl p-1.5">
          <input
            type="text"
            className="w-full bg-transparent rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder-white/20 focus:outline-none font-mono"
            placeholder="e.g. username@oksbi"
            value={upiId}
            onChange={e => reset(e.target.value)}
            onKeyDown={e => e.key === "Enter" && check()}
          />
          <div className="flex items-center justify-between px-3 pb-2">
            <span className="text-[11px] text-white/15">Enter to check</span>
            <button
              onClick={check}
              disabled={loading || !upiId.trim()}
              className="bg-red-600 hover:bg-red-500 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-xl transition-all"
            >
              {loading ? <Spinner /> : "Check"}
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-[11px] text-white/20 self-center">Try:</span>
          {SAMPLES.map((s, i) => (
            <button
              key={i}
              onClick={() => reset(s)}
              className="text-[11px] text-white/30 hover:text-white/60 border border-white/8 hover:border-white/20 rounded-full px-3 py-1 transition-all font-mono"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <ErrorBlock error={error} />
      <ResultCard result={result} analyzed={upiId} analyzedLabel="UPI ID checked" />
    </div>
  )
}

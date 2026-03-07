import { useState } from "react"
import { checkLoanApp } from "../api"
import ResultCard from "../components/ResultCard"
import ErrorBlock from "../components/ErrorBlock"
import Spinner from "../components/Spinner"

const SAMPLES = ["KreditBee", "CashMama", "MobiKwik", "PhonePe"]

export default function LoanChecker() {
  const [appName, setAppName] = useState("")
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const check = async () => {
    if (!appName.trim()) return
    setLoading(true); setResult(null); setError(null)
    try {
      const res = await checkLoanApp(appName)
      setResult(res.data.res)
    } catch {
      setError("Service unavailable. Make sure the backend is running.")
    } finally {
      setLoading(false)
    }
  }

  const reset = (val = "") => { setAppName(val); setResult(null); setError(null) }

  return (
    <div className="flex flex-col items-center w-full">
      <p className="text-white/35 text-sm text-center max-w-md mb-7 leading-relaxed">
        Check if a loan app is RBI-registered or displays patterns of
        predatory / illegal lending.
      </p>

      <div className="w-full max-w-xl">
        <div className="bg-white/3 border border-white/8 rounded-2xl p-1.5">
          <input
            type="text"
            className="w-full bg-transparent rounded-xl px-4 py-3.5 text-sm text-white/80 placeholder-white/20 focus:outline-none"
            placeholder="e.g. KreditBee, CashMama, InstantLoan"
            value={appName}
            onChange={e => reset(e.target.value)}
            onKeyDown={e => e.key === "Enter" && check()}
          />
          <div className="flex items-center justify-between px-3 pb-2">
            <span className="text-[11px] text-white/15">Enter to check</span>
            <button
              onClick={check}
              disabled={loading || !appName.trim()}
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
              className="text-[11px] text-white/30 hover:text-white/60 border border-white/8 hover:border-white/20 rounded-full px-3 py-1 transition-all"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <ErrorBlock error={error} />
      <ResultCard result={result} analyzed={appName} analyzedLabel="App checked" />
    </div>
  )
}

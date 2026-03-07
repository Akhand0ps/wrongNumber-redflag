import { riskConfig } from "../constants/riskConfig"

export default function ResultCard({ result, analyzed, analyzedLabel = "Analyzed" }) {
  if (!result) return null
  const risk = riskConfig[result.risk_level]
  if (!risk) return null

  return (
    <div className={`mt-6 w-full max-w-xl bg-white/2 border ${risk.border} rounded-2xl p-5 shadow-xl ${risk.glow}`}>

      {/* Verdict */}
      <div className="flex items-start justify-between gap-3">
        <div className={`flex items-center gap-2 ${risk.color} font-bold text-lg`}>
          {risk.icon}
          {risk.label}
        </div>
        {result.confidence != null && (
          <span className={`shrink-0 text-sm font-bold px-3 py-1 rounded-full ${risk.badge}`}>
            {result.confidence}%
          </span>
        )}
      </div>

      {/* Confidence bar */}
      {result.confidence != null && (
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
      )}

      {/* Reasons */}
      {result.reasons?.length > 0 && (
        <div className="mt-4">
          <p className="text-[11px] text-white/25 uppercase tracking-wider mb-2">
            {result.risk_level === "SAFE" ? "Why it's safe" : "Why flagged"}
          </p>
          <ul className="space-y-1.5">
            {result.reasons.map((reason, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-white/55">
                <span className={`mt-0.5 shrink-0 w-1.5 h-1.5 rounded-full ${risk.dot}`} />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendation */}
      {result.recommendation && (
        <p className="mt-3 text-[11px] text-white/30 italic border-t border-white/5 pt-3">
          {result.recommendation}
        </p>
      )}

      {/* Input reviewed */}
      {analyzed && (
        <div className="mt-4 bg-white/3 border border-white/8 rounded-xl p-3">
          <p className="text-[11px] text-white/25 mb-1 uppercase tracking-wider">{analyzedLabel}</p>
          <p className="text-white/55 text-xs leading-relaxed wrap-break-word">{analyzed}</p>
        </div>
      )}
    </div>
  )
}

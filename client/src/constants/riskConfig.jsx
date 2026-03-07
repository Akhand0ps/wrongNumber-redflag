export const riskConfig = {
  DANGER: {
    border: "border-red-500",
    glow:   "shadow-red-500/20",
    badge:  "bg-red-500/10 text-red-400 border border-red-500/30",
    bar:    "bg-red-500",
    dot:    "bg-red-500",
    color:  "text-red-400",
    label:  "HIGH RISK",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  WARNING: {
    border: "border-yellow-500",
    glow:   "shadow-yellow-500/20",
    badge:  "bg-yellow-500/10 text-yellow-400 border border-yellow-500/30",
    bar:    "bg-yellow-500",
    dot:    "bg-yellow-500",
    color:  "text-yellow-400",
    label:  "SUSPICIOUS",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  UNKNOWN: {
    border: "border-yellow-500/50",
    glow:   "shadow-yellow-500/10",
    badge:  "bg-yellow-500/10 text-yellow-400/70 border border-yellow-500/20",
    bar:    "bg-yellow-500/50",
    dot:    "bg-yellow-500/50",
    color:  "text-yellow-400/70",
    label:  "UNVERIFIED",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  SAFE: {
    border: "border-emerald-500",
    glow:   "shadow-emerald-500/20",
    badge:  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
    bar:    "bg-emerald-500",
    dot:    "bg-emerald-500",
    color:  "text-emerald-400",
    label:  "SAFE",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
}

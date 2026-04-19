export default function HybridAiSavings() {
  const claudeOnly = [
    { label: "Claude Pro (base)", display: "$20/mo", note: "included", color: "destructive" },
    { label: "Extra usage — Claude API", display: "$80+/mo", note: "API billing", color: "destructive" },
  ];

  const hybrid = [
    { label: "Local model — Ollama + Modelfile", display: "—", note: "runs on your machine", color: "accent", free: true },
    { label: "HF inference endpoint (extra usage)", display: "$9/mo", note: "est. huggingface.co", color: "default", free: false },
  ];

  return (
    <div className="not-prose my-8 space-y-4">
      {/* Header */}
      <div
        className="rounded-xl border px-5 py-4"
        style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
      >
        <h3 className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>
          Monthly AI Cost — Claude-Only vs. Hybrid
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
          Assumes $20/mo Claude Pro subscription + $80+ of additional API usage. Hybrid routes bulk work to a local Ollama model — zero per-token cost.
        </p>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Claude-only */}
        <div
          className="rounded-xl border overflow-hidden flex flex-col"
          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
        >
          <div
            className="px-4 py-3 border-b flex items-center gap-2"
            style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--destructive) / 0.08)" }}
          >
            <span className="text-base">💸</span>
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "hsl(var(--destructive))" }}>
              Claude Only
            </span>
          </div>
          <div className="divide-y flex-1" style={{ borderColor: "hsl(var(--border))" }}>
            {claudeOnly.map((row) => (
              <div key={row.label} className="px-4 py-3 flex justify-between items-start gap-2">
                <div>
                  <p className="text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>
                    {row.label}
                  </p>
                  <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {row.note}
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold whitespace-nowrap" style={{ color: "hsl(var(--destructive))" }}>
                  {row.display}
                </span>
              </div>
            ))}
          </div>
          <div
            className="px-4 py-3 border-t mt-auto"
            style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--destructive) / 0.06)" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold" style={{ color: "hsl(var(--foreground))" }}>Total</span>
              <div className="text-right">
                <p className="text-xs font-mono font-bold" style={{ color: "hsl(var(--destructive))" }}>
                  $100+/mo
                </p>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  $1,200+/yr
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hybrid */}
        <div
          className="rounded-xl border overflow-hidden flex flex-col"
          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
        >
          <div
            className="px-4 py-3 border-b flex items-center gap-2"
            style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--accent) / 0.08)" }}
          >
            <span className="text-base">🤗</span>
            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "hsl(var(--accent))" }}>
              Hybrid (Ollama + Claude)
            </span>
          </div>
          <div className="divide-y flex-1" style={{ borderColor: "hsl(var(--border))" }}>
            {hybrid.map((row) => (
              <div key={row.label} className="px-4 py-3 flex justify-between items-start gap-2">
                <div>
                  <p className="text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>
                    {row.label}
                  </p>
                  <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                    {row.note}
                  </p>
                </div>
                <span
                  className="text-xs font-mono font-semibold whitespace-nowrap"
                  style={{ color: row.free ? "hsl(var(--accent))" : "hsl(var(--foreground))" }}
                >
                  {row.display}
                </span>
              </div>
            ))}
          </div>
          <div
            className="px-4 py-3 border-t mt-auto"
            style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--accent) / 0.06)" }}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold" style={{ color: "hsl(var(--foreground))" }}>Total</span>
              <div className="text-right">
                <p className="text-xs font-mono font-bold" style={{ color: "hsl(var(--accent))" }}>
                  $9/mo
                </p>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  $108/yr
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings callout */}
      <div
        className="rounded-xl border px-5 py-4 flex items-center gap-4"
        style={{ borderColor: "hsl(var(--primary) / 0.3)", background: "hsl(var(--primary) / 0.07)" }}
      >
        <span className="text-3xl">🎯</span>
        <div>
          <p className="text-2xl font-bold font-mono" style={{ color: "hsl(var(--primary))" }}>
            ~$1,100+/yr saved
          </p>
          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            by routing bulk tasks to a local Ollama model — Claude handles the precision work
          </p>
        </div>
      </div>
    </div>
  );
}

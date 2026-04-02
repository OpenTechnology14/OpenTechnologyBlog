export default function HybridAiSavings() {
  const claudeOnly = [
    { label: "Claude Pro (base)", cost: 20, note: "included" },
    { label: "Extra usage — 50% overage", cost: 60, note: "API billing" },
  ];
  const hybrid = [
    { label: "Claude Pro (base)", cost: 20, note: "included" },
    { label: "Extra usage — routed to HF", cost: 0, note: "self-hosted / PikaPods" },
    { label: "HF Inference endpoint (est.)", cost: 9, note: "PikaPods ~$9/mo" },
  ];

  const claudeTotal = claudeOnly.reduce((s, r) => s + r.cost, 0);
  const hybridTotal = hybrid.reduce((s, r) => s + r.cost, 0);
  const saved = claudeTotal - hybridTotal;
  const savedYearly = saved * 12;

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
          Assumes $20/mo Claude Pro subscription + ~$120 of additional API usage. Hybrid routes 50%+ of that extra load to Hugging Face.
        </p>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Claude-only */}
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
        >
          <div
            className="px-4 py-3 border-b flex items-center gap-2"
            style={{
              borderColor: "hsl(var(--border))",
              background: "hsl(var(--destructive) / 0.08)",
            }}
          >
            <span className="text-base">💸</span>
            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "hsl(var(--destructive))" }}
            >
              Claude Only
            </span>
          </div>
          <div className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
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
                <span
                  className="text-xs font-mono font-semibold whitespace-nowrap"
                  style={{ color: "hsl(var(--destructive))" }}
                >
                  ${row.cost}/mo
                </span>
              </div>
            ))}
          </div>
          <div
            className="px-4 py-3 border-t"
            style={{
              borderColor: "hsl(var(--border))",
              background: "hsl(var(--destructive) / 0.06)",
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                Total
              </span>
              <div className="text-right">
                <p
                  className="text-xs font-mono font-bold"
                  style={{ color: "hsl(var(--destructive))" }}
                >
                  ${claudeTotal}/mo
                </p>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  ${claudeTotal * 12}/yr
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hybrid */}
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
        >
          <div
            className="px-4 py-3 border-b flex items-center gap-2"
            style={{
              borderColor: "hsl(var(--border))",
              background: "hsl(var(--accent) / 0.08)",
            }}
          >
            <span className="text-base">🤗</span>
            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "hsl(var(--accent))" }}
            >
              Hybrid (HF + Claude)
            </span>
          </div>
          <div className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
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
                  style={{ color: row.cost === 0 ? "hsl(var(--accent))" : "hsl(var(--foreground))" }}
                >
                  {row.cost === 0 ? "FREE" : `$${row.cost}/mo`}
                </span>
              </div>
            ))}
          </div>
          <div
            className="px-4 py-3 border-t"
            style={{
              borderColor: "hsl(var(--border))",
              background: "hsl(var(--accent) / 0.06)",
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                Total
              </span>
              <div className="text-right">
                <p
                  className="text-xs font-mono font-bold"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  ${hybridTotal}/mo
                </p>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  ${hybridTotal * 12}/yr
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings callout */}
      <div
        className="rounded-xl border px-5 py-4 flex items-center gap-4"
        style={{
          borderColor: "hsl(var(--primary) / 0.3)",
          background: "hsl(var(--primary) / 0.07)",
        }}
      >
        <span className="text-3xl">🎯</span>
        <div>
          <p className="text-2xl font-bold font-mono" style={{ color: "hsl(var(--primary))" }}>
            ~${savedYearly}/yr saved
          </p>
          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            by routing bulk tasks to Hugging Face — Claude handles the precision work
          </p>
        </div>
      </div>
    </div>
  );
}

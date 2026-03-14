const rows = [
  {
    feature: "Tracker blocking",
    brave: { label: "Built-in, aggressive default", good: true },
    chrome: { label: "Requires extensions", good: false },
  },
  {
    feature: "Fingerprinting protection",
    brave: { label: "Blocked by default", good: true },
    chrome: { label: "Not included", good: false },
  },
  {
    feature: "Google telemetry",
    brave: { label: "None sent", good: true },
    chrome: { label: "Significant data collection", good: false },
  },
  {
    feature: "Native ad blocking",
    brave: { label: "Yes — no extension needed", good: true },
    chrome: { label: "No — MV3 limits this", good: false },
  },
  {
    feature: "Chrome extensions",
    brave: { label: "Full compatibility", good: true },
    chrome: { label: "Full compatibility", good: true },
  },
  {
    feature: "Enterprise MDM",
    brave: { label: "Yes (functional)", good: true },
    chrome: { label: "Yes (more mature)", good: true },
  },
  {
    feature: "Google Workspace",
    brave: { label: "Full SaaS compatibility", good: true },
    chrome: { label: "Full + OS integration", good: true },
  },
  {
    feature: "Sync without Google",
    brave: { label: "Yes — Brave Sync", good: true },
    chrome: { label: "Requires Google account", good: false },
  },
];

function Cell({ label, good }: { label: string; good: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <span className={`mt-0.5 flex-shrink-0 text-sm ${good ? "text-emerald-400" : "text-rose-400"}`}>
        {good ? "✓" : "✗"}
      </span>
      <span className="text-xs leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.85)" }}>
        {label}
      </span>
    </div>
  );
}

export default function SecurityMatrix() {
  return (
    <div className="not-prose my-8 rounded-xl border overflow-hidden"
         style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--primary) / 0.06)" }}>
        <h3 className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>
          Brave vs. Chrome — Security &amp; Privacy Comparison
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
          Feature-by-feature breakdown for business deployments
        </p>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-3 border-b text-xs font-semibold uppercase tracking-wide"
           style={{ borderColor: "hsl(var(--border))" }}>
        <div className="px-4 py-3" style={{ color: "hsl(var(--muted-foreground))" }}>Feature</div>
        <div className="px-4 py-3 border-l flex items-center gap-2"
             style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))", background: "hsl(var(--primary) / 0.06)" }}>
          <span className="inline-block w-2 h-2 rounded-full bg-orange-400" />
          Brave
        </div>
        <div className="px-4 py-3 border-l"
             style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--foreground))" }}>
          <span className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-400" />
            Chrome
          </span>
        </div>
      </div>

      <div className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
        {rows.map((row, i) => (
          <div key={row.feature}
               className="grid grid-cols-3"
               style={{ background: i % 2 === 1 ? "hsl(var(--muted) / 0.3)" : undefined }}>
            <div className="px-4 py-3 flex items-start">
              <span className="text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>
                {row.feature}
              </span>
            </div>
            <div className="px-4 py-3 border-l" style={{ borderColor: "hsl(var(--border))" }}>
              <Cell {...row.brave} />
            </div>
            <div className="px-4 py-3 border-l" style={{ borderColor: "hsl(var(--border))" }}>
              <Cell {...row.chrome} />
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 py-3 border-t flex gap-4 text-xs"
           style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted) / 0.4)", color: "hsl(var(--muted-foreground))" }}>
        <span className="flex items-center gap-1"><span className="text-emerald-400 font-bold">✓</span> Supported / advantage</span>
        <span className="flex items-center gap-1"><span className="text-rose-400 font-bold">✗</span> Not included / limitation</span>
      </div>
    </div>
  );
}

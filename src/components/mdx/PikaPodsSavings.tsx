const saasItems = [
  { service: "WordPress.com Business", cost: "$300" },
  { service: "Ghost Pro Creator", cost: "$300" },
  { service: "Dropbox Business (10 users)", cost: "$1,800" },
];
const saasTotal = "$2,400";

const pikaItems = [
  { service: "WordPress pod", cost: "~$48" },
  { service: "Ghost pod", cost: "~$36" },
  { service: "Nextcloud pod", cost: "~$48" },
];
const pikaTotal = "~$132";

const savings = { amount: "~$2,268", percent: "~95%" };

export default function PikaPodsSavings() {
  return (
    <div className="not-prose my-8 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {/* SaaS column */}
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
        >
          <div
            className="px-4 py-3 border-b flex items-center gap-2"
            style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--destructive) / 0.07)" }}
          >
            <span className="text-base">💸</span>
            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "hsl(var(--destructive))" }}
            >
              Typical SaaS Stack
            </span>
          </div>
          <div className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
            {saasItems.map((item) => (
              <div key={item.service} className="px-4 py-3 flex justify-between items-center gap-2">
                <span className="text-xs" style={{ color: "hsl(var(--foreground) / 0.85)" }}>
                  {item.service}
                </span>
                <span
                  className="text-xs font-mono font-semibold whitespace-nowrap"
                  style={{ color: "hsl(var(--destructive))" }}
                >
                  {item.cost}/yr
                </span>
              </div>
            ))}
          </div>
          <div
            className="px-4 py-3 border-t flex justify-between items-center"
            style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--destructive) / 0.06)" }}
          >
            <span className="text-xs font-semibold" style={{ color: "hsl(var(--foreground))" }}>
              Total
            </span>
            <span
              className="text-sm font-mono font-bold"
              style={{ color: "hsl(var(--destructive))" }}
            >
              {saasTotal}/yr
            </span>
          </div>
        </div>

        {/* PikaPods column */}
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
        >
          <div
            className="px-4 py-3 border-b flex items-center gap-2"
            style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--accent) / 0.07)" }}
          >
            <span className="text-base">🫛</span>
            <span
              className="text-xs font-semibold uppercase tracking-wide"
              style={{ color: "hsl(var(--accent))" }}
            >
              PikaPods Stack
            </span>
          </div>
          <div className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
            {pikaItems.map((item) => (
              <div key={item.service} className="px-4 py-3 flex justify-between items-center gap-2">
                <span className="text-xs" style={{ color: "hsl(var(--foreground) / 0.85)" }}>
                  {item.service}
                </span>
                <span
                  className="text-xs font-mono font-semibold whitespace-nowrap"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  {item.cost}/yr
                </span>
              </div>
            ))}
          </div>
          <div
            className="px-4 py-3 border-t flex justify-between items-center"
            style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--accent) / 0.06)" }}
          >
            <span className="text-xs font-semibold" style={{ color: "hsl(var(--foreground))" }}>
              Total
            </span>
            <span
              className="text-sm font-mono font-bold"
              style={{ color: "hsl(var(--accent))" }}
            >
              {pikaTotal}/yr
            </span>
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
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold font-mono" style={{ color: "hsl(var(--primary))" }}>
              {savings.amount}
            </p>
            <span
              className="text-sm font-semibold"
              style={{ color: "hsl(var(--primary) / 0.7)" }}
            >
              saved per year
            </span>
          </div>
          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            {savings.percent} cost reduction · No per-seat fees · No maintenance burden
          </p>
        </div>
      </div>
    </div>
  );
}

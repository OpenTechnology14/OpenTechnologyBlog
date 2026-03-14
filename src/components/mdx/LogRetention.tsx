const tiers = [
  {
    name: "Hot",
    duration: "0–30 days",
    icon: "🔥",
    color: { bg: "hsl(var(--destructive) / 0.08)", accent: "hsl(var(--destructive))", border: "hsl(var(--destructive) / 0.25)" },
    purpose: "Full resolution, immediate query access for incident response",
    tag: "Incident Response",
  },
  {
    name: "Warm",
    duration: "30–365 days",
    icon: "🌡️",
    color: { bg: "hsl(var(--primary) / 0.08)", accent: "hsl(var(--primary))", border: "hsl(var(--primary) / 0.25)" },
    purpose: "Compressed, available within minutes",
    tag: "PCI DSS 12-month",
  },
  {
    name: "Cold / Archive",
    duration: "1–6 years",
    icon: "🧊",
    color: { bg: "hsl(var(--ring) / 0.08)", accent: "hsl(var(--ring))", border: "hsl(var(--ring) / 0.25)" },
    purpose: "Encrypted snapshots to S3-compatible storage",
    tag: "HIPAA 6-year mandate",
  },
  {
    name: "SIEM Access Logs",
    duration: "Ongoing",
    icon: "📋",
    color: { bg: "hsl(var(--accent) / 0.08)", accent: "hsl(var(--accent))", border: "hsl(var(--accent) / 0.25)" },
    purpose: "Record of who queried the SIEM and when",
    tag: "SOC 2 CC6.1",
  },
];

export default function LogRetention() {
  return (
    <div className="not-prose my-8 space-y-3">
      {/* Timeline bar */}
      <div
        className="rounded-xl border px-5 py-4 flex items-center gap-3 overflow-x-auto"
        style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
      >
        <span className="text-xs font-semibold whitespace-nowrap" style={{ color: "hsl(var(--muted-foreground))" }}>
          Retention timeline →
        </span>
        {tiers.slice(0, 3).map((tier, i) => (
          <div key={tier.name} className="flex items-center gap-2">
            {i > 0 && (
              <span style={{ color: "hsl(var(--muted-foreground))" }}>›</span>
            )}
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
              style={{ background: tier.color.bg, color: tier.color.accent, border: `1px solid ${tier.color.border}` }}
            >
              {tier.icon} {tier.duration}
            </span>
          </div>
        ))}
        <span style={{ color: "hsl(var(--muted-foreground))" }}>+</span>
        <span
          className="px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
          style={{
            background: tiers[3].color.bg,
            color: tiers[3].color.accent,
            border: `1px solid ${tiers[3].color.border}`,
          }}
        >
          {tiers[3].icon} Ongoing
        </span>
      </div>

      {/* Tier cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: tier.color.border, background: "hsl(var(--card))" }}
          >
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ background: tier.color.bg, borderBottom: `1px solid ${tier.color.border}` }}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{tier.icon}</span>
                <span className="text-sm font-semibold" style={{ color: tier.color.accent }}>
                  {tier.name}
                </span>
              </span>
              <span
                className="text-xs font-mono font-bold"
                style={{ color: tier.color.accent }}
              >
                {tier.duration}
              </span>
            </div>
            <div className="px-4 py-3 space-y-2">
              <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.85)" }}>
                {tier.purpose}
              </p>
              <span
                className="inline-block px-2 py-0.5 rounded text-xs font-medium"
                style={{ background: tier.color.bg, color: tier.color.accent }}
              >
                {tier.tag}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

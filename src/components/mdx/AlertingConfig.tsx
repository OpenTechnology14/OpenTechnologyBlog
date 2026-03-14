const levels = [
  {
    severity: "Level 12+",
    label: "Critical",
    icon: "🚨",
    destination: "PagerDuty / OpsGenie",
    destIcon: "📟",
    triggers: ["Active threats", "Credential access", "Policy breach"],
    color: { bg: "hsl(var(--destructive) / 0.08)", accent: "hsl(var(--destructive))", border: "hsl(var(--destructive) / 0.3)", dot: "#ef4444" },
  },
  {
    severity: "Level 8–11",
    label: "High",
    icon: "⚠️",
    destination: "Slack #security",
    destIcon: "💬",
    triggers: ["New admin accounts", "Failed login bursts", "Config drift"],
    color: { bg: "hsl(var(--primary) / 0.08)", accent: "hsl(var(--primary))", border: "hsl(var(--primary) / 0.3)", dot: "#3b82f6" },
  },
  {
    severity: "Weekly digest",
    label: "Summary",
    icon: "📊",
    destination: "Email",
    destIcon: "📧",
    triggers: ["Compliance pass/fail rates", "Alert trends"],
    color: { bg: "hsl(var(--ring) / 0.08)", accent: "hsl(var(--ring))", border: "hsl(var(--ring) / 0.3)", dot: "#6366f1" },
  },
  {
    severity: "Pre-audit export",
    label: "Audit",
    icon: "📁",
    destination: "PDF Report",
    destIcon: "📄",
    triggers: ["SOC 2 evidence packages", "PCI DSS compliance dashboards"],
    color: { bg: "hsl(var(--accent) / 0.08)", accent: "hsl(var(--accent))", border: "hsl(var(--accent) / 0.3)", dot: "#10b981" },
  },
];

export default function AlertingConfig() {
  return (
    <div className="not-prose my-8 space-y-3">
      {/* Header */}
      <div
        className="rounded-xl border px-5 py-3 flex items-center gap-2"
        style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--primary) / 0.06)" }}
      >
        <span className="text-sm">🔔</span>
        <span className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>
          Wazuh Alert Routing
        </span>
        <span className="text-xs ml-1" style={{ color: "hsl(var(--muted-foreground))" }}>
          — severity escalation from critical to audit
        </span>
      </div>

      {/* Alert level cards */}
      <div className="grid gap-3 sm:grid-cols-2">
        {levels.map((level) => (
          <div
            key={level.severity}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: level.color.border, background: "hsl(var(--card))" }}
          >
            {/* Card header */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ background: level.color.bg, borderBottom: `1px solid ${level.color.border}` }}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{level.icon}</span>
                <span className="text-sm font-bold" style={{ color: level.color.accent }}>
                  {level.severity}
                </span>
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ background: "hsl(var(--background))", color: level.color.accent, border: `1px solid ${level.color.border}` }}
              >
                {level.label}
              </span>
            </div>

            {/* Destination */}
            <div
              className="px-4 py-2 flex items-center gap-2 border-b text-xs"
              style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
            >
              <span>Sends to</span>
              <span className="font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                {level.destIcon} {level.destination}
              </span>
            </div>

            {/* Triggers */}
            <div className="px-4 py-3">
              <p className="text-xs font-medium mb-2" style={{ color: "hsl(var(--muted-foreground))" }}>
                Trigger conditions
              </p>
              <ul className="space-y-1">
                {level.triggers.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-xs" style={{ color: "hsl(var(--foreground) / 0.85)" }}>
                    <span
                      className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: level.color.dot }}
                    />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const rows = [
  {
    level: "Critical",
    label: "Level 12+",
    color: "bg-destructive/10 text-destructive border-destructive/30",
    dot: "bg-destructive",
    destination: "PagerDuty / OpsGenie",
    triggers: ["Active threats detected", "Credential access attempt", "Policy breach"],
  },
  {
    level: "High",
    label: "Level 8–11",
    color: "bg-orange-500/10 text-orange-500 border-orange-500/30",
    dot: "bg-orange-500",
    destination: "Slack #security",
    triggers: ["New admin account created", "Failed login burst", "Config drift detected"],
  },
  {
    level: "Digest",
    label: "Weekly",
    color: "bg-primary/10 text-primary border-primary/20",
    dot: "bg-primary",
    destination: "Email",
    triggers: ["Compliance pass/fail rates", "Alert volume trends", "Open findings summary"],
  },
  {
    level: "Audit",
    label: "On-demand",
    color: "bg-accent/10 text-accent border-accent/20",
    dot: "bg-accent",
    destination: "PDF Export",
    triggers: ["SOC 2 evidence package", "PCI DSS control report", "Wazuh compliance dashboard"],
  },
];

export default function AlertingMatrix() {
  return (
    <div className="not-prose my-8">
      <h3 className="font-heading font-semibold text-base text-foreground mb-3">
        Alerting Configuration
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.level} className={`rounded-xl border p-4 ${row.color}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`h-2 w-2 rounded-full shrink-0 ${row.dot}`} />
              <span className="font-semibold text-sm">{row.level}</span>
              <span className="text-xs opacity-70 font-mono">{row.label}</span>
            </div>
            <div className="text-xs font-medium opacity-80 mb-1 uppercase tracking-wider">→ {row.destination}</div>
            <ul className="mt-2 space-y-1">
              {row.triggers.map((t) => (
                <li key={t} className="text-xs flex items-start gap-1.5">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-current shrink-0 opacity-60" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

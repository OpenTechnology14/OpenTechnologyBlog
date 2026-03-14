const frameworks = [
  { tag: "SOC 2",   color: "bg-primary/10 text-primary border-primary/20" },
  { tag: "HIPAA",   color: "bg-accent/10 text-accent border-accent/20" },
  { tag: "PCI DSS", color: "bg-destructive/10 text-destructive border-destructive/20" },
];

const rows = [
  {
    framework: "SOC 2",
    control: "CC6.1 — Logical access controls",
    fleet: "Unauthorized account detection",
    edr: "—",
    wazuh: "Privilege escalation alerts",
  },
  {
    framework: "SOC 2",
    control: "CC7.2 — System anomaly monitoring",
    fleet: "Scheduled state queries",
    edr: "Continuous behavioral monitoring",
    wazuh: "Correlation engine + alerting",
  },
  {
    framework: "HIPAA",
    control: "§164.312(b) — Audit controls",
    fleet: "System state snapshots",
    edr: "Process & file activity capture",
    wazuh: "90-day+ log retention",
  },
  {
    framework: "HIPAA",
    control: "§164.312(a) — Encryption",
    fleet: "FileVault / BitLocker queries",
    edr: "—",
    wazuh: "Non-compliant host alerts",
  },
  {
    framework: "PCI DSS",
    control: "10.2 — Audit log implementation",
    fleet: "Log output to Filebeat",
    edr: "MITRE-tagged event telemetry",
    wazuh: "Immutable OpenSearch store",
  },
  {
    framework: "PCI DSS",
    control: "10.6 — Daily log review",
    fleet: "—",
    edr: "—",
    wazuh: "Automated rule engine, continuous",
  },
  {
    framework: "PCI DSS",
    control: "11.5 — Change detection",
    fleet: "Software inventory changes",
    edr: "File modification detection",
    wazuh: "FIM for config files",
  },
];

function FrameworkBadge({ fw }: { fw: string }) {
  const f = frameworks.find((f) => f.tag === fw);
  return (
    <span className={`inline-block rounded-md border px-2 py-0.5 text-xs font-medium whitespace-nowrap ${f?.color}`}>
      {fw}
    </span>
  );
}

export default function ComplianceMatrix() {
  return (
    <div className="not-prose my-8">
      <h3 className="font-heading font-semibold text-base text-foreground mb-3">
        Compliance Control Mapping
      </h3>
      <div className="rounded-xl border border-border overflow-hidden text-xs">
        {/* Header */}
        <div className="grid grid-cols-[100px_1fr_1fr_1fr_1fr] bg-muted border-b border-border">
          {["Framework", "Control", "Fleet", "OpenEDR", "Wazuh"].map((h) => (
            <div key={h} className="px-3 py-2.5 font-semibold text-muted-foreground uppercase tracking-wider border-l border-border first:border-0">
              {h}
            </div>
          ))}
        </div>
        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={i}
            className={`grid grid-cols-[100px_1fr_1fr_1fr_1fr] border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-card"}`}
          >
            <div className="px-3 py-3 flex items-start">
              <FrameworkBadge fw={row.framework} />
            </div>
            <div className="px-3 py-3 font-medium text-foreground border-l border-border">{row.control}</div>
            <div className="px-3 py-3 text-muted-foreground border-l border-border">{row.fleet === "—" ? <span className="text-muted-foreground/40">—</span> : row.fleet}</div>
            <div className="px-3 py-3 text-muted-foreground border-l border-border">{row.edr === "—" ? <span className="text-muted-foreground/40">—</span> : row.edr}</div>
            <div className="px-3 py-3 text-muted-foreground border-l border-border">{row.wazuh === "—" ? <span className="text-muted-foreground/40">—</span> : row.wazuh}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const rows = [
  {
    framework: "SOC 2 CC6.1",
    control: "Logical access controls",
    coverage: ["Fleet", "Wazuh"],
    detail: "Fleet queries for unauthorized accounts; Wazuh alerts on privilege escalation via OpenEDR",
  },
  {
    framework: "SOC 2 CC7.2",
    control: "System monitoring for anomalies",
    coverage: ["OpenEDR", "Wazuh"],
    detail: "OpenEDR continuous behavioral monitoring; Wazuh correlation and alerting",
  },
  {
    framework: "HIPAA §164.312(b)",
    control: "Audit controls — hardware, software, activity",
    coverage: ["Fleet", "OpenEDR", "Wazuh"],
    detail: "Fleet captures system state; OpenEDR captures process/file activity; Wazuh provides 90-day+ retention",
  },
  {
    framework: "HIPAA §164.312(a)",
    control: "Encryption and decryption",
    coverage: ["Fleet", "Wazuh"],
    detail: "Fleet queries disk encryption status (FileVault/BitLocker); Wazuh alerts on non-compliant hosts",
  },
  {
    framework: "PCI DSS 10.2",
    control: "Audit log implementation",
    coverage: ["Wazuh"],
    detail: "Wazuh aggregates logs from Fleet, OpenEDR, and OS event logs into immutable OpenSearch store",
  },
  {
    framework: "PCI DSS 10.6",
    control: "Daily log review",
    coverage: ["Wazuh"],
    detail: "Wazuh automated rule engine reviews all events continuously; critical alerts trigger notifications",
  },
  {
    framework: "PCI DSS 11.5",
    control: "Change detection",
    coverage: ["Fleet", "OpenEDR", "Wazuh"],
    detail: "Fleet detects software changes; OpenEDR detects file modifications; Wazuh FIM for config files",
  },
];

const toolColors: Record<string, string> = {
  Fleet: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
  OpenEDR: "bg-purple-500/15 text-purple-400 border border-purple-500/30",
  Wazuh: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
};

const frameworkColor: Record<string, string> = {
  "SOC 2": "text-blue-400",
  "HIPAA": "text-amber-400",
  "PCI DSS": "text-rose-400",
};

function getFrameworkColor(fw: string) {
  for (const key of Object.keys(frameworkColor)) {
    if (fw.startsWith(key)) return frameworkColor[key];
  }
  return "text-foreground";
}

export default function ComplianceMatrix() {
  return (
    <div className="not-prose my-8 rounded-xl border overflow-hidden"
         style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
      <div className="px-5 py-4 border-b" style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--primary) / 0.06)" }}>
        <h3 className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>
          Compliance Control Mapping
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
          How Fleet + OpenEDR + Wazuh satisfy SOC 2, HIPAA, and PCI DSS requirements
        </p>
      </div>

      <div className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
        {rows.map((row) => (
          <div key={row.framework} className="grid grid-cols-[auto_1fr] gap-0">
            {/* Framework badge column */}
            <div className="flex items-start justify-center pt-4 px-4 min-w-[120px]">
              <span className={`font-mono text-xs font-bold ${getFrameworkColor(row.framework)}`}>
                {row.framework}
              </span>
            </div>
            {/* Content column */}
            <div className="py-4 pr-5 border-l" style={{ borderColor: "hsl(var(--border))" }}>
              <p className="text-sm font-medium mb-2" style={{ color: "hsl(var(--foreground))" }}>
                {row.control}
              </p>
              <p className="text-xs mb-3 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                {row.detail}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {row.coverage.map((tool) => (
                  <span key={tool} className={`px-2 py-0.5 rounded-full text-xs font-medium ${toolColors[tool]}`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="px-5 py-3 border-t flex flex-wrap gap-4"
           style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted) / 0.4)" }}>
        {Object.entries(toolColors).map(([tool, cls]) => (
          <span key={tool} className="flex items-center gap-1.5 text-xs">
            <span className={`px-2 py-0.5 rounded-full font-medium ${cls}`}>{tool}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

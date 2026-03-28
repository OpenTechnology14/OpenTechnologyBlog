"use client";

import Image from "next/image";

const stack = [
  {
    name: "Keycloak",
    logo: "/logos/keycloak.svg",
    icon: "🔑",
    role: "Identity Layer (0) — SSO, SAML, OIDC, MFA, and a full audit log of every auth event",
    license: "Open Source · Apache 2.0",
  },
  {
    name: "Wazuh",
    logo: "/logos/wazuh.svg",
    icon: "🛡️",
    role: "SIEM & Compliance Engine — log ingestion, threat correlation, SOC 2 / HIPAA / PCI dashboards",
    license: "Open Source · GPL",
  },
  {
    name: "Fleet",
    logo: "/logos/fleet.png",
    icon: "🖥️",
    role: "Query & Inventory Layer — osquery across all endpoints, queryable compliance record",
    license: "Open Source · MIT",
  },
  {
    name: "OpenEDR",
    logo: null,
    icon: "🔬",
    role: "Behavioral Detection Layer — process trees, credential access, lateral movement via MITRE ATT&CK",
    license: "Open Source · Apache 2.0",
  },
  {
    name: "Fail2ban",
    logo: null,
    icon: "🚫",
    role: "Active Response Layer — bans offending IPs via firewall rules, immutable response audit trail",
    license: "Open Source · GPL",
  },
  {
    name: "MXToolbox",
    logo: null,
    icon: "📧",
    role: "Email & Domain Security — continuous SPF, DKIM, DMARC, and blacklist monitoring",
    license: "Free monitoring tier",
  },
  {
    name: "Falco",
    logo: null,
    icon: "🦅",
    role: "Runtime Detection Layer — eBPF syscall interception on Linux servers and containers",
    license: "Open Source · Apache 2.0",
  },
  {
    name: "Shuffle",
    logo: null,
    icon: "🔀",
    role: "SOAR & Automation Layer — connects Wazuh, Fleet, Keycloak, Fail2ban, and Rocket.Chat into response workflows",
    license: "Open Source · Apache 2.0",
  },
];

export default function SecurityStackAtAGlance() {
  return (
    <div className="not-prose my-6 w-full overflow-x-auto rounded-xl border" style={{ borderColor: "hsl(var(--border))" }}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr style={{ borderBottom: "2px solid hsl(var(--border))", background: "hsl(var(--destructive) / 0.06)" }}>
            <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
              Tool
            </th>
            <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
              Role
            </th>
            <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
              License
            </th>
          </tr>
        </thead>
        <tbody>
          {stack.map((tool, i) => (
            <tr
              key={tool.name}
              className="transition-colors"
              style={{
                borderBottom: i < stack.length - 1 ? "1px solid hsl(var(--border))" : "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--muted) / 0.5)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <td className="px-4 py-3 align-middle">
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      border: "1.5px solid hsl(var(--border))",
                      background: "hsl(var(--card))",
                    }}
                  >
                    {tool.logo ? (
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-base">{tool.icon}</span>
                    )}
                  </div>
                  <span className="font-mono font-medium text-sm whitespace-nowrap" style={{ color: "hsl(var(--foreground))" }}>
                    {tool.name}
                  </span>
                </div>
              </td>

              <td className="px-4 py-3 align-middle" style={{ color: "hsl(var(--foreground) / 0.7)" }}>
                {tool.role}
              </td>

              <td className="px-4 py-3 align-middle">
                <span
                  className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded whitespace-nowrap"
                  style={{
                    background: "rgba(0,184,122,0.1)",
                    color: "#00b87a",
                    border: "1px solid rgba(0,184,122,0.2)",
                  }}
                >
                  ✓ {tool.license}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

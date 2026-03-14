const apps = [
  {
    name: "Ghost",
    emoji: "👻",
    desc: "Newsletters & blogs",
    pikapods: "~$2–3/mo",
    saas: "Ghost Pro: $25/mo",
    saasAnnual: "$300/yr",
    pikaAnnual: "~$36/yr",
  },
  {
    name: "WordPress",
    emoji: "🌐",
    desc: "Websites & e-commerce",
    pikapods: "~$3–4/mo",
    saas: "WordPress.com Business: $25/mo",
    saasAnnual: "$300/yr",
    pikaAnnual: "~$48/yr",
  },
  {
    name: "Nextcloud",
    emoji: "☁️",
    desc: "File storage & collaboration",
    pikapods: "~$3–4/mo",
    saas: "Dropbox Business: $15/user/mo",
    saasAnnual: "$1,800/yr (10 users)",
    pikaAnnual: "~$48/yr",
  },
];

export default function PikaPodsApps() {
  return (
    <div className="not-prose my-8 space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        {apps.map((app) => (
          <div
            key={app.name}
            className="rounded-xl border overflow-hidden"
            style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 border-b flex items-center gap-2"
              style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--primary) / 0.06)" }}
            >
              <span className="text-lg">{app.emoji}</span>
              <div>
                <p className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                  {app.name}
                </p>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {app.desc}
                </p>
              </div>
            </div>
            {/* PikaPods price */}
            <div className="px-4 pt-3 pb-2">
              <p className="text-xs uppercase tracking-wide font-semibold mb-0.5"
                 style={{ color: "hsl(var(--accent))" }}>
                PikaPods
              </p>
              <p className="text-xl font-bold font-mono" style={{ color: "hsl(var(--accent))" }}>
                {app.pikapods}
              </p>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                {app.pikaAnnual} billed hourly
              </p>
            </div>
            {/* SaaS comparison */}
            <div
              className="px-4 pt-2 pb-3 border-t mt-1"
              style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--destructive) / 0.04)" }}
            >
              <p className="text-xs uppercase tracking-wide font-semibold mb-0.5"
                 style={{ color: "hsl(var(--destructive))" }}>
                vs. SaaS
              </p>
              <p className="text-xs font-medium" style={{ color: "hsl(var(--destructive))" }}>
                {app.saas}
              </p>
              <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                {app.saasAnnual}
              </p>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-center" style={{ color: "hsl(var(--muted-foreground))" }}>
        Resources scale up or down at any time · Billed in hourly increments · $5 welcome credit
      </p>
    </div>
  );
}

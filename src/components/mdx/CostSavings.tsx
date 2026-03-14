const saasItems = [
  { tool: "Slack Pro", detail: "$7.25/user/month × 25", monthly: "$181" },
  { tool: "Dropbox Business", detail: "$15/user/month × 25", monthly: "$375" },
  { tool: "Commercial VPN", detail: "$5–10/user/month × 25", monthly: "$125–250" },
];
const saasTotal = { monthly: "$681–$806", yearly: "$8,172–$9,672" };

const selfHostedItems = [
  { tool: "Rocket.Chat Droplet", detail: "4 GB RAM", monthly: "$24" },
  { tool: "Nextcloud Droplet + Spaces", detail: "2 GB RAM + object storage", monthly: "$18–30" },
  { tool: "WireGuard Droplet", detail: "1 GB RAM", monthly: "$6" },
  { tool: "Managed Databases (2)", detail: "MongoDB + PostgreSQL", monthly: "$30" },
];
const selfHostedTotal = { monthly: "~$78–90", yearly: "$936–$1,080" };

const savings = { yearly: "$7,000–$8,700", label: "saved per year for 25 people" };

export default function CostSavings() {
  return (
    <div className="not-prose my-8 space-y-4">
      {/* Header */}
      <div className="rounded-xl border px-5 py-4"
           style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
        <h3 className="font-semibold text-sm" style={{ color: "hsl(var(--foreground))" }}>
          Cost Comparison — 25-Person Team
        </h3>
        <p className="text-xs mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
          SaaS subscriptions vs. self-hosted stack on DigitalOcean
        </p>
      </div>

      {/* Two-column grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* SaaS column */}
        <div className="rounded-xl border overflow-hidden"
             style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
          <div className="px-4 py-3 border-b flex items-center gap-2"
               style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--destructive) / 0.08)" }}>
            <span className="text-base">💸</span>
            <span className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "hsl(var(--destructive))" }}>SaaS Subscriptions</span>
          </div>
          <div className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
            {saasItems.map((item) => (
              <div key={item.tool} className="px-4 py-3 flex justify-between items-start gap-2">
                <div>
                  <p className="text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>{item.tool}</p>
                  <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{item.detail}</p>
                </div>
                <span className="text-xs font-mono font-semibold whitespace-nowrap"
                      style={{ color: "hsl(var(--destructive))" }}>{item.monthly}/mo</span>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t"
               style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--destructive) / 0.06)" }}>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold" style={{ color: "hsl(var(--foreground))" }}>Total</span>
              <div className="text-right">
                <p className="text-xs font-mono font-bold" style={{ color: "hsl(var(--destructive))" }}>
                  {saasTotal.monthly}/mo
                </p>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {saasTotal.yearly}/yr
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Self-hosted column */}
        <div className="rounded-xl border overflow-hidden"
             style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}>
          <div className="px-4 py-3 border-b flex items-center gap-2"
               style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--accent) / 0.08)" }}>
            <span className="text-base">🖥️</span>
            <span className="text-xs font-semibold uppercase tracking-wide"
                  style={{ color: "hsl(var(--accent))" }}>Self-Hosted on DigitalOcean</span>
          </div>
          <div className="divide-y" style={{ borderColor: "hsl(var(--border))" }}>
            {selfHostedItems.map((item) => (
              <div key={item.tool} className="px-4 py-3 flex justify-between items-start gap-2">
                <div>
                  <p className="text-xs font-medium" style={{ color: "hsl(var(--foreground))" }}>{item.tool}</p>
                  <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>{item.detail}</p>
                </div>
                <span className="text-xs font-mono font-semibold whitespace-nowrap"
                      style={{ color: "hsl(var(--accent))" }}>{item.monthly}/mo</span>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 border-t"
               style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--accent) / 0.06)" }}>
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold" style={{ color: "hsl(var(--foreground))" }}>Total</span>
              <div className="text-right">
                <p className="text-xs font-mono font-bold" style={{ color: "hsl(var(--accent))" }}>
                  {selfHostedTotal.monthly}/mo
                </p>
                <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {selfHostedTotal.yearly}/yr
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Savings callout */}
      <div className="rounded-xl border px-5 py-4 flex items-center gap-4"
           style={{ borderColor: "hsl(var(--primary) / 0.3)", background: "hsl(var(--primary) / 0.07)" }}>
        <span className="text-3xl">🎯</span>
        <div>
          <p className="text-2xl font-bold font-mono" style={{ color: "hsl(var(--primary))" }}>
            {savings.yearly}
          </p>
          <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
            {savings.label} — savings that scale as headcount grows
          </p>
        </div>
      </div>
    </div>
  );
}

import { Check, X, Minus } from "lucide-react";

const rows = [
  { feature: "Tracker blocking",      brave: "Built-in, aggressive default",   chrome: "Requires extensions",          advantage: "brave" },
  { feature: "Fingerprinting",        brave: "Blocked by default",             chrome: "Not included",                 advantage: "brave" },
  { feature: "Google telemetry",      brave: "None sent",                      chrome: "Significant data collection",  advantage: "brave" },
  { feature: "Native ad blocking",    brave: "Yes — no extension needed",      chrome: "No — MV3 limits this",         advantage: "brave" },
  { feature: "Chrome extensions",     brave: "Full compatibility",             chrome: "Full compatibility",           advantage: "tie"   },
  { feature: "Enterprise MDM",        brave: "Yes (functional)",               chrome: "Yes (more mature)",            advantage: "chrome"},
  { feature: "Google Workspace",      brave: "Full SaaS compatibility",        chrome: "Full + OS integration",        advantage: "chrome"},
  { feature: "Sync without Google",   brave: "Yes — Brave Sync",              chrome: "Requires Google account",      advantage: "brave" },
];

function AdvIcon({ side, advantage }: { side: "brave" | "chrome"; advantage: string }) {
  if (advantage === "tie")   return <Minus className="h-3.5 w-3.5 text-muted-foreground shrink-0" />;
  if (advantage === side)    return <Check className="h-3.5 w-3.5 text-accent shrink-0" />;
  return <X className="h-3.5 w-3.5 text-destructive/60 shrink-0" />;
}

export default function SecurityMatrix() {
  return (
    <div className="not-prose my-8">
      <h3 className="font-heading font-semibold text-base text-foreground mb-3">
        Security Comparison: Brave vs Chrome
      </h3>
      <div className="rounded-xl border border-border overflow-hidden text-sm">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1fr_1fr] bg-muted border-b border-border">
          <div className="px-4 py-2.5 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Feature</div>
          <div className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wider text-primary border-l border-border">Brave</div>
          <div className="px-4 py-2.5 font-semibold text-xs uppercase tracking-wider text-muted-foreground border-l border-border">Chrome</div>
        </div>
        {/* Rows */}
        {rows.map((row, i) => (
          <div
            key={row.feature}
            className={`grid grid-cols-[1fr_1fr_1fr] border-b border-border last:border-0 ${i % 2 === 0 ? "bg-background" : "bg-card"}`}
          >
            <div className="px-4 py-3 font-medium text-foreground text-xs">{row.feature}</div>
            <div className="px-4 py-3 text-xs text-foreground border-l border-border flex items-start gap-1.5">
              <AdvIcon side="brave" advantage={row.advantage} />
              <span>{row.brave}</span>
            </div>
            <div className="px-4 py-3 text-xs text-muted-foreground border-l border-border flex items-start gap-1.5">
              <AdvIcon side="chrome" advantage={row.advantage} />
              <span>{row.chrome}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Check className="h-3 w-3 text-accent" /> Advantage</span>
        <span className="flex items-center gap-1"><X className="h-3 w-3 text-destructive/60" /> Disadvantage</span>
        <span className="flex items-center gap-1"><Minus className="h-3 w-3" /> Equal</span>
      </div>
    </div>
  );
}

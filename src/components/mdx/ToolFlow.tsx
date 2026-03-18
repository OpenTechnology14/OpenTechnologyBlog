import Image from "next/image";

const mainTools = [
  { name: "Terminal", icon: "⌨️", logo: null },
  { name: "VS Code",  icon: "💻", logo: "/logos/vscode.svg" },
  { name: "GitHub",   icon: "🐙", logo: "/logos/github.svg" },
  { name: "Claude",   icon: "🤖", logo: "/logos/claude.svg" },
  { name: "Supabase", icon: "⚡", logo: "/logos/supabase.svg" },
  { name: "Vercel",   icon: "▲",  logo: "/logos/vercel.svg" },
];

const bonusTools = [
  { name: "Penpot",       icon: "🎨", logo: "/logos/penpot.svg",      accent: "#b48dff", borderColor: "rgba(180,141,255,0.35)", bg: "rgba(180,141,255,0.08)" },
  { name: "CodeSandbox",  icon: "📦", logo: "/logos/codesandbox.svg", accent: "#f0c040", borderColor: "rgba(240,192,64,0.35)",  bg: "rgba(240,192,64,0.08)" },
];

function ToolIcon({ name, icon, logo }: { name: string; icon: string; logo: string | null }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[64px]">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          border: "1.5px solid hsl(var(--border))",
          background: "hsl(var(--card))",
        }}
      >
        {logo ? (
          <Image src={logo} alt={name} width={26} height={26} className="object-contain" />
        ) : (
          <span className="text-xl">{icon}</span>
        )}
      </div>
      <span
        className="font-mono text-[10px] text-center tracking-wide"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        {name}
      </span>
    </div>
  );
}

function Arrow() {
  return (
    <div
      className="flex-1 min-w-[16px] h-px mb-5 mx-1"
      style={{
        background:
          "repeating-linear-gradient(90deg, hsl(var(--border)) 0, hsl(var(--border)) 5px, transparent 5px, transparent 10px)",
      }}
    />
  );
}

export default function ToolFlow() {
  return (
    <div className="not-prose my-8">
      {/* Bonus pills */}
      <div className="flex flex-wrap gap-2 mb-4">
        {bonusTools.map((t) => (
          <span
            key={t.name}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-medium"
            style={{
              border: `1.5px solid ${t.borderColor}`,
              color: t.accent,
              background: t.bg,
            }}
          >
            ✦ {t.name}
          </span>
        ))}
        {mainTools.map((t) => (
          <span
            key={t.name}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs font-medium"
            style={{
              border: "1.5px solid hsl(var(--primary) / 0.4)",
              color: "hsl(var(--primary))",
              background: "hsl(var(--primary) / 0.06)",
            }}
          >
            {t.name}
          </span>
        ))}
      </div>

      {/* Flow diagram */}
      <div
        className="flex items-center overflow-x-auto py-2 px-1 rounded-xl"
        style={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }}
      >
        <div className="flex items-center w-full px-4 py-3">
          {mainTools.map((tool, i) => (
            <div key={tool.name} className="flex items-center flex-1 min-w-0">
              <ToolIcon {...tool} />
              {i < mainTools.length - 1 && <Arrow />}
            </div>
          ))}
          <Arrow />
          {/* Bonus tools */}
          {bonusTools.map((t, i) => (
            <div key={t.name} className="flex items-center">
              <div className="flex flex-col items-center gap-2 min-w-[64px]">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ border: `1.5px solid ${t.borderColor}`, background: t.bg }}
                >
                  {t.logo ? (
                    <Image src={t.logo} alt={t.name} width={26} height={26} className="object-contain" />
                  ) : (
                    <span className="text-xl">{t.icon}</span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-center tracking-wide" style={{ color: t.accent }}>
                  {t.name}
                </span>
              </div>
              {i < bonusTools.length - 1 && <Arrow />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

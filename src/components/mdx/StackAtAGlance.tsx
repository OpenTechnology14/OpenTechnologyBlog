"use client";

import Image from "next/image";

const stack = [
  {
    name: "Terminal",
    logo: null,
    icon: "⌨️",
    role: "Local dev environment — shell, Node.js, Git, package manager",
    free: "Always free",
    bonus: false,
  },
  {
    name: "VS Code",
    logo: "/logos/vscode.svg",
    icon: "💻",
    role: "Editor + AI integration — extensions, workspace config, inline completions",
    free: "Always free",
    bonus: false,
  },
  {
    name: "GitHub",
    logo: "/logos/github.svg",
    icon: "🐙",
    role: "Source control + CI/CD — branches, PRs, Actions workflows",
    free: "Unlimited public repos",
    bonus: false,
  },
  {
    name: "Claude Code",
    logo: "/logos/claude.svg",
    icon: "🤖",
    role: "AI pair programmer — reads your codebase, writes files, runs commands",
    free: "Free tier available",
    bonus: false,
  },
  {
    name: "Supabase",
    logo: "/logos/supabase.svg",
    icon: "⚡",
    role: "DB + Auth + Storage — Postgres, Row Level Security, Realtime",
    free: "2 projects, 500MB DB",
    bonus: false,
  },
  {
    name: "Vercel",
    logo: "/logos/vercel.svg",
    icon: "▲",
    role: "Hosting + CDN — auto-deploy on push, edge functions, preview URLs",
    free: "100GB bandwidth/mo",
    bonus: false,
  },
  {
    name: "Penpot",
    logo: "/logos/penpot.svg",
    icon: "🎨",
    role: "UI design tool — open-source Figma alternative, design-to-code",
    free: "Always free",
    bonus: true,
  },
  {
    name: "CodeSandbox",
    logo: "/logos/codesandbox.svg",
    icon: "📦",
    role: "Cloud dev environment — open any GitHub repo instantly, no local setup",
    free: "Free personal use",
    bonus: true,
  },
];

export default function StackAtAGlance() {
  return (
    <div className="not-prose my-6 w-full overflow-x-auto rounded-xl border" style={{ borderColor: "hsl(var(--border))" }}>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr style={{ borderBottom: "2px solid hsl(var(--border))", background: "hsl(var(--primary) / 0.06)" }}>
            <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
              Tool
            </th>
            <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
              Role
            </th>
            <th className="px-4 py-3 text-left font-mono text-xs uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
              Free Tier
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
              {/* Tool name + logo */}
              <td className="px-4 py-3 align-middle">
                <div className="flex items-center gap-3">
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{
                      border: tool.bonus
                        ? "1.5px solid rgba(180,141,255,0.35)"
                        : "1.5px solid hsl(var(--border))",
                      background: tool.bonus
                        ? "rgba(180,141,255,0.08)"
                        : "hsl(var(--card))",
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
                  <span
                    className="font-mono font-medium text-sm whitespace-nowrap"
                    style={{ color: tool.bonus ? "#b48dff" : "hsl(var(--foreground))" }}
                  >
                    {tool.bonus && <span className="mr-1 opacity-60">✦</span>}
                    {tool.name}
                  </span>
                </div>
              </td>

              {/* Role */}
              <td className="px-4 py-3 align-middle" style={{ color: "hsl(var(--foreground) / 0.7)" }}>
                {tool.role}
              </td>

              {/* Free badge */}
              <td className="px-4 py-3 align-middle">
                <span
                  className="inline-flex items-center gap-1 font-mono text-xs px-2 py-0.5 rounded whitespace-nowrap"
                  style={{
                    background: "rgba(0,184,122,0.1)",
                    color: "#00b87a",
                    border: "1px solid rgba(0,184,122,0.2)",
                  }}
                >
                  ✓ {tool.free}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

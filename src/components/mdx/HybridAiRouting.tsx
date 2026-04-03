export default function HybridAiRouting() {
  return (
    <div className="not-prose my-8">
      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--card))" }}
      >
        {/* Header */}
        <div
          className="px-5 py-3 border-b"
          style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--muted))" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "hsl(var(--muted-foreground))" }}>
            Routing Strategy
          </p>
        </div>

        <div className="p-5 flex flex-col sm:flex-row gap-4 items-stretch">
          {/* Hugging Face card */}
          <div
            className="flex-1 rounded-lg border p-4"
            style={{ borderColor: "hsl(var(--border))", background: "hsl(var(--background))" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🤗</span>
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "hsl(var(--accent))" }}>
                Hugging Face Agent
              </span>
            </div>
            <p className="text-xs mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
              local / PikaPods
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Audits", "Docs", "Research", "Reviews", "PRs", "Plans"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: "hsl(var(--accent) / 0.12)",
                    color: "hsl(var(--accent))",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="flex sm:flex-col items-center justify-center gap-1 sm:px-1">
            <div className="flex-1 sm:w-px sm:h-full h-px w-full" style={{ background: "hsl(var(--border))" }} />
            <span className="text-xs font-mono px-1" style={{ color: "hsl(var(--muted-foreground))" }}>or</span>
            <div className="flex-1 sm:w-px sm:h-full h-px w-full" style={{ background: "hsl(var(--border))" }} />
          </div>

          {/* Claude card */}
          <div
            className="flex-1 rounded-lg border p-4"
            style={{ borderColor: "hsl(var(--primary) / 0.3)", background: "hsl(var(--primary) / 0.05)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg">🤖</span>
              <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "hsl(var(--primary))" }}>
                Claude Code
              </span>
            </div>
            <p className="text-xs mb-3" style={{ color: "hsl(var(--muted-foreground))" }}>
              API
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Refactors", "Bugs", "Migrations"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{
                    background: "hsl(var(--primary) / 0.12)",
                    color: "hsl(var(--primary))",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

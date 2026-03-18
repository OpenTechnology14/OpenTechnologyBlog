import React from "react";

interface AiPromptProps {
  label: string;
  type?: string;
  children: React.ReactNode;
}

export default function AiPrompt({ label, type, children }: AiPromptProps) {
  return (
    <details
      className="not-prose my-5 rounded-xl overflow-hidden group"
      style={{
        background: "#1a1a2e",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
      }}
    >
      <summary
        className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer select-none [&::-webkit-details-marker]:hidden transition-colors"
        style={{
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid transparent",
        }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-sm flex-shrink-0">🤖</span>
          <span
            className="font-mono text-xs tracking-widest uppercase truncate"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            AI Prompt — {label}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {type && (
            <span
              className="font-mono text-xs px-2.5 py-0.5 rounded"
              style={{
                background: "rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.05em",
              }}
            >
              {type}
            </span>
          )}
          <span
            className="text-sm group-open:rotate-180 transition-transform duration-200"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            ▾
          </span>
        </div>
      </summary>
      <div
        className="font-mono text-xs leading-relaxed whitespace-pre-wrap px-5 py-4"
        style={{ color: "#c8d8e8" }}
      >
        {children}
      </div>
    </details>
  );
}

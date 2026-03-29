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
        background: "#3c3f47",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
      }}
    >
      <summary
        className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer select-none [&::-webkit-details-marker]:hidden transition-colors"
        style={{
          background: "#484b54",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <span className="text-sm flex-shrink-0">🤖</span>
          <span
            className="font-mono text-xs tracking-widest uppercase truncate"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            AI Prompt — {label}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {type && (
            <span
              className="font-mono text-xs px-2.5 py-0.5 rounded"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "0.05em",
              }}
            >
              {type}
            </span>
          )}
          <span
            className="text-sm group-open:rotate-180 transition-transform duration-200"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            ▾
          </span>
        </div>
      </summary>
      <div
        className="font-mono text-xs leading-relaxed whitespace-pre-wrap px-5 py-4"
        style={{ color: "#dce8f0" }}
      >
        {children}
      </div>
    </details>
  );
}

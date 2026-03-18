import React from "react";

type CalloutType = "tip" | "note" | "warn" | "purple";

const styles: Record<CalloutType, { border: string; bg: string; titleColor: string }> = {
  tip:    { border: "#00b87a", bg: "rgba(0,184,122,0.06)",    titleColor: "#00b87a" },
  note:   { border: "#2d6ef5", bg: "rgba(45,110,245,0.06)",   titleColor: "#2d6ef5" },
  warn:   { border: "#f4a261", bg: "rgba(244,162,97,0.06)",   titleColor: "#f4a261" },
  purple: { border: "#b48dff", bg: "rgba(180,141,255,0.06)",  titleColor: "#b48dff" },
};

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

export default function Callout({ type = "tip", title, children }: CalloutProps) {
  const s = styles[type];
  return (
    <div
      className="not-prose my-6 px-5 py-4 rounded-r-lg"
      style={{
        borderLeft: `3px solid ${s.border}`,
        background: s.bg,
      }}
    >
      {title && (
        <div
          className="font-mono text-xs tracking-widest uppercase mb-2 font-medium"
          style={{ color: s.titleColor }}
        >
          {title}
        </div>
      )}
      <div className="text-sm leading-relaxed" style={{ color: "hsl(var(--foreground) / 0.85)" }}>
        {children}
      </div>
    </div>
  );
}

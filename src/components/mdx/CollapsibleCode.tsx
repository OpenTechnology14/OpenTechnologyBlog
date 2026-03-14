"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown, Copy, Check } from "lucide-react";

export default function CollapsibleCode({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const text =
    typeof children === "object" &&
    children !== null &&
    "props" in (children as React.ReactElement)
      ? ((children as React.ReactElement).props as { children?: string }).children ?? ""
      : String(children ?? "");

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="not-prose my-5 rounded-xl border border-border overflow-hidden text-sm">
      <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors font-mono text-xs"
        >
          {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
          {open ? "hide code" : "show code"}
        </button>
        {open && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors text-xs"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "copied" : "copy"}
          </button>
        )}
      </div>
      {open && (
        <pre
          {...props}
          className="overflow-x-auto p-4 bg-card font-mono text-xs leading-relaxed m-0 rounded-none"
        >
          {children}
        </pre>
      )}
    </div>
  );
}

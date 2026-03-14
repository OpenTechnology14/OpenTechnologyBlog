export default function CollapsibleCode({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <details className="not-prose my-5 rounded-xl border border-border overflow-hidden text-sm group">
      <summary className="flex items-center gap-1.5 px-4 py-2 bg-muted border-b border-border cursor-pointer text-muted-foreground hover:text-foreground transition-colors font-mono text-xs list-none select-none">
        <span className="group-open:hidden">▶ show code</span>
        <span className="hidden group-open:inline">▼ hide code</span>
      </summary>
      <pre
        {...props}
        className="overflow-x-auto p-4 bg-card font-mono text-xs leading-relaxed m-0 rounded-none"
      >
        {children}
      </pre>
    </details>
  );
}

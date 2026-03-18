export default function CollapsibleCode({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  return (
    <details
      className="not-prose my-5 rounded-xl overflow-hidden group"
      style={{ background: '#0f0f1a', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <summary
        className="flex items-center gap-2 px-4 py-2.5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden transition-colors"
        style={{ background: '#1c1c2e', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
        </div>
        <span
          className="group-open:hidden font-mono text-xs tracking-wide"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          ▶ show code
        </span>
        <span
          className="hidden group-open:inline font-mono text-xs tracking-wide"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          ▼ hide code
        </span>
      </summary>
      <pre
        {...props}
        className="overflow-x-auto m-0 rounded-none font-mono text-xs leading-relaxed"
        style={{ padding: '18px 22px', color: '#7ee8a2', background: '#0f0f1a' }}
      >
        {children}
      </pre>
    </details>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

const T = {
  bg85: "hsl(var(--background) / 0.85)",
  bg: "hsl(var(--background))",
  border: "hsl(var(--border))",
  ink: "hsl(var(--foreground))",
  ink70: "hsl(var(--foreground) / 0.72)",
  primary: "hsl(var(--primary))",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
};

const SIGNUP = "https://www.opentechnologyapp.com";

export default function OtaHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: T.bg85,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${T.border}`,
        fontFamily: T.font,
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 56,
        }}
      >
        {/* Left: logo + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          <img
            src="/icon.png"
            alt="OTA"
            style={{ width: 28, height: 28, borderRadius: 6 }}
          />
          <span style={{ fontWeight: 600, fontSize: 15, display: "flex", alignItems: "center", gap: 4 }}>
            <Link href="/" style={{ color: T.ink70, textDecoration: "none" }}>Open Technology</Link>
            <span style={{ color: T.ink30 }}>/</span>
            <Link href="/open-technology-app" style={{ color: T.ink, textDecoration: "none" }}>App</Link>
          </span>
        </div>

        {/* Desktop nav */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 14,
          }}
          className="ota-desktop-nav"
        >
          <Link href="/open-technology-app/features" style={{ color: T.ink70, textDecoration: "none" }}>Features</Link>
          <Link href="/open-technology-app/pricing" style={{ color: T.ink70, textDecoration: "none" }}>Pricing</Link>
          <Link href="/blog" style={{ color: T.ink70, textDecoration: "none" }}>Blog</Link>
          <a
            href={SIGNUP}
            style={{
              background: T.primary,
              color: "#fff",
              padding: "6px 16px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Get started
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="ota-hamburger"
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            color: T.ink,
            display: "none",
          }}
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div
          className="ota-mobile-menu"
          style={{
            background: T.bg,
            borderTop: `1px solid ${T.border}`,
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
            fontSize: 15,
          }}
        >
          <Link href="/open-technology-app/features" onClick={() => setOpen(false)} style={{ color: T.ink, textDecoration: "none", fontWeight: 500 }}>Features</Link>
          <Link href="/open-technology-app/pricing" onClick={() => setOpen(false)} style={{ color: T.ink, textDecoration: "none", fontWeight: 500 }}>Pricing</Link>
          <Link href="/blog" onClick={() => setOpen(false)} style={{ color: T.ink, textDecoration: "none", fontWeight: 500 }}>Blog</Link>
          <a
            href={SIGNUP}
            style={{
              background: T.primary,
              color: "#fff",
              padding: "10px 16px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Get started
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .ota-desktop-nav { display: none !important; }
          .ota-hamburger { display: block !important; }
        }
        @media (min-width: 641px) {
          .ota-mobile-menu { display: none !important; }
        }
      `}</style>
    </header>
  );
}

"use client";

import Link from "next/link";

const T = {
  bg85: "hsl(var(--background) / 0.85)",
  border: "hsl(var(--border))",
  ink: "hsl(var(--foreground))",
  ink70: "hsl(var(--foreground) / 0.72)",
  primary: "hsl(var(--primary))",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
};

const SIGNUP = "https://www.opentechnologyapp.com";

export default function OtaHeader() {
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
        <Link
          href="/open-technology-app"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: T.ink,
          }}
        >
          <img
            src="/icon.png"
            alt="OTA"
            style={{ width: 28, height: 28, borderRadius: 6 }}
          />
          <span style={{ fontWeight: 600, fontSize: 15 }}>Open Technology App</span>
        </Link>

        {/* Right nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 24, fontSize: 14 }}>
          <Link
            href="/open-technology-app/features"
            style={{ color: T.ink70, textDecoration: "none" }}
          >
            Features
          </Link>
          <Link
            href="/open-technology-app/pricing"
            style={{ color: T.ink70, textDecoration: "none" }}
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            style={{ color: T.ink70, textDecoration: "none" }}
          >
            Blog
          </Link>
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
      </div>
    </header>
  );
}

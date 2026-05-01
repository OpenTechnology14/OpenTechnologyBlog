"use client";

import Link from "next/link";

const T = {
  bg85: "rgba(247,246,242,.85)",
  ink06: "rgba(14,14,14,.06)",
  ink: "#0e0e0e",
  ink70: "rgba(14,14,14,.72)",
  good: "#10b981",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
};

export default function OtaHeader() {
  return (
    <>
      {/* Announcement bar */}
      <div
        style={{
          background: T.ink,
          color: "#fff",
          fontFamily: T.font,
          fontSize: 13,
          textAlign: "center",
          padding: "8px 16px",
        }}
      >
        <span style={{ opacity: 0.7 }}>New</span> &middot; Free tier is live, no credit card
        &mdash;{" "}
        <Link
          href="/open-technology-app/pricing"
          style={{ color: T.good, textDecoration: "underline" }}
        >
          see pricing
        </Link>
      </div>

      {/* Sticky header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: T.bg85,
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: `1px solid ${T.ink06}`,
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
            <a
              href="https://www.opentechnologyblog.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: T.ink70, textDecoration: "none" }}
            >
              Blog
            </a>
            <Link
              href="/open-technology-app/pricing"
              style={{
                background: T.ink,
                color: "#fff",
                padding: "6px 16px",
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

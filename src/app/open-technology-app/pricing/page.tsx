"use client";

import Link from "next/link";
import OtaHeader from "@/components/OtaHeader";

const T = {
  bg: "hsl(var(--background))",
  card: "hsl(var(--card))",
  ink: "hsl(var(--foreground))",
  ink70: "hsl(var(--foreground) / 0.72)",
  ink50: "hsl(var(--muted-foreground))",
  ink30: "hsl(var(--foreground) / 0.32)",
  ink12: "hsl(var(--border))",
  ink06: "hsl(var(--border) / 0.5)",
  good: "hsl(var(--accent))",
  primary: "hsl(var(--primary))",
  dark: "#0e0e0e",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
};

const SIGNUP = "https://www.opentechnologyapp.com";

const plans = [
  {
    name: "Free",
    price: "$0",
    sub: "Available now, no credit card",
    dark: false,
    recommended: false,
    features: [
      "1 project",
      "Up to 3 queues",
      "Up to 3 users",
      "All features unlocked",
      "Community support",
    ],
    cta: "Sign up free",
  },
  {
    name: "One-time license",
    price: "$299",
    sub: "Pay once, use forever",
    dark: true,
    recommended: true,
    features: [
      "Unlimited projects",
      "Unlimited queues",
      "Unlimited users",
      "Self-host on your Vercel + Supabase",
      "Source access",
      "Updates at your pace",
      "Email support",
    ],
    cta: "Buy license",
  },
  {
    name: "Org subscription",
    price: "Soon",
    sub: "Coming soon for larger teams",
    dark: false,
    recommended: false,
    features: [
      "Hosted on opentechnologyapp.app",
      "Live in ~2 min after subscribing",
      "Org-wide SSO (planned)",
      "SLA & priority support (planned)",
      "Volume pricing",
    ],
    cta: "Join waitlist",
  },
];

const comparison = [
  ["Task queues", "Every tier"],
  ["Live dashboards", "Every tier"],
  ["Workflow automation", "Every tier"],
  ["Client portal", "Every tier"],
  ["Projects", "Every tier"],
  ["Access control", "Every tier"],
  ["Time logging", "Every tier"],
  ["Comments & activity", "Every tier"],
];

export default function OtaPricingPage() {
  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: T.font, color: T.ink }}>
      <OtaHeader />

      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
        {/* Back link */}
        <div style={{ padding: "20px 0 0" }}>
          <Link
            href="/open-technology-app"
            style={{ fontSize: 14, color: T.ink50, textDecoration: "none" }}
          >
            &larr; Open Technology App
          </Link>
        </div>

        {/* Title */}
        <div style={{ padding: "48px 0 56px", textAlign: "center" }}>
          <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 12px" }}>Simple by design.</h1>
          <p style={{ fontSize: 17, color: T.ink70, margin: 0 }}>
            No feature paywalls — every feature works, regardless of tier.
          </p>
        </div>

        {/* Pricing cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 64 }}>
          {plans.map((p) => (
            <div
              key={p.name}
              style={{
                background: p.dark ? T.dark : T.card,
                color: p.dark ? "#fff" : T.ink,
                borderRadius: 16,
                padding: 32,
                border: p.dark ? "none" : `1px solid ${T.ink06}`,
                position: "relative",
              }}
            >
              {p.recommended && (
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 999,
                  }}
                >
                  Recommended
                </span>
              )}
              <h3 style={{ fontSize: 16, fontWeight: 600, margin: "0 0 16px" }}>{p.name}</h3>
              <div style={{ fontSize: 36, fontWeight: 700, margin: "0 0 4px" }}>{p.price}</div>
              <p style={{ fontSize: 13, opacity: 0.65, margin: "0 0 24px" }}>{p.sub}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px" }}>
                {p.features.map((f) => (
                  <li key={f} style={{ fontSize: 14, padding: "5px 0", opacity: 0.85 }}>
                    <span style={{ color: p.dark ? "#fff" : T.good, marginRight: 8 }}>&#10003;</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={SIGNUP}
                style={{
                  display: "block",
                  width: "100%",
                  padding: "10px 0",
                  borderRadius: 8,
                  border: p.dark ? "1px solid rgba(255,255,255,.2)" : `1px solid ${T.ink12}`,
                  background: p.dark ? "rgba(255,255,255,.1)" : "transparent",
                  color: p.dark ? "#fff" : T.ink,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: T.font,
                  textDecoration: "none",
                  textAlign: "center",
                  boxSizing: "border-box",
                }}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Comparison grid */}
        <div style={{ marginBottom: 64 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 24px", textAlign: "center" }}>
            What you get on every tier
          </h2>
          <div
            style={{
              background: T.card,
              borderRadius: 12,
              border: `1px solid ${T.ink06}`,
              overflow: "hidden",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <tbody>
                {comparison.map(([feature, tier]) => (
                  <tr key={feature} style={{ borderBottom: `1px solid ${T.ink06}` }}>
                    <td style={{ padding: "12px 20px", fontWeight: 500 }}>{feature}</td>
                    <td style={{ padding: "12px 20px", color: T.good, fontWeight: 600 }}>{tier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Slug note */}
        <div style={{ textAlign: "center", padding: "0 0 80px" }}>
          <p style={{ fontSize: 14, color: T.ink50 }}>
            Paid orgs are live at <span style={{ fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace' }}>yourslug.opentechnologyapp.app</span> within ~2 minutes of subscribing.
          </p>
        </div>
      </main>
    </div>
  );
}

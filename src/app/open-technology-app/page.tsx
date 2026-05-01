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
  mono: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
};

const SIGNUP = "https://www.opentechnologyapp.com";

const IMG = "https://www.opentechnologyblog.com";

export default function OtaHomePage() {

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: T.font, color: T.ink }}>
      <OtaHeader />

      {/* ===== HERO ===== */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
          {/* Left */}
          <div>
            <span
              style={{
                display: "inline-block",
                background: T.ink06,
                color: T.ink70,
                fontSize: 12,
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 999,
                marginBottom: 20,
              }}
            >
              Workflow management for teams
            </span>
            <h1 style={{ fontSize: 42, fontWeight: 700, lineHeight: 1.15, margin: "0 0 16px" }}>
              Real power.<br />Without the enterprise complexity.
            </h1>
            <p style={{ fontSize: 17, color: T.ink70, lineHeight: 1.6, margin: "0 0 28px", maxWidth: 480 }}>
              OpenTechnologyApp is a modern task queue manager built for teams who need real power
              without enterprise complexity. Manage customers, tasks, and items — with a client
              portal included — all under one roof.
            </p>

            {/* CTA */}
            <div style={{ marginBottom: 28 }}>
              <a
                href={SIGNUP}
                style={{
                  display: "inline-block",
                  background: T.primary,
                  color: "#fff",
                  padding: "12px 28px",
                  borderRadius: 8,
                  fontWeight: 600,
                  fontSize: 15,
                  textDecoration: "none",
                }}
              >
                Start free — no credit card
              </a>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 24, fontSize: 13, color: T.ink50 }}>
              <span>~2 min go live</span>
              <span style={{ color: T.ink12 }}>|</span>
              <span>Isolated own DB &amp; URL</span>
              <span style={{ color: T.ink12 }}>|</span>
              <span>No paywalls every feature</span>
            </div>
          </div>

          {/* Right: screenshots */}
          <div style={{ position: "relative", minHeight: 380 }}>
            <img
              src={`${IMG}/ota-queues.png`}
              alt="Task queues screenshot"
              style={{
                width: "90%",
                borderRadius: 12,
                boxShadow: "0 8px 32px rgba(0,0,0,.12)",
                transform: "rotate(0.6deg)",
                position: "relative",
                zIndex: 2,
              }}
            />
            <img
              src={`${IMG}/ota-dashboards.png`}
              alt="Dashboards screenshot"
              style={{
                width: "70%",
                borderRadius: 12,
                boxShadow: "0 8px 32px rgba(0,0,0,.12)",
                transform: "rotate(-1.5deg)",
                position: "absolute",
                bottom: -20,
                left: -20,
                zIndex: 1,
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== WHY WE BUILT IT ===== */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", margin: "0 0 40px" }}>
          Most teams pay multiple companies to do one job.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20, marginBottom: 40 }}>
          {[
            { name: "Salesforce", desc: "CRM that costs more than your engineers" },
            { name: "Jira", desc: "Tickets that need their own project manager" },
            { name: "Monday", desc: "Boards that look pretty but don't scale" },
          ].map((c) => (
            <div
              key={c.name}
              style={{
                background: T.card,
                borderRadius: 12,
                padding: 28,
                border: `1px solid ${T.ink06}`,
              }}
            >
              <h3 style={{ fontSize: 18, fontWeight: 600, textDecoration: "line-through", color: T.ink30, margin: "0 0 8px" }}>
                {c.name}
              </h3>
              <p style={{ fontSize: 14, color: T.ink50, margin: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
        {/* Dark banner */}
        <div
          style={{
            background: T.dark,
            color: "#fff",
            borderRadius: 16,
            padding: "40px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <p style={{ fontSize: 20, fontWeight: 600, margin: 0, maxWidth: 560 }}>
            One tool. Queues, dashboards, automations, and a real client portal.
          </p>
          <Link
            href="/open-technology-app/features"
            style={{
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            See features &rarr;
          </Link>
        </div>
      </section>

      {/* ===== FEATURE PEEK ===== */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 24px" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: T.ink50, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 8px" }}>
          What&apos;s inside
        </p>
        <h2 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 40px" }}>Built around the queue</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 32 }}>
          {[
            { title: "Task queues", desc: "Structured queues organize every item with status, priority, type, and assignee.", img: "ota-queues.png" },
            { title: "Live dashboards", desc: "Widget-based dashboards give teams a real-time view of workload and progress.", img: "ota-dashboards.png" },
            { title: "Workflow automation", desc: "Trigger-based automations eliminate repetitive manual steps across every queue.", img: "ota-automations.png" },
            { title: "Client portal", desc: "An external-facing portal lets clients submit, track, and view their own items.", img: "ota-portal.png" },
          ].map((f) => (
            <div
              key={f.title}
              style={{
                background: T.card,
                borderRadius: 12,
                padding: 24,
                border: `1px solid ${T.ink06}`,
              }}
            >
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "0 0 6px" }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: T.ink70, margin: "0 0 16px" }}>{f.desc}</p>
              <img
                src={`${IMG}/${f.img}`}
                alt={f.title}
                style={{ width: "100%", borderRadius: 8 }}
              />
            </div>
          ))}
        </div>
        <Link
          href="/open-technology-app/features"
          style={{ color: T.ink, fontWeight: 600, fontSize: 15, textDecoration: "none" }}
        >
          Full feature tour &rarr;
        </Link>
      </section>

      {/* ===== PRICING PEEK ===== */}
      <section
        style={{
          background: T.dark,
          color: "#fff",
          padding: "64px 24px",
          marginTop: 40,
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 12px" }}>
              No feature paywalls.
            </h2>
            <p style={{ fontSize: 16, opacity: 0.72, margin: "0 0 24px" }}>
              Every feature works, regardless of tier.
            </p>
            <Link
              href="/open-technology-app/pricing"
              style={{
                display: "inline-block",
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                padding: "10px 24px",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              See all plans &rarr;
            </Link>
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 15, lineHeight: 2.2 }}>
            {[
              "Free tier",
              "One-time purchase",
              "Org subscriptions coming soon",
              "No feature paywalls",
            ].map((b) => (
              <li key={b}>
                <span style={{ color: "#fff", marginRight: 10 }}>&#10003;</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ textAlign: "center", padding: "80px 24px 64px" }}>
        <h2 style={{ fontSize: 32, fontWeight: 700, margin: "0 0 20px" }}>
          Stop duct-taping tools together.
        </h2>
        <a
          href={SIGNUP}
          style={{
            display: "inline-block",
            background: T.primary,
            color: "#fff",
            padding: "12px 28px",
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 15,
            textDecoration: "none",
          }}
        >
          Get started free
        </a>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          borderTop: `1px solid ${T.ink06}`,
          padding: "40px 24px 32px",
          maxWidth: 1120,
          margin: "0 auto",
          fontFamily: T.font,
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <img src="/icon.png" alt="OTA" style={{ width: 24, height: 24, borderRadius: 4 }} />
              <span style={{ fontWeight: 600, fontSize: 14 }}>Open Technology App</span>
            </div>
            <p style={{ fontSize: 13, color: T.ink50, margin: 0 }}>
              Workflow management for modern teams.
            </p>
          </div>
          <div style={{ display: "flex", gap: 48 }}>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: T.ink50, margin: "0 0 12px" }}>
                Product
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                <Link href="/open-technology-app/features" style={{ color: T.ink70, textDecoration: "none" }}>Features</Link>
                <Link href="/open-technology-app/pricing" style={{ color: T.ink70, textDecoration: "none" }}>Pricing</Link>
              </div>
            </div>
            <div>
              <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, color: T.ink50, margin: "0 0 12px" }}>
                Community
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
                <Link href="/blog" style={{ color: T.ink70, textDecoration: "none" }}>Blog</Link>
              </div>
            </div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: T.ink30, margin: 0 }}>
          &copy; {new Date().getFullYear()} Open Technology App. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

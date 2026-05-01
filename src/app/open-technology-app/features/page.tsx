"use client";

import Link from "next/link";
import OtaHeader from "@/components/OtaHeader";

const T = {
  bg: "#f7f6f2",
  card: "#ffffff",
  ink: "#0e0e0e",
  ink70: "rgba(14,14,14,.72)",
  ink50: "rgba(14,14,14,.55)",
  ink30: "rgba(14,14,14,.32)",
  ink12: "rgba(14,14,14,.12)",
  ink06: "rgba(14,14,14,.06)",
  good: "#10b981",
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
};

const IMG = "https://www.opentechnologyblog.com";

const features = [
  {
    title: "Task queues",
    desc: "Structured queues organize every item with status, priority, type, and assignee — all in one clean view.",
    bullets: [
      "Filter, sort, and export items at any time",
      "Parent/child item relationships for complex work",
      "Customizable columns per queue",
    ],
    img: "ota-queues.png",
  },
  {
    title: "Live dashboards",
    desc: "Widget-based dashboards give teams a real-time view of workload, priorities, and progress.",
    bullets: [
      "Calendar view with inline item previews",
      "Priority breakdown charts (Low / Medium / High)",
      "Queue distribution widgets with percentage splits",
    ],
    img: "ota-dashboards.png",
  },
  {
    title: "Workflow automation",
    desc: "Trigger-based automations eliminate repetitive manual steps across every queue.",
    bullets: [
      "Auto-assign, escalate, and move items on condition",
      "Status-change triggers with comment injection",
      "Slack and email notification actions built in",
    ],
    img: "ota-automations.png",
  },
  {
    title: "Client portal",
    desc: "An external-facing portal lets clients submit, track, and view their own items without shared logins.",
    bullets: [
      "Branded portal per queue with custom notices",
      "Clients see only their own submitted items",
      "Form fields fully configurable per portal",
    ],
    img: "ota-portal.png",
  },
  {
    title: "By project",
    desc: "Projects group related queues, dashboards, portals, and automations into one organized space.",
    bullets: [
      "Role-based access: Admin, Member, Viewer",
      "Multiple projects side by side in the sidebar",
      "Each project is fully self-contained",
    ],
    img: "ota-projects.png",
  },
];

const roles = [
  {
    role: "Admin",
    permissions: "Manage users, all settings, automations, full data access, read/write items, comments, time logging",
  },
  {
    role: "Member",
    permissions: "Read/write items, comments, time logging, full project access",
    note: "Member role permissions are configurable — Member Roles coming soon.",
  },
  {
    role: "Viewer",
    permissions: "Read all items, time logging, public comments",
  },
];

export default function OtaFeaturesPage() {
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
          <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 12px" }}>
            Everything you need.
          </h1>
          <p style={{ fontSize: 17, color: T.ink70, margin: 0, maxWidth: 520, marginLeft: "auto", marginRight: "auto" }}>
            Queues, dashboards, automations, a client portal, and project-level organization — all included.
          </p>
        </div>

        {/* Features */}
        {features.map((f, i) => {
          const counter = `0${i + 1}/0${features.length}`;
          const textLeft = i % 2 === 0;
          return (
            <div
              key={f.title}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 48,
                alignItems: "center",
                marginBottom: 72,
                direction: textLeft ? "ltr" : "rtl",
              }}
            >
              <div style={{ direction: "ltr" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: T.ink30, fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace' }}>
                  {counter}
                </span>
                <h2 style={{ fontSize: 28, fontWeight: 700, margin: "8px 0 12px" }}>{f.title}</h2>
                <p style={{ fontSize: 15, color: T.ink70, lineHeight: 1.6, margin: "0 0 20px" }}>{f.desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {f.bullets.map((b) => (
                    <li key={b} style={{ fontSize: 14, color: T.ink70, padding: "4px 0" }}>
                      <span style={{ color: T.good, marginRight: 8 }}>&#10003;</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ direction: "ltr" }}>
                <img
                  src={`${IMG}/${f.img}`}
                  alt={f.title}
                  style={{ width: "100%", borderRadius: 12, boxShadow: "0 4px 24px rgba(0,0,0,.08)" }}
                />
              </div>
            </div>
          );
        })}

        {/* Access Control */}
        <div style={{ padding: "48px 0 80px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>Access control</h2>
          <p style={{ fontSize: 15, color: T.ink70, margin: "0 0 32px" }}>
            Role-based access enforced server-side. A demoted user&apos;s next request is rejected immediately — no restart, no delay.
          </p>
          <div style={{ background: T.card, borderRadius: 12, border: `1px solid ${T.ink06}`, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${T.ink06}` }}>
                  <th style={{ textAlign: "left", padding: "14px 20px", fontWeight: 600 }}>Role</th>
                  <th style={{ textAlign: "left", padding: "14px 20px", fontWeight: 600 }}>Permissions</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((r) => (
                  <tr key={r.role} style={{ borderBottom: `1px solid ${T.ink06}` }}>
                    <td style={{ padding: "14px 20px", fontWeight: 600 }}>{r.role}</td>
                    <td style={{ padding: "14px 20px", color: T.ink70 }}>
                      {r.permissions}
                      {r.note && (
                        <div style={{ fontSize: 13, color: T.ink50, marginTop: 4 }}>{r.note}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

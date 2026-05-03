import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features — Task Queues, Dashboards, Automations & Client Portal",
  description: "Everything inside OpenTechnologyApp: structured task queues, live dashboards, trigger-based workflow automations, a client portal, and role-based access control.",
  alternates: { canonical: "/open-technology-app/features" },
  openGraph: {
    title: "OpenTechnologyApp Features",
    description: "Task queues, live dashboards, workflow automations, client portal, and project-level organization — all included.",
    type: "website",
    url: "/open-technology-app/features",
  },
};

export default function FeaturesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

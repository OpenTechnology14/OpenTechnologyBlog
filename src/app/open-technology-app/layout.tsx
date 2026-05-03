import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Technology App — Task Queues, Client Portal & Workflow Automation",
  description: "OpenTechnologyApp is a modern task queue manager for teams. Manage customers, tasks, and items with a client portal, live dashboards, and workflow automations — all included.",
  alternates: { canonical: "/open-technology-app" },
  openGraph: {
    title: "Open Technology App — Task Queues, Client Portal & Workflow Automation",
    description: "Modern task queue manager for teams. Queues, dashboards, automations, and a client portal — free to start.",
    type: "website",
    url: "/open-technology-app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Open Technology App",
    description: "Task queues, client portal, and workflow automation for modern teams.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Open Technology App",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Modern task queue manager for teams. Manage customers, tasks, and items with a client portal, live dashboards, and workflow automations.",
  url: "https://www.opentechnologyblog.com/open-technology-app",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Free" },
    { "@type": "Offer", price: "299", priceCurrency: "USD", name: "One-time license" },
  ],
};

export default function OtaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}

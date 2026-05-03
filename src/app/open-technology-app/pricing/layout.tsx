import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Free, One-Time License & Org Subscription",
  description: "OpenTechnologyApp pricing: start free with no credit card, buy a one-time license for $299 to self-host forever, or join the waitlist for managed org subscriptions.",
  alternates: { canonical: "/open-technology-app/pricing" },
  openGraph: {
    title: "OpenTechnologyApp Pricing",
    description: "Free tier, $299 one-time license, or org subscription. No feature paywalls — every feature works on every tier.",
    type: "website",
    url: "/open-technology-app/pricing",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}

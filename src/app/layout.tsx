import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.opentechnologyblog.com"),
  title: {
    default: "Open Technology — Open-Source Tools, Frameworks & Infrastructure Blog",
    template: "%s | Open Technology",
  },
  description: "Exploring the open-source ecosystem — tools, frameworks, and infrastructure for building modern applications without vendor lock-in.",
  openGraph: {
    siteName: "Open Technology",
    type: "website",
    locale: "en_US",
    url: "https://www.opentechnologyblog.com",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "Open Technology" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@opentechnology",
  },
  alternates: {
    canonical: "https://www.opentechnologyblog.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

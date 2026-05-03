import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

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
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

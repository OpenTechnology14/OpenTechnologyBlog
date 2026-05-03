"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const wrapStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "64rem",
  marginLeft: "auto",
  marginRight: "auto",
  paddingLeft: "1.5rem",
  paddingRight: "1.5rem",
};

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`text-sm transition-colors hover:text-foreground ${
        pathname === href || (href !== "/" && pathname.startsWith(href))
          ? "text-foreground font-semibold"
          : "text-muted-foreground"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div style={wrapStyle} className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/icon.png" alt="Open Technology" width={32} height={32} className="rounded-md" />
          <span className="font-heading text-lg font-bold tracking-tight">Open Technology</span>
        </Link>

        {/* Nav */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLink("/", "Home")}
          {navLink("/blog", "Blog")}
          <Link
            href="/open-technology-app"
            className="text-sm font-semibold text-primary-foreground bg-primary px-4 py-1.5 rounded-full transition-opacity hover:opacity-90"
          >
            Open Technology App
          </Link>
        </nav>

        {/* Theme toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="shrink-0">
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
}

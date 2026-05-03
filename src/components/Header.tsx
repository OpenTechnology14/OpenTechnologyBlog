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
      <div style={{ ...wrapStyle, height: 56 }} className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 no-underline">
          <Image src="/icon.png" alt="Open Technology" width={28} height={28} className="rounded-md" />
          <span className="font-heading text-[15px] font-semibold tracking-tight">Open Technology</span>
        </Link>

        {/* Nav + theme toggle */}
        <nav className="hidden sm:flex items-center gap-6 text-sm">
          {navLink("/", "Home")}
          {navLink("/blog", "Blog")}
          <Link
            href="/open-technology-app"
            className="font-semibold text-primary-foreground bg-primary px-4 py-1.5 rounded-full transition-opacity hover:opacity-90 no-underline"
            style={{ fontSize: 13 }}
          >
            Open Technology App
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
            {isDark ? <Sun className="h-[17px] w-[17px]" /> : <Moon className="h-[17px] w-[17px]" />}
          </Button>
        </nav>
      </div>
    </header>
  );
}

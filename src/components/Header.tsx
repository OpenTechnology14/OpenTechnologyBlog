"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div style={wrapStyle} className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icon.png" alt="Open Technology" width={32} height={32} className="rounded-md" />
          <span className="font-heading text-lg font-bold tracking-tight">Open Technology</span>
        </Link>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/" className={pathname === "/" ? "font-semibold" : ""}>
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/blog" className={pathname === "/blog" ? "font-semibold" : ""}>
                  Blog
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, TECH_TOOLS, Category } from "@/data/content";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const categoryColors: Record<Category, string> = {
  "App + API Dev": "text-primary",
  "App + API Hosting": "text-accent",
  "Workflow Management": "text-ring",
  "Asset Management": "text-destructive",
};

export default function TechBullets() {
  return (
    <TooltipProvider delayDuration={100}>
      <section className="space-y-6">
        {CATEGORIES.map((cat) => {
          const tools = TECH_TOOLS.filter((t) => t.category === cat);
          return (
            <div key={cat}>
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className={`h-2 w-2 rounded-full bg-current ${categoryColors[cat]}`} />
                <h3 className={`font-semibold text-sm uppercase tracking-wider ${categoryColors[cat]}`}>
                  {cat}
                </h3>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {tools.map((tool) => (
                  <Tooltip key={tool.name}>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/blog?category=${encodeURIComponent(cat)}`}
                        className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card shadow-card transition-all hover:shadow-card-hover hover:scale-110 hover:-translate-y-0.5"
                      >
                        {tool.logo ? (
                          <Image
                            src={tool.logo}
                            alt={tool.name}
                            width={28}
                            height={28}
                            className="object-contain"
                          />
                        ) : (
                          <span className="text-xl">{tool.icon}</span>
                        )}
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{tool.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </TooltipProvider>
  );
}

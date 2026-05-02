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
  "Open Technology App": "text-accent",
  "Dev Tools": "text-primary",
  "Managed Cloud Apps": "text-emerald-600 dark:text-emerald-400",
  "Workflow Management": "text-ring",
  "Device & Data": "text-destructive",
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
              <div className="flex flex-wrap justify-center gap-4">
                {tools.map((tool) => (
                  <Tooltip key={tool.name}>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/blog?category=${encodeURIComponent(cat)}`}
                        className="flex flex-col items-center gap-1.5 w-16 group"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-card shadow-card transition-all group-hover:shadow-card-hover group-hover:scale-110 group-hover:-translate-y-0.5">
                          {tool.logo ? (
                            tool.darkInvert ? (
                              <>
                                {/* Light mode: original */}
                                <Image
                                  src={tool.logo}
                                  alt={tool.name}
                                  width={28}
                                  height={28}
                                  className="object-contain block dark:hidden"
                                />
                                {/* Dark mode: white version */}
                                <Image
                                  src={tool.logo}
                                  alt={tool.name}
                                  width={28}
                                  height={28}
                                  className="object-contain hidden dark:block brightness-0 invert"
                                />
                              </>
                            ) : (
                              <Image
                                src={tool.logo}
                                alt={tool.name}
                                width={28}
                                height={28}
                                className="object-contain"
                              />
                            )
                          ) : (
                            <span className="text-xl">{tool.icon}</span>
                          )}
                        </div>
                        <span className="text-[10px] text-center text-muted-foreground leading-tight line-clamp-2 w-full">
                          {tool.name}
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">{tool.name}</p>
                      {tool.description && (
                        <p className="text-xs text-muted-foreground mt-0.5">{tool.description}</p>
                      )}
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

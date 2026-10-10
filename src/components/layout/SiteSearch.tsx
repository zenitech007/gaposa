"use client";

import React, { useState, useMemo } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { Search, X, BookOpen, Newspaper, FileText, ArrowRight } from "lucide-react";
import { programmes, formatProgrammeTitle } from "@/content/programmes";
import { newsItems } from "@/content/news";
import { Tag } from "@/ui/Tag";

interface SiteSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchResult {
  id: string;
  type: "programme" | "news" | "page";
  title: string;
  subtitle: string;
  url: string;
  tag?: "ND" | "HND";
}

const staticPages: { title: string; subtitle: string; url: string }[] = [
  { title: "About the polytechnic", subtitle: "Mission, history, and academic structure", url: "/about" },
  { title: "Administration & leadership", subtitle: "Principal officers, management board, and academic staff", url: "/administration" },
  { title: "Admissions overview", subtitle: "Requirements, how to apply, and FAQs", url: "/admissions" },
  { title: "All programmes", subtitle: "Full directory of ND and HND courses", url: "/programmes" },
  { title: "Student life", subtitle: "Practical training, digital learning, and community", url: "/student-life" },
  { title: "Alumni voices", subtitle: "Graduate outcomes and career pathways", url: "/alumni" },
  { title: "Contact admissions", subtitle: "Admissions office contact and enquiry form", url: "/contact" },
  { title: "Privacy policy", subtitle: "Information handling and privacy standards", url: "/privacy" },
];

export function SiteSearch({ open, onOpenChange }: SiteSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const matches: SearchResult[] = [];

    // 1. Search programmes
    for (const prog of programmes) {
      const formatted = formatProgrammeTitle(prog.level, prog.title);
      const schoolTitle = prog.school?.title || "";
      if (
        prog.title.toLowerCase().includes(q) ||
        formatted.toLowerCase().includes(q) ||
        prog.summary.toLowerCase().includes(q) ||
        schoolTitle.toLowerCase().includes(q) ||
        prog.level.toLowerCase().includes(q)
      ) {
        matches.push({
          id: `prog-${prog.slug}`,
          type: "programme",
          title: formatted,
          subtitle: `${prog.level} • ${prog.durationYears} Years • ${schoolTitle}`,
          url: `/programmes/${prog.slug}`,
          tag: prog.level,
        });
      }
    }

    // 2. Search pages
    for (const page of staticPages) {
      if (page.title.toLowerCase().includes(q) || page.subtitle.toLowerCase().includes(q)) {
        matches.push({
          id: `page-${page.url}`,
          type: "page",
          title: page.title,
          subtitle: page.subtitle,
          url: page.url,
        });
      }
    }

    // 3. Search news
    for (const item of newsItems) {
      if (item.title.toLowerCase().includes(q) || item.excerpt.toLowerCase().includes(q)) {
        matches.push({
          id: `news-${item.slug}`,
          type: "news",
          title: item.title,
          subtitle: `${item.type.toUpperCase()} • ${item.date}`,
          url: `/news/${item.slug}`,
        });
      }
    }

    return matches.slice(0, 8);
  }, [query]);

  const handleSelect = (url: string) => {
    onOpenChange(false);
    setQuery("");
    router.push(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex].url);
      }
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 bg-ink/40 z-50 backdrop-blur-xs transition-opacity" />
        <DialogPrimitive.Content
          onKeyDown={handleKeyDown}
          className="fixed left-1/2 top-20 -translate-x-1/2 w-full max-w-[min(92vw,36rem)] bg-white border border-mist shadow-menu rounded-none z-50 p-0 focus:outline-none overflow-hidden"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">Search the site</DialogPrimitive.Title>

          {/* Search Header Input */}
          <div className="flex items-center px-4 py-3 border-b border-mist gap-3 bg-white">
            <Search className="w-5 h-5 text-slate shrink-0" strokeWidth={1.75} />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              placeholder="Search programmes, admissions, news..."
              className="w-full bg-transparent text-ink placeholder:text-slate text-base focus:outline-none"
              aria-label="Search site"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-slate hover:text-ink p-1 rounded"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-2">
            {query.trim() === "" ? (
              <div className="py-8 px-4 text-center text-slate text-sm">
                Type a keyword such as <span className="text-ink font-medium">horticulture</span>,{" "}
                <span className="text-ink font-medium">requirements</span>, or{" "}
                <span className="text-ink font-medium">admissions</span>.
              </div>
            ) : results.length === 0 ? (
              <div className="py-8 px-4 text-center text-slate text-sm">
                No results for &ldquo;{query}&rdquo;. Try a programme name such as horticulture.
              </div>
            ) : (
              <ul className="space-y-1" role="listbox">
                {results.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <li
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleSelect(item.url)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between p-3 cursor-pointer transition-colors ${
                        isSelected ? "bg-chalk text-navy" : "text-ink hover:bg-chalk"
                      }`}
                    >
                      <div className="flex items-start gap-3 min-w-0 pr-2">
                        <div className="mt-0.5 text-slate shrink-0">
                          {item.type === "programme" && <BookOpen className="w-4 h-4" />}
                          {item.type === "page" && <FileText className="w-4 h-4" />}
                          {item.type === "news" && <Newspaper className="w-4 h-4" />}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-base truncate">{item.title}</span>
                            {item.tag && <Tag variant={item.tag}>{item.tag}</Tag>}
                          </div>
                          <p className="text-xs text-slate truncate mt-0.5">{item.subtitle}</p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate shrink-0" strokeWidth={1.75} />
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Footer keyboard hints */}
          <div className="bg-chalk px-4 py-2 text-xs text-slate border-t border-mist flex items-center justify-between">
            <span>
              Use <kbd className="font-mono bg-white px-1 border border-mist">↑</kbd>{" "}
              <kbd className="font-mono bg-white px-1 border border-mist">↓</kbd> to navigate,{" "}
              <kbd className="font-mono bg-white px-1 border border-mist">Enter</kbd> to open
            </span>
            <span>
              <kbd className="font-mono bg-white px-1 border border-mist">Esc</kbd> to close
            </span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

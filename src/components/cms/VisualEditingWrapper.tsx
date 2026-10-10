"use client";

import { VisualEditing } from "next-sanity";
import Link from "next/link";
import { Edit3 } from "lucide-react";

export function VisualEditingWrapper() {
  return (
    <>
      <VisualEditing />
      <aside className="fixed bottom-4 right-4 z-50 flex items-center gap-3 bg-navy text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-2xl border border-white/20 select-none backdrop-blur-md">
        <span className="flex items-center gap-1.5 text-amber-300">
          <Edit3 className="w-3.5 h-3.5 animate-pulse" />
          <span>Sanity Visual Editing Active</span>
        </span>
        <span className="text-white/30">|</span>
        <Link
          href="/api/draft-mode/disable"
          className="text-white/80 hover:text-white underline decoration-white/40 underline-offset-2 transition-colors"
        >
          Exit Preview
        </Link>
      </aside>
    </>
  );
}

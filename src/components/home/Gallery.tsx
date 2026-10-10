"use client";

import { useState } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { media } from "@/content/media";
import { Section } from "@/ui/Section";
import { Photo } from "@/ui/Photo";

interface GalleryItem {
  key: string;
  ratio: "4/5" | "1/1" | "3/2";
  caption: string;
}

const gallerySlots: GalleryItem[] = [
  { key: "gallery.1", ratio: "4/5", caption: "Practical fieldwork and crop management" },
  { key: "gallery.2", ratio: "1/1", caption: "Laboratory analysis and soil testing" },
  { key: "gallery.3", ratio: "3/2", caption: "Classroom lecture and technical drafting" },
  { key: "gallery.4", ratio: "4/5", caption: "Cooperative society workshop discussion" },
  { key: "gallery.5", ratio: "3/2", caption: "Campus grounds and green research space" },
  { key: "gallery.6", ratio: "1/1", caption: "Students collaborating on a group project" },
];

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex + 1) % gallerySlots.length);
    }
  };

  const handlePrev = () => {
    if (activeIndex !== null) {
      setActiveIndex((activeIndex - 1 + gallerySlots.length) % gallerySlots.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      handleNext();
    } else if (e.key === "ArrowLeft") {
      handlePrev();
    }
  };

  const currentItem = activeIndex !== null ? gallerySlots[activeIndex] : null;

  return (
    <Section background="chalk">
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-navy font-display font-medium">Life at the polytechnic</h2>
          <p className="text-slate text-base sm:text-lg">
            Everyday learning, field exercises, and community interaction.
          </p>
        </div>

        {/* CSS Columns Masonry (2 columns mobile, 3 desktop) */}
        <div className="columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {gallerySlots.map((item, index) => (
            <div
              key={item.key}
              onClick={() => setActiveIndex(index)}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden bg-white border border-mist transition-all hover:border-navy"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIndex(index);
                }
              }}
              aria-label={`Open photo lightbox: ${item.caption}`}
            >
              <Photo
                mediaKey={item.key}
                caption={item.caption}
                aspectRatio={item.ratio}
                className="w-full transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="p-2 sm:p-3 bg-white border-t border-mist/60 text-xs text-slate truncate">
                {item.caption}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Radix Dialog */}
      <DialogPrimitive.Root
        open={activeIndex !== null}
        onOpenChange={(open) => !open && setActiveIndex(null)}
      >
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 bg-ink/80 z-50 backdrop-blur-xs transition-opacity" />
          <DialogPrimitive.Content
            onKeyDown={handleKeyDown}
            className="fixed inset-4 sm:inset-10 z-50 flex flex-col items-center justify-center p-4 focus:outline-none"
            aria-describedby={undefined}
          >
            <DialogPrimitive.Title className="sr-only">
              {currentItem?.caption || "Gallery photo lightbox"}
            </DialogPrimitive.Title>

            {/* Top Close Button */}
            <div className="absolute top-4 right-4 z-50">
              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  aria-label="Close lightbox"
                  className="w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full focus-visible:outline-none"
                >
                  <X className="w-6 h-6" />
                </button>
              </DialogPrimitive.Close>
            </div>

            {/* Lightbox Body with Prev/Next Controls */}
            {currentItem && (
              <div className="relative max-w-4xl max-h-[80vh] w-full flex flex-col items-center justify-center">
                {/* Prev button */}
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous photo"
                  className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full z-10 focus-visible:outline-none"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Main Image */}
                <div className="w-full max-h-[68vh] overflow-hidden rounded bg-white shadow-xl flex items-center justify-center">
                  <Photo
                    mediaKey={currentItem.key}
                    caption={currentItem.caption}
                    aspectRatio={currentItem.ratio}
                    className="w-full max-h-[68vh] object-contain border-none"
                  />
                </div>

                {/* Caption & Counter */}
                <div className="mt-4 text-center text-white text-sm flex items-center gap-4">
                  <span>{currentItem.caption}</span>
                  <span className="text-white/60">
                    {activeIndex !== null ? activeIndex + 1 : 1} of {gallerySlots.length}
                  </span>
                </div>

                {/* Next button */}
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next photo"
                  className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full z-10 focus-visible:outline-none"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </Section>
  );
}

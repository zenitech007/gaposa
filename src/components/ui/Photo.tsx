import Image from "next/image";
import { media, MediaKey } from "@/content/media";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

interface PhotoProps {
  mediaKey?: MediaKey | string;
  src?: string;
  alt?: string;
  aspectRatio?: "1/1" | "4/5" | "3/2" | "16/9";
  className?: string;
  priority?: boolean;
  sizes?: string;
  caption?: string;
}

export function Photo({
  mediaKey,
  src: explicitSrc,
  alt: explicitAlt,
  aspectRatio: explicitRatio,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  caption,
}: PhotoProps) {
  const mediaItem = mediaKey && media[mediaKey] ? media[mediaKey] : undefined;
  const imageSrc = explicitSrc || mediaItem?.src;
  const imageAlt = explicitAlt || caption || mediaItem?.alt || `${site.name} campus image`;
  const ratio = explicitRatio || mediaItem?.ratio || "3/2";

  const ratioClass = {
    "1/1": "aspect-square",
    "4/5": "aspect-[4/5]",
    "3/2": "aspect-[3/2]",
    "16/9": "aspect-[16/9]",
  }[ratio] || "aspect-[3/2]";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-chalk border border-mist flex flex-col items-center justify-center select-none",
        ratioClass,
        className
      )}
    >
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover object-center"
        />
      ) : (
        /* Branded placeholder with dashed gear motif and caption */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-chalk">
          {/* Faint decorative gear rings in mist */}
          <svg
            className="w-16 h-16 text-mist/80 mb-2 shrink-0"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="4"
              strokeDasharray="6 4"
            />
            <circle
              cx="50"
              cy="50"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="4 3"
            />
          </svg>

          {/* Photo caption/guidance */}
          <span className="font-body text-xs sm:text-[13px] text-slate max-w-[220px] leading-snug">
            {caption || imageAlt}
          </span>
          <span className="text-[11px] text-slate/70 mt-1 uppercase tracking-wider font-medium">
            Photo Placeholder
          </span>
        </div>
      )}
    </div>
  );
}

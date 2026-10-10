import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "default" | "light";
  markOnly?: boolean;
  className?: string;
  priority?: boolean;
}

export function Logo({
  variant = "default",
  markOnly = false,
  className,
  priority = true,
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:rounded-sm",
        isLight && "on-dark focus-visible:ring-white focus-visible:ring-offset-navy",
        className
      )}
      aria-label={`${site.name} - Home`}
    >
      <Image
        src="/brand/logo.png"
        alt={site.name}
        width={160}
        height={48}
        priority={priority}
        className={cn(
          "h-10 sm:h-12 w-auto object-contain transition-[filter] duration-200",
          isLight && "brightness-0 invert"
        )}
      />
    </Link>
  );
}

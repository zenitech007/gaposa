import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  variant?: "ND" | "HND" | "sample" | "news" | "event" | "default";
  className?: string;
}

export function Tag({ children, variant = "default", className }: TagProps) {
  const variantStyles = {
    ND: "border-forest text-forest",
    HND: "border-navy text-navy",
    sample: "border-slate text-slate",
    news: "border-forest text-forest",
    event: "border-navy text-navy",
    default: "border-mist text-slate",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center px-1.5 py-0.5 text-xs font-semibold rounded-[2px] border leading-none tracking-wide select-none",
        variantStyles,
        className
      )}
    >
      {children}
    </span>
  );
}

export function SampleBadge() {
  const showBadge = process.env.NEXT_PUBLIC_SHOW_SAMPLE_BADGES === "true";
  if (!showBadge) return null;

  return <Tag variant="sample">Sample content</Tag>;
}

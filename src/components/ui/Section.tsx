import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "aside" | "header";
  background?: "white" | "chalk" | "navy";
  borderBottom?: boolean;
  borderTop?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function Section({
  as: Component = "section",
  background = "white",
  borderBottom = false,
  borderTop = false,
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) {
  const bgStyles = {
    white: "bg-white text-ink",
    chalk: "bg-chalk text-ink",
    navy: "bg-navy text-white on-dark",
  }[background];

  return (
    <Component
      className={cn(
        "w-full py-16 md:py-20 lg:py-24",
        bgStyles,
        borderBottom && "border-b border-mist",
        borderTop && "border-t border-mist",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full",
          containerClassName
        )}
      >
        {children}
      </div>
    </Component>
  );
}

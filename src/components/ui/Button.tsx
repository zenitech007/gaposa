import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "white-outline";
  href?: string;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", href, external, className, children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-body text-base transition-colors focus-visible:outline-none min-h-[44px] select-none text-left";

    const variantStyles = {
      primary:
        "h-12 px-6 bg-crimson text-white font-semibold rounded-[6px] hover:bg-[#991A28] active:bg-[#851622]",
      secondary:
        "h-12 px-6 bg-white border-[1.5px] border-navy text-navy font-semibold rounded-[6px] hover:bg-navy hover:text-white active:bg-navy/90",
      "white-outline":
        "h-12 px-6 bg-transparent border-[1.5px] border-white text-white font-semibold rounded-[6px] hover:bg-white hover:text-navy active:bg-white/90 on-dark",
      ghost:
        "p-0 h-auto font-medium text-navy underline underline-offset-4 decoration-1 hover:decoration-2 hover:text-forest",
    }[variant];

    const combinedClassName = cn(baseStyles, variantStyles, className);

    if (href) {
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {children}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

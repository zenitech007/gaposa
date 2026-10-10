"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Photo } from "@/ui/Photo";
import { heroVideo } from "@/content/media";
import { cn } from "@/lib/utils";

interface RingsProps {
  className?: string;
}

export function Rings({ className }: RingsProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    try {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } catch {
      // Browser environment check
    }
  }, []);

  // Motion easing: cubic-bezier(.2,.7,.2,1)
  const easeCurve = [0.2, 0.7, 0.2, 1] as const;

  // Staggered reveal variants
  const circleVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: (custom: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : custom * 0.12,
        duration: prefersReducedMotion ? 0.01 : 0.7,
        ease: easeCurve,
      },
    }),
  };

  const ringVariants = {
    hidden: { opacity: 0, pathLength: 0 },
    visible: (custom: number) => ({
      opacity: 1,
      pathLength: 1,
      transition: {
        delay: prefersReducedMotion ? 0 : custom * 0.12 + 0.1,
        duration: prefersReducedMotion ? 0.01 : 0.9,
        ease: easeCurve,
      },
    }),
  };

  const canPlayVideo = Boolean(heroVideo?.src) && !prefersReducedMotion;

  return (
    <div
      className={cn(
        "relative w-full aspect-square max-w-full sm:max-w-[420px] lg:max-w-[560px] max-w-[min(100%,340px)] mx-auto lg:ml-auto lg:mr-0 select-none",
        className
      )}
      aria-label="Three interlocking circular photos representing agriculture, environment, and community"
    >
      {/* 1. NAVY CIRCLE (top-right, z-10) */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={circleVariants}
        className="absolute z-10"
        style={{
          width: "48%",
          height: "48%",
          left: "50%",
          top: "0%",
        }}
      >
        {/* Navy dashed gear ring offset */}
        <svg
          className="absolute -inset-[10px] w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="47"
            stroke="#1D1D52"
            strokeWidth="5"
            strokeDasharray="7 5"
            strokeLinecap="butt"
            custom={1}
            variants={ringVariants}
          />
        </svg>

        {/* Circular photo */}
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-sm">
          <Photo
            mediaKey="hero.classroom"
            caption="Classroom and laboratory studies"
            aspectRatio="1/1"
            className="w-full h-full border-none"
            priority={true}
            sizes="(max-width: 640px) 165px, (max-width: 1024px) 200px, 270px"
          />
        </div>
      </motion.div>

      {/* 2. CRIMSON CIRCLE (mid-left, z-20) - Supports Looping Video or Photo Fallback */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={circleVariants}
        className="absolute z-20"
        style={{
          width: "56%",
          height: "56%",
          left: "0%",
          top: "14%",
        }}
      >
        {/* Crimson dashed gear ring offset */}
        <svg
          className="absolute -inset-[10px] w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="47"
            stroke="#B01E2E"
            strokeWidth="5"
            strokeDasharray="7 5"
            strokeLinecap="butt"
            custom={0}
            variants={ringVariants}
          />
        </svg>

        {/* Circular Video / Photo container */}
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-sm relative bg-chalk">
          {canPlayVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={heroVideo.poster}
              className="w-full h-full object-cover"
              aria-label={heroVideo.alt}
            >
              <source src={heroVideo.src} type="video/mp4" />
              <Photo
                mediaKey="hero.field"
                caption="Crop production and agricultural training"
                aspectRatio="1/1"
                className="w-full h-full border-none"
                priority={true}
                sizes="(max-width: 640px) 190px, (max-width: 1024px) 235px, 315px"
              />
            </video>
          ) : (
            <Photo
              mediaKey="hero.field"
              caption="Crop production and agricultural training"
              aspectRatio="1/1"
              className="w-full h-full border-none"
              priority={true}
              sizes="(max-width: 640px) 190px, (max-width: 1024px) 235px, 315px"
            />
          )}
        </div>
      </motion.div>

      {/* 3. GREEN CIRCLE (bottom-centre, z-30 over crimson and navy) */}
      <motion.div
        custom={2}
        initial="hidden"
        animate="visible"
        variants={circleVariants}
        className="absolute z-30"
        style={{
          width: "52%",
          height: "52%",
          left: "27%",
          top: "46%",
        }}
      >
        {/* Leaf green dashed gear ring offset */}
        <svg
          className="absolute -inset-[10px] w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="47"
            stroke="#2E9E3F"
            strokeWidth="5"
            strokeDasharray="7 5"
            strokeLinecap="butt"
            custom={2}
            variants={ringVariants}
          />
        </svg>

        {/* Circular photo */}
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white shadow-sm">
          <Photo
            mediaKey="hero.community"
            caption="Science laboratory practical studies"
            aspectRatio="1/1"
            className="w-full h-full border-none"
            priority={true}
            sizes="(max-width: 640px) 175px, (max-width: 1024px) 220px, 290px"
          />
        </div>
      </motion.div>
    </div>
  );
}

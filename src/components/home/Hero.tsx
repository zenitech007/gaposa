"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import { Rings } from "@/brand/Rings";
import { Button } from "@/ui/Button";

export function Hero() {
  return (
    <section className="relative w-full bg-white overflow-hidden py-10 sm:py-14 lg:py-0 lg:min-h-[min(88svh,760px)] flex items-center border-b border-mist">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12 w-full py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Column 1: Copy & CTAs (7 cols desktop) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 w-full pr-0 lg:pr-4"
          >
            <h1 className="text-navy text-left font-display font-medium leading-[1.05] tracking-tight text-balance">
              Fostering innovation, technology, and academic excellence at Gateway ICT Polytechnic Saapade
            </h1>

            <p className="text-slate text-lg sm:text-xl font-normal leading-relaxed text-left">
              Admissions are now open for ND and HND programmes across all faculties and departments.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button href={site.applyUrl} external variant="primary">
                Apply now
              </Button>
              <Button href="/programmes" variant="secondary">
                Browse programmes
              </Button>
            </div>
          </motion.div>

          {/* Column 2: 3-Ring Composition (5 cols desktop, pushed completely to the right edge) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <Rings className="lg:ml-auto lg:mr-0" />
          </div>
        </div>
      </div>
    </section>
  );
}

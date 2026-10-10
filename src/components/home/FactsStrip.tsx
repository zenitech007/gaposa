import { site } from "@/content/site";
import { programmes } from "@/content/programmes";

export function FactsStrip() {
  const items = [
    { label: "Academic offerings", value: `${programmes.length} programmes` },
    { label: "Qualifications", value: "ND and HND levels" },
    { label: "Campus location", value: "Saapade, Ogun State" },
    ...(site.admissions.open ? [{ label: "Current status", value: "Admissions open" }] : []),
  ];

  return (
    <section className="w-full bg-navy text-white py-12 border-y border-navy/40 on-dark">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y-0 lg:divide-x divide-white/20">
          {items.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-center space-y-1 ${
                idx !== 0 ? "lg:pl-8" : ""
              } ${idx !== items.length - 1 ? "lg:pr-8" : ""}`}
            >
              <span className="text-sm text-white/70 font-body">{item.label}</span>
              <span className="font-display font-medium text-xl sm:text-2xl text-white leading-tight">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

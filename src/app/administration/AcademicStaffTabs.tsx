"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/ui/Tabs";
import { academicLeadership, StaffMember } from "@/content/staff";
import { schools } from "@/content/programmes";
import { Mail, GraduationCap } from "lucide-react";

export function AcademicStaffTabs() {
  const [activeSchool, setActiveSchool] = useState<string>(schools[0]?.title || "");

  const renderStaffRows = (staffList: StaffMember[]) => (
    <div className="divide-y divide-mist border-y border-mist">
      {staffList.map((member) => (
        <div
          key={member.department}
          className="py-5 px-3 -mx-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-chalk transition-colors"
        >
          {/* Left: Department, Name & Qualifications */}
          <div className="space-y-1">
            <span className="text-xs uppercase font-semibold tracking-wider text-forest">
              {member.department}
            </span>
            <h4 className="font-display font-medium text-lg sm:text-xl text-navy">
              {member.name}
            </h4>
            {member.qualifications && (
              <p className="text-xs text-slate flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate/70" />
                <span>{member.qualifications}</span>
              </p>
            )}
          </div>

          {/* Right: Role & Contact */}
          <div className="flex flex-col sm:items-end gap-1 text-sm shrink-0">
            <span className="font-medium text-navy">{member.role}</span>
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="text-xs text-slate hover:text-navy hover:underline inline-flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5 text-slate/70" />
                <span>{member.email}</span>
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Tabs
      defaultValue={schools[0]?.title || ""}
      value={activeSchool}
      onValueChange={setActiveSchool}
      className="w-full space-y-6"
    >
      <TabsList
        aria-label="Filter academic leadership by school"
        className="overflow-x-auto flex-nowrap gap-5 sm:gap-8 whitespace-nowrap"
      >
        {schools.map((school) => (
          <TabsTrigger
            key={school.slug || school.title}
            value={school.title}
            className="text-sm sm:text-base shrink-0"
          >
            {school.title}
          </TabsTrigger>
        ))}
      </TabsList>

      {schools.map((school) => {
        const schoolStaff = academicLeadership.filter(
          (s) =>
            (typeof s.school === "string" ? s.school : s.school?.title) === school.title
        );
        return (
          <TabsContent
            key={school.slug || school.title}
            value={school.title}
            className="focus:outline-none"
          >
            {schoolStaff.length > 0 ? (
              renderStaffRows(schoolStaff)
            ) : (
              <div className="py-12 text-center text-slate border-y border-mist">
                Academic leadership for this school will be announced shortly.
              </div>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

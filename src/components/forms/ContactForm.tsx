"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";

export const contactSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter an email address like name@example.com"),
  phone: z.string().optional(),
  subject: z.enum(["Admissions", "Programmes", "Fees", "Other"], {
    errorMap: () => ({ message: "Select a subject for your enquiry" }),
  }),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters long")
    .max(1000, "Message cannot exceed 1000 characters"),
  honeypot: z.string().optional(), // Honeypot field
});

export type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const searchParams = useSearchParams();
  const subjectParam = searchParams.get("subject") || "Admissions";
  const defaultSubject = ["Admissions", "Programmes", "Fees", "Other"].includes(subjectParam)
    ? (subjectParam as "Admissions" | "Programmes" | "Fees" | "Other")
    : "Admissions";

  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: defaultSubject,
      honeypot: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Unable to send your message. Please try again later.");
      }

      setSubmitted(true);
      reset();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setServerError(err.message);
      } else {
        setServerError("An unexpected error occurred while sending your message.");
      }
    }
  };

  if (submitted) {
    return (
      <div className="bg-chalk border border-forest/40 p-8 space-y-4 rounded-none">
        <div className="flex items-center gap-3 text-forest">
          <CheckCircle2 className="w-6 h-6 shrink-0" />
          <h3 className="font-display font-medium text-2xl text-navy">Message sent</h3>
        </div>
        <p className="text-slate text-base leading-relaxed">
          Message sent. We reply to admissions questions by email, usually within a few working
          days.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-sm font-semibold text-navy hover:underline underline-offset-4 pt-2"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {serverError && (
        <div className="p-4 bg-crimson/10 border border-crimson text-crimson text-sm flex items-start gap-2">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <span>{serverError}</span>
        </div>
      )}

      {/* Honeypot field (hidden from real users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="hp_field">Do not fill this field</label>
        <input
          id="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("honeypot")}
        />
      </div>

      {/* Full Name */}
      <div className="space-y-1.5">
        <label htmlFor="fullName" className="block text-sm font-semibold text-navy">
          Full name <span className="text-crimson">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          {...register("fullName")}
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
          className="w-full h-11 px-3.5 bg-white border border-mist rounded-[6px] text-ink focus:outline-none focus:border-navy text-base"
        />
        {errors.fullName && (
          <p id="fullName-error" className="text-xs text-crimson font-medium flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.fullName.message}
          </p>
        )}
      </div>

      {/* Email Address */}
      <div className="space-y-1.5">
        <label htmlFor="email" className="block text-sm font-semibold text-navy">
          Email address <span className="text-crimson">*</span>
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
          className="w-full h-11 px-3.5 bg-white border border-mist rounded-[6px] text-ink focus:outline-none focus:border-navy text-base"
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-crimson font-medium flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Phone Number (Optional) */}
      <div className="space-y-1.5">
        <label htmlFor="phone" className="block text-sm font-semibold text-navy">
          Phone number <span className="text-slate font-normal text-xs">(optional)</span>
        </label>
        <input
          id="phone"
          type="tel"
          {...register("phone")}
          className="w-full h-11 px-3.5 bg-white border border-mist rounded-[6px] text-ink focus:outline-none focus:border-navy text-base"
        />
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <label htmlFor="subject" className="block text-sm font-semibold text-navy">
          Subject <span className="text-crimson">*</span>
        </label>
        <select
          id="subject"
          {...register("subject")}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          className="w-full h-11 px-3.5 bg-white border border-mist rounded-[6px] text-ink focus:outline-none focus:border-navy text-base"
        >
          <option value="Admissions">Admissions</option>
          <option value="Programmes">Programmes</option>
          <option value="Fees">Fees</option>
          <option value="Other">Other</option>
        </select>
        {errors.subject && (
          <p id="subject-error" className="text-xs text-crimson font-medium flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-sm font-semibold text-navy">
          Message <span className="text-crimson">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          {...register("message")}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="State your question clearly (minimum 20 characters)..."
          className="w-full p-3.5 bg-white border border-mist rounded-[6px] text-ink focus:outline-none focus:border-navy text-base"
        />
        {errors.message && (
          <p id="message-error" className="text-xs text-crimson font-medium flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 px-8 bg-crimson hover:bg-[#991A28] disabled:bg-slate text-white font-semibold rounded-[6px] transition-colors focus-visible:outline-none"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

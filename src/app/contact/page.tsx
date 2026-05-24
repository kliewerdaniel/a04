"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/animations/fade-in";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  projectType: z.enum([
    "knowledge-system",
    "automation",
    "ai-website",
    "local-ai",
    "research",
    "other",
  ]),
  budget: z.string().optional(),
  message: z.string().max(5000).optional(),
  referral: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const projectTypes = [
  { value: "knowledge-system", label: "AI Knowledge System" },
  { value: "automation", label: "Workflow Automation" },
  { value: "ai-website", label: "AI-Powered Website" },
  { value: "local-ai", label: "Local AI Deployment" },
  { value: "research", label: "Content/Research Pipeline" },
  { value: "other", label: "Other" },
];

const budgets = [
  { value: "under-2k", label: "Under $2k" },
  { value: "2k-5k", label: "$2k–$5k" },
  { value: "5k-10k", label: "$5k–$10k" },
  { value: "10k-25k", label: "$10k–$25k" },
  { value: "over-25k", label: "$25k+" },
  { value: "not-sure", label: "Not sure" },
];

const sources = [
  { value: "blog", label: "Blog" },
  { value: "google", label: "Google" },
  { value: "twitter", label: "Twitter/X" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "referral", label: "Referral" },
  { value: "other", label: "Other" },
];

export default function ContactPage() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactFormData) {
    setState("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) setState("success");
      else setState("error");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="pt-28 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-5">
          <div className="w-16 h-16 rounded-2xl bg-success/10 text-success flex items-center justify-center mx-auto">
            <CheckCircle className="h-8 w-8" aria-hidden="true" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight mt-6">Message Sent!</h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Thanks for reaching out. I&apos;ll review your message and respond within 48 hours.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/">
              <Button variant="outline" className="w-full sm:w-auto">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 group"
        >
          <ArrowLeft className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" /> Back to home
        </Link>

        <FadeIn>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance">
            Let&apos;s Build Something
          </h1>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Tell me about your project. I&apos;ll respond within 48 hours.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-12 lg:grid-cols-[2fr_1fr]">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name <span className="text-destructive">*</span>
                </label>
                <input
                  id="name"
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow placeholder:text-muted-foreground/50"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-xs text-destructive mt-1.5" role="alert">{errors.name.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow placeholder:text-muted-foreground/50"
                  placeholder="you@company.com"
                />
                {errors.email && <p className="text-xs text-destructive mt-1.5" role="alert">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium mb-2">Company</label>
              <input
                id="company"
                {...register("company")}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow placeholder:text-muted-foreground/50"
                placeholder="Company name (optional)"
              />
            </div>

            <div>
              <label htmlFor="projectType" className="block text-sm font-medium mb-2">
                Project Type <span className="text-destructive">*</span>
              </label>
              <select
                id="projectType"
                {...register("projectType")}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              >
                <option value="">Select a project type</option>
                {projectTypes.map((pt) => (
                  <option key={pt.value} value={pt.value}>{pt.label}</option>
                ))}
              </select>
              {errors.projectType && <p className="text-xs text-destructive mt-1.5" role="alert">{errors.projectType.message}</p>}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium mb-2">Budget Range</label>
                <select
                  id="budget"
                  {...register("budget")}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                >
                  <option value="">Select a range</option>
                  {budgets.map((b) => (
                    <option key={b.value} value={b.value}>{b.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="referral" className="block text-sm font-medium mb-2">How did you hear about me?</label>
                <select
                  id="referral"
                  {...register("referral")}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                >
                  <option value="">Select source</option>
                  {sources.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-y placeholder:text-muted-foreground/50"
                placeholder="Tell me about your project..."
              />
            </div>

            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            {state === "error" && (
              <div className="flex items-start gap-3 text-sm text-destructive bg-destructive/10 p-4 rounded-xl" role="alert">
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Something went wrong. Please try again or email me directly at daniel@danielkliewer.com</span>
              </div>
            )}

            <Button type="submit" size="lg" disabled={state === "submitting"} className="w-full sm:w-auto gap-2">
              {state === "submitting" ? (
                "Sending..."
              ) : (
                <>
                  Send Message <Send className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </form>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold">What happens next</h3>
              <ol className="mt-4 space-y-4">
                {[
                  "I'll respond within 48 hours",
                  "We'll schedule a 30-minute discovery call",
                  "If it's a fit, I'll send a proposal within 48 hours",
                  "We build — transparent progress, weekly demos",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-6 h-6 rounded-lg bg-primary-muted text-primary flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold">Quick Info</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Response time</dt>
                  <dd className="font-medium">&lt; 48 hours</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Typical budget</dt>
                  <dd className="font-medium">$5k–$25k</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Location</dt>
                  <dd className="font-medium">Austin, TX</dd>
                </div>
              </dl>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

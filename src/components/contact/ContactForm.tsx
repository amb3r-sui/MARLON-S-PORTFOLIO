"use client";
import { FormEvent, useState } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react";

type FormState = "idle" | "loading" | "success" | "error" | "unconfigured";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Record<string, string> = {};
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (message.length < 20) nextErrors.message = "Please share at least 20 characters.";
    if (message.length > 3000) nextErrors.message = "Please keep your message under 3,000 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    if (!endpoint) { setState("unconfigured"); return; }
    setState("loading");
    try {
      const response = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("Submission failed");
      setState("success");
      form.reset();
    } catch { setState("error"); }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <label>Name *<input name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />{errors.name && <span className="field-error">{errors.name}</span>}</label>
        <label>Email *<input name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />{errors.email && <span className="field-error">{errors.email}</span>}</label>
        <label>Company<input name="company" autoComplete="organization" /></label>
        <label>Project type<select name="projectType" defaultValue=""><option value="" disabled>Select a project type</option>{["Workflow Automation","AI Agent","CRM Automation","API Integration","Data Synchronization","Portfolio Collaboration","Job Opportunity","Other"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label>Budget range<select name="budget" defaultValue="Not sure yet">{["Not sure yet","Under $500","$500-$1,000","$1,000-$3,000","$3,000+","Job opportunity"].map((item) => <option key={item}>{item}</option>)}</select></label>
        <label className="full-field">Message *<textarea name="message" rows={7} maxLength={3000} aria-invalid={Boolean(errors.message)} placeholder="Tell me about the process, tools involved, and what a successful outcome looks like." />{errors.message && <span className="field-error">{errors.message}</span>}</label>
      </div>
      <button className="button button-primary" disabled={state === "loading"}>{state === "loading" ? "Sending..." : <>Send message <PaperPlaneTilt size={17} weight="bold" /></>}</button>
      <div aria-live="polite">{state === "success" && <p className="form-notice success">Thanks, your message was sent.</p>}{state === "error" && <p className="form-notice error">The message could not be sent. Please email me directly or try again.</p>}{state === "unconfigured" && <p className="form-notice info">The form endpoint is not configured yet. No message was sent. Add NEXT_PUBLIC_CONTACT_FORM_ENDPOINT or use the email link beside this form.</p>}</div>
    </form>
  );
}

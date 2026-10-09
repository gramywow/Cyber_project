"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, TriangleAlert } from "lucide-react";
import { contact } from "@/content/site";

type Status = "idle" | "sending" | "success" | "invalid" | "unavailable" | "error";
type FieldName = "name" | "email" | "company";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const found: Partial<Record<FieldName, string>> = {};
    if (!data.name?.trim()) found.name = contact.errors.name;
    if (!EMAIL.test(data.email?.trim() ?? "")) found.email = contact.errors.email;
    if (!data.company?.trim()) found.company = contact.errors.company;
    setErrors(found);

    const first = Object.keys(found)[0];
    if (first) {
      setStatus("invalid");
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        form.reset();
        setStatus("success");
      } else if (response.status === 503) {
        setStatus("unavailable");
      } else if (response.status === 422) {
        setStatus("invalid");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const labels = contact.labels;
  const feedback = status === "idle" || status === "sending" ? null : contact.feedback[status];

  function field(name: FieldName, label: string, type: string, autoComplete: string) {
    const error = errors[name];
    return (
      <div>
        <label htmlFor={`champ-${name}`} className="block text-[0.9375rem] font-semibold">
          {label}
        </label>
        <input
          id={`champ-${name}`}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `erreur-${name}` : undefined}
          className="field mt-1.5"
        />
        {error ? (
          <p id={`erreur-${name}`} className="mt-1.5 text-[0.9375rem] font-medium text-minium-deep">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {field("name", labels.name, "text", "name")}
      {field("email", labels.email, "email", "email")}
      {field("company", labels.company, "text", "organization")}
      <div>
        <label htmlFor="champ-siem" className="block text-[0.9375rem] font-semibold">
          {labels.siem}
        </label>
        <select id="champ-siem" name="siem" className="field mt-1.5 cursor-pointer" defaultValue={contact.siemOptions[0]}>
          {contact.siemOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="champ-message" className="flex items-baseline justify-between text-[0.9375rem] font-semibold">
          {labels.message}
          <span className="font-normal text-ink-mute">{labels.messageHint}</span>
        </label>
        <textarea id="champ-message" name="message" rows={4} className="field mt-1.5 resize-y" />
      </div>
      {/* Champ piège pour les robots : invisible, hors tabulation. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="champ-site">Site web</label>
        <input id="champ-site" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:col-span-2">
        <button type="submit" className="btn btn-primary" disabled={status === "sending"}>
          {status === "sending" ? labels.sending : labels.submit}
          <ArrowRight className="size-4" strokeWidth={2.25} aria-hidden="true" />
        </button>
        <div role="status" aria-live="polite" className="min-h-6 flex-1 basis-64">
          <AnimatePresence mode="wait" initial={false}>
            {feedback ? (
              <motion.p
                key={status}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className={`flex gap-2.5 font-medium ${status === "success" ? "text-ink" : "text-minium-deep"}`}
              >
                {status === "success" ? (
                  <Check className="mt-1 size-5 shrink-0" strokeWidth={2.5} aria-hidden="true" />
                ) : (
                  <TriangleAlert className="mt-1 size-5 shrink-0" strokeWidth={2.25} aria-hidden="true" />
                )}
                {feedback}
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}

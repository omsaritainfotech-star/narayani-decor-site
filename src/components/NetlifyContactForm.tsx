"use client";

import React from "react";

type Props = {
  redirect?: string;
};

export default function NetlifyContactForm({ redirect = "/thank-you" }: Props) {
  const [status, setStatus] = React.useState<"idle"|"submitting"|"ok"|"error">("idle");
  const formRef = React.useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    // Pre-fill hidden UTM fields from URL
    const url = new URL(window.location.href);
    const set = (name: string) => {
      const el = formRef.current?.querySelector(`input[name="${name}"]`) as HTMLInputElement | null;
      if (el) el.value = url.searchParams.get(name) || "";
    };
    ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"].forEach(set);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fd as any).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok");
      // Preserve UTM in redirect
      const qs = window.location.search;
      window.location.assign(redirect + qs);
    } catch (err) {
      console.error("Netlify form submit failed:", err);
      setStatus("error");
    }
  }

  return (
    <form ref={formRef} name="contact" onSubmit={onSubmit} className="max-w-xl space-y-3">
      <input type="hidden" name="form-name" value="contact" />
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input name="name" required className="mt-1 w-full rounded-md border px-3 py-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input name="email" type="email" className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input name="phone" type="tel" required className="mt-1 w-full rounded-md border px-3 py-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Message</label>
        <textarea name="message" rows={4} className="mt-1 w-full rounded-md border px-3 py-2"></textarea>
      </div>
      {/* Hidden UTM fields */}
      <input type="hidden" name="utm_source" />
      <input type="hidden" name="utm_medium" />
      <input type="hidden" name="utm_campaign" />
      <input type="hidden" name="utm_term" />
      <input type="hidden" name="utm_content" />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-md bg-[var(--brand-accent)] px-5 py-2.5 text-white font-semibold"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
      {status === "error" && <p className="text-sm text-red-600">Submission failed. Please try WhatsApp or call.</p>}
    </form>
  );
}

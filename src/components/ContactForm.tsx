
"use client";

import React from "react";

export default function ContactForm() {
  const [utm, setUtm] = React.useState<any>({});
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source","utm_medium","utm_campaign","utm_term","utm_content"];
    const collected:any = {};
    keys.forEach(k => { const v = params.get(k); if (v) collected[k] = v; });
    setUtm(collected);
  }, []);

  return (
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="/thank-you">
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden"><label>Don’t fill this out: <input name="bot-field" /></label></p>
      {Object.entries(utm).map(([k,v]) => <input key={k} type="hidden" name={k} value={String(v)} />)}
      <div className="grid gap-3">
        <input className="border rounded-md px-3 py-2" name="name" placeholder="Your Name" required />
        <input className="border rounded-md px-3 py-2" name="phone" placeholder="Phone" required />
        <input className="border rounded-md px-3 py-2" name="email" placeholder="Email (optional)" />
        <textarea className="border rounded-md px-3 py-2" name="message" placeholder="Tell us about your requirement" rows={4} />
        <button className="rounded-md px-4 py-2 bg-black text-white">Request Callback</button>
      </div>
    </form>
  );
}

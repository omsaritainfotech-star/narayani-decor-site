
"use client";

export default function StickyCTA({ phone = "9439652292", whatsapp = "9439652292" }) {
  function track(name: string, params: any = {}) {
    try { (window as any).gtag && (window as any).gtag('event', name, params); } catch {}
    try { (window as any).fbq && (window as any).fbq('trackCustom', name, params); } catch {}
  }
  const wa = `https://wa.me/91${whatsapp}?text=Hi%20Narayani%20Decor%2C%20I%27m%20interested%20in%20louvers%2Fwallpapers`;
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
      <a href={`tel:${phone}`} onClick={() => track("cta_call_click")} className="rounded-full px-4 py-3 bg-black text-white shadow-lg text-sm" aria-label="Call Now">Call Now</a>
      <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => track("cta_whatsapp_click")} className="rounded-full px-4 py-3 bg-green-600 text-white shadow-lg text-sm" aria-label="WhatsApp Now">WhatsApp</a>
    </div>
  );
}

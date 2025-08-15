
import { getPageBySlug, getSettings } from "@/lib/content";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";
import Link from "next/link";

function Hero({ title, subtitle, bg }: { title: string; subtitle: string; bg?: string; }) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0" style={{backgroundImage: `url(${bg||"/images/hero.jpg"})`, backgroundSize: "cover", backgroundPosition: "center"}} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      <div className="relative max-w-6xl mx-auto px-6 py-28 text-white">
        <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl">{subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="tel:9439652292" className="rounded-2xl px-5 py-3 bg-[var(--brand-accent)] text-white font-semibold">Call Now</a>
          <Link href="/contact" className="rounded-2xl px-5 py-3 bg-white text-black font-semibold">Get Free Measurement</Link>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          {[["10+ yrs","Experience"],["2,000+","Homes Styled"],["★ 4.9","Avg. Rating"],["Same-Day","Measurement"]].map(([a,b],i)=> (
            <div key={i} className="rounded-2xl bg-white/10 backdrop-blur border border-white/20 px-4 py-3">
              <div className="text-xl font-bold">{a}</div><div className="opacity-80">{b}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const page = await getPageBySlug("home");
  const settings = getSettings();
  return (
    <>
      <Seo title={page?.seo?.title || page?.title} description={page?.seo?.description} image={page?.seo?.og_image} />
      <Hero title="Narayani Decor & Furnishing" subtitle="Premium curtains, designer wallpapers, and fluted & charcoal louvers. Professional measurement & installation across Jharsuguda." bg={page?.hero_image} />

      <section id="services" className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-bold">Featured Services</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {[
            {title: "Fluted & Charcoal Louvers", desc: "Hide seepage, add depth, premium finishes.", href: "/services/fluted-and-charcoal-louvers"},
            {title: "Designer Wallpapers", desc: "Thousands of patterns, quick installation.", href: "/services/wallpapers-and-panels"},
            {title: "Curtains & Blinds", desc: "Custom fabrics, tracks, motorised options.", href: "/services/curtains-and-blinds"},
          ].map((s,i)=>(
            <Link href={s.href} key={i} className="rounded-2xl border hover:shadow-lg transition p-5 block">
              <div className="aspect-[4/3] rounded-xl border bg-gradient-to-br from-zinc-100 to-white mb-4" />
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm opacity-80 mt-1">{s.desc}</div>
              <div className="mt-3 text-sm font-medium text-[var(--brand-accent)]">Explore →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Why Jharsuguda trusts us</h2>
            <ul className="mt-4 space-y-2 text-sm">
              {["Expert installers","Curated materials","Transparent pricing","After-sales support"].map((x,i)=>(
                <li key={i} className="flex items-center gap-2">✅ {x}</li>
              ))}
            </ul>
            <Link href="/contact" className="inline-block mt-5 rounded-2xl px-5 py-3 bg-black text-white">Request Callback</Link>
          </div>
          <div className="aspect-[4/3] rounded-2xl border bg-gradient-to-br from-zinc-100 to-white" />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-14">
        <h2 className="text-2xl md:text-3xl font-bold">What customers say</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-6">
          {["Excellent selection & finish!","Fast and professional installation.","They made our hall look brand new."].map((t,i)=>(
            <div key={i} className="rounded-2xl border p-5">
              <div className="mb-2">★★★★★</div>
              <div className="text-sm">{t}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--brand-accent)] text-white">
        <div className="max-w-6xl mx-auto px-6 py-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Free Measurement Visit in Jharsuguda</h2>
          <p className="mt-2 opacity-90">Call now or request a callback — we’ll reach you within 24 hours.</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <a href={`tel:${settings?.phone}`} className="rounded-2xl px-6 py-3 bg-black text-white">Call {settings?.phone}</a>
            <Link href="/contact" className="rounded-2xl px-6 py-3 bg-white text-black">Request Callback</Link>
          </div>
        </div>
      </section>
    </>
  );
}


import { getPageBySlug } from "@/lib/content";
import Seo from "@/components/Seo";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage() {
  const page = await getPageBySlug("contact");
  return (
    <>
      <Seo title={page?.seo?.title || page?.title} description={page?.seo?.description} image={page?.seo?.og_image} faq={[{q:"Do you offer measurement visits?", a:"Yes, within Jharsuguda city we offer a free measurement visit."}]} />
      <section className="px-6 py-16 mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-bold">{page?.title}</h1>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div>
            <div className="mb-3">Showroom: Sarbahal, Jharsuguda, Odisha 768201</div>
            <div className="mb-3">Phone: 9439652292</div>
            <div className="aspect-[4/3] rounded-xl border bg-gradient-to-br from-zinc-100 to-white flex items-center justify-center text-xs">Map Placeholder</div>
          </div>
          <div><ContactForm /></div>
        </div>
      </section>
    </>
  );
}

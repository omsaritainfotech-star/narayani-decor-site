import { listSlugs, getByCollectionAndSlug } from "@/lib/content";
import Seo from "@/components/Seo";

export default async function FAQsPage() {
  const slugs = listSlugs("faqs");
  const faqs = await Promise.all(
    slugs.map(async (slug) => {
      const item = await getByCollectionAndSlug("faqs", slug);
      return { q: item?.title || "", a: item?.body || "" };
    })
  );

  return (
    <>
      <Seo title="FAQs" description="Common questions from Jharsuguda customers" faq={faqs.map(f => ({ q: f.q, a: f.a }))} breadcrumbs={[{name:"Home",item:"/"},{name:"FAQs",item:"/faqs"}]} />
      <section className="px-6 py-16 mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-5xl font-bold">FAQs</h1>
        <div className="mt-6 space-y-6">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-2xl border p-5">
              <div className="text-lg font-semibold">{f.q}</div>
              <div className="prose max-w-none mt-2" dangerouslySetInnerHTML={{ __html: f.a }} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

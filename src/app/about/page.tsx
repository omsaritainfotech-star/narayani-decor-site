import { getPageBySlug, type PageDoc } from "@/lib/content";
import Seo from "@/components/Seo";
import RichText from "@/components/RichText";

export default async function AboutPage() {
  const page = (await getPageBySlug("about")) as PageDoc | null;
  if (!page) {
    return <div className="px-6 py-10">About page content not found. Create it in CMS at <code>content/pages/about.md</code>.</div>;
  }
  return (
    <>
      <Seo
        title={page.seo?.title || page.title}
        description={page.seo?.description}
        image={page.seo?.og_image || page.hero_image}
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "About", item: "/about" }]}
      />
      <section className="px-6 py-16 mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-5xl font-bold">{page.title}</h1>
        <div className="mt-6">
          <RichText content={page.body || ""} />
        </div>
      </section>
    </>
  );
}

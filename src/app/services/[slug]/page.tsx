
import { getByCollectionAndSlug } from "@/lib/content";
import RichText from "@/components/RichText";
import Seo from "@/components/Seo";

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getByCollectionAndSlug("services", params.slug);
  if (!service) return <div className="px-6 py-10">Not found.</div>;
  return (
    <>
      <Seo title={service?.seo?.title || service?.title} description={service?.seo?.description} image={service?.seo?.og_image || service?.hero_image}
        breadcrumbs={[{name:'Home',item:'/'},{name:'Services',item:'/#services'},{name:service?.title,item:`/services/${service?.slug}`}]}
      />
      <section className="px-6 py-16 mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-bold">{service.title}</h1>
        <p className="mt-2 text-lg opacity-80">{service.excerpt}</p>
        <div className="mt-6"><RichText content={service.body || ""} /></div>
      </section>
    </>
  );
}

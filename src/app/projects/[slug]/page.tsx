
import { getByCollectionAndSlug } from "@/lib/content";
import RichText from "@/components/RichText";
import Seo from "@/components/Seo";
import BeforeAfter from "@/components/BeforeAfter";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getByCollectionAndSlug("projects", params.slug);
  if (!project) return <div className="px-6 py-10">Not found.</div>;
  return (
    <>
      <Seo title={project?.title} description={project?.excerpt} image={project?.after_image}
        breadcrumbs={[{name:'Home',item:'/'},{name:'Projects',item:'/projects'},{name:project?.title,item:`/projects/${project?.slug}`}]}
      />
      <section className="px-6 py-16 mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-bold">{project.title}</h1>
        <p className="mt-2 text-lg opacity-80">{project.excerpt}</p>
        <div className="mt-6">
          <BeforeAfter before={project.before_image} after={project.after_image} />
        </div>
        <div className="mt-6"><RichText content={project.body || ""} /></div>
      </section>
    </>
  );
}

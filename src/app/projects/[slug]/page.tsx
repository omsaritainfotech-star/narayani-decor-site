import { getByCollectionAndSlug } from "@/lib/content";
import RichText from "@/components/RichText";
import Seo from "@/components/Seo";
import BeforeAfter from "@/components/BeforeAfter";

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getByCollectionAndSlug("projects", params.slug);
  if (!project) return <div className="px-6 py-10">Not found.</div>;

  const projectTitle = project.title ?? "Project";
  const projectSlug = project.slug ?? params.slug;
  const beforeImg = project.before_image || "/images/hero.jpg";
  const afterImg = project.after_image || "/images/hero.jpg";

  return (
    <>
      <Seo
        title={projectTitle}
        description={project.excerpt}
        image={afterImg}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Projects", item: "/projects" },
          { name: projectTitle, item: `/projects/${projectSlug}` },
        ]}
      />
      <section className="px-6 py-16 mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-bold">{projectTitle}</h1>
        <p className="mt-2 text-lg opacity-80">{project.excerpt}</p>
        <div className="mt-6">
          <BeforeAfter before={beforeImg} after={afterImg} />
        </div>
        <div className="mt-6">
          <RichText content={project.body || ""} />
        </div>
      </section>
    </>
  );
}

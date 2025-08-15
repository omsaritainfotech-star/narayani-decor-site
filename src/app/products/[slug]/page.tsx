import { getByCollectionAndSlug } from "@/lib/content";
import RichText from "@/components/RichText";
import Seo from "@/components/Seo";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getByCollectionAndSlug("products", params.slug);
  if (!product) return <div className="px-6 py-10">Not found.</div>;

  const productTitle = product.title ?? "Product";
  const productSlug = product.slug ?? params.slug;

  return (
    <>
      <Seo
        title={product.seo?.title || productTitle}
        description={product.seo?.description}
        image={product.seo?.og_image || product.images?.[0]}
        type="product"
        productPrice={product.price}
        breadcrumbs={[
          { name: "Home", item: "/" },
          { name: "Products", item: "/#products" },
          { name: productTitle, item: `/products/${productSlug}` },
        ]}
      />
      <section className="px-6 py-16 mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-bold">{productTitle}</h1>
        <p className="mt-2 text-lg opacity-80">{product.excerpt}</p>
        <div className="mt-6">
          <RichText content={product.body || ""} />
        </div>
      </section>
    </>
  );
}

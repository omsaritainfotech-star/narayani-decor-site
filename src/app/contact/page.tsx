import Seo from "@/components/Seo";
import NetlifyContactForm from "@/components/NetlifyContactForm";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Narayani Decor & Furnishing"
        description="Get a free consultation for wallpapers, louvers, curtains, and home decor in Jharsuguda."
        breadcrumbs={[{ name: "Home", item: "/" }, { name: "Contact", item: "/contact" }]}
      />
      <section className="px-6 py-16 mx-auto max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-bold">Contact us</h1>
        <p className="mt-2 opacity-80">Call/WhatsApp or send a quick message—our expert will get back to you.</p>
        <div className="mt-8">
          <NetlifyContactForm />
        </div>
      </section>
    </>
  );
}

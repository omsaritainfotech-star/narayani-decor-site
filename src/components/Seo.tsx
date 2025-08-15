
"use client";

import { usePathname } from "next/navigation";

type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article" | "product";
  productPrice?: number;
  faq?: { q: string; a: string }[];
  breadcrumbs?: { name: string; item: string }[];
};

export default function Seo({ title, description, image, type = "website", productPrice, faq, breadcrumbs }: SeoProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const ogImage = image || `${siteUrl}/images/og-default.jpg`;
  const pathname = usePathname();
  const url = `${siteUrl}${pathname}`;

  const jsonLd: any[] = [];

  jsonLd.push({
    "@context": "https://schema.org",
    "@type": type === "product" ? "Product" : "LocalBusiness",
    "name": title || "Narayani Decor & Furnishing",
    "image": ogImage,
    "telephone": "+91-9439652292",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sarbahal",
      "addressLocality": "Jharsuguda",
      "addressRegion": "Odisha",
      "postalCode": "768201",
      "addressCountry": "IN"
    },
    "url": siteUrl
  });

  if (type === "product" && productPrice) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": title || "",
      "image": ogImage,
      "offers": { "@type": "Offer", "priceCurrency": "INR", "price": productPrice }
    });
  }

  if (faq?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faq.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    });
  }

  if (breadcrumbs?.length) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((b, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": b.name,
        "item": b.item
      }))
    });
  }

  return (
    <>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || ""} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={url} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

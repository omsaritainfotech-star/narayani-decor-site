import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  function list(dir: string) {
    const full = path.join(process.cwd(), "content", dir);
    if (!fs.existsSync(full)) return [];
    return fs.readdirSync(full).filter(f => f.endsWith(".md")).map(f => f.replace(".md", ""));
  }

  const pages = list("pages").map(slug => `${base}/${slug === "home" ? "" : slug}`);
  const services = list("services").map(slug => `${base}/services/${slug}`);
  const products = list("products").map(slug => `${base}/products/${slug}`);
  const projects = list("projects").map(slug => `${base}/projects/${slug}`);
  const faqs = list("faqs").map(slug => `${base}/faqs/${slug}`);

  const urls = [...pages, ...services, ...products, ...projects, ...faqs];
  return urls.map((u) => ({ url: u }));
}

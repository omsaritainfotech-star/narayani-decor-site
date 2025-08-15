import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type FrontSeo = {
  title?: string;
  description?: string;
  og_image?: string;
  keywords?: string[];
};

export type PageFrontmatter = {
  title?: string;
  slug?: string;
  hero_image?: string;
  seo?: FrontSeo;
  [key: string]: any;
};

export type CollectionItemFrontmatter = PageFrontmatter & {
  excerpt?: string;
  category?: string;
  price?: number;
  images?: string[];
  location?: string;
  before_image?: string;
  after_image?: string;
};

export type PageDoc = PageFrontmatter & { body: string };
export type CollectionDoc = CollectionItemFrontmatter & { body: string };

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getSettings() {
  const file = path.join(CONTENT_DIR, "settings", "site.json");
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export async function getPageBySlug(slug: string): Promise<PageDoc | null> {
  const file = path.join(CONTENT_DIR, "pages", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as PageFrontmatter), body: content };
}

export async function getByCollectionAndSlug(collection: string, slug: string): Promise<CollectionDoc | null> {
  const file = path.join(CONTENT_DIR, collection, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return { ...(data as CollectionItemFrontmatter), body: content };
}

export function listSlugs(collection: string): string[] {
  const dir = path.join(CONTENT_DIR, collection);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter(f => f.endsWith(".md")).map(f => f.replace(".md",""));
}

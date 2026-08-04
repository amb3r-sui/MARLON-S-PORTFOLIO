import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost.replace(/^https?:\/\//, "")}` : "http://localhost:3000");
const siteUrl = configuredUrl.replace(/\/$/, "");
const outputDirectory = join(process.cwd(), "dist", "client");
const routes = [
  "",
  "/about",
  "/contact",
  "/projects",
  "/services",
  "/projects/rana-ai-receptionist-system",
  "/projects/inventory-rfq-automation",
  "/projects/b2b-ai-lead-triage",
  "/projects/crm-data-operations",
];

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...routes.map((route) => `  <url><loc>${siteUrl}${route}</loc><changefreq>monthly</changefreq></url>`),
  "</urlset>",
  "",
].join("\n");

const robots = [
  "User-agent: *",
  "Allow: /",
  `Sitemap: ${siteUrl}/sitemap.xml`,
  `Host: ${siteUrl}`,
  "",
].join("\n");

await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeFile(join(outputDirectory, "sitemap.xml"), sitemap, "utf8"),
  writeFile(join(outputDirectory, "robots.txt"), robots, "utf8"),
]);

console.log(`Static SEO files written for ${siteUrl}`);

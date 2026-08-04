import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = profile.siteUrl.replace(/\/$/, "");
  const routes = [
    { path: "", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/services", priority: 0.8 },
    { path: "/contact", priority: 0.8 },
  ] as const;

  return [
    ...routes.map(({ path, priority }) => ({ url: `${baseUrl}${path}`, changeFrequency: "monthly" as const, priority })),
    ...projects.map(({ slug }) => ({ url: `${baseUrl}/projects/${slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}

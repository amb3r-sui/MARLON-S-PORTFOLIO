import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
export default function sitemap(): MetadataRoute.Sitemap { const routes = ["","/projects","/about","/services","/contact"]; return [...routes.map((route) => ({ url: `${profile.siteUrl}${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route === "" ? 1 : .8 })), ...projects.map((p) => ({ url: `${profile.siteUrl}/projects/${p.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: .7 }))]; }

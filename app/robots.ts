import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = profile.siteUrl.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

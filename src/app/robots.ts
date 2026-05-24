import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/lab/chat", "/lab/architecture"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

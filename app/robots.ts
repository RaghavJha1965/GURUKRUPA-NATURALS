import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/checkout", "/cart", "/api/", "/_next/"],
      },
    ],
    sitemap: "https://gurukrupanaturals.com/sitemap.xml",
    host: "https://gurukrupanaturals.com",
  };
}

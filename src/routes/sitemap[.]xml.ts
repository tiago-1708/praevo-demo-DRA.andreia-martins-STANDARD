import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { siteConfig, baseUrl as siteBaseUrl } from "@/lib/site-config";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // Sempre o URL canónico (domínio final), igual aos <link rel="canonical">.
        const baseUrl = siteBaseUrl();

        const entries = [
          { path: "/", changefreq: "monthly", priority: "1.0" },
          { path: "/sobre", changefreq: "yearly", priority: "0.7" },
          { path: "/areas-de-atuacao", changefreq: "yearly", priority: "0.8" },
          { path: "/contactos", changefreq: "yearly", priority: "0.7" },
          ...siteConfig.areas.map((a) => ({
            path: `/areas-de-atuacao/${a.slug}`,
            changefreq: "yearly" as const,
            priority: "0.7",
          })),
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${baseUrl}${e.path}</loc>`,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            `  </url>`,
          ].join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

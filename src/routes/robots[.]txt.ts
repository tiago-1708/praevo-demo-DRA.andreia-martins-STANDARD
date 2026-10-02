import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { absoluteUrl, isIndexable } from "@/lib/site-config";

/**
 * robots.txt dinâmico: bloqueia tudo enquanto o site não tiver domínio final
 * (URL provisório *.workers.dev); depois, permite tudo e indica o sitemap.
 */
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const body = isIndexable()
          ? ["User-agent: *", "Allow: /", "", `Sitemap: ${absoluteUrl("/sitemap.xml")}`, ""].join(
              "\n",
            )
          : [
              "# Site ainda sem domínio final — não indexar.",
              "User-agent: *",
              "Disallow: /",
              "",
            ].join("\n");
        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { siteConfig, siteName, advogadaEm, robotsContent } from "../lib/site-config";
import { jsonLd, siteGraph } from "../lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="font-serif text-7xl text-[color:var(--gold-ink)]">404</p>
        <h1 className="mt-4 font-serif text-2xl text-foreground">Página não encontrada</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que procura não existe ou foi movida.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">
            Voltar ao início <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
          <Link to="/contactos" className="btn-outline text-foreground">
            Contactos
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-foreground">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo correu mal. Tente atualizar a página ou volte ao início.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="btn-primary"
          >
            Tentar novamente
          </button>
          <a href="/" className="btn-outline text-foreground">
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // Valores por omissão; cada rota define os seus via pageHead() (seo.ts).
      { title: `${advogadaEm()} | ${siteConfig.advogado.displayName}` },
      { name: "description", content: siteConfig.advogado.bio },
      // Só indexável com domínio final (ver isIndexable em site-config.ts).
      { name: "robots", content: robotsContent() },
      { name: "author", content: siteConfig.advogado.displayName },
      { name: "theme-color", content: siteConfig.themeColor },
      { property: "og:site_name", content: `${siteName()}, Advogada` },
      { property: "og:locale", content: "pt_PT" },
      { name: "format-detection", content: "telephone=no" },
    ],
    // Escritório + advogada + site em JSON-LD, em todas as páginas.
    scripts: [jsonLd(siteGraph())],
    links: [
      { rel: "stylesheet", href: appCss },
      // Favicon: monograma A/M (public/favicon.svg) + PNG para iOS/Google.
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-48.png", type: "image/png", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Jost:wght@300..600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const b = siteConfig.brand.colors;
  // Injecta a paleta do cliente como CSS custom properties. Sobrepõe os
  // defaults do styles.css (que ficam como fallback). Alterar a paleta =
  // editar siteConfig.brand.colors em site-config.ts.
  const brandCss = `:root{--navy-deep:${b.dark};--navy:${b.darkAlt};--gold:${b.accent};--gold-soft:${b.accentSoft};--gold-ink:${b.accentInk};--ivory:${b.background};--ink:${b.ink};--background:${b.background};--foreground:${b.ink};--primary:${b.dark};--primary-foreground:${b.background};--accent:${b.accent};--accent-foreground:${b.ink};--ring:${b.accentInk};--card:#ffffff;--card-foreground:${b.ink};--popover:#ffffff;--popover-foreground:${b.ink};--sidebar:${b.background};--sidebar-foreground:${b.ink};--sidebar-primary:${b.dark};--sidebar-primary-foreground:${b.background};--sidebar-accent:${b.accent};--sidebar-accent-foreground:${b.ink};--sidebar-ring:${b.accentInk};}`;
  return (
    <html lang="pt-PT">
      <head>
        <HeadContent />
        <style dangerouslySetInnerHTML={{ __html: brandCss }} />
        {/* Sem JS o useReveal não corre: o conteúdo não pode ficar invisível. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: "<style>.reveal{opacity:1!important;transform:none!important}</style>",
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

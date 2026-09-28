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
import { siteConfig, siteName, baseUrl, isPlaceholder, advogadaEm } from "../lib/site-config";

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

const structuredData = () => {
  const a = siteConfig.advogado;
  return {
    "@context": "https://schema.org",
    "@type": ["Attorney", "LegalService"],
    "@id": `${baseUrl()}/#escritorio`,
    url: baseUrl(),
    name: siteName(),
    description: a.bio.replace(/<[^>]+>/g, "").slice(0, 300),
    address: {
      "@type": "PostalAddress",
      // Placeholders ("[...]") ficam de fora dos dados estruturados.
      ...(isPlaceholder(a.street) ? {} : { streetAddress: a.street }),
      ...(isPlaceholder(a.postalCode) ? {} : { postalCode: a.postalCode }),
      ...(isPlaceholder(a.locality) ? {} : { addressLocality: a.locality }),
      ...(isPlaceholder(a.district) ? {} : { addressRegion: a.district }),
      addressCountry: "PT",
    },
    ...(isPlaceholder(a.phoneE164) ? {} : { telephone: a.phoneE164 }),
    ...(isPlaceholder(a.email) ? {} : { email: a.email }),
    areaServed: [a.locality, a.district, "Portugal"].filter((x) => !isPlaceholder(x)),
    priceRange: "€€",
    knowsAbout: siteConfig.areas.map((x) => x.title),
  };
};

const dynamicFaviconHref = () => {
  // Monograma "AM" (mesma geometria de src/components/site/Logo.tsx e de
  // public/favicon.svg): branco-gelo sobre azul-noite, travessa em azul claro.
  const c = siteConfig.brand.colors;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${c.dark}"/><clipPath id="c"><rect x="0" y="0" width="64" height="47"/></clipPath><path d="M6.4 51 L20 17 L32 47 L44 17 L57.6 51" fill="none" stroke="${c.background}" stroke-width="4.6" stroke-linejoin="miter" stroke-miterlimit="10" clip-path="url(#c)"/><line x1="12.4" x2="27.6" y1="36" y2="36" stroke="${c.accent}" stroke-width="2.6"/></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${siteConfig.advogado.displayName} — ${advogadaEm()}` },
      {
        name: "description",
        content: `${siteConfig.advogado.displayName}, ${advogadaEm().toLowerCase()}. ${siteConfig.perfil.tagline}: família, trabalho, arrendamento, contratos e processo penal.`,
      },
      // Site demo: nunca indexar (proposta com o nome real da advogada).
      ...(siteConfig.demo ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { name: "author", content: siteName() },
      { name: "theme-color", content: siteConfig.themeColor },
      { property: "og:site_name", content: siteName() },
      { property: "og:title", content: `${siteConfig.advogado.displayName} — ${advogadaEm()}` },
      {
        property: "og:description",
        content: `${siteConfig.perfil.tagline}. ${siteConfig.perfil.motto}`,
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_PT" },
      { name: "twitter:card", content: "summary" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData()),
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // Favicon: monograma "AM" gerado com as cores de brand.colors (há uma
      // cópia estática em public/favicon.svg).
      { rel: "icon", href: dynamicFaviconHref(), type: "image/svg+xml" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..600&family=Geist:wght@300..600&display=swap",
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
  const brandCss = `:root{--navy-deep:${b.dark};--navy:${b.darkAlt};--gold:${b.accent};--gold-soft:${b.accentSoft};--gold-ink:${b.accentInk};--ivory:${b.background};--background:${b.background};--primary:${b.dark};--primary-foreground:${b.background};--accent:${b.accent};--accent-foreground:${b.dark};--ring:${b.accent};--foreground:${b.dark};--card:#ffffff;--card-foreground:${b.dark};--popover:#ffffff;--popover-foreground:${b.dark};--sidebar:${b.background};--sidebar-foreground:${b.dark};--sidebar-primary:${b.dark};--sidebar-primary-foreground:${b.background};--sidebar-accent:${b.accent};--sidebar-accent-foreground:${b.dark};--sidebar-ring:${b.accent};}`;
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

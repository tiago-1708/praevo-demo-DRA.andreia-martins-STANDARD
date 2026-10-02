/**
 * SEO partilhado: metas por página (title, description, Open Graph,
 * Twitter, canónico) e dados estruturados JSON-LD (schema.org).
 *
 * Tudo deriva de site-config.ts — nada a editar aqui por cliente.
 */
import {
  absoluteUrl,
  baseUrl,
  fullAddress,
  siteConfig,
  siteName,
  type Faq,
  type PracticeArea,
} from "./site-config";

export const OG_IMAGE = "/og-image.png";

/** Metas + canónico de uma página. Usar no `head()` de cada rota. */
export function pageHead({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
}) {
  const url = absoluteUrl(path);
  const image = absoluteUrl(OG_IMAGE);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:image", content: image },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${siteConfig.advogado.displayName}, Advogada` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}

/** <script type="application/ld+json"> para o `head().scripts`. */
export const jsonLd = (data: unknown) => ({
  type: "application/ld+json",
  children: JSON.stringify(data),
});

const ids = {
  business: () => `${baseUrl()}/#escritorio`,
  person: () => `${baseUrl()}/#andreia-martins`,
  website: () => `${baseUrl()}/#website`,
};

/** Grafo principal: escritório (LegalService + Attorney), advogada e site. */
export function siteGraph() {
  const a = siteConfig.advogado;
  const sameAs = a.instagram ? [a.instagram] : [];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LegalService", "Attorney"],
        "@id": ids.business(),
        name: `${siteName()} — Advogada`,
        url: baseUrl(),
        image: absoluteUrl(OG_IMAGE),
        logo: absoluteUrl(OG_IMAGE),
        description: a.bio,
        telephone: a.phoneE164,
        email: a.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: a.street,
          postalCode: a.postalCode,
          addressLocality: a.locality,
          addressRegion: a.district,
          addressCountry: "PT",
        },
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: a.openingHours.days,
            opens: a.openingHours.opens,
            closes: a.openingHours.closes,
          },
        ],
        areaServed: [
          { "@type": "City", name: a.locality },
          { "@type": "AdministrativeArea", name: `Distrito do ${a.district}` },
          { "@type": "Country", name: "Portugal" },
        ],
        knowsAbout: siteConfig.areas.map((x) => x.title),
        knowsLanguage: "pt-PT",
        founder: { "@id": ids.person() },
        employee: { "@id": ids.person() },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Áreas de prática",
          itemListElement: siteConfig.areas.map((x) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: x.title,
              url: absoluteUrl(`/areas-de-atuacao/${x.slug}`),
            },
          })),
        },
        sameAs,
      },
      {
        "@type": "Person",
        "@id": ids.person(),
        name: a.displayName,
        alternateName: a.legalName,
        jobTitle: "Advogada",
        url: absoluteUrl("/sobre"),
        image: absoluteUrl(OG_IMAGE),
        worksFor: { "@id": ids.business() },
        workLocation: {
          "@type": "Place",
          address: fullAddress(),
        },
        memberOf: {
          "@type": "Organization",
          name: "Ordem dos Advogados",
          url: "https://portal.oa.pt",
        },
        identifier: {
          "@type": "PropertyValue",
          propertyID: "Cédula profissional (Ordem dos Advogados)",
          value: a.cedula,
        },
        knowsAbout: siteConfig.areas.map((x) => x.title),
        sameAs,
      },
      {
        "@type": "WebSite",
        "@id": ids.website(),
        url: baseUrl(),
        name: `${siteName()} — Advogada`,
        inLanguage: "pt-PT",
        publisher: { "@id": ids.business() },
      },
    ],
  };
}

/** Serviço de uma área de prática (página da área). */
export function serviceLd(area: PracticeArea) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: area.title,
    serviceType: area.title,
    description: area.seoDescription,
    url: absoluteUrl(`/areas-de-atuacao/${area.slug}`),
    provider: { "@id": ids.business() },
    areaServed: [
      { "@type": "City", name: siteConfig.advogado.locality },
      { "@type": "AdministrativeArea", name: `Distrito do ${siteConfig.advogado.district}` },
    ],
  };
}

/** Texto de uma FAQ numa só resposta (introdução + passos + nota). */
const faqAnswer = (f: Faq) =>
  [f.intro, ...f.steps.map((s, i) => `${i + 1}. ${s}`), f.note].join(" ");

export function faqPageLd(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: faqAnswer(f) },
    })),
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

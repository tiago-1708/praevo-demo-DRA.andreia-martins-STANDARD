import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Eyebrow, NumberBadge, PageHero } from "@/components/site/Brand";
import { siteConfig, advogadaEm, advogadaEmMinuscula } from "@/lib/site-config";
import { breadcrumbLd, jsonLd, pageHead } from "@/lib/seo";
import { handleSpot } from "@/lib/spotlight";

export const Route = createFileRoute("/areas-de-atuacao/")({
  head: () => ({
    ...pageHead({
      title: `Áreas de Prática | ${advogadaEm()} — ${siteConfig.advogado.displayName}`,
      description: `Áreas de prática de ${siteConfig.advogado.displayName}, ${advogadaEmMinuscula()}: família e menores, heranças, imigração, insolvências, arrendamento, condomínios e contratos.`,
      path: "/areas-de-atuacao",
    }),
    scripts: [
      jsonLd(
        breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Áreas de prática", path: "/areas-de-atuacao" },
        ]),
      ),
    ],
  }),
  component: AreasIndex,
});

function AreasIndex() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Áreas de prática"
        title={`Áreas de prática ${siteConfig.advogado.localityIn}`}
      >
        Presto serviços a particulares, famílias, cidadãos estrangeiros, empresas e condomínios, no
        escritório {siteConfig.advogado.localityIn} — da família às heranças, da imigração à
        insolvência.
      </PageHero>

      <section className="bg-background py-20 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <ul className="border-t border-border">
            {siteConfig.areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <Reveal as="li" key={area.slug} delay={60 + i * 60}>
                  <Link
                    to="/areas-de-atuacao/$slug"
                    params={{ slug: area.slug }}
                    onMouseMove={handleSpot}
                    className="group card-lift grid gap-4 border-b border-border px-2 py-9 hover:!translate-y-0 hover:bg-card sm:px-6 md:grid-cols-[3rem_minmax(0,1fr)_minmax(0,1.1fr)_2rem] md:items-center md:gap-8"
                  >
                    <NumberBadge>{String(i + 1).padStart(2, "0")}</NumberBadge>
                    <div className="flex items-center gap-4">
                      <Icon className="h-6 w-6 shrink-0 text-[color:var(--gold-ink)]" aria-hidden />
                      <h2 className="font-serif text-2xl leading-snug text-[color:var(--ink)] sm:text-3xl">
                        {area.title}
                      </h2>
                    </div>
                    <div>
                      <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {area.short}
                      </p>
                      <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-[color:var(--gold-ink)]">
                        {area.audiences.join(" · ")}
                      </p>
                    </div>
                    <ArrowRight
                      className="hidden h-5 w-5 text-[color:var(--ink)] transition-transform group-hover:translate-x-1 md:block"
                      aria-hidden
                    />
                  </Link>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="mt-16 grid gap-8 rounded-md bg-[color:var(--muted)] p-8 sm:p-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <Eyebrow>Como trabalho</Eyebrow>
              <p className="font-serif text-2xl leading-snug text-[color:var(--ink)] sm:text-3xl">
                {siteConfig.perfil.motto}
              </p>
            </div>
            <Link to="/contactos" className="btn-primary btn-lg">
              Marcar reunião <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

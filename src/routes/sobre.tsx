import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Check, Clock, MapPin } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { ArchLogo, Eyebrow, PageHero, Pending } from "@/components/site/Brand";
import { siteConfig, absoluteUrl, advogadaEm, isPlaceholder } from "@/lib/site-config";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: `Sobre — ${siteConfig.advogado.displayName}, ${advogadaEm()}` },
      {
        name: "description",
        content: `${siteConfig.advogado.displayName}, ${advogadaEm().toLowerCase()}, inscrita na Ordem dos Advogados. ${siteConfig.perfil.tagline}.`,
      },
      { property: "og:title", content: `Sobre — ${siteConfig.advogado.displayName}` },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/sobre") }],
  }),
  component: Sobre,
});

function Sobre() {
  const a = siteConfig.advogado;
  const p = siteConfig.perfil;

  return (
    <SiteLayout>
      <PageHero eyebrow="Sobre" title={a.displayName}>
        Advogada · {p.tagline}
      </PageHero>

      {/* Perfil */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal variant="scale">
            <ArchLogo className="mx-auto max-w-sm" />
          </Reveal>

          <Reveal delay={120}>
            <Eyebrow>Quem é a {a.displayName}?</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight text-[color:var(--ink)] sm:text-4xl">
              Advocacia de proximidade, com tempo para cada pessoa.
            </h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>{a.bio}</p>
              <p>
                <Pending>
                  [Percurso académico e profissional de {a.displayName} — texto a confirmar com a
                  cliente.]
                </Pending>
              </p>
            </div>

            <ul className="mt-10 space-y-4 border-t border-border pt-8 text-sm text-[color:var(--ink)] sm:text-base">
              <li className="flex items-start gap-3">
                <BadgeCheck
                  className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold-ink)]"
                  aria-hidden
                />
                Inscrita na Ordem dos Advogados — Cédula Profissional n.º {a.cedula}
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold-ink)]"
                  aria-hidden
                />
                Atendimento presencial ·{" "}
                {isPlaceholder(a.street) ? a.street : `${a.street}, ${a.postalCode} ${a.locality}`}
              </li>
              <li className="flex items-start gap-3">
                <Clock
                  className="mt-0.5 h-5 w-5 shrink-0 text-[color:var(--gold-ink)]"
                  aria-hidden
                />
                {a.hours}
              </li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Tipos de atos */}
      <section className="bg-[color:var(--muted)] py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <Eyebrow>Tipos de atos que os advogados fazem</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight text-[color:var(--ink)] sm:text-4xl">
              Muito para além do tribunal.
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Muitas vezes pensa-se num advogado apenas quando há um processo em tribunal. Mas a lei
              reserva aos advogados um conjunto muito mais amplo de atos, e muitos deles acontecem
              antes de qualquer litígio: uma consulta, um contrato revisto a tempo, uma carta bem
              escrita.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="divide-y divide-border border-y border-border">
              {p.acts.map((act) => (
                <li key={act} className="flex items-start gap-4 py-4 text-[color:var(--ink)]">
                  <Check
                    className="mt-1 h-4 w-4 shrink-0 text-[color:var(--gold-ink)]"
                    aria-hidden
                  />
                  {act}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Missão & valores */}
      <section className="on-dark relative overflow-hidden bg-[color:var(--navy-deep)] py-20 text-[color:var(--ivory)] lg:py-28">
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow tone="dark">Missão & valores</Eyebrow>
            <h2 className="max-w-3xl font-serif text-3xl leading-tight sm:text-4xl">“{p.motto}”</h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--ivory)]/80">
              <Pending>[Texto da missão — a confirmar com a cliente.]</Pending>
            </p>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {p.values.map((v, i) => (
              <Reveal key={v.title} delay={100 + i * 120}>
                <div className="border-t border-[color:var(--gold)]/40 pt-6">
                  <h3 className="font-serif text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--ivory)]/80">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-20 lg:py-24">
        <Reveal variant="scale" className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl text-[color:var(--ink)] sm:text-4xl">
            Conversemos sobre o seu assunto
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground">
            Atendimento presencial no escritório. Telemóvel {a.phoneDisplay} · {a.email}
          </p>
          <Link to="/contactos" className="btn-primary btn-lg mt-9">
            Marcar reunião <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </Reveal>
      </section>
    </SiteLayout>
  );
}

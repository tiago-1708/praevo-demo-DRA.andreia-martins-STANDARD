import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GuillochePattern, Eyebrow } from "@/components/site/Brand";
import { Logo } from "@/components/site/Logo";
import { FaqItem } from "@/components/site/FaqItem";
import {
  siteConfig,
  absoluteUrl,
  advogadaEm,
  telHref,
  mailHref,
  isPlaceholder,
} from "@/lib/site-config";
import { handleSpot } from "@/lib/spotlight";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteConfig.advogado.displayName} — ${advogadaEm()}` },
      {
        name: "description",
        content: `${siteConfig.advogado.displayName}, ${advogadaEm().toLowerCase()}. Serviços jurídicos a particulares, famílias, trabalhadores e pequenas empresas.`,
      },
      { property: "og:title", content: `${siteConfig.advogado.displayName} — ${advogadaEm()}` },
      { property: "og:url", content: absoluteUrl("/") },
    ],
    links: [{ rel: "canonical", href: absoluteUrl("/") }],
  }),
  component: HomePage,
});

const ROMAN = ["I", "II", "III", "IV"];

function HomePage() {
  const a = siteConfig.advogado;
  const p = siteConfig.perfil;

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative -mt-20 flex min-h-[92svh] items-center overflow-hidden bg-background text-[color:var(--ink)]">
        <GuillochePattern tone="light" opacity={0.12} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 px-6 pt-32 pb-20 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:pt-40">
          <div>
            <div className="animate-fade-rise">
              <Eyebrow>
                {a.displayName} · {p.tagline}
              </Eyebrow>
            </div>
            <h1 className="animate-fade-rise delay-1 max-w-3xl font-serif text-[2.6rem] leading-[1.02] font-medium sm:text-6xl lg:text-7xl">
              Acompanhamento jurídico próximo,{" "}
              <em className="text-[color:var(--gold-ink)]">explicado com clareza.</em>
            </h1>
            <p className="animate-fade-rise delay-2 mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Prestamos serviços jurídicos a particulares, a famílias, a trabalhadores e a pequenas
              empresas — em questões de família, trabalho, arrendamento, contratos e processo penal
              — com tempo para ouvir e clareza para explicar cada passo.
            </p>

            <div className="animate-fade-rise delay-3 mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
              <Link to="/contactos" className="btn-primary btn-lg">
                Marcar reunião
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <a href={telHref(a.phoneE164)} className="btn-outline btn-lg text-[color:var(--ink)]">
                <Phone className="h-4 w-4" aria-hidden />
                {a.phoneDisplay}
              </a>
            </div>

            <div className="animate-fade-rise delay-4 mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-8 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-[color:var(--gold-ink)]" aria-hidden />
                Inscrita na Ordem dos Advogados · Cédula n.º {a.cedula}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[color:var(--gold-ink)]" aria-hidden />
                Atendimento presencial · {a.locality}
              </span>
            </div>
          </div>

          {/* Logótipo em carmim, com moldura dupla */}
          <div className="animate-fade-rise delay-3 hidden justify-center lg:flex">
            <div className="on-dark relative flex aspect-[4/5] w-full max-w-xs flex-col items-center justify-center overflow-hidden rounded-md bg-[color:var(--navy-deep)] p-10 text-[color:var(--ivory)] shadow-2xl shadow-[color:var(--navy)]/25">
              <GuillochePattern opacity={0.22} />
              <span
                className="absolute inset-2 rounded-sm border border-[color:var(--gold)]/30"
                aria-hidden
              />
              <Logo variant="lockup" layout="stacked" size="lg" className="relative" />
            </div>
          </div>
        </div>
      </section>

      {/* O ESCRITÓRIO */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <Eyebrow>O escritório</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight text-[color:var(--ink)] sm:text-[2.6rem]">
              Cada assunto começa por uma conversa.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">{a.bio}</p>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Da consulta jurídica ao contrato, da negociação ao tribunal: acompanhamos cada assunto
              do princípio ao fim, com informação clara sobre as opções, os prazos e os custos.
            </p>
            <Link
              to="/sobre"
              className="link-underline mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--ink)] hover:text-[color:var(--gold-ink)]"
            >
              Conhecer a Andreia Martins <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* A QUEM PRESTAMOS SERVIÇOS */}
      <section className="border-t border-border bg-background pb-20 lg:pb-28">
        <div className="mx-auto max-w-6xl px-6 pt-20 lg:pt-24">
          <Reveal>
            <Eyebrow>A quem prestamos serviços</Eyebrow>
            <h2 className="max-w-2xl font-serif text-3xl leading-tight text-[color:var(--ink)] sm:text-4xl">
              Perto de quem precisa de uma resposta clara.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-3">
            {p.audiences.map((aud, i) => {
              const Icon = aud.icon;
              return (
                <Reveal key={aud.title} delay={100 + i * 100} className="bg-background">
                  <div onMouseMove={handleSpot} className="card-lift h-full p-8 lg:p-10">
                    <Icon className="h-6 w-6 text-[color:var(--gold-ink)]" aria-hidden />
                    <h3 className="mt-6 font-serif text-2xl text-[color:var(--ink)]">
                      {aud.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{aud.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ÁREAS */}
      <section className="bg-[color:var(--muted)] py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Áreas de prática</Eyebrow>
              <h2 className="font-serif text-3xl leading-tight text-[color:var(--ink)] sm:text-4xl">
                Matérias que acompanhamos
              </h2>
            </div>
            <Link
              to="/areas-de-atuacao"
              className="link-underline inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[color:var(--ink)] hover:text-[color:var(--gold-ink)]"
            >
              Ver todas <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {siteConfig.areas.map((area, i) => {
              const Icon = area.icon;
              return (
                <Reveal key={area.slug} delay={80 + i * 80}>
                  <Link
                    to="/areas-de-atuacao/$slug"
                    params={{ slug: area.slug }}
                    onMouseMove={handleSpot}
                    className="group card-lift flex h-full flex-col rounded-md border border-border bg-background p-8 transition-colors hover:bg-[color:var(--navy-deep)]"
                  >
                    <div className="flex items-center justify-between">
                      <Icon
                        className="h-6 w-6 text-[color:var(--gold-ink)] group-hover:text-[color:var(--gold)]"
                        aria-hidden
                      />
                      <span className="font-serif text-sm text-[color:var(--gold-ink)] group-hover:text-[color:var(--gold)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-6 font-serif text-2xl leading-snug text-[color:var(--ink)] group-hover:text-[color:var(--ivory)]">
                      {area.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground group-hover:text-[color:var(--ivory)]/80">
                      {area.short}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.25em] text-[color:var(--ink)] group-hover:text-[color:var(--gold)]">
                      Saber mais
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                        aria-hidden
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="on-dark relative overflow-hidden bg-[color:var(--navy-deep)] py-20 text-[color:var(--ivory)] lg:py-28">
        <GuillochePattern opacity={0.12} />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal>
            <Eyebrow tone="dark">Valores</Eyebrow>
            <h2 className="max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">
              Como trabalhamos
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {p.values.map((v, i) => (
              <Reveal key={v.title} delay={100 + i * 120}>
                <div className="border-t border-[color:var(--gold)]/40 pt-6">
                  <span className="font-serif text-lg text-[color:var(--gold)]">{ROMAN[i]}</span>
                  <h3 className="mt-3 font-serif text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--ivory)]/80">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PERGUNTAS FREQUENTES */}
      <section className="bg-background py-20 lg:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
          <Reveal>
            <Eyebrow>Perguntas frequentes</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight text-[color:var(--ink)] sm:text-4xl">
              Algumas perguntas comuns
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Informação de carácter geral, que não dispensa a análise do caso concreto nem
              constitui aconselhamento jurídico.
            </p>
          </Reveal>
          <Reveal delay={120} className="border-t border-border">
            {p.faqs.map((faq, i) => (
              <FaqItem key={faq.id} faq={faq} defaultOpen={i === 0} />
            ))}
          </Reveal>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="on-dark relative overflow-hidden bg-[color:var(--navy)] py-20 text-[color:var(--ivory)] lg:py-24">
        <GuillochePattern opacity={0.1} />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Eyebrow tone="dark">Contacto</Eyebrow>
            <h2 className="font-serif text-3xl leading-tight sm:text-[2.6rem]">
              Fale connosco antes de assinar, de decidir, de responder.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-[color:var(--ivory)]/80">
              Atendimento presencial no escritório. Ligue, escreva ou deixe os seus contactos: a
              Andreia Martins entrará em contacto consigo.
            </p>
            <Link to="/contactos" className="btn-primary btn-lg mt-8">
              Marcar reunião <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <ul className="divide-y divide-[color:var(--gold)]/20 border-y border-[color:var(--gold)]/20">
              <ContactRow icon={Phone} label="Telemóvel" href={telHref(a.phoneE164)}>
                {a.phoneDisplay}
              </ContactRow>
              {a.phoneAltE164 && (
                <ContactRow icon={Phone} label="Telefone" href={telHref(a.phoneAltE164)}>
                  {a.phoneAltDisplay}
                </ContactRow>
              )}
              <ContactRow icon={Mail} label="Email" href={mailHref(a.email)}>
                {a.email}
              </ContactRow>
              <ContactRow icon={MapPin} label="Morada">
                {isPlaceholder(a.street) ? a.street : `${a.street}, ${a.locality}`}
              </ContactRow>
            </ul>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactRow({
  icon: Icon,
  label,
  href,
  children,
}: {
  icon: typeof Phone;
  label: string;
  href?: string;
  children: React.ReactNode;
}) {
  const body = (
    <>
      <span className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[color:var(--ivory)]/80">
        <Icon className="h-4 w-4 text-[color:var(--gold)]" aria-hidden />
        {label}
      </span>
      <span className="font-serif text-xl sm:text-2xl">{children}</span>
    </>
  );
  const cls = "flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between";
  return (
    <li>
      {href ? (
        <a href={href} className={`${cls} transition-colors hover:text-[color:var(--gold-soft)]`}>
          {body}
        </a>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </li>
  );
}

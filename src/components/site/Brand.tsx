import { Logo } from "./Logo";

/**
 * Bloco em arco (topo em meia-volta), como a moldura das imagens nos posts
 * do Instagram da advogada. Bordeaux com o logótipo empilhado a creme.
 */
export function ArchLogo({ className }: { className?: string }) {
  return (
    <div
      className={`on-dark relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-t-[999px] rounded-b-xl bg-[color:var(--navy-deep)] text-[color:var(--ivory)] ${className ?? ""}`}
    >
      <span
        className="absolute inset-3 rounded-t-[999px] rounded-b-lg border border-[color:var(--gold)]/40"
        aria-hidden
      />
      <Logo variant="lockup" layout="stacked" size="lg" className="relative mt-8" />
    </div>
  );
}

/** Número dentro de um círculo fino, como o "02" dos posts. */
export function NumberBadge({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color =
    tone === "dark"
      ? "border-[color:var(--gold)]/60 text-[color:var(--ivory)]"
      : "border-[color:var(--gold-ink)]/30 text-[color:var(--gold-ink)]";
  return (
    <span
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border font-serif text-base leading-none ${color} ${className ?? ""}`}
    >
      {children}
    </span>
  );
}

/** Rótulo de secção: filete + texto em maiúsculas espaçadas. */
export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-[color:var(--gold)]" : "text-[color:var(--gold-ink)]";
  const rule = tone === "dark" ? "bg-[color:var(--gold)]" : "bg-[color:var(--gold-ink)]";
  return (
    <p
      className={`mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.32em] ${color} ${className ?? ""}`}
    >
      <span className={`h-px w-10 ${rule}`} />
      {children}
    </p>
  );
}

/** Hero claro das páginas interiores, com filete inferior em gradiente. */
export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative -mt-20 overflow-hidden bg-[color:var(--muted)] text-[color:var(--ink)]">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold-ink)]/50 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div className="animate-fade-rise">
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="animate-fade-rise delay-1 max-w-3xl font-serif text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children && (
          <div className="animate-fade-rise delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

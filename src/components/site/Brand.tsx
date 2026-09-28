import { useId } from "react";

/* ------------------------------------------------------------------------ */
/* Textura guilloché (ondas paralelas entrelaçadas)                          */
/* ------------------------------------------------------------------------ */

// Evoca o fundo de segurança de um documento oficial ou de um papel
// timbrado: feixes de ondas sinusoidais paralelas, em duas famílias com
// fase oposta que se cruzam. Tudo determinístico (sem Math.random): uma só
// onda-base é calculada no módulo e reutilizada com <use>, deslocada em x
// (o que equivale a desfasar a onda) e em y. O SVG do servidor é igual ao
// do cliente e o HTML fica leve.

const WAVE_LENGTH = 260;
const WAVE_AMP = 24;
const WAVE_FROM = -600;
const WAVE_TO = 2100;
const WAVE_STEP = WAVE_LENGTH / 16;

const WAVE_PATH = (() => {
  const f = (v: number) => v.toFixed(1);
  const pts: [number, number][] = [];
  for (let x = WAVE_FROM; x <= WAVE_TO; x += WAVE_STEP) {
    pts.push([x, WAVE_AMP * Math.sin((2 * Math.PI * x) / WAVE_LENGTH)]);
  }
  // Curva suave: quadráticas entre pontos médios.
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let k = 1; k < pts.length - 1; k++) {
    const mx = (pts[k][0] + pts[k + 1][0]) / 2;
    const my = (pts[k][1] + pts[k + 1][1]) / 2;
    d += `Q${f(pts[k][0])} ${f(pts[k][1])} ${f(mx)} ${f(my)}`;
  }
  return d;
})();

// Dois feixes ligeiramente inclinados: um no terço superior, outro em baixo.
const BANDS = [
  { y: 210, rotate: -7, lines: 12 },
  { y: 720, rotate: -7, lines: 9 },
];
const LINE_DX = 13; // desfasamento entre linhas vizinhas (fase)
const LINE_DY = 7; // espaçamento vertical entre linhas vizinhas

/**
 * Textura guilloché em azul claro para fundos escuros. Decorativa:
 * posicionar dentro de um contentor `relative overflow-hidden`.
 */
export function GuillochePattern({
  className,
  opacity = 0.2,
}: {
  className?: string;
  opacity?: number;
}) {
  const id = `wave-${useId().replace(/:/g, "")}`;
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
      style={{ opacity }}
    >
      <defs>
        <path id={id} d={WAVE_PATH} />
      </defs>
      <g fill="none" stroke="var(--gold)">
        {BANDS.map((band, b) => (
          <g key={b} transform={`translate(0 ${band.y}) rotate(${band.rotate} 720 0)`}>
            {Array.from({ length: band.lines }, (_, k) => {
              const major = k % 4 === 0;
              const w = major ? 1.1 : 0.6;
              const y = (k - band.lines / 2) * LINE_DY;
              return (
                <g key={k}>
                  <use href={`#${id}`} x={k * LINE_DX} y={y} strokeWidth={w} />
                  <use
                    href={`#${id}`}
                    transform={`translate(${-k * LINE_DX} ${y}) scale(1 -1)`}
                    strokeWidth={w}
                    strokeOpacity={0.7}
                  />
                </g>
              );
            })}
          </g>
        ))}
      </g>
    </svg>
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

/** Hero escuro das páginas interiores, com textura guilloché. */
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
    <section className="relative -mt-20 overflow-hidden bg-[color:var(--navy-deep)] text-[color:var(--ivory)]">
      <GuillochePattern opacity={0.16} />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/50 to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6 pt-36 pb-16 lg:pt-44 lg:pb-20">
        <div className="animate-fade-rise">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
        </div>
        <h1 className="animate-fade-rise delay-1 max-w-3xl font-serif text-4xl leading-[1.05] font-medium sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children && (
          <div className="animate-fade-rise delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--ivory)]/80">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

/** Marca visual para dados ainda por confirmar com a cliente. */
export function Pending({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm border border-dashed border-current/40 px-1.5 py-0.5 text-[0.92em] opacity-80">
      {children}
    </span>
  );
}

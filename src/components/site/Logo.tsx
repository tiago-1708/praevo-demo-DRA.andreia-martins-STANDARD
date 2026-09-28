import { useId } from "react";

/**
 * Proposta de logótipo — monograma "AM".
 *
 * Construção (grelha 56 × 40, linha de base y = 36, altura de maiúscula 30):
 * um único traço contínuo em ziguezague /\/\ com quatro hastes de igual
 * inclinação desenha o M; a travessa fina no primeiro vértice transforma a
 * metade esquerda do M num A. As duas letras partilham assim duas hastes.
 * Os pés são cortados na horizontal (clipPath) e os vértices ficam em
 * esquadria, como numa letra gravada.
 *
 * Tudo em `currentColor`: herda a cor do contexto. `accentClassName`
 * permite dar à travessa uma cor própria (ex.: o azul claro em fundo escuro).
 */

// Os pés prolongam-se abaixo da linha de base e o clipPath corta-os a direito.
const ZIGZAG = "M2.4 40 L16 6 L28 36 L40 6 L53.6 40";
// Travessa do A à altura y = 25 (interseção com as hastes 1 e 2).
const BAR = { x1: 8.4, x2: 23.6, y: 25 };

export function LogoMark({
  className,
  accentClassName,
  title,
}: {
  className?: string;
  accentClassName?: string;
  title?: string;
}) {
  const clipId = useId();
  return (
    <svg
      viewBox="0 0 56 40"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width="56" height="36" />
        </clipPath>
      </defs>
      <path
        d={ZIGZAG}
        fill="none"
        stroke="currentColor"
        strokeWidth={3.2}
        strokeLinejoin="miter"
        strokeMiterlimit={10}
        clipPath={`url(#${clipId})`}
      />
      <line
        x1={BAR.x1}
        x2={BAR.x2}
        y1={BAR.y}
        y2={BAR.y}
        stroke="currentColor"
        strokeWidth={1.6}
        className={accentClassName}
      />
    </svg>
  );
}

type LogoProps = {
  variant?: "mark" | "lockup";
  /** Só para `lockup`: horizontal (header/rodapé) ou empilhado (hero/Sobre). */
  layout?: "horizontal" | "stacked";
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Cor da travessa e de "ADVOGADA" (classe Tailwind de cor). */
  accentClassName?: string;
};

const markSize = {
  sm: "h-6 w-auto sm:h-7",
  md: "h-9 w-auto",
  lg: "h-20 w-auto sm:h-24",
} as const;

/**
 * Logótipo completo. `mark` = monograma isolado (legível a 32 px);
 * `lockup` = monograma + "ANDREIA MARTINS" + "ADVOGADA" em versaletes.
 */
export function Logo({
  variant = "lockup",
  layout = "horizontal",
  size = "sm",
  className,
  accentClassName = "text-[color:var(--gold)]",
}: LogoProps) {
  if (variant === "mark") {
    return (
      <LogoMark
        className={`${markSize[size]} ${className ?? ""}`}
        accentClassName={accentClassName}
        title="Andreia Martins, Advogada"
      />
    );
  }

  if (layout === "stacked") {
    return (
      <span className={`inline-flex flex-col items-center leading-none ${className ?? ""}`}>
        <LogoMark className={markSize[size]} accentClassName={accentClassName} />
        <span
          className="mt-7 whitespace-nowrap font-serif text-lg font-normal tracking-[0.3em] uppercase sm:text-xl"
          style={{ fontVariant: "small-caps" }}
        >
          Andreia Martins
        </span>
        <span className="mt-4 h-px w-12 bg-current opacity-40" aria-hidden />
        <span
          className={`mt-4 whitespace-nowrap text-[10px] font-medium tracking-[0.5em] uppercase ${accentClassName}`}
        >
          Advogada
        </span>
      </span>
    );
  }

  const text =
    size === "md"
      ? { name: "text-[15px] tracking-[0.24em]", role: "text-[9px] tracking-[0.46em]" }
      : {
          // Mais compacto em mobile, para caber ao lado de "Ligar" e do menu.
          name: "text-[11.5px] tracking-[0.12em] sm:text-[13px] sm:tracking-[0.22em]",
          role: "text-[7.5px] tracking-[0.4em] sm:text-[8px] sm:tracking-[0.44em]",
        };

  return (
    <span className={`inline-flex items-center gap-2.5 leading-none sm:gap-3 ${className ?? ""}`}>
      <LogoMark className={markSize[size]} accentClassName={accentClassName} />
      <span className="hidden h-8 w-px bg-current opacity-30 sm:block" aria-hidden />
      <span className="flex flex-col">
        <span className={`whitespace-nowrap font-serif font-normal uppercase ${text.name}`}>
          Andreia Martins
        </span>
        <span
          className={`mt-1.5 whitespace-nowrap font-medium uppercase ${text.role} ${accentClassName}`}
        >
          Advogada
        </span>
      </span>
    </span>
  );
}

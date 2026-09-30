import { useId } from "react";
import {
  MARK_VIEWBOX,
  PATH_A,
  PATH_M,
  SLASH,
  STACKED_VIEWBOX,
  TEXT_ADVOGADA,
  TEXT_NAME,
} from "./logo-paths";

/**
 * Logótipo da Andreia Martins, reproduzido do Instagram: monograma "A/M" —
 * A em cima à esquerda, M em baixo à direita, separados por um traço
 * diagonal fino — com "ADVOGADA" e "ANDREIA MARTINS" em maiúsculas
 * espaçadas por baixo.
 *
 * Letras em contornos (Playfair Display e Montserrat, ver logo-paths.ts),
 * por isso não dependem das fontes carregadas. Tudo em `currentColor`.
 * O traço abre um pequeno intervalo nas letras (máscara), como no original.
 */

function MarkShapes({ maskId }: { maskId: string }) {
  return (
    <>
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse" x="-100" y="-100" width="500" height="500">
          <rect x="-100" y="-100" width="500" height="500" fill="white" />
          <line {...SLASH} stroke="black" strokeWidth={8} />
        </mask>
      </defs>
      <g fill="currentColor" mask={`url(#${maskId})`}>
        <path d={PATH_A} />
        <path d={PATH_M} />
      </g>
      <line {...SLASH} stroke="currentColor" strokeWidth={2} />
    </>
  );
}

export function LogoMark({ className, title }: { className?: string; title?: string }) {
  const maskId = `am-${useId().replace(/:/g, "")}`;
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      focusable="false"
    >
      <MarkShapes maskId={maskId} />
    </svg>
  );
}

type LogoProps = {
  variant?: "mark" | "lockup";
  /** Só para `lockup`: horizontal (header/rodapé) ou empilhado (como no Instagram). */
  layout?: "horizontal" | "stacked";
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Cor de "ADVOGADA" no lockup horizontal (classe Tailwind de cor). */
  accentClassName?: string;
};

const markSize = {
  sm: "h-8 w-auto sm:h-9",
  md: "h-10 w-auto",
  lg: "h-24 w-auto",
} as const;

const stackedSize = {
  sm: "w-28",
  md: "w-36",
  lg: "w-48 sm:w-56",
} as const;

export function Logo({
  variant = "lockup",
  layout = "horizontal",
  size = "sm",
  className,
  accentClassName = "opacity-80",
}: LogoProps) {
  const maskId = `am-${useId().replace(/:/g, "")}`;

  if (variant === "mark") {
    return (
      <LogoMark
        className={`${markSize[size]} ${className ?? ""}`}
        title="Andreia Martins, Advogada"
      />
    );
  }

  if (layout === "stacked") {
    return (
      <svg
        viewBox={STACKED_VIEWBOX}
        className={`h-auto ${stackedSize[size]} ${className ?? ""}`}
        role="img"
        aria-label="Andreia Martins, Advogada"
        focusable="false"
      >
        <MarkShapes maskId={maskId} />
        <path
          d={TEXT_ADVOGADA.d}
          transform={`translate(${TEXT_ADVOGADA.x} ${TEXT_ADVOGADA.y})`}
          fill="currentColor"
        />
        <path
          d={TEXT_NAME.d}
          transform={`translate(${TEXT_NAME.x} ${TEXT_NAME.y})`}
          fill="currentColor"
        />
      </svg>
    );
  }

  const text =
    size === "md"
      ? { name: "text-[15px] tracking-[0.2em]", role: "text-[9px] tracking-[0.46em]" }
      : {
          // Mais compacto em mobile, para caber ao lado de "Ligar" e do menu.
          name: "text-[12px] tracking-[0.12em] sm:text-[14px] sm:tracking-[0.18em]",
          role: "text-[7.5px] tracking-[0.4em] sm:text-[8px] sm:tracking-[0.44em]",
        };

  return (
    <span className={`inline-flex items-center gap-2.5 leading-none sm:gap-3 ${className ?? ""}`}>
      <LogoMark className={markSize[size]} />
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

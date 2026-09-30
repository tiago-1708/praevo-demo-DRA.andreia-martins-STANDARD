import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig, telHref } from "@/lib/site-config";
import { Logo } from "./Logo";

const nav = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Sobre" },
  { to: "/areas-de-atuacao", label: "Áreas de Prática" },
  { to: "/contactos", label: "Contactos" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const a = siteConfig.advogado;
  const pathname = useLocation({ select: (l) => l.pathname });

  // Logótipo: link para "/" nas outras páginas; já em "/" e com scroll,
  // sobe suavemente ao topo em vez de recarregar a rota.
  const onLogoClick = (e: React.MouseEvent) => {
    setOpen(false);
    if (pathname === "/" && window.scrollY > 0) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "border-b border-border bg-[color:var(--ivory)]/95 backdrop-blur"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-6 py-3.5 lg:py-4">
        <Link
          to="/"
          onClick={onLogoClick}
          className="flex min-w-0 items-center text-[color:var(--ink)]"
          aria-label={`${a.displayName}, Advogada — início`}
        >
          <Logo variant="lockup" size="sm" accentClassName="text-[color:var(--gold-ink)]" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="link-underline text-sm tracking-wide text-[color:var(--ink)]/80 transition-colors hover:text-[color:var(--gold-ink)]"
              activeProps={{ className: "text-[color:var(--gold-ink)]" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={telHref(a.phoneE164)}
            className="flex items-center gap-2 text-sm tracking-wide text-[color:var(--ink)]/80 transition-colors hover:text-[color:var(--gold-ink)]"
          >
            <Phone className="h-4 w-4 text-[color:var(--gold-ink)]" aria-hidden />
            {a.phoneDisplay}
          </a>
          <Link to="/contactos" className="btn-primary btn-sm">
            Marcar reunião
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={telHref(a.phoneE164)}
            className="btn-primary btn-sm"
            aria-label={`Ligar para ${a.displayName}`}
          >
            <Phone className="h-4 w-4" aria-hidden />
            Ligar
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="rounded-sm p-1.5 text-[color:var(--ink)] transition-colors hover:bg-[color:var(--muted)]"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-[color:var(--ivory)] lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                className="border-b border-border py-3 text-sm text-[color:var(--ink)]/80"
                activeProps={{ className: "text-[color:var(--gold-ink)]" }}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contactos" onClick={() => setOpen(false)} className="btn-primary mt-4">
              Marcar reunião
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

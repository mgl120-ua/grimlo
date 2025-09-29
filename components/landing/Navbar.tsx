"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

export type NavLink = { href: string; label: string };

type GrimloNavbarProps = {
  links?: NavLink[];
  ctaHref?: string;
  ctaLabel?: string;
  logoAlt?: string;
  /** Ruta pública desde /public (p.ej. "/logo.png") */
  logoSrc?: string;
};

/**
 * Navbar sticky con cambio de fondo onScroll, drawer mobile y micro-interacciones.
 * Solo Tailwind + Framer Motion. Accesible (aria, foco, teclado).
 */
export default function Navbar({
  links = [
    { href: "#servicios", label: "Servicios" },
    { href: "#proyectos", label: "Proyectos" },
    { href: "#proceso", label: "Proceso" },
    { href: "#contacto", label: "Contacto" },
  ],
  ctaHref = "#contacto",
  ctaLabel = "Hablemos",
  logoAlt = "Grimlo",
  logoSrc = "/logo.png", // <- tu imagen en public
}: GrimloNavbarProps) {
  const [navSolid, setNavSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 12 },
      show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
    }),
    []
  );
  const stagger = useMemo(
    () => ({ show: { transition: { staggerChildren: 0.06 } } }),
    []
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        navSolid
          ? "backdrop-blur-md bg-[#0E0F10]/70 supports-[backdrop-filter]:bg-[#0E0F10]/55 border-b border-white/10"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-lg"
            aria-label="Ir al inicio"
          >
            <Image
              src={logoSrc}
              alt={logoAlt}
              width={120}
              height={28}
              priority
              className="h-7 w-auto"
            />
          </Link>

          {/* Links desktop */}
          <motion.ul
            className="hidden md:flex items-center gap-2"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {links.map((item) => (
              <motion.li key={item.href} variants={fadeUp}>
                <Link
                  href={item.href}
                  className="group relative inline-flex items-center rounded-md px-3 py-2 text-sm text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  <span className="transition-transform duration-200 group-hover:-translate-y-0.5">
                    {item.label}
                  </span>
                  <span className="pointer-events-none absolute inset-x-2 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-white/0 via-white/60 to-white/0 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </motion.li>
            ))}
            <motion.li variants={fadeUp}>
              <Link
                href={ctaHref}
                className="ml-1 inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
              >
                {ctaLabel}
              </Link>
            </motion.li>
          </motion.ul>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Abrir menú"
            aria-controls="mobile-drawer"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
              <path
                d="M3 6h18M3 12h18M3 18h18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      <motion.aside
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-[60] md:hidden"
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          open: { visibility: "visible" as any },
          closed: { visibility: "hidden" as any },
        }}
      >
        {/* backdrop */}
        <motion.button
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm focus:outline-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />
        {/* panel */}
        <motion.div
          className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-[#0E0F10]/95 border-l border-white/10 shadow-2xl"
          initial={{ x: "100%" }}
          animate={{ x: open ? "0%" : "100%" }}
          transition={{ type: "tween", duration: 0.25 }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <Image src={logoSrc} alt={logoAlt} width={96} height={24} priority />
            <button
              type="button"
              className="rounded-md p-2 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              onClick={() => setOpen(false)}
              aria-label="Cerrar menú"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
                <path
                  d="M6 6l12 12M18 6l-12 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <ul className="px-2 py-3">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base text-white/90 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link
                href={ctaHref}
                className="inline-flex w-full items-center justify-center rounded-lg border border-white/15 bg-white/5 px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 transition"
                onClick={() => setOpen(false)}
              >
                {ctaLabel}
              </Link>
            </li>
          </ul>
        </motion.div>
      </motion.aside>
    </nav>
  );
}

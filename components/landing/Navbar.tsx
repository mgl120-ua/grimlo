"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

// Grimlo navbar con scroll-spy + tipografía fiable
// - Acento: granate oscuro (#5a1622)
// - Marca sección activa automáticamente al hacer scroll
// - Fallbacks de tipografía para evitar que "no se vea bien" si la fuente no carga

const ACCENT = "#5a1622"

const linkBase =
  "relative px-1 py-1 text-sm md:text-base font-medium transition-opacity hover:opacity-100 opacity-70 tracking-tight focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"

function NavLink({ href, label, activeHash }: { href: string; label: string; activeHash: string }) {
  const isActive = activeHash === href
  return (
    <Link href={href} className={`${linkBase} group/navlink`} scroll aria-current={isActive ? "page" : undefined}>
      <span className={isActive ? "text-white" : "text-white/70 group-hover/navlink:text-white"}>{label}</span>
      {/* subrayado con acento granate + degradado */}
      <span
        className={`absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-gradient-to-r from-[${ACCENT}] via-white/70 to-transparent transition-transform duration-300 ${
          isActive ? "scale-x-100" : "group-hover/navlink:scale-x-100"
        }`}
      />
    </Link>
  )
}

export default function Navbar() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeHash, setActiveHash] = useState("#home")

  // Cambia fondo al hacer scroll
  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 12))

  // Links de navegación
  const left = useMemo(
    () => [
      { href: "#home", label: "Inicio" },
      { href: "#services", label: "Servicios" },
      { href: "#about", label: "Nosotros" },
    ],
    []
  )
  const right = useMemo(
    () => [
      { href: "#examples", label: "Ejemplos" },
      { href: "#faq", label: "Preguntas" },
      { href: "#contact", label: "Contacto" },
    ],
    []
  )

  // Detecta el hash activo por navegación y por scroll (scroll-spy)
  useEffect(() => {
    const onHash = () => setActiveHash(window.location.hash || "#home")
    onHash()
    window.addEventListener("hashchange", onHash)

    // --- Scroll Spy sin IntersectionObserver (más estable en SPA con anclas) ---
    const ids = [...left, ...right].map((l) => l.href).filter((h) => h.startsWith("#"))

    let ticking = false
    const computeActive = () => {
      ticking = false
      const viewportFocusY = Math.round(window.innerHeight * 0.33) // 1/3 superior de la pantalla
      let best: { id: string; dist: number } | null = null
      for (const id of ids) {
        const el = document.querySelector<HTMLElement>(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const topDist = Math.abs(rect.top - viewportFocusY)
        const isVisible = rect.bottom > 80 && rect.top < window.innerHeight - 80
        if (!isVisible) continue
        if (!best || topDist < best.dist) best = { id, dist: topDist }
      }
      if (best && best.id !== activeHash) setActiveHash(best.id)
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(computeActive)
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    // Primer cálculo tras montar
    setTimeout(computeActive, 0)

    return () => {
      window.removeEventListener("hashchange", onHash)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left, right])

  return (
    <motion.nav
      className="fixed top-0 z-50 w-full font-sans"
      style={{
        // Fallbacks de fuente por si la variable de next/font no estuviera aplicada todavía
        fontFamily:
          'var(--font-brand, var(--font-sans, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial))',
      }}
      initial={false}
      animate={{ backgroundColor: solid ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.5)" }}
    >
      <div className={`backdrop-blur ${solid ? "border-b border-[#5a1622]/40" : "border-b border-white/5"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          {/* Botón móvil */}
          <button
            className="md:hidden rounded-md border border-white/15 px-3 py-2 text-sm text-white/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40"
            onClick={() => setOpen((s) => !s)}
            aria-label="Abrir menú"
          >
            Menú
          </button>

          {/* Menú izquierdo */}
          <div className="hidden md:flex flex-1 items-center gap-8">
            {left.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} activeHash={activeHash} />
            ))}
          </div>

          {/* Logo centrado */}
          <Link href="#home" aria-label="Ir al inicio" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Logo Grimlo"
              width={56}
              height={56}
              className="drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
              priority
            />
          </Link>

          {/* Menú derecho */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-8">
            {right.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} activeHash={activeHash} />
            ))}
          </div>
        </div>

        {/* Drawer móvil */}
        {open && (
          <div className="md:hidden border-t border-white/10 bg-black/95">
            <div className="mx-auto grid max-w-7xl gap-3 px-4 py-4 text-base">
              {[...left, ...right].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`py-1 ${activeHash === l.href ? "text-white font-semibold" : "text-white/70 hover:text-white"}`}
                  aria-current={activeHash === l.href ? "page" : undefined}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  )
}

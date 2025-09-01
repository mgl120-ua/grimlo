"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion"
import { Menu, X } from "lucide-react"

const ACCENT = "#20165aff"
const linkBase =
  "relative px-1 py-2 text-[15px] font-medium tracking-tight opacity-80 hover:opacity-100 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40"

function LiquidUnderline({ active, className = "" }: { active: boolean; className?: string }) {
  return (
    <motion.span
      layout
      aria-hidden
      className={`absolute left-0 -bottom-[6px] h-[2px] w-full ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${ACCENT}, rgba(255,255,255,.85) 55%, transparent)`
      }}
      initial={{ scaleX: 0, originX: 0 }}
      animate={{ scaleX: active ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 450, damping: 40, mass: 0.5 }}
    />
  )
}

function MagneticLink({ href, label, activeHash }: { href: string; label: string; activeHash: string }) {
  const isActive = activeHash === href
  const ref = useRef<HTMLAnchorElement | null>(null)
  const [mag, setMag] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) / 8
      const y = (e.clientY - (r.top + r.height / 2)) / 8
      setMag({ x, y })
    }
    const onLeave = () => setMag({ x: 0, y: 0 })
    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <motion.a
      ref={ref}
      href={href}
      className={`${linkBase} group/navlink`}
      style={{ display: "inline-block", letterSpacing: "-0.01em", fontVariationSettings: '"opsz" 32' as any }}
      whileHover={{ x: mag.x, y: mag.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.3 }}
      aria-current={isActive ? "page" : undefined}
    >
      <span className={isActive ? "text-white" : "text-white/80 group-hover/navlink:text-white"}>{label}</span>
      <LiquidUnderline active={isActive} />
    </motion.a>
  )
}

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 })

  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [imgErr, setImgErr] = useState(false)
  const [activeHash, setActiveHash] = useState<string>("#home")

  // Ref espejo para evitar setState redundantes en efectos
  const activeRef = useRef<string>("#home")
  useEffect(() => {
    activeRef.current = activeHash
  }, [activeHash])

  useMotionValueEvent(scrollY, "change", (v) => setSolid(v > 10))

  const left = useMemo(
    () => [
      { href: "/", label: "Inicio" },
      { href: "#services", label: "Servicios" },
      { href: "#about", label: "Nosotros" }
    ],
    []
  )

  const right = useMemo(
    () => [
      { href: "/faq", label: "Preguntas Frequentes" },
    ],
    []
  )

  // Body scroll-lock on mobile
  useEffect(() => {
    const root = document.documentElement
    if (open) {
      root.classList.add("overflow-hidden", "md:overflow-visible")
    } else {
      root.classList.remove("overflow-hidden")
    }
    return () => root.classList.remove("overflow-hidden")
  }, [open])

  // Sync con hash del URL (pulsar enlaces, navegación directa con hash)
  useEffect(() => {
    const onHash = () => {
      const next = window.location.hash || "#home"
      if (next !== activeRef.current) {
        activeRef.current = next
        setActiveHash(next)
      }
    }
    window.addEventListener("hashchange", onHash)
    // inicial
    onHash()
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  // Scroll-spy con IntersectionObserver (sin depender de activeHash)
  useEffect(() => {
    const ids = [...left, ...right, { href: "#contact", label: "Contacto" }]
      .map((l) => l.href)
      .filter((h) => h.startsWith("#"))

    if (ids.length === 0) return

    const sections = ids
      .map((id) => document.querySelector<HTMLElement>(id))
      .filter((el): el is HTMLElement => !!el)

    if (sections.length === 0) return

    const visibility = new Map<string, number>()
    const thresholds = Array.from({ length: 21 }, (_, i) => i / 20)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = "#" + (entry.target.id || "")
          if (!ids.includes(id)) continue
          visibility.set(id, entry.intersectionRatio || 0)
        }

        // Selecciona la sección con mayor ratio visible
        let bestId = activeRef.current
        let bestRatio = -1
        for (const id of ids) {
          const r = visibility.get(id) ?? 0
          if (r > bestRatio) {
            bestRatio = r
            bestId = id
          }
        }

        const MIN_SWITCH = 0.2
        if (bestRatio >= MIN_SWITCH && bestId !== activeRef.current) {
          activeRef.current = bestId
          setActiveHash(bestId)
        }
      },
      {
        root: null,
        // Ajusta según alto de navbar y “zona dulce” de lectura
        // Ej.: si navbar ≈ 64px, puedes usar "-64px 0px -70% 0px"
        rootMargin: "-25% 0px -65% 0px",
        threshold: thresholds
      }
    )

    sections.forEach((sec) => observer.observe(sec))

    // inicial: respeta hash si existe y es válido
    const initial = window.location.hash || "#home"
    if (ids.includes(initial) && initial !== activeRef.current) {
      activeRef.current = initial
      setActiveHash(initial)
    }

    return () => observer.disconnect()
  }, [left, right])

  // Cerrar drawer en móvil al cambiar hash
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener("hashchange", close)
    return () => window.removeEventListener("hashchange", close)
  }, [])

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed left-0 right-0 top-0 z-[60] h-[2px]"
        style={{ scaleX: progress, transformOrigin: "0% 50%", backgroundImage: `linear-gradient(90deg, ${ACCENT}, #ffffff)` }}
      />

      <motion.nav
        className="fixed top-0 z-50 w-full font-display"
        style={{
          paddingTop: "max(env(safe-area-inset-top), 0px)",
          fontFamily:
            'var(--font-display, var(--font-sans, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Inter, "Helvetica Neue", Arial))'
        }}
        initial={false}
        animate={{ backgroundColor: solid ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0.45)" }}
      >
        {/* Hairline + glass */}
        <div className="relative backdrop-blur-xl supports-[backdrop-filter]:bg-black/40">
          <div className="absolute inset-0 pointer-events-none" aria-hidden>
            <div
              className="absolute inset-x-0 -bottom-px h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${ACCENT}66, #ffffff22, transparent)` }}
            />
          </div>

          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
            {/* Left: mobile menu button */}
            <div className="md:hidden">
              <button
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 text-white/90 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/40 active:scale-[.98] transition"
                onClick={() => setOpen((s) => !s)}
                aria-expanded={open}
                aria-controls="grimlo-mobile"
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
              >
                {open ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>

            {/* Desktop left links */}
            <div className="hidden md:flex flex-1 items-center gap-8">
              {left.map((l) => (
                <MagneticLink key={l.href} href={l.href} label={l.label} activeHash={activeHash} />
              ))}
            </div>

            {/* Logo center */}
            <Link href="#home" aria-label="Ir al inicio" className="shrink-0">
              {imgErr ? (
                <span className="text-white font-semibold" style={{ letterSpacing: "-0.02em" }}>
                  GRIMLO
                </span>
              ) : (
                <Image
                  src="/logo.png"
                  alt="Logo Grimlo"
                  width={56}
                  height={56}
                  className="drop-shadow-[0_0_10px_rgba(255,255,255,0.18)]"
                  priority
                  onError={() => setImgErr(true)}
                />
              )}
            </Link>

            {/* Desktop right links + CTA */}
            <div className="hidden md:flex flex-1 items-center justify-end gap-8">
              {right.map((l) => (
                <MagneticLink key={l.href} href={l.href} label={l.label} activeHash={activeHash} />
              ))}
              <Link href="#contact" className="group/cta relative inline-flex">
                <span
                  className="absolute -inset-[1px] rounded-xl opacity-60 blur-sm transition-opacity group-hover/cta:opacity-90"
                  style={{ background: `conic-gradient(from 180deg at 50% 50%, ${ACCENT}, #ffffff, ${ACCENT})` }}
                  aria-hidden
                />
                <span
                  className="relative rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  Hablemos
                </span>
              </Link>
            </div>
          </div>

          {/* Mobile drawer */}
          <motion.div
            id="grimlo-mobile"
            role="dialog"
            aria-modal="true"
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            className="md:hidden overflow-hidden border-t border-white/10 bg-black/90 will-change-[height,opacity]"
          >
            {/* slide + fade container */}
            <motion.div
              initial={false}
              animate={{ y: open ? 0 : -8, opacity: open ? 1 : 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.6 }}
              className="mx-auto max-w-7xl px-4 py-4"
            >
              <nav className="grid gap-1">
                {[...left, ...right, { href: "#contact", label: "Contacto" }].map((l) => {
                  const active = activeHash === l.href
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      className={`relative flex items-center justify-between rounded-lg px-2 py-3 text-base active:scale-[.99] transition ${
                        active ? "text-white font-semibold bg-white/5 ring-1 ring-white/10" : "text-white/85 hover:text-white"
                      }`}
                    >
                      <span>{l.label}</span>
                      {/* mini underline visible en móvil para activo */}
                      <LiquidUnderline active={active} className="-bottom-[2px]" />
                    </Link>
                  )
                })}
              </nav>

              <div className="mt-3">
                <Link
                  href="#contact"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white text-black py-3 text-sm font-semibold ring-1 ring-white/15"
                >
                  Hablemos
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Skip link accesible (oculto visualmente) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-black focus:text-white focus:px-3 focus:py-2"
      >
        Saltar al contenido
      </a>
    </>
  )
}

"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"

const linkBase =
  "relative px-1 py-1 text-sm md:text-base font-medium transition-opacity hover:opacity-100 opacity-80"

function NavLink({ href, label, activeHash }: { href: string; label: string; activeHash: string }) {
  const isActive = activeHash === href
  return (
    <Link href={href} className={linkBase} scroll>
      <span>{label}</span>
      <span
        className={`absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 bg-white transition-transform duration-300 ${
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

  // Detecta el hash activo al navegar por anclas
  useEffect(() => {
    const onHash = () => setActiveHash(window.location.hash || "#home")
    onHash()
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [])

  const left = useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#services", label: "Servicios" },
      { href: "#about", label: "About Us" },
    ],
    []
  )
  const right = useMemo(
    () => [
      { href: "#examples", label: "Ejemplos" },
      { href: "#faq", label: "Preguntas" },
      { href: "#contact", label: "Contact Us" },
    ],
    []
  )

  return (
    <motion.nav
      className={`fixed top-0 z-50 w-full`}
      initial={false}
      animate={{ backgroundColor: solid ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.4)" }}
    >
      <div className={`backdrop-blur ${solid ? "border-b border-white/10" : "border-b border-white/5"}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          {/* Botón móvil */}
          <button
            className="md:hidden rounded-md border border-white/15 px-3 py-2 text-sm"
            onClick={() => setOpen((s) => !s)}
            aria-label="Abrir menú"
          >
            Menu
          </button>

          {/* Menú izquierdo */}
          <div className="hidden md:flex flex-1 items-center gap-8 group/navlink">
            {left.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} activeHash={activeHash} />
            ))}
          </div>

          {/* Logo centrado */}
          <Link href="#home" aria-label="Ir al inicio" className="shrink-0">
            <Image src="/logo.png" alt="Logo Grimlo" width={56} height={56} />
          </Link>

          {/* Menú derecho */}
          <div className="hidden md:flex flex-1 items-center justify-end gap-8 group/navlink">
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
                  className={`py-1 ${activeHash === l.href ? "font-semibold" : ""}`}
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

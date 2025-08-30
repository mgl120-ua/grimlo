"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"

function Ticker({ text, className = "", duration = 14 }: { text: string; className?: string; duration?: number }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((i) => (
          <div key={i} className="flex">
            {Array.from({ length: 6 }).map((_, j) => (
              <span key={`${i}-${j}`} className={className + " px-6"}>
                {text}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/** Pequeños “browser cards” que muestran que hacéis webs */
function BrowserCard({
  title,
  delay = 0,
}: {
  title: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="w-[290px] md:w-[320px] rounded-2xl border border-white/10 bg-[rgba(20,20,20,0.75)] backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.35)] overflow-hidden"
    >
      {/* Barra de navegador */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-white/10 bg-[rgba(28,28,28,0.8)]">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
        <div className="ml-3 flex-1 truncate rounded-md bg-white/5 px-2 py-1 text-xs text-white/70">
          {title.toLowerCase().replaceAll(" ", "")}.com
        </div>
      </div>
      {/* Contenido simulado */}
      <div className="p-4 space-y-3">
        <div className="h-24 rounded-xl bg-gradient-to-b from-stone-300/20 to-stone-200/10" />
        <div className="h-2.5 w-4/5 rounded bg-white/20" />
        <div className="h-2.5 w-3/5 rounded bg-white/15" />
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="h-16 rounded-lg bg-white/10" />
          <div className="h-16 rounded-lg bg-white/10" />
          <div className="h-16 rounded-lg bg-white/10" />
        </div>
      </div>
    </motion.div>
  )
}

export default function HeroRefined() {
  const { scrollY } = useScroll()
  const parallax = useTransform(scrollY, [0, 300], [0, -70])

  return (
    <section
      id="home"
      className="relative flex items-center justify-center overflow-hidden bg-[#0c0c0b] pt-20 h-[72svh] md:h-[68vh]"
    >
      {/* Fondo cálido gris/beige con blobs suaves */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(214,211,209,0.10),transparent_60%)]" />
      <motion.div
        className="absolute -top-24 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full blur-3xl opacity-40"
        style={{ y: parallax, background: "conic-gradient(from 90deg at 50% 50%, #d6d3d1, #a8a29e, #e7e5e4, #d6d3d1)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 -left-20 h-72 w-72 rounded-full blur-[70px] opacity-25"
        style={{ background: "linear-gradient(135deg,#e7e5e4,#a8a29e)" }}
        animate={{ x: [0, 30, 0], y: [0, -18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-6 -right-10 h-64 w-64 rounded-full blur-[70px] opacity-20"
        style={{ background: "linear-gradient(135deg,#d6d3d1,#e5e7eb)" }}
        animate={{ x: [0, -24, 0], y: [0, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex w-[92%] max-w-6xl flex-col items-center gap-5 text-center">
        <Ticker
          text="TU SITIO WEB COMIENZA AQUÍ."
          className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-tight bg-clip-text text-transparent bg-[linear-gradient(90deg,#fff,rgba(255,255,255,0.8),#fff)]"
          duration={13}
        />

        <p className="max-w-2xl text-balance text-sm md:text-base text-white/70">
          Diseño premium, rápido y accesible. Creamos webs modernas que convierten.
        </p>

        {/* CTAs sin marco “glow”: sólidos & outline limpios */}
        <div className="mt-1 flex items-center gap-3">
          <Link
            href="#prices"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold bg-white text-black hover:bg-stone-100 transition-colors"
          >
            Ver precios
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm md:text-base font-semibold border border-white/25 text-white hover:border-white/50 transition-colors"
          >
            Contactar
            
              <motion.span
                className="ml-1 inline-block"
                animate={{ x: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              >
                →
              </motion.span>
          </Link>
        </div>

      </div>

      {/* Indicador de scroll */}
      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2">
        <motion.div
          className="h-8 w-[1px] bg-white/35"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0c0c0b]" />
    </section>
  )
}

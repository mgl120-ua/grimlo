"use client"

import { useRef, useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroAwwwards() {
  // Spotlight reactivo al cursor
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement | null>(null)

  // CTA magnético (ligero)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateX = useTransform(my, [-50, 50], [8, -8])
  const rotateY = useTransform(mx, [-50, 50], [-8, 8])

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMouse({ x, y })
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative min-h-[92vh] w-full overflow-hidden bg-black text-white"
      aria-label="Hero Grimlo"
    >
      {/* Capa 0: gradiente oscuro profundo */}
      <div className="absolute inset-0 -z-50 bg-[radial-gradient(1200px_circle_at_10%_20%,#0b0b0b,transparent_60%),radial-gradient(900px_800px_at_90%_30%,#121212,transparent_50%),linear-gradient(to_bottom,#020202, #0a0a0a_30%,#000)]" />

      {/* Capa 1: spotlight reactivo al cursor */}
      <div
        className="pointer-events-none absolute -z-40 h-[160vmax] w-[160vmax] rounded-full opacity-40 blur-3xl"
        style={{
          left: mouse.x - 80 * 16,
          top: mouse.y - 80 * 16,
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.08), rgba(192,192,192,0.03), transparent 70%)",
          transition: "left 120ms linear, top 120ms linear",
        }}
      />

      {/* Capa 2: trama + grano sutil */}
      <div className="absolute inset-0 -z-30 opacity-[0.15] [background:linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute inset-0 -z-20 opacity-[0.08] mix-blend-soft-light [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />

      {/* Header minimal opcional (puedes quitarlo si ya tienes Navbar) */}
      <div className="absolute top-6 left-0 right-0 z-20 mx-auto flex max-w-6xl items-center justify-between px-6">
        <span className="text-sm uppercase tracking-[0.3em] text-zinc-400">Grimlo</span>
        <div className="hidden gap-6 md:flex text-zinc-400">
          <a href="#servicios" className="hover:text-zinc-200 transition">Servicios</a>
          <a href="#proyectos" className="hover:text-zinc-200 transition">Proyectos</a>
          <a href="#contacto" className="hover:text-zinc-200 transition">Contacto</a>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-28 md:grid-cols-2 md:gap-12 md:pt-40">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs text-zinc-300 backdrop-blur"
          >
            <Sparkles className="h-4 w-4" />
            Webs que venden. Experiencias que enamoran.
          </motion.div>

          <motion.h1
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.9, ease: "easeOut" }}
            className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
          >
            Diseño <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">elegante</span> +
            <span className="bg-gradient-to-r from-zinc-300 to-slate-500 bg-clip-text text-transparent"> rendimiento</span> ={" "}
            <span className="bg-gradient-to-r from-zinc-100 via-zinc-300 to-zinc-100 bg-clip-text text-transparent">resultados</span>
          </motion.h1>

          <motion.p
            initial={{ y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
            className="mt-5 max-w-xl text-lg text-zinc-400"
          >
            Construimos experiencias digitales sobrias, rápidas y accesibles. Gris metálico, tipografía impecable y
            micro-interacciones milimétricas. El estándar Grimlo.
          </motion.p>

          {/* CTA magnético con tilt */}
          <motion.div
            onMouseMove={(e) => {
              const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
              mx.set(e.clientX - (rect.left + rect.width / 2))
              my.set(e.clientY - (rect.top + rect.height / 2))
            }}
            onMouseLeave={() => {
              mx.set(0); my.set(0)
            }}
            style={{ perspective: 1000 }}
            className="mt-9 inline-block"
          >
            <motion.div style={{ rotateX, rotateY }}>
              <Link href="#contacto">
                <Button
                  size="lg"
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-100 to-slate-300 px-8 py-6 text-black shadow-2xl transition hover:shadow-[0_0_80px_rgba(255,255,255,.15)]"
                >
                  <span className="relative z-10 flex items-center text-lg font-semibold">
                    Empezar proyecto <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-0.5" />
                  </span>
                  {/* brillo barrido */}
                  <span className="pointer-events-none absolute inset-y-0 -left-1 w-1/3 -skew-x-12 bg-white/30 blur-md transition-all duration-700 group-hover:left-[110%]" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Marquee sutil de “capacidades” */}
          <div className="mt-8 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <motion.div
              className="flex gap-8 whitespace-nowrap text-sm text-zinc-500"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
            >
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="flex gap-8">
                  <span>SEO técnico</span>
                  <span>Core Web Vitals</span>
                  <span>Accesibilidad AA</span>
                  <span>Animaciones micro</span>
                  <span>CMS sin dolor</span>
                  <span>Integraciones Stripe</span>
                  <span>Arquitectura limpia</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Visual 3D: stack de mockups en parallax */}
        <div className="relative h-[520px] md:h-[600px]">
          {/* halo */}
          <div className="absolute -inset-12 -z-10 rounded-[2rem] bg-[radial-gradient(600px_300px_at_60%_40%,rgba(255,255,255,0.08),transparent_60%)] blur-2xl" />
          {/* tarjeta 1 */}
          <ParallaxCard
            delay={0}
            z={40}
            className="right-8 top-6 h-60 w-[75%] md:w-[70%]"
            label="Landing premium"
            image="/hero/mock-landing-dark.webp"
          />
          {/* tarjeta 2 */}
          <ParallaxCard
            delay={0.1}
            z={28}
            className="left-4 top-40 h-64 w-[70%] md:w-[66%]"
            label="E-commerce elegante"
            image="/hero/mock-ecom.webp"
          />
          {/* tarjeta 3 */}
          <ParallaxCard
            delay={0.2}
            z={16}
            className="right-12 bottom-4 h-56 w-[62%] md:w-[58%]"
            label="Mapa inmobiliario"
            image="/hero/mock-realestate.webp"
          />
          {/* nota: sustituye rutas /hero/*.webp por tus imágenes reales */}
        </div>
      </div>

      {/* Cue scroll */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs text-zinc-500">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2"
        >
          Desliza
          <span className="h-4 w-4 rounded-full border border-zinc-700">
            <motion.span
              className="mx-auto mt-0.5 block h-2 w-0.5 rounded bg-zinc-400"
              animate={{ y: [1, 9, 1], opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>

      {/* Borde superior brillo */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
    </section>
  )
}

/** ---------- ParallaxCard ---------- **/
function ParallaxCard({
  className = "",
  z = 20,
  delay = 0,
  image = "",
  label = "Proyecto",
}: {
  className?: string
  z?: number
  delay?: number
  image?: string
  label?: string
}) {
  return (
    <motion.div
      initial={{ y: 24, opacity: 0, scale: 0.94 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`absolute rounded-3xl border border-white/10 bg-zinc-900/60 p-3 shadow-[0_20px_80px_rgba(0,0,0,.6)] backdrop-blur ${className}`}
      style={{ transform: `translateZ(${z}px)` }}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={image || "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'%3E%3Crect width='100%25' height='100%25' fill='%23121212'/%3E%3C/ svg%3E"}
          alt={label}
          className="h-full w-full object-cover"
          loading="eager"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/0 via-black/0 to-white/5" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm text-zinc-300">{label}</span>
        <span className="text-xs text-zinc-500">Grimlo</span>
      </div>
    </motion.div>
  )
}

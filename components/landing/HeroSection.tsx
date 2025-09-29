// components/landing/HeroSection.tsx
"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroInspoGlass() {
  const ref = useRef<HTMLDivElement | null>(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    setMouse({ x: e.clientX - r.left, y: e.clientY - r.top })
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative isolate min-h-[92vh] w-full overflow-hidden bg-black text-white"
      aria-label="Hero Grimlo"
    >
      {/* Fondo: degradados + glow suave (estilo inspo) */}
      <div className="pointer-events-none absolute inset-0 -z-50">
        <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_20%_20%,rgba(180,180,255,.10),transparent_60%),radial-gradient(900px_600px_at_80%_20%,rgba(255,255,255,.06),transparent_55%),linear-gradient(to_bottom,#020202,#0a0a0a_35%,#000)]" />
        {/* trama sutil */}
        <div className="absolute inset-0 opacity-[0.08] [background:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* spotlight reactivo al cursor */}
      <div
        className="pointer-events-none absolute -z-40 h-[140vmax] w-[140vmax] rounded-full opacity-40 blur-3xl"
        style={{
          left: mouse.x - 70 * 16,
          top: mouse.y - 70 * 16,
          background:
            "radial-gradient(closest-side, rgba(255,255,255,0.10), rgba(180,180,255,0.06), transparent 65%)",
          transition: "left 120ms linear, top 120ms linear",
        }}
      />

      {/* Navbar mínima */}
      <div className="absolute top-6 left-0 right-0 z-20 mx-auto flex max-w-6xl items-center justify-between px-6">
        <span className="text-sm uppercase tracking-[0.3em] text-zinc-400">Grimlo</span>
        <nav className="hidden gap-6 md:flex text-zinc-400">
          <a href="#services" className="transition hover:text-zinc-200">Servicios</a>
          <a href="#projects" className="transition hover:text-zinc-200">Proyectos</a>
          <a href="#contact" className="transition hover:text-zinc-200">Contacto</a>
        </nav>
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-28 md:grid-cols-2 md:gap-12 md:pt-40">
        {/* Copy */}
        <div>
          <motion.span
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300 backdrop-blur"
          >
            Webs a medida • estilo Awwwards
          </motion.span>

          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.8, ease: "easeOut" }}
            className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
          >
            Diseño <span className="bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">elegante</span> +
            <span className="bg-gradient-to-r from-zinc-200 to-slate-400 bg-clip-text text-transparent"> rendimiento</span> =
            <span className="bg-gradient-to-r from-white via-zinc-200 to-white bg-clip-text text-transparent"> resultados</span>
          </motion.h1>

          <motion.p
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.8, ease: "easeOut" }}
            className="mt-5 max-w-xl text-lg text-zinc-400"
          >
            Sitios ultra-rápidos, accesibles y con estética de vanguardia. Todo con tu marca y sin plantillas genéricas.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="mt-8 flex items-center gap-3"
          >
            <Link href="#contact">
              <Button
                size="lg"
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-100 to-slate-300 px-8 py-6 text-black shadow-2xl transition hover:shadow-[0_0_80px_rgba(255,255,255,.15)]"
              >
                <span className="relative z-10 flex items-center text-lg font-semibold">
                  Empezar proyecto
                  <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-0.5" />
                </span>
                <span className="pointer-events-none absolute inset-y-0 -left-1 w-1/3 -skew-x-12 bg-white/30 blur-md transition-all duration-700 group-hover:left-[110%]" />
              </Button>
            </Link>

            <Link
              href="#services"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80 transition hover:bg-white/10"
            >
              Ver paquetes
              <ChevronDown className="h-4 w-4 transition group-hover:translate-y-0.5" />
            </Link>
          </motion.div>

          {/* Marquee capacidades */}
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
                  <span>Animaciones</span>
                  <span>Integraciones</span>
                  <span>Headless CMS</span>
                  <span>Arquitectura limpia</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Visual: iconos glass flotando (hero limpio, sin GIFs) */}
        <div className="relative h-[520px] md:h-[600px]">
          <div className="absolute -inset-12 -z-10 rounded-[2rem] bg-[radial-gradient(600px_300px_at_60%_40%,rgba(255,255,255,0.08),transparent_60%)] blur-2xl" />
          <GlassIcon src="/icons/icono-glass-world.png"   label="Presencia web"   className="right-4 top-4 h-40 w-40 md:h-48 md:w-48" delay={0} />
          <GlassIcon src="/icons/icono-glass-lupa.png"    label="SEO preciso"     className="left-2 top-40 h-44 w-44 md:h-52 md:w-52" delay={0.12} />
          <GlassIcon src="/icons/icono-glass-soporte.png" label="Soporte cercano" className="right-10 bottom-6 h-40 w-40 md:h-48 md:w-48" delay={0.24} />
          {/* sello brand opcional */}
          <GlassIcon src="/icons/icono-glass-logo.png"    label="Grimlo"          className="left-24 bottom-24 h-24 w-24 md:h-28 md:w-28 opacity-70" delay={0.3} subtle />
        </div>
      </div>

      {/* Cue scroll */}
      <Link
        href="#services"
        className="pointer-events-auto absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-xs text-zinc-500"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-2 hover:text-zinc-300"
        >
          Desliza a paquetes
          <span className="h-4 w-4 overflow-hidden rounded-full border border-zinc-700">
            <motion.span
              className="mx-auto mt-0.5 block h-2 w-0.5 rounded bg-zinc-400"
              animate={{ y: [1, 9, 1], opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </Link>

      {/* fusión con siguiente sección */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black" />
    </section>
  )
}

function GlassIcon({
  src,
  label,
  className = "",
  delay = 0,
  subtle = false,
}: {
  src: string
  label: string
  className?: string
  delay?: number
  subtle?: boolean
}) {
  return (
    <motion.figure
      initial={{ y: 24, opacity: 0, scale: subtle ? 0.98 : 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      whileHover={{ y: -6 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className={`absolute rounded-3xl border border-white/10 bg-white/${subtle ? "5" : "8"} p-3 backdrop-blur ${className}`}
    >
      <div className="relative grid place-items-center overflow-hidden rounded-2xl bg-gradient-to-tr from-white/0 via-white/[.02] to-white/[.04]">
        <img src={src} alt={label} className="h-full w-full object-contain" loading="eager" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10" />
      </div>
      <figcaption className="pointer-events-none mt-2 select-none text-center text-xs text-zinc-400">{label}</figcaption>
    </motion.figure>
  )
}

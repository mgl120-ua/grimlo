"use client"

import { useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Rocket, Search, Headset, CheckCircle, Code, Globe } from "lucide-react"
import AnimatedSection from "./AnimatedSection"

type Benefit = { icon: React.ElementType; title: string; desc: string }

const BENEFITS: Benefit[] = [
  { icon: Search,      title: "SEO que posiciona",  desc: "Arquitectura, metadatos y performance listos desde el día 1." },
  { icon: Headset,     title: "Soporte cercano",    desc: "Hablas con personas. Iteramos rápido y contigo." },
  { icon: CheckCircle, title: "100% responsive",    desc: "Pixel-perfect en móvil, tablet y escritorio." },
  { icon: Code,        title: "Código propio",      desc: "Nada de plantillas: control, seguridad y velocidad." },
  { icon: Rocket,      title: "Entrega rápida",     desc: "Adaptamos los tiempos a tus necesidades" },
  { icon: Globe,       title: "Listo para escalar", desc: "Infra, analytics y multilenguaje cuando toque." },
]

export default function BenefitsSection() {
  const ref = useRef<HTMLDivElement | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const spotlightX = useTransform(mx, (v) => `${v}px`)
  const spotlightY = useTransform(my, (v) => `${v}px`)

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set(e.clientX - rect.left)
    my.set(e.clientY - rect.top)
  }

  return (
    <section
      id="about"
      className="
        relative w-full py-24 md:py-36
        bg-transparent text-neutral-200
        overflow-hidden
      "
      ref={ref}
      onMouseMove={onMouseMove}
    >
      {/* Fondo continuo estilo Grimlo (sin cortes) */}
      <div className="pointer-events-none absolute inset-0 -z-30">
        {/* misma lógica que tu layout: grid + vignette + noise, pero tenue */}
        <div className="absolute inset-0 bg-black/95" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,#0b0b0b_0%,transparent_60%)]" />
        <div className="absolute inset-0 mix-blend-soft-light opacity-[0.06] [background-image:url('/noise.png')]" />
        {/* Fades superior/inferior para “fusionar” con secciones adyacentes */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Spotlight que sigue el cursor (oscuro/sofisticado) */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[60vh] w-[60vh] rounded-full blur-3xl"
        style={{
          left: spotlightX,
          top: spotlightY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(closest-side, rgba(80,80,90,0.25), rgba(30,30,35,0.18), rgba(15,15,18,0.0))",
        }}
      />

      <div className="relative container mx-auto px-4 md:px-6">
        {/* Encabezado */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2 mb-4 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 text-[11px] uppercase tracking-[0.18em] text-neutral-400 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-zinc-400 via-slate-300 to-zinc-400" />
              Ventajas de trabajar con Gimlo
            </span>

            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
              ¿Por qué elegir{" "}
              <span className="bg-clip-text text-transparent bg-[conic-gradient(from_140deg_at_50%_50%,#e5e7eb_0%,#9aa0a6_20%,#e5e7eb_40%,#9aa0a6_60%,#e5e7eb_80%,#e5e7eb_100%)]">
                Gimlo
              </span>
              ?
            </h2>

            <p className="mt-5 text-neutral-400/90">
              Diseño minimalista, performance obsesiva y un SEO que no estorba:
              solo lo que suma.
            </p>
          </div>
        </AnimatedSection>

        {/* Grid beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon
            return (
              <AnimatedSection key={b.title} delay={i * 90}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="
                    group relative h-full rounded-2xl p-6 md:p-7
                    bg-white/[0.03] backdrop-blur-md
                    border border-white/[0.08]
                    shadow-[0_12px_60px_rgba(0,0,0,0.35)]
                    will-change-transform
                  "
                >
                  {/* Borde iridiscente sutil */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl"
                    style={{
                      mask:
                        "linear-gradient(#000,#000) content-box, linear-gradient(#000,#000)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      padding: 1,
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(110,110,120,0.18), rgba(255,255,255,0.12))",
                    }}
                  />

                  {/* Glow al hover */}
                  <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_40px_120px_rgba(120,120,150,0.20)]" />

                  {/* “tilt” suave con luz en el borde */}
                  <div className="absolute inset-px rounded-[14px] bg-gradient-to-b from-white/[0.03] to-transparent" />

                  {/* Icono */}
                  <div
                    className="
                      mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl
                      bg-white/[0.05] border border-white/10
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]
                    "
                  >
                    <Icon className="h-6 w-6 text-neutral-200" />
                  </div>

                  <h3 className="text-lg md:text-xl font-medium tracking-tight text-neutral-100">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-neutral-400 leading-relaxed">
                    {b.desc}
                  </p>

                  {/* sub-detalle animado */}
                  <motion.div
                    aria-hidden
                    className="mt-5 h-px w-1/2 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ width: "35%" }}
                    whileHover={{ width: "60%" }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              </AnimatedSection>
            )
          })}
        </div>

        {/* Franja separadora minimal para rematar la fusión con la siguiente sección */}
        <div className="mt-16 md:mt-24 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </section>
  )
}

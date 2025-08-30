"use client"

import { motion } from "framer-motion"
import {
  Rocket,
  Search,
  Headset,
  CheckCircle,
  Code,
  Globe,
} from "lucide-react"
import AnimatedSection from "./AnimatedSection"

type Benefit = {
  icon: React.ElementType
  title: string
  desc: string
}

const BENEFITS: Benefit[] = [
  {
    icon: Search,
    title: "SEO que posiciona",
    desc: "Arquitectura, metadatos y performance listos para competir desde el día 1.",
  },
  {
    icon: Headset,
    title: "Soporte cercano",
    desc: "Nos tienes en el día a día para dudas, cambios y mejoras.",
  },
  {
    icon: CheckCircle,
    title: "100% responsive",
    desc: "Pixel-perfect en móvil, tablet y escritorio. Sin sorpresas.",
  },
  {
    icon: Code,
    title: "Código propio",
    desc: "Sin plantillas. Control total, seguridad y velocidad.",
  },
  {
    icon: Rocket,
    title: "Entrega rápida",
    desc: "Procesos pulidos para publicar en días, no semanas.",
  },
  {
    icon: Globe,
    title: "Listo para escalar",
    desc: "Infraestructura, analytics y multilenguaje cuando lo necesites.",
  },
]

export default function BenefitsSection() {
  return (
    <section
      id="about"
      className="relative w-full py-24 md:py-32 bg-[#0c0c0b] text-white"
    >
      {/* fondo sutil coherente con el resto */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(214,211,209,0.08),transparent_60%)]" />

      <div className="relative container mx-auto px-4 md:px-6">
        {/* Encabezado */}
        <AnimatedSection>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block mb-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-wide text-white/60">
              Ventajas de trabajar con Gimlo
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              ¿Por qué elegir&nbsp;
              <span className="bg-gradient-to-r from-stone-200 via-white to-stone-200 bg-clip-text text-transparent">
                Gimlo
              </span>
              ?
            </h2>
            <p className="mt-4 text-white/70">
              Combinamos diseño, rendimiento y SEO para webs que se ven mejor y
              convierten más.
            </p>
          </div>
        </AnimatedSection>

        {/* Grid de beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon
            return (
              <AnimatedSection key={b.title} delay={i * 100}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="
                    group relative h-full rounded-2xl p-6 md:p-7
                    border border-white/10 bg-neutral-900/80 backdrop-blur
                    shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                  "
                >
                  {/* Icon container */}
                  <div
                    className="
                      mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl
                      bg-white/10 border border-white/10
                      transition-colors group-hover:bg-white/15
                    "
                  >
                    <Icon className="h-6 w-6 text-stone-200" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
                  <p className="text-white/70 leading-relaxed">{b.desc}</p>

                  {/* Borde activo al hover */}
                  <span className="pointer-events-none absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-colors" />
                </motion.div>
              </AnimatedSection>
            )
          })}
        </div>

        {/* Métricas de confianza */}
        <AnimatedSection delay={100}>
          <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { k: "50+", v: "proyectos entregados" },
              { k: "7 días", v: "media de implementación" },
              { k: "90+ /100", v: "Lighthouse performance" },
              { k: "99.9%", v: "uptime en producción" },
            ].map((m) => (
              <div
                key={m.v}
                className="rounded-2xl border border-white/10 bg-neutral-900/60 px-5 py-6 text-center"
              >
                <div className="text-2xl md:text-3xl font-extrabold">{m.k}</div>
                <div className="mt-1 text-xs md:text-sm text-white/60">{m.v}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

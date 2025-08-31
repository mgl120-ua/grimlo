"use client"

import { useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

type Pkg = {
  name: string
  headline: string
  description: string
  benefits: string[]
  oldPrice?: string
  price: string
  cta: string
}

export default function PackageSection({ packagesRef }: { packagesRef: React.RefObject<HTMLDivElement> }) {
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const packages: Pkg[] = useMemo(
    () => [
      {
        name: "LITE WEB",
        headline: "Tu primera web profesional lista en días",
        description:
          "Ideal para portfolios, landings y presentaciones de marca. Visibilidad rápida con estilo moderno y contacto directo.",
        benefits: ["Diseño responsive", "SEO básico", "Formulario de contacto"],
        oldPrice: "€300",
        price: "€150",
        cta: "Contáctanos",
      },
      {
        name: "ADVANCED WEB",
        headline: "Gestiona tu contenido sin programar",
        description:
          "Multipágina con panel de administración. Perfecta para inmobiliarias, academias y catálogos con control total.",
        benefits: ["CMS intuitivo", "SEO avanzado", "Diseño profesional"],
        oldPrice: "€500",
        price: "€250",
        cta: "Solicitar esta web",
      },
      {
        name: "ECOMMERCE",
        headline: "Convierte tu web en una tienda online",
        description:
          "Catálogo, carrito y pagos online seguros. Panel para gestionar productos y pedidos.",
        benefits: ["Pagos integrados", "Catálogo ilimitado", "Gestión de pedidos"],
        oldPrice: "€1000",
        price: "€500",
        cta: "Lanza tu tienda",
      },
      {
        name: "FULL CUSTOM",
        headline: "Soluciones digitales a medida",
        description:
          "Backend robusto y funcionalidades personalizadas para SaaS, plataformas y proyectos ambiciosos.",
        benefits: ["Funcionalidades a medida", "Escalable y rápido", "Diseño 100% alineado"],
        price: "Consultar",
        cta: "Habla con nosotros",
      },
    ],
    []
  )

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const amount = Math.max(el.clientWidth * 0.9, 280) // buen paso en móvil
    el.scrollTo({ left: dir === "left" ? el.scrollLeft - amount : el.scrollLeft + amount, behavior: "smooth" })
  }

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      id="services"
      ref={packagesRef as any}
      className="relative w-full bg-black py-28 text-white"
      aria-labelledby="packages-title"
    >
      {/* Header */}
      <div className="relative mx-auto max-w-4xl px-6 text-center mb-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed"
        >
          Elige la web que mejor se adapta a tu proyecto y empieza a{" "}
          <span className="font-semibold text-white">atraer clientes, vender online y destacar</span>.
        </motion.p>
      </div>

      {/* Carrusel + Botones móviles */}
      <div className="relative">
        {/* Botones visibles SOLO en móvil/tablet, ocultos en desktop */}
        <div className="lg:hidden pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Ver paquetes anteriores"
            className="pointer-events-auto grid place-items-center h-11 w-11 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 active:scale-95 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Ver siguientes paquetes"
            className="pointer-events-auto grid place-items-center h-11 w-11 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 active:scale-95 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto px-8 scrollbar-hide scroll-smooth
                     sm:px-12 md:px-16
                     lg:grid lg:grid-cols-4 lg:gap-10 lg:px-12 lg:overflow-visible"
        >
          {packages.map((pkg, i) => (
            <motion.article
              key={pkg.name}
              className="
                group relative snap-center flex-shrink-0 w-[82%] sm:w-[60%] md:w-[46%] lg:w-full
                rounded-3xl p-8 flex flex-col justify-between
                border border-white/10 bg-gradient-to-br from-neutral-900/80 to-neutral-950/90
                shadow-[0_0_40px_-10px_rgba(255,255,255,0.08)]
                transition-all duration-300 hover:shadow-[0_0_80px_-10px_rgba(255,255,255,0.15)]
                hover:-translate-y-2
              "
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold tracking-wide mb-2 bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                {pkg.name}
              </h3>
              <div className="h-[2px] w-16 bg-gradient-to-r from-white/80 to-white/10 rounded-full mb-4" />

              <p className="text-lg md:text-xl font-medium text-white/80 mb-3">{pkg.headline}</p>
              <p className="text-white/70 text-sm md:text-base mb-6">{pkg.description}</p>

              <ul className="text-white/80 text-sm space-y-2 mb-6">
                {pkg.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-white/60" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div>
                {pkg.oldPrice ? (
                  <p className="text-sm text-white/50 line-through">{pkg.oldPrice}</p>
                ) : (
                  <p aria-hidden className="h-5" />
                )}
                <p className="text-3xl font-extrabold mb-4">{pkg.price}</p>

                <Button
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="relative w-full px-6 py-3 rounded-xl font-semibold text-black
                             bg-gradient-to-r from-zinc-200 to-zinc-400
                             hover:from-white hover:to-zinc-200
                             shadow-[0_0_30px_-5px_rgba(255,255,255,0.25)] transition"
                >
                  {pkg.cta}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useRef, useMemo } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react"
import AnimatedSection from "./AnimatedSection"

type Pkg = {
  name: string
  headline: string
  description: string
  benefits: string[]
  oldPrice?: string
  price: string
  cta: string
  link: string
}

export default function PackageSection({ packagesRef }: { packagesRef: React.RefObject<HTMLDivElement> }) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const MotionButton = motion(Button)

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
        cta: "Contactanos",
        link: "/lite-web",
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
        link: "#",
      },
      {
        name: "ECOMMERCE",
        headline: "Convierte tu web en una tienda online",
        description:
          "Catálogo, carrito y pagos online seguros. Panel para gestionar productos y pedidos.",
        benefits: ["Pagos integrados", "Catálogo ilimitado", "Gestión de pedidos"],
        oldPrice: "€1000",
        price: "€500",
        cta: "Lanza tu tienda con nosotros",
        link: "#",
      },
      {
        name: "FULL CUSTOM",
        headline: "Soluciones digitales a medida",
        description:
          "Backend robusto y funcionalidades personalizadas para SaaS, plataformas y proyectos ambiciosos.",
        benefits: ["Funcionalidades a medida", "Escalable y rápido", "Diseño 100% alineado"],
        oldPrice: "",
        price: "Consultar",
        cta: "Habla con nosotros",
        link: "#",
      },
    ],
    []
  )

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current
    if (!el) return
    const { scrollLeft, clientWidth } = el
    const to = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
    el.scrollTo({ left: to, behavior: "smooth" })
  }

  const featuredIndex = 1 // destacar ADVANCED

  return (
    <section
      id="services"
      ref={packagesRef as any}
      className="relative w-full bg-[#0c0c0b] py-20 text-white"
      aria-labelledby="packages-title"
    >
      {/* Header mejorado */}
      <div className="relative mx-auto max-w-3xl px-6 text-center mb-16">
        <span className="inline-block mb-4 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-wide text-white/60">
          Nuestros Servicios
        </span>

        

        <p className="text-base md:text-lg text-white/60 leading-relaxed">
          Elige la web que mejor se adapta a tu proyecto y empieza a{" "}
          <span className="font-semibold text-white">atraer clientes, vender online y destacar</span>.
        </p>
      </div>

      {/* Cards */}
      <div className="relative">
        {/* Botones de scroll mobile */}
        <button
          onClick={() => scroll("left")}
          aria-label="Ver paquetes anteriores"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 lg:hidden"
        >
          ‹
        </button>

        <div
          ref={scrollRef}
          className="
            flex gap-8 overflow-x-auto snap-x snap-mandatory px-8 scrollbar-hide scroll-smooth
            sm:px-12 md:px-16
            lg:grid lg:grid-cols-4 lg:gap-8 lg:px-8 lg:overflow-visible
          "
        >
          {packages.map((pkg, i) => {
            const featured = i === featuredIndex
            return (
              <motion.article
                key={pkg.name}
                className={`
                  relative snap-center flex-shrink-0 w-[82%] sm:w-[60%] md:w-[46%] lg:w-full
                  rounded-2xl p-8
                  border ${featured ? "border-stone-300/30" : "border-stone-200/10"}
                  bg-neutral-900/80 backdrop-blur
                  shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                  /* 👉 claves para alinear */
                  min-h-[560px] lg:min-h-[620px] flex flex-col
                `}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -6 }}
              >
                {/* --- BLOQUE SUPERIOR (crece) --- */}
                <div className="flex-1">
                  {/* Badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs text-white/70">
                      {pkg.name}
                    </span>
                    {featured && (
                      <span className="rounded-full bg-stone-200 text-black text-xs font-semibold px-3 py-1">
                        Más popular
                      </span>
                    )}
                  </div>

                  {/* Headline + descripción */}
                  <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                    {pkg.headline}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base mb-4">
                    {pkg.description}
                  </p>

                  {/* Beneficios */}
                  <ul className="text-white/80 text-sm space-y-2">
                    {pkg.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-stone-300" />
                          <span>{b}</span>
                        </li>
                    ))}
                  </ul>
                </div>

                {/* --- BLOQUE INFERIOR (fijo) --- */}
                <div className="mt-6">
                  {pkg.oldPrice ? (
                    <p className="text-sm text-white/50 line-through">{pkg.oldPrice}</p>
                  ) : (
                    <p aria-hidden className="h-5" />
                  )}

                  <p className="text-3xl font-extrabold mb-4">
                    {pkg.price}
                  </p>

                  <div className="flex flex-col gap-3">
                    <Button
                      asChild
                      className={`px-6 py-3 rounded-full ${featured ? "bg-white text-black hover:bg-stone-100" : "bg-stone-200 text-black hover:bg-stone-300"} font-medium`}
                    >
                      <Link href={pkg.link}>
                        Ver ejemplo
                      </Link>
                    </Button>

                    <Button className="px-6 py-3 rounded-full bg-transparent text-white border border-white/25 hover:border-white/50">
                      {pkg.cta}
                    </Button>
                  </div>
                </div>
              </motion.article>
            )
          })}

          
        </div>

        <button
          onClick={() => scroll("right")}
          aria-label="Ver siguientes paquetes"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 lg:hidden"
        >
          ›
        </button>
      </div>
    </section>
  )
}

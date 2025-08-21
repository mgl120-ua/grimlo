"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import AnimatedSection from "./AnimatedSection"

export default function PackageSection({ packagesRef }) {
  const scrollRef = useRef(null)

  const packages = [
    {
      name: "LITE WEB",
      headline: "Tu espacio en internet",
      description:
        "Diseñada para darte visibilidad rápida y contacto directo vía email.",
      benefits: [
        "Diseño responsive y moderno",
        "Optimización SEO básica",
        "Formulario de contacto integrado",
      ],
      oldPrice: "€300",
      price: "€150",
      cta: "Contactanos",
      link: "/lite-web",
    },
    {
      name: "ADVANCED WEB",
      headline: "Gestiona tu contenido sin programar",
      description:
        "Web multipágina con panel de administración intuitivo. Perfecta para catálogos o cualquier negocio que necesite control total sobre su contenido.",
      benefits: [
        "Panel de administración fácil de usar",
        "SEO avanzado para posicionar mejor",
        "Diseño adaptable y profesional",
      ],
      oldPrice: "€500",
      price: "€250",
      cta: "Solicitar este paquete",
      link: "#",
    },
    {
      name: "ECOMMERCE",
      headline: "Convierte tu web en una tienda online completa",
      description:
        "Vende online con un ecommerce seguro y escalable. Incluye catálogo, carrito de compras, pagos online y un panel de gestión para tus productos y pedidos.",
      benefits: [
        "Pagos seguros integrados",
        "Catálogo ilimitado",
        "Panel de gestión de pedidos",
      ],
      oldPrice: "€1000",
      price: "€500",
      cta: "Lanzar mi tienda online",
      link: "#",
    },
    {
      name: "FULL CUSTOM",
      headline: "Soluciones digitales únicas para tu proyecto",
      description:
        "Desarrollo web a medida con backend robusto y funcionalidades personalizadas. Ideal para startups, SaaS, plataformas y proyectos que requieren innovación real.",
      benefits: [
        "Funcionalidades personalizadas",
        "Escalabilidad y rendimiento",
        "Diseño 100% adaptado a tu idea",
      ],
      oldPrice: "ㅤㅤㅤㅤㅤ",
      price: "Consultar",
      cta: "Habla con nosotros",
      link: "#",
    },
  ]


  const scroll = (direction) => {
    if (!scrollRef.current) return
    const { scrollLeft, clientWidth } = scrollRef.current
    const scrollTo =
      direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth
    scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
  }

  return (
    <section
      ref={packagesRef}
      className="relative w-full bg-black py-20 text-white"
      aria-labelledby="packages-title"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          id="packages-title"
          className="text-center text-4xl md:text-6xl font-extrabold mb-12"
        >
          Paquetes Web para Impulsar tu Negocio
        </h2>
        <p className="text-center text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-16">
          Elige el plan que mejor se adapta a tu proyecto y empieza a{" "}
          <span className="font-semibold text-white">
            atraer clientes, vender online y destacar en internet
          </span>.
        </p>
      </div>

      <div className="relative">
        {/* Botones de scroll solo en móvil */}
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
            lg:grid lg:grid-cols-4 lg:gap-10 lg:px-8 lg:overflow-visible
          "
        >

          {packages.map((pkg, i) => (
            <motion.article
              key={i}
              className="
                snap-center flex-shrink-0 w-[80%] sm:w-[60%] md:w-[45%]
                lg:w-full
                bg-neutral-900 rounded-2xl shadow-xl p-8 border border-neutral-800
              "
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <AnimatedSection>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {pkg.name}
                </h3>
                <p className="text-lg font-semibold text-white mb-3">
                  {pkg.headline}
                </p>
                <p className="text-gray-300 text-sm md:text-base mb-4">
                  {pkg.description}
                </p>
                <ul className="text-gray-400 text-sm space-y-2 mb-6 list-disc list-inside">
                  {pkg.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
                <div className="mb-6">
                  {pkg.oldPrice && (
                    <p className="text-lg text-gray-400 line-through">
                      {pkg.oldPrice}
                    </p>
                  )}
                  <p className="text-3xl font-extrabold text-white-400 drop-shadow-md">
                    {pkg.price}
                  </p>
                </div>


                <div className="flex flex-col gap-3">
                  <Button
                    asChild
                    className="px-6 py-3 rounded-full bg-gray-800 text-white hover:bg-gray-700"
                  >
                    <Link href={pkg.link} title={`Ver ejemplo de ${pkg.name}`}>
                      Ver Ejemplo{" "}
                      <ArrowRight className="ml-2 h-4 w-4 inline-block" />
                    </Link>
                  </Button>
                  <Button
                    aria-label={pkg.cta}
                    className="px-6 py-3 rounded-full bg-white text-black hover:bg-gray-200"
                  >
                    {pkg.cta}
                  </Button>
                </div>


              </AnimatedSection>
            </motion.article>
          ))}
        </div>

        {/* Botones de scroll solo en móvil */}
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

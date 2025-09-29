// components/landing/PackageSection.tsx
"use client"

import { useRef, useMemo, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react"

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
  const [active, setActive] = useState(0)
  const [offsets, setOffsets] = useState<number[]>([])

  const packages: Pkg[] = useMemo(
    () => [
      { name: "LITE WEB", headline: "Tu primera web profesional lista en días",
        description:"Ideal para portfolios, landings y presentaciones de marca. Visibilidad rápida con estilo moderno y contacto directo.",
        benefits: ["Diseño responsive","SEO básico","Formulario de contacto"],
        oldPrice:"€300", price:"€150", cta:"Contáctanos" },
      { name: "ADVANCED WEB", headline: "Gestiona tu contenido sin programar",
        description:"Multipágina con panel de administración. Perfecta para catálogos con control total.",
        benefits: ["Diseño responsive","SEO técnico","Gestión intuitiva"],
        oldPrice:"€500", price:"€250", cta:"Solicitar esta web" },
      { name: "ECOMMERCE", headline: "Convierte tu web en una tienda online",
        description:"Catálogo, carrito y pagos online seguros. Panel para gestionar productos y pedidos.",
        benefits: ["Pagos integrados","Catálogo ilimitado","Gestión intuitiva"],
        oldPrice:"€1000", price:"€500", cta:"Lanza tu tienda" },
      { name: "FULL CUSTOM", headline: "Soluciones digitales a medida",
        description:"Backend robusto y funcionalidades personalizadas para SaaS, plataformas y proyectos ambiciosos.",
        benefits: ["Funcionalidades a medida","Escalable y rápido","Diseño adaptado"],
        price:"Consultar", cta:"Habla con nosotros" },
    ], []
  )

  // medir offsets para snap real al centro
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const update = () => {
      const children = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"))
      setOffsets(children.map((c) => c.offsetLeft - (el.clientWidth - c.clientWidth) / 2))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    Array.from(el.children).forEach((c) => ro.observe(c))
    return () => ro.disconnect()
  }, [])

  // marcar activo en scroll
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const x = el.scrollLeft
        let idx = 0, min = Infinity
        offsets.forEach((off, i) => {
          const d = Math.abs(off - x)
          if (d < min) { min = d; idx = i }
        })
        setActive(idx)
      })
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => { el.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf) }
  }, [offsets])

  const go = (i: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: offsets[i] ?? 0, behavior: "smooth" })
  }
  const step = (dir: "left" | "right") => go(Math.min(packages.length - 1, Math.max(0, active + (dir === "left" ? -1 : 1))))

  return (
    <section
      id="services"
      ref={packagesRef as any}
      className="relative w-full neo-bg pt-24 pb-28 text-white"
      aria-labelledby="packages-title"
    >
      {/* fusión con secciones */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/60 to-transparent" />
      <div className="absolute inset-0 -z-10 opacity-[0.12] [background:linear-gradient(to_right,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute inset-x-0 -top-40 -z-20 h-[40rem] bg-[radial-gradient(700px_320px_at_20%_0%,rgba(255,255,255,.07),transparent_60%),radial-gradient(600px_280px_at_90%_10%,rgba(255,255,255,.06),transparent_65%)] blur-2xl" />

      {/* header */}
      <div className="relative mx-auto max-w-6xl px-6 text-center mb-12">
        <motion.div initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} transition={{duration:.6}} viewport={{once:true}}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/70 backdrop-blur">
          Nuestros paquetes
        </motion.div>
        <motion.h2 id="packages-title" initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} transition={{duration:.7,delay:.05}} viewport={{once:true}}
          className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
          Elige el <span className="bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">camino</span> que mejor encaja
        </motion.h2>
        <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} transition={{duration:.7,delay:.1}} viewport={{once:true}}
          className="mt-4 text-base sm:text-lg md:text-xl text-white/70">
          Empieza a <span className="font-semibold text-white">atraer clientes</span>, vender online y destacar.
        </motion.p>
      </div>

      {/* carrusel */}
      <div className="relative max-w-[100vw]">
        {/* botones fuera de la card */}
        <div className="lg:hidden absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-1 pointer-events-none">
          <button onClick={() => step("left")} aria-label="Ver paquetes anteriores"
            className="pointer-events-auto grid place-items-center h-10 w-10 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 active:scale-95 transition translate-x-[-6px]"
            style={{ top: "50%" }}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button onClick={() => step("right")} aria-label="Ver siguientes paquetes"
            className="pointer-events-auto grid place-items-center h-10 w-10 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 active:scale-95 transition translate-x-[6px]"
            style={{ top: "50%" }}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div
          ref={scrollRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Paquetes"
          className="relative mx-auto flex gap-6 px-5 sm:px-8 md:px-12 overflow-x-auto scroll-smooth snap-x snap-mandatory
                     lg:grid lg:grid-cols-4 lg:gap-10 lg:px-12 lg:overflow-visible
                     [scrollbar-width:none] [-ms-overflow-style:none]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Oculta scrollbar en WebKit */}
          <style dangerouslySetInnerHTML={{ __html: `[data-scroll]::-webkit-scrollbar{display:none}` }} />
          <div data-scroll className="contents" />

          {packages.map((pkg, i) => (
            <motion.article
              key={pkg.name}
              data-card
              className="
                snap-center relative flex-shrink-0 w-[88vw] sm:w-[72vw] md:w-[56vw] lg:w-full
                rounded-3xl overflow-hidden grid grid-rows-[auto_1fr_auto]
                min-h-[520px] sm:min-h-[540px] p-6 sm:p-7 md:p-8
                neo-bg neo-soft transition-transform duration-300
                focus:outline-none focus:ring-2 focus:ring-white/20
              "
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              viewport={{ once: true, amount: 0.25 }}
              tabIndex={0}
            >

              {/* glow */}
              <div className="pointer-events-none absolute -inset-px -z-10 rounded-[1.6rem]
                              bg-[radial-gradient(140px_70px_at_20%_0%,rgba(255,255,255,.12),transparent_60%)]
                              opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

              {/* header */}
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-2 bg-gradient-to-r from-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                  {pkg.name}
                </h3>
                <div className="h-[2px] w-16 bg-gradient-to-r from-white/80 to-white/10 rounded-full mb-3 sm:mb-4" />
                <p className="text-base sm:text-lg md:text-xl font-medium text-white/85">
                  {pkg.headline}
                </p>
              </div>

              {/* contenido */}
              <div className="mt-3 sm:mt-4">
                <p className="text-white/70 text-sm md:text-base mb-4 sm:mb-6">
                  {pkg.description}
                </p>
                <ul className="text-white/80 text-sm space-y-2">
                  {pkg.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 text-white/60" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* footer pegado */}
              <div className="mt-5">
                {pkg.oldPrice ? (
                  <p className="text-xs sm:text-sm text-white/50 line-through">{pkg.oldPrice}</p>
                ) : <span className="block h-4" aria-hidden />}
                <p className="text-2xl sm:text-3xl font-extrabold mb-3 sm:mb-4">{pkg.price}</p>
                <Button
                  onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                  className="w-full px-5 py-3 rounded-xl font-semibold text-black bg-white hover:bg-neutral-200">
                  {pkg.cta}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* dots bien posicionados dentro del carrusel */}
        <div className="lg:hidden absolute left-1/2 -translate-x-1/2 bottom-[-12px] flex items-center justify-center gap-2">
          {packages.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Ir al paquete ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${i === active ? "w-6 bg-white/90" : "w-2.5 bg-white/45 hover:bg-white/70"}`}
            />
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
    </section>
  )
}

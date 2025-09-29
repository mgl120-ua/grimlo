
"use client"

import { useRef } from "react"
import ProjectsRail from "@/components/grimlo/showcase/ProjectsRail"
import ProjectsMasonry from "@/components/grimlo/showcase/ProjectsMasonry"
import SectionHeader from "@/components/grimlo/showcase/SectionHeader"
import USPStack from "@/components/grimlo/showcase/USPStack"
import { ACCENT } from "@/components/grimlo/showcase/variants"
import type { Project, USP } from "@/components/grimlo/showcase/types"

const PROJECTS: Project[] = [
  {
    src: "https://cdn.prod.website-files.com/670bf3be6040f597f238f1be/676067320fe2976440608d91_2-iPhones-Rock-v2.avif",
    alt: "two-iphones-mockup-nue",
    tags: ["Web Design", "Branding", "UX"],
    pad: "bottom",
  },
  {
    src: "https://cdn.prod.website-files.com/670bf3be6040f597f238f1be/67619e260472d068eedf9d32_patterson-partners-iMac-Mockup-2.avif",
    alt: "imac-mockup",
    tags: ["Web Design", "Development"],
    pad: "top",
  },
  {
    src: "https://cdn.prod.website-files.com/670bf3be6040f597f238f1be/676067d008a292d32efce013_Elevate-mockup-2.avif",
    alt: "elevate-mockup",
    tags: ["Web Design", "Animation"],
    pad: "bottom",
  },
  {
    src: "https://cdn.prod.website-files.com/670bf3be6040f597f238f1be/6760680d9cbe189682350ae4_ardell-4-device-mockup.avif",
    alt: "ardell-4-device",
    tags: ["UX / UI", "SEO"],
    pad: "top",
  },
]

const USPS: USP[] = [
  {
    icon: "https://cdn.prod.website-files.com/670bf3be6040f597f238f1be/6767fdbf42e5edb1031964c5_paint-kit-dynamic-clay.avif",
    title: "Captar la atención",
    text: "Diseño que detiene el scroll y evidencia tu expertise desde el primer segundo.",
  },
  {
    icon: "https://cdn.prod.website-files.com/670bf3be6040f597f238f1be/6767fbbbfa536c3a8d950b46_thumb-up-dynamic-clay.avif",
    title: "Construir confianza",
    text: "Estrategia para que en 3 segundos sepan por qué eres la mejor opción.",
  },
  {
    icon: "https://cdn.prod.website-files.com/670bf3be6040f597f238f1be/6767fdbf4468e982f4019cba_megaphone-dynamic-clay.avif",
    title: "Atraer más clientes",
    text: "SEO + CRO para aumentar tráfico cualificado y conversión.",
  },
  {
    icon: "https://cdn.prod.website-files.com/670bf3be6040f597f238f1be/6767fdbf6661bd59e5bfcc1d_flash-dynamic-clay.avif",
    title: "Acciones claras",
    text: "Reservas y contacto instantáneo. Menos fricción, menos gestión.",
  },
  {
    icon: "https://cdn.prod.website-files.com/670bf3be6040f597f238f1be/6767fdbf06432a9005a902e1_link-dynamic-clay.avif",
    title: "Experiencia memorable",
    text: "No solo estética: UX cuidada que la gente recuerda.",
  },
]

export default function ShowcaseES() {
  const snapRef = useRef<HTMLDivElement | null>(null)

  return (
    <section className="relative">
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl py-16 lg:py-20">
          <div className="space-y-5">
            <SectionHeader lines={["Sitios web con impacto", " y resultados"]} />
            <p className="max-w-2xl text-base sm:text-lg text-white/70">            
              Diseño, desarrollo y motion cuidadosamente orquestado.
            </p>
          </div>
        </div>
      </div>

      {/* Carrusel / Grid */}
      <div className="px-4 sm:px-6 lg:px-8">
        <ProjectsRail projects={PROJECTS} />
        <ProjectsMasonry projects={PROJECTS} />
      </div>

      {/* How? */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl py-20 lg:py-24">
          <div className="space-y-4">
            <SectionHeader lines={["¿Cómo?", "Así lo hacemos ↓"]} />
          </div>
        </div>
      </div>

      {/* USPs con scroll-snap vertical (sección alta) */}
      <div ref={snapRef} className="relative">
        <div className="h-[70vh] md:h-[60vh] lg:h-[50vh]">
          <div className="px-4 sm:px-6 lg:px-8 h-full">
            <div className="mx-auto max-w-6xl h-full flex items-end">
              <div className="mb-8">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-4 w-4 rounded-full bg-white/10" />
                  <p className="text-white/80">Atrae clientes, y de alto valor.</p>
                </div>
                {/* título */}
                <SectionHeader lines={["Te ayudamos a crecer", "haciendo que tu web trabaje"]} />
              </div>
            </div>
          </div>
        </div>
        <USPStack items={USPS} />
      </div>

      {/* Cierre ancho */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl py-20 lg:py-28">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
              <span className="opacity-20">Atrae clientes premium</span>
              <br className="hidden sm:block" />
              <span className="opacity-20">y consigue más de ellos.</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
"use client"

import { useRef, useCallback } from "react"
import HeroAwwwards from "@/components/landing/HeroSection"
import PackageSection from "@/components/landing/PackageSection"
import BenefitsSection from "@/components/landing/BenefitsSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import ContactSection from "@/components/landing/ContactSection"
import SeamlessDivider from "@/components/landing/SeamlessDivider"
import SharedTicker from "@/components/landing/SharedTicker"
import GrimloShowcaseES from "@/components/grimlo/showcase/ShowcaseES"

export default function LandingPage() {
  const packagesRef = useRef<HTMLDivElement | null>(null)

  const scrollToPackages = useCallback(() => {
    packagesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  return (
    <>  
      {/* Skip link (a11y) */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] rounded bg-white px-3 py-2 text-black"
      >
        Saltar al contenido
      </a>

      <main
        id="main"
        className="flex flex-col min-h-screen bg-black text-white font-sans"
      >
        
      <GrimloShowcaseES />
        {/* HERO */}
        <HeroAwwwards />

        {/* PACKAGES */}
        <div
          id="services"
          ref={packagesRef}
          className="scroll-mt-24 md:scroll-mt-28"
        >
          <PackageSection packagesRef={packagesRef} />
        </div>

        {/* Ticker compartido */}
        <SharedTicker
          items={[
            "Diseño premium",
            "SEO técnico",
            "Entrega rápida",
            "UX personalizado",
            "Soporte cercano",
            "Código propio ",
            "Escalable",
          ]}
        />

        {/* BENEFITS */}
        <div id="about" className="scroll-mt-24 md:scroll-mt-28">
          <BenefitsSection />
        </div>

        {/* CONTACT */}
        <div id="contact" className="scroll-mt-24 md:scroll-mt-28">
          <ContactSection />
        </div>
      </main>
    </>
  )
}

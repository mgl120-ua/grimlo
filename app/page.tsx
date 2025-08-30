"use client"

import { useRef, useCallback } from "react"
import HeroSection from "@/components/landing/HeroSection"
import PackageSection from "@/components/landing/PackageSection"
import BenefitsSection from "@/components/landing/BenefitsSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import ContactSection from "@/components/landing/ContactSection"

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

      <main id="main" className="flex flex-col min-h-screen bg-black text-white font-sans">
        {/* HERO */}
        {/* El propio Hero tiene id="home" */}
        <HeroSection onScroll={scrollToPackages} />

        {/* PACKAGES */}
        {/* Asegúrate de que PackageSection tenga id="services" en su <section> 
            y aplica scroll-mt para compensar la navbar */}
        <div id="services" ref={packagesRef} className="scroll-mt-24 md:scroll-mt-28">
          <PackageSection packagesRef={packagesRef} />
        </div>

        {/* BENEFITS */}
        {/* Asegúrate de que BenefitsSection tenga id="about" en su <section> */}
        <div id="about" className="scroll-mt-24 md:scroll-mt-28">
          <BenefitsSection />
        </div>

        {/* TESTIMONIALS (si lo activas, ponle id="testimonials" y scroll-mt) */}
        {/* <div id="testimonials" className="scroll-mt-24 md:scroll-mt-28">
          <TestimonialsSection />
        </div> */}

        {/* CONTACT */}
        {/* ContactSection ya tiene id="contact" → añade scroll-mt también dentro o aquí */}
        <div className="scroll-mt-24 md:scroll-mt-28">
          <ContactSection />
        </div>
      </main>
    </>
  )
}

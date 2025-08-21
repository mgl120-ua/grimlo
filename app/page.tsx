"use client"
import { useRef, useCallback } from "react"
import HeroSection from "@/components/landing/HeroSection"
import PackageSection from "@/components/landing/PackageSection"
import BenefitsSection from "@/components/landing/BenefitsSection"
import TestimonialsSection from "@/components/landing/TestimonialsSection"
import ContactSection from "@/components/landing/ContactSection"

// Importar más secciones como BenefitsSection, TestimonialsSection, ContactSection

export default function LandingPage() {
  const packagesRef = useRef(null)

  const scrollToPackages = useCallback(() => {
    packagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      <HeroSection onScroll={scrollToPackages} />
      <PackageSection packagesRef={packagesRef} />
      <BenefitsSection/>
      {/*<TestimonialsSection />*/}
      <ContactSection />
    </div>
  )
}

"use client"

import Image from "next/image"
import AnimatedSection from "./AnimatedSection"

export default function TestimonialsSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 text-center">

        {/* Título */}
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">
            Confiado por nuestros clientes
          </h2>
        </AnimatedSection>

        {/* Testimonios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <AnimatedSection delay={100}>
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <p className="text-lg italic mb-4">
                &quot;Gimlo transformó nuestra presencia online. ¡El diseño es elegante y la funcionalidad impecable!&quot;
              </p>
              <p className="font-semibold text-gray-300">- Jane Doe, CEO de InnovateCo</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <p className="text-lg italic mb-4">
                &quot;Servicio excepcional y un sitio web verdaderamente premium. Recomiendo encarecidamente a Gimlo para cualquier negocio.&quot;
              </p>
              <p className="font-semibold text-gray-300">- John Smith, Fundador de Elite Properties</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
              <p className="text-lg italic mb-4">
                &quot;El equipo de Gimlo superó nuestras expectativas. Nuestro nuevo sitio de comercio electrónico es un cambio de juego.&quot;
              </p>
              <p className="font-semibold text-gray-300">- Emily White, Directora de Marketing en FashionHub</p>
            </div>
          </AnimatedSection>
        </div>

        {/* Carrusel horizontal de logos */}
        <AnimatedSection delay={400}>
          <div className="flex overflow-x-auto whitespace-nowrap py-4 scroll-smooth scrollbar-hide">
            <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16 px-4">
              {Array.from({ length: 7 }).map((_, idx) => (
                <Image
                  key={idx}
                  src="/placeholder.svg?height=70&width=140"
                  width="140"
                  height="70"
                  alt={`Logotipo de Cliente ${idx + 1}`}
                  className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                />
              ))}
            </div>
          </div>
        </AnimatedSection>

      </div>
    </section>
  )
}

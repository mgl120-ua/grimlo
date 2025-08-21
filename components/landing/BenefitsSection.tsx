"use client"

import { Rocket, Search, Headset, CheckCircle, Code, Globe } from 'lucide-react'
import AnimatedSection from "./AnimatedSection"

export default function BenefitsSection() {
  return (
    <section className="w-full py-24 md:py-32 bg-white text-black">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">
            ¿Por qué elegir Gimlo?
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatedSection delay={100}>
            <div className="flex flex-col items-center p-6 group">
              <Search className="h-12 w-12 mb-4 text-black transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-2">Optimización SEO</h3>
              <p className="text-gray-600">
                Asegura que tu sitio se posicione alto en los motores de búsqueda para atraer más visitantes.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex flex-col items-center p-6 group">
              <Headset className="h-12 w-12 mb-4 text-black transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-2">Soporte Técnico Incluido</h3>
              <p className="text-gray-600">
                Soporte dedicado para ayudarte con cualquier necesidad técnica.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={600}>
            <div className="flex flex-col items-center p-6 group">
              <CheckCircle className="h-12 w-12 mb-4 text-black transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-2">Diseño Adaptable (Responsive)</h3>
              <p className="text-gray-600">
                Tu sitio web se verá impresionante en cualquier dispositivo, desde computadoras de escritorio hasta móviles.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={900}>
            <div className="flex flex-col items-center p-6 group">
              <Code className="h-12 w-12 mb-4 text-black transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-2">Webs 100% a Código</h3>
              <p className="text-gray-600">
                Creamos sitios completamente codificados para máximo control, velocidad y seguridad.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={1200}>
            <div className="flex flex-col items-center p-6 group">
              <Rocket className="h-12 w-12 mb-4 text-black transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
              <p className="text-gray-600">
                Ten tu sitio web listo y funcionando rápidamente sin comprometer la calidad.
              </p>
            </div>
          </AnimatedSection>


          <AnimatedSection delay={1600}>
            <div className="flex flex-col items-center p-6 group">
              <Globe className="h-12 w-12 mb-4 text-black transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold mb-2">Presencia Global</h3>
              <p className="text-gray-600">
                Tu sitio puede alcanzar clientes en cualquier parte del mundo con total facilidad.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

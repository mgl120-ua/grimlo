"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowRight, PhoneIcon as Whatsapp } from "lucide-react"
import Link from "next/link"
import AnimatedSection from "./AnimatedSection"

export default function ContactSection() {
  const [selectedPackage, setSelectedPackage] = useState("lite")

  return (
    <section className="w-full py-24 md:py-32 bg-black text-white text-center relative border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">

        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            ¿Listo para lanzar tu sitio web?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10">
            Selecciona el paquete que mejor se adapte a tu proyecto y cuéntanos tus dudas.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <form className="flex flex-col gap-6 text-left bg-gray-900 p-8 rounded-2xl shadow-lg">
            {/* Selector de Paquetes */}
            <div>
              <Label className="mb-2 block text-gray-300 font-medium">
                Selecciona un paquete
              </Label>
              <RadioGroup
                value={selectedPackage}
                onValueChange={setSelectedPackage}
                className="grid gap-4"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="lite" id="lite" />
                  <Label htmlFor="lite" className="cursor-pointer">LITE WEB – €99</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced" className="cursor-pointer">ADVANCED WEB – €250</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="ecommerce" id="ecommerce" />
                  <Label htmlFor="ecommerce" className="cursor-pointer">ECOMMERCE – €500</Label>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom" className="cursor-pointer">FULL CUSTOM – Consultar</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Email */}
            <Input
              type="email"
              placeholder="Introduce tu correo electrónico"
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:ring-white focus:border-white"
              required
            />

            {/* Mensaje */}
            <Textarea
              placeholder="Cuéntanos tus dudas o qué necesitas..."
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:ring-white focus:border-white min-h-[120px]"
            />

            {/* Botón */}
            <Button className="px-8 py-4 text-lg font-medium rounded-xl bg-white text-black hover:bg-gray-200 transition-colors">
              Enviar Solicitud
            </Button>
          </form>
        </AnimatedSection>
      </div>

      {/* Icono flotante de WhatsApp */}
      <Link
        href="https://wa.me/YOUR_WHATSAPP_NUMBER" // Reemplazar con número real
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50"
        aria-label="Chatear en WhatsApp"
      >
        <Whatsapp className="h-8 w-8" />
      </Link>
    </section>
  )
}

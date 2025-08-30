"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PhoneIcon as Whatsapp } from "lucide-react"
import { motion } from "framer-motion"
import AnimatedSection from "./AnimatedSection"

export default function ContactSection() {
  const [selectedPackage, setSelectedPackage] = useState("lite")
  const MotionButton = motion(Button)

  return (
    <section className="w-full py-24 md:py-32 bg-black text-white text-center relative border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6 max-w-2xl">

        <AnimatedSection>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
            ¿Listo para lanzar tu sitio web?
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <motion.form
            className="flex flex-col gap-6 text-left bg-neutral-900 p-8 rounded-2xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Email */}
            <Input
              type="email"
              placeholder="Introduce tu correo electrónico"
              className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 px-4 py-3 rounded-xl focus:ring-white focus:border-white"
              required
            />

            {/* Mensaje */}
            <Textarea
              placeholder="Cuéntanos tus dudas o qué necesitas..."
              className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 px-4 py-3 rounded-xl focus:ring-white focus:border-white min-h-[120px]"
            />

            {/* Botón */}
            <MotionButton
              className="px-8 py-4 text-lg font-medium rounded-xl bg-white text-black hover:bg-neutral-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enviar Solicitud
            </MotionButton>
          </motion.form>
        </AnimatedSection>
      </div>

      {/* Icono flotante de WhatsApp */}
      <motion.a
        href="https://wa.me/YOUR_WHATSAPP_NUMBER" // Reemplazar con número real
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 z-50"
        aria-label="Chatear en WhatsApp"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        whileHover={{ scale: 1.1 }}
      >
        <Whatsapp className="h-8 w-8" />
      </motion.a>
    </section>
  )
}

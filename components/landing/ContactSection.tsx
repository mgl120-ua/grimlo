"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PhoneIcon as Whatsapp, ArrowRight } from "lucide-react"
import AnimatedSection from "./AnimatedSection"

export default function ContactSection() {
  const [selectedPackage, setSelectedPackage] = useState("lite")
  const [budget, setBudget] = useState("250-500")
  const [urgency, setUrgency] = useState("15-30")
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!consent) return
    setLoading(true)
    // TODO: sustituye por tu endpoint (Formspree, API propia, etc.)
    // const form = new FormData(e.currentTarget)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setSent(true)
    e.currentTarget.reset()
  }

  return (
    <section
      id="contact"
      className="relative w-full py-24 md:py-32 bg-[#0c0c0b] text-white border-t border-white/10"
      aria-labelledby="contact-title"
    >
      {/* fondo suave coherente con hero */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(214,211,209,0.08),transparent_60%)]" />

      <div className="relative container mx-auto px-4 md:px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Columna izquierda: texto + confianza */}
        <AnimatedSection>
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block mb-3 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-wide text-white/60">
                Hablemos de tu web
              </span>
              <h2 id="contact-title" className="text-4xl md:text-5xl font-extrabold tracking-tight">
                ¿Listo para lanzar tu sitio web?
              </h2>
              <p className="mt-3 text-white/70">
                Responde en <span className="text-white">menos de 24h</span>. También podemos coordinar una
                llamada express para validar objetivos y timings.
              </p>
            </div>

            {/* Chips de beneficios */}
            <ul className="mt-1 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {["Diseño premium", "Entrega rápida", "SEO listo", "Escalable", "Soporte cercano", "Sin permanencia"].map(
                (t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/15 px-3 py-2 text-white/70 text-center"
                  >
                    {t}
                  </li>
                )
              )}
            </ul>

            {/* CTA alternativo WhatsApp */}
            <div className="mt-2 flex items-center gap-3">
              <Link
                href="https://wa.me/34600000000?text=Hola%20quiero%20información%20sobre%20mi%20web" // ← pon tu número
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm hover:border-white/40 transition-colors"
                aria-label="Escribir por WhatsApp"
              >
                <Whatsapp className="h-5 w-5" />
                Escríbenos por WhatsApp
              </Link>
              <span className="text-xs text-white/50">Horario 9:00–19:00 CET</span>
            </div>
          </div>
        </AnimatedSection>

        {/* Columna derecha: formulario */}
        <AnimatedSection delay={120}>
          <motion.form
            onSubmit={onSubmit}
            className="flex flex-col gap-6 bg-neutral-900/80 backdrop-blur rounded-2xl p-6 md:p-8 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Honeypot anti-spam */}
            <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

            {/* Selector de paquete */}
            <div>
              <Label className="mb-3 block text-white/80">Tipo de web</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  { id: "lite", label: "Lite" },
                  { id: "advanced", label: "Advanced" },
                  { id: "ecommerce", label: "Ecommerce" },
                  { id: "custom", label: "Custom" },
                ].map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSelectedPackage(p.id)}
                    className={`rounded-xl px-3 py-2 text-sm border transition-colors ${
                      selectedPackage === p.id
                        ? "border-white bg-white text-black"
                        : "border-white/15 hover:border-white/35 text-white/80"
                    }`}
                    aria-pressed={selectedPackage === p.id}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <input type="hidden" name="package" value={selectedPackage} />
            </div>

            {/* Datos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                name="name"
                placeholder="Tu nombre"
                className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 px-4 py-3 rounded-xl"
                required
              />
              <Input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 px-4 py-3 rounded-xl"
                required
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Teléfono (opcional)"
                className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 px-4 py-3 rounded-xl"
              />
              <Input
                name="website"
                placeholder="Tu web actual (opcional)"
                className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 px-4 py-3 rounded-xl"
              />
            </div>

            {/* Presupuesto & urgencia */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label className="mb-2 block text-white/80">Presupuesto estimado</Label>
                <RadioGroup value={budget} onValueChange={setBudget} className="grid grid-cols-2 gap-2">
                  {[
                    { v: "150-250", l: "150–250€" },
                    { v: "250-500", l: "250–500€" },
                    { v: "500-1000", l: "500–1000€" },
                    { v: "1000+", l: "+1000€" },
                  ].map((o) => (
                    <Label
                      key={o.v}
                      className={`cursor-pointer rounded-xl border px-3 py-2 text-sm ${
                        budget === o.v ? "border-white bg-white text-black" : "border-white/15 hover:border-white/35"
                      }`}
                    >
                      <RadioGroupItem value={o.v} className="sr-only" />
                      {o.l}
                    </Label>
                  ))}
                </RadioGroup>
                <input type="hidden" name="budget" value={budget} />
              </div>

              <div>
                <Label className="mb-2 block text-white/80">¿Para cuándo?</Label>
                <RadioGroup value={urgency} onValueChange={setUrgency} className="grid grid-cols-3 gap-2">
                  {[
                    { v: "7-15", l: "7–15 días" },
                    { v: "15-30", l: "15–30 días" },
                    { v: "30+", l: "30+ días" },
                  ].map((o) => (
                    <Label
                      key={o.v}
                      className={`cursor-pointer rounded-xl border px-3 py-2 text-sm text-center ${
                        urgency === o.v ? "border-white bg-white text-black" : "border-white/15 hover:border-white/35"
                      }`}
                    >
                      <RadioGroupItem value={o.v} className="sr-only" />
                      {o.l}
                    </Label>
                  ))}
                </RadioGroup>
                <input type="hidden" name="urgency" value={urgency} />
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <Label htmlFor="message" className="mb-2 block text-white/80">
                Mensaje
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Cuéntanos tu idea, objetivos y referencias…"
                className="bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 px-4 py-3 rounded-xl min-h-[120px]"
              />
            </div>

            {/* Consentimiento */}
            <label className="flex items-start gap-3 text-sm text-white/70">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-white/30 bg-neutral-800"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
              Acepto la política de privacidad y el tratamiento de mis datos para responder a esta solicitud.
            </label>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="submit"
                disabled={loading || !consent}
                className="flex-1 rounded-xl bg-white text-black hover:bg-stone-100"
              >
                {loading ? "Enviando..." : sent ? "¡Enviado!" : "Enviar solicitud"}
                {!loading && !sent && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>

              <Link
                href="https://wa.me/34600000000?text=Hola%20quiero%20hablar%20sobre%20mi%20web" // ← pon tu número
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 hover:border-white/40"
              >
                <Whatsapp className="h-5 w-5" />
                Hablar por WhatsApp
              </Link>
            </div>

            {/* Microcopy confianza */}
            <p className="text-center text-xs text-white/50">
              Tiempo de respuesta medio: &lt; 24h · No compartimos tus datos con terceros.
            </p>
          </motion.form>
        </AnimatedSection>
      </div>

      {/* Botón flotante WhatsApp (opcional; quítalo si ya usas el CTA arriba) */}
      <motion.a
        href="https://wa.me/34600000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-emerald-500 text-white p-4 rounded-full shadow-lg hover:bg-emerald-600 z-50"
        aria-label="Chatear en WhatsApp"
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        whileHover={{ scale: 1.08 }}
      >
        <Whatsapp className="h-6 w-6" />
      </motion.a>
    </section>
  )
}

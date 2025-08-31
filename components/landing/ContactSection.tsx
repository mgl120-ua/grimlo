"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { PhoneIcon as Whatsapp, ArrowRight, Check, Sparkles } from "lucide-react"
import AnimatedSection from "./AnimatedSection"

type FieldError = Partial<Record<"name" | "email" | "message", string>>

export default function ContactSection() {
  const [selectedPackage, setSelectedPackage] = useState("lite")
  const [budget, setBudget] = useState("250-500")
  const [urgency, setUrgency] = useState("15-30")
  const [consent, setConsent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [errors, setErrors] = useState<FieldError>({})

  // Spotlight
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const spotX = useTransform(mx, (v) => `${v}px`)
  const spotY = useTransform(my, (v) => `${v}px`)
  function onMove(e: React.MouseEvent) {
    const r = wrapRef.current?.getBoundingClientRect()
    if (!r) return
    mx.set(e.clientX - r.left)
    my.set(e.clientY - r.top)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = (form.get("name") || "").toString().trim()
    const email = (form.get("email") || "").toString().trim()
    const message = (form.get("message") || "").toString().trim()

    const nextErrors: FieldError = {}
    if (!name) nextErrors.name = "Tu nombre es necesario."
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Escribe un email válido."
    if (!message) nextErrors.message = "Cuéntanos algo para empezar."
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0 || !consent) return

    setLoading(true)
    // TODO: sustituye por tu endpoint real
    await new Promise((r) => setTimeout(r, 1100))
    setLoading(false)
    setSent(true)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section
      id="contact"
      className="relative w-full py-28 md:py-36 bg-black text-white border-t border-white/10 overflow-hidden"
      aria-labelledby="contact-title"
      ref={wrapRef}
      onMouseMove={onMove}
    >
      {/* Fondo premium grimlo */}
      <div className="pointer-events-none absolute inset-0 -z-30">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(#ffffff12_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_-10%,#0b0b0b_0%,transparent_60%)]" />
        <div className="absolute inset-0 mix-blend-soft-light opacity-[0.06] [background-image:url('/noise.png')]" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black via-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>

      {/* Spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10 h-[65vh] w-[65vh] rounded-full blur-3xl"
        style={{
          left: spotX, top: spotY, translateX: "-50%", translateY: "-50%",
          background:
            "radial-gradient(closest-side, rgba(120,120,150,0.22), rgba(40,40,55,0.18), rgba(15,15,18,0.0))",
        }}
      />

      <div className="relative container mx-auto px-4 md:px-6 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Columna izquierda */}
        <AnimatedSection>
          <div className="flex flex-col gap-8">
            <div>
              <span className="inline-flex items-center gap-2 mb-4 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1 text-[11px] uppercase tracking-[0.2em] text-neutral-300 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-zinc-400 via-slate-300 to-zinc-400" />
                Agenda tu proyecto
              </span>
              <h2 id="contact-title" className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                Hablemos de tu{" "}
                <span className="bg-clip-text text-transparent bg-[conic-gradient(from_140deg_at_50%_50%,#e5e7eb_0%,#9aa0a6_25%,#e5e7eb_50%,#9aa0a6_75%,#e5e7eb_100%)]">
                  web
                </span>
              </h2>
              <p className="mt-4 text-white/70 max-w-xl">
                Te respondemos &lt; 24h. Si lo prefieres, coordinamos una llamada express para alinear objetivos,
                presupuesto y plazos.
              </p>
            </div>

            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {[
                { k: "Entrega", v: "en días" },
                { k: "SEO", v: "técnico real" },
                { k: "Diseño", v: "minimalista" },
                { k: "Soporte", v: "cercano" },
                { k: "Código", v: "propio" },
                { k: "Escala", v: "cuando toque" },
              ].map((t) => (
                <li
                  key={t.k + t.v}
                  className="rounded-full border border-white/12 px-3 py-2 text-white/70 text-center hover:border-white/30 transition-colors"
                >
                  {t.k} · {t.v}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <Link
                href="https://wa.me/34667069082?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20mi%20web"
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
          <div className="relative">
            {/* Borde iridiscente animado */}
            <motion.div
              aria-hidden
              className="absolute -inset-px rounded-3xl"
              style={{
                background:
                  "conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.28), rgba(130,130,150,0.18), rgba(255,255,255,0.12), rgba(130,130,150,0.18), rgba(255,255,255,0.28))",
                filter: "blur(8px)",
                opacity: 0.5,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            />
            <motion.form
              onSubmit={onSubmit}
              className="relative flex flex-col gap-6 bg-white/[0.03] backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/10 shadow-[0_20px_80px_rgba(0,0,0,0.45)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Honeypot */}
              <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

              {/* Paquetes */}
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
                      className={`
                        rounded-xl px-3 py-2 text-sm border transition-colors
                        ${selectedPackage === p.id ? "border-white bg-white text-black" : "border-white/15 hover:border-white/35 text-white/80"}
                      `}
                      aria-pressed={selectedPackage === p.id}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <input type="hidden" name="package" value={selectedPackage} />
              </div>

              {/* Datos con floating labels (peer, sin style jsx) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FloatingField id="name" label="Tu nombre" required error={errors.name}>
                  <Input
                    id="name"
                    name="name"
                    placeholder=" "
                    className="peer bg-neutral-900/70 border-neutral-700/80 text-white px-4 py-3 rounded-xl"
                    required
                  />
                </FloatingField>

                <FloatingField id="email" label="Correo electrónico" required error={errors.email}>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder=" "
                    className="peer bg-neutral-900/70 border-neutral-700/80 text-white px-4 py-3 rounded-xl"
                    required
                  />
                </FloatingField>

                <FloatingField id="phone" label="Teléfono (opcional)">
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    placeholder=" "
                    className="peer bg-neutral-900/70 border-neutral-700/80 text-white px-4 py-3 rounded-xl"
                  />
                </FloatingField>

                <FloatingField id="website" label="Tu web actual (opcional)">
                  <Input
                    id="website"
                    name="website"
                    placeholder=" "
                    className="peer bg-neutral-900/70 border-neutral-700/80 text-white px-4 py-3 rounded-xl"
                  />
                </FloatingField>
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
                <Label htmlFor="message" className="mb-2 block text-white/80">Mensaje</Label>
                <div className="relative">
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Cuéntanos tu idea, objetivos y referencias…"
                    className="bg-neutral-900/70 border-neutral-700/80 text-white placeholder-neutral-500 px-4 py-3 rounded-xl min-h-[120px]"
                  />
                  {errors.message && <p className="mt-2 text-xs text-red-300">{errors.message}</p>}
                </div>
              </div>

              {/* Consentimiento */}
              <label className="flex items-start gap-3 text-sm text-white/70 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 accent-white"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                <span>Acepto que contactéis conmigo para evaluar mi proyecto. No compartimos tus datos con terceros.</span>
              </label>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={loading || !consent}
                  className={`flex-1 rounded-xl bg-white text-black hover:bg-stone-100 ${!consent ? "opacity-60 pointer-events-none" : ""}`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {loading ? (
                      <motion.span key="sending" className="inline-flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Sparkles className="h-4 w-4 animate-pulse" />
                        Enviando…
                      </motion.span>
                    ) : sent ? (
                      <motion.span key="sent" className="inline-flex items-center gap-2" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
                        <Check className="h-4 w-4" />
                        ¡Enviado!
                      </motion.span>
                    ) : (
                      <motion.span key="idle" className="inline-flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        Enviar solicitud <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>

                <Link
                  href="https://wa.me/34667069082?text=Hola%20quiero%20hablar%20sobre%20mi%20web"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-4 py-3 hover:border-white/40"
                >
                  <Whatsapp className="h-5 w-5" />
                  Hablar por WhatsApp
                </Link>
              </div>

              <p className="text-center text-xs text-white/50" aria-live="polite">
                Tiempo de respuesta medio: &lt; 24h · Sin SPAM · Puedes adjuntar referencias tras la primera respuesta.
              </p>
            </motion.form>

            <AnimatePresence>
              {sent && (
                <motion.div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ background: "radial-gradient(90% 70% at 50% 10%, rgba(255,255,255,0.08), transparent 60%)" }}
                />
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>
      </div>

      {/* WhatsApp flotante (opcional) */}
      <motion.a
        href="https://wa.me/34667069082?text=Hola%20quiero%20informaci%C3%B3n%20sobre%20mi%20web"
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

/* ---------- Subcomponente: FloatingField (peer-based) ---------- */
function FloatingField({
  id,
  label,
  children,
  required,
  error,
}: {
  id: string
  label: string
  children: React.ReactNode
  required?: boolean
  error?: string
}) {
  return (
    <div className="relative">
      {/* el input debe llevar className="peer" y placeholder=" " */}
      {children}
      <label
        htmlFor={id}
        className="
          pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 px-1
          text-sm text-neutral-400 transition-all
          bg-black/60 backdrop-blur-sm
          peer-focus:-top-2 peer-focus:text-xs peer-focus:text-neutral-300
          peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-neutral-300
        "
      >
        {label}{required ? " *" : ""}
      </label>
      {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
    </div>
  )
}

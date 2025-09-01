"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import Script from "next/script"
import { motion } from "framer-motion"
import { Search, LinkIcon, HelpCircle, MessageSquare, ChevronDown } from "lucide-react"

const ACCENT = "#20165aff"

const RAW_FAQS = [ 
  // Proceso
  { q: "¿Cuánto tarda en estar mi web lista?", a: "Depende del paquete. LITE suele estar en 3–7 días, ADVANCED en 1–3 semanas, y E-COMMERCE puede requerir 3–6 semanas según alcance.", cat: "Proceso" },
  { q: "¿Qué necesito prepararte antes de empezar?", a: "Logo (si tienes), paleta de colores, referencias de estilo, textos base y fotos. Si no tienes todo, te guiamos.", cat: "Proceso" },
  { q: "¿Podemos reunirnos antes de empezar?", a: "Sí. Hacemos una reunión inicial para entender tu negocio, necesidades y estilo preferido.", cat: "Proceso" },

  // Producto
  { q: "¿Puedo gestionar yo mismo los contenidos?", a: "Sí. ADVANCED incluye CMS para editar textos, imágenes y páginas. PRO permite personalizar más.", cat: "Producto" },
  { q: "¿Mi web será responsive?", a: "Todas las webs se diseñan adaptadas a móviles, tablets y ordenadores.", cat: "Producto" },
  { q: "¿Incluye correos corporativos?", a: "Podemos configurar emails corporativos asociados a tu dominio como servicio adicional.", cat: "Producto" },

  // SEO y Marketing
  { q: "¿La web estará optimizada para SEO?", a: "Aplicamos buenas prácticas técnicas. ADVANCED/PRO incluyen SEO on-page, sitemap y asesoría.", cat: "SEO" },
  { q: "¿Puedo conectar mi web con Google Analytics o redes sociales?", a: "Sí, configuramos integraciones con Analytics, Meta, TikTok o LinkedIn Ads si lo necesitas.", cat: "SEO" },

  // Pagos y soporte
  { q: "¿Cómo funcionan los pagos?", a: "Puedes pagar por transferencia o tarjeta. Ofrecemos pago único o en cuotas para proyectos mayores.", cat: "Pagos" },
  { q: "¿Tenéis soporte después de la entrega?", a: "Sí. Incluimos un periodo de soporte gratuito y ofrecemos planes de mantenimiento opcionales.", cat: "Soporte" },
  { q: "¿Qué pasa si quiero ampliar la web más adelante?", a: "Podemos añadir páginas, funciones o rediseños cuando lo necesites. Tu web crecerá contigo.", cat: "Soporte" },

  // Extras
  { q: "¿Incluye hosting y dominio?", a: "Sí. Te ayudamos a registrar dominio y configurar hosting. En PRO incluimos la gestión completa.", cat: "Extras" },
  { q: "¿Podéis crear contenido para mi web?", a: "Ofrecemos servicio adicional de redacción y creación de imágenes optimizadas.", cat: "Extras" },
]


const slugify = (s: string) =>
  s.toLowerCase()
    .normalize("NFD")
    // @ts-expect-error: unicode class supported in modern browsers
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

export default function FAQPage() {
  const [query, setQuery] = useState("")
  const [cat, setCat] = useState("Todas")

  const faqs = useMemo(() => RAW_FAQS.map(f => ({ ...f, id: slugify(f.q) })), [])
  const cats = useMemo(() => ["Todas", ...Array.from(new Set(RAW_FAQS.map(f => f.cat)))], [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return faqs.filter(f => {
      const okCat = cat === "Todas" || f.cat === cat
      const haystack = `${f.q} ${f.a} ${f.cat}`.toLowerCase()
      const okQuery = !q || haystack.includes(q)
      return okCat && okQuery
    })
  }, [faqs, query, cat])

  useEffect(() => {
    const url = new URL(window.location.href)
    if (url.searchParams.get("buscar")) {
      document.getElementById("faq-search")?.focus()
    }
  }, [])

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: filtered.map(f => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    }))
  }), [filtered])

  // Motion variants
  const list = { show: { transition: { staggerChildren: 0.06 } } }
  const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } }

  return (
    <div className="min-h-screen bg-app text-neutral-200">
      {/* Hero */}
      <section id="faq" className="relative isolate">
        {/* Overlay suave para dar profundidad; respeta tus fondos globales */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(600px 300px at 10% 0%, rgba(32,22,90,.25), transparent), radial-gradient(400px 200px at 95% 5%, rgba(255,255,255,.06), transparent)",
          }}
        />
        <div className="mx-auto max-w-5xl px-4 pt-[calc(96px+env(safe-area-inset-top))] pb-6">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-wide text-white/80">
              <HelpCircle size={14} /> Centro de ayuda
            </span>

<h1 className="mt-3 font-display text-3xl md:text-5xl font-semibold tracking-tight text-white">
  Preguntas Frecuentes
</h1>

<p className="mt-3 max-w-2xl text-sm md:text-base text-white/70 font-sans">
  Todo lo esencial sobre paquetes, plazos, SEO y soporte. Si no ves tu pregunta,
  <Link href="#contact" className="ml-1 underline decoration-white/30 underline-offset-4 hover:decoration-white/60">contáctanos</Link>.
</p>

<p className="text-white/70 text-sm font-sans">Escríbenos y te respondemos en menos de 24h laborables.</p>

            {/* Buscador + categorías */}
            <div className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
              <label className="relative flex items-center rounded-2xl border border-white/10 bg-white/5 px-3 py-2 focus-within:border-white/20">
                <Search className="mr-2 h-4 w-4 text-white/60" />
                <input
                  id="faq-search"
                  placeholder='Buscar (ej. "SEO", "plazos")'
                  className="w-full bg-transparent text-sm outline-none placeholder:text-white/40"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Buscar preguntas frecuentes"
                />
              </label>

              <div className="flex flex-wrap items-center gap-2 md:justify-end">
                {cats.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`rounded-full px-3 py-2 text-xs md:text-sm transition ring-1 ring-white/10 ${
                      cat === c ? "bg-white text-black" : "bg-black/60 text-white/85 hover:text-white"
                    }`}
                    aria-pressed={cat === c}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Lista de FAQs */}
      <section className="mx-auto max-w-5xl px-4 pb-20">
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={list}
          className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md divide-y divide-white/10"
        >
          {filtered.map((f) => (
            <motion.li key={f.id} variants={item} id={f.id} className="p-4 md:p-6 scroll-mt-[96px]">
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-start justify-between gap-3">
                  <h3
                    className="text-base md:text-lg font-medium text-white/95"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {f.q}
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-label="Copiar enlace de esta pregunta"
                      className="hidden sm:inline-flex shrink-0 rounded-md p-1.5 text-white/60 hover:text-white hover:bg-white/10"
                      onClick={() => {
                        const url = new URL(window.location.href)
                        url.hash = f.id
                        window.history.replaceState(null, "", url.toString())
                        navigator.clipboard?.writeText(url.toString())
                      }}
                      title="Copiar enlace"
                    >
                      <LinkIcon className="h-4 w-4" />
                    </button>
                    <ChevronDown className="h-4 w-4 text-white/60 transition-transform group-open:rotate-180" />
                  </div>
                </summary>
                <div className="mt-3 text-sm leading-relaxed text-white/80">
                  {f.a}
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-wide text-white/40">{f.cat}</div>
              </details>

              {/* subrayado líquido al abrir */}
              <div
                className="mt-3 h-[2px] w-full opacity-0 group-open:opacity-100 transition-opacity"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${ACCENT}, rgba(255,255,255,.85) 55%, transparent)`,
                }}
              />
            </motion.li>
          ))}

          {filtered.length === 0 && (
            <li className="p-6 text-sm text-white/70">No hay resultados. Prueba con otra palabra clave o cambia de categoría.</li>
          )}
        </motion.ul>

        {/* CTA final */}
        <div className="mx-auto mt-8 max-w-3xl">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6">
            <div
              className="pointer-events-none absolute -inset-1 rounded-2xl opacity-40 blur-md"
              style={{ background: `conic-gradient(from 180deg at 50% 50%, ${ACCENT}, #ffffff40, ${ACCENT})` }}
              aria-hidden
            />
            <div className="relative z-10 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-white/90 text-base md:text-lg font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                  ¿Sigues con dudas?
                </p>
                <p className="text-white/70 text-sm">Escríbenos y te respondemos en menos de 24h laborables.</p>
              </div>
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-black ring-1 ring-white/15"
              >
                <MessageSquare className="h-4 w-4" /> Hablemos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD para rich results */}
      <Script id="faq-jsonld" type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(jsonLd)}
      </Script>

      {/* Ajustes locales (scroll offset y marker) */}
      <style jsx global>{`
        [id] { scroll-margin-top: 96px; }
      `}</style>
    </div>
  )
}

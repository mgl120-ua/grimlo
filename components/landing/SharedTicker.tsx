"use client"

import { motion } from "framer-motion"

export default function SharedTicker({
  items = [
    "Diseño minimalista",
    "Performance obsesiva",
    "SEO técnico real",
    "Escalabilidad",
    "Accesibilidad",
    "Iteración rápida",
  ],
  speed = 16,
  className = "",
}: { items?: string[]; speed?: number; className?: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden py-4 md:py-5 ${className}`}
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        maskImage:
          "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      {/* línea base */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <motion.div
        className="flex whitespace-nowrap will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((idx) => (
          <div key={idx} className="flex items-center gap-6 md:gap-10 pr-6 md:pr-10">
            {items.map((t) => (
              <span
                key={`${idx}-${t}`}
                className="inline-flex items-center gap-3 text-sm md:text-base text-neutral-300"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-zinc-400 via-slate-300 to-zinc-400" />
                {t}
              </span>
            ))}
          </div>
        ))}
      </motion.div>
      {/* línea base */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}

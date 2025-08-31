"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function SeamlessDivider({
  className = "",
  label,
}: { className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.5, 0.2])
  const dash = useTransform(scrollYProgress, [0, 1], ["0%", "110%"])

  return (
    <div ref={ref} className={`relative w-full py-10 md:py-12 ${className}`}>
      {/* base line */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      {/* animated “energy” */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] overflow-hidden"
        style={{ opacity: glow }}
      >
        <motion.div
          className="h-full w-full bg-[linear-gradient(90deg,transparent,rgba(190,195,205,0.55),transparent)]"
          style={{ x: dash }}
          transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
        />
      </motion.div>

      {/* tiny marker pill (opcional) */}
      {label && (
        <motion.span
          className="relative mx-auto block w-fit rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] tracking-[0.18em] uppercase text-neutral-300"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
        >
          {label}
        </motion.span>
      )}
    </div>
  )
}

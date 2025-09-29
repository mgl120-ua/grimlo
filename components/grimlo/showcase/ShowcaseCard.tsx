"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Pill from "./Pill"
import { ACCENT, cardVariants } from "./variants"
import type { Project } from "./types"

export default function ShowcaseCard({ src, alt, tags, pad }: Project) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/8 to-white/[0.03] backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)] ${
        pad === "top" ? "mt-10" : "mb-10"
      }`}
    >
      <div className="relative w-full h-[56vw] xs:h-[52vw] sm:h-[40vw] md:h-[28vw] lg:h-[22vw]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(600px 200px at 50% 0%, ${ACCENT}20 0%, transparent 60%)` }}
        />
      </div>

      <div className="absolute left-3 sm:left-4 top-3 sm:top-4 flex flex-wrap gap-2 z-10">
        {tags.map((t, i) => (
          <Pill key={t + i} label={t} index={i} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-white/20 transition" />
    </motion.article>
  )
}
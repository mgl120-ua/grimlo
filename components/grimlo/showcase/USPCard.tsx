"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { uspVariants } from "./variants"
import type { USP } from "./showcase/types"
import { ACCENT } from "./variants"

export default function USPCard({ icon, title, text }: USP) {
  return (
    <motion.div
      variants={uspVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      className="relative grid grid-cols-[80px_1fr] gap-5 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-5 md:p-8"
    >
      <div className="relative h-16 w-16 md:h-20 md:w-20 overflow-hidden rounded-2xl bg-white/10">
        <Image src={icon} alt="icon" fill className="object-contain p-2" />
      </div>
      <div>
        <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-white/70 max-w-2xl">{text}</p>
      </div>
      <div
        className="pointer-events-none absolute -right-2 top-1/2 -translate-y-1/2 h-16 w-16 rounded-full blur-xl"
        style={{ background: `${ACCENT}26` }}
      />
    </motion.div>
  )
}
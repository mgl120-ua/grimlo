"use client"

import { motion } from "framer-motion"
import { pillVariants } from "./variants"

export default function Pill({ label, index }: { label: string; index: number }) {
  return (
    <motion.span
      custom={index}
      variants={pillVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-white/80 backdrop-blur-sm"
    >
      {label}
    </motion.span>
  )
}
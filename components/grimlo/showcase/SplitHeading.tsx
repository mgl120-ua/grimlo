"use client"

import { motion } from "framer-motion"
import { splitWordVariants } from "./variants"

export default function SplitHeading({ lines }: { lines: string[] }) {
  let i = 0
  return (
    <h2 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight">
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word, wi) => (
            <span key={wi} className="inline-block overflow-hidden mr-2 align-top">
              {word.split("").map((ch, ci) => (
                <motion.span
                  key={ci}
                  custom={i++}
                  variants={splitWordVariants}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-10% 0% -10% 0%" }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </h2>
  )
}
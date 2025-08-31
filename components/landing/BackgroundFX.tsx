"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

type Props = {
  grain?: boolean
  grid?: boolean
  spotlightRadius?: number
}

export default function BackgroundFX({
  grain = false,
  grid = true,
  spotlightRadius = 260,
}: Props) {
  const mvx = useMotionValue(0)
  const mvy = useMotionValue(0)
  const x = useSpring(mvx, { stiffness: 80, damping: 20 })
  const y = useSpring(mvy, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mvx.set(e.clientX)
      mvy.set(e.clientY)
    }
    window.addEventListener("mousemove", onMove)
    return () => window.removeEventListener("mousemove", onMove)
  }, [mvx, mvy])

  const spotlight = useTransform([x, y], ([xx, yy]) =>
    `radial-gradient(${spotlightRadius}px ${spotlightRadius}px at ${xx}px ${yy}px,
      rgba(255,255,255,0.08), rgba(255,255,255,0.04) 35%, transparent 70%)`
  )

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Gradiente base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0b] via-[#111111] to-black" />

      {/* Vignette sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_25%,transparent_45%,rgba(0,0,0,0.55))]" />

      {/* Aurora / metal glow lento */}
      <motion.div
        className="absolute -top-48 left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 blur-3xl opacity-30"
        style={{
          background:
            "conic-gradient(from 140deg at 50% 50%, #e5e4df22, #b3b0a922, #e5e4df22, #8a857c22)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity }}
      />

      {/* Spotlight que sigue al cursor */}
      <motion.div className="absolute inset-0" style={{ background: spotlight }} />

      {/* Grain opcional (requiere /public/noise.png) */}
      {grain && (
        <div className="absolute inset-0 opacity-[0.06] mix-blend-soft-light bg-[url('/noise.png')]" />
      )}

      {/* Grid/dots opcional */}
      {grid && (
        <div
          className="absolute inset-0 opacity-[0.08]
          [background-image:radial-gradient(#ffffff10_1px,transparent_1px)]
          [background-size:18px_18px]
          [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)]"
        />
      )}
    </div>
  )
}

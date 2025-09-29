"use client"

import SplitHeading from "./SplitHeading"

export default function SectionHeader({
  eyebrow,
  lines,
  align = "left",
}: {
  eyebrow?: string
  lines: string[]
  align?: "left" | "center"
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <div className="flex items-center gap-2 justify-start text-white/80">
          <span className="inline-block h-4 w-4 rounded-full bg-white/10" />
          <p className="text-white/80">{eyebrow}</p>
        </div>
      )}
      <SplitHeading lines={lines} />
    </div>
  )
}
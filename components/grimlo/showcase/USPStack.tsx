"use client"

import USPCard from "./USPCard"
import type { USP } from "./types"

export default function USPStack({ items }: { items: USP[] }) {
  return (
    <div className="snap-y snap-mandatory h-[220vh] overflow-y-auto no-scrollbar">
      {items.map((u, idx) => (
        <section key={idx} className="snap-start min-h-[55vh] md:min-h-[50vh] flex items-center">
          <div className="px-4 sm:px-6 lg:px-8 w-full">
            <div className="mx-auto max-w-5xl">
              <USPCard {...u} />
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
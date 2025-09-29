// ProjectsMasonry.tsx
"use client"

import ShowcaseCard from "./ShowcaseCard"
import type { Project } from "./types"

export default function ProjectsMasonry({ projects }: { projects: Project[] }) {
  return (
    <div className="hidden lg:block">
      <div className="grid grid-cols-2 gap-8">
        {projects.map((p, i) => (
          <ShowcaseCard key={i} {...p} />
        ))}
      </div>
    </div>
  )
}

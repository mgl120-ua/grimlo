"use client"

import ShowcaseCard from "./ShowcaseCard"
import type { Project } from "./types"

export default function ProjectsRail({ projects }: { projects: Project[] }) {
  return (
    <div className="lg:hidden">
      <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4">
        {projects.map((p, i) => (
          <div key={i} className="snap-start shrink-0 w-[84%] xs:w-[78%] sm:w-[70%]">
            <ShowcaseCard
              {...p}
              /** Pre-carga las 2 primeras (aunque estén fuera en X) */
              forcePreload={i < 2}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

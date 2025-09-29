"use client";
import Image from "next/image";
import Link from "next/link";

const projects = [
  { slug: "proyecto-1", title: "Proyecto 1", cover: "/placeholder.jpg" },
  { slug: "proyecto-2", title: "Proyecto 2", cover: "/placeholder.jpg" },
];

export default function WorkGrid() {
  return (
    <section className="px-6 py-16">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <Link key={p.slug} href={`/gallery/${p.slug}`} className="group">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src={p.cover}
                alt={p.title}
                width={1600}
                height={900}
                className="aspect-[16/9] object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-sm">
                Ver caso →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

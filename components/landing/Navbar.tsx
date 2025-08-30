"use client"

import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="w-full bg-black text-white py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6">
        <div className="flex flex-1 justify-start gap-8">
          <Link href="#home" className="pb-1 border-b-2 border-white">Home</Link>
          <Link href="#services" className="hover:underline">Servicios</Link>
          <Link href="#about" className="hover:underline">About Us</Link>
        </div>
        <Link href="/" className="flex-shrink-0" aria-label="Ir al inicio">
          <Image src="/logo.png" alt="Logo Grimlo" width={60} height={60} />
        </Link>
        <div className="flex flex-1 justify-end gap-8">
          <Link href="#examples" className="hover:underline">Ejemplos</Link>
          <Link href="#faq" className="hover:underline">Preguntas</Link>
          <Link href="#contact" className="hover:underline">Contact Us</Link>
        </div>
      </div>
    </nav>
  )
}

"use client"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import gsap from "gsap/dist/gsap"
import { useGSAP } from "@gsap/react"

export default function HeroSection({ onScroll }) {
  const blockRef = useRef(null)

  useGSAP(() => {
    gsap.fromTo(
      blockRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
    )
  }, [])

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      
      {/* Fondo Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src="/hero.png"
          alt="Fondo Hero Desktop"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-radial from-gray-900/70 via-black/80 to-black" />
      </div>

      {/* Fondo Móvil */}
      <div className="absolute inset-0 block md:hidden">
        <Image
          src="/hero-phone.png"
          alt="Fondo Hero Móvil"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-radial from-gray-900/70 via-black/80 to-black" />
      </div>

      {/* Contenedor del contenido */}
      {/* Para escritorio */}
      <div 
        className="absolute z-50 hidden md:flex flex-col items-center justify-center text-center px-6"
        style={{
          top: "12%",        // baja un poco dentro del monitor
          left: "50%",
          transform: "translateX(-50%)",
          width: "72%",      // ancho relativo a la pantalla del monitor
          height: "62%",     // alto relativo a la pantalla del monitor
        }}
      >
        <div ref={blockRef} className="flex flex-col items-center gap-4">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Logo de Gimlo"
            width={120}
            height={120}
            className="mx-auto drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]"
          />
          {/* Título */}
          <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter leading-tight">
            Tu sitio web comienza aquí.
          </h1>
          {/* Botón */}
          <Button
            onClick={onScroll}
            className="mt-6 px-8 py-4 text-lg font-medium rounded-full bg-white text-black 
                      hover:bg-gray-200 transition-all hover:scale-105 shadow-lg"
          >
            Explorar Paquetes Web →
          </Button>
        </div>
      </div>


      {/* Para móvil */}
<div 
  className="absolute z-50 flex md:hidden flex-col items-center justify-center text-center px-6"
  style={{
    top: "10%",        
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",      
    height: "70%",     
  }}
>
  <div ref={blockRef} className="flex flex-col items-center gap-2">
    {/* Logo */}
    <Image
      src="/logo.png"
      alt="Logo de Gimlo"
      width={90}
      height={90}
      className="mx-auto drop-shadow-[0_0_25px_rgba(255,255,255,0.35)]"
    />

    {/* Título con salto de línea */}
    <h1 className="text-2xl font-extrabold tracking-tighter leading-tight">
      Tu sitio web<br/>comienza aquí.
    </h1>

    {/* Botón más pequeño */}
    <Button
      onClick={onScroll}
      className="mt-4 px-4 py-2 text-sm font-medium rounded-full bg-white text-black 
                hover:bg-gray-200 transition-all hover:scale-105 shadow-md"
    >
      Explorar Paquetes →
    </Button>
  </div>
</div>


    </section>
  )
}

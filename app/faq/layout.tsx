// app/faq/layout.tsx
import { Inter, Playfair_Display } from "next/font/google"
import Navbar from "@/components/landing/Navbar"
import "../globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

export const metadata = {
  title: "Preguntas Frecuentes | Grimlo",
  description: "Resuelve tus dudas sobre diseño web, precios, plazos y soporte con Grimlo.",
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-app min-h-screen antialiased relative font-sans">
        {/* Mapea sans/display a las variables de marca */}
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --font-sans: var(--font-inter);
            --font-display: var(--font-playfair);
          }
        `}} />
        <div className="fixed inset-0 -z-50 bg-black" />
        <div className="fixed inset-0 -z-40 bg-grid" />
        <div className="fixed inset-0 -z-30 bg-vignette" />
        <div className="fixed inset-0 -z-20 bg-noise" />

        <Navbar />
        {children}
      </body>
    </html>
  )
}

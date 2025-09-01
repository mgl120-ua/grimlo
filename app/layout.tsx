// app/layout.tsx
import "./globals.css"
import { Inter, Space_Grotesk } from "next/font/google"
import Navbar from "@/components/landing/Navbar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata = {
  title: "Gimlo - Tu sitio web perfecto",
  description: "Diseño web premium y soluciones personalizadas para tu negocio.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="bg-app min-h-screen antialiased relative">
        {/* capas globales */}
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

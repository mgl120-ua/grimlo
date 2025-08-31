import './globals.css'
import { Inter, Playfair_Display } from 'next/font/google'
import { cn } from '@/lib/utils'
import Navbar from "@/components/landing/Navbar"

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata = {
  title: 'Gimlo - Tu sitio web perfecto',
  description: 'Diseño web premium y soluciones personalizadas para tu negocio.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-app min-h-screen antialiased relative">
        {/* capas globales */}
        <div className="fixed inset-0 -z-50 bg-black"></div>
        <div className="fixed inset-0 -z-40 bg-grid"></div>
        <div className="fixed inset-0 -z-30 bg-vignette"></div>
        <div className="fixed inset-0 -z-20 bg-noise"></div>

        <Navbar />
        {children}
      </body>
    </html>
  )
}

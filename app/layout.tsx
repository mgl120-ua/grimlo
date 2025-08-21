import './globals.css'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'

// Define la fuente Inter
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata = {
  title: 'Gimlo - Tu sitio web perfecto',
  description: 'Diseño web premium y soluciones personalizadas para tu negocio.',
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable // Aplica la variable CSS de la fuente
        )}
      >
        {children}
      </body>
    </html>
  )
}

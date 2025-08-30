import './globals.css'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { cn } from '@/lib/utils'

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
    <html lang="es" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased'
        )}
      >
        {children}
      </body>
    </html>
  )
}

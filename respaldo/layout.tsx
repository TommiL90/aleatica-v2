import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { cn } from '@/lib/utils'
import { Header } from '@/respaldo/header'
import { TailwindIndicator } from '@/respaldo/tailwind-indicator'
import { Toaster } from '@/components/ui/sonner'
import '@silevis/reactgrid/styles.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.className,
        )}
      >
        <Header />

        {children}
        <TailwindIndicator />
        <Toaster />
      </body>
    </html>
  )
}

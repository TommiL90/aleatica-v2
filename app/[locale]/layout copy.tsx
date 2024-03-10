import type { Metadata } from 'next'
import '@/styles/globals.css'
import '@silevis/reactgrid/styles.css'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import { cn } from '@/lib/utils'
import { fontSans } from '@/lib/fonts'
import { Toaster } from '@/components/ui/sonner'

import { TailwindIndicator } from '@/components/tailwind-indicator'
import Header from '@/components/header'
import Provider from './Provider'

export const metadata: Metadata = {
  title: 'Aleatica',
  description: 'Aleatica app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'relative bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Provider>
          <Header />
          {children}
        </Provider>
        <Toaster position="top-center" richColors expand={true} />
        <TailwindIndicator />
      </body>
    </html>
  )
}

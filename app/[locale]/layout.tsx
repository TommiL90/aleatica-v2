import '@/styles/globals.css'
import '@silevis/reactgrid/styles.css'
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import type { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Inter } from 'next/font/google'
import { HeaderV2 } from '@/components/header-v2'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import Provider from './Provider'

export const metadata: Metadata = {
  title: 'Aleatica',
  description: 'Aleatica app',
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode
  params: { locale: string }
}>) {
  const messages = useMessages()
  return (
    <html lang={locale}>
      <body
        className={cn(
          'relative bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Provider>
            <HeaderV2 />
            <div className="flex-1"> {children}</div>
          </Provider>
          <Toaster position="top-center" richColors expand={true} />
          <TailwindIndicator />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

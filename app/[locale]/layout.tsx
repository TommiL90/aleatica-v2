import type { Metadata } from 'next'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import { HeaderV2 } from '@/components/header-v2'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

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
          <HeaderV2 />
          <div className="flex-1"> {children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

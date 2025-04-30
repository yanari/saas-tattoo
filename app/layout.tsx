import './globals.css'

import { Toaster } from 'sonner'
import { geistMono, geistSans } from '@/lib/fonts'
import { metadata } from '@/lib/metadata'
import { Footer } from '@/components/layout/footer'

export { metadata }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Footer />
        <Toaster theme="dark" />
      </body>
    </html>
  )
}

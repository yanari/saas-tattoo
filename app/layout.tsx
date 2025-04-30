import './globals.css'

import { geistMono, geistSans } from '@/lib/fonts'
import { metadata } from '@/lib/metadata'
import { Toaster } from 'sonner'

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
        <Toaster theme="dark" />
      </body>
    </html>
  )
}

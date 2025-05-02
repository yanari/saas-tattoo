import './globals.css'

import { Toaster } from 'sonner'
import { inter, ptMono } from '@/lib/fonts'
import { metadata } from '@/lib/metadata'
import { Footer } from '@/components/layout/footer'
import { AuthProvider } from '@/providers/auth'

export { metadata }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col ${inter.variable} ${ptMono.variable}`}
      >
        <AuthProvider>
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster theme="dark" />
        </AuthProvider>
      </body>
    </html>
  )
}

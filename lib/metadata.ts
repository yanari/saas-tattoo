import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'InkBooked - Organize Seu Estúdio de Tatuagem',
  description:
    'A plataforma completa para estúdios de tatuagem. Esqueça o Direct e simplifique a gestão do seu estúdio.',
  openGraph: {
    title: 'InkBooked - Organize Seu Estúdio de Tatuagem',
    description:
      'A plataforma completa para estúdios de tatuagem. Esqueça o Direct e simplifique a gestão do seu estúdio.',
    url: 'https://inkbooked.vercel.app',
    siteName: 'InkBooked',
    images: [
      {
        url: 'https://inkbooked.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InkBooked - Organize Seu Estúdio de Tatuagem',
    description:
      'A plataforma completa para estúdios de tatuagem. Esqueça o Direct e simplifique a gestão do seu estúdio.',
    images: ['https://inkbooked.vercel.app/og-image.jpg'],
  },
}

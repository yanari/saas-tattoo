import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'InkBookd - Organize Seu Estúdio de Tatuagem',
  description:
    'A plataforma completa para estúdios de tatuagem. Esqueça o Direct e simplifique a gestão do seu estúdio.',
  openGraph: {
    title: 'InkBookd - Organize Seu Estúdio de Tatuagem',
    description:
      'A plataforma completa para estúdios de tatuagem. Esqueça o Direct e simplifique a gestão do seu estúdio.',
    url: 'https://inkbookd.vercel.app',
    siteName: 'InkBookd',
    images: [
      {
        url: 'https://inkbookd.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InkBookd - Organize Seu Estúdio de Tatuagem',
    description:
      'A plataforma completa para estúdios de tatuagem. Esqueça o Direct e simplifique a gestão do seu estúdio.',
    images: ['https://inkbookd.vercel.app/og-image.jpg'],
  },
}

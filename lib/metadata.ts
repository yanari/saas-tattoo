import type { Metadata } from 'next'
import {
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_URL,
  OG_IMAGE,
} from '@/constants/site'

export const metadata: Metadata = {
  title: `${SITE_NAME} - Organize Seu Estúdio de Tatuagem`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} - Organize Seu Estúdio de Tatuagem`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - Organize Seu Estúdio de Tatuagem`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
}

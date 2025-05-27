'use server'

import { db } from '../../prisma/client'

export type SearchResult = {
  id: string
  name: string
  type: 'studio' | 'artist'
  slug?: string | null
  city?: string | null
  imageUrl?: string | null
}

export async function searchStudiosAndArtists(
  query: string,
): Promise<SearchResult[]> {
  const [studios, artists] = await Promise.all([
    db.tattooStudio.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        imageUrl: true,
      },
    }),
    db.artist.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        name: true,
        slug: true,
        city: true,
        imageUrl: true,
      },
    }),
  ])

  const mappedStudios: SearchResult[] = studios.map((studio) => ({
    ...studio,
    type: 'studio',
  }))

  const mappedArtists: SearchResult[] = artists.map((artist) => ({
    ...artist,
    type: 'artist',
  }))

  return [...mappedStudios, ...mappedArtists]
}

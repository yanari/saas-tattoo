'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { SearchResult } from '@/lib/actions/search/search-entities'

interface Props {
  artist: SearchResult
}

export function SearchArtistItem({ artist }: Props) {
  return (
    <Link
      className="min-w-44 transition-all hover:shadow-lg hover:brightness-110"
      href={`/artists/${artist.slug}`}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="relative h-40 w-full">
            <Image
              src={artist.imageUrl ?? '/placeholder.png'}
              alt={artist.name}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
          <div className="flex flex-col gap-2 px-2 py-3">
            <h3 className="truncate font-semibold">{artist.name}</h3>
            {artist.city && (
              <span className="text-primary truncate text-sm font-semibold">
                {artist.city}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

import { Artist } from '@prisma/client'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { Badge } from '../ui/badge'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'

interface ArtistItemProps {
  artist: Artist
}

export function ArtistItem({ artist }: ArtistItemProps) {
  console.log({ artist })
  return (
    <Link
      className="min-w-44 transition-all hover:shadow-lg hover:brightness-110"
      href={`/artists/${artist.id}`}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="relative h-40 w-full">
            <Badge variant="secondary" className="absolute top-2 left-2 z-10">
              <StarIcon className="fill-primary text-primary" />
              <p className="text-xs font-semibold">5.0</p>
            </Badge>
            <Image
              src={artist.imageUrl ?? ''}
              alt={artist.name}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
          <div className="flex flex-col gap-2 px-2 py-3">
            <h3 className="truncate font-semibold">{artist.name}</h3>

            {/* <p className="truncate text-xs text-gray-400">{JSON.stringify(artist, 4, null)}</p> */}

            <span className="text-primary truncate text-sm font-semibold">
              {/* {artist} */}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

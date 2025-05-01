import { Prisma } from '@prisma/client'
import { Card, CardContent } from '../../ui/card'
import Image from 'next/image'
import { Badge } from '../../ui/badge'
import { StarIcon } from 'lucide-react'
import Link from 'next/link'
import { ServiceListing } from './service-listing'

type TattooStudioWithServices = Prisma.TattooStudioGetPayload<{
  include: { services: true }
}>

type TattooStudioWithoutServices = Prisma.TattooStudioGetPayload<{
  include: { services: false }
}>

type TattooStudio = TattooStudioWithServices | TattooStudioWithoutServices

interface TattooStudioItemProps {
  studio: TattooStudio
  withServices?: boolean
}

export function TattooStudioItem({
  studio,
  withServices,
}: TattooStudioItemProps) {
  const hasServices = withServices && 'services' in studio
  return (
    <Link
      className="min-w-44 transition-all hover:shadow-lg hover:brightness-110"
      href={`/studios/${studio.slug}`}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="relative h-40 w-full">
            <Badge variant="secondary" className="absolute top-2 left-2 z-10">
              <StarIcon className="fill-primary text-primary" />
              <p className="text-xs font-semibold">5.0</p>
            </Badge>
            <Image
              src={studio.imageUrl ?? ''}
              alt={studio.name}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          </div>
          <div className="flex flex-col gap-2 px-2 py-3">
            <h3 className="truncate font-semibold">{studio.name}</h3>

            <p className="truncate text-xs text-gray-400">{studio.address}</p>

            {hasServices ? (
              <ServiceListing className="mt-2" services={studio.services} />
            ) : (
              <span className="truncate text-sm font-bold text-gray-400">
                {studio.city}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

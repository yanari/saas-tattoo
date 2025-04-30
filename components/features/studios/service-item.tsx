import { TattooStudioService } from '@prisma/client'
import React from 'react'
import { Card, CardContent } from '../../ui/card'
import Image from 'next/image'
import { Button } from '../../ui/button'

interface ServiceItemProps {
  service: TattooStudioService
}

export function ServiceItem({ service }: ServiceItemProps) {
  return (
    <Card className="p-0">
      <CardContent className="flex items-center justify-between gap-4 p-4 sm:justify-start">
        <div className="relative max-h-32 min-h-32 max-w-32 min-w-32">
          <Image
            className="w-full rounded-lg object-cover"
            src={service.imageUrl}
            alt={service.name}
            sizes="(max-width: 768px) 100vw"
            fill
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-primary font-bold">
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(service.price))}
            </span>
            <Button variant="secondary">Reservar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

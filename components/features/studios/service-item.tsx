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
      <CardContent className="flex items-center sm:justify-start justify-between p-4 gap-4">
        <div className="relative min-w-32 min-h-32 max-h-32 max-w-32">
          <Image
            className="rounded-lg object-cover w-full"
            src={service.imageUrl}
            alt={service.name}
            sizes="(max-width: 768px) 100vw"
            fill
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-lg font-semibold">{service.name}</h3>
          <p className="text-sm text-gray-400">{service.description}</p>
          <div className="flex justify-between items-center">
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

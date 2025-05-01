'use client'

import { TattooStudioService } from '@prisma/client'
import React from 'react'
import { Card, CardContent } from '../../ui/card'
import Image from 'next/image'
import { Button } from '../../ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Calendar } from '@/components/ui/calendar'
import { ptBR } from 'date-fns/locale'

interface ServiceItemProps {
  service: TattooStudioService
}

// TODO: remover a classe .dark\:hover\:bg-accent\/50:hover { background-color: color-mix(in oklab, var(--accent) 50%, transparent);
export function ServiceItem({ service }: ServiceItemProps) {
  const [selectedDay, setSelectedDay] = React.useState<Date | undefined>(
    undefined,
  )

  const handleDateSelect = (date: Date | undefined) => setSelectedDay(date)

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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary">Reservar</Button>
              </SheetTrigger>

              <SheetContent className="px-0">
                <SheetHeader>
                  <SheetTitle>Reserve um horário</SheetTitle>
                </SheetHeader>

                <SheetDescription className="text-center">
                  Agendar:
                  <br />
                  <span className="text-base font-bold">
                    &ldquo;{service.name}&rdquo;
                  </span>
                </SheetDescription>

                <div className="border-b border-solid py-4">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    styles={{
                      head_cell: {
                        width: '100%',
                      },
                      cell: {
                        width: '100%',
                      },
                      nav_button_next: {
                        width: '32px',
                        height: '32px',
                      },
                      nav_button_previous: {
                        width: '32px',
                        height: '32px',
                      },
                      caption: {
                        textTransform: 'capitalize',
                      },
                      button: {
                        width: '100%',
                      },
                    }}
                  />
                </div>
                <div></div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

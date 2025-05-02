'use client'

import { TattooStudio, TattooStudioService } from '@prisma/client'
import React, { useState } from 'react'
import { Card, CardContent } from '../../ui/card'
import Image from 'next/image'
import { Button } from '../../ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Calendar } from '@/components/ui/calendar'
import { ptBR } from 'date-fns/locale'
import { format } from 'date-fns'
import { createBooking } from '@/lib/actions/create-booking'
import { useSession } from 'next-auth/react'
import { isDateUnavailable } from '@/utils/date'
import { toast } from 'sonner'
import { LoginModalTrigger } from '@/components/layout/login-modal-trigger'
import { useRouter } from 'next/navigation'
import {
  DurationTime,
  getBookingCallbackUrl,
  isBookingIncomplete,
} from '@/utils/booking'
import { parseAvailability } from '@/utils/availability'

type TattooStudioServiceWithPrice = Omit<TattooStudioService, 'price'> & {
  price: number
}

interface ServiceItemProps {
  service: TattooStudioServiceWithPrice
  studio: Pick<TattooStudio, 'name' | 'slug'>
}

export function ServiceItem({ service, studio }: ServiceItemProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedDuration, setSelectedDuration] = useState<
    DurationTime | undefined
  >(undefined)

  const handleDateSelect = (date: Date | undefined) => setSelectedDay(date)

  const handleTimeSelect = (startTime: Date, endTime: Date) => {
    setSelectedDuration({ startTime, endTime })
  }

  const isDisabled = isBookingIncomplete(selectedDay, selectedDuration)

  const availability = parseAvailability(service.availability)

  const disabledDays = React.useMemo(() => {
    return isDateUnavailable(availability)
  }, [availability])

  const selectedKey = selectedDay
    ? selectedDay.toISOString().split('T')[0]
    : null

  const slotsForSelectedDay = selectedKey ? availability[selectedKey] || [] : []

  const callbackUrl = getBookingCallbackUrl({
    serviceId: service.id,
    serviceName: service.name,
    servicePrice: service.price,
    studioSlug: studio.slug,
    studioName: studio.name,
    date: selectedDay,
    startTime: selectedDuration?.startTime,
    endTime: selectedDuration?.endTime,
  })

  const handleCreateBooking = async () => {
    if (!selectedDay || !selectedDuration) return
    if (!session?.user) return
    try {
      await createBooking({
        serviceId: service.id,
        startTime: selectedDuration.startTime!,
        endTime: selectedDuration.endTime!,
        userId: session?.user.id,
        date: selectedDay,
      })
      router.push(callbackUrl)
      toast.success('Reserva criada com sucesso.')
    } catch (error) {
      console.log(error)
      toast.error('Não foi possível criar a reserva.')
    }
  }

  return (
    <Card className="p-0">
      <CardContent className="flex items-center justify-between gap-4 p-4 sm:justify-start">
        <div className="relative max-h-32 min-h-32 max-w-32 min-w-32">
          <Image
            className="w-full rounded-lg object-cover"
            src={service.imageUrl ?? ''}
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

                <SheetDescription className="flex justify-between px-3">
                  Agendamento:
                  <span className="text-primary font-bold">
                    &ldquo;{service.name}&rdquo;
                  </span>
                </SheetDescription>

                <div className="border-b border-solid pb-6">
                  <Calendar
                    mode="single"
                    disabled={disabledDays}
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                  />
                </div>
                {selectedDay && (
                  <div className="flex gap-2 overflow-x-auto border-b border-solid pb-4 pl-4 [&::-webkit-scrollbar]:hidden">
                    {slotsForSelectedDay.map((slot, index) => {
                      const start = new Date(`1970-01-01T${slot.startTime}:00Z`)
                      const end = new Date(`1970-01-01T${slot.endTime}:00Z`)
                      const isSelected =
                        selectedDuration?.startTime?.getTime() ===
                        start.getTime()

                      return (
                        <Button
                          className="px-4"
                          key={index}
                          variant={isSelected ? 'default' : 'outline'}
                          onClick={() => handleTimeSelect(start, end)}
                        >
                          {format(start, 'HH:mm')} - {format(end, 'HH:mm')}
                        </Button>
                      )
                    })}
                  </div>
                )}

                {selectedDuration && (
                  <div className="px-4">
                    <Card className="p-3">
                      <CardContent className="grid gap-2 p-1">
                        <div className="flex items-center justify-between">
                          <h2 className="w-8/12 truncate text-sm font-bold">
                            {service.name}
                          </h2>
                          <p className="text-sm font-bold">
                            {Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Data</h2>
                          <p className="text-sm">
                            {format(selectedDay!, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Horário</h2>
                          <p className="text-sm">
                            {format(selectedDuration.startTime, 'HH:mm', {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Estúdio</h2>
                          <p className="text-sm">{studio.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SheetFooter>
                  {session?.user ? (
                    <SheetClose asChild>
                      <Button
                        disabled={isDisabled}
                        onClick={handleCreateBooking}
                        className="w-full"
                      >
                        Confirmar
                      </Button>
                    </SheetClose>
                  ) : (
                    <LoginModalTrigger
                      autoCloseOnLogin
                      callbackUrl={callbackUrl}
                    >
                      <Button disabled={isDisabled} className="w-full">
                        Confirmar
                      </Button>
                    </LoginModalTrigger>
                  )}
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

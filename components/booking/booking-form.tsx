'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent } from '@/components/ui/card'
import {
  SheetFooter,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet'
import { LoginModalTrigger } from '@/components/layout/login-modal-trigger'
import { useBooking } from '@/hooks/useBooking'
import { TattooStudio, TattooStudioService } from '@prisma/client'

interface BookingFormProps {
  service: Omit<TattooStudioService, 'price'> & { price: number }
  studio: Pick<TattooStudio, 'name' | 'slug'>
}

export function BookingForm({ service, studio }: BookingFormProps) {
  const {
    selectedDay,
    selectedDuration,
    disabledDays,
    slotsForSelectedDay,
    setSelectedDay,
    setSelectedDuration,
    isDisabled,
    handleCreateBooking,
    callbackUrl,
    isUserLoggedIn,
  } = useBooking({ service, studio })

  return (
    <>
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
          onSelect={setSelectedDay}
        />
      </div>

      {selectedDay && (
        <div className="flex gap-2 overflow-x-auto border-b border-solid pb-4 pl-4 [&::-webkit-scrollbar]:hidden">
          {slotsForSelectedDay.map((slot, index) => {
            const start = new Date(`1970-01-01T${slot.startTime}:00Z`)
            const end = new Date(`1970-01-01T${slot.endTime}:00Z`)
            const isSelected =
              selectedDuration?.startTime?.getTime() === start.getTime()

            return (
              <Button
                className="px-4"
                key={index}
                variant={isSelected ? 'default' : 'outline'}
                onClick={() =>
                  setSelectedDuration({ startTime: start, endTime: end })
                }
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
              <BookingDetail
                label="Serviço"
                value={service.name}
                price={service.price}
              />
              <BookingDetail
                label="Data"
                value={format(selectedDay!, "d 'de' MMMM", { locale: ptBR })}
              />
              <BookingDetail
                label="Horário"
                value={format(selectedDuration.startTime, 'HH:mm')}
              />
              <BookingDetail label="Estúdio" value={studio.name} />
            </CardContent>
          </Card>
        </div>
      )}

      <SheetFooter>
        {isUserLoggedIn ? (
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
          <LoginModalTrigger autoCloseOnLogin callbackUrl={callbackUrl}>
            <Button disabled={isDisabled} className="w-full">
              Confirmar
            </Button>
          </LoginModalTrigger>
        )}
      </SheetFooter>
    </>
  )
}

function BookingDetail({
  label,
  value,
  price,
}: {
  label: string
  value?: string
  price?: number
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-muted-foreground text-sm">{label}</h2>
      <p className="text-sm font-bold">
        {price != null
          ? Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price)
          : value}
      </p>
    </div>
  )
}

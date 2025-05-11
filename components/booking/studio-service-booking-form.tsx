'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  SheetFooter,
  SheetDescription,
  SheetClose,
} from '@/components/ui/sheet'
import { LoginModalTrigger } from '@/components/layout/login-modal-trigger'
import { useStudioServiceBooking } from '@/hooks/useStudioServiceBooking'
import { TattooStudio, TattooStudioService } from '@prisma/client'
import { ConfirmationCard } from './confirmation-card'

interface BookingFormProps {
  service: TattooStudioService
  studio: Pick<TattooStudio, 'name' | 'slug'>
}

export function StudioServiceBookingForm({
  service,
  studio,
}: BookingFormProps) {
  const {
    selectedDay,
    selectedDuration,
    disabledDays,
    slotsForSelectedDay,
    setSelectedDay,
    setSelectedDuration,
    isDisabled,
    isUserLoggedIn,
    handleCreateBooking,
    redirectUrl,
  } = useStudioServiceBooking({ service, studio })

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
            const day = format(selectedDay, 'yyyy-MM-dd')

            const start = new Date(`${day}T${slot.startTime}`)
            const end = new Date(`${day}T${slot.endTime}`)

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

      {selectedDuration && selectedDay && (
        <div className="px-4">
          <ConfirmationCard
            className="p-3"
            serviceName={service.name}
            servicePrice={service.price.toString()}
            startTime={selectedDuration.startTime}
            studioName={studio.name}
          />
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
          <LoginModalTrigger
            autoCloseOnLogin
            onOpen={handleCreateBooking}
            callbackUrl={redirectUrl}
          >
            <Button disabled={isDisabled} className="w-full">
              Confirmar
            </Button>
          </LoginModalTrigger>
        )}
      </SheetFooter>
    </>
  )
}

import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export type BookingWithServiceAndStudio = Prisma.BookingGetPayload<{
  include: {
    service: {
      include: {
        tattooStudio: true
      }
    }
  }
}>

interface UpcomingBookingCardProps {
  booking: BookingWithServiceAndStudio
}

export function UpcomingBookingCard({ booking }: UpcomingBookingCardProps) {
  console.log({ booking })
  const time = format(booking.startTime, 'HH:mm', { locale: ptBR })
  return (
    <Card>
      <CardContent className="flex justify-between">
        <div className="flex flex-col gap-2">
          <Badge>Confirmado</Badge>
          <h3 className="font-semibold">{booking.service.name}</h3>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.service.tattooStudio.imageUrl ?? ''} />
            </Avatar>
            <p className="text-sm">{booking.service.tattooStudio.name}</p>
          </div>
        </div>
        <div className="flex w-24 flex-col items-center justify-center border-l-2 border-solid pl-6">
          <p className="text-sm">
            {format(booking.date, 'MMMM', { locale: ptBR })}
          </p>
          <p className="text-2xl font-semibold">
            {format(booking.startTime, 'dd', { locale: ptBR })}
          </p>
          <p className="text-sm">{time}</p>
        </div>
      </CardContent>
    </Card>
  )
}

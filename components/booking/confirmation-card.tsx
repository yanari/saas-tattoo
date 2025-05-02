import { format } from 'date-fns'
import { Card, CardContent } from '../ui/card'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface ConfirmationCardProps {
  className?: string
  serviceName: string
  servicePrice: string
  dateInISOString: string | null
  startTimeInISOString: string | null
  studioName: string
}

export function ConfirmationCard({
  className,
  serviceName,
  servicePrice,
  dateInISOString,
  startTimeInISOString,
  studioName,
}: ConfirmationCardProps) {
  return (
    <Card className={cn(className)}>
      <CardContent className="grid gap-2 p-0">
        <div className="flex items-center justify-between">
          <h2 className="truncate text-sm font-bold">{serviceName}</h2>
          <p className="text-sm font-bold">
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(servicePrice))}
          </p>
        </div>

        {dateInISOString && (
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-400">Data</h2>
            <p className="text-sm">
              {format(new Date(dateInISOString), "d 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>
        )}

        {startTimeInISOString && (
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-400">Horário</h2>
            <p className="text-sm">
              {format(new Date(startTimeInISOString), 'HH:mm', {
                locale: ptBR,
              })}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Estúdio</h2>
          <p className="text-sm">{studioName}</p>
        </div>
      </CardContent>
    </Card>
  )
}

import { format } from 'date-fns'
import { Card, CardContent } from '../ui/card'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface ConfirmationCardProps {
  className?: string
  serviceName: string
  servicePrice: string
  startTime: Date | null
  studioName: string
}

export function ConfirmationCard({
  className,
  serviceName,
  servicePrice,
  startTime,
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

        {startTime && (
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-400">Data</h2>
            <p className="text-right text-sm">
              {format(startTime, "d 'de' MMMM", {
                locale: ptBR,
              })}
            </p>
          </div>
        )}

        {startTime && (
          <div className="flex items-center justify-between">
            <h2 className="text-sm text-gray-400">Horário</h2>
            <p className="text-right text-sm">
              {format(startTime, 'HH:mm', {
                locale: ptBR,
              })}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between">
          <h2 className="text-sm text-gray-400">Estúdio</h2>
          <p className="text-right text-sm">{studioName}</p>
        </div>
      </CardContent>
    </Card>
  )
}

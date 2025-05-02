import { cn } from '@/lib/utils'
import { Prisma } from '@prisma/client'

type TattooStudioWithServices = Prisma.TattooStudioGetPayload<{
  include: { services: true }
}>

interface StudioServicePreviewProps {
  services: TattooStudioWithServices['services']
  className?: string
}

export function StudioServicePreview({
  className,
  services,
}: StudioServicePreviewProps) {
  if (!services || services.length === 0) return null
  return (
    <div className={cn(className, 'flex w-full flex-wrap gap-2')}>
      {services.map((service) => (
        <div
          key={service.id}
          className="flex w-full items-center justify-between"
        >
          <h3 className="truncate text-sm font-semibold">{service.name}</h3>
          <span className="text-primary text-sm font-bold">
            {Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(Number(service.price))}
          </span>
        </div>
      ))}
    </div>
  )
}

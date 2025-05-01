import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { TattooStudio } from '@prisma/client'

interface StyleBadgesProps {
  styles: TattooStudio['styles']
  className?: string
}
export function StyleBadges({ className, styles }: StyleBadgesProps) {
  return (
    <div className={cn(className, 'flex w-full flex-wrap gap-2')}>
      {styles.map((style) => (
        <Badge key={style}>{style}</Badge>
      ))}
    </div>
  )
}

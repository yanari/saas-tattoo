import { Card, CardContent } from '../ui/card'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'

// TODO: Receive studio as props
export function BookingItem() {
  return (
    <Card>
      <CardContent className="flex justify-between">
        <div className="flex flex-col gap-2">
          <Badge>Confirmado</Badge>
          <h3 className="font-semibold">Piercing na Barriga</h3>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="https://images.pexels.com/photos/3657565/pexels-photo-3657565.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </Avatar>
            <p className="text-sm">Rock Tattoo</p>
          </div>
        </div>
        <div className="flex w-24 flex-col items-center justify-center border-l-2 border-solid pl-6">
          <p className="text-sm">Novembro</p>
          <p className="text-2xl font-semibold">05</p>
          <p className="text-sm">20:00</p>
        </div>
      </CardContent>
    </Card>
  )
}

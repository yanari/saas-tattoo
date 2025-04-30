import { MenuIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
// import { Logo } from '../ui/logo'
import Link from 'next/link'
import { Sheet, SheetTrigger } from '../ui/sheet'
import { Sidebar } from './sidebar'
import Image from 'next/image'

export function Header() {
  return (
    <Card className="rounded-t-none">
      <CardContent className="flex flex-row items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo Inkbookd"
            width={160}
            height={36}
            priority
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <Sidebar />
        </Sheet>
      </CardContent>
    </Card>
  )
}

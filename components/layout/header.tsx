import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Logo } from '../ui/logo'
import Link from 'next/link'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Avatar, AvatarImage } from '../ui/avatar'

export function Header() {
  return (
    <Card className="rounded-t-none">
      <CardContent className="flex flex-row items-center justify-between">
        <Link href="/">
          <Logo className="fill-primary h-12 w-32" />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid p-6">
              <Avatar>
                <AvatarImage src="https://github.com/yanari.png" />
              </Avatar>

              <div>
                <p className="font-bold">Marcelle Yanari</p>
                <p className="text-xs">yanarimy@gmail.com</p>
              </div>
            </div>

            <div className="flex flex-col border-b border-solid p-6">
              <ul className="flex flex-col gap-4">
                <li>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild className="w-full">
                      <Link className="flex justify-start" href="/">
                        <HomeIcon />
                        Início
                      </Link>
                    </Button>
                  </SheetClose>
                </li>
                <li>
                  <SheetClose asChild>
                    <Button variant="ghost" asChild className="w-full">
                      <Link className="flex justify-start" href="/about">
                        <CalendarIcon />
                        Agendamentos
                      </Link>
                    </Button>
                  </SheetClose>
                </li>
              </ul>
            </div>

            <div className="grid p-6">
              <Button asChild variant="ghost" className="w-full">
                <Link className="flex justify-start" href="/">
                  <LogOutIcon />
                  Sair da conta
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

import { HomeIcon, CalendarIcon, LogOutIcon, LogInIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { SheetContent, SheetHeader, SheetTitle, SheetClose } from '../ui/sheet'
import Link from 'next/link'
// import { Avatar, AvatarImage } from '../ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import Image from 'next/image'

export function Sidebar() {
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid p-6">
        <h2 className="font-bold">Olá! Faça seu login</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon">
              <LogInIcon />
            </Button>
          </DialogTrigger>

          <DialogContent className="w-11/12">
            <DialogHeader>
              <DialogTitle>Faça login na plataforma</DialogTitle>
              <DialogDescription>Conecte-se usando o Google</DialogDescription>
            </DialogHeader>

            <Button variant="outline" className="font-bold">
              <Image
                className="text-white"
                alt="Google"
                src="/google.svg"
                width={24}
                height={24}
              />
              Google
            </Button>
          </DialogContent>
        </Dialog>
        {/* <Avatar>
          <AvatarImage src="https://github.com/yanari.png" />
        </Avatar>

        <div>
          <p className="font-bold">Marcelle Yanari</p>
          <p className="text-xs">yanarimy@gmail.com</p>
        </div> */}
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
  )
}

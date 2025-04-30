'use client'

import { HomeIcon, CalendarIcon, LogOutIcon, LogInIcon } from 'lucide-react'
import { Button } from '../ui/button'
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetDescription,
} from '../ui/sheet'
import Link from 'next/link'
import { Avatar, AvatarImage } from '../ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'

import { LoginButton } from '../ui/login-button'
import { signOut, useSession } from 'next-auth/react'

export function Sidebar() {
  const { data: session } = useSession()

  const logOut = () => signOut()

  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>
      <SheetDescription className="hidden">Sidebar menu</SheetDescription>

      <div className="border-b border-solid">
        <div className="flex items-center justify-between gap-3 p-6">
          {session ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={session?.user?.image ?? ''} />
              </Avatar>

              <div>
                <p className="font-bold">{session?.user?.name}</p>
                <p className="text-xs">{session?.user?.email}</p>
              </div>
            </div>
          ) : (
            <>
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
                    <DialogDescription>
                      Conecte-se usando o Google
                    </DialogDescription>
                  </DialogHeader>

                  <LoginButton provider="google" />
                  {/* <LoginButton provider="instagram" /> */}
                </DialogContent>
              </Dialog>
            </>
          )}
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
        <Button
          onClick={logOut}
          variant="ghost"
          className="flex w-full justify-start"
        >
          <LogOutIcon />
          Sair da conta
        </Button>
      </div>
    </SheetContent>
  )
}

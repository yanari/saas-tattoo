import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog'
import { LoginButton } from '../ui/login-button'
import { type ReactNode } from 'react'

export type LoginModalTriggerProps = {
  children: ReactNode
}

export function LoginModalTrigger({ children }: LoginModalTriggerProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-11/12">
        <DialogHeader>
          <DialogTitle>Faça login na plataforma</DialogTitle>
          <DialogDescription>Conecte-se usando o Google</DialogDescription>
        </DialogHeader>

        <LoginButton provider="google" />
      </DialogContent>
    </Dialog>
  )
}

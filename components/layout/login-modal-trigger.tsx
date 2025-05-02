'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog'
import { useEffect, useState, type ReactNode } from 'react'
import { useSession } from 'next-auth/react'
import { LoginButton } from '../ui/login-button'

export type LoginModalTriggerProps = {
  children: ReactNode
  callbackUrl?: string
  autoCloseOnLogin?: boolean
}

export function LoginModalTrigger({
  children,
  callbackUrl,
  autoCloseOnLogin = false,
}: LoginModalTriggerProps) {
  const [open, setOpen] = useState(false)
  const { status } = useSession()

  useEffect(() => {
    if (autoCloseOnLogin && status === 'authenticated') {
      setOpen(false)
    }
  }, [status, autoCloseOnLogin])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="w-11/12">
        <DialogHeader>
          <DialogTitle>Sign in to continue</DialogTitle>
          <DialogDescription>
            You can use your Google account.
          </DialogDescription>
        </DialogHeader>

        <LoginButton provider="google" callbackUrl={callbackUrl} />
      </DialogContent>
    </Dialog>
  )
}

'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from '../ui/dialog'
import {
  useEffect,
  useState,
  type ReactElement,
  cloneElement,
  type MouseEventHandler,
} from 'react'
import { useSession } from 'next-auth/react'
import { LoginButton } from '../ui/login-button'

type ClickableElement = ReactElement<{ onClick?: MouseEventHandler }>

export type LoginModalTriggerProps = {
  children: ClickableElement
  autoCloseOnLogin?: boolean
  onOpen?: () => void
  callbackUrl?: string
}

export function LoginModalTrigger({
  children,
  autoCloseOnLogin = false,
  onOpen,
  callbackUrl,
}: LoginModalTriggerProps) {
  const [open, setOpen] = useState(false)
  const { status } = useSession()

  useEffect(() => {
    if (autoCloseOnLogin && open && status === 'authenticated') {
      setOpen(false)
    }
  }, [status, autoCloseOnLogin, open])

  const trigger = cloneElement(children, {
    onClick: (e) => {
      children.props?.onClick?.(e)
      onOpen?.()
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

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

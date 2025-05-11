'use client'

import { signIn } from 'next-auth/react'
import { Button } from './button'
import Image from 'next/image'

const providers = {
  google: {
    label: 'Google',
    icon: '/google.svg',
  },
  instagram: {
    label: 'Instagram',
    icon: '/instagram.svg',
  },
}

interface LoginButtonProps {
  provider: 'google' | 'instagram'
  callbackUrl?: string
}

export function LoginButton({ provider, callbackUrl }: LoginButtonProps) {
  const { icon, label } = providers[provider]

  return (
    <Button
      onClick={() => signIn('google', { callbackUrl })}
      variant="outline"
      className="font-bold"
      type="button"
    >
      <Image
        className="text-white"
        alt={label}
        src={icon}
        width={24}
        height={24}
      />
      {label}
    </Button>
  )
}

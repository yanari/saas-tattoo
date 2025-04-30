'use client'

import { useSession } from 'next-auth/react'
import { Skeleton } from './skeleton'

export function Welcome() {
  const { data: session, status } = useSession()

  const isLoading = status === 'loading'
  const displayName = session ? session?.user?.name : 'visitante'

  if (isLoading) {
    return <Skeleton className="mb-1 h-6 w-44" />
  }

  return <h2 className="text-xl font-bold">Olá, {displayName}!</h2>
}

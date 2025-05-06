'use server'

import { db } from '../../prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth'

export async function getBooking() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return null
  }

  return await db.booking.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      artistQuote: {
        include: {
          artist: true,
        },
      },
      tattooStudioService: {
        include: {
          tattooStudio: true,
        },
      },
    },
  })
}

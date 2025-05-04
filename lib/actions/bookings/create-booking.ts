'use server'

import { Prisma } from '@prisma/client'
import { db } from '../../prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth'

type CreateBookingParams = Prisma.BookingCreateArgs['data']

export async function createBooking(params: CreateBookingParams) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('User not authenticated')
  }

  if (params.userId !== session.user.id) {
    throw new Error('User not authorized')
  }

  await db.booking.create({
    data: params,
  })
}

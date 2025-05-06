'use server'

import { db } from '../../prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth'
import { Prisma } from '@prisma/client'

type CreateBookingInput = {
  userId?: string
  quoteId?: string
  tattooStudioServiceId?: string
  confirmedAt?: Date
  paymentConfirmed?: boolean
  startTime?: Date
  endTime?: Date
}

export async function createBooking({
  userId,
  quoteId,
  tattooStudioServiceId,
  confirmedAt,
  paymentConfirmed = false,
  startTime,
  endTime,
}: CreateBookingInput) {
  const isQuote = !!quoteId
  const isService = !!tattooStudioServiceId
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('User not authenticated')
  }

  if (!userId) {
    throw new Error('User not provided')
  }

  if (userId !== session.user.id) {
    throw new Error('User not authorized')
  }

  if (isQuote === isService) {
    throw new Error(
      'Booking deve conter apenas quoteId ou tattooStudioServiceId, nunca ambos ou nenhum.',
    )
  }

  if (!startTime || !endTime) {
    throw new Error('startTime e endTime são obrigatórios')
  }

  const data: Prisma.BookingCreateInput = {
    startTime,
    endTime,
    confirmedAt,
    paymentConfirmed,
    status: 'PENDING',
    user: {
      connect: { id: userId },
    },
    ...(quoteId && {
      artistQuote: {
        connect: { id: quoteId },
      },
    }),
    ...(tattooStudioServiceId && {
      tattooStudioService: {
        connect: { id: tattooStudioServiceId },
      },
    }),
  }

  return db.booking.create({ data })
}

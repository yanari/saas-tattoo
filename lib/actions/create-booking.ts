'use server'

import { Prisma } from '@prisma/client'
import { db } from '../prisma/client'

type CreateBookingParams = Prisma.BookingCreateArgs['data']

export async function createBooking(params: CreateBookingParams) {
  await db.booking.create({
    data: params,
  })
}

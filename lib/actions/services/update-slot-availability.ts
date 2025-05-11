'use server'

import { db } from '@/lib/prisma/client'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

const schema = z.object({
  serviceId: z.string().cuid(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  isAvailable: z.boolean(),
})

type Slot = { startTime: string; endTime: string; isAvailable: boolean }

export async function updateSlotAvailability(formData: unknown) {
  const data = schema.parse(formData)

  const service = await db.tattooStudioService.findUnique({
    where: { id: data.serviceId },
    include: {
      tattooStudio: {
        select: { slug: true },
      },
    },
  })

  if (!service?.availability || !service.tattooStudio?.slug) {
    throw new Error('Service or studio not found')
  }

  const availability = service.availability as Record<string, Slot[]>

  const slots = availability[data.date]
  if (!slots) {
    throw new Error(`No slots found for date ${data.date}`)
  }

  const slotIndex = slots.findIndex((s) => s.startTime === data.startTime)
  if (slotIndex === -1) {
    throw new Error(`Slot ${data.startTime} not found on ${data.date}`)
  }

  slots[slotIndex].isAvailable = data.isAvailable
  availability[data.date] = slots

  await db.tattooStudioService.update({
    where: { id: data.serviceId },
    data: {
      availability,
    },
  })

  // Revalida a página do estúdio
  revalidatePath(`/studios/${service.tattooStudio.slug}`)
}

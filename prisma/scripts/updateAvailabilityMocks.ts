import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateMockAvailability(): Record<
  string,
  { startTime: string; endTime: string; isAvailable: boolean }[]
> {
  const availability: Record<
    string,
    { startTime: string; endTime: string; isAvailable: boolean }[]
  > = {}
  const daysToGenerate = Math.floor(Math.random() * 5) + 1 // de 1 a 5 dias

  const baseDate = new Date('2025-05-01')

  for (let i = 0; i < daysToGenerate; i++) {
    const date = new Date(baseDate)
    date.setDate(baseDate.getDate() + i + Math.floor(Math.random() * 5)) // adiciona aleatoriamente de 0 a 5 dias

    const isoDate = date.toISOString().split('T')[0]
    const slotsInDay = Math.floor(Math.random() * 4) + 1 // de 1 a 4 horários

    const hours = new Set<number>()
    while (hours.size < slotsInDay) {
      hours.add(Math.floor(Math.random() * 8) + 9) // de 09:00 a 17:00
    }

    availability[isoDate] = Array.from(hours)
      .sort()
      .map((hour) => ({
        startTime: `${hour.toString().padStart(2, '0')}:00`,
        endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
        isAvailable: false,
      }))
  }

  return availability
}

async function main() {
  const services = await prisma.tattooStudioService.findMany()

  for (const service of services) {
    const newAvailability = generateMockAvailability()

    await prisma.tattooStudioService.update({
      where: { id: service.id },
      data: {
        availability: newAvailability,
      },
    })

    console.log(`Updated service ${service.id} with new mock availability`)
  }

  console.log('All services updated 🎉')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

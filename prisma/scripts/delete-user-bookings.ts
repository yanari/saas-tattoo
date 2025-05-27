import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const userId = 'USER_ID'

  const deleted = await prisma.booking.deleteMany({
    where: { userId },
  })

  console.log(`🔥 ${deleted.count} bookings apagados para o usuário ${userId}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

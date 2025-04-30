import { BookingItem } from '@/components/features/booking-item'
import { TattooStudioItem } from '@/components/features/tattoo-studio-item'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { db } from '@/lib/prisma'
import { formatDate } from '@/utils/date'
import { SearchIcon } from 'lucide-react'

export default async function Home() {
  const studios = await db.tattooStudio.findMany()
  const popularStudios = await db.tattooStudio.findMany({
    orderBy: {
      name: 'desc',
    },
  })

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6 pt-6">
        <div className="px-6">
          <h2 className="text-xl font-bold">Olá, Marcelle</h2>
          <p>{formatDate()}</p>
        </div>

        <div className="px-6 gap-4 flex items-center">
          <Input placeholder="Pesquisar..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <section className="px-6">
          <h2 className="uppercase text-gray-400 text-sm font-bold mb-3">
            Agendamentos
          </h2>
          <BookingItem />
        </section>

        <section>
          <h2 className="px-6 uppercase text-gray-400 text-sm font-bold mb-3">
            Recomendados
          </h2>
          <div className="pl-6 flex gap-4 max-w-full overflow-auto [&::-webkit-scrollbar]:hidden">
            {studios.map((studio) => (
              <TattooStudioItem key={studio.id} studio={studio} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="px-6 uppercase text-gray-400 text-sm font-bold mb-3">
            Populares
          </h2>
          <div className="pl-6 flex gap-4 max-w-full overflow-auto [&::-webkit-scrollbar]:hidden">
            {popularStudios.map((studio) => (
              <TattooStudioItem key={studio.id} studio={studio} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

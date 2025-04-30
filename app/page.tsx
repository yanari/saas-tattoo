import { BookingItem } from '@/components/features/booking-item'
import { TattooStudioItem } from '@/components/features/tattoo-studio-item'
import { Header } from '@/components/layout/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Welcome } from '@/components/ui/welcome'
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
          <Welcome />
          <p>{formatDate()}</p>
        </div>

        <div className="flex items-center gap-4 px-6">
          <Input placeholder="Pesquisar..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <section className="px-6">
          <h2 className="mb-3 text-sm font-bold text-gray-400 uppercase">
            Agendamentos
          </h2>
          <BookingItem />
        </section>

        <section>
          <h2 className="mb-3 px-6 text-sm font-bold text-gray-400 uppercase">
            Recomendados
          </h2>
          <div className="flex max-w-full gap-4 overflow-auto pl-6 [&::-webkit-scrollbar]:hidden">
            {studios.map((studio) => (
              <TattooStudioItem key={studio.id} studio={studio} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-3 px-6 text-sm font-bold text-gray-400 uppercase">
            Populares
          </h2>
          <div className="flex max-w-full gap-4 overflow-auto pl-6 [&::-webkit-scrollbar]:hidden">
            {popularStudios.map((studio) => (
              <TattooStudioItem key={studio.id} studio={studio} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

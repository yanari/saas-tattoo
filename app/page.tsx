import { UpcomingBookingCard } from '@/components/booking/upcoming-booking-card'
import { Header } from '@/components/layout/header'
import { SearchForm } from '@/components/layout/search-form'
import { TattooStudioItem } from '@/components/studios/tattoo-studio-item'
import { Welcome } from '@/components/ui/welcome'
import { db } from '@/lib/prisma/client'
import { formatDate } from '@/utils/date'

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

        <SearchForm />

        <section className="px-6">
          <h2 className="mb-3 text-sm font-bold text-gray-400 uppercase">
            Agendamentos
          </h2>
          <UpcomingBookingCard />
        </section>

        <section>
          <h2 className="mb-3 px-6 text-sm font-bold text-gray-400 uppercase">
            Recomendados
          </h2>
          <div className="flex max-w-full gap-4 overflow-auto pl-6 [&::-webkit-scrollbar]:hidden [&>:last-of-type]:mr-6">
            {studios.map((studio) => (
              <TattooStudioItem key={studio.id} studio={studio} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-3 px-6 text-sm font-bold text-gray-400 uppercase">
            Populares
          </h2>
          <div className="flex max-w-full gap-4 overflow-auto pl-6 [&::-webkit-scrollbar]:hidden [&>:last-of-type]:mr-6">
            {popularStudios.map((studio) => (
              <TattooStudioItem key={studio.id} studio={studio} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

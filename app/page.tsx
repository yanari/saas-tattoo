import { ArtistItem } from '@/components/artists/artist-item'
import { UpcomingBookingCard } from '@/components/booking/upcoming-booking-card'
import { Header } from '@/components/layout/header'
import { SearchForm } from '@/components/layout/search-form'
import { TattooStudioItem } from '@/components/studios/tattoo-studio-item'
import { Welcome } from '@/components/ui/welcome'
import { getBooking } from '@/lib/actions/bookings/get-bookings'
import { db } from '@/lib/prisma/client'
import { formatDate } from '@/utils/date'

export default async function Home() {
  const studios = await db.tattooStudio.findMany()

  const artists = await db.artist.findMany()

  const bookings = await getBooking()

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6 pt-6">
        <div className="px-6">
          <Welcome />
          <p>{formatDate()}</p>
        </div>

        <SearchForm />

        {bookings && (
          <section className="px-6">
            <h2 className="mb-3 text-sm font-bold text-gray-400 uppercase">
              Agendamentos
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {bookings.map((booking) => (
                <UpcomingBookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </section>
        )}

        <section>
          <h2 className="mb-3 px-6 text-sm font-bold text-gray-400 uppercase">
            Estúdios Recomendados
          </h2>
          <div className="flex max-w-full gap-4 overflow-auto pl-6 [&::-webkit-scrollbar]:hidden [&>:last-of-type]:mr-6">
            {studios.map((studio) => (
              <TattooStudioItem key={studio.id} studio={studio} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="mb-3 px-6 text-sm font-bold text-gray-400 uppercase">
            Artistas Recomendados
          </h2>
          <div className="flex max-w-full gap-4 overflow-auto pl-6 [&::-webkit-scrollbar]:hidden [&>:last-of-type]:mr-6">
            {artists.map((artist) => (
              <ArtistItem key={artist.id} artist={artist} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

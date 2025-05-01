import { TattooStudioItem } from '@/components/features/tattoo-studio-item'
import { Header } from '@/components/layout/header'
import { SearchForm } from '@/components/layout/search-form'
import { findStudiosWithMatchingServices } from '@/lib/prisma/queries/studios'

interface StudioPageProps {
  searchParams: {
    search?: string
  }
}

export default async function StudiosPage({ searchParams }: StudioPageProps) {
  const { search } = searchParams

  const studios = await findStudiosWithMatchingServices({
    search,
    withServices: true,
  })

  return (
    <div>
      <Header />
      <div className="mt-6">
        <SearchForm />
      </div>
      <div className="p-6">
        <h2 className="mb-3 text-sm font-bold text-gray-400 uppercase">
          Resultados para &ldquo;{searchParams.search}&rdquo;:
        </h2>
        <div className="grid gap-5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {studios.map((studio) => (
            <TattooStudioItem key={studio.id} studio={studio} withServices />
          ))}
        </div>
      </div>
    </div>
  )
}

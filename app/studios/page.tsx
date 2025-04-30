import { TattooStudioItem } from '@/components/features/tattoo-studio-item'
import { Header } from '@/components/layout/header'
import { db } from '@/lib/prisma'

interface StudioPageProps {
  searchParams: {
    search?: string
  }
}

export default async function StudiosPage({ searchParams }: StudioPageProps) {
  const { search } = searchParams
  const studios = await db.tattooStudio.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
  })
  return (
    <div>
      <Header />
      <div className="p-6">
        <h2 className="mb-3 text-sm font-bold text-gray-400 uppercase">
          Resultados para &ldquo;{searchParams.search}&rdquo;:
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {studios.map((studio) => (
            <TattooStudioItem key={studio.id} studio={studio} />
          ))}
        </div>
      </div>
    </div>
  )
}

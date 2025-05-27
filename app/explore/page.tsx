export const dynamic = 'force-dynamic'

import { Header } from '@/components/layout/header'
import { SearchForm } from '@/components/layout/search-form'
import { searchStudiosAndArtists } from '@/lib/actions/search/search-entities'
import { SearchStudioItem } from '@/components/search/search-studio-item'
import { SearchArtistItem } from '@/components/search/search-artist.item'

interface ExplorePageProps {
  searchParams: Promise<{
    search?: string
  }>
}

export default async function ExplorePage(props: ExplorePageProps) {
  const searchParams = await props.searchParams
  const search = searchParams?.search || ''

  const results = await searchStudiosAndArtists(search)

  return (
    <div>
      <Header />
      <div className="mt-6">
        <SearchForm />
      </div>
      <div className="p-6">
        <h2 className="mb-3 text-sm font-bold text-gray-400 uppercase">
          Resultados para &ldquo;{search}&rdquo;:
        </h2>
        <div className="grid gap-5 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {results.map((item) =>
            item.type === 'studio' ? (
              <SearchStudioItem key={item.id} studio={item} />
            ) : (
              <SearchArtistItem key={item.id} artist={item} />
            ),
          )}
        </div>
      </div>
    </div>
  )
}

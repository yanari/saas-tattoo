import { PhoneItem } from '@/components/studios/phone-item'
import { ServiceItem } from '@/components/studios/service-item'
import { Sidebar } from '@/components/layout/sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { findStudioBySlug } from '@/lib/prisma/queries/studios'
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface StudioPageProps {
  params: Promise<{ slug: string }>
}

export default async function StudioPage({ params }: StudioPageProps) {
  const { slug } = await params

  const decodedSlug = decodeURIComponent(slug)

  const studio = await findStudioBySlug(decodedSlug)

  if (!studio) {
    return notFound()
  }

  return (
    <div>
      <div className="border-grey sticky top-0 z-10 h-64 w-full border-b">
        <header className="w-full p-4 text-center">
          <Image
            src={studio.imageUrl ?? ''}
            className="absolute top-0 left-0 w-full object-cover"
            alt={studio.name}
            fill
            priority
          />

          <Button
            asChild
            size="icon"
            variant="secondary"
            className="absolute top-4 left-4"
          >
            <Link href="/">
              <ChevronLeftIcon />
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="absolute top-4 right-4"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>

            <Sidebar />
          </Sheet>
        </header>
      </div>

      <div className="to-background via-background/70 sticky top-32 z-20 border-b border-solid bg-gradient-to-b from-transparent p-5">
        <h1 className="mb-3 text-xl font-bold">{studio.name}</h1>

        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={16} />
          <p className="text-sm">{studio.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="text-primary" size={16} />
          <p className="text-sm">
            {/* TODO: implement rating system */}
            4.5 (10 avaliações)
          </p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-sm font-bold text-gray-400 uppercase">Sobre Nós</h2>

        <p className="text-justify text-sm">{studio.bio}</p>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-sm font-bold text-gray-400 uppercase">Serviços</h2>

        <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {studio.services.map((service) => (
            <li key={service.id}>
              <ServiceItem service={service} studio={studio} />
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-sm font-bold text-gray-400 uppercase">Contatos</h2>
        {studio.phones.map((phone) => (
          <PhoneItem phone={phone} key={phone} />
        ))}
      </div>
    </div>
  )
}

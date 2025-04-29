import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import {
  ChevronLeftIcon,
  Loader2,
  MapPinIcon,
  MenuIcon,
  StarIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface StudioPageProps {
  params: Promise<{ slug: string }>;
}
export default async function StudioPage(props: StudioPageProps) {
  const params = await props.params;

  const decodedSlug = decodeURIComponent(params.slug);

  const studio = await db.tattooStudio.findUnique({
    where: {
      slug: decodedSlug,
    },
  });

  if (!studio) {
    return <Loader2 />;
  }

  return (
    <div>
      <div className="relative w-full h-64">
        <Image
          src={studio.imageUrl}
          fill
          className="object-cover"
          alt={studio.name}
        />

        <Button
          asChild
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4"
        >
          <MenuIcon />
        </Button>
      </div>

      <div className="p-5 border-b border-solid">
        <h1 className="font-bold text-xl mb-3">{studio.name}</h1>

        <div className="flex gap-2 items-center mb-2">
          <MapPinIcon className="text-primary" size={16} />
          <p className="text-sm">{studio.address}</p>
        </div>

        <div className="flex gap-2 items-center">
          <StarIcon className="text-primary" size={16} />
          <p className="text-sm">
            {/* TODO: implement rating system */}
            4.5 (10 avaliações)
          </p>
        </div>
      </div>

      <div className="p-5 border-b border-solid space-y-3">
        <h2 className="uppercase text-gray-400 text-sm font-bold">Sobre Nós</h2>
        <p className="text-justify text-sm">{studio.bio}</p>
      </div>
    </div>
  );
}

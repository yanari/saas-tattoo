import { db } from '../client'
import { nameContains } from '../filters'

type FindStudiosOptions = {
  search?: string
  withServices?: boolean
}

export async function findStudiosWithMatchingServices({
  search,
  withServices = false,
}: FindStudiosOptions) {
  let includeOptions = undefined
  if (withServices) {
    includeOptions = {
      services: {
        where: nameContains(search ?? ''),
      },
    }
  }
  return await db.tattooStudio.findMany({
    include: includeOptions,
    where: {
      OR: [
        nameContains(search ?? ''),
        {
          services: {
            some: nameContains(search ?? ''),
          },
        },
      ],
    },
  })
}

export async function findStudioBySlug(slug: string) {
  const studio = await db.tattooStudio.findUnique({
    where: {
      slug,
    },
    include: {
      services: true,
    },
  })

  if (!studio) return null

  return {
    ...studio,
    services: studio.services,
  }
}

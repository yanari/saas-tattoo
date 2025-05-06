import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker/locale/pt_BR'

const prisma = new PrismaClient()

const stylesPool = [
  'Blackwork',
  'Fineline',
  'Old School',
  'Watercolor',
  'Realismo',
  'Geometria',
  'Pontilhismo',
  'Lettering',
  'Tribal',
  'Neo Traditional',
]

const cities = [
  'São Paulo',
  'Guarulhos',
  'Campinas',
  'Osasco',
  'Santo André',
  'São Bernardo do Campo',
  'São José dos Campos',
]

function generateSlug(text: string) {
  return text.toLowerCase().replace(/\s+/g, '-')
}

async function main() {
  const studios = await prisma.tattooStudio.findMany()

  for (const studio of studios) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updates: any = {}

    if (!studio.imageUrl) {
      updates.imageUrl = faker.image.urlLoremFlickr({ category: 'tattoo' })
    }

    if (!studio.location) {
      updates.location = faker.location.streetAddress({ useFullAddress: true })
    }

    if (!studio.bio) {
      updates.bio = faker.lorem.paragraph()
    }

    if (!studio.slug) {
      updates.slug = generateSlug(studio.name)
    }

    if (!studio.instagram) {
      updates.instagram = `@${generateSlug(studio.name)}`
    }

    if (!studio.email) {
      updates.email = `${generateSlug(studio.name)}-${faker.number.int({
        min: 1000,
        max: 9999,
      })}@gmail.com`
    }

    if (!studio.city) {
      updates.city = faker.helpers.arrayElement(cities)
    }

    if (!studio.phones || studio.phones.length === 0) {
      updates.phones = [
        faker.phone.number({ style: 'national' }),
        faker.phone.number({ style: 'national' }),
      ]
    }

    if (!studio.styles || studio.styles.length === 0) {
      const randomStyles = faker.helpers.arrayElements(stylesPool, 3)
      updates.styles = randomStyles
    }

    updates.location = {
      lat: parseFloat(`${faker.location.latitude()}`),
      lng: parseFloat(`${faker.location.longitude()}`),
    }

    if (Object.keys(updates).length > 0) {
      await prisma.tattooStudio.update({
        where: { id: studio.id },
        data: updates,
      })
      console.log(`Atualizado: ${studio.name}`)
    }
  }

  console.log('Atualizações finalizadas ✅')
}

main()
  .catch((e) => {
    console.error('Erro ao atualizar os estúdios:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

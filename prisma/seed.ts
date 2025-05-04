import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    const images = [
      'https://img.freepik.com/free-photo/tattoo-artist-holding-looking-tattoo-machine_181624-18025.jpg',
      'https://img.freepik.com/free-photo/dark-photo-different-equipment-tattoo-making-tattoo-salon_613910-17242.jpg',
      'https://img.freepik.com/free-photo/man-doing-tattoo-tattoo-salon_1157-24947.jpg',
      'https://img.freepik.com/free-photo/experienced-tattoo-artist-working-client-tattoo_23-2149479251.jpg',
      'https://img.freepik.com/free-photo/vertical-shot-professional-tattoo-artist-black-latex-gloves-preparing-machine-tattooing_181624-24508.jpg',
      'https://img.freepik.com/free-photo/medium-shot-tattoo-artist-work_23-2149525946.jpg',
      'https://img.freepik.com/free-photo/man-tattooing-with-gloves-medium-shot_23-2149525953.jpg',
      'https://img.freepik.com/free-photo/tattooer-working-with-machine_23-2147834073.jpg',
      'https://img.freepik.com/free-photo/tattoo-studio-with-masters-clients_23-2147834102.jpg',
      'https://img.freepik.com/free-photo/side-view-tattoo-artist-doing-her-job_23-2149445992.jpg',
    ]

    const creativeNames = [
      'Tattoo Art Studio',
      'Ink Masters',
      'Tinta e Arte',
      'Ink & Soul',
      'Estúdio de Tatuagens Urbanas',
      'Black Ink Tattoo',
      'Estilo Imortal',
      'Corpo Tatuado',
      'Arte na Pele',
      'Studio Corpo & Tinta',
    ]

    const addresses = [
      'Rua Bela Cintra, 135',
      'Avenida São João, 900',
      'Rua dos Três Irmãos, 257',
      'Rua Doutor Cesário Mota, 1000',
      'Rua Consolação, 47',
      'Rua Pinheiros, 150',
      'Avenida Paulista, 2000',
      'Rua Augusta, 975',
      'Rua Maria Antônia, 455',
      'Avenida Faria Lima, 800',
    ]

    const styles = [
      'Old School',
      'Fineline',
      'Geometric',
      'Blackwork',
      'Watercolor',
      'Realism',
      'Japanese',
      'Tribal',
      'New School',
      'Dotwork',
    ]

    const availabilityVariations = [
      {
        '2025-05-02': [
          { startTime: '10:00', endTime: '11:30', isAvailable: true },
          { startTime: '15:30', endTime: '16:30', isAvailable: true },
        ],
        '2025-05-03': [
          { startTime: '09:00', endTime: '10:00', isAvailable: true },
          { startTime: '14:00', endTime: '15:00', isAvailable: true },
        ],
        '2025-05-06': [
          { startTime: '10:00', endTime: '11:00', isAvailable: true },
          { startTime: '13:00', endTime: '14:30', isAvailable: true },
        ],
      },
      {
        '2025-05-06': [
          { startTime: '13:00', endTime: '14:30', isAvailable: true },
          { startTime: '17:00', endTime: '18:00', isAvailable: true },
        ],
        '2025-05-08': [
          { startTime: '08:00', endTime: '09:00', isAvailable: true },
          { startTime: '10:30', endTime: '11:30', isAvailable: true },
        ],
      },
    ]

    const services = [
      {
        name: 'Piercing',
        description: 'A perfuração mais estilosa para completar seu look.',
        price: 80.0,
        imageUrl: images[0],
      },
      {
        name: 'Tatuagem Tradicional',
        description: 'Tatuagens clássicas com traços e cores marcantes.',
        price: 300.0,
        imageUrl: images[1],
      },
    ]

    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i]
      const address = addresses[i]

      const tattooStudio = await prisma.tattooStudio.create({
        data: {
          name,
          location: address,
        },
      })

      const numArtists = Math.floor(Math.random() * 2) + 2 // 2 ou 3 artistas
      for (let j = 0; j < numArtists; j++) {
        await prisma.artist.create({
          data: {
            name: `Artista ${i + 1}-${j + 1}`,
            styles: [styles[(i + j) % styles.length]],
            imageUrl: images[(i + j) % images.length],
            tattooStudioId: tattooStudio.id,
            portfolioUrls: [images[(i + j) % images.length]],
          },
        })
      }

      for (const service of services) {
        await prisma.tattooStudioService.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            tattooStudioId: tattooStudio.id,
            imageUrl: service.imageUrl,
            availability:
              availabilityVariations[
                Math.floor(Math.random() * availabilityVariations.length)
              ],
          },
        })
      }
    }

    // Criar artistas independentes (sem estúdio)
    for (let i = 0; i < 5; i++) {
      await prisma.artist.create({
        data: {
          name: `Freelancer ${i + 1}`,
          styles: [styles[(i + 3) % styles.length]],
          imageUrl: images[(i + 3) % images.length],
          portfolioUrls: [images[(i + 3) % images.length]],
        },
      })
    }

    // Usuário para orçamentos
    // const user = await prisma.user.create({
    //   data: {
    //     name: 'Usuário Teste',
    //     email: 'teste@example.com',
    //     image:
    //       'https://img.freepik.com/free-photo/portrait-young-woman-posing_23-2148886174.jpg',
    //   },
    // })

    // Artistas com flash + orçamento
    for (let i = 0; i < 3; i++) {
      const artist = await prisma.artist.create({
        data: {
          name: `Convidado ${i + 1}`,
          styles: ['Blackwork', 'Fineline'],
          imageUrl: images[i],
          portfolioUrls: [images[i]],
        },
      })

      await prisma.flashTattoo.create({
        data: {
          title: `Flash ${i + 1}`,
          artistId: artist.id,
          imageUrl: `https://example.com/flash-${i + 1}.jpg`,
          price: 300 + i * 100,
        },
      })

      const quote = await prisma.quote.create({
        data: {
          artistId: artist.id,
          clientEmail: `cliente${i}@email.com`,
          description: `Descrição do orçamento ${i + 1}`,
          bodyPlacement: 'braço',
          referenceUrls: ['https://example.com/ref.jpg'],
          notes: 'Sem observações',
          status: 'RESPONDED',
        },
      })

      await prisma.quoteResponse.create({
        data: {
          quoteId: quote.id,
          price: 600 + i * 100,
          proposedDate: new Date(new Date().setDate(new Date().getDate() + 7)),
          depositValue: 200,
        },
      })
    }

    await prisma.$disconnect()
  } catch (error) {
    console.error('Erro ao criar os dados:', error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

seedDatabase()

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seedDatabase() {
  try {
    const images = [
      'https://img.freepik.com/free-photo/tattoo-artist-holding-looking-tattoo-machine_181624-18025.jpg?t=st=1745652635~exp=1745656235~hmac=0345f89ca7426bf3192dc4c46ea3cc3343b95c317866de87f50f8b3b1feaf5d1&w=740',
      'https://img.freepik.com/free-photo/dark-photo-different-equipment-tattoo-making-tattoo-salon_613910-17242.jpg?t=st=1745652701~exp=1745656301~hmac=2a5f1303859cdd50360b5364142af1d490f6f39c9344bdc422c094502efbb070&w=996',
      'https://img.freepik.com/free-photo/man-doing-tattoo-tattoo-salon_1157-24947.jpg?t=st=1745652715~exp=1745656315~hmac=885d0d3f503dfe7ba9c31e6f50088c228135e18e99e1715faf4e7a6a1481f1c3&w=996',
      'https://img.freepik.com/free-photo/experienced-tattoo-artist-working-client-tattoo_23-2149479251.jpg?t=st=1745652739~exp=1745656339~hmac=51b2d74ff03b54c1976122236912f3761da53cf6242fe5c31fc35ac63cfba953&w=996',
      'https://img.freepik.com/free-photo/man-doing-tattoo-tattoo-salon_1157-24941.jpg?t=st=1745652752~exp=1745656352~hmac=44cce7738e385508329d4fa882eca9b3a4f915ddc5d6206c96e6dd075b430f84&w=996',
      'https://img.freepik.com/free-photo/medium-shot-tattoo-artist-work_23-2149525946.jpg?t=st=1745652773~exp=1745656373~hmac=bc70df10f535f735499500a4ae6be3daf46bf83988cacf89f9b6c0ebd5d064b0&w=740',
      'https://img.freepik.com/free-photo/man-tattooing-with-gloves-medium-shot_23-2149525953.jpg?t=st=1745652799~exp=1745656399~hmac=b16d3f223a31feb242c6e2c0e2058a03a7badf61eeb7e033ff93ee8e94f0fc1a&w=996',
      'https://img.freepik.com/free-photo/tattooer-working-with-machine_23-2147834073.jpg?t=st=1745652811~exp=1745656411~hmac=adc3703438302df323748841b7435bb1b101e7b7b730287a917c3aff5113953b&w=740',
      'https://img.freepik.com/free-photo/vertical-shot-professional-tattoo-artist-black-latex-gloves-preparing-machine-tattooing_181624-24508.jpg?t=st=1745652823~exp=1745656423~hmac=a12d67b847252c959535beea677b88ee21b7c9d9b56fdaf21bb683512c16b4b4&w=740',
      'https://img.freepik.com/free-photo/expirienced-tattoo-artist-is-making-tattoo-attractive-young-woman-tattoo-salon_613910-5808.jpg?t=st=1745652836~exp=1745656436~hmac=a6e433073c00e24214de0b597e807a20a323aa06acb8a7f6c93627315a7206b4&w=996',
      'https://img.freepik.com/free-photo/side-view-tattoo-artist-doing-her-job_23-2149445992.jpg?t=st=1745652849~exp=1745656449~hmac=ee18a0563ec88b205e3537eb3f9d1362c5d9e23b04078b712f070fe269790945&w=996',
      'https://img.freepik.com/free-photo/process-creating-new-tattoo-young-woman-by-expirienced-tattoo-artist-studio_613910-17260.jpg?t=st=1745652867~exp=1745656467~hmac=f7bc307eac10fd96a36975f5bf27b103751a1f0b155e1285ef7389f6a85fd6c8&w=996',
      'https://img.freepik.com/free-photo/tattoo-studio-with-masters-clients_23-2147834102.jpg?t=st=1745652887~exp=1745656487~hmac=f2031db338615e483b844b818d1b5d07b4d43b7747d9f67897dcf07ec4a0d6b2&w=996',
      'https://img.freepik.com/free-photo/man-doing-tattoo-tattoo-salon_1157-24944.jpg?t=st=1745652903~exp=1745656503~hmac=0f0ec4a81f21f176c54836789f0e300eea5cc4ea50b0861c4ce85c0e33bce618&w=996',
    ]
    // Nomes criativos para os estúdios de tatuagem
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

    // Endereços fictícios para os estúdios de tatuagem
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

    const services = [
      {
        name: 'Tatuagem Tradicional',
        description: 'Tatuagens clássicas com traços e cores marcantes.',
        price: 300.0,
        imageUrl:
          'https://img.freepik.com/free-photo/tattooed-man-clasping-his-hands-hit-stomach-while-lying-floor-2-october-2020-chippenham-uk_53876-105702.jpg?t=st=1745653052~exp=1745656652~hmac=a15ea7396bf14d413dba3bd9b2872cc027999db4ad1c68118911660ffd873e8b&w=740',
        availabilitySlots: [
          {
            dayOfWeek: 0,
            startTime: new Date('1970-01-01T09:00:00.000Z'),
            endTime: new Date('1970-01-01T11:00:00.000Z'),
          },
          {
            dayOfWeek: 1,
            startTime: new Date('1970-01-01T13:00:00.000Z'),
            endTime: new Date('1970-01-01T15:00:00.000Z'),
          },
          {
            dayOfWeek: 2,
            startTime: new Date('1970-01-01T09:00:00.000Z'),
            endTime: new Date('1970-01-01T11:00:00.000Z'),
          },
        ],
      },
      {
        name: 'Blackwork',
        description: 'Tatuagens em preto sólido com uma estética ousada.',
        price: 250.0,
        imageUrl:
          'https://img.freepik.com/free-photo/tattoo-salon-process-tattoo-girl-stuffed-tattoo-process-stuffing-tattoo-body-hands-close-up_1321-3003.jpg?t=st=1745653027~exp=1745656627~hmac=7105861a02a88712e060a638d575c50c8041517f74d9aca2ce12722eb1187210&w=740',
        availabilitySlots: [
          {
            dayOfWeek: 3,
            startTime: new Date('1970-01-01T14:00:00.000Z'),
            endTime: new Date('1970-01-01T16:00:00.000Z'),
          },
          {
            dayOfWeek: 4,
            startTime: new Date('1970-01-01T10:00:00.000Z'),
            endTime: new Date('1970-01-01T12:00:00.000Z'),
          },
          {
            dayOfWeek: 5,
            startTime: new Date('1970-01-01T15:00:00.000Z'),
            endTime: new Date('1970-01-01T17:00:00.000Z'),
          },
        ],
      },
      {
        name: 'Fineline',
        description: 'Detalhes finos e precisos para um resultado delicado.',
        price: 200.0,
        imageUrl:
          'https://img.freepik.com/free-photo/top-view-clean-shaven-man-with-tattoos_1122-1461.jpg?t=st=1745653004~exp=1745656604~hmac=e1f4a5e25d9e286a119457e45eb00d69648f07ac875bd726b67e38aff2d1d84a&w=740',
        availabilitySlots: [
          {
            dayOfWeek: 6,
            startTime: new Date('1970-01-01T08:00:00.000Z'),
            endTime: new Date('1970-01-01T10:00:00.000Z'),
          },
          {
            dayOfWeek: 0,
            startTime: new Date('1970-01-01T12:00:00.000Z'),
            endTime: new Date('1970-01-01T14:00:00.000Z'),
          },
          {
            dayOfWeek: 1,
            startTime: new Date('1970-01-01T16:00:00.000Z'),
            endTime: new Date('1970-01-01T18:00:00.000Z'),
          },
        ],
      },
      {
        name: 'Aquarela',
        description: 'Tatuagens com efeitos de aquarela e cores vibrantes.',
        price: 350.0,
        imageUrl:
          'https://img.freepik.com/free-photo/master-making-tattoo-with-iron_23-2147834107.jpg?t=st=1745652925~exp=1745656525~hmac=9703db966bc178690ead744b09e773e8ee5a0c2ad23312b54b56d0a267dd9397&w=740',
        availabilitySlots: [
          {
            dayOfWeek: 2,
            startTime: new Date('1970-01-01T11:00:00.000Z'),
            endTime: new Date('1970-01-01T13:00:00.000Z'),
          },
          {
            dayOfWeek: 3,
            startTime: new Date('1970-01-01T09:00:00.000Z'),
            endTime: new Date('1970-01-01T11:00:00.000Z'),
          },
          {
            dayOfWeek: 4,
            startTime: new Date('1970-01-01T14:00:00.000Z'),
            endTime: new Date('1970-01-01T16:00:00.000Z'),
          },
        ],
      },
      {
        name: 'Reparação de Tatuagem',
        description: 'Retocar ou reparar tatuagens antigas.',
        price: 150.0,
        imageUrl:
          'https://img.freepik.com/free-photo/vertical-shot-professional-tattoo-artist-black-latex-gloves-preparing-machine-tattooing_181624-24508.jpg?t=st=1745652823~exp=1745656423~hmac=a12d67b847252c959535beea677b88ee21b7c9d9b56fdaf21bb683512c16b4b4&w=740',
        availabilitySlots: [
          {
            dayOfWeek: 5,
            startTime: new Date('1970-01-01T10:00:00.000Z'),
            endTime: new Date('1970-01-01T12:00:00.000Z'),
          },
          {
            dayOfWeek: 6,
            startTime: new Date('1970-01-01T13:00:00.000Z'),
            endTime: new Date('1970-01-01T15:00:00.000Z'),
          },
          {
            dayOfWeek: 0,
            startTime: new Date('1970-01-01T11:00:00.000Z'),
            endTime: new Date('1970-01-01T13:00:00.000Z'),
          },
        ],
      },
      {
        name: 'Piercing',
        description: 'A perfuração mais estilosa para completar seu look.',
        price: 80.0,
        imageUrl:
          'https://img.freepik.com/free-photo/man-with-mustache-smoking-cigarette_1122-687.jpg?t=st=1745652942~exp=1745656542~hmac=2d9b443a229f3155e382ae019c20171c0516e07e29e8d06d337da04d39b052de&w=740',
        availabilitySlots: [
          {
            dayOfWeek: 1,
            startTime: new Date('1970-01-01T10:00:00.000Z'),
            endTime: new Date('1970-01-01T12:00:00.000Z'),
          },
          {
            dayOfWeek: 2,
            startTime: new Date('1970-01-01T14:00:00.000Z'),
            endTime: new Date('1970-01-01T16:00:00.000Z'),
          },
          {
            dayOfWeek: 3,
            startTime: new Date('1970-01-01T12:00:00.000Z'),
            endTime: new Date('1970-01-01T14:00:00.000Z'),
          },
        ],
      },
    ]

    // Criar 10 estúdios de tatuagem com nomes e endereços fictícios
    const tattooStudios = []
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i]
      const address = addresses[i]
      const imageUrl = images[i]

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

      const tattooStudio = await prisma.tattooStudio.create({
        data: {
          name,
          address,
          instagram: `@${name.toLowerCase().replace(/\s+/g, '')}`,
          imageUrl: imageUrl,
          phones: Array.from(
            { length: 2 },
            (_, i) =>
              `(11) ${String(99999 + i).padStart(5, '0')}-${String(i + 1).padStart(4, '0')}`,
          ),
          bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac augue ullamcorper, pharetra orci mollis, auctor tellus. Phasellus pharetra erat ac libero efficitur tempus.',
          slug: name.toLowerCase().replace(/\s+/g, '-'),
          email: `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
          city: [
            'São Paulo',
            'Guarulhos',
            'Campinas',
            'São Bernardo do Campo',
            'São José dos Campos',
          ][Math.floor(Math.random() * 5)],
          styles: [...Array(Math.floor(Math.random() * styles.length))].map(
            () => styles[Math.floor(Math.random() * styles.length)],
          ),
        },
      })

      for (const service of services) {
        await prisma.tattooStudioService.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            tattooStudio: {
              connect: {
                id: tattooStudio.id,
              },
            },
            imageUrl: service.imageUrl,
            availabilitySlots: {
              create: service.availabilitySlots.map((slot) => ({
                dayOfWeek: slot.dayOfWeek,
                startTime: slot.startTime,
                endTime: slot.endTime,
              })),
            },
          },
        })
      }

      tattooStudios.push(tattooStudio)
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect()
  } catch (error) {
    console.error('Erro ao criar os estúdios de tatuagem:', error)
  }
}

seedDatabase()

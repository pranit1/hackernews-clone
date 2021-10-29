const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
    const newLink = await prisma.link.create(
        {
            data:{
                description: 'FullStack Graphql',
                url: 'www.howtographql.com'
            }
        }
    )
    const allLinks = await prisma.link.findMany()
    console.log(allLinks)
}


main()
    .catch(error => {
        throw error
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
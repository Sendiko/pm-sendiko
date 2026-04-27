import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Seeding database...')

    // 1. Create a dummy client
    const client = await prisma.client.create({
        data: {
            name: 'Acme Corp',
            email: 'hello@acmecorp.com',
            hourlyRate: 50.0,
            notes: 'Test client for local development',
        },
    })

    // 2. Create a dummy project linked to the client
    const project = await prisma.project.create({
        data: {
            name: 'E-Commerce App Redesign',
            description: 'Overhauling the mobile app UI using Flutter.',
            status: 'ACTIVE',
            clientId: client.id,
        },
    })

    // 3. Create a few tasks for the Kanban board
    await prisma.task.createMany({
        data: [
            {
                title: 'Design database schema',
                description: 'Map out Prisma models for the new feature.',
                status: 'DONE',
                priority: 'HIGH',
                projectId: project.id,
            },
            {
                title: 'Setup authentication container',
                status: 'IN_PROGRESS',
                priority: 'MEDIUM',
                projectId: project.id,
            },
            {
                title: 'Build user profile UI',
                status: 'TODO',
                priority: 'LOW',
                projectId: project.id,
            },
        ],
    })

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    await prisma.refund.create({
        data: {
            ticketId: 'TICKET_001',
            operator: 'KSRTC',
            platform: 'RED_BUS',
            amount: 500,
            status: 'INITIATED',
            logs: {
                create: {
                    action: 'CREATED',
                    actor: 'SYSTEM'
                }
            }
        }
    })
}

main()
    .then(() => prisma.$disconnect())
    .catch(e => {
        console.error(e)
        prisma.$disconnect()
        process.exit(1)
    })

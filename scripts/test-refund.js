const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const email = 'test@example.com'; // Adjust if needed
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        console.log('User not found');
        return;
    }

    console.log('Found user:', user.id);

    try {
        const refund = await prisma.refund.create({
            data: {
                ticketId: 'TEST-TKT-001',
                operator: 'KSRTC',
                platform: 'RED_BUS',
                amount: 500,
                reason: 'Test reason',
                userId: user.id, // Ensure this relation field exists
                status: 'INITIATED',
                logs: {
                    create: {
                        action: 'CREATED',
                        actor: 'USER'
                    }
                }
            }
        });
        console.log('Refund created successfully:', refund);
    } catch (error) {
        console.error('Error creating refund:', error);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

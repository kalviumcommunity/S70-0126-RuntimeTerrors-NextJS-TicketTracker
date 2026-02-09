const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkUserRole() {
    const user = await prisma.user.findUnique({
        where: { email: 'operator@example.com' },
    });
    console.log('Operator Role:', user);

    const user2 = await prisma.user.findUnique({
        where: { email: 'operator1@gmail.com' },
    });
    console.log('Operator1 Role:', user2);
}

checkUserRole()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fixOperatorRole() {
    const email = 'operator1@gmail.com';
    console.log(`Updating role for ${email}...`);

    const user = await prisma.user.update({
        where: { email },
        data: { role: 'OPERATOR' },
    });

    console.log('Updated User:', user);
}

fixOperatorRole()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });

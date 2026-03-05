const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function run() {
    await prisma.algorithmSettings.upsert({
        where: { key: 'baseSqmPrice' },
        update: { value: '45000' },
        create: { key: 'baseSqmPrice', value: '45000', description: 'Ana taban metrekare fiyatı' }
    });
    console.log('Base SQM updated to 45000');
    await prisma.$disconnect();
}
run();

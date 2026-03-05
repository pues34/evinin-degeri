const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const algo = await prisma.algorithmSettings.findMany();
    const sys = await prisma.systemSettings.findFirst();
    console.log("ALGO:", algo);
    console.log("SYS:", sys);
}
main().catch(console.error).finally(() => prisma.$disconnect());

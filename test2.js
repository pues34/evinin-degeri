const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres.djmzuhwxeftcinhwotxj:CMdiC2WNbZVxokkf@aws-0-eu-central-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
        }
    }
});

async function main() {
    try {
        const cityCount = await prisma.city.count();
        console.log(`Connected! Cities: ${cityCount}`);
    } catch (e) {
        console.error("Failed:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}
main();

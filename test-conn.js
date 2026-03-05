const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://postgres:CMdiC2WNbZVxokkf@db.djmzuhwxeftcinhwotxj.supabase.co:6543/postgres?pgbouncer=true&connection_limit=5"
        }
    }
});

async function main() {
    try {
        const cityCount = await prisma.city.count();
        console.log(`Connected to 6543! Cities: ${cityCount}`);
    } catch (e) {
        console.error("6543 failed:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}
main();

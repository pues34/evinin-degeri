const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding default pages...');

    const pages = [
        {
            title: 'Hakkımızda',
            slug: 'hakkimizda',
            content: '<div class="prose prose-blue max-w-none text-gray-600 space-y-6"><h2 class="text-2xl font-semibold text-appleDark mb-4">Biz Kimiz?</h2><p>Evinin Değeri, Türkiye\'nin gayrimenkul sektörüne yapay zeka ve büyük veri analitiği ile yenilikçi bir değerleme altyapısı sunan proptech girişimidir.</p></div>'
        },
        {
            title: 'Nasıl Çalışır?',
            slug: 'nasil-calisir',
            content: '<div class="prose prose-blue max-w-none text-gray-600 space-y-6"><h2 class="text-2xl font-semibold text-appleDark mb-4">Değerleme Adımları</h2><p>Sistemimiz, girmiş olduğunuz mahalle, ilçe, kat, yaş ve m² gibi spesifik değişkenleri alarak bölgesel değerleme katsayılarıyla çarpar ve gerçeğe en yakın pazar değerini saniyeler içinde size sunar.</p></div>'
        }
    ];

    for (const page of pages) {
        await prisma.page.upsert({
            where: { slug: page.slug },
            update: {},
            create: page,
        });
    }

    console.log('Pages seeded.');

    console.log('Seeding Istanbul locations...');

    const istanbul = await prisma.city.upsert({
        where: { name: 'İstanbul' },
        update: {},
        create: { name: 'İstanbul' },
    });

    const districtsData = [
        {
            name: 'Kadıköy',
            neighborhoods: [
                { name: 'Caferağa', multiplier: 1.4 },
                { name: 'Caddebostan', multiplier: 1.6 },
                { name: 'Fikirtepe', multiplier: 1.1 },
                { name: 'Suadiye', multiplier: 1.5 },
            ]
        },
        {
            name: 'Beşiktaş',
            neighborhoods: [
                { name: 'Etiler', multiplier: 1.8 },
                { name: 'Bebek', multiplier: 2.0 },
                { name: 'Levent', multiplier: 1.7 },
                { name: 'Dikilitaş', multiplier: 1.3 },
            ]
        },
        {
            name: 'Esenyurt',
            neighborhoods: [
                { name: 'Yeşilkent', multiplier: 0.6 },
                { name: 'Pınar', multiplier: 0.65 },
                { name: 'Güzelyurt', multiplier: 0.7 },
            ]
        },
        {
            name: 'Üsküdar',
            neighborhoods: [
                { name: 'Beylerbeyi', multiplier: 1.5 },
                { name: 'Çengelköy', multiplier: 1.4 },
                { name: 'Altunizade', multiplier: 1.3 },
                { name: 'Mimar Sinan', multiplier: 1.1 },
            ]
        },
        {
            name: 'Şişli',
            neighborhoods: [
                { name: 'Teşvikiye', multiplier: 1.7 },
                { name: 'Nişantaşı', multiplier: 1.8 },
                { name: 'Bomonti', multiplier: 1.4 },
                { name: 'Mecidiyeköy', multiplier: 1.2 },
            ]
        }
    ];

    for (const districtData of districtsData) {
        const district = await prisma.district.upsert({
            where: { name_cityId: { name: districtData.name, cityId: istanbul.id } },
            update: {},
            create: { name: districtData.name, cityId: istanbul.id },
        });

        for (const neighData of districtData.neighborhoods) {
            await prisma.neighborhood.upsert({
                where: { name_districtId: { name: neighData.name, districtId: district.id } },
                update: { multiplier: neighData.multiplier },
                create: { name: neighData.name, multiplier: neighData.multiplier, districtId: district.id },
            });
        }
    }

    console.log('Istanbul locations seeded.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

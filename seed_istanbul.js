const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const istanbulDistricts = [
    { name: "Adalar", multiplier: 1.5 },
    { name: "Arnavutköy", multiplier: 0.6 },
    { name: "Ataşehir", multiplier: 1.4 },
    { name: "Avcılar", multiplier: 0.8 },
    { name: "Bağcılar", multiplier: 0.7 },
    { name: "Bahçelievler", multiplier: 0.8 },
    { name: "Bakırköy", multiplier: 1.8 },
    { name: "Başakşehir", multiplier: 1.1 },
    { name: "Bayrampaşa", multiplier: 0.8 },
    { name: "Beşiktaş", multiplier: 2.5 },
    { name: "Beykoz", multiplier: 1.5 },
    { name: "Beylikdüzü", multiplier: 0.9 },
    { name: "Beyoğlu", multiplier: 1.5 },
    { name: "Büyükçekmece", multiplier: 0.8 },
    { name: "Çatalca", multiplier: 0.5 },
    { name: "Çekmeköy", multiplier: 1.0 },
    { name: "Esenler", multiplier: 0.7 },
    { name: "Esenyurt", multiplier: 0.6 },
    { name: "Eyüpsultan", multiplier: 0.9 },
    { name: "Fatih", multiplier: 1.0 },
    { name: "Gaziosmanpaşa", multiplier: 0.7 },
    { name: "Güngören", multiplier: 0.8 },
    { name: "Kadıköy", multiplier: 2.2 },
    { name: "Kağıthane", multiplier: 1.1 },
    { name: "Kartal", multiplier: 1.1 },
    { name: "Küçükçekmece", multiplier: 0.8 },
    { name: "Maltepe", multiplier: 1.3 },
    { name: "Pendik", multiplier: 0.9 },
    { name: "Sancaktepe", multiplier: 0.8 },
    { name: "Sarıyer", multiplier: 2.2 },
    { name: "Silivri", multiplier: 0.5 },
    { name: "Sultanbeyli", multiplier: 0.6 },
    { name: "Sultangazi", multiplier: 0.7 },
    { name: "Şile", multiplier: 0.8 },
    { name: "Şişli", multiplier: 1.8 },
    { name: "Tuzla", multiplier: 0.9 },
    { name: "Ümraniye", multiplier: 1.2 },
    { name: "Üsküdar", multiplier: 1.5 },
    { name: "Zeytinburnu", multiplier: 1.0 }
];

async function main() {
    console.log('Seeding Istanbul districts...');

    // Ensure Istanbul exists
    let city = await prisma.city.findUnique({ where: { name: 'İstanbul' } });
    if (!city) {
        city = await prisma.city.create({ data: { name: 'İstanbul' } });
    }

    for (const dist of istanbulDistricts) {
        // Upsert district
        let district = await prisma.district.findFirst({
            where: { name: dist.name, cityId: city.id }
        });

        if (!district) {
            district = await prisma.district.create({
                data: {
                    name: dist.name,
                    cityId: city.id
                }
            });
        }

        // Upsert a default "Merkez" or "Tüm Mahalleler" neighborhood for fallback with the regional multiplier
        const neigh = await prisma.neighborhood.findFirst({
            where: { name: 'Tüm Mahalleler (Ortalama)', districtId: district.id }
        });

        if (!neigh) {
            await prisma.neighborhood.create({
                data: {
                    name: 'Tüm Mahalleler (Ortalama)',
                    multiplier: dist.multiplier,
                    districtId: district.id
                }
            });
            console.log(`Created default neighborhood for ${dist.name} with multiplier ${dist.multiplier}`);
        } else {
            await prisma.neighborhood.update({
                where: { id: neigh.id },
                data: { multiplier: dist.multiplier }
            });
        }
    }

    // Algorithm Calibration: Bump the base SQM price to bump 3.2M outputs up to roughly 5-7M.
    // 3.2M -> 6M is roughly a 87% increase. We will set the base SQM to 75000.
    await prisma.algorithmSettings.upsert({
        where: { key: 'baseSqmPrice' },
        update: { value: '75000' },
        create: { key: 'baseSqmPrice', value: '75000', description: 'Ana taban metrekare fiyatı' }
    });
    console.log('Algorithm calibrated: Base SQM Price set to 75000 to match realistic 2026 5M-7M valuations.');

    console.log('Seeding done!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

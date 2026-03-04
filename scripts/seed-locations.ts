import { PrismaClient } from '@prisma/client';
import { TurkeyLocations } from '../src/data/locations';

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding locations...");

    for (const cityData of TurkeyLocations) {
        // Upsert City
        const city = await prisma.city.upsert({
            where: { name: cityData.name },
            update: {},
            create: { name: cityData.name }
        });

        for (const districtData of cityData.districts) {
            // Upsert District
            const district = await prisma.district.upsert({
                where: {
                    name_cityId: {
                        name: districtData.name,
                        cityId: city.id
                    }
                },
                update: {},
                create: {
                    name: districtData.name,
                    cityId: city.id
                }
            });

            for (const neighborhoodData of districtData.neighborhoods) {
                // Upsert Neighborhood
                await prisma.neighborhood.upsert({
                    where: {
                        name_districtId: {
                            name: neighborhoodData.name,
                            districtId: district.id
                        }
                    },
                    update: {
                        multiplier: neighborhoodData.multiplier
                    },
                    create: {
                        name: neighborhoodData.name,
                        multiplier: neighborhoodData.multiplier,
                        districtId: district.id
                    }
                });
            }
        }
    }

    console.log("Location seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

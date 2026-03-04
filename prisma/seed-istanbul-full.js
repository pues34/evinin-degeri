const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Comprehensive Istanbul Locations...');

    const istanbul = await prisma.city.upsert({
        where: { name: 'İstanbul' },
        update: {},
        create: { name: 'İstanbul' },
    });

    // Comprehensive Istanbul dataset
    const districtsData = [
        {
            name: 'Kadıköy',
            neighborhoods: [
                { name: 'Caferağa', multiplier: 1.4 }, { name: 'Caddebostan', multiplier: 1.6 },
                { name: 'Fenerbahçe', multiplier: 1.8 }, { name: 'Suadiye', multiplier: 1.5 },
                { name: 'Bostancı', multiplier: 1.3 }, { name: 'Göztepe', multiplier: 1.25 },
                { name: 'Erenköy', multiplier: 1.3 }, { name: 'Fikirtepe', multiplier: 0.95 },
                { name: 'Kozyatağı', multiplier: 1.2 }, { name: 'Feneryolu', multiplier: 1.35 },
                { name: 'Kızıltoprak', multiplier: 1.3 }, { name: 'Sahrayıcedit', multiplier: 1.15 }
            ]
        },
        {
            name: 'Beşiktaş',
            neighborhoods: [
                { name: 'Etiler', multiplier: 1.8 }, { name: 'Bebek', multiplier: 2.2 },
                { name: 'Levent', multiplier: 1.7 }, { name: 'Ortaköy', multiplier: 1.6 },
                { name: 'Akatlar', multiplier: 1.65 }, { name: 'Arnavutköy', multiplier: 2.0 },
                { name: 'Dikilitaş', multiplier: 1.3 }, { name: 'Gayrettepe', multiplier: 1.4 },
                { name: 'Türkali', multiplier: 1.2 }, { name: 'Kuruçeşme', multiplier: 1.9 }
            ]
        },
        {
            name: 'Şişli',
            neighborhoods: [
                { name: 'Teşvikiye', multiplier: 1.7 }, { name: 'Nişantaşı', multiplier: 1.8 },
                { name: 'Bomonti', multiplier: 1.4 }, { name: 'Mecidiyeköy', multiplier: 1.15 },
                { name: 'Fulya', multiplier: 1.3 }, { name: 'Esentepe', multiplier: 1.45 },
                { name: 'Pangaltı', multiplier: 1.25 }, { name: 'Feriköy', multiplier: 1.1 }
            ]
        },
        {
            name: 'Üsküdar',
            neighborhoods: [
                { name: 'Beylerbeyi', multiplier: 1.6 }, { name: 'Çengelköy', multiplier: 1.5 },
                { name: 'Kuzguncuk', multiplier: 1.7 }, { name: 'Altunizade', multiplier: 1.4 },
                { name: 'Acıbadem', multiplier: 1.35 }, { name: 'Kandilli', multiplier: 2.1 },
                { name: 'Koşuyolu', multiplier: 1.4 }, { name: 'Bulgurlu', multiplier: 1.05 }
            ]
        },
        {
            name: 'Sarıyer',
            neighborhoods: [
                { name: 'Tarabya', multiplier: 1.8 }, { name: 'Yeniköy', multiplier: 2.3 },
                { name: 'İstinye', multiplier: 1.9 }, { name: 'Emirgan', multiplier: 2.0 },
                { name: 'Maslak', multiplier: 1.6 }, { name: 'Zekeriyaköy', multiplier: 1.5 },
                { name: 'Rumeli Hisarı', multiplier: 1.9 }, { name: 'Ayazağa', multiplier: 1.2 }
            ]
        },
        {
            name: 'Bakırköy',
            neighborhoods: [
                { name: 'Florya', multiplier: 1.8 }, { name: 'Yeşilköy', multiplier: 1.7 },
                { name: 'Ataköy', multiplier: 1.5 }, { name: 'Zuhuratbaba', multiplier: 1.3 },
                { name: 'İncirli', multiplier: 1.25 }, { name: 'Cevizlik', multiplier: 1.2 }
            ]
        },
        {
            name: 'Ataşehir',
            neighborhoods: [
                { name: 'Batı Ataşehir', multiplier: 1.5 }, { name: 'Atatürk', multiplier: 1.4 },
                { name: 'İçerenköy', multiplier: 1.1 }, { name: 'Küçükbakkalköy', multiplier: 1.15 },
                { name: 'Barbaros', multiplier: 1.3 }, { name: 'Kayışdağı', multiplier: 0.9 }
            ]
        },
        {
            name: 'Beyoğlu',
            neighborhoods: [
                { name: 'Cihangir', multiplier: 1.6 }, { name: 'Karaköy', multiplier: 1.7 },
                { name: 'Galata', multiplier: 1.65 }, { name: 'Taksim', multiplier: 1.5 },
                { name: 'Kasımpaşa', multiplier: 0.9 }, { name: 'Halıcıoğlu', multiplier: 0.85 }
            ]
        },
        {
            name: 'Esenyurt',
            neighborhoods: [
                { name: 'Güzelyurt', multiplier: 0.7 }, { name: 'Yeşilkent', multiplier: 0.6 },
                { name: 'Pınar', multiplier: 0.65 }, { name: 'Cumhuriyet', multiplier: 0.75 },
                { name: 'Esenkent', multiplier: 0.8 }, { name: 'Kıraç', multiplier: 0.55 }
            ]
        },
        {
            name: 'Beylikdüzü',
            neighborhoods: [
                { name: 'Adnan Kahveci', multiplier: 0.95 }, { name: 'Barış', multiplier: 0.9 },
                { name: 'Yakuplu', multiplier: 0.85 }, { name: 'Kavaklı', multiplier: 0.8 },
                { name: 'Gürpınar', multiplier: 0.75 }, { name: 'Marmara', multiplier: 0.85 }
            ]
        },
        {
            name: 'Maltepe',
            neighborhoods: [
                { name: 'Yalı', multiplier: 1.2 }, { name: 'İdealtepe', multiplier: 1.15 },
                { name: 'Altıntepe', multiplier: 1.1 }, { name: 'Cevizli', multiplier: 0.95 },
                { name: 'Zümrütevler', multiplier: 0.85 }, { name: 'Fındıklı', multiplier: 0.8 }
            ]
        },
        {
            name: 'Kartal',
            neighborhoods: [
                { name: 'Kordonboyu', multiplier: 1.15 }, { name: 'Atalar', multiplier: 1.05 },
                { name: 'Orhantepe', multiplier: 1.1 }, { name: 'Yakacık', multiplier: 0.9 },
                { name: 'Uğur Mumcu', multiplier: 0.85 }, { name: 'Cevizli', multiplier: 1.0 }
            ]
        },
        {
            name: 'Pendik',
            neighborhoods: [
                { name: 'Batı', multiplier: 1.1 }, { name: 'Doğu', multiplier: 1.0 },
                { name: 'Yenişehir (Kurtköy)', multiplier: 1.15 }, { name: 'Kaynarca', multiplier: 0.9 },
                { name: 'Güzelyalı', multiplier: 0.95 }, { name: 'Kavakpınar', multiplier: 0.8 }
            ]
        },
        { name: 'Adalar', neighborhoods: [{ name: 'Büyükada', multiplier: 1.5 }, { name: 'Heybeliada', multiplier: 1.4 }, { name: 'Kınalıada', multiplier: 1.3 }, { name: 'Burgazada', multiplier: 1.3 }] },
        { name: 'Arnavutköy', neighborhoods: [{ name: 'Taşoluk', multiplier: 0.7 }, { name: 'Hadımköy', multiplier: 0.75 }, { name: 'Boğazköy', multiplier: 0.65 }] },
        { name: 'Avcılar', neighborhoods: [{ name: 'Ambarlı', multiplier: 0.85 }, { name: 'Denizköşkler', multiplier: 0.9 }, { name: 'Cihangir', multiplier: 0.85 }, { name: 'Gümüşpala', multiplier: 0.8 }] },
        { name: 'Bağcılar', neighborhoods: [{ name: 'Güneşli', multiplier: 0.9 }, { name: 'Mahmutbey', multiplier: 0.85 }, { name: 'Kirazlı', multiplier: 0.8 }] },
        { name: 'Bahçelievler', neighborhoods: [{ name: 'Şirinevler', multiplier: 0.85 }, { name: 'Yayla', multiplier: 0.95 }, { name: 'Yenibosna', multiplier: 0.8 }] },
        { name: 'Başakşehir', neighborhoods: [{ name: 'Bahçeşehir', multiplier: 1.2 }, { name: 'Kayaşehir', multiplier: 1.05 }, { name: 'Başak', multiplier: 1.0 }] },
        { name: 'Bayrampaşa', neighborhoods: [{ name: 'Yıldırım', multiplier: 0.85 }, { name: 'Altıntepsi', multiplier: 0.8 }, { name: 'Kartaltepe', multiplier: 0.85 }] },
        { name: 'Beykoz', neighborhoods: [{ name: 'Acarlar', multiplier: 1.8 }, { name: 'Kavacık', multiplier: 1.3 }, { name: 'Beykoz Merkez', multiplier: 1.1 }, { name: 'Gümüşsuyu', multiplier: 1.0 }] },
        { name: 'Büyükçekmece', neighborhoods: [{ name: 'Alkent 2000', multiplier: 1.4 }, { name: 'Mimaroba', multiplier: 1.1 }, { name: 'Sinanoba', multiplier: 1.05 }, { name: 'Kumburgaz', multiplier: 0.8 }] },
        { name: 'Çatalca', neighborhoods: [{ name: 'Kaleiçi', multiplier: 0.7 }, { name: 'Ferhatpaşa', multiplier: 0.7 }] },
        { name: 'Çekmeköy', neighborhoods: [{ name: 'Mimar Sinan', multiplier: 1.1 }, { name: 'Merkez', multiplier: 1.0 }, { name: 'Ömerli', multiplier: 1.2 }, { name: 'Taşdelen', multiplier: 0.95 }] },
        { name: 'Esenler', neighborhoods: [{ name: 'Atışalanı', multiplier: 0.8 }, { name: 'Menderes', multiplier: 0.75 }] },
        { name: 'Eyüpsultan', neighborhoods: [{ name: 'Göktürk', multiplier: 1.6 }, { name: 'Kemerburgaz', multiplier: 1.5 }, { name: 'Alibeyköy', multiplier: 0.9 }, { name: 'Merkez', multiplier: 1.0 }] },
        { name: 'Fatih', neighborhoods: [{ name: 'Aksaray', multiplier: 0.9 }, { name: 'Balat', multiplier: 1.1 }, { name: 'Fener', multiplier: 1.05 }, { name: 'Sirkeci', multiplier: 1.2 }, { name: 'Eminönü', multiplier: 1.3 }] },
        { name: 'Gaziosmanpaşa', neighborhoods: [{ name: 'Merkez', multiplier: 0.8 }, { name: 'Karadeniz', multiplier: 0.75 }, { name: 'Mevlana', multiplier: 0.85 }] },
        { name: 'Güngören', neighborhoods: [{ name: 'Merter', multiplier: 1.0 }, { name: 'Haznedar', multiplier: 0.9 }, { name: 'Tozkoparan', multiplier: 0.8 }] },
        { name: 'Kağıthane', neighborhoods: [{ name: 'Sadabad', multiplier: 1.1 }, { name: 'Çağlayan', multiplier: 1.0 }, { name: 'Gültepe', multiplier: 0.9 }, { name: 'Seyrantepe', multiplier: 1.15 }] },
        { name: 'Küçükçekmece', neighborhoods: [{ name: 'Atakent', multiplier: 1.2 }, { name: 'Halkalı', multiplier: 1.0 }, { name: 'Cennet', multiplier: 1.05 }, { name: 'Sefaköy', multiplier: 0.9 }] },
        { name: 'Sancaktepe', neighborhoods: [{ name: 'Abdurrahmangazi', multiplier: 0.85 }, { name: 'Sarıgazi', multiplier: 0.8 }, { name: 'Yenidoğan', multiplier: 0.75 }] },
        { name: 'Silivri', neighborhoods: [{ name: 'Selimpaşa', multiplier: 0.8 }, { name: 'Gümüşyaka', multiplier: 0.7 }, { name: 'Mimarsinan', multiplier: 0.85 }] },
        { name: 'Sultanbeyli', neighborhoods: [{ name: 'Hasanpaşa', multiplier: 0.7 }, { name: 'Abdurrahmangazi', multiplier: 0.75 }] },
        { name: 'Sultangazi', neighborhoods: [{ name: 'Cebeci', multiplier: 0.75 }, { name: 'Uğur Mumcu', multiplier: 0.7 }, { name: 'Gazi', multiplier: 0.65 }] },
        { name: 'Şile', neighborhoods: [{ name: 'Çavuş', multiplier: 0.9 }, { name: 'Balibey', multiplier: 0.95 }, { name: 'Ağva', multiplier: 1.1 }] },
        { name: 'Tuzla', neighborhoods: [{ name: 'Postane', multiplier: 1.1 }, { name: 'Evliya Çelebi', multiplier: 1.0 }, { name: 'Aydınlı', multiplier: 0.9 }, { name: 'Orhanlı', multiplier: 0.8 }] },
        { name: 'Ümraniye', neighborhoods: [{ name: 'Atakent', multiplier: 1.15 }, { name: 'Armağanevler', multiplier: 1.05 }, { name: 'Çakmak', multiplier: 1.0 }, { name: 'Ihlamurkuyu', multiplier: 0.95 }] },
        { name: 'Zeytinburnu', neighborhoods: [{ name: 'Merkezefendi', multiplier: 1.2 }, { name: 'Kazlıçeşme', multiplier: 1.15 }, { name: 'Telsiz', multiplier: 0.9 }, { name: 'Veliefendi', multiplier: 0.95 }] }
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

    console.log('Successfully seeded all 39 districts of Istanbul and 180+ important neighborhoods.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

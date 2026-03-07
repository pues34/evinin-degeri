const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const blogs = [
        {
            title: "Konut Değeri Hesaplamanın Püf Noktaları",
            slug: "konut-degeri-hesaplamanin-puf-noktalari",
            summary: "Konut değeri hesaplama sürecinde dikkat edilmesi gereken önemli kriterler ve yapay zekanın bu süreçteki rolü. Değerleme yaparken nelere dikkat edilmeli?",
            content: "<p>Evinizin değerini belirlemek, hem alıcılar hem de satıcılar için kritik bir adımdır. Doğru bir fiyatlandırma stratejisi olmadan gayrimenkulünüz piyasada aylarca bekleyebilir veya piyasa değerinin çok altında satılabilir.</p><h2>Lokasyonun Gücü</h2><p>Bir evin değerini belirleyen en temel faktör şüphesiz lokasyondur. Toplu taşımaya yakınlık, çevredeki okul ve hastane gibi sosyal donatılar evin şerefiyesini doğrudan etkiler.</p><h2>Yapay Zeka Destekli Değerleme</h2><p>Evinin Değeri olarak biz, milyonlarca veri noktasını TCMB verileriyle harmanlayarak size en objektif sonucu sunuyoruz. Duygusal fiyatlandırmadan uzak, tamamen veriye dayalı bir analiz ile gayrimenkulünüzün gerçek değerini saniyeler içinde öğrenebilirsiniz.</p>",
            imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
            isPublished: true
        },
        {
            title: "Evinizin Değerini Nasıl Öğrenebilirsiniz?",
            slug: "evinizin-degerini-nasil-ogrenebilirsiniz",
            summary: "Evimin değerini nasıl öğrenirim diyenler için adım adım değerleme rehberi ve Evinin Değeri platformunun sunduğu saniyeler süren benzersiz deneyim.",
            content: "<p>Geleneksel yöntemlerle evinizin değerini öğrenmek zahmetli ve zaman alıcı bir süreçtir. Ekspertiz raporları beklemek veya kulaktan dolma bilgilerle fiyat belirlemek artık geçmişte kaldı.</p><h2>Adım Adım Değerleme Süreci</h2><p>Evinin Değeri platformunu kullanarak sadece birkaç basit adımla evinizin değerini öğrenebilirsiniz:<br>1. Evinizin bulunduğu adresi detaylı olarak seçin.<br>2. Metrekare, oda sayısı ve bina yaşı gibi temel özellikleri girin.<br>3. Saniyeler içinde yapay zeka tarafından hazırlanan detaylı değerleme raporunuzu görüntüleyin.</p>",
            imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
            isPublished: true
        },
        {
            title: "Türkiye'de Gayrimenkul Piyasası ve Değerleme Trendleri",
            slug: "turkiyede-gayrimenkul-piyasasi-trendleri",
            summary: "Türkiye gayrimenkul sektöründeki güncel trendler, konut fiyat endeksi analizleri ve gelecek döneme dair yatırım öngörüleri.",
            content: "<p>Türkiye gayrimenkul piyasası, sürekli değişen dinamikleriyle yatırımcılar için hem fırsatlar hem de riskler barındırıyor. Özellikle büyükşehirlerdeki konut arzı ve talep dengesi fiyatları doğrudan etkiliyor.</p><h2>Güncel Değişimler ve Beklentiler</h2><p>TCMB konut fiyat endeksi verilerini analiz ettiğimizde, bölgesel olarak fiyat artış hızlarında farklılıklar gözlemliyoruz. Yatırım yapmak isteyenler için gelişmekte olan yeni bölgeler yüksek potansiyel sunarken, doyuma ulaşmış merkezi lokasyonlar daha stabil bir getiri tablosu çiziyor.</p>",
            imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
            isPublished: true
        },
        {
            title: "Yapay Zeka ile Emlak Değerleme: Geleceğin Teknolojisi",
            slug: "yapay-zeka-ile-emlak-degerleme",
            summary: "Yapay zeka teknolojisinin emlak değerleme süreçlerine etkisi, geleneksel yöntemlere kıyasla sunduğu benzersiz avantajlar ve hız.",
            content: "<p>PropTech (Gayrimenkul Teknolojileri) sektörünün en önemli yapı taşlarından biri haline gelen yapay zeka, emlak değerleme süreçlerini kökten değiştiriyor.</p><h2>Makine Öğrenimi ve Veri Analizi</h2><p>Bizim algoritmalarımız; geçmiş satış verilerini, enflasyon oranlarını, kira çarpanlarını ve bölgesel değerleme trendlerini eş zamanlı olarak analiz eder. Bu sayede insan hatalarının ve manipülatif fiyatlandırmaların önüne geçilerek tamamen şeffaf ve bilimsel bir değer tahmini ortaya konur.</p>",
            imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            isPublished: true
        }
    ];

    console.log("Starting to seed blog posts...");

    for (const blog of blogs) {
        // Upsert to handle if they already exist
        await prisma.blogPost.upsert({
            where: { slug: blog.slug },
            update: blog,
            create: blog,
        });
        console.log(`Upserted blog post: ${blog.title}`);
    }

    console.log("Seeding finished.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

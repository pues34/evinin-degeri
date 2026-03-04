const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding pages...');

    const pages = [
        {
            title: 'Hakkımızda',
            slug: 'hakkimizda',
            content: '<div class="space-y-6 text-gray-600 leading-relaxed"><h2 class="text-3xl font-bold text-appleDark">Türkiye\'nin İlk Yapay Zeka Destekli Değerleme Platformu</h2><p>Evinin Değeri, gayrimenkul sektöründe şeffaflığı ve doğruluğu merkeze alan, gelişmiş makine öğrenmesi algoritmalarıyla çalışan öncü bir proptech (gayrimenkul teknolojileri) girişimidir.</p><p>Misyonumuz; herkesin saniyeler içinde, tarafsız ve güncel piyasa verilerine dayalı ev değerleme sonuçlarına ulaşabilmesidir. Gelenekselleşmiş ve haftalarca süren ekspertiz süreçlerini dijitalleştiriyor, veri bilimi ve bölgesel lokasyon şerefiyesi uzmanlığıyla anında sizlere sunuyoruz.</p><div class="bg-blue-50 p-6 rounded-2xl border border-blue-100 mt-8"><h3 class="text-xl font-semibold text-appleBlue mb-3">Neden Bize Güvenebilirsiniz?</h3><ul class="list-disc pl-5 space-y-2"><li><b>Tarafsızlık:</b> Hiçbir emlak kurumu veya aracıya bağlı değiliz. Sadece veriye güveniriz.</li><li><b>Gelişmiş Algoritma:</b> TCMB verileri ve bölgesel enflasyon oranlarıyla sürekli öğrenen bir altyapıya sahibiz.</li><li><b>Detaylı Şerefiye:</b> Sadece ile veya ilçeye değil, binanın yaşına, katına, mahallesine ve hatta otopark durumuna kadar sayısız değişkeni analiz ederiz.</li></ul></div></div>'
        },
        {
            title: 'Nasıl Çalışır?',
            slug: 'nasil-calisir',
            content: '<div class="space-y-8 text-gray-600"><h2 class="text-3xl font-bold text-appleDark">Gerçek Değeri Bulma Yolculuğu</h2><p>Sistemimizin arkasındaki büyük veri mimarisi karmaşık olsa da, sizin mülkünüzün değerini öğrenmeniz sadece 3 basit adımdan oluşur.</p><div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6"><div class="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm"><div class="w-12 h-12 bg-blue-100 text-appleBlue rounded-full flex items-center justify-center font-bold text-xl mb-4">1</div><h3 class="font-bold text-appleDark mb-2">Veri Girişi & Konum Tespiti</h3><p class="text-sm">Evinizin bulunduğu ili, ilçeyi ve mahalleyi seçersiniz. Sistemimiz anında o mahallenin güncel metrekare birim fiyat endeksini ve bölgesel çarpanını hesaplamaya başlar.</p></div><div class="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm"><div class="w-12 h-12 bg-blue-100 text-appleBlue rounded-full flex items-center justify-center font-bold text-xl mb-4">2</div><h3 class="font-bold text-appleDark mb-2">Fiziksel Özellik Analizi</h3><p class="text-sm">Binanın yaşı, dairenin bulunduğu kat ve asansör/otopark gibi ek özellikler devreye girer. Şerefiye puanlama sistemimiz tavan/taban fiyatlarını evinizin özel yeteneklerine göre daraltır.</p></div><div class="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm md:col-span-2"><div class="w-12 h-12 bg-blue-100 text-appleBlue rounded-full flex items-center justify-center font-bold text-xl mb-4">3</div><h3 class="font-bold text-appleDark mb-2">Makine Öğrenmesi & Gelecek Projeksiyonu</h3><p class="text-sm">Elde edilen nihai çarpan değerleri, Merkez Bankası enflasyon grafikleri ve bölgesel değer artış istatistikleri ile birleşerek size özel hem bugünün değerini hem de önümüzdeki 2 yıllık piyasa tahminlemesini PDF bir rapor olarak sunar.</p></div></div></div>'
        },
        {
            title: 'Gizlilik Politikası',
            slug: 'gizlilik-politikasi',
            content: '<div class="space-y-6 text-gray-600"><h2 class="text-3xl font-bold text-appleDark">Verileriniz Güvende</h2><p>Evinin Değeri olarak, kullanıcılarımızın kişisel sınırlarına ve bilgi güvenliğine en üst düzeyde hassasiyet gösteriyoruz.</p><h3 class="text-xl font-semibold text-appleDark mt-6">Toplanan Veriler</h3><p>Sistemde yapılan sorgulamalarda, raporun iletilebilmesi amacıyla yalnızca ad, soyad, telefon ve e-posta bilgileriniz talep edilmektedir. Ayrıca yapılan sorgulamaların tarihçesi, sistemin yapay zeka algoritmasının geliştirilmesi amacıyla anonimleştirilerek kullanılabilir.</p><h3 class="text-xl font-semibold text-appleDark mt-6">Verilerin Kullanımı ve Paylaşımı</h3><p>Girdiğiniz veriler ve sorgu sonuçları hiçbir koşulda üçüncü taraf kurumlar, emlak ofisleri veya reklam şirketleri ile <b>paylaşılmaz ve satılmaz.</b> Tüm iletişim veritabanımız %100 uçtan uca KVKK uyumlu sunucularda barındırılmaktadır.</p></div>'
        },
        {
            title: 'Kullanım Koşulları',
            slug: 'kullanim-kosullari',
            content: '<div class="space-y-6 text-gray-600"><h2 class="text-3xl font-bold text-appleDark">Kullanım Koşulları</h2><p>Lütfen sitemizi ve değerleme aracımızı kullanmadan önce aşağıdaki koşulları okuyunuz.</p><ul class="list-decimal pl-5 space-y-4 mt-4"><li><b>Bilgilendirme Amaçlıdır:</b> Sitemiz üzerinden üretilen değerleme raporları, gelişmiş makine öğrenmesi tahminlerine dayalı olup <b>bilgilendirme amaçlıdır.</b> Herhangi bir mahkemede, kredi başvurusunda veya resmi kurumda yasal ekspertiz belgesi olarak kullanılamaz.</li><li><b>Hata Payı:</b> Algoritma, girilen verilerin doğruluğuna güvenir. Yanlış girilen mahal, kat veya yaş gibi bilgiler yanlış sonuçlar doğuracaktır. Sistem piyasa anormallikleri (olağanüstü krizler vb.) hariç tutularak normal şartlar varsayımıyla hesap yapar.</li><li><b>Fikri Mülkiyet:</b> "Evinin Değeri" platformu, tasarımı, kaynak kodları ve yapay zeka hesaplama modelleri telif hakkı yasalarınca korunmaktadır. Kopyalanamaz, çoğaltılamaz veya tersine mühendisliğe tabi tutulamaz.</li></ul></div>'
        }
    ];

    for (const page of pages) {
        await prisma.page.upsert({
            where: { slug: page.slug },
            update: { title: page.title, content: page.content },
            create: page,
        });
    }

    console.log('Pages seeded.');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

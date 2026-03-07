const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const pages = [
        {
            title: "Gizlilik Politikası",
            slug: "gizlilik-politikasi",
            content: `
            <h2>Gizlilik Şartlarımız ve Veri Güvenliği Standardı</h2>
            <p><strong>Evinin Değeri</strong> ("Biz", "Şirket"), kullanıcılarının özel bilgilerinin güvenliğini ciddiye almaktadır. Sitemizde yer alan yapay zeka ile ev değerleme, gayrimenkul fiyat hesaplama ve İstanbul emlak değerleme hizmetlerini kullanırken sunduğunuz konum ve isim bilgileriniz sadece analiz amacıyla kullanılmaktadır.</p>
            <h3>Tarafımızca Toplanan Veriler</h3>
            <ul>
                <li>Ev değerleme aşamasında girilen fiziksel özellikler (Kat, yaş, alan).</li>
                <li>Haberleşme formunda paylaşılan e-posta adresi (<em>destek@evindegeri.com</em> üzerinden sağlanan erişimler dahil).</li>
            </ul>
            <p>KVKK çerçevesinde verileriniz şifreli sunucularda saklanmakta ve üçüncü kişilere satılmamaktadır. İstanbul bölgesine özel gayrimenkul fiyat hesaplama algoritmamız tamamen anonim konut verileriyle beslenir.</p>
            <h3>Çerez (Cookie) Kullanımı</h3>
            <p>Size daha iyi bir deneyim sunabilmek ve arama (SEO) sonuçlarında Türkiye'nin en iyi ev değerlendirme platformu olabilmemiz için temel işlev çerezleri kullanılmaktadır.</p>
            `
        },
        {
            title: "Kullanım Koşulları",
            slug: "kullanim-kosullari",
            content: `
            <h2>Evinin Değeri Konut Hesaplama Sistemi Kullanım Şartları</h2>
            <p><strong>Evinin Değeri</strong> web sitesine erişerek buradaki tüm kuralları ve T.C. yasal zorunluluklarını kabul etmiş sayılırsınız.</p>
            <h3>Hizmet Kapsamı ve Yapay Zeka Sınırlamaları</h3>
            <p>Platformumuz üzerinden aldığınız <strong>Ev Değeri Hesaplama Yorumları</strong> ve "Bölge Analiz Raporları", güncel TCMB enflasyon metrikleri ve İstanbul ilçe-mahalle bazlı baz fiyat çarpanlarıyla OpenAI destekli gelişmiş bir algoritma tarafından üretilir. Ancak bu sonuçlar sadece tavsiye niteliğindedir. Alım-satım kararlarınızı tamamen sitemize dayandırarak yaşayabileceğiniz maddi kayıplardan platformumuz sorumlu tutulamaz.</p>
            <h3>Telif Hakları</h3>
            <p>Sitemizin tasarımı, yapay zeka tarafından oluşturulan dinamik içerikleri, blog makaleleri ve değerleme formül çarpanları Evinin Değeri ekibine aittir. Kopyalanması ve ticari amaçlarla başka bir sitede yayınlanması yasaktır.</p>
            <p>İletişim, şikayet ve diğer talepleriniz için bize her zaman <strong>destek@evindegeri.com</strong> adresinden ulaşabilirsiniz.</p>
            `
        },
        {
            title: "Hakkımızda",
            slug: "hakkimizda",
            content: `
            <h2>Türkiye'nin En Gelişmiş Gayrimenkul Fiyat Analiz Platformu</h2>
            <p><strong>Evinin Değeri</strong>, ev alıp satmak veya emlak yatırımı yapmak isteyen kullanıcıları tahmini piyasa gerçekleriyle anında buluşturan bağımsız bir teknoloji girişimidir.</p>
            <h3>Vizyonumuz: Neden Bizi Tercih Etmelisiniz?</h3>
            <p>Geleneksel emlak yetkililerinin "Göz Kararı" yöntemi yerine, günümüzde veriye çok inanan yatırımcılar için bir yapay zeka analiz platformu tasarladık. İstanbul gibi gayrimenkul fiyat dinamiklerinin gün aşırı değiştiği metropollerde, bölge bazlı şerefiye algoritmamız (Asansör, Bina Yaşı, Otopark, Güvenlik çarpanları vb.) devreye girerek Türkiye'nin ilk tam otonom SEO ve emlak sonuç motorunu oluşturduk.</p>
            <p>Sitemizin tamamen ücretsiz bireysel kullanımını bir devrim olarak görüyoruz. Bize ulaşmak, reklam veya iş birliği yapmak için: <strong>destek@evindegeri.com</strong></p>
            `
        }
    ];

    for (const page of pages) {
        await prisma.page.upsert({
            where: { slug: page.slug },
            update: {
                title: page.title,
                content: page.content
            },
            create: {
                title: page.title,
                slug: page.slug,
                content: page.content
            }
        });
        console.log("Upserted page: " + page.title);
    }

    console.log("CMS Pages seeding complete!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

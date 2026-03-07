const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const pages = [
    {
        slug: "gizlilik-politikasi",
        title: "Gizlilik Politikası (KVKK Aydınlatma Metni)",
        content: `<h2>1. Veri Sorumlusunun Kimliği</h2>
<p>Evinin Değeri ("Şirket" veya "Platform"), 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca veri sorumlusu sıfatıyla hareket etmektedir. Amacımız, platform üzerinden paylaştığınız bilgilerin gizliliğini en üst düzeyde korumaktır.</p>
<h2>2. Toplanan Kişisel Veriler</h2>
<p>Hizmetlerimizi sunabilmek için aşağıdaki verileri işliyoruz:</p>
<ul>
<li><strong>Kimlik ve İletişim:</strong> Ad, soyad, e-posta adresi, telefon numarası.</li>
<li><strong>Lokasyon ve Mülk Bilgisi:</strong> Değerleme yapılan konutun il, ilçe, mahalle bilgileri, metrekare, kat, yaş gibi teknik donatıları.</li>
<li><strong>İşlem Güvenliği:</strong> IP adresi, cihaz bilgileri, log kayıtları.</li>
</ul>
<h2>3. İşleme Amaçları</h2>
<p>Topladığımız kişisel veriler; gayrimenkul değerleme hesaplamalarının yapılması, yapay zeka algoritmalarının eğitilmesi (anonimleştirilerek), üyelik sözleşmesinin kurulması, B2B/B2C pazarlama faaliyetlerinin yürütülmesi ve yasal zorunlulukların ifası amacıyla işlenmektedir.</p>
<h2>4. Üçüncü Kişilere Aktarım</h2>
<p>Verileriniz, yalnızca yasal sınırlar çerçevesinde; ödeme altyapı sağlayıcıları (örn: iyzico), bulut sunucu hizmeti veren firmalar ve yetkili kamu kurumlarıyla paylaşılmaktadır. Verileriniz asla reklam veya data satışı amacıyla üçüncü taraflarla paylaşılmaz.</p>
<h2>5. İlgili Kişinin Hakları</h2>
<p>KVKK Madde 11 uyarınca; verilerinizin işlenip işlenmediğini öğrenme, düzeltilmesini talep etme, silinmesini isteme hakkına sahipsiniz. Taleplerinizi <strong>destek@evindegeri.com</strong> adresine iletebilirsiniz.</p>
<p><em>Son Güncelleme: Mart 2026</em></p>`
    },
    {
        slug: "kullanim-kosullari",
        title: "Kullanım Koşulları",
        content: `<h2>1. Taraflar ve Onay</h2>
<p>Bu metin, Evinin Değeri sistemini ziyaret eden ve kullanan tüm gerçek ve tüzel kişiler ("Kullanıcı") ile hizmet sağlayıcı Şirket arasındaki bağlayıcı kuralları belirler. Platformu kullanarak bu şartları kabul etmiş sayılırsınız.</p>
<h2>2. Hizmetin Kapsamı ve Yapay Zeka Uyarısı</h2>
<p>Platform, kullanıcı beyanına, bölge çarpanlarına ve makine öğrenimi modellerine dayanarak <strong>TAHMİNİ</strong> pazar değeri hesaplamaktadır. Sunulan sonuçlar SPK lisanslı bir ekspertiz raporu değildir.</p>
<h2>3. Yatırım Tavsiyesi Değildir (Sorumluluk Reddi)</h2>
<p>Elde edilen değerler, kira çarpanları veya amortisman süreleri <strong>kesinlikle yatırım tavsiyesi içermez.</strong> Evinin Değeri, bu raporlara dayanarak alınan ticari, hukuki veya finansal kararlardan doğabilecek hiçbir maddi/manevi zarardan sorumlu tutulamaz.</p>
<h2>4. Fikri Mülkiyet Hakları</h2>
<p>Sitedeki tüm yazılımlar, tasarımlar, logolar, metinler ve Isı Haritası algoritmaları şirketimize aittir. Kopyalanması, tersine mühendislik yapılması veya ticari amaçla izinsiz kullanılması yasal takibata tabidir.</p>
<h2>5. Adil Kullanım (Fair Use)</h2>
<p>Bireysel amaçlı ücretsiz değerleme hizmetinin bot hesaplar veya scraping yöntemleriyle suistimal edilmesi durumunda, şirket IP numaralarını ve cihazları kalıcı olarak engelleme hakkını saklı tutar.</p>
<p><em>Son Güncelleme: Mart 2026</em></p>`
    },
    {
        slug: "mesafeli-satis-sozlesmesi",
        title: "Mesafeli Satış Sözleşmesi",
        content: `<h2>1. Taraflar</h2>
<p><strong>Satıcı:</strong> Evinin Değeri Gayrimenkul Teknolojileri A.Ş.<br>
<strong>Alıcı (Tüketici):</strong> Platform üzerinden dijital Premium rapor veya B2B abonelik satın alan kişi/kurum.</p>
<h2>2. Sözleşmenin Konusu</h2>
<p>İşbu sözleşme, Alıcı'nın Satıcı'ya ait Evinin Değeri platformundan elektronik ortamda siparişini yaptığı "Premium Yatırım Haritası", "Detaylı Değerleme PDF Raporu" veya "B2B Kurumsal Paket" hizmetlerinin satışı ve ifası ile ilgili hak ve yükümlülükleri düzenler.</p>
<h2>3. Hizmet Bedeli ve Ödeme Şartları</h2>
<p>Satın alınan paketin vergiler dahil satış fiyatı sipariş formunda ve fatura bilgisinde gösterilmektedir. Ödeme, onaylanmış ödeme kuruluşları (örn: iyzico/Stripe) üzerinden tahsil edilir.</p>
<h2>4. İfa ve Teslimat</h2>
<p>Sözleşme konusu "Dijital İçerik/Yazılım", ödemenin onaylanmasının hemen ardından saniyeler içerisinde kullanıcının ekranında veya e-posta adresinde dijital olarak teslim edilir/kullanıma açılır.</p>
<h2>5. Cayma Hakkının İstisnası</h2>
<p>Mesafeli Sözleşmeler Yönetmeliği Madde 15/1-g uyarınca, "Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler" <strong>cayma hakkının istisnasıdır.</strong> Bu sebeple sipariş tamamlanıp rapor dijital olarak oluşturulduktan sonra iade yapılamaz.</p>
<h2>6. Uyuşmazlık Çözümü</h2>
<p>Sözleşmenin uygulanmasından doğacak uyuşmazlıklarda İstanbul (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.</p>`
    },
    {
        slug: "iptal-iade",
        title: "İptal ve İade Koşulları",
        content: `<h2>1. Dijital Ürün Hizmet Politikası</h2>
<p>Evinin Değeri platformu üzerinden satılan ürünler fiziksel bir mal değil, anında üretilen ve dijital olarak teslim edilen "Yapay Zeka Destekli Analiz Raporları" ve "Yazılım Abonelikleri"dir.</p>
<h2>2. Cayma Hakkının Bulunmaması (İade Edilemezlik)</h2>
<p>Tüketici Hakları gereğince dijital ortamda anında ifa edilen hizmetler iade edilemez. Kullanıcı "Rapor Al" butonuna tıklayıp ödemeyi gerçekleştirdiğinde işlem tamamlanmış, sunucu maliyetleri ve veri analiz maliyetleri gerçekleşmiş olur. Bu sebeple <strong>satın alınan tekil raporların ücret iadesi yapılmamaktadır.</strong></p>
<h2>3. Abonelik İptal Koşulları</h2>
<p>Kurumsal B2B Emlakçı Paketi veya Premium Aylık/Yıllık abonelik alan kullanıcılar, aboneliklerini diledikleri zaman "Ayarlar > Faturalandırma" menüsünden iptal edebilirler. İptal işlemi bir sonraki fatura döneminden itibaren geçerli olur. İçinde bulunulan ayın ücret iadesi yapılmaz, ancak hizmet fatura döngüsü bitene kadar kullanılmaya devam eder.</p>
<h2>4. Teknik Hata Durumları</h2>
<p>Eğer platform kaynaklı bir sistem çökmesi, raporun eksik oluşturulması veya farklı bir adresin analiz edilmesi gibi teknik bir sunucu hatası yaşanırsa, 14 gün içerisinde destek maili üzerinden ulaşıldığı takdirde inceleme başlatılır. Şirket hatası tespit edilirse koşulsuz ve kesintisiz iade gerçekleştirilir.</p>`
    }
];

async function main() {
    for (const page of pages) {
        const existing = await prisma.page.findFirst({ where: { slug: page.slug } });
        if (existing) {
            await prisma.page.update({
                where: { id: existing.id },
                data: { title: page.title, content: page.content }
            });
            console.log(`Updated: ${page.slug}`);
        } else {
            await prisma.page.create({
                data: { title: page.title, slug: page.slug, content: page.content }
            });
            console.log(`Created: ${page.slug}`);
        }
    }
    console.log("CMS legal pages updated successfully (4 comprehensive pages).");
}

main().catch(console.error).finally(() => prisma.$disconnect());

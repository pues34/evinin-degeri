const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const pages = [
    {
        slug: "gizlilik-politikasi",
        title: "Gizlilik Politikasi",
        content: `<h2>1. Genel Bilgilendirme</h2>
<p>Evinin Degeri ("Platform"), kullanicilarin gizliligine onem vermektedir. Bu gizlilik politikasi, platformumuzu kullanmaniz sirasinda toplanan, islenen ve saklanan kisisel verilere iliskin uygulamalarimizi aciklamaktadir.</p>

<h2>2. Toplanan Veriler</h2>
<p>Platformumuz asagidaki verileri toplayabilir:</p>
<ul>
<li><strong>Iletisim Bilgileri:</strong> Ad, soyad, e-posta adresi, telefon numarasi</li>
<li><strong>Gayrimenkul Bilgileri:</strong> Il, ilce, mahalle, metrekare, kat bilgisi, bina yasi ve diger konut ozellikleri</li>
<li><strong>Teknik Veriler:</strong> IP adresi, tarayici turu, erisim zamanlari</li>
<li><strong>Cerez Verileri:</strong> Kullanici deneyimini iyilestirmek icin cerezler kullanilmaktadir</li>
</ul>

<h2>3. Verilerin Kullanim Amaci</h2>
<p>Toplanan veriler asagidaki amaclarla kullanilmaktadir:</p>
<ul>
<li>Gayrimenkul degerleme hizmetinin sunulmasi</li>
<li>Kullaniciya kisisellestirilmis degerleme raporu olusturulmasi ve e-posta ile iletilmesi</li>
<li>Platform performansinin analizi ve iyilestirilmesi</li>
<li>Yasal yukumluluklerin yerine getirilmesi</li>
<li>Kurumsal (B2B) kullanicilara ozel hizmetlerin sunulmasi</li>
</ul>

<h2>4. Yapay Zeka ve Algoritmik Islem Uyarisi</h2>
<p><strong>Onemli:</strong> Platformumuz, gayrimenkul degerleme islemlerinde yapay zeka algoritmasi ve istatistiksel modeller kullanmaktadir. Bu algoritmalar enflasyon oranlari, bolgesel piyasa verileri ve konut ozellikleri temelinde calismaktadir. Uretilen sonuclar <strong>tahmini niteliktedir</strong> ve kesin deger olarak kabul edilmemelidir. Sonuclar yatirim tavsiyesi icermemektedir.</p>

<h2>5. Verilerin Paylasilmasi</h2>
<p>Kisisel verileriniz ucuncu taraflarla paylasilmamaktadir. Ancak asagidaki durumlarda paylasim yapilabilir:</p>
<ul>
<li>Yasal zorunluluk halinde resmi makamlara</li>
<li>Odeme islemleri icin PayTR gibi odeme altyapi saglayicilarina (yalnizca odeme bilgileri)</li>
<li>E-posta gonderimi icin Resend altyapisina (yalnizca e-posta adresi)</li>
</ul>

<h2>6. Veri Saklama Suresi</h2>
<p>Kisisel verileriniz, hizmetin sunulmasi icin gerekli olan sure boyunca saklanmaktadir. Hesabinizi silmeniz veya talepte bulunmaniz halinde verileriniz makul sure icinde imha edilecektir.</p>

<h2>7. KVKK Kapsamindaki Haklariniz</h2>
<p>6698 sayili Kisisel Verilerin Korunmasi Kanunu (KVKK) kapsaminda asagidaki haklara sahipsiniz:</p>
<ul>
<li>Kisisel verilerinizin islenip islenmedigini ogrenme</li>
<li>Islenmisse buna iliskin bilgi talep etme</li>
<li>Verilerin islenis amacini ogrenme</li>
<li>Eksik veya yanlis islenmis verilerin duzeltilmesini isteme</li>
<li>Verilerin silinmesini veya yok edilmesini isteme</li>
<li>Islenen verilerin ucuncu kisilere bildirilmesini isteme</li>
</ul>

<h2>8. Cerezler (Cookies)</h2>
<p>Platformumuz, kullanici deneyimini iyilestirmek ve site performansini analiz etmek amaciyla cerezler kullanmaktadir. Cerez tercihlerinizi tarayici ayarlarinizdan yonetebilirsiniz.</p>

<h2>9. Iletisim</h2>
<p>Gizlilik politikamiza iliskin sorulariniz icin <strong>evindestek@gmail.com</strong> adresinden bize ulasabilirsiniz.</p>

<p><em>Son guncelleme: Mart 2026</em></p>`
    },
    {
        slug: "kullanim-kosullari",
        title: "Kullanim Kosullari",
        content: `<h2>1. Genel Hukumler</h2>
<p>Bu kullanim kosullari, Evinin Degeri ("Platform") web sitesini ve hizmetlerini kullanan tum kullanicilari baglamaktadir. Platformu kullanarak bu kosullari kabul etmis sayilirsiniz.</p>

<h2>2. Hizmet Tanimi</h2>
<p>Evinin Degeri, yapay zeka ve istatistiksel algoritmalar kullanarak gayrimenkul degerleme hizmeti sunan bir dijital platformdur. Platform asagidaki hizmetleri sunmaktadir:</p>
<ul>
<li>Ucretsiz gayrimenkul deger tahmini</li>
<li>Yapay zeka destekli bolgesel analiz</li>
<li>Kurumsal (B2B) kullanicilara ozel limitsiz degerleme</li>
<li>Yatirim isi haritasi</li>
<li>Emlak sektoru blog ve interior</li>
</ul>

<h2>3. Onemli Yasal Uyarilar</h2>
<p><strong>YATIRIM TAVSIYESI DEGILDIR:</strong> Platformumuz tarafindan uretilen tum degerleme sonuclari, yapay zeka algoritmasi ve guncel piyasa verileri kullanilarak olusturulan <strong>tahmini degerlerdir</strong>. Bu sonuclar;</p>
<ul>
<li>Resmi bir gayrimenkul ekspertiz raporu yerine <strong>gecmez</strong></li>
<li><strong>Yatirim tavsiyesi niteliginde degildir</strong> ve yatirim tavsiyesi icermez</li>
<li>Alim-satim kararlari icin tek basina yeterli bir kaynak olarak kabul <strong>edilemez</strong></li>
<li>Enflasyon oranlari, bolgesel veriler ve yapay zeka analizine dayali olarak uretilmektedir</li>
<li>Gercek piyasa fiyatlarindan farklilik gosterebilir</li>
</ul>
<p>Kesin alim-satim kararlari icin <strong>SPK lisansli gayrimenkul degerleme uzmanlari</strong> ile calisilmasi sart ve tavsiye edilmektedir.</p>

<h2>4. Kullanici Sorumluluklari</h2>
<p>Kullanicilar asagidaki hususlara uymakla yukumludur:</p>
<ul>
<li>Forma girilen bilgilerin dogrulugu kullanicinin sorumlulugundeadir</li>
<li>Platformun kotu niyetle, abart spam amacli veya yetkisiz erisim amacli kullanilmamasi</li>
<li>Diger kullanicilarin haklarinin ihlal edilmemesi</li>
<li>Platformun teknik altyapisina zarar verilmemesi</li>
</ul>

<h2>5. Kullanim Sinirlamalari</h2>
<p>Platform, kotu niyetli kullanimlari onlemek icin asagidaki sinirlamalari uygulayabilir:</p>
<ul>
<li>Belirli bir zaman diliminde maksimum degerleme sayisi</li>
<li>Telefon numarasi bazli gunluk kullanim limiti</li>
<li>IP bazli erisim sinirlamasi</li>
</ul>

<h2>6. Fikri Mulkiyet</h2>
<p>Platform uzerindeki tum icerikler, tasarimlar, algoritmalar, yazilim kodlari ve veritabanlari Evinin Degeri'nin fikri mulkiyetindedir ve telif hakki ile korunmaktadir. Izinsiz kopyalama, degistirme veya dagitma yasaktir.</p>

<h2>7. Sorumluluk Sinirlamasi</h2>
<p>Evinin Degeri, sunulan degerleme sonuclarinin dogrulugu, eksiksizligi veya guncelligi konusunda garanti vermemektedir. Platform kullanilarak alinan kararlarin sorumlulugu tamamen kullaniciya aittir. Evinin Degeri, bu kararlardagan kaynaklanan dogrudan veya dolayli zaralardan sorumlu tutulamaz.</p>

<h2>8. Degisiklikler</h2>
<p>Bu kullanim kosullari onceden bildirim yapilmaksizin guncellenebilir. Guncellenmis kosullar platformda yayinlandigi tarihten itibaren gecerlidir.</p>

<h2>9. Uygulanacak Hukuk</h2>
<p>Bu kosullar Turkiye Cumhuriyeti hukukuna tabidir. Uyusmazliklarda Istanbul Mahkemeleri ve Icra Daireleri yetkilidir.</p>

<h2>10. Iletisim</h2>
<p>Kullanim kosullarina iliskin sorulariniz icin <strong>evindestek@gmail.com</strong> adresinden bize ulasabilirsiniz.</p>

<p><em>Son guncelleme: Mart 2026</em></p>`
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
    console.log("CMS legal pages updated successfully.");
}

main().catch(console.error).finally(() => prisma.$disconnect());

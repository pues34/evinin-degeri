import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kullanım Koşulları | Evinin Değeri',
    description: 'Evinin Değeri Gayrimenkul Teknolojileri kullanım şartları, lisans sınırları ve B2B kurumsal kullanım hakları.',
};

export default function KullanimKosullari() {
    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl border border-gray-100 shadow-sm content-page text-gray-700 leading-relaxed">
                <h1 className="text-3xl font-bold text-appleDark mb-8">Kullanım Koşulları</h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">1. Giriş ve Taraflar</h2>
                        <p>
                            www.evinindegeri.com (bundan böyle &quot;Platform&quot; olarak anılacaktır) sitesine erişiminiz ve kullanımınız işbu Kullanım Koşulları&apos;na tabidir. Platformu kullanarak bu şartları tamamen okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz.
                        </p>
                        <p className="mt-2">
                            Platform&apos;un işletmecisi: <strong>Evinin Değeri Gayrimenkul Teknolojileri</strong> (Muratpaşa Mah. Cemiyet Cad. No:28 Bayrampaşa / İstanbul)
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">2. Hizmetin Niteliği (SaaS)</h2>
                        <p>
                            Platform, gayrimenkul piyasası verilerini işleyerek tahmini değer hesaplamaları, geçmiş rapor analizleri ve Alıcı/Satıcı (Lead) müşteri eşleştirmeleri sunan bulut tabanlı bir B2B ve B2C teknoloji hizmetidir. Yazılım, &quot;olduğu gibi&quot; sunulur ve mülkiyeti satılmaz, sadece kullanım lisansı kiralanır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">3. B2B (Kurumsal) Üyelik ve Kısıtlamalar</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Kurumsal emlak ofisleri, PRO veya PRO PLUS aboneliği satın alarak sınırsız sorgu gibi avantajlar kazanır. Hesap paylaşımı kesinlikle yasaktır ve tespit edildiğinde hesabın iptali ile sonuçlanır.</li>
                            <li>Lead (Müşteri) ekranı sadece PRO PLUS üyeleri içindir. Gelen datanın doğruluğu kullanıcının veri girişine bağlıdır, platform %100 doğruluğu garanti edemez.</li>
                            <li>Yapay zeka ile sunulan konut değerleme fiyatları bir &quot;yatırım tavsiyesi&quot; veya &quot;resmi ekspertiz raporu&quot; yerine geçmez. Rakamlar istatistiksel algoritmalarla hesaplanır.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">4. Ücretlendirme ve Abonelik Yenileme</h2>
                        <p>
                            Satın alınan abonelikler, kredi kartı veya havale/EFT seçenekleriyle yapılabilir. Sistemde aktif olan paketler süresi dolduğunda, manuel uzatma yapılmadığı takdirde durdurulur (Şu an için otomatik yenileme (recurring) yoktur).
                            Ödeme altyapısı güvenli sanal POS (256-Bit SSL) şirketleri tarafından sağlanmaktadır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">5. Fikri Mülkiyet</h2>
                        <p>
                            Platform içerisinde yer alan tüm tasarım, algoritma, grafik, metin ve kaynak kodları Evinin Değeri Gayrimenkul Teknolojileri&apos;ne aittir. Kopyalanması, tersine mühendislik yapılması (reverse engineering) veya izinsiz başka bir sunucuda barındırılması yasa dışıdır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">6. Sorumluluğun Reddi</h2>
                        <p>
                            Platformu kullanımınızdan doğabilecek olan doğrudan ya da dolaylı zararlardan şahsımız/şirketimiz sorumlu tutulamaz. Sunulan analiz raporlarında kullanılan veriler üçüncü kurum kaynaklı olup salt bilgi amaçlıdır.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

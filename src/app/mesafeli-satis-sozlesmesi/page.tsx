import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Mesafeli Satış Sözleşmesi | Evinin Değeri',
    description: 'Evinin Değeri Gayrimenkul Teknolojileri platformu mesafeli satış sözleşmesi ve hizmet detayları.',
};

export default function MesafeliSatisSozlesmesi() {
    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl border border-gray-100 shadow-sm content-page text-gray-700 leading-relaxed">
                <h1 className="text-3xl font-bold text-appleDark mb-8">Mesafeli Satış Sözleşmesi</h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">1. Taraflar</h2>
                        <h3 className="font-medium mt-4 mb-1">1.1 Hizmet Veren (Satıcı):</h3>
                        <p><strong>Unvan:</strong> Evinin Değeri Gayrimenkul Teknolojileri</p>
                        <p><strong>Adres:</strong> Muratpaşa Mah. Cemiyet Cad. No:28 Bayrampaşa / İstanbul</p>
                        <p><strong>Vergi Dairesi:</strong> Tuna Vergi Dairesi</p>
                        <p><strong>Vergi / T.C. Kimlik No:</strong> 1310852802</p>
                        <p><strong>E-posta:</strong> destek@evindegeri.com</p>
                        <p><strong>Telefon:</strong> 0533 725 3171</p>

                        <h3 className="font-medium mt-4 mb-1">1.2 Alıcı:</h3>
                        <p>www.evinindegeri.com (&quot;Platform&quot; veya &quot;Site&quot;) üzerinden üyelik veya hizmet satın alımı gerçekleştiren B2B (Kurumsal) veya bireysel kullanıcı.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">2. Sözleşmenin Konusu</h2>
                        <p>
                            İşbu sözleşmenin konusu, Alıcı&apos;nın Satıcı&apos;ya ait www.evinindegeri.com alan adlı internet sitesi üzerinden elektronik ortamda siparişini yaptığı gayrimenkul değerleme,
                            Big Data analizi ve potansiyel müşteri (Lead) sağlama paketleri (&quot;Dijital SaaS Hizmetleri&quot;) ile ilgili olarak tarafların hak ve yükümlülüklerinin saptanmasıdır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">3. Sözleşme Konusu Ürün/Hizmet ve Ödeme Şartları</h2>
                        <p>
                            Platform üzerinden satın alınan hizmetler, tamamen elektronik ortamda anında ifa edilen dijital (SaaS) hizmelerdir. Alıcı, satın aldığı PRO veya PRO PLUS üyelik
                            kapsamında platformun yazılım özelliklerini kullanma hakkı kazanır. Kredi kartı tahsilat işlemleri 256-bit SSL güvencesi ile anlaşmalı sanal POS (Örn: PayTR) altyapısı kullanılarak gerçekleştirilmektedir.
                            Hizmet bedellerine KDV dahildir veya sipariş esnasında ayrıca belirtilir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">4. Genel Hükümler</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Alıcı, Site&apos;de sözleşme konusu ürün/hizmetin temel nitelikleri, satış fiyatı ve ödeme şekline ilişkin ön bilgileri okuyup bilgi sahibi olduğunu kabul eder.</li>
                            <li>Dijital hizmetler, sipariş onayından ve başarılı ödemeden hemen sonra Alıcı&apos;nın hesabında anında aktif hale gelir. Kargo veya fiziksel teslimat söz konusu değildir.</li>
                            <li>Kredi kartı ile yapılan ödemelerde, yetkisiz kullanım tespit edilmesi durumunda ilgili banka veya finans kuruluşunun ödemeyi iptal hakkı saklıdır.</li>
                            <li>Alıcı, Platforma girerken verdiği kişisel ve kurumsal bilgilerin doğru olduğunu beyan eder.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">5. Cayma Hakkı</h2>
                        <p>
                            Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesinin (ğ) bendi uyarınca &quot;Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler&quot;
                            kapsamında, Alıcı’nın 14 günlük yasal cayma hakkı kural olarak bulunmamaktadır. Siparişin onaylanmasıyla hizmet aktif olduğu için iade yapılamaz. Detaylı bilgi İptal ve İade Koşulları sayfasında yer almaktadır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">6. Yetkili Mahkeme</h2>
                        <p>
                            İşbu sözleşmenin uygulanmasında ve doğabilecek uyuşmazlıklarda Türk Hukuku uygulanacak olup, İstanbul Merkez (Çağlayan) Mahkemeleri ve İcra Daireleri yetkilidir.
                        </p>
                        <p className="mt-4 text-sm text-gray-500">
                            <strong>Güncelleme Tarihi:</strong> {new Date().toLocaleDateString('tr-TR')}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

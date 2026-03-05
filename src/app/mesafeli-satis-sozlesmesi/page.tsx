import { Metadata } from "next";
import { Handshake } from "lucide-react";

export const metadata: Metadata = {
    title: "Mesafeli Satış Sözleşmesi",
    description: "Evinin Değeri B2B abonelik sistemlerine ait zorunlu Mesafeli Satış Sözleşmesi dokümanı.",
};

export default function MesafeliSatisPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-28">
            <div className="max-w-4xl w-full bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-appleBlue/5 rounded-full blur-3xl -z-10" />

                <div className="flex flex-col items-center justify-center text-center space-y-4 mb-10">
                    <div className="p-4 bg-blue-50 text-appleBlue rounded-full shadow-inner inline-block relative border border-blue-100/50">
                        <Handshake size={48} className="drop-shadow-sm" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-appleDark tracking-tight">Mesafeli Satış Sözleşmesi</h1>
                        <p className="text-gray-500 mt-2 font-medium">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
                    </div>
                </div>

                <div className="prose prose-blue max-w-none text-gray-600 space-y-8 text-sm">
                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-lg mb-4">1. Taraflar</h3>
                        <p className="leading-relaxed">
                            <strong>1.1. SATICI (HİZMET SAĞLAYICI):</strong>
                            <br />
                            Unvanı: Evinin Değeri Teknolojileri ve Değerleme Algoritmaları
                            <br />
                            E-Posta: bilgi@evindegeri.com
                            <br />
                            (İşbu sözleşmede bundan böyle &quot;SATICI&quot; olarak anılacaktır.)
                        </p>
                        <p className="leading-relaxed mt-4">
                            <strong>1.2. ALICI:</strong>
                            <br />
                            www.evindegeri.com internet sitesine (&quot;Site&quot;) üye olan veya üye olmadan B2B PRO Abonelik/Raporlama hizmetlerini satın alan, işbu sözleşme konusu hizmetten yararlanan tüm gerçek ve/veya tüzel kişiler. (İşbu sözleşmede bundan böyle &quot;ALICI&quot; olarak anılacaktır.)
                        </p>
                    </section>

                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-lg mb-4">2. Sözleşmenin Konusu ve Kapsamı</h3>
                        <p className="leading-relaxed">
                            İşbu sözleşmenin konusu; ALICI&apos;nın SATICI&apos;ya ait www.evindegeri.com alan adlı internet sitesi üzerinden elektronik ortamda siparişini verdiği (satın aldığı) aşağıda 3. maddede nitelikleri ve/veya abonelik koşulları belirlenmiş olan <strong>SaaS (Hizmet Olarak Yazılım) niteliğindeki dijital hizmetin (Emlak Değerleme Yazılımı)</strong> satışı ve ifası ile ilgili olarak Tarafların hak ve yükümlülüklerinin belirlenmesidir.
                            <br /><br />
                            İşbu sözleşme 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği (&quot;Yönetmelik&quot;) hükümleri gereğince düzenlenmiştir.
                        </p>
                    </section>

                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-lg mb-4">3. Sözleşme Konusu Hizmet (Dijital Ürün)</h3>
                        <p className="leading-relaxed">
                            Sözleşme konusu hizmet; &quot;Evinin Değeri B2B PRO Paket&quot; veya yapay zeka tarafından oluşturulan tekil &quot;Gayrimenkul Değerleme ve Analiz Raporları&quot;dır. İşbu hizmet tamamen bulut tabanlı olup (SaaS), herhangi bir fiziksel taşıyıcı (CD, USB vb.) ile ALICI&apos;ya kargolanmaz/teslim edilmez. Satın alma işlemini takiben ALICI&apos;nın sistemdeki hesabına anında elektronik olarak erişim yetkisi (Lisans/Abonelik hakkı) tanımlanır.
                        </p>
                    </section>

                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-lg mb-4">4. Fiyat ve Ödeme Seçenekleri</h3>
                        <p className="leading-relaxed">
                            Dijital hizmetin vergiler dâhil satış fiyatı ve ödeme yöntemleri, B2B Abonelik veya sipariş (ödeme) sayfasında yer alan bilgilerdeki gibidir. ALICI, bu fiyat üzerinden anlaşmalı Ödeme Kuruluşu (örn. PayTR) aracılığıyla Kredi Kartı veya Banka Kartı kullanarak 3D Secure güvenliği ile ödeme yapar. Abonelik modelindeki hizmetlerde (aylık paket vb.), ALICI iptal etmediği sürece seçilen periyotlarda bağlı karttan otomatik tahsilat yapılabilir.
                        </p>
                    </section>

                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-lg mb-4">5. Cayma Hakkı (İstisna)</h3>
                        <p className="leading-relaxed">
                            <strong>ÖNEMLİ:</strong> Yönetmeliğin &quot;Cayma Hakkı İstisnaları&quot; başlıklı 15. maddesinin (ğ) bendi uyarınca; <strong>&quot;Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmelerde&quot; ALICI&apos;nın (Tüketicinin) cayma hakkı BULUNMAMAKTADIR.</strong>
                            <br /><br />
                            SATICI tarafından sunulan yazılım ürünleri, veri analiz ekranları ve yapay zeka raporları dijital ve anında ifa edilen nitelikte olduğundan, <strong>ALICI ödeme yaptıktan sonra ücret iadesi (para iadesi) talep edemez.</strong>
                        </p>
                    </section>

                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-lg mb-4">6. Abonelik İptali</h3>
                        <p className="leading-relaxed">
                            ALICI, satın aldığı B2B Abonelik paketini iptal etmek suretiyle sözleşmesini (&quot;gelecek dönemler için&quot;) sonlandırabilir. İptal işlemi, bir sonraki fatura/ödeme dönemi için çekim yapılmasını durdurur. İptalin yapıldığı tarihten, mevcut periyodun (örneğin ayın) sonuna kadar ALICI almış olduğu PRO yetkilerini/hizmetleri kullanmaya devam eder.
                        </p>
                    </section>

                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-lg mb-4">7. Garanti ve Sorumsuzluk Beyanı</h3>
                        <p className="leading-relaxed">
                            SATICI, sunulan raporların veya Emlak Değerleme verilerinin &quot;kesin piyasa gerçeği veya resmi ekspertiz&quot; hükmünde olduğunu taahhüt etmez. Sistem, girilen parametreleri Makine Öğrenmesi ile piyasa ortalamalarına göre tahmin eder. ALICI, bu veriler ışığında yapacağı ticari yatırımlar, alım-satım işlemleri ve kiralama değerleri nedeniyle doğabilecek zararlardan dolayı SATICI&apos;yı sorumlu tutamaz.
                        </p>
                    </section>

                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-lg mb-4">8. Yetkili Mahkeme</h3>
                        <p className="leading-relaxed">
                            İşbu sözleşmenin uygulanmasında, T.C. Ticaret Bakanlığı&apos;nca ilan edilen parasal sınırlara kadar ALICI&apos;nın yerleşim yerindeki veya hizmetin satın alındığı yerdeki Tüketici Hakem Heyetleri, söz konusu değerin üzerindeki uyuşmazlıklarda ise SATICI&apos;nın veya ALICI&apos;nın yerleşim yerindeki Tüketici Mahkemeleri (veya Asliye Hukuk / Ticaret Mahkemeleri) yetkilidir.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

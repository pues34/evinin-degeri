import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gizlilik Politikası | Evin Değeri',
    description: 'Evin Değeri Gayrimenkul Teknolojileri olarak kişisel verilerinizi 256-bit SSL güvencesiyle koruyoruz.',
};

export default function GizlilikPolitikasi() {
    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl border border-gray-100 shadow-sm content-page text-gray-700 leading-relaxed">
                <h1 className="text-3xl font-bold text-appleDark mb-8">Gizlilik ve Kişisel Verileri Koruma Politikası</h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">1. Veri Sorumlusu ve Güvenlik Altyapısı</h2>
                        <p>
                            Evin Değeri Gayrimenkul Teknolojileri (&quot;Platform&quot;) olarak, kullanıcılarımıza ait kişisel ve finansal verilerin maksimum seviyede korunmasına önem veriyoruz. Sitemiz üzerindeki tüm veri transferleri uçtan uca <strong>256-Bit SSL sertifikası</strong> ile şifrelenmektedir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">2. Toplanan Veriler ve Kullanım Amacı</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Kimlik ve İletişim Bilgileri:</strong> İsim, e-posta, telefon ve firma (B2B) bilgileri, abonelik oluşturmak ve hizmet sunabilmek amacıyla işlenir.</li>
                            <li><strong>Gayrimenkul Sorguları:</strong> Algoritmaya girilen konum ve özellikler, platformun fiyat tahmini modelini optimize etmek amacıyla (anonimleştirilerek) kullanılabilir. B2B kullanıcılarının yaptığı gizli sorgular diğer kullanıcılarla paylaşılmaz.</li>
                            <li><strong>Ödeme Bilgileri:</strong> Kredi kartı tahsilat işlemleri global veri güvenliği standardı olan PCI-DSS sertifikalı lisanslı BDDK onaylı (Örn: PayTR vb.) Sanal POS kuruluşları üzerinden yapılmaktadır. <strong>Kredi kartı verileriniz sunucularımızda hiçbir şekilde tutulmaz ve barındırılmaz.</strong></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">3. Çerezler (Cookies) ve Üçüncü Taraflar</h2>
                        <p>
                            Sistem performansını iyileştirmek ve üye giriş çıkış seanslarını (session) muhafaza etmek amacıyla zorunlu çerezler kullanılmaktadır. Sitemiz kesinlikle verilerinizi reklam şirketlerine satmamaktadır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">4. Haklarınız (KVKK Kapsamında)</h2>
                        <p>
                            Aydınlatma yükümlülüğümüz çerçevesinde, sistemimize kayıtlı bulunan kişisel verilerinize erişme, silinmesini (unutulma hakkı) veya düzeltilmesini talep etme hakkına sahipsiniz. Silme işlemleri için destek taleplerinizi <strong>destek@evindegeri.com</strong> adresinden iletişim merkezimize iletebilirsiniz.
                        </p>
                    </section>

                    <section className="pt-4 text-sm text-gray-500">
                        <p><strong>Güncelleme Tarihi:</strong> {new Date().toLocaleDateString('tr-TR')}</p>
                        <p>Evin Değeri Gayrimenkul Teknolojileri - Muratpaşa Mah. Cemiyet Cad. No:28 Bayrampaşa / İstanbul</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

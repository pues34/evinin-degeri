import { Hexagon, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "KVKK Aydınlatma Metni | Evinin Değeri",
    description: "Kişisel verilerinizin işlenmesi ve korunması hakkında detaylı bilgilendirme sayfasına hoşgeldiniz.",
};

export default function KVKKPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-appleBlue/10 rounded-2xl flex items-center justify-center text-appleBlue">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-appleDark">KVKK Aydınlatma Metni</h1>
                            <p className="text-gray-500">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
                        </div>
                    </div>

                    <div className="prose prose-apple max-w-none text-gray-600 space-y-6">
                        <p>
                            Evinin Değeri Gayrimenkul Teknolojileri (&quot;Şirket&quot;) olarak, kişisel verilerinizin güvenliğine
                            büyük önem veriyoruz. 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca,
                            Veri Sorumlusu sıfatıyla kişisel verilerinizi hangi amaçlarla işlediğimizi, kimlere ve
                            hangi amaçlarla aktarabildiğimizi, toplanma yöntemlerini ve hukuki sebeplerini aşağıda açıklıyoruz.
                        </p>

                        <h3 className="text-xl font-bold text-appleDark mt-8">1. İşlenen Kişisel Verileriniz</h3>
                        <p>
                            Platformumuzu kullanımınız esnasında ad, soyad, e-posta adresi, telefon numarası,
                            taşınmaz adres bilgileri, IP adresi ve log kayıtları gibi kişisel verileriniz işlenmektedir.
                            Kredi kartı bilgileriniz Şirketimiz tarafından hiçbir şekilde kaydedilmemekte olup,
                            BDDK lisanslı güvenli ödeme kuruluşu (PayTR) altyapısı üzerinden şifreli olarak işlenmektedir.
                        </p>

                        <h3 className="text-xl font-bold text-appleDark mt-8">2. Kişisel Verilerin İşlenme Amaçları</h3>
                        <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Gayrimenkul değerleme hizmetinin sunulması ve raporun tarafınıza ulaştırılması,</li>
                            <li>Kullanıcı hesabınızın oluşturulması ve yönetimi,</li>
                            <li>Ödeme süreçlerinin paydaş kuruluşlarla koordinasyonu ve faturalandırma,</li>
                            <li>Bilgi güvenliği süreçlerinin yürütülmesi ve yasal bildirimlerin gerçekleştirilmesi,</li>
                            <li>Müşteri destek süreçlerinin yönetilmesi.</li>
                        </ul>

                        <h3 className="text-xl font-bold text-appleDark mt-8">3. Kişisel Verilerin Aktarılması</h3>
                        <p>
                            Toplanan kişisel verileriniz; kanuni yükümlülüklerin yerine getirilmesi amacıyla adli yasal mercilere,
                            elektronik tahsilat işlemleri için lisanslı ödeme kuruluşlarına (PayTR) ve fatura kesim süreçleri
                            kapsamında mali müşavirlik firmamıza aktarılabilmektedir. Hukuki ve yasal zorunluluklar dışında verileriniz
                            asla üçüncü şahıslara veya reklam ajanslarına satılmaz veya paylaşılmaz.
                        </p>

                        <h3 className="text-xl font-bold text-appleDark mt-8">4. İlgili Kişinin Hakları</h3>
                        <p>
                            KVKK&apos;nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, detaylarını talep etme,
                            eksik veya yanlış işlenmişse düzeltilmesini isteme, silinmesini talep etme haklarına sahipsiniz.
                            Bu husustaki taleplerinizi <strong>destek@evindegeri.com</strong> adresi üzerinden yasal yollarla Şirketimize iletebilirsiniz.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
                        <Link href="/" className="px-6 py-3 bg-gray-50 text-appleDark hover:bg-gray-100 rounded-xl font-medium transition-colors">
                            Ana Sayfaya Dön
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

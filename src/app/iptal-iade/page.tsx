import { Metadata } from "next";
import { ShieldCheck, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "İptal ve İade Koşulları",
    description: "Evinin Değeri dijital hizmetleri ve B2B SaaS abonelik modelleri için geçerli olan iptal ve iade koşulları.",
};

export default function IptalIadePage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-28">
            <div className="max-w-4xl w-full bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-appleBlue/5 rounded-full blur-3xl -z-10" />

                <div className="flex flex-col items-center justify-center text-center space-y-4 mb-10">
                    <div className="p-4 bg-blue-50 text-appleBlue rounded-full shadow-inner inline-block relative border border-blue-100/50">
                        <AlertCircle size={48} className="drop-shadow-sm" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-appleDark tracking-tight">İptal ve İade Koşulları</h1>
                        <p className="text-gray-500 mt-2 font-medium">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
                    </div>
                </div>

                <div className="prose prose-blue max-w-none text-gray-600 space-y-8">
                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-xl flex items-center gap-2 mb-4">
                            1. Dijital Hizmet Niteliği
                        </h3>
                        <p className="leading-relaxed">
                            <strong>Evinin Değeri</strong> (&quot;hizmet sağlayıcı&quot;) tarafından sunulan perakende &quot;Gayrimenkul Değerleme Raporları&quot; ile emlak ofislerine yönelik &quot;B2B PRO Sınırsız Abonelik&quot; paketleri, kullanıcıya anında teslim edilen ve/veya elektronik ortamda ifa edilen gayri maddi <strong>&quot;Dijital Hizmetler&quot;</strong> statüsündedir.
                        </p>
                    </section>

                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-xl flex items-center gap-2 mb-4">
                            2. Cayma Hakkının İstisnası
                        </h3>
                        <p className="leading-relaxed">
                            Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği gereğince, <strong>elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayri maddi mallara ilişkin sözleşmelerde cayma hakkı kullanılamaz.</strong> Sistemimizin sunduğu yazılım (SaaS) hizmetleri abonelik başlatıldığı veya rapor üretildiği saniye itibariyle kullanıma açıldığı için, bu hizmetlerde yasal veya inisiyatif tabanlı <strong>Ücret İadesi (Refund) yapılmamaktadır.</strong>
                        </p>
                    </section>

                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-xl flex items-center gap-2 mb-4">
                            3. B2B PRO Abonelik İptal Koşulları
                        </h3>
                        <ul className="list-disc pl-5 space-y-3 leading-relaxed mt-4 marker:text-appleBlue">
                            <li>Kullanıcılar, satın aldıkları &quot;Aylık B2B Sınırsız Değerleme&quot; PRO paketlerini diledikleri zaman &quot;Yönetim Paneli&quot; üzerinden iptal edebilirler.</li>
                            <li><strong>İptal işlemi; bir sonraki ay için yapılacak olan otomatik faturalandırmayı ve tahsilatı durdurur.</strong> İçinde bulunulan mevcut fatura dönemi iptal edilmez, kalan gün sayısı bitene kadar PRO üyelik ayrıcalıkları kesintisiz kullanılmaya devam edilir.</li>
                            <li>Peşin olarak ödenmiş (ve aktifleşmiş) olan mevcut ayın kullanım hakları geri alınmaz ve para iadesi yapılmaz.</li>
                        </ul>
                    </section>

                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-xl flex items-center gap-2 mb-4">
                            4. Altyapı Hataları ve Kesintiler
                        </h3>
                        <p className="leading-relaxed">
                            Mücbir sebepler (Doğal afet, ülke çapında internet kesintisi vb.) dışında, algoritmanın ve sunucuların tamamen çökmesi sebebiyle kullanıcının ücretini ödediği hizmeti aralıksız 48 saat boyunca hiç alamaması durumunda, kullanıcı mağduriyeti oranında ek süre tanımlanması (aboneliğin bedelsiz uzatılması) sağlanır.
                        </p>
                    </section>

                    <section className="bg-gray-50/50 p-6 border border-gray-100 rounded-2xl">
                        <h3 className="text-appleDark font-bold text-xl flex items-center gap-2 mb-4">
                            5. Uyuşmazlık ve İletişim
                        </h3>
                        <p className="leading-relaxed">
                            İşbu iptal koşulları şeffaf olarak hizmet bedeli ödenmeden (ödeme sayfasında ve kayıt esnasında) taraflara kabul ettirilmiştir. Ödeme ve üyelik sorunları için tarafımıza <strong>bilgi@evindegeri.com</strong> adresi üzerinden ulaşabilirsiniz.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}

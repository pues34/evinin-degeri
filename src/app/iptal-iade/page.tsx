import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'İptal ve İade Koşulları | Evin Değeri',
    description: 'Evin Değeri dijital SaaS platformu iptal ve iade politikaları.',
};

export default function IptalIade() {
    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-xl border border-gray-100 shadow-sm content-page text-gray-700 leading-relaxed">
                <h1 className="text-3xl font-bold text-appleDark mb-8">İptal ve İade Koşulları</h1>

                <div className="space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">1. Dijital Hizmetlerin İadesi (Mesafeli Sözleşmeler Yönetmeliği)</h2>
                        <p>
                            Evin Değeri Gayrimenkul Teknolojileri (&quot;Platform&quot;) üzerinden satışı yapılan &quot;PRO&quot; ve &quot;PRO PLUS&quot; paketleri, kullanıcıya anında sağlanan ve tüketilen &quot;Bulut Tabanlı Yazılım / SaaS (Software as a Service)&quot; hizmetleridir.
                        </p>
                        <p className="mt-2 text-red-600 font-medium">
                            Bu sebeple, T.C. Mesafeli Sözleşmeler Yönetmeliği’nin 15. maddesi &quot;Elektronik ortamda anında ifa edilen hizmetler veya tüketiciye anında teslim edilen gayrimaddi mallara ilişkin sözleşmeler&quot; gereğince KURAL OLARAK CAYMA HAKKI (İADE) BULUNMAMAKTADIR. Kullanıcı satın alma işlemini yaparak aboneliği aktif ettiği anda iade hakkından feragat ettiğini peşinen kabul eder.
                        </p>
                        <div className="mt-4 bg-red-50 p-4 border border-red-200 rounded-xl">
                            <p className="text-red-700 font-bold text-center">
                                ÖNEMLİ: Sistemimizde satılan tüm ürünler (raporlar ve abonelikler) dijital rapor/hizmet kapsamındadır. Anında ve elektronik ortamda teslim edildiği için İADE (CAYMA HAKKI) YOKTUR.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">2. Abonelik İptali</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Manuel Yenileme:</strong> Satın alınan abonelik paketleri, aylık veya yıllık döngüleri bittiğinde standart olarak otomatik yenilenmez, kullanıcı sisteme tekrar girerek kart bilgilerini tuşlamalıdır. (Kart saklama yapılmaz).</li>
                            <li><strong>Otomatik Yenileme Aktif İse:</strong> Sistem altyapısında otomatik ödeme aboneliği sunulduğu (recurring) takdirde, kullanıcılar bu abonelikleri yenileme tarihinden en geç 48 saat önce kullanıcı panelleri üzerinden tek tıkla iptal edebilirler.</li>
                            <li>İptal edilen aboneliklerin kullanıma yetkili olunan mevcut ay (içinde bulunulan ay) bedelleri iade edilmez, kullanıcı ay sonuna kadar haklarını tüketmeye devam edebilir.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-appleDark mb-3">3. İadeye Tabi Olan İstisnai Durumlar</h2>
                        <p>
                            Platform sunucularından kaynaklı, kullanıcının sisteme erişimini aralıksız olarak art arda 72 saat engelleyen yazılımsal kesinti ve çökme durumlarında (mücbir sebepler hariç) kullanıcıya gün bazında veya tam ay iadesi oransal olarak (Kredi Kartına İade) gerçekleştirilir. İade talepleri analiz edilip 3-7 iş günü içinde değerlendirilir.
                        </p>
                    </section>

                    <section className="pt-4 text-sm text-gray-500">
                        <p>İletişim ve Destek: <strong>destek@evindegeri.com</strong></p>
                    </section>
                </div>
            </div>
        </div>
    );
}

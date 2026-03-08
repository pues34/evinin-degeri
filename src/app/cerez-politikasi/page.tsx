import { Hexagon, Cookie } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Çerez Politikası | Evin Değeri",
    description: "Sitemizde kullanılan çerezler (cookies) ve bunların yönetim yöntemleri hakkında bilgilendirme.",
};

export default function CerezPolitikasiPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500">
                            <Cookie size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-appleDark">Çerez (Cookie) Politikası</h1>
                            <p className="text-gray-500">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
                        </div>
                    </div>

                    <div className="prose prose-apple max-w-none text-gray-600 space-y-6">
                        <p>
                            Evin Değeri (&quot;Şirket&quot;) olarak, web sitemizin daha verimli çalışmasını sağlamak,
                            kullanıcı deneyimini geliştirmek ve sitemizi daha iyi kullanabilmeniz için sitemizde çerezler
                            (cookies) kullanmaktayız. İşbu Çerez Politikası, hangi çerezlerin kullanıldığını ve kullanıcıların
                            bu konudaki tercihlerini nasıl yönetebileceğini açıklamaktadır.
                        </p>

                        <h3 className="text-xl font-bold text-appleDark mt-8">1. Çerez Nedir?</h3>
                        <p>
                            Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza
                            veya ağ sunucusuna depolanan küçük veri (metin) dosyalarıdır. Çerez sitenin daha işlevsel
                            çalışmasına ve tercihlerinizi (örn: bulunduğunuz oturum, dil) hatırlamasına yardımcı olur.
                        </p>

                        <h3 className="text-xl font-bold text-appleDark mt-8">2. Hangi Çerezleri Kullanıyoruz?</h3>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Zorunlu Çerezler:</strong> Sitemizin temel işlevlerini yerine getirmesi (örneğin sisteme giriş yapmak, sepetiniz, hesabınız) için teknik olarak kullanılması zorunlu çerezlerdir. Onayınıza tabi değildir.</li>
                            <li><strong>Performans ve Analitik Çerezler:</strong> Ziyaretçilerin web sitesini nasıl kullandığını anonim olarak ölçmek ve performansı iyileştirmek için kullanılan çerezlerdir (örneğin Google Analytics).</li>
                            <li><strong>İşlevsellik Çerezleri:</strong> Dil tercihi ve bölge özelleştirmeleri gibi sitemiz üzerindeki kişiselleştirilmiş ayarlarınızı hatırlayan çerezlerdir.</li>
                        </ul>

                        <h3 className="text-xl font-bold text-appleDark mt-8">3. Çerezlerin Yönetimi</h3>
                        <p>
                            Cihazınıza yerleştirilen çerezlerin kullanımına ilişkin tercihlerinizi tarayıcınızın
                            ayarlar kısmından değiştirebilirsiniz. Çerezleri engellemeniz durumunda, web sitemizin bazı alanları,
                            özellikle giriş gerektiren platform hizmetleri düzgün çalışmayabilir. Temel tarayıcıların sunduğu
                            çerez yönetim metotlarını tarayıcınızın &quot;Yardım&quot; menüsünden veya ayarlarından öğrenebilirsiniz.
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

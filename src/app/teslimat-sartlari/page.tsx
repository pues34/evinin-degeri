import { Hexagon, Truck } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Teslimat Şartları | Evinin Değeri",
    description: "Sitemizden satın alınan dijital raporların anında teslimat koşulları hakkında bilgilendirme.",
};

export default function TeslimatSartlariPage() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-appleBlue">
                            <Truck size={24} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-appleDark">Teslimat Şartları</h1>
                            <p className="text-gray-500">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
                        </div>
                    </div>

                    <div className="prose prose-apple max-w-none text-gray-600 space-y-6">
                        <p>
                            Evinin Değeri Gayrimenkul Teknolojileri olarak, platformumuz üzerinden sunulan tüm hizmetler
                            <strong> dijital (gayrimaddi) ürünler</strong> kapsamındadır. Bu nedenle fiziki bir kargo
                            gönderimi söz konusu değildir. Satın almış olduğunuz Paketler ve Raporlama hizmetleri için
                            teslimat şartlarımız aşağıdaki gibidir:
                        </p>

                        <h3 className="text-xl font-bold text-appleDark mt-8">1. Anında Teslimat (Dijital Ürün)</h3>
                        <p>
                            Satın alma (ödeme) işleminiz PayTR altyapısı üzerinden başarıyla onaylandığı saniyede,
                            ürün veya hizmetiniz (örn: Premium Abonelik yetkisi veya Dijital PDF Rapor İndirme hakkı)
                            otomatik olarak sistem üzerinden aktive edilir. Teslimat süresi &quot;anında&quot; gerçekleşir.
                        </p>

                        <h3 className="text-xl font-bold text-appleDark mt-8">2. Ürün ve Hizmetlerin Konumu</h3>
                        <p>
                            Ödemeniz sonrasında satın alınan Raporlar veya Premium özellikler, platforma üye olduğunuz / giriş
                            yaptığınız e-posta adresinize bağlı hesaba (&quot;Portföyüm&quot; veya &quot;Kurumsal Panel&quot; sekmesine) yansıtılır.
                            Hizmete dair detayları, faturalarınızı veya geçmiş sorgularınızı kullanıcı paneliniz üzerinden
                            7 gün 24 saat çevrimiçi olarak takip edebilirsiniz. Raporlar isteğe bağlı olarak anında PDF formatında
                            cihazınıza indirilebilir.
                        </p>

                        <h3 className="text-xl font-bold text-appleDark mt-8">3. Teslimatın Gecikmesi ve Teknik Sorunlar</h3>
                        <p>
                            İnternet altyapısından, sunucu erişim problemlerinden veya kullanıcı taraflı bağlantı kesintilerinden
                            dolayı otomatik aktivasyonda anlık gecikmeler yaşanabilmesi çok nadir de olsa mümkündür. Ödeme yaptığınız halde
                            hizmetinizin veya raporunuzun panelinize (10 dakika içerisinde) yansımaması durumunda, lütfen
                            banka dekontu / PayTR işlem numarası ile birlikte <strong>destek@evindegeri.com</strong> adresine e-posta göndererek,
                            iletişim hattımızdan teknik destek talep ediniz. Sorununuz mesai saatleri içerisinde en kısa sürede çözülecektir.
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

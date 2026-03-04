import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <Link href="/" className="inline-flex items-center text-appleBlue hover:underline mb-8 font-medium">
                    <ArrowLeft size={16} className="mr-2" /> Ana Sayfaya Dön
                </Link>

                <h1 className="text-4xl font-bold text-appleDark mb-8">Gizlilik Politikası</h1>

                <div className="prose prose-blue max-w-none text-gray-600 space-y-6">
                    <p>Son Güncelleme Tarihi: {new Date().toLocaleDateString('tr-TR')}</p>

                    <h2 className="text-2xl font-semibold text-appleDark mt-8 mb-4">1. Veri Toplama ve Kullanım</h2>
                    <p>Evinin Değeri platformu, kullanıcı deneyimini artırmak ve gayrimenkul değerleme hizmetini sunabilmek amacıyla, kullanıcıların form aracılığıyla girdiği konum, bina özellikleri ve iletişim bilgilerini geçici veya kalıcı olarak saklayabilir. Bu veriler yalnızca değerleme analizi raporunun oluşturulması ve kullanıcının talebi doğrultusunda iletişime geçilmesi amacıyla kullanılır.</p>

                    <h2 className="text-2xl font-semibold text-appleDark mt-8 mb-4">2. Üçüncü Taraf Paylaşımları</h2>
                    <p>Girilen kişisel veriler (Ad, Soyad, Telefon vb.) kesinlikle üçüncü taraf reklam şirketleriyle paylaşılmaz. Ancak mülk bilgileri (mahalle, m2, yaş vb.) değerleme algoritmasının eğitilmesi için anonimleştirilerek istatistiksel amaçlarla kullanılabilir.</p>

                    <h2 className="text-2xl font-semibold text-appleDark mt-8 mb-4">3. Çerezler (Cookies)</h2>
                    <p>Web sitemiz, oturum yönetimi ve performans analizi için standart çerezleri kullanmaktadır. Tarayıcınız üzerinden çerezleri dilediğiniz zaman sınırlandırabilirsiniz.</p>

                    <h2 className="text-2xl font-semibold text-appleDark mt-8 mb-4">4. İletişim</h2>
                    <p>Gizlilik süreçleriyle alakalı soru ve talepleriniz için platformumuzun iletişim kanallarını kullanabilirsiniz.</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}

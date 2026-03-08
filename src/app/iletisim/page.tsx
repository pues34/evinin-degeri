import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Building2 } from "lucide-react";
import ContactFormClient from "@/components/ContactFormClient";

export const metadata: Metadata = {
    title: "İletişim | Evin Değeri",
    description: "Evin Değeri ekibi ile iletişime geçin. Gayrimenkul değerleme, kurumsal işbirliği veya teknik destek için bize ulaşın.",
};

export default function IletisimPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero */}
            <section className="max-w-5xl mx-auto px-4 pt-20 pb-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-appleBlue/10 text-appleBlue rounded-full text-sm font-medium mb-6">
                    <Mail size={16} />
                    Bize Ulaşın
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-appleDark mb-6 leading-tight">
                    Size Nasıl <span className="text-appleBlue">Yardımcı Olabiliriz?</span>
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Sorularınız, önerileriniz veya işbirliği talepleriniz için bizimle iletişime geçebilirsiniz.
                    En kısa sürede size döneceğiz.
                </p>
            </section>

            {/* Contact Cards */}
            <section className="max-w-5xl mx-auto px-4 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Mail size={24} className="text-appleBlue" />
                        </div>
                        <h3 className="font-semibold text-appleDark text-lg mb-2">Telefon & E-Posta</h3>
                        <p className="text-gray-500 text-sm mb-3">Genel destek ve işbirlikleri</p>
                        <div className="flex flex-col gap-2">
                            <a href="tel:+905337253171" className="text-appleBlue font-medium text-sm hover:underline flex items-center justify-center gap-2">
                                <Phone size={14} /> 0533 725 3171
                            </a>
                            <a href="mailto:destek@evindegeri.com" className="text-appleBlue font-medium text-sm hover:underline">
                                destek@evindegeri.com
                            </a>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Building2 size={24} className="text-emerald-500" />
                        </div>
                        <h3 className="font-semibold text-appleDark text-lg mb-2">Kurumsal İşbirliği</h3>
                        <p className="text-gray-500 text-sm mb-3">B2B ve toplu değerleme</p>
                        <Link href="/b2b" className="text-appleBlue font-medium text-sm hover:underline">
                            B2B Sayfasını Ziyaret Edin
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Clock size={24} className="text-orange-500" />
                        </div>
                        <h3 className="font-semibold text-appleDark text-lg mb-2">Çalışma Saatleri</h3>
                        <p className="text-gray-500 text-sm mb-1">Hafta içi: 09:00 - 18:00</p>
                        <p className="text-gray-500 text-sm">Hafta sonu: 10:00 - 15:00</p>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="max-w-3xl mx-auto px-4 pb-20">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-appleDark mb-6">Mesaj Gönderin</h2>
                    <ContactFormClient />
                </div>
            </section>

            {/* Map / Address */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <MapPin size={20} className="text-appleBlue" />
                        <h2 className="text-2xl font-bold text-appleDark">Genel Merkez</h2>
                    </div>
                    <p className="text-gray-500 font-medium mb-1">Evin Değeri Gayrimenkul Teknolojileri</p>
                    <p className="text-gray-500 mb-6">Muratpaşa Mah. Cemiyet Cad. No:28 Bayrampaşa / İstanbul</p>

                    {/* Google Maps Embed */}
                    <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 max-w-3xl mx-auto">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.4!2d28.9!3d41.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBayrampa%C5%9Fa%2C%20Istanbul!5e0!3m2!1str!2str!4v1700000000000"
                            width="100%"
                            height="350"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Evin Değeri Ofis Konumu"
                        />
                    </div>

                    <p className="text-gray-400 text-sm max-w-lg mx-auto mt-6">
                        Evin Değeri, tamamen dijital bir B2B SaaS platformu olarak hizmet vermektedir.
                        Tüm abonelik ve destek işlemlerinizi online olarak gerçekleştirebilirsiniz.
                    </p>
                </div>
            </section>
        </div>
    );
}

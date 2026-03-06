import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Building2 } from "lucide-react";
import ContactFormClient from "@/components/ContactFormClient";

export const metadata: Metadata = {
    title: "Iletisim | Evinin Degeri",
    description: "Evinin Degeri ekibi ile iletisime gecin. Gayrimenkul degerleme, kurumsal isbirligi veya teknik destek icin bize ulasin.",
};

export default function IletisimPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero */}
            <section className="max-w-5xl mx-auto px-4 pt-20 pb-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-appleBlue/10 text-appleBlue rounded-full text-sm font-medium mb-6">
                    <Mail size={16} />
                    Bize Ulasin
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-appleDark mb-6 leading-tight">
                    Size Nasil <span className="text-appleBlue">Yardimci Olabiliriz?</span>
                </h1>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
                    Sorulariniz, onerileriniz veya isbirligi talepleriniz icin bizimle iletisime gecebilirsiniz.
                    En kisa surede size donecegiz.
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
                            <a href="tel:+905305725377" className="text-appleBlue font-medium text-sm hover:underline flex items-center justify-center gap-2">
                                <Phone size={14} /> 0530 572 53 77
                            </a>
                            <a href="mailto:info@evinindegeri.com" className="text-appleBlue font-medium text-sm hover:underline">
                                info@evinindegeri.com
                            </a>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Building2 size={24} className="text-emerald-500" />
                        </div>
                        <h3 className="font-semibold text-appleDark text-lg mb-2">Kurumsal Isbirligi</h3>
                        <p className="text-gray-500 text-sm mb-3">B2B ve toplu degerleme</p>
                        <Link href="/b2b" className="text-appleBlue font-medium text-sm hover:underline">
                            B2B Sayfasini Ziyaret Edin
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Clock size={24} className="text-orange-500" />
                        </div>
                        <h3 className="font-semibold text-appleDark text-lg mb-2">Calisma Saatleri</h3>
                        <p className="text-gray-500 text-sm mb-1">Hafta ici: 09:00 - 18:00</p>
                        <p className="text-gray-500 text-sm">Hafta sonu: 10:00 - 15:00</p>
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section className="max-w-3xl mx-auto px-4 pb-20">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <h2 className="text-2xl font-bold text-appleDark mb-6">Mesaj Gonderin</h2>
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
                    <p className="text-gray-500 font-medium mb-1">Evinin Değeri Gayrimenkul Teknolojileri</p>
                    <p className="text-gray-500 mb-2">Muratpaşa Mah. Sokullu Sk. No:9 D:4 Bayrampaşa / İstanbul</p>
                    <p className="text-gray-400 text-sm max-w-lg mx-auto mt-4">
                        Evinin Değeri, tamamen dijital bir B2B SaaS platformu olarak hizmet vermektedir.
                        Tüm abonelik ve destek işlemlerinizi online olarak gerçekleştirebilirsiniz.
                    </p>
                </div>
            </section>
        </div>
    );
}

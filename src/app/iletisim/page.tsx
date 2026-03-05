import { Metadata } from "next";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send, Building2 } from "lucide-react";

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
                        <h3 className="font-semibold text-appleDark text-lg mb-2">E-Posta</h3>
                        <p className="text-gray-500 text-sm mb-3">Genel sorular ve destek</p>
                        <a href="mailto:evindestek@gmail.com" className="text-appleBlue font-medium text-sm hover:underline">
                            evindestek@gmail.com
                        </a>
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
                    <form action="/api/contact" method="POST" className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Adiniz Soyadiniz <span className="text-red-500">*</span></label>
                                <input type="text" name="name" required className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all" placeholder="Ornek: Ahmet Yilmaz" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">E-Posta <span className="text-red-500">*</span></label>
                                <input type="email" name="email" required className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all" placeholder="ornek@email.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                            <input type="tel" name="phone" className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all" placeholder="05XX XXX XX XX" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Konu <span className="text-red-500">*</span></label>
                            <select name="subject" required className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all">
                                <option value="">Konu Seciniz</option>
                                <option value="Genel Soru">Genel Soru</option>
                                <option value="Teknik Destek">Teknik Destek</option>
                                <option value="Kurumsal Isbirligi">Kurumsal Isbirligi</option>
                                <option value="Oneri / Sikayet">Oneri / Sikayet</option>
                                <option value="Diger">Diger</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mesajiniz <span className="text-red-500">*</span></label>
                            <textarea name="message" rows={5} required className="w-full p-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all resize-none" placeholder="Mesajinizi buraya yazin..." />
                        </div>
                        <p className="text-xs text-gray-400">
                            * Bilgileriniz KVKK kapsaminda korunmaktadir ve ucuncu taraflarla paylasilmaz.
                        </p>
                        <button type="submit" className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-appleDark text-white rounded-xl font-medium hover:bg-black transition-all shadow-apple">
                            <Send size={18} />
                            Mesaj Gonder
                        </button>
                    </form>
                </div>
            </section>

            {/* Map / Address */}
            <section className="bg-gray-50 py-16">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <MapPin size={20} className="text-appleBlue" />
                        <h2 className="text-2xl font-bold text-appleDark">Konum</h2>
                    </div>
                    <p className="text-gray-500 mb-2">Istanbul, Turkiye</p>
                    <p className="text-gray-400 text-sm">
                        Evinin Degeri, tamamen dijital bir platform olarak hizmet vermektedir.
                        Tum islemlerinizi online olarak gerceklestirebilirsiniz.
                    </p>
                </div>
            </section>
        </div>
    );
}

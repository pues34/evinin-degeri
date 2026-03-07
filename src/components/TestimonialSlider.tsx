"use client";

import { useEffect, useState } from "react";
import { Sparkles, Quote } from "lucide-react";

const testimonials = [
    {
        initials: "AK",
        name: "Ayşe K.",
        role: "Ev Sahibi - Kadıköy",
        text: "Kadıköy'deki evimi satmadan önce fiyatından emin olamıyordum. Evinin Değeri sayesinde piyasa gerçeklerini öğrendim, evimi tam da raporda çıkan fiyata 2 haftada sattım!",
        color: "bg-blue-100 text-blue-700",
        gradient: "from-blue-50 to-white border-blue-100",
    },
    {
        initials: "MT",
        name: "Murat T.",
        role: "Yatırımcı - Beylikdüzü",
        text: "Yatırım yapmak için birçok farklı semtten evleri burada sorguladım. Yapay zekanın sağladığı bölgesel analizler ve ısı haritası gerçekten profesyonelce.",
        color: "bg-gray-200 text-gray-700",
        gradient: "from-gray-50 to-white border-gray-100",
    },
    {
        initials: "BZ",
        name: "Burak Z.",
        role: "Emlak Danışmanı - Şişli",
        text: "B2B modülünü kullanıyorum. Müşterilerime çok hızlı ve veri odaklı sunumlar yapabiliyorum. Kesinlikle her profesyonelin elinin altında olmalı.",
        color: "bg-amber-100 text-amber-700",
        gradient: "from-amber-50 to-white border-amber-100",
    },
    {
        initials: "EE",
        name: "Elif E.",
        role: "Alıcı - Ümraniye",
        text: "Hayalimdeki evi bulduğumda fiyatı bana biraz yüksek gelmişti. Buradan sorgulattığımda gerçekten de şişirilmiş olduğunu anladım, ciddi bir pazarlık avantajı sağladı.",
        color: "bg-purple-100 text-purple-700",
        gradient: "from-purple-50 to-white border-purple-100",
    }
];

export default function TestimonialSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div>
            <h2 className="text-3xl font-semibold text-appleDark mb-8">Kullanıcı Yorumları</h2>

            <div className="relative overflow-hidden h-[240px]">
                {testimonials.map((testimonial, index) => {
                    let translation = "translate-x-full opacity-0";
                    if (index === currentIndex) {
                        translation = "translate-x-0 opacity-100 z-10";
                    } else if (index === (currentIndex - 1 + testimonials.length) % testimonials.length) {
                        translation = "-translate-x-full opacity-0";
                    }

                    return (
                        <div
                            key={index}
                            className={`absolute top-0 left-0 w-full transition-all duration-700 ease-in-out ${translation}`}
                        >
                            <div className={`bg-gradient-to-br p-6 rounded-2xl border shadow-sm relative h-full flex flex-col justify-between ${testimonial.gradient}`}>
                                <div className="text-blue-200 absolute top-4 right-4 opacity-50"><Quote size={32} /></div>
                                <p className="text-gray-600 italic mb-6 leading-relaxed relative z-10 text-lg">&quot;{testimonial.text}&quot;</p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${testimonial.color}`}>
                                        {testimonial.initials}
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-appleDark">{testimonial.name}</h5>
                                        <span className="text-xs font-medium text-gray-500">{testimonial.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentIndex ? 'bg-appleBlue' : 'bg-gray-200 hover:bg-gray-300'}`}
                        aria-label={`Yorum ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}

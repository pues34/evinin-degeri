
export default function SSSLayout({ children }: { children: React.ReactNode }) {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "Evin Değeri nedir ve nasıl çalışır?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evin Değeri, Türkiye'nin önde gelen yapay zeka destekli gayrimenkul değerleme platformudur. Akıllı algoritmalar ile piyasadaki ilanları tarar, bölgesel endekslerle karşılaştırır ve saniyeler içinde tahmini piyasa değerini sunar."
                }
            },
            {
                "@type": "Question",
                "name": "Çıkan değerleme sonuçları ne kadar güvenilir?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Sistemimiz TCMB Bölgesel Endeksleri, Lokal Şerefiye Analizi ve gelişmiş makine öğrenimi modellerinden güç alır. Üretilen rakamlar bilgilendirme amaçlı tahmini piyasa değeridir, SPK onaylı resmi eksper raporu yerine geçmez."
                }
            },
            {
                "@type": "Question",
                "name": "Hangi şehirlerde hizmet veriyorsunuz?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Başta İstanbul olmak üzere Türkiye'nin önde gelen büyükşehirlerindeki tüm ilçeleri desteklemektedir. Hizmet ağımız düzenli olarak genişletilmektedir."
                }
            },
            {
                "@type": "Question",
                "name": "Bu hizmet tamamen ücretsiz mi?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Evet, bireysel kullanıcılar için anlık fiyat hesaplama ve detaylı gayrimenkul analiz raporu hizmetimiz tamamen ücretsizdir."
                }
            },
            {
                "@type": "Question",
                "name": "Ödemeler ve kredi kartı bilgilerim güvende mi?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Bütün veri akışı 256-Bit SSL ile korunmaktadır. Tahsilatlar PayTR güvencesi ile 3D Secure onaylı yapılır. Kredi kartı verileriniz sunucularımızda kesinlikle tutulmaz."
                }
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            {children}
        </>
    );
}

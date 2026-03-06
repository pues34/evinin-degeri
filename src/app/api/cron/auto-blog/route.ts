import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// Vercel CRON: Her gun saat 08:00 UTC'de otomatik calisir
// vercel.json'da tanimlanacak

const BLOG_TOPICS = [
    {
        category: "Piyasa Analizi",
        prompts: [
            "2026 yilinda Turkiye emlak piyasasi: guncel konut fiyat endeksi, bolgesel farkliliklar ve yatirimci icin firsat analizi",
            "Istanbul ilce bazinda konut fiyat haritasi: en cok deger kazanan ve kaybeden bolgeler",
            "Ankara ve Izmir konut piyasasi karsilastirmasi: metrekare fiyatlari, kira getirisi ve gelecek projeksiyonlari",
        ]
    },
    {
        category: "Yatirim Rehberi",
        prompts: [
            "Emlak yatirimi yapmadan once bilmeniz gereken 15 kritik kural: uzman rehberi",
            "Kira getirisi mi, deger artisi mi? Gayrimenkul yatirim stratejileri karsilastirmasi",
            "Ilk evini alacaklar icin kapsamli rehber: butce planlama, kredi, lokasyon secimi",
        ]
    },
    {
        category: "Teknoloji ve Emlak",
        prompts: [
            "Yapay zeka emlak sektorunu nasil donusturuyor: otomatik degerleme, sanal turlar ve akilli analizler",
            "PropTech nedir? Gayrimenkul teknolojisi trendleri ve Turkiye'deki gelismeler",
            "Dijital cagda ev alim-satim sureci: online degerleme araclari ve e-imza ile hizli islemler",
        ]
    },
    {
        category: "Hukuk ve Mevzuat",
        prompts: [
            "2026 yilinda emlak vergisi degisiklikleri: konut sahiplerinin bilmesi gerekenler",
            "Tapu islemleri rehberi: gerekli belgeler, harclari ve dikkat edilmesi gerekenler",
            "Kentsel donusum yasasi: haklariniz, surec ve tazminat hesaplama yontemleri",
        ]
    },
    {
        category: "Mahalle ve Sehir",
        prompts: [
            "Istanbul'da yasanilacak en iyi 10 mahalle: ulasim, egitim, saglik ve fiyat analizi",
            "Turkiye'nin yukselen sehirleri: gayrimenkul yatirimi icin kesfedilmemis firsatlar",
            "Deprem guvenligi acisindan en guvenli bolgeler ve yapi denetim kriterleri",
        ]
    },
];

function generateSlug(title: string) {
    return title.toLowerCase().trim()
        .replace(/[ğ]/g, 'g').replace(/[ü]/g, 'u').replace(/[ş]/g, 's')
        .replace(/[ı]/g, 'i').replace(/[ö]/g, 'o').replace(/[ç]/g, 'c')
        .replace(/[Ğ]/g, 'g').replace(/[Ü]/g, 'u').replace(/[Ş]/g, 's')
        .replace(/[İ]/g, 'i').replace(/[Ö]/g, 'o').replace(/[Ç]/g, 'c')
        .replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')
        + '-' + Date.now().toString(36);
}

export async function GET(req: Request) {
    // Guvenlik: CRON secret veya admin kontrolu
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || '';

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const DAILY_COUNT = 5;

    // Bugun zaten uretilmis mi kontrol et
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await prisma.blogPost.count({
        where: { createdAt: { gte: today } }
    });

    if (todayCount >= DAILY_COUNT) {
        return NextResponse.json({ success: true, message: `Bugun zaten ${todayCount} blog uretilmis`, generated: 0 });
    }

    const remaining = DAILY_COUNT - todayCount;
    const generated: string[] = [];

    for (let i = 0; i < remaining; i++) {
        try {
            // Rastgele kategori ve konu sec
            const catIndex = Math.floor(Math.random() * BLOG_TOPICS.length);
            const cat = BLOG_TOPICS[catIndex];
            const promptIndex = Math.floor(Math.random() * cat.prompts.length);
            const topic = cat.prompts[promptIndex];

            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY || ''}`
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: [
                        {
                            role: "system",
                            content: `Sen Turkiye'nin en deneyimli emlak analisti, SEO uzmani ve icerik yazarisin.

GOREV: Verilen konuda, Google'da ilk sayfaya cikacak kalitede, KAPSAMLI bir emlak blog yazisi uret.

KURALLAR:
- Minimum 2000 kelime
- SEO odakli, anahtar kelime yogunlugu %2-3
- Turkce karakterler kullan (ş, ç, ğ, ü, ö, ı)
- Profesyonel ve guvenir bir ton

ICERIK YAPISI (HTML formatinda):
1. <h2> ile ana basliklar (en az 5-6 baslik)
2. <h3> ile alt basliklar
3. <p> ile paragraflar (her paragraf 3-4 cumle)
4. <table> ile istatistik/karsilastirma tablolari (en az 1 tablo)
5. <ul>/<ol> ile listeler
6. <blockquote> ile uzman gorusleri/onemli notlar
7. <strong> ile vurgular

ZORUNLU BOLUMLER:
- Giris (konu tanitimi, neden onemli)
- Ana icerik (detayli analiz, veriler, istatistikler)
- Istatistik tablosu (bolge/fiyat/karsilastirma)
- Uzman Gorusu bolumu
- Sik Sorulan Sorular (en az 3 soru-cevap, <h3>SSS</h3> basligıyla)
- Sonuc ve CTA (degerleme aracina yonlendirme)

CIKTI FORMATI (STRICT JSON):
{
  "title": "SEO uyumlu, merak uyandiran baslik (50-60 karakter ideal)",
  "summary": "1-2 cumlelik meta description (150 karakter)",
  "content": "Yazinin tamami HTML formatinda (yukaridaki kurallara uygun)",
  "category": "${cat.category}",
  "imageUrl": ""
}`
                        },
                        {
                            role: "user",
                            content: `Konu: ${topic}`
                        }
                    ],
                    temperature: 0.8,
                    max_tokens: 4000,
                    response_format: { type: "json_object" }
                })
            });

            if (!response.ok) continue;

            const data = await response.json();
            const aiOutput = JSON.parse(data.choices[0].message.content || "{}");

            if (!aiOutput.title || !aiOutput.content) continue;

            // Icerige CTA butonu ekle
            const ctaHtml = `
                <div style="margin-top:40px;padding:30px;background:linear-gradient(135deg,#2563eb,#1d4ed8);border-radius:16px;text-align:center;">
                    <h3 style="color:white;font-size:22px;margin-bottom:10px;">Evinizin Gercek Degerini Ogrenmek Ister Misiniz?</h3>
                    <p style="color:#bfdbfe;margin-bottom:20px;">Yapay zeka destekli degereleme aracimiz ile 30 saniyede ucretsiz sonuc alin.</p>
                    <a href="/" style="display:inline-block;background:white;color:#2563eb;padding:14px 32px;border-radius:12px;font-weight:bold;text-decoration:none;font-size:16px;">Hemen Degerleme Yap →</a>
                </div>
            `;

            const finalContent = aiOutput.content + ctaHtml;
            const slug = generateSlug(aiOutput.title);

            const imageUrl = aiOutput.imageUrl || `https://images.unsplash.com/photo-${['1560518883-ce09059eeffa', '1582407947304-fd86f028f716', '1560185127-6a5a5e3c2b43', '1512917774080-9991f1c4c750', '1600596542815-ffad4c1539a6'][i % 5]}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80`;

            await prisma.blogPost.create({
                data: {
                    title: aiOutput.title,
                    slug,
                    summary: aiOutput.summary || "",
                    content: finalContent,
                    imageUrl
                }
            });

            generated.push(aiOutput.title);

            // Rate limit: API'yi yormamak icin 2 saniye bekle
            await new Promise(resolve => setTimeout(resolve, 2000));

        } catch (err) {
            console.error("Auto blog generation error:", err);
        }
    }

    return NextResponse.json({
        success: true,
        message: `${generated.length} blog uretildi`,
        generated,
        totalToday: todayCount + generated.length
    });
}

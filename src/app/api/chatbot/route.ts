import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { message, history } = body;

        if (!message || !process.env.OPENAI_API_KEY) {
            return NextResponse.json({ success: false, error: "Mesaj veya API anahtari eksik" }, { status: 400 });
        }

        const systemPrompt = `Sen "evindegeri.com" platformunun akilli asistanisin. Turkce konusuyorsun.

HAKKIMIZDA:
- evindegeri.com Turkiye'nin yapay zeka destekli ucretsiz emlak degerleme platformu
- 20+ veri noktasi (metrekare, kat, yas, isitma, manzara, lokasyon vb.) ile analiz
- B2B kurumsal uyelik: PRO (500 TL/ay) ve PRO PLUS (750 TL/ay)
- PRO: limitsiz degerleme. PRO PLUS: white-label + lead market
- Sonuc sayfasinda: deger, AI ozeti, kira analizi, mahalle skoru, harita, yakin tesisler

KURALLARIN:
- Kisa ve net cevaplar ver (maks 3-4 cumle)
- Samimi ama profesyonel ol
- Bilmedigin seyleri uydurmak yerine "bunu bilmiyorum ama sitemizden degerleme yapabilirsiniz" de
- Kullaniciyi degerleme formuna yonlendir: "Ana sayfamizdan ucretsiz degerleme yapabilirsiniz"
- Fiyat sorusuna: "Sitemizden ucretsiz degerleme yaparak ogrenebilirsiniz" de
- B2B sorusuna: "b2b sayfamizdan detaylari inceleyebilirsiniz" de`;

        const messages = [
            { role: "system", content: systemPrompt },
            ...(history || []).slice(-6).map((h: any) => ({
                role: h.sender === "user" ? "user" : "assistant",
                content: h.text
            })),
            { role: "user", content: message }
        ];

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages,
                temperature: 0.7,
                max_tokens: 300
            })
        });

        if (!response.ok) {
            throw new Error("OpenAI API error");
        }

        const data = await response.json();
        const reply = data.choices[0].message.content;

        return NextResponse.json({ success: true, reply });
    } catch (error: any) {
        console.error("Chatbot API Error:", error);
        return NextResponse.json({ success: false, reply: "Uzgunum, su an cevaplayamiyorum. Lutfen ana sayfamizdan degerleme yaparak bilgi alin." });
    }
}

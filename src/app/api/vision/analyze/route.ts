import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { images } = await req.json(); // Array of base64 strings

        if (!images || !Array.isArray(images) || images.length === 0) {
            return NextResponse.json({ success: true, multiplier: 1.0, analysis: "Fotoğraf yüklenmedi." });
        }

        if (images.length > 7) {
            return NextResponse.json({ success: false, error: "En fazla 7 fotoğraf yüklenebilir." }, { status: 400 });
        }

        // Format images for OpenAI payload
        const contentPayload: any[] = [
            {
                type: "text",
                text: `Sen profesyonel bir gayrimenkul değerleme uzmanısın. Ekteki fotoğraflar bir evin iç veya dış mekanına ait. 
                Fotoğrafları inceleyerek evin genel durumu, malzeme kalitesi (lüks, standart, masraflı) ve kondisyonu hakkında yorum yap. 
                Özellikle mutfak, banyo ve zemin kaplamalarına dikkat et.
                
                Sonucunda bana evin piyasa değerini etkileyecek bir "multiplier" (çarpan) ver.
                - Eğer ev çok eski, dökük, acil tadilat ihtiyacı varsa: 0.85 ile 0.95 arası
                - Eğer ev standart, yaşanabilir ama özel bir lüksü yoksa: 1.00
                - Eğer ev yeni yapılmış, çok lüks malzemeler kullanılmış, sıfır veya çok şık yenilenmişse: 1.05 ile 1.20 arası
                
                Lütfen dönüşünü SADECE aşağıdaki JSON formatında yap ve başka hiçbir şey yazma:
                {
                    "multiplier": 1.05,
                    "analysis": "Evde birinci sınıf ahşap parke ve özel tasarım ankastre mutfak kullanılmış. Banyo tamamen yenilenmiş ve lüks vitrifiye mevcut. Bu durum evin değerine belirgin bir prim katacaktır."
                }`
            }
        ];

        for (const base64Image of images) {
            // Remove the data:image/png;base64, prefix if present, as OpenAI expects raw base64 or complete data URI
            contentPayload.push({
                type: "image_url",
                image_url: {
                    url: base64Image,
                    detail: "low" // 'low' is cheaper and faster, sufficient for condition assessment
                }
            });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o", // using gpt-4o for optimal vision capabilities
            messages: [
                {
                    role: "system",
                    content: "Sen profesyonel bir gayrimenkul değerleme AI uzmanısın. Yalnızca JSON formatında yanıt vermelisin."
                },
                {
                    role: "user",
                    content: contentPayload
                }
            ],
            response_format: { type: "json_object" },
            max_tokens: 500,
        });

        const resultText = response.choices[0]?.message?.content || "{}";
        const parsedResult = JSON.parse(resultText);

        return NextResponse.json({
            success: true,
            multiplier: parsedResult.multiplier || 1.0,
            analysis: parsedResult.analysis || "Analiz tamamlandı."
        });

    } catch (error: any) {
        console.error("Vision AI Error:", error);
        return NextResponse.json({ success: false, error: "Fotoğraf analizi sırasında bir hata oluştu." }, { status: 500 });
    }
}

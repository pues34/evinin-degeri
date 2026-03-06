import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.isPremium) {
            return NextResponse.json({ error: "Unauthorized or not a Premium User" }, { status: 403 });
        }

        const body = await req.json();
        const { message } = body;

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        // Check if OpenAI key is valid
        if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === "buraya-kendi-openai-api-keyinizi-girin") {
            return NextResponse.json({ reply: "Sistem şu anda test modundadır. Sorunuz kaydedildi: '" + message + "'" });
        }

        // Get basic index data to inject into context (Optional MVP step)
        const recentValuations = await prisma.valuationRequest.findMany({
            take: 50,
            orderBy: { createdAt: 'desc' },
            select: { city: true, district: true, neighborhood: true, estimatedValue: true, grossSqm: true }
        });

        const contextData = recentValuations.map(v => `${v.district}/${v.neighborhood} ortalama değer: ${v.estimatedValue} TL (${v.grossSqm}m2)`).slice(0, 10).join("; ");

        const systemPrompt = `Sen Türkiye gayrimenkul piyasasına hakim, profesyonel bir yapay zeka emlak ve yatırım danışmanısın. Amacın yatırımcılara (Premium kullanıcılara) saniyeler içinde doğru, veri odaklı yatırımsal geri dönüşler (ROI), amortisman hesaplamaları ve bölgesel analizler sunmak. 
        Kısa, net ve profesyonel (Zillow uzmanı veya Bloomberg TV analisti tonunda) cevaplar ver. 
        Güncel sistem verilerinden bazıları (örneklem): ${contextData}
        Uzun destanlardan kaçın, doğrudan istatistiksel ve mantıksal argümanlar sun.`;

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cost effective for chat
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: message }
            ],
            temperature: 0.5,
            max_tokens: 500
        });

        const reply = completion.choices[0]?.message?.content || "Üzgünüm, şu anda yanıt veremiyorum.";

        return NextResponse.json({ reply });

    } catch (error: any) {
        console.error("AI Chat API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

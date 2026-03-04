import { NextResponse } from "next/server";
import OpenAI from "openai";

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

function generateSlug(title: string) {
    return title.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

export async function POST(req: Request) {
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

        const body = await req.json();
        const { topic } = body; // Örn: "İstanbul konut piyasasında son durum 2026"

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `Sen uzman bir emlak analisti, SEO uzmanı ve metin yazarısın. 
                    Verilen konuya uygun olarak, Google'da en üst sıralara çıkacak kalitede, ilgi çekici bir emlak blog yazısı üret. 
                    Çıktı formatın MUST be a STRICT JSON nesnesi olmalı:
                    {
                      "title": "SEO uyumlu çarpıcı bir başlık",
                      "summary": "1-2 cümlelik vurucu bir özet (meta description için)",
                      "content": "Yazının tamamı (HTML formatında, <h2>, <p>, <ul> gibi etiketler kullanarak, şık ve okunaklı)",
                      "imageUrl": "Yazıyla alakalı ücretsiz bir stok fotoğraf URL'si (Unsplash/Pexels gibi bir kaynak placeholder) veya mevcut değilse bos birak"
                    }`
                },
                {
                    role: "user",
                    content: `Konu: ${topic || "Emlak sektöründeki son yapay zeka ve değerleme trendleri"}`
                }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
        });

        const aiOutput = JSON.parse(response.choices[0].message.content || "{}");

        if (!aiOutput.title || !aiOutput.content) {
            throw new Error("Yapay Zeka uygun içerik üretemedi.");
        }

        const slug = generateSlug(aiOutput.title);

        const newPost = await prisma.blogPost.create({
            data: {
                title: aiOutput.title,
                slug: slug,
                summary: aiOutput.summary,
                content: aiOutput.content,
                imageUrl: aiOutput.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
            }
        });

        return NextResponse.json({ success: true, data: newPost });
    } catch (error: any) {
        console.error("AI Blog Generation Error:", error);
        return NextResponse.json({ success: false, error: "AI İçerik üretirken hata oluştu." }, { status: 500 });
    }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        let settings = await prisma.systemSettings.findFirst();

        // Eğer veritabanında henüz bir ayar yoksa varsayılanı oluştur.
        if (!settings) {
            settings = await prisma.systemSettings.create({
                data: {
                    showSocialMedia: true,
                    valuationCounter: 0
                }
            });
        }

        return NextResponse.json({ success: true, data: settings });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Daima var olan tek kaydı güncelle
        const settings = await prisma.systemSettings.findFirst();

        if (!settings) {
            const newSettings = await prisma.systemSettings.create({ data: body });
            return NextResponse.json({ success: true, data: newSettings });
        }

        const updatedSettings = await prisma.systemSettings.update({
            where: { id: settings.id },
            data: {
                instagramUrl: body.instagramUrl,
                twitterUrl: body.twitterUrl,
                linkedinUrl: body.linkedinUrl,
                showSocialMedia: body.showSocialMedia,
                valuationCounter: body.valuationCounter ? parseInt(body.valuationCounter) : 0
            }
        });

        return NextResponse.json({ success: true, data: updatedSettings });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: "Ayarlar güncellenirken bir hata oluştu." }, { status: 500 });
    }
}

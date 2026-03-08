import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import sharp from "sharp";
import crypto from "crypto";
import { getSupabaseAdmin } from "@/lib/supabase";

const BUCKET_NAME = "listing-images";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const files = formData.getAll("images") as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "No images found" }, { status: 400 });
        }

        if (files.length > 10) {
            return NextResponse.json({ error: "Maksimum 10 fotoğraf yükleyebilirsiniz." }, { status: 400 });
        }

        // Ensure bucket exists (idempotent)
        await getSupabaseAdmin().storage.createBucket(BUCKET_NAME, {
            public: true,
            fileSizeLimit: 5 * 1024 * 1024, // 5MB
            allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
        }).catch(() => { /* bucket already exists */ });

        const uploadedUrls: string[] = [];

        // SVG Watermark
        const watermarkSvg = `
            <svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
                <style>
                    .title { fill: rgba(255, 255, 255, 0.35); font-size: 44px; font-weight: bold; font-family: sans-serif; }
                </style>
                <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="title" transform="rotate(-20, 300, 100)">
                    evindegeri.com
                </text>
            </svg>
        `;
        const watermarkBuffer = Buffer.from(watermarkSvg);

        for (const file of files) {
            try {
                const buffer = Buffer.from(await file.arrayBuffer());
                const uniqueFilename = `${crypto.randomUUID()}-${Date.now()}.jpg`;
                const filePath = `listings/${uniqueFilename}`;

                // Process image: resize, add watermark, convert to JPG
                let processedBuffer: Buffer;
                try {
                    processedBuffer = await sharp(buffer)
                        .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
                        .jpeg({ quality: 85 })
                        .composite([{
                            input: watermarkBuffer,
                            gravity: 'center',
                        }])
                        .toBuffer();
                } catch {
                    // If composite fails, save without watermark
                    processedBuffer = await sharp(buffer)
                        .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
                        .jpeg({ quality: 85 })
                        .toBuffer();
                }

                // Upload to Supabase Storage
                const { data, error } = await getSupabaseAdmin().storage
                    .from(BUCKET_NAME)
                    .upload(filePath, processedBuffer, {
                        contentType: 'image/jpeg',
                        upsert: false,
                    });

                if (error) {
                    console.error("Supabase upload error:", error);
                    continue;
                }

                // Get public URL
                const { data: urlData } = getSupabaseAdmin().storage
                    .from(BUCKET_NAME)
                    .getPublicUrl(filePath);

                uploadedUrls.push(urlData.publicUrl);
            } catch (imgErr) {
                console.error("Single image processing error:", imgErr);
            }
        }

        if (uploadedUrls.length === 0) {
            return NextResponse.json({ error: "Hiçbir fotoğraf yüklenemedi. Lütfen desteklenen formatlarda (JPG, PNG) tekrar deneyin." }, { status: 500 });
        }

        return NextResponse.json({ success: true, urls: uploadedUrls });

    } catch (error) {
        console.error("Image upload error:", error);
        return NextResponse.json({ error: "Fotoğraf yükleme sırasında hata oluştu. Lütfen tekrar deneyin." }, { status: 500 });
    }
}

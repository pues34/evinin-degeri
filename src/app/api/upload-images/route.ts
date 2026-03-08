import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

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

        const uploadedUrls: string[] = [];
        const uploadDir = path.join(process.cwd(), "public", "uploads", "listings");

        // Ensure directory exists
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        // SVG Watermark definition
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
                const filePath = path.join(uploadDir, uniqueFilename);

                // Process image: resize, add watermark, convert to JPG
                const image = sharp(buffer)
                    .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
                    .jpeg({ quality: 85 });

                // Try composite with watermark, fall back to no watermark if it fails
                try {
                    await image
                        .composite([{
                            input: watermarkBuffer,
                            gravity: 'center',
                        }])
                        .toFile(filePath);
                } catch {
                    // If composite fails (e.g. on some serverless runtimes), save without watermark
                    await sharp(buffer)
                        .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
                        .jpeg({ quality: 85 })
                        .toFile(filePath);
                }

                uploadedUrls.push(`/uploads/listings/${uniqueFilename}`);
            } catch (imgErr) {
                console.error("Single image processing error:", imgErr);
                // Skip this image but continue with others
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

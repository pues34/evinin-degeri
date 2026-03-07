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
                    .title { fill: rgba(255, 255, 255, 0.4); font-size: 48px; font-weight: bold; font-family: sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
                </style>
                <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" class="title" transform="rotate(-15, 300, 100)">
                    Evinin Degeri
                </text>
            </svg>
        `;
        const watermarkBuffer = Buffer.from(watermarkSvg);

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const uniqueFilename = `${crypto.randomUUID()}-${Date.now()}.jpg`;
            const filePath = path.join(uploadDir, uniqueFilename);

            // Process image: resize to max 1200px width, add watermark, convert to high-quality JPG
            await sharp(buffer)
                .resize(1200, 800, { fit: "inside", withoutEnlargement: true })
                .composite([
                    {
                        input: watermarkBuffer,
                        gravity: 'center',
                        blend: 'overlay'
                    }
                ])
                .jpeg({ quality: 85 })
                .toFile(filePath);

            uploadedUrls.push(`/uploads/listings/${uniqueFilename}`);
        }

        return NextResponse.json({ success: true, urls: uploadedUrls });

    } catch (error) {
        console.error("Image upload error:", error);
        return NextResponse.json({ error: "Failed to upload images" }, { status: 500 });
    }
}

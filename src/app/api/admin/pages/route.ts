import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// Slugify function to generate URL slug from Title
const slugify = (text: string) => text.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');

export async function GET() {
    try {
        const pages = await prisma.page.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json({ success: true, data: pages });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    try {
        const { title, content } = await req.json();
        if (!title || !content) return NextResponse.json({ success: false, error: "Title and content required" }, { status: 400 });

        const slug = slugify(title);

        const existing = await prisma.page.findUnique({ where: { slug } });
        if (existing) return NextResponse.json({ success: false, error: "Bu URL (slug) zaten mevcut. Başka bir başlık deneyin." }, { status: 400 });

        const record = await prisma.page.create({
            data: { title, slug, content }
        });

        return NextResponse.json({ success: true, data: record });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ success: false, error: "ID required" }, { status: 400 });

        await prisma.page.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

import { NextResponse, NextRequest } from "next/server";

import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    try {
        if (id) {
            const blog = await prisma.blogPost.findUnique({ where: { id } });
            return NextResponse.json({ success: true, data: blog });
        }
        const blogs = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });
        return NextResponse.json({ success: true, data: blogs });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Veriler çekilemedi" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { id, title, slug, summary, content, imageUrl } = body;

        let post;
        if (id) {
            post = await prisma.blogPost.update({
                where: { id },
                data: { title, slug, summary, content, imageUrl }
            });
        } else {
            post = await prisma.blogPost.create({
                data: { title, slug, summary, content, imageUrl }
            });
        }

        return NextResponse.json({ success: true, data: post });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ success: false, error: "ID gerekli" }, { status: 400 });

    try {
        await prisma.blogPost.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

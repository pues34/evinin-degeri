export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import prisma from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const messages = await prisma.contactMessage.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ success: true, data: messages });
    } catch (error) {
        console.error("Admin Contact GET error:", error);
        return NextResponse.json({ success: false, error: "Sunucu hatası" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ success: false, error: "Missing ID" }, { status: 400 });

        await prisma.contactMessage.delete({ where: { id } });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Admin Contact DELETE error:", error);
        return NextResponse.json({ success: false, error: "Delete failed" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });

        const body = await req.json();
        const { id, isRead } = body;

        const updated = await prisma.contactMessage.update({
            where: { id },
            data: { isRead }
        });
        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Update failed" }, { status: 500 });
    }
}

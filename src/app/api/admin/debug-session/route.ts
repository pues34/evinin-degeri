import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions) as any;
        return NextResponse.json({
            success: true,
            hasSession: !!session,
            sessionObj: session || "null",
            role: session?.user?.role || "none",
            headers: Object.fromEntries(req.headers.entries())
        });
    } catch (e: any) {
        return NextResponse.json({ success: false, error: e.message });
    }
}

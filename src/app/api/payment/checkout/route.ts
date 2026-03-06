import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Giriş yapmanız gerekmektedir." }, { status: 401 });
        }

        const body = await req.json();
        const { planId } = body;

        // In a real application, you would initialize an Iyzico or Stripe checkout session here
        // and return the payment URL. Since this is an MVP without active credentials:

        // MOCK PAYMENT SUCCESS: We just upgrade the user directly.
        await prisma.user.update({
            where: { id: session.user.id },
            data: { isPremium: true }
        });

        // Normally, you return { checkoutUrl: "https://iyzico.com/pay/..." }
        // For our MVP, we simulate a successful internal upgrade and redirect.

        return NextResponse.json({
            success: true,
            message: "Ödeme başarılı! Premium özelliklere artık erişebilirsiniz.",
            // This redirect happens on the client side
            redirectUrl: "/portfoy?upgrade=success"
        });

    } catch (error: any) {
        console.error("Payment API Error:", error);
        return NextResponse.json({ error: "Ödeme işlemi sırasında bir hata oluştu." }, { status: 500 });
    }
}

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { leadId, amount } = body;

        if (!leadId) {
            return NextResponse.json({ success: false, error: "Lead ID required" }, { status: 400 });
        }

        // [GELECEK GELİŞTİRME]: Burada PayTR veya İyzico'dan dönen token iframe için oluşturulacak.
        // Şimdilik sistem pasif (ücretsiz) modda olduğu için direkt başarılı yanıt dönüyoruz.

        return NextResponse.json({
            success: true,
            status: "passive_success",
            message: "Ödeme altyapısı şu an pasif moddadır. İşlem başarılı varsayıldı.",
            data: {
                token: "dummy_token_v6", // İleride gerçek iyzico/paytr token'ı döner
                url: "/success", // İleride 3D secure yönlendirme linki dönebilir
            }
        });

    } catch (error) {
        console.error("Payment init error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

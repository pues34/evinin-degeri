import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const { email, name, listingTitle, listingNumber } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email gerekli" }, { status: 400 });
        }

        const { Resend } = await import("resend");
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: "Evin Değeri <bildirim@evindegeri.com>",
            to: email,
            subject: `İlanınız Yayınlandı! 🎉 | ${listingNumber}`,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                    <div style="text-align: center; margin-bottom: 32px;">
                        <h1 style="font-size: 28px; color: #1D1D1F; margin-bottom: 8px;">Evin Değeri</h1>
                        <p style="color: #86868B; font-size: 14px;">Gayrimenkul Değerleme Platformu</p>
                    </div>
                    
                    <div style="background: linear-gradient(135deg, #f0fdf4, #ecfdf5); border: 1px solid #bbf7d0; border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 24px;">
                        <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
                        <h2 style="font-size: 22px; color: #1D1D1F; margin-bottom: 8px;">İlanınız Yayına Alındı!</h2>
                        <p style="color: #6B7280; margin-bottom: 16px;">Tebrikler ${name}, ilanınız ekibimiz tarafından onaylandı ve artık yayında.</p>
                        <div style="background: white; border-radius: 12px; padding: 16px; display: inline-block;">
                            <p style="font-size: 12px; color: #9CA3AF; margin: 0 0 4px 0;">İlan Numarası</p>
                            <p style="font-size: 24px; font-weight: bold; color: #2563EB; margin: 0; letter-spacing: 2px;">${listingNumber}</p>
                        </div>
                    </div>
                    
                    <div style="background: #F9FAFB; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                        <p style="font-size: 14px; color: #6B7280; margin: 0;"><strong style="color: #1D1D1F;">İlan:</strong> ${listingTitle}</p>
                    </div>
                    
                    <div style="text-align: center; margin-bottom: 32px;">
                        <a href="https://evindegeri.com/ilanlar" style="display: inline-block; background: #1D1D1F; color: white; font-weight: 600; padding: 14px 28px; border-radius: 12px; text-decoration: none; font-size: 14px;">İlanlarıma Git →</a>
                    </div>
                    
                    <div style="text-align: center; border-top: 1px solid #E5E7EB; padding-top: 24px;">
                        <p style="font-size: 12px; color: #9CA3AF;">© ${new Date().getFullYear()} Evin Değeri. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            `
        });

        return NextResponse.json({ success: true });

    } catch (error: any) {
        console.error("Send listing notification error:", error);
        return NextResponse.json({ error: "Email gönderilemedi" }, { status: 500 });
    }
}

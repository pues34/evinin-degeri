import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProfileClient from "./ProfileClient";

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Profilim | Evin Değeri",
};

export default async function ProfilPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect("/giris?callbackUrl=/profil");
    }

    if ((session.user as any).role === "admin") {
        redirect("/yonetim-gizli-portal");
    }

    const userId = (session.user as any).id;

    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            isPremium: true,
            accountType: true,
            companyName: true,
            premiumEnd: true,
            createdAt: true,
        }
    });

    const listings = await prisma.listing.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        take: 20,
    });

    // Portföy verileri
    const portfolio = await prisma.valuationRequest.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    return <ProfileClient user={user as any} listings={listings as any[]} portfolio={portfolio as any[]} />;
}

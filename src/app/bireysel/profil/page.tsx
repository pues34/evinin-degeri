import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import ProfileClient from "./ProfileClient";

export const metadata: Metadata = {
    title: "Profil Ayarları | Evinin Değeri",
    description: "Kişisel bilgilerinizi ve hesap şifrenizi güncelleyin.",
};

export default async function BireyselProfilPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "user") {
        redirect("/giris?callbackUrl=/bireysel/profil");
    }

    // Get fresh user data from DB
    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        select: {
            name: true,
            email: true,
            phone: true,
            isPremium: true,
        }
    });

    if (!user) {
        redirect("/giris");
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <ProfileClient user={user} />
        </div>
    );
}

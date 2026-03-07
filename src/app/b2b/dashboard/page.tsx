import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import B2BClientInterface from "./B2BClientInterface";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function B2BDashboard() {
    const session = await getServerSession(authOptions) as any;

    if (!session || session.user.role !== "realtor") {
        redirect("/b2b/login");
    }

    // Fetch Full Realtor Data for Settings and Real-Time Premium Auth
    const realtorProfile = await prisma.realtor.findUnique({
        where: { id: session.user.id }
    });

    if (!realtorProfile) {
        redirect("/b2b/login");
    }

    const { id, isPro, subscriptionEnd, subscriptionTier, companyName } = realtorProfile;

    // Check if subscription has expired
    let expired = false;
    if (isPro && subscriptionEnd) {
        if (new Date(subscriptionEnd) < new Date()) {
            expired = true;
        }
    }

    const isActivePro = isPro && !expired;

    // Fetch History
    const recentValuations = await prisma.valuationRequest.findMany({
        where: { realtorId: id },
        orderBy: { createdAt: 'desc' },
        take: 10
    });

    // Fetch Global V19 Lead Market
    const leadMarket = await prisma.valuationRequest.findMany({
        where: { wantsToSell: true },
        include: { contactInfo: true },
        orderBy: { createdAt: 'desc' },
        take: 50 // Sadece son 50 sıcak müşteriyi göster
    });

    return (
        <div className="min-h-screen bg-appleGray pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <B2BClientInterface
                    user={realtorProfile}
                    valuations={recentValuations}
                    leads={leadMarket}
                    isActivePro={isActivePro}
                />
            </div>
        </div>
    );
}

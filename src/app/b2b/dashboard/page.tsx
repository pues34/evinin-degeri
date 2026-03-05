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

    const { id, isPro, name, subscriptionEnd } = session.user;

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

    return (
        <div className="min-h-screen bg-appleGray pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <B2BClientInterface
                    user={{ name: name, email: session.user.email || "", subscriptionEnd: subscriptionEnd }}
                    valuations={recentValuations}
                    isActivePro={isActivePro}
                />
            </div>
        </div>
    );
}

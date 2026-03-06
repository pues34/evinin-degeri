import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: string;
            isPro?: boolean;
            subscriptionTier?: string;
            customLogoUrl?: string | null;
            subscriptionEnd?: Date | null;
            isPremium?: boolean;
        } & DefaultSession["user"];
    }

    interface User {
        role: string;
        isPro?: boolean;
        subscriptionTier?: string;
        customLogoUrl?: string | null;
        subscriptionEnd?: Date | null;
        isPremium?: boolean;
    }
}

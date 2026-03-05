import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials", // Keep exact ID for older admin compatibility
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "admin@evinin-degeri.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const admin = await prisma.admin.findUnique({
                    where: { email: credentials.email }
                });
                if (!admin) return null;

                const isValid = await bcrypt.compare(credentials.password, admin.password);
                if (isValid) return { id: admin.id, name: admin.name, email: admin.email, role: "admin" } as any;

                return null;
            }
        }),
        CredentialsProvider({
            id: "realtor-login",
            name: "Kurumsal Giriş",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "ornek@emlak.com" },
                password: { label: "Şifre", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const realtor = await prisma.realtor.findUnique({
                    where: { email: credentials.email }
                });
                if (!realtor) return null;

                const isValid = await bcrypt.compare(credentials.password, realtor.password);
                if (isValid) {
                    return {
                        id: realtor.id,
                        name: realtor.companyName,
                        email: realtor.email,
                        role: "realtor",
                        isPro: realtor.isPro,
                        subscriptionTier: realtor.subscriptionTier,
                        customLogoUrl: realtor.customLogoUrl,
                        subscriptionEnd: realtor.subscriptionEnd
                    } as any;
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: '/b2b/login',
    },
    callbacks: {
        async jwt({ token, user, trigger, session }: any) {
            if (user) {
                token.role = user.role;
                token.isPro = user.isPro;
                token.subscriptionTier = user.subscriptionTier;
                token.customLogoUrl = user.customLogoUrl;
                token.subscriptionEnd = user.subscriptionEnd;
            }
            if (trigger === "update" && session) {
                if (session.isPro !== undefined) token.isPro = session.isPro;
                if (session.subscriptionTier !== undefined) token.subscriptionTier = session.subscriptionTier;
                if (session.customLogoUrl !== undefined) token.customLogoUrl = session.customLogoUrl;
                if (session.subscriptionEnd !== undefined) token.subscriptionEnd = session.subscriptionEnd;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session?.user) {
                (session.user as any).role = token.role;
                (session.user as any).isPro = token.isPro;
                (session.user as any).subscriptionTier = token.subscriptionTier;
                (session.user as any).customLogoUrl = token.customLogoUrl;
                (session.user as any).subscriptionEnd = token.subscriptionEnd;
                (session.user as any).id = token.sub;
            }
            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_dev_only",
};

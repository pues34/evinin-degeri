import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Admin Login",
            credentials: {
                email: { label: "Email", type: "email" },
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
            id: "user-login",
            name: "Kullanıcı Girişi",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Şifre", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("E-posta veya şifre eksik.");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    throw new Error("Kullanıcı bulunamadı.");
                }

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) {
                    throw new Error("Şifre hatalı.");
                }

                return {
                    id: user.id,
                    name: user.name || (user as any).companyName || "Kullanıcı",
                    email: user.email,
                    role: "user",
                    isPremium: user.isPremium,
                    accountType: (user as any).accountType || "bireysel",
                } as any;
            }
        })
    ],
    pages: {
        signIn: '/giris',
    },
    callbacks: {
        async jwt({ token, user, trigger, session }: any) {
            if (user) {
                token.role = user.role;
                token.isPremium = user.isPremium;
                token.accountType = user.accountType;
            }
            if (trigger === "update" && session) {
                if (session.isPremium !== undefined) token.isPremium = session.isPremium;
                if (session.accountType !== undefined) token.accountType = session.accountType;
            }
            return token;
        },
        async session({ session, token }: any) {
            if (session?.user) {
                (session.user as any).role = token.role;
                (session.user as any).isPremium = token.isPremium;
                (session.user as any).accountType = token.accountType;
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

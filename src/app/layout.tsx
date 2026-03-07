import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.evinindegeri.com"),
  title: {
    default: "Evinin Değeri | Yapay Zeka ile Anında Gayrimenkul Değerleme",
    template: "%s | Evinin Değeri"
  },
  description: "Türkiye'nin en gelişmiş yapay zeka algoritması ile evinizin, arsanızın veya iş yerinizin gerçek piyasa değerini anında ve ücretsiz öğrenin.",
  keywords: ["ev değerleme", "gayrimenkul değerleme", "evimin değeri ne kadar", "yapay zeka emlak", "konut fiyat hesaplama", "istanbul ev fiyatları"],
  authors: [{ name: "Evinin Değeri Ekibi" }],
  creator: "Evinin Değeri",
  publisher: "Evinin Değeri",
  alternates: {
    canonical: '/',
  },
  verification: {
    google: "nStTq0K4fFrHajhxUHq8UA1-Ybdzggg9X7JXYOddvQY",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.evinindegeri.com",
    title: "Evinin Değeri | Yapay Zeka ile Anında Gayrimenkul Değerleme",
    description: "Türkiye'nin en gelişmiş yapay zeka algoritması ile evinizin gerçek piyasa değerini anında öğrenin.",
    siteName: "Evinin Değeri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evinin Değeri | Yapay Zeka ile Anında Gayrimenkul Değerleme",
    description: "Türkiye'nin en gelişmiş yapay zeka algoritması ile evinizin gerçek piyasa değerini anında öğrenin.",
  }
};

import SmartChatbot from "@/components/SmartChatbot";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientFooterWrapper from "@/components/ClientFooterWrapper";
import CookieConsent from "@/components/CookieConsent";

import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Evinin Değeri",
    "image": "https://www.evinindegeri.com/logo.png",
    "url": "https://www.evinindegeri.com",
    "description": "Türkiye'nin en gelişmiş yapay zeka algoritması ile evinizin, arsanızın veya iş yerinizin gerçek piyasa değerini anında ve ücretsiz öğrenin.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Istanbul",
      "addressCountry": "TR"
    },
    "priceRange": "$$"
  };

  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <Header />
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
          <ClientFooterWrapper>
            <Footer />
          </ClientFooterWrapper>
          <SmartChatbot />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
}

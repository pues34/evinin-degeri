import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.evindegeri.com"),
  title: {
    default: "Evin Değeri Ne Kadar? Yapay Zeka ile Konut Fiyat Hesaplama",
    template: "%s | Evin Değeri - Konut Fiyat Hesaplama"
  },
  description: "Türkiye'nin en gelişmiş yapay zeka emlak değerleme algoritması ile evinizin, arsanızın veya iş yerinizin gerçek piyasa değerini anında ve ücretsiz hesaplayın.",
  keywords: ["ev değerleme", "gayrimenkul değerleme", "evimin değeri ne kadar", "yapay zeka emlak", "konut fiyat hesaplama", "istanbul ev fiyatları", "kira hesaplama", "araba takas"],
  authors: [{ name: "Evin Değeri Ekibi" }],
  creator: "Evin Değeri",
  publisher: "Evin Değeri",
  alternates: {
    canonical: '/',
  },
  verification: {
    google: "nStTq0K4fFrHajhxUHq8UA1-Ybdzggg9X7JXYOddvQY",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.evindegeri.com",
    title: "Evin Değeri Ne Kadar? Yapay Zeka ile Konut Fiyat Hesaplama",
    description: "Türkiye'nin en gelişmiş yapay zeka algoritması ile evinizin gerçek piyasa değerini anında hesaplayın.",
    siteName: "Evin Değeri",
    images: [
      {
        url: 'https://www.evindegeri.com/logo.png',
        width: 800,
        height: 600,
        alt: 'Evin Değeri Logo',
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Evin Değeri Ne Kadar? Yapay Zeka ile Konut Fiyat Hesaplama",
    description: "Türkiye'nin en gelişmiş yapay zeka algoritması ile evinizin gerçek piyasa değerini anında hesaplayın.",
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
    "name": "Evin Değeri",
    "image": "https://www.evindegeri.com/logo.png",
    "url": "https://www.evindegeri.com",
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
      <body className={inter.className} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
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

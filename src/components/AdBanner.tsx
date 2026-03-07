"use client";

import React, { useEffect } from "react";
import Image from "next/image";

interface AdBannerProps {
    adsenseId?: string | null;
    sponsorUrl?: string | null;
    sponsorLink?: string | null;
    className?: string;
}

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

export default function AdBanner({ adsenseId, sponsorUrl, sponsorLink, className = "" }: AdBannerProps) {
    useEffect(() => {
        if (adsenseId && adsenseId.trim() !== "") {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error("AdSense Error: ", err);
            }
        }
    }, [adsenseId]);

    // Priority: Sponsor Ad over AdSense
    if (sponsorUrl && sponsorUrl.trim() !== "") {
        return (
            <div className={`w-full overflow-hidden rounded-2xl shadow-sm relative group border border-gray-100 bg-white ${className}`}>
                <a href={sponsorLink || "#"} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative h-[100px]">
                    <Image
                        src={sponsorUrl}
                        alt="Sponsor Reklamı"
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                        Sponsorlu
                    </div>
                </a>
            </div>
        );
    }

    if (adsenseId && adsenseId.trim() !== "") {
        return (
            <div className={`w-full overflow-hidden flex justify-center items-center bg-gray-50 rounded-2xl border border-gray-100 min-h-[100px] ${className}`}>
                <ins className="adsbygoogle w-full"
                    style={{ display: "block" }}
                    data-ad-client={adsenseId.trim()}
                    data-ad-slot="auto"
                    data-ad-format="auto"
                    data-full-width-responsive="true"></ins>
            </div>
        );
    }

    // No Ad configured
    return null;
}

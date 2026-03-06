"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function UpgradeButton() {
    const [isUpgrading, setIsUpgrading] = useState(false);

    const handleUpgrade = async () => {
        setIsUpgrading(true);
        try {
            const res = await fetch("/api/payment/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planId: "premium_b2c" })
            });
            const data = await res.json();
            if (data.success) {
                window.location.href = data.redirectUrl || "/portfoy?success=true";
            } else {
                alert(data.error || "Bir hata oluştu");
                setIsUpgrading(false);
            }
        } catch (err) {
            console.error(err);
            setIsUpgrading(false);
        }
    };

    return (
        <button
            onClick={handleUpgrade}
            disabled={isUpgrading}
            className="mt-4 inline-block text-xs font-bold text-indigo-600 bg-white px-4 py-2 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
        >
            {isUpgrading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {isUpgrading ? "İşleniyor..." : "Premium'a Geç"}
        </button>
    );
}

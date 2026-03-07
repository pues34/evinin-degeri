"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export default function AnimatedCounter({ value }: { value: number }) {
    const [displayValue, setDisplayValue] = useState(value); // Start at value for SSR/SEO

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            ease: "easeOut",
            onUpdate(cur) {
                setDisplayValue(Math.round(cur));
            },
        });
        return controls.stop;
    }, [value]);

    return <span>{displayValue.toLocaleString('tr-TR')}</span>;
}

"use client";

import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function ValuationChart({ currentValue }: { currentValue: number }) {
    const data = useMemo(() => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        // Simulating the past 3 years and future 2 years trends based on standard inflation indices
        return [
            { year: (currentYear - 3).toString(), value: currentValue * 0.45 },
            { year: (currentYear - 2).toString(), value: currentValue * 0.60 },
            { year: (currentYear - 1).toString(), value: currentValue * 0.82 },
            { year: "Şu An", value: currentValue },
            { year: (currentYear + 1).toString(), value: currentValue * 1.35 },
            { year: (currentYear + 2).toString(), value: currentValue * 1.68 }
        ];
    }, [currentValue]);

    const formatYAxis = (tickItem: number) => {
        if (tickItem === 0) return '0';
        return (tickItem / 1000000).toFixed(1) + 'M';
    };

    return (
        <div className="w-full h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0071E3" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#0071E3" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                    <XAxis
                        dataKey="year"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#86868B', fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        tickFormatter={formatYAxis}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#86868B', fontSize: 12 }}
                    />
                    <Tooltip
                        formatter={(value: number | undefined) => value ? new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(value) : ""}
                        labelStyle={{ color: '#1D1D1F', fontWeight: 'bold' }}
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#0071E3"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        activeDot={{ r: 6, strokeWidth: 0, fill: '#0071E3' }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}

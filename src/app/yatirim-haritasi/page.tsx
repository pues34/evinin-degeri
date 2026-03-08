import type { Metadata } from 'next';
import HeatmapClient from './HeatmapClient';

export const metadata: Metadata = {
    title: "İstanbul Yatırım Isı Haritası | Evin Değeri",
    description: "İstanbul ilçe ilçe konut metrekare satış fiyatlarının makine öğrenimi tabanlı canlı bölgesel analizi.",
};

export default function HeatmapPage() {
    return <HeatmapClient />;
}

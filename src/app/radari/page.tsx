import FirsatRadariClient from "./FirsatRadariClient";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Fırsat Radarı | Evin Değeri",
    description: "Piyasa değerinin altında satılan kelepir gayrimenkulleri ve acil satılık fırsatları yapay zeka ile anında keşfedin.",
};

export default function FirsatRadariPage() {
    return <FirsatRadariClient />;
}

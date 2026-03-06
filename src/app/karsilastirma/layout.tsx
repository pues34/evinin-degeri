import Footer from "@/components/Footer";

export default function KarsilastirmaLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}

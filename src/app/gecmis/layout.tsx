import Footer from "@/components/Footer";

export default function GecmisLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}

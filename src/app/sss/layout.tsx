import Footer from "@/components/Footer";

export default function SSSLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <Footer />
        </>
    );
}

import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function DynamicCMSPage({ params }: { params: { slug: string } }) {
    const page = await (prisma as any).page.findUnique({
        where: { slug: params.slug }
    });

    if (!page) {
        return notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <div className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <Link href="/" className="inline-flex items-center text-appleBlue hover:underline mb-8 font-medium">
                    <ArrowLeft size={16} className="mr-2" /> Ana Sayfaya Dön
                </Link>

                <h1 className="text-4xl font-bold text-appleDark mb-8">{page.title}</h1>

                <div
                    className="prose prose-blue max-w-none text-gray-600 space-y-6"
                    dangerouslySetInnerHTML={{ __html: page.content }}
                />
            </div>
            <Footer />
        </div>
    );
}

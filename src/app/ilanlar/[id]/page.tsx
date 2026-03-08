import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Home, Calendar, Ruler, Building2, Phone, Mail, Tag } from "lucide-react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const listing = await prisma.listing.findUnique({ where: { id: params.id } });
    if (!listing) return { title: "İlan Bulunamadı" };
    return {
        title: `${listing.title} | Evin Değeri İlanlar`,
        description: `${listing.city} ${listing.district} - ${listing.title}`,
    };
}

export default async function ListingDetailPage({ params }: { params: { id: string } }) {
    const listing = await prisma.listing.findUnique({
        where: { id: params.id },
        include: { user: { select: { name: true, email: true, phone: true } } },
    });

    if (!listing || listing.status !== "APPROVED") {
        notFound();
    }

    const images: string[] = (listing.images as string[]) || [];

    return (
        <div className="min-h-screen bg-appleGray pb-24">
            {/* Image Gallery */}
            <div className="relative w-full bg-black">
                {images.length > 0 ? (
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-1">
                        <div className="relative aspect-[4/3]">
                            <Image src={images[0]} alt={listing.title} fill className="object-cover" unoptimized />
                        </div>
                        {images.length > 1 && (
                            <div className="hidden md:grid grid-cols-2 gap-1">
                                {images.slice(1, 5).map((img, i) => (
                                    <div key={i} className="relative aspect-[4/3]">
                                        <Image src={img} alt={`${listing.title} ${i + 2}`} fill className="object-cover" unoptimized />
                                        {i === 3 && images.length > 5 && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-2xl font-bold">
                                                +{images.length - 5} Fotoğraf
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto h-64 flex items-center justify-center text-gray-500">
                        <Home size={48} className="text-gray-300" />
                    </div>
                )}
            </div>

            <div className="max-w-6xl mx-auto px-4 -mt-4 relative z-10">
                <Link href="/ilanlar" className="inline-flex items-center text-sm text-gray-600 hover:text-appleBlue transition-colors mb-4 bg-white px-3 py-1.5 rounded-full shadow-sm border border-gray-100">
                    <ArrowLeft size={14} className="mr-1" /> İlanlara Dön
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-appleDark mb-2">{listing.title}</h1>
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <MapPin size={16} className="text-appleBlue" />
                                        <span>{listing.city} / {listing.district}</span>
                                        {listing.neighborhood && <span>/ {listing.neighborhood}</span>}
                                    </div>
                                </div>
                                {listing.listingNumber && (
                                    <span className="text-xs px-2 py-1 bg-blue-50 text-appleBlue rounded-lg font-mono shrink-0">
                                        #{listing.listingNumber}
                                    </span>
                                )}
                            </div>

                            {/* Price */}
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
                                <p className="text-sm text-blue-600 font-medium mb-1">İstenen Fiyat</p>
                                <p className="text-3xl md:text-4xl font-extrabold text-appleDark">
                                    {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(listing.askingPrice)}
                                </p>
                                {listing.estimatedValue && listing.estimatedValue > 0 && (
                                    <p className="text-sm text-gray-500 mt-2">
                                        AI Değerleme: {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(listing.estimatedValue)}
                                    </p>
                                )}
                            </div>

                            {/* Property Details Grid */}
                            <h3 className="text-lg font-bold text-appleDark mb-4">Mülk Detayları</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                                {listing.rooms && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <Home size={18} className="text-gray-400" />
                                        <div><p className="text-xs text-gray-400">Oda</p><p className="text-sm font-bold text-appleDark">{listing.rooms}</p></div>
                                    </div>
                                )}
                                {listing.grossSqm && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <Ruler size={18} className="text-gray-400" />
                                        <div><p className="text-xs text-gray-400">Brüt m²</p><p className="text-sm font-bold text-appleDark">{listing.grossSqm} m²</p></div>
                                    </div>
                                )}
                                {listing.netSqm && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <Ruler size={18} className="text-gray-400" />
                                        <div><p className="text-xs text-gray-400">Net m²</p><p className="text-sm font-bold text-appleDark">{listing.netSqm} m²</p></div>
                                    </div>
                                )}
                                {listing.buildingAge && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <Building2 size={18} className="text-gray-400" />
                                        <div><p className="text-xs text-gray-400">Bina Yaşı</p><p className="text-sm font-bold text-appleDark">{listing.buildingAge}</p></div>
                                    </div>
                                )}
                                {listing.floor && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <Building2 size={18} className="text-gray-400" />
                                        <div><p className="text-xs text-gray-400">Kat</p><p className="text-sm font-bold text-appleDark">{listing.floor}. Kat</p></div>
                                    </div>
                                )}
                                {listing.heatingType && (
                                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                        <Tag size={18} className="text-gray-400" />
                                        <div><p className="text-xs text-gray-400">Isıtma</p><p className="text-sm font-bold text-appleDark">{listing.heatingType}</p></div>
                                    </div>
                                )}
                            </div>

                            {/* Description */}
                            {listing.description && (
                                <div>
                                    <h3 className="text-lg font-bold text-appleDark mb-3">Açıklama</h3>
                                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{listing.description}</p>
                                </div>
                            )}
                        </div>

                        {/* All Images */}
                        {images.length > 1 && (
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h3 className="text-lg font-bold text-appleDark mb-4">Tüm Fotoğraflar ({images.length})</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {images.map((img, i) => (
                                        <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                                            <Image src={img} alt={`${listing.title} ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" unoptimized />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Contact Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-20">
                            <h3 className="text-lg font-bold text-appleDark mb-4">İletişim</h3>
                            {listing.user?.name && (
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-appleBlue/10 flex items-center justify-center text-appleBlue font-bold">
                                        {listing.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-appleDark">{listing.user.name}</p>
                                        <p className="text-xs text-gray-400">İlan Sahibi</p>
                                    </div>
                                </div>
                            )}
                            {listing.phone && (
                                <a href={`tel:${listing.phone}`} className="flex items-center gap-3 w-full p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium hover:bg-green-100 transition-colors mb-3">
                                    <Phone size={16} /> {listing.phone}
                                </a>
                            )}
                            {listing.user?.email && (
                                <a href={`mailto:${listing.user.email}`} className="flex items-center gap-3 w-full p-3 bg-blue-50 text-appleBlue rounded-xl text-sm font-medium hover:bg-blue-100 transition-colors mb-3">
                                    <Mail size={16} /> {listing.user.email}
                                </a>
                            )}
                            <p className="text-xs text-gray-400 mt-4 flex items-center gap-1">
                                <Calendar size={12} /> Yayınlanma: {new Date(listing.createdAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })}
                            </p>
                        </div>

                        {/* CTA */}
                        <div className="bg-gradient-to-br from-appleBlue to-indigo-600 rounded-3xl p-6 text-white text-center">
                            <h3 className="text-lg font-bold mb-2">Evinizin değerini öğrenin</h3>
                            <p className="text-blue-100 text-sm mb-4">AI destekli değerleme ile evinizin gerçek piyasa değerini öğrenin.</p>
                            <Link href="/" className="inline-block px-6 py-3 bg-white text-appleBlue rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                                Ücretsiz Değerleme
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

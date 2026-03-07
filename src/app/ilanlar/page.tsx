import Link from "next/link";
import Image from "next/image";
import { MapPin, Maximize, Bed, Map, ShieldCheck, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function PublicListingsPage() {
    // Fetch approved listings from our API (Server Side Fetch)
    let listings = [];
    try {
        const HOST = process.env.NEXTAUTH_URL || "http://localhost:3000";
        const res = await fetch(`${HOST}/api/listings?mode=public`, { cache: 'no-store' });
        if (res.ok) {
            listings = await res.json();
        }
    } catch (e) {
        console.error("Failed to fetch public listings", e);
    }

    return (
        <div className="bg-gray-50 min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-16 relative">
                    <div className="absolute top-0 right-1/4 w-64 h-64 bg-appleBlue rounded-full blur-[100px] opacity-20 pointer-events-none" />
                    <h1 className="text-4xl md:text-5xl font-extrabold text-appleDark mb-4 tracking-tight">Onaylı Özel İlanlar</h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                        &quot;Evinin Değeri&quot; tarafından sistem değeri hesaplanmış ve onaylanmış, yatırım fırsatı sunan güvenilir gayrimenkulleri keşfedin.
                    </p>
                </div>

                {listings.length === 0 ? (
                    <div className="text-center bg-white p-12 rounded-[24px] shadow-sm border border-gray-100">
                        <Map className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <h2 className="text-2xl font-bold text-appleDark mb-2">Henüz İlan Bulunmuyor</h2>
                        <p className="text-gray-500 mb-6">Şu anda yayında olan onaylı bir ilan bulunmamaktadır. Sisteme değerleme yapıp kendi ilanınızı hemen verebilirsiniz.</p>
                        <Link href="/">
                            <button className="px-6 py-3 bg-appleBlue text-white rounded-xl font-bold hover:bg-blue-600 transition shadow-md">
                                Ücretsiz Değerleme Yap & İlan Ver
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((listing: any) => (
                            <div key={listing.id} className="bg-white rounded-[24px] overflow-hidden shadow-apple hover:shadow-apple-hover transition-all duration-300 border border-gray-100 group flex flex-col cursor-pointer pointer-events-none">
                                {/* Clickable wrapper could be done by Link wrapping everything, but we'll use a specific button for details later or just show info here */}
                                <div className="relative h-64 w-full bg-gray-100 overflow-hidden pointer-events-auto">
                                    {listing.images && listing.images.length > 0 ? (
                                        <Image
                                            src={listing.images[0]}
                                            alt={listing.title}
                                            layout="fill"
                                            objectFit="cover"
                                            unoptimized
                                            className="group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            Fotoğraf Yok
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-appleDark flex items-center gap-1 shadow-sm">
                                        <ShieldCheck size={14} className="text-green-500" />
                                        Ekspertiz Onaylı
                                    </div>
                                    {listing.discountRate > 0 && (
                                        <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                                            %{Math.round(listing.discountRate)} Avantajlı
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col pointer-events-auto">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-appleDark line-clamp-2 leading-tight group-hover:text-appleBlue transition-colors">{listing.title}</h3>
                                    </div>
                                    <p className="text-3xl font-extrabold text-appleBlue mb-1">
                                        {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(listing.askingPrice)}
                                    </p>
                                    <p className="text-xs text-green-600 font-medium mb-4">Sistem Değeri: {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(listing.estimatedValue)}</p>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 border-b border-gray-100 pb-4">
                                        <span className="flex items-center gap-1"><Maximize size={16} className="text-gray-400" /> {listing.grossSqm} m²</span>
                                        <span className="flex items-center gap-1"><Bed size={16} className="text-gray-400" /> {listing.rooms}</span>
                                        <span className="flex items-center gap-1 truncate"><MapPin size={16} className="text-gray-400" /> {listing.district}</span>
                                    </div>

                                    <div className="mt-auto flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            {listing.ownerType === "REALTOR" && listing.realtor?.customLogoUrl ? (
                                                <div className="w-8 h-8 relative rounded-full overflow-hidden border border-gray-200">
                                                    <Image src={listing.realtor.customLogoUrl} alt="Emlakçı" layout="fill" objectFit="cover" unoptimized />
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-appleBlue text-white flex items-center justify-center font-bold text-xs">
                                                    {listing.ownerType === "USER" ? listing.user?.name?.charAt(0) : "K"}
                                                </div>
                                            )}
                                            <span className="text-xs font-medium text-gray-700">
                                                {listing.ownerType === "USER" ? listing.user?.name : listing.realtor?.companyName}
                                            </span>
                                        </div>
                                        {/* A placeholder detail view or lead CTA */}
                                        <span className="text-appleBlue bg-blue-50 p-2 rounded-full hover:bg-blue-100 transition">
                                            <ChevronRight size={18} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

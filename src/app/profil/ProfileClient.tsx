"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { User, Mail, Phone, Building2, Crown, Calendar, LogOut, Plus, Eye, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface ProfileUser {
    id: string;
    name: string | null;
    email: string;
    phone: string | null;
    isPremium: boolean;
    accountType: string;
    companyName: string | null;
    premiumEnd: string | null;
    createdAt: string;
}

interface ListingItem {
    id: string;
    title: string;
    city: string;
    district: string;
    askingPrice: number;
    status: string;
    listingNumber: string | null;
    createdAt: string;
}

export default function ProfileClient({ user, listings }: { user: ProfileUser; listings: ListingItem[] }) {
    const statusBadge = (status: string) => {
        switch (status) {
            case 'APPROVED': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle size={12} /> Yayında</span>;
            case 'REJECTED': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle size={12} /> Reddedildi</span>;
            default: return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><AlertCircle size={12} /> Bekliyor</span>;
        }
    };

    return (
        <div className="min-h-screen bg-appleGray py-24 px-4">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Profile Card */}
                <div className="bg-white rounded-3xl shadow-apple border border-gray-100 p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-appleBlue to-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                {user.name?.charAt(0)?.toUpperCase() || "K"}
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-appleDark">{user.name || "Kullanıcı"}</h1>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${user.accountType === 'sirket' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {user.accountType === 'sirket' ? 'Şirket Hesabı' : 'Bireysel Hesap'}
                                    </span>
                                    {user.isPremium && (
                                        <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 flex items-center gap-1">
                                            <Crown size={10} /> Premium
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-red-50 hover:text-red-600 transition-colors">
                            <LogOut size={16} /> Çıkış Yap
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                            <Mail size={18} className="text-gray-400" />
                            <div>
                                <p className="text-xs text-gray-400">E-posta</p>
                                <p className="text-sm font-medium text-appleDark">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                            <Phone size={18} className="text-gray-400" />
                            <div>
                                <p className="text-xs text-gray-400">Telefon</p>
                                <p className="text-sm font-medium text-appleDark">{user.phone || "Belirtilmemiş"}</p>
                            </div>
                        </div>
                        {user.accountType === "sirket" && user.companyName && (
                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <Building2 size={18} className="text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-400">Şirket Adı</p>
                                    <p className="text-sm font-medium text-appleDark">{user.companyName}</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                            <Calendar size={18} className="text-gray-400" />
                            <div>
                                <p className="text-xs text-gray-400">Üyelik Tarihi</p>
                                <p className="text-sm font-medium text-appleDark">{new Date(user.createdAt).toLocaleDateString('tr-TR')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Premium Upgrade CTA */}
                    {!user.isPremium && (
                        <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Crown size={24} className="text-appleBlue" />
                                <div>
                                    <p className="font-bold text-appleDark">Premium&apos;a Geçin</p>
                                    <p className="text-sm text-gray-500">Sınırsız sorgulama, PDF rapor, Fırsat Radarı ve daha fazlası.</p>
                                </div>
                            </div>
                            <Link href="/fiyatlandirma" className="shrink-0 px-6 py-2.5 bg-appleBlue text-white rounded-xl text-sm font-bold hover:bg-blue-600 transition-colors">
                                İncele →
                            </Link>
                        </div>
                    )}
                </div>

                {/* My Listings */}
                <div className="bg-white rounded-3xl shadow-apple border border-gray-100 p-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-appleDark">İlanlarım</h2>
                        <Link href="/ilan-ver" className="flex items-center gap-2 px-4 py-2 bg-appleBlue text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors">
                            <Plus size={16} /> Yeni İlan
                        </Link>
                    </div>

                    {listings.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Eye size={24} className="text-gray-300" />
                            </div>
                            <p className="text-gray-400 font-medium">Henüz ilan vermediniz.</p>
                            <Link href="/ilan-ver" className="text-appleBlue text-sm font-medium mt-2 inline-block hover:underline">
                                İlk ilanınızı verin →
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {listings.map((listing) => (
                                <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm font-bold text-appleDark truncate">{listing.title}</h3>
                                            {listing.listingNumber && (
                                                <span className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-appleBlue rounded font-mono">{listing.listingNumber}</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {listing.city} / {listing.district} · {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(listing.askingPrice)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {statusBadge(listing.status)}
                                        <span className="text-xs text-gray-400 hidden sm:block">
                                            {new Date(listing.createdAt).toLocaleDateString('tr-TR')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

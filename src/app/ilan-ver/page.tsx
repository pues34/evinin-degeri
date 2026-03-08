"use client";

import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Upload, X, Shield, CheckCircle2, AlertCircle, Home, MapPin, DollarSign, Camera, Flame, Building, Loader2 } from "lucide-react";
import { TurkeyLocations } from "@/data/locations";

const ROOM_OPTIONS = ["1+0", "1+1", "2+1", "2+2", "3+1", "3+2", "4+1", "4+2", "5+1", "5+2", "6+"];
const BUILDING_AGE_OPTIONS = [
    { label: "0 (Sıfır Bina)", value: "0" },
    { label: "1-5 Yıl", value: "3" },
    { label: "6-10 Yıl", value: "8" },
    { label: "11-15 Yıl", value: "13" },
    { label: "16-20 Yıl", value: "18" },
    { label: "21-25 Yıl", value: "23" },
    { label: "26-30 Yıl", value: "28" },
    { label: "30+ Yıl", value: "35" },
];
const FLOOR_OPTIONS = ["Bodrum", "Zemin", ...Array.from({ length: 30 }, (_, i) => String(i + 1)), "Çatı Katı"];
const HEATING_OPTIONS = ["Doğalgaz (Kombi)", "Merkezi Sistem", "Soba", "Yerden Isıtma", "Klima", "Yok"];
const PROPERTY_TYPE_OPTIONS = ["Apartman Dairesi", "Müstakil Ev", "Villa", "Residence", "Dublex", "Penthouse"];

function IlanVerForm() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successData, setSuccessData] = useState<{ listingNumber: string } | null>(null);

    // Location state
    const [selectedCityId, setSelectedCityId] = useState("");
    const [selectedDistrictId, setSelectedDistrictId] = useState("");
    const [selectedNeighborhoodId, setSelectedNeighborhoodId] = useState("");

    const selectedCity = TurkeyLocations.find(c => c.id === selectedCityId);
    const selectedDistrict = selectedCity?.districts.find(d => d.id === selectedDistrictId);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        askingPrice: "",
        phone: "",
        rooms: "",
        netSqm: "",
        grossSqm: "",
        buildingAge: "",
        floor: "",
        heatingType: "",
        propertyType: "",
        estimatedValue: ""
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/giris?callbackUrl=/ilan-ver");
        }

        const sysVal = searchParams.get('estimatedValue');
        if (sysVal) {
            // Auto-fill from URL params
            const cityParam = searchParams.get('city') || "";
            const districtParam = searchParams.get('district') || "";
            const neighborhoodParam = searchParams.get('neighborhood') || "";

            // Try to find matching IDs
            const city = TurkeyLocations.find(c => c.name.toLowerCase() === cityParam.toLowerCase());
            if (city) {
                setSelectedCityId(city.id);
                const dist = city.districts.find(d => d.name.toLowerCase() === districtParam.toLowerCase());
                if (dist) {
                    setSelectedDistrictId(dist.id);
                    const neigh = dist.neighborhoods.find(n => n.name.toLowerCase() === neighborhoodParam.toLowerCase());
                    if (neigh) setSelectedNeighborhoodId(neigh.id);
                }
            }

            setFormData(prev => ({
                ...prev,
                rooms: searchParams.get('rooms') || "",
                netSqm: searchParams.get('netSqm') || "",
                grossSqm: searchParams.get('grossSqm') || "",
                buildingAge: searchParams.get('buildingAge') || "",
                floor: searchParams.get('floor') || "",
                estimatedValue: sysVal,
                askingPrice: sysVal
            }));
        }
    }, [status, router, searchParams]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);

        if (images.length + selectedFiles.length > 10) {
            setError("Maksimum 10 fotoğraf yükleyebilirsiniz.");
            return;
        }

        setError(null);
        setImages(prev => [...prev, ...selectedFiles]);
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => {
            URL.revokeObjectURL(prev[index]);
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Validations
        if (images.length === 0) {
            setError("Lütfen en az 1 fotoğraf yükleyin.");
            return;
        }
        if (!selectedCityId || !selectedDistrictId || !selectedNeighborhoodId) {
            setError("Lütfen il, ilçe ve mahalle seçin.");
            return;
        }
        if (!formData.rooms) {
            setError("Lütfen oda sayısı seçin.");
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Upload Images
            setIsUploading(true);
            const imageFormData = new FormData();
            images.forEach(img => imageFormData.append("images", img));

            const imgRes = await fetch("/api/upload-images", {
                method: "POST",
                body: imageFormData
            });
            const imgData = await imgRes.json();

            if (!imgRes.ok) throw new Error(imgData.error || "Fotoğraf yükleme başarısız");

            const uploadedUrls = imgData.urls;
            setIsUploading(false);

            // Resolve names from IDs
            const cityName = selectedCity?.name || "";
            const districtName = selectedDistrict?.name || "";
            const neighborhoodName = selectedDistrict?.neighborhoods.find(n => n.id === selectedNeighborhoodId)?.name || "";

            // 2. Submit Listing
            const submitData = {
                ...formData,
                city: cityName,
                district: districtName,
                neighborhood: neighborhoodName,
                netSqm: parseInt(formData.netSqm) || 0,
                grossSqm: parseInt(formData.grossSqm) || 0,
                buildingAge: parseInt(formData.buildingAge) || 0,
                askingPrice: parseFloat(formData.askingPrice) || 0,
                estimatedValue: formData.estimatedValue ? parseFloat(formData.estimatedValue) : undefined,
                images: uploadedUrls
            };

            const listRes = await fetch("/api/listings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(submitData)
            });
            const listData = await listRes.json();

            if (!listRes.ok) throw new Error(listData.error || "İlan oluşturulamadı.");

            setSuccessData({ listingNumber: listData.listingNumber || "ED-2026-00001" });

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
            setIsUploading(false);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin w-12 h-12 border-4 border-appleBlue border-t-transparent rounded-full mx-auto" />
            </div>
        );
    }

    // Success Screen
    if (successData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
                <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-green-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-appleDark mb-3">İlanınız Başarıyla Alındı!</h2>
                    <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-100">
                        <p className="text-xs text-gray-400 mb-1">İlan Numaranız</p>
                        <p className="text-2xl font-extrabold text-appleBlue tracking-wider">{successData.listingNumber}</p>
                    </div>
                    <p className="text-gray-500 leading-relaxed mb-4">
                        İlanınız ekibimiz tarafından incelenecek ve uygun bulunması halinde yayına alınacaktır.
                    </p>
                    <p className="text-gray-500 leading-relaxed mb-8">
                        Onaylandığında <strong className="text-appleDark">e-posta adresinize</strong> bildirim gönderilecektir.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            onClick={() => {
                                const path = "/profil";
                                router.push(path);
                            }}
                            className="flex-1 bg-appleDark text-white py-3 rounded-xl font-medium hover:bg-black transition-colors"
                        >
                            İlanlarıma Git
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className="flex-1 bg-gray-100 text-appleDark py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                        >
                            Ana Sayfaya Dön
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-appleGray py-24 px-4">
            <div className="max-w-4xl mx-auto">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-appleDark mb-4">Ücretsiz İlan Ver</h1>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Evinizi &quot;Evin Değeri&quot; güvencesiyle on binlerce yatırımcı ve kurumsal müşteriye doğrudan ulaştırın. Yılda <strong className="text-appleDark">3 adet ücretsiz</strong> ilan yayınlama hakkınız bulunmaktadır.
                    </p>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
                        <AlertCircle size={24} className="shrink-0" />
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-apple border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* 1. Photos */}
                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-appleDark"><Camera className="text-appleBlue" /> Fotoğraflar</h3>
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-100 transition relative">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                                <p className="text-sm text-gray-500 mb-1">Tıklayın veya fotoğrafları sürükleyin</p>
                                <p className="text-xs text-appleLightGray">Maks. 10 fotoğraf (JPG, PNG). Tüm fotoğraflara otomatik güvenlik filigranı eklenir.</p>
                            </div>

                            {previewUrls.length > 0 && (
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6">
                                    {previewUrls.map((url, index) => (
                                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden shadow-sm group border border-gray-100">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={url} alt={`Fotoğraf ${index + 1}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                            >
                                                <X size={14} />
                                            </button>
                                            {index === 0 && (
                                                <span className="absolute bottom-2 left-2 bg-appleBlue text-white text-[10px] font-bold px-2 py-0.5 rounded-md">Kapak</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <hr className="border-gray-100" />

                        {/* 2. Title & Description */}
                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-appleDark"><Home className="text-appleBlue" /> İlan Detayları</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">İlan Başlığı *</label>
                                    <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none" placeholder="Örn: Kadıköy Moda'da Deniz Manzaralı 3+1 Daire" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama *</label>
                                    <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none" placeholder="Dairenin detaylı açıklamasını yazın..." />
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 3. Price & Contact */}
                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-appleDark"><DollarSign className="text-green-500" /> Fiyat ve İletişim</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">İstenilen Fiyat (₺) *</label>
                                    <input required type="number" name="askingPrice" value={formData.askingPrice} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none font-bold text-appleDark" placeholder="5500000" />
                                    {formData.estimatedValue && (
                                        <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium"><Shield size={12} /> Sistem Değeri: {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(parseFloat(formData.estimatedValue))}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">İletişim Numarası *</label>
                                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none" placeholder="0555 123 45 67" />
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 4. Location - Cascading Dropdowns */}
                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-appleDark"><MapPin className="text-indigo-500" /> Konum Bilgileri</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">İl *</label>
                                    <select
                                        required
                                        value={selectedCityId}
                                        onChange={(e) => {
                                            setSelectedCityId(e.target.value);
                                            setSelectedDistrictId("");
                                            setSelectedNeighborhoodId("");
                                        }}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none appearance-none"
                                    >
                                        <option value="">İl Seçin</option>
                                        {TurkeyLocations.map(city => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">İlçe *</label>
                                    <select
                                        required
                                        value={selectedDistrictId}
                                        onChange={(e) => {
                                            setSelectedDistrictId(e.target.value);
                                            setSelectedNeighborhoodId("");
                                        }}
                                        disabled={!selectedCityId}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none appearance-none disabled:opacity-50"
                                    >
                                        <option value="">{selectedCityId ? "İlçe Seçin" : "Önce il seçin"}</option>
                                        {selectedCity?.districts.map(district => (
                                            <option key={district.id} value={district.id}>{district.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Mahalle *</label>
                                    <select
                                        required
                                        value={selectedNeighborhoodId}
                                        onChange={(e) => setSelectedNeighborhoodId(e.target.value)}
                                        disabled={!selectedDistrictId}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none appearance-none disabled:opacity-50"
                                    >
                                        <option value="">{selectedDistrictId ? "Mahalle Seçin" : "Önce ilçe seçin"}</option>
                                        {selectedDistrict?.neighborhoods.map(neigh => (
                                            <option key={neigh.id} value={neigh.id}>{neigh.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 5. Property Details - All Dropdowns */}
                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-appleDark"><Building className="text-purple-500" /> Daire Özellikleri</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Oda Sayısı *</label>
                                    <select required name="rooms" value={formData.rooms} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none appearance-none">
                                        <option value="">Seçin</option>
                                        {ROOM_OPTIONS.map(r => <option key={r} value={r}>{r}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bina Yaşı *</label>
                                    <select required name="buildingAge" value={formData.buildingAge} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none appearance-none">
                                        <option value="">Seçin</option>
                                        {BUILDING_AGE_OPTIONS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Bulunduğu Kat *</label>
                                    <select required name="floor" value={formData.floor} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none appearance-none">
                                        <option value="">Seçin</option>
                                        {FLOOR_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Net m² *</label>
                                    <input required type="number" name="netSqm" value={formData.netSqm} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none" placeholder="95" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Brüt m² *</label>
                                    <input required type="number" name="grossSqm" value={formData.grossSqm} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none" placeholder="120" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Yapı Tipi</label>
                                    <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none appearance-none">
                                        <option value="">Seçin</option>
                                        {PROPERTY_TYPE_OPTIONS.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* 6. Heating */}
                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-appleDark"><Flame className="text-orange-500" /> Isıtma</h3>
                            <div className="max-w-sm">
                                <select name="heatingType" value={formData.heatingType} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none appearance-none">
                                    <option value="">Isıtma Tipi Seçin</option>
                                    {HEATING_OPTIONS.map(h => <option key={h} value={h}>{h}</option>)}
                                </select>
                            </div>
                        </section>

                        {/* Submit Button */}
                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-appleDark text-white py-4 rounded-xl font-bold text-lg hover:bg-appleBlue shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        {isUploading ? "Fotoğraflar Yükleniyor..." : "Hazırlanıyor..."}
                                    </>
                                ) : "İlanı Yayınla"}
                            </button>
                            <p className="text-xs text-center text-gray-400 mt-4">İlanınız kalite standartlarımızı korumak adına ekibimiz tarafından incelendikten sonra yayına alınacaktır.</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default function IlanVerPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-gray-50 text-center pt-32">Yükleniyor...</div>}>
            <IlanVerForm />
        </Suspense>
    );
}

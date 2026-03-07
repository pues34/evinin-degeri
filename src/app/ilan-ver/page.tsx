"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Upload, X, Shield, CheckCircle2, AlertCircle, Home, MapPin, DollarSign, Camera } from "lucide-react";

function IlanVerForm() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [images, setImages] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        askingPrice: "",
        phone: "",
        city: "",
        district: "",
        neighborhood: "",
        rooms: "",
        netSqm: "",
        grossSqm: "",
        buildingAge: "",
        floor: "",
        estimatedValue: ""
    });

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/giris?callbackUrl=/ilan-ver");
        }

        // Auto-fill from URL params (redirected from ResultDashboard)
        const sysVal = searchParams.get('estimatedValue');
        if (sysVal) {
            setFormData(prev => ({
                ...prev,
                city: searchParams.get('city') || "",
                district: searchParams.get('district') || "",
                neighborhood: searchParams.get('neighborhood') || "",
                rooms: searchParams.get('rooms') || "",
                netSqm: searchParams.get('netSqm') || "",
                grossSqm: searchParams.get('grossSqm') || "",
                buildingAge: searchParams.get('buildingAge') || "",
                floor: searchParams.get('floor') || "",
                estimatedValue: sysVal,
                askingPrice: sysVal // Pre-fill asking price with estimated value initially
            }));
        }
    }, [status, router, searchParams]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const selectedFiles = Array.from(e.target.files);

        if (images.length + selectedFiles.length > 5) {
            setError("Maksimum 5 fotoğraf yükleyebilirsiniz.");
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (images.length === 0) {
            setError("Lütfen en az 1 fotoğraf yükleyin.");
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

            // 2. Submit Listing
            const submitData = {
                ...formData,
                netSqm: parseInt(formData.netSqm),
                grossSqm: parseInt(formData.grossSqm),
                buildingAge: parseInt(formData.buildingAge),
                askingPrice: parseFloat(formData.askingPrice),
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

            setSuccess(true);
            setTimeout(() => {
                const targetPath = session?.user?.role === "realtor" ? "/b2b/dashboard" : "/bireysel/profil";
                router.push(targetPath);
            }, 3000);

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
            setIsUploading(false);
        }
    };

    if (status === "loading" || success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    {success ? (
                        <>
                            <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-appleDark">İlanınız Başarıyla Gönderildi!</h2>
                            <p className="text-gray-500 mt-2">Yönetici onayından sonra yayına alınacaktır. Yönlendiriliyorsunuz...</p>
                        </>
                    ) : (
                        <div className="animate-spin w-12 h-12 border-4 border-appleBlue border-t-transparent rounded-full mx-auto" />
                    )}
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
                        Evinizi &quot;Evinin Değeri&quot; güvencesiyle on binlerce yatırımcı ve kurumsal müşteriye doğrudan ulaştırın. Yılda <strong className="text-appleDark">3 adet ücretsiz</strong> ilan yayınlama hakkınız bulunmaktadır.
                    </p>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-3">
                        <AlertCircle size={24} />
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                <div className="bg-white rounded-3xl shadow-apple border border-gray-100 p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Images Section */}
                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-appleDark"><Camera className="text-appleBlue" /> Fotoğraflar</h3>
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-gray-100 transition relative">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                                <p className="text-sm text-gray-500 mb-1">Tıklayın veya fotoğrafları sürükleyin</p>
                                <p className="text-xs text-appleLightGray">Maksimum 5 fotoğraf. Tüm fotoğraflarınıza otomatik güvenlik filigranı (hologram) eklenecektir.</p>
                            </div>

                            {previewUrls.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                                    {previewUrls.map((url, index) => (
                                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden shadow-sm group">
                                            <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        <hr className="border-gray-100" />

                        {/* Title & Description */}
                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-appleDark"><Home className="text-appleBlue" /> İlan Detayları</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">İlan Başlığı</label>
                                    <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none" placeholder="Örn: Kadıköy Moda Sahilinde Kaçırılmayacak Kapanmaz Manzaralı 3+1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Açıklama</label>
                                    <textarea required name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none" placeholder="Dairenin içi yeni yapıldı. Güney cephe, gün boyu güneş alıyor..." />
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Price & Contact */}
                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-appleDark"><DollarSign className="text-green-500" /> Fiyat ve İletişim</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">İstenilen Fiyat (₺)</label>
                                    <input required type="number" name="askingPrice" value={formData.askingPrice} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none font-bold text-appleDark" placeholder="5500000" />
                                    {formData.estimatedValue && (
                                        <p className="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium"><Shield size={12} /> Sistem Değeri: {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(parseFloat(formData.estimatedValue))}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">İletişim Numarası</label>
                                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-appleBlue outline-none" placeholder="0555 123 45 67" />
                                </div>
                            </div>
                        </section>

                        <hr className="border-gray-100" />

                        {/* Details (Pre-filled if params exist) */}
                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-appleDark"><MapPin className="text-indigo-500" /> Konum ve Özellikler</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <div><label className="text-xs text-gray-500 font-bold uppercase">İl</label><input required name="city" value={formData.city} onChange={handleChange} className="w-full bg-gray-50 border-b border-gray-200 py-2 outline-none font-medium" /></div>
                                <div><label className="text-xs text-gray-500 font-bold uppercase">İlçe</label><input required name="district" value={formData.district} onChange={handleChange} className="w-full bg-gray-50 border-b border-gray-200 py-2 outline-none font-medium" /></div>
                                <div><label className="text-xs text-gray-500 font-bold uppercase">Mahalle</label><input required name="neighborhood" value={formData.neighborhood} onChange={handleChange} className="w-full bg-gray-50 border-b border-gray-200 py-2 outline-none font-medium" /></div>
                                <div><label className="text-xs text-gray-500 font-bold uppercase">Oda Sayısı</label><input required name="rooms" value={formData.rooms} onChange={handleChange} className="w-full bg-gray-50 border-b border-gray-200 py-2 outline-none font-medium" placeholder="3+1" /></div>
                                <div><label className="text-xs text-gray-500 font-bold uppercase">Bina Yaşı</label><input required type="number" name="buildingAge" value={formData.buildingAge} onChange={handleChange} className="w-full bg-gray-50 border-b border-gray-200 py-2 outline-none font-medium" /></div>
                                <div><label className="text-xs text-gray-500 font-bold uppercase">Bulunduğu Kat</label><input required name="floor" value={formData.floor} onChange={handleChange} className="w-full bg-gray-50 border-b border-gray-200 py-2 outline-none font-medium" /></div>
                                <div><label className="text-xs text-gray-500 font-bold uppercase">Net m²</label><input required type="number" name="netSqm" value={formData.netSqm} onChange={handleChange} className="w-full bg-gray-50 border-b border-gray-200 py-2 outline-none font-medium" /></div>
                                <div><label className="text-xs text-gray-500 font-bold uppercase">Brüt m²</label><input required type="number" name="grossSqm" value={formData.grossSqm} onChange={handleChange} className="w-full bg-gray-50 border-b border-gray-200 py-2 outline-none font-medium" /></div>
                            </div>
                        </section>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-appleDark text-white py-4 rounded-xl font-bold text-lg hover:bg-appleBlue shadow-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                                        {isUploading ? "Fotoğraflar Yükleniyor (& Hologram Ekleniyor)..." : "İlan Onaya Gönderiliyor..."}
                                    </>
                                ) : "İlanı Onaya Gönder"}
                            </button>
                            <p className="text-xs text-center text-gray-400 mt-4">İlanınız kalite standartlarımızı korumak adına yöneticilerimiz tarafından incelendikten sonra yayına alınacaktır.</p>
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

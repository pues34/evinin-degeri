"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, MapPin, Building, Home, CheckCircle2, Calculator } from "lucide-react";
import LeadModal from "./LeadModal";

import { City, District, Neighborhood } from "../data/locations";

const steps = [
    { id: 1, title: "Konum", icon: MapPin },
    { id: 2, title: "Bina", icon: Building },
    { id: 3, title: "İç Mekan", icon: Home },
    { id: 4, title: "Ekstralar", icon: CheckCircle2 },
];

export default function ValuationForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dynamic location states
    const [locationsMap, setLocationsMap] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);

    const [formData, setFormData] = useState({
        city: "", district: "", neighborhood: "",
        buildingAge: "", totalFloors: "", floor: "Ara Kat",
        rooms: "2+1", netSqm: "", grossSqm: "", kitchenType: "Kapalı", bathrooms: "1", hasBalcony: "Var",
        parking: "Açık", facade: "Güney", hasElevator: "Var",
        isWithinSite: false, buildingCondition: "Standart"
    });

    useEffect(() => {
        fetch('/api/locations')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    setLocationsMap(data.data);
                }
            })
            .catch(err => console.error("Error loading locations", err));
    }, []);

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const cityId = e.target.value;
        const city = locationsMap.find(c => c.id === cityId) || null;
        setSelectedCity(city);
        setSelectedDistrict(null);
        setFormData({ ...formData, city: city?.name || "", district: "", neighborhood: "" });
    };

    const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const districtId = e.target.value;
        if (selectedCity) {
            const district = selectedCity.districts.find(d => d.id === districtId) || null;
            setSelectedDistrict(district);
            setFormData({ ...formData, district: district?.name || "", neighborhood: "" });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => {
        // Prevent progressing if location is not fully selected
        if (currentStep === 1 && (!formData.city || !formData.district || !formData.neighborhood)) {
            alert("Lütfen il, ilçe ve mahalle seçimini tamamlayın.");
            return;
        }
        if (currentStep < 4) {
            setCurrentStep(prev => prev + 1);
        }
    };
    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = () => {
        setIsModalOpen(true);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-1">İl <span className="text-red-500">*</span></label>
                            <select name="city" value={selectedCity?.id || ""} onChange={handleCityChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all">
                                <option value="">İl Seçiniz</option>
                                {locationsMap.map(city => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-1">İlçe <span className="text-red-500">*</span></label>
                            <select name="district" value={selectedDistrict?.id || ""} onChange={handleDistrictChange} disabled={!selectedCity} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all disabled:opacity-50">
                                <option value="">İlçe Seçiniz</option>
                                {selectedCity?.districts.map(district => (
                                    <option key={district.id} value={district.id}>{district.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-1">Mahalle <span className="text-red-500">*</span></label>
                            <select name="neighborhood" value={formData.neighborhood} onChange={handleChange} disabled={!selectedDistrict} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all disabled:opacity-50">
                                <option value="">Mahalle Seçiniz</option>
                                {selectedDistrict?.neighborhoods.map(neighborhood => (
                                    <option key={neighborhood.id} value={neighborhood.name}>{neighborhood.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-1">Bina Yaşı <span className="text-red-500">*</span></label>
                            <input type="number" name="buildingAge" value={formData.buildingAge} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue transition-all" placeholder="Örn: 5" />
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-appleDark mb-1">Toplam Kat <span className="text-red-500">*</span></label>
                                <input type="number" name="totalFloors" value={formData.totalFloors} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue" placeholder="Örn: 10" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-appleDark mb-1">Bulunduğu Kat <span className="text-red-500">*</span></label>
                                <select name="floor" value={formData.floor || "Ara Kat"} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue">
                                    <option value="Bodrum Kat">Bodrum Kat</option>
                                    <option value="Yarı Bodrum / Kot 1">Yarı Bodrum / Kot 1</option>
                                    <option value="Zemin / Giriş Kat">Zemin / Giriş Kat</option>
                                    <option value="Ara Kat">Ara Kat</option>
                                    <option value="En Üst Kat">En Üst Kat</option>
                                    <option value="Çatı Katı / Dubleks">Çatı Katı / Dubleks</option>
                                    <option value="Müstakil / Villa">Müstakil / Villa</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-1">Oda Sayısı <span className="text-red-500">*</span></label>
                            <select name="rooms" value={formData.rooms} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue">
                                {["1+0", "1+1", "2+1", "3+1", "4+1", "5+1"].map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-appleDark mb-1">Brüt m² <span className="text-red-500">*</span></label>
                                <input type="number" name="grossSqm" value={formData.grossSqm} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue" placeholder="100" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-appleDark mb-1">Net m² <span className="text-red-500">*</span></label>
                                <input type="number" name="netSqm" value={formData.netSqm} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue" placeholder="85" />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-appleDark mb-1">Banyo Sayısı <span className="text-red-500">*</span></label>
                                <input type="number" name="bathrooms" value={formData.bathrooms} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue" />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-appleDark mb-1">Balkon <span className="text-red-500">*</span></label>
                                <select name="hasBalcony" value={formData.hasBalcony} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue">
                                    <option value="Var">Var</option>
                                    <option value="Yok">Yok</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-appleDark mb-1">Mutfak <span className="text-red-500">*</span></label>
                                <select name="kitchenType" value={formData.kitchenType} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue">
                                    <option value="Kapalı">Kapalı</option>
                                    <option value="Açık">Açık</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-1">Otopark <span className="text-red-500">*</span></label>
                            <select name="parking" value={formData.parking} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue">
                                <option value="Yok">Yok</option>
                                <option value="Açık">Açık</option>
                                <option value="Kapalı">Kapalı</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-1">Cephe <span className="text-red-500">*</span></label>
                            <select name="facade" value={formData.facade} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue">
                                <option value="Güney">Güney</option>
                                <option value="Kuzey">Kuzey</option>
                                <option value="Doğu">Doğu</option>
                                <option value="Batı">Batı</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-1">Asansör <span className="text-red-500">*</span></label>
                            <select name="hasElevator" value={formData.hasElevator} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue">
                                <option value="Var">Var</option>
                                <option value="Yok">Yok</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-1">Site İçi / Güvenlikli <span className="text-red-500">*</span></label>
                            <select name="isWithinSite" value={formData.isWithinSite ? "Var" : "Yok"} onChange={(e) => setFormData({ ...formData, isWithinSite: e.target.value === "Var" })} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue">
                                <option value="Yok">Yok</option>
                                <option value="Var">Var (Güvenlikli Site)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-appleDark mb-1">Yapı Durumu <span className="text-red-500">*</span></label>
                            <select name="buildingCondition" value={formData.buildingCondition} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-appleBlue">
                                <option value="Masraflı">Masraflı (Tadilat Gerektirir)</option>
                                <option value="Standart">Standart (Oturulabilir İlk Hali)</option>
                                <option value="Yenilenmiş">Lüks Yenilenmiş (A&apos;dan Z&apos;ye)</option>
                            </select>
                        </div>
                    </div>
                );
        }
    };

    return (
        <>
            <div className="glass-card p-6 md:p-8 hover-3d transition-all duration-300">

                {/* Step Indicator */}
                <div className="flex items-center justify-between mb-8 overflow-x-auto no-scrollbar pb-2">
                    {steps.map((step) => (
                        <div key={step.id} className={`flex flex-col items-center min-w-[60px] cursor-pointer transition-colors ${currentStep >= step.id ? 'text-appleBlue' : 'text-gray-400'}`} onClick={() => setCurrentStep(step.id)}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors ${currentStep >= step.id ? 'bg-appleBlue/10' : 'bg-gray-100'}`}>
                                <step.icon size={20} />
                            </div>
                            <span className="text-xs font-medium">{step.title}</span>
                        </div>
                    ))}
                </div>

                {/* Form Content */}
                <div className="min-h-[250px] relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h2 className="text-xl font-semibold mb-6 text-appleDark">{steps[currentStep - 1].title} Bilgileri</h2>
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                    <button
                        onClick={prevStep}
                        className={`flex items-center px-4 py-2 rounded-xl text-sm font-medium transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Geri
                    </button>

                    {currentStep < 4 ? (
                        <button
                            onClick={nextStep}
                            className="flex items-center px-6 py-2 bg-appleDark text-white rounded-xl text-sm font-medium hover:bg-black transition-all shadow-apple transform hover:-translate-y-0.5"
                        >
                            İleri
                            <ArrowRight size={16} className="ml-2" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="flex items-center px-6 py-2 bg-appleBlue text-white rounded-xl text-sm font-medium hover:bg-blue-600 transition-all shadow-apple transform hover:-translate-y-0.5"
                        >
                            Değeri Hesapla
                            <Calculator size={16} className="ml-2" />
                        </button>
                    )}
                </div>
            </div>

            <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} formData={formData} />
        </>
    );
}

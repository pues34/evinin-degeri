"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";

// Fix Leaflet's default icon issue in Next.js
const customIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function MapComponent({ lat, lng }: { lat: number; lng: number }) {
    const [mounted, setMounted] = useState(false);
    const [hospital, setHospital] = useState<{ lat: number, lng: number, name: string } | null>(null);
    const [metro, setMetro] = useState<{ lat: number, lng: number, name: string } | null>(null);

    useEffect(() => {
        setMounted(true);

        const fetchPOIs = async () => {
            try {
                // Fetch nearest hospital or clinic (Devlet Hastanesi, Tıp Merkezi etc.)
                const hospRes = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];(node["amenity"~"hospital|clinic"](around:5000,${lat},${lng});way["amenity"~"hospital|clinic"](around:5000,${lat},${lng});node["healthcare"~"hospital|clinic|centre"](around:5000,${lat},${lng});way["healthcare"~"hospital|clinic|centre"](around:5000,${lat},${lng}););out center 1;`);
                const hospData = await hospRes.json();
                if (hospData.elements && hospData.elements.length > 0) {
                    const e = hospData.elements[0];
                    const hLat = e.lat || e.center?.lat;
                    const hLon = e.lon || e.center?.lon;
                    if (hLat && hLon) {
                        setHospital({ lat: hLat, lng: hLon, name: e.tags?.name || "Hastane" });
                    }
                }

                // Fetch nearest station/metro/tram
                const metroRes = await fetch(`https://overpass-api.de/api/interpreter?data=[out:json];(node["railway"="station"](around:5000,${lat},${lng});node["station"="subway"](around:5000,${lat},${lng});node["railway"="tram_stop"](around:5000,${lat},${lng});way["railway"="station"](around:5000,${lat},${lng}););out center 1;`);
                const metroData = await metroRes.json();
                if (metroData.elements && metroData.elements.length > 0) {
                    const e = metroData.elements[0];
                    const mLat = e.lat || e.center?.lat;
                    const mLon = e.lon || e.center?.lon;
                    if (mLat && mLon) {
                        setMetro({ lat: mLat, lng: mLon, name: e.tags?.name || "Metro/Tren İstasyonu" });
                    }
                }
            } catch (err) {
                console.error("POI Fetch Error:", err);
            }
        };

        if (lat && lng) {
            fetchPOIs();
        }
    }, [lat, lng]);

    if (!mounted) return <div className="w-full h-full bg-appleGray rounded-2xl animate-pulse" />;

    return (
        <MapContainer center={[lat, lng]} zoom={14} className="w-full h-full rounded-2xl z-0" style={{ minHeight: "300px" }}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
            />
            <Marker position={[lat, lng]} icon={customIcon}>
                <Popup>Seçilen Konum</Popup>
            </Marker>

            {hospital && (
                <Marker position={[hospital.lat, hospital.lng]} icon={customIcon}>
                    <Popup>🏥 {hospital.name}</Popup>
                </Marker>
            )}

            {metro && (
                <Marker position={[metro.lat, metro.lng]} icon={customIcon}>
                    <Popup>🚇 {metro.name}</Popup>
                </Marker>
            )}
        </MapContainer>
    );
}

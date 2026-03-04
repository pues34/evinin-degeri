export interface Neighborhood {
    id: string;
    name: string;
    multiplier: number; // For the valuation algorithm
}

export interface District {
    id: string;
    name: string;
    neighborhoods: Neighborhood[];
}

export interface City {
    id: string;
    name: string;
    districts: District[];
}

export const TurkeyLocations: City[] = [
    {
        id: "istanbul",
        name: "İstanbul",
        districts: [
            {
                id: "kadikoy",
                name: "Kadıköy",
                neighborhoods: [
                    { id: "caferaga", name: "Caferağa", multiplier: 1.25 },
                    { id: "osmanaga", name: "Osmanağa", multiplier: 1.15 },
                    { id: "suadiye", name: "Suadiye", multiplier: 1.40 },
                    { id: "bostanci", name: "Bostancı", multiplier: 1.20 },
                    { id: "erenkoy", name: "Erenköy", multiplier: 1.35 },
                    { id: "goztepe", name: "Göztepe", multiplier: 1.30 },
                    { id: "fenerbahce", name: "Fenerbahçe", multiplier: 1.50 },
                ]
            },
            {
                id: "besiktas",
                name: "Beşiktaş",
                neighborhoods: [
                    { id: "levent", name: "Levent", multiplier: 1.45 },
                    { id: "etiler", name: "Etiler", multiplier: 1.60 },
                    { id: "bebek", name: "Bebek", multiplier: 1.80 },
                    { id: "dikilitas", name: "Dikilitaş", multiplier: 1.20 },
                    { id: "sinanpasa", name: "Sinanpaşa", multiplier: 1.30 },
                ]
            },
            {
                id: "sisli",
                name: "Şişli",
                neighborhoods: [
                    { id: "tesvikiye", name: "Teşvikiye", multiplier: 1.50 },
                    { id: "bomonti", name: "Bomonti", multiplier: 1.35 },
                    { id: "fulya", name: "Fulya", multiplier: 1.25 },
                    { id: "mecidiyekoy", name: "Mecidiyeköy", multiplier: 1.15 },
                ]
            },
            {
                id: "sariyer",
                name: "Sarıyer",
                neighborhoods: [
                    { id: "maslak", name: "Maslak", multiplier: 1.45 },
                    { id: "tarabya", name: "Tarabya", multiplier: 1.55 },
                    { id: "yenikoy", name: "Yeniköy", multiplier: 1.70 },
                ]
            }
        ]
    },
    {
        id: "ankara",
        name: "Ankara",
        districts: [
            {
                id: "cankaya",
                name: "Çankaya",
                neighborhoods: [
                    { id: "kizilay", name: "Kızılay", multiplier: 1.10 },
                    { id: "ayranci", name: "Ayrancı", multiplier: 1.20 },
                    { id: "cukurambar", name: "Çukurambar", multiplier: 1.40 },
                    { id: "oran", name: "Oran", multiplier: 1.35 },
                    { id: "bahcelievler", name: "Bahçelievler", multiplier: 1.25 },
                ]
            },
            {
                id: "yenimahalle",
                name: "Yenimahalle",
                neighborhoods: [
                    { id: "batikent", name: "Batıkent", multiplier: 1.05 },
                    { id: "demetevler", name: "Demetevler", multiplier: 0.95 },
                    { id: "cayyolu", name: "Çayyolu", multiplier: 1.35 },
                    { id: "umitkoy", name: "Ümitköy", multiplier: 1.30 },
                ]
            }
        ]
    },
    {
        id: "izmir",
        name: "İzmir",
        districts: [
            {
                id: "karsiyaka",
                name: "Karşıyaka",
                neighborhoods: [
                    { id: "bostanli", name: "Bostanlı", multiplier: 1.35 },
                    { id: "mavisehir", name: "Mavişehir", multiplier: 1.45 },
                    { id: "nergiz", name: "Nergiz", multiplier: 1.10 },
                    { id: "ali_bey", name: "Alaybey", multiplier: 1.15 },
                ]
            },
            {
                id: "konak",
                name: "Konak",
                neighborhoods: [
                    { id: "alsancak", name: "Alsancak", multiplier: 1.50 },
                    { id: "goztepe_izmir", name: "Göztepe", multiplier: 1.30 },
                    { id: "basmane", name: "Basmane", multiplier: 0.90 },
                    { id: "guzelyali", name: "Güzelyalı", multiplier: 1.25 },
                ]
            }
        ]
    }
];

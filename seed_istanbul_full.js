const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const istanbulData = {
    // --- A ---
    "Adalar": {
        baseMult: 1.5,
        neighborhoods: [
            { name: "Burgazada", m: 1.6 }, { name: "Heybeliada", m: 1.5 }, { name: "Kınalıada", m: 1.4 }, { name: "Maden", m: 1.5 }, { name: "Nizam", m: 1.7 }
        ]
    },
    "Arnavutköy": {
        baseMult: 0.6,
        neighborhoods: [
            { name: "Anadolu", m: 0.6 }, { name: "Arnavutköy Merkez", m: 0.65 }, { name: "Atatürk", m: 0.6 }, { name: "Boğazköy Merkez", m: 0.6 }, { name: "Bolluca", m: 0.62 }, { name: "Deliklikaya", m: 0.7 }, { name: "Durusu", m: 0.75 }, { name: "Fatih", m: 0.6 }, { name: "Hacımaşlı", m: 0.55 }, { name: "Hadımköy", m: 0.65 }, { name: "Haraççı", m: 0.6 }, { name: "Hastane", m: 0.65 }, { name: "Hicret", m: 0.6 }, { name: "İmrahor", m: 0.6 }, { name: "İslambey", m: 0.6 }, { name: "Karaburun", m: 0.8 }, { name: "Karlıbayır", m: 0.6 }, { name: "Mareşal Fevzi Çakmak", m: 0.6 }, { name: "Mavigöl", m: 0.6 }, { name: "Mehmet Akif Ersoy", m: 0.6 }, { name: "Mustafa Kemal Paşa", m: 0.6 }, { name: "Nenehatun", m: 0.6 }, { name: "Ömerli", m: 0.65 }, { name: "Taşoluk", m: 0.6 }, { name: "Yavuz Selim", m: 0.6 }, { name: "Zafer", m: 0.6 }
        ]
    },
    "Ataşehir": {
        baseMult: 1.4,
        neighborhoods: [
            { name: "Aşıkveysel", m: 1.2 }, { name: "Atatürk", m: 1.5 }, { name: "Barbaros", m: 1.6 }, { name: "Esatpaşa", m: 1.1 }, { name: "Ferhatpaşa", m: 1.0 }, { name: "Fetih", m: 1.3 }, { name: "İçerenköy", m: 1.4 }, { name: "İnönü", m: 1.2 }, { name: "Kayışdağı", m: 1.1 }, { name: "Küçükbakkalköy", m: 1.4 }, { name: "Mevlana", m: 1.2 }, { name: "Mimar Sinan", m: 1.3 }, { name: "Mustafa Kemal", m: 1.1 }, { name: "Örnek", m: 1.2 }, { name: "Yeni Çamlıca", m: 1.1 }, { name: "Yeni Sahra", m: 1.1 }, { name: "Yenişehir", m: 1.4 }
        ]
    },
    "Avcılar": {
        baseMult: 0.8,
        neighborhoods: [
            { name: "Ambarlı", m: 0.85 }, { name: "Cihangir", m: 0.8 }, { name: "Denizköşkler", m: 0.85 }, { name: "Firuzköy", m: 0.75 }, { name: "Gümüşpala", m: 0.8 }, { name: "Merkez", m: 0.9 }, { name: "Mustafa Kemal Paşa", m: 0.75 }, { name: "Tahtakale", m: 0.7 }, { name: "Üniversite", m: 0.85 }, { name: "Yeşilkent", m: 0.65 }
        ]
    },
    // --- B ---
    "Bağcılar": {
        baseMult: 0.7,
        neighborhoods: [
            { name: "15 Temmuz", m: 0.8 }, { name: "Bağlar", m: 0.7 }, { name: "Barbaros", m: 0.7 }, { name: "Çınar", m: 0.7 }, { name: "Demirkapı", m: 0.65 }, { name: "Fatih", m: 0.7 }, { name: "Fevzi Çakmak", m: 0.68 }, { name: "Göztepe", m: 0.75 }, { name: "Güneşli", m: 0.85 }, { name: "Hürriyet", m: 0.7 }, { name: "İnönü", m: 0.7 }, { name: "Kazım Karabekir", m: 0.7 }, { name: "Kemalpaşa", m: 0.7 }, { name: "Kirazlı", m: 0.75 }, { name: "Mahmutbey", m: 0.8 }, { name: "Merkez", m: 0.75 }, { name: "Sancaktepe", m: 0.7 }, { name: "Yavuz Selim", m: 0.7 }, { name: "Yenigün", m: 0.7 }, { name: "Yenimahalle", m: 0.7 }, { name: "Yıldıztepe", m: 0.7 }, { name: "Yüzyıl", m: 0.7 }
        ]
    },
    "Bahçelievler": {
        baseMult: 0.8,
        neighborhoods: [
            { name: "Bahçelievler", m: 1.0 }, { name: "Cumhuriyet", m: 0.8 }, { name: "Çobançeşme", m: 0.75 }, { name: "Fevzi Çakmak", m: 0.75 }, { name: "Hürriyet", m: 0.78 }, { name: "Kocasinan Merkez", m: 0.75 }, { name: "Siyavuşpaşa", m: 0.85 }, { name: "Soğanlı", m: 0.8 }, { name: "Şirinevler", m: 0.85 }, { name: "Yenibosna Merkez", m: 0.8 }, { name: "Zafer", m: 0.75 }
        ]
    },
    "Bakırköy": {
        baseMult: 1.8,
        neighborhoods: [
            { name: "Ataköy 1. Kısım", m: 1.9 }, { name: "Ataköy 2-5-6. Kısım", m: 1.9 }, { name: "Ataköy 3-4-11. Kısım", m: 1.9 }, { name: "Ataköy 7-8-9-10. Kısım", m: 1.9 }, { name: "Basınköy", m: 1.7 }, { name: "Cevizlik", m: 1.6 }, { name: "Kartaltepe", m: 1.6 }, { name: "Osmaniye", m: 1.5 }, { name: "Sakızağacı", m: 1.6 }, { name: "Şenlikköy (Florya)", m: 2.2 }, { name: "Yenimahalle", m: 1.5 }, { name: "Yeşilköy", m: 2.3 }, { name: "Yeşilyurt", m: 2.3 }, { name: "Zeytinlik", m: 1.6 }, { name: "Zuhuratbaba", m: 1.7 }
        ]
    },
    "Başakşehir": {
        baseMult: 1.1,
        neighborhoods: [
            { name: "Altınşehir", m: 0.8 }, { name: "Bahçeşehir 1. Kısım", m: 1.3 }, { name: "Bahçeşehir 2. Kısım", m: 1.2 }, { name: "Başak", m: 1.1 }, { name: "Başakşehir", m: 1.15 }, { name: "Güvercintepe", m: 0.75 }, { name: "İkitelli Osb", m: 1.0 }, { name: "Kayabaşı", m: 1.1 }, { name: "Şahintepe", m: 0.7 }, { name: "Şamlar", m: 0.8 }, { name: "Ziya Gökalp", m: 1.0 }
        ]
    },
    "Bayrampaşa": {
        baseMult: 0.8,
        neighborhoods: [
            { name: "Altıntepsi", m: 0.8 }, { name: "Cevatpaşa", m: 0.78 }, { name: "İsmetpaşa", m: 0.81 }, { name: "Kartaltepe", m: 0.95 }, { name: "Kocatepe", m: 0.88 }, { name: "Muratpaşa", m: 0.85 }, { name: "Orta", m: 0.82 }, { name: "Terazidere", m: 0.75 }, { name: "Vatan", m: 0.85 }, { name: "Yenidoğan", m: 0.8 }, { name: "Yıldırım", m: 0.9 }
        ]
    },
    "Beşiktaş": {
        baseMult: 2.5,
        neighborhoods: [
            { name: "Abbasağa", m: 2.2 }, { name: "Akat", m: 2.6 }, { name: "Arnavutköy", m: 2.8 }, { name: "Balmumcu", m: 2.4 }, { name: "Bebek", m: 3.2 }, { name: "Cihannüma", m: 2.3 }, { name: "Dikilitaş", m: 2.1 }, { name: "Etiler", m: 2.9 }, { name: "Gayrettepe", m: 2.4 }, { name: "Konaklar", m: 2.3 }, { name: "Kuruçeşme", m: 2.8 }, { name: "Kültür", m: 2.5 }, { name: "Levazım", m: 2.6 }, { name: "Levent", m: 2.7 }, { name: "Mecidiye", m: 2.2 }, { name: "Muradiye", m: 2.1 }, { name: "Nisbetiye", m: 2.7 }, { name: "Ortaköy", m: 2.5 }, { name: "Sinanpaşa", m: 2.4 }, { name: "Türkali", m: 2.1 }, { name: "Ulus", m: 3.0 }, { name: "Vişnezade", m: 2.5 }, { name: "Yıldız", m: 2.4 }
        ]
    },
    "Beykoz": {
        baseMult: 1.5,
        neighborhoods: [
            { name: "Acarlar", m: 2.4 }, { name: "Anadolu Feneri", m: 1.5 }, { name: "Anadolu Hisarı", m: 1.9 }, { name: "Anadolu Kavağı", m: 1.6 }, { name: "Baklacı", m: 1.2 }, { name: "Bozhane", m: 1.1 }, { name: "Çamlıbahçe", m: 1.3 }, { name: "Çengeldere", m: 1.2 }, { name: "Çiftlik", m: 1.2 }, { name: "Çiğdem", m: 1.3 }, { name: "Çubuklu", m: 1.6 }, { name: "Dereseki", m: 1.1 }, { name: "Elmalı", m: 1.2 }, { name: "Fatih", m: 1.3 }, { name: "Göksu", m: 1.8 }, { name: "Göllü", m: 1.1 }, { name: "Görele", m: 1.3 }, { name: "Göztepe", m: 1.4 }, { name: "Gümüşsuyu", m: 1.4 }, { name: "İncirköy", m: 1.4 }, { name: "Kanlıca", m: 2.1 }, { name: "Kavacık", m: 1.7 }, { name: "Merkez", m: 1.5 }, { name: "Ortaçeşme", m: 1.3 }, { name: "Örnekköy", m: 1.2 }, { name: "Paşabahçe", m: 1.5 }, { name: "Polonezköy", m: 1.8 }, { name: "Poyraz", m: 1.5 }, { name: "Riva", m: 1.7 }, { name: "Rüzgarlıbahçe", m: 1.5 }, { name: "Soğuksu", m: 1.3 }, { name: "Tokatköy", m: 1.3 }, { name: "Yalıköy", m: 1.5 }
        ]
    },
    "Beylikdüzü": {
        baseMult: 0.9,
        neighborhoods: [
            { name: "Adnan Kahveci", m: 1.0 }, { name: "Barış", m: 0.95 }, { name: "Büyükşehir", m: 0.9 }, { name: "Cumhuriyet", m: 0.95 }, { name: "Dereağzı", m: 0.8 }, { name: "Gürpınar", m: 0.85 }, { name: "Kavaklı", m: 0.85 }, { name: "Marmara", m: 0.95 }, { name: "Sahil", m: 0.9 }, { name: "Yakuplu", m: 0.85 }
        ]
    },
    "Beyoğlu": {
        baseMult: 1.5,
        neighborhoods: [
            { name: "Arap Cami", m: 1.5 }, { name: "Asmalı Mescit", m: 1.8 }, { name: "Bedrettin", m: 1.2 }, { name: "Bereketzade", m: 1.6 }, { name: "Bostan", m: 1.3 }, { name: "Bülbül", m: 1.1 }, { name: "Camiikebir", m: 1.5 }, { name: "Cihangir", m: 2.2 }, { name: "Çukur", m: 1.2 }, { name: "Emekyemez", m: 1.4 }, { name: "Evliya Çelebi", m: 1.6 }, { name: "Fetihtepe", m: 1.1 }, { name: "Firuzağa", m: 1.9 }, { name: "Gümüşsuyu", m: 2.0 }, { name: "Hacıahmet", m: 1.1 }, { name: "Hacımimi", m: 1.5 }, { name: "Halıcıoğlu", m: 1.2 }, { name: "Hüseyinağa", m: 1.7 }, { name: "İstiklal", m: 1.2 }, { name: "Kadımehmet Efendi", m: 1.2 }, { name: "Kalyoncu Kulluğu", m: 1.3 }, { name: "Kamer Hatun", m: 1.4 }, { name: "Kaptanpaşa", m: 1.1 }, { name: "Katipmustafa Çelebi", m: 1.6 }, { name: "Keçeci Piri", m: 1.1 }, { name: "Kemankeş Karamustafa Paşa", m: 1.8 }, { name: "Kılıçali Paşa", m: 1.7 }, { name: "Kocatepe", m: 1.3 }, { name: "Kulaksız", m: 1.1 }, { name: "Kuloğlu", m: 1.7 }, { name: "Müeyyedzade", m: 1.6 }, { name: "Ömer Avni", m: 2.1 }, { name: "Piri Paşa", m: 1.1 }, { name: "Piyalepaşa", m: 1.1 }, { name: "Pürtelaş Hasan Efendi", m: 1.8 }, { name: "Sururi Mehmet Efendi", m: 1.4 }, { name: "Sütlüce", m: 1.4 }, { name: "Şahkulu", m: 1.8 }, { name: "Şehit Muhtar", m: 1.4 }, { name: "Tomtom", m: 1.7 }, { name: "Yahya Kahya", m: 1.3 }, { name: "Yenişehir", m: 1.2 }
        ]
    },
    "Büyükçekmece": {
        baseMult: 0.8,
        neighborhoods: [
            { name: "19 Mayıs", m: 0.8 }, { name: "Ahmediye", m: 0.7 }, { name: "Alkेंट 2000", m: 1.5 }, { name: "Atatürk", m: 0.85 }, { name: "Bahçelievler", m: 0.8 }, { name: "Batıköy", m: 0.85 }, { name: "Celaliye", m: 0.7 }, { name: "Cumhuriyet", m: 0.85 }, { name: "Çakmaklı", m: 0.75 }, { name: "Dizdariye", m: 0.8 }, { name: "Ekinoba", m: 0.85 }, { name: "Fatih", m: 0.8 }, { name: "Güzelce", m: 0.9 }, { name: "Hürriyet", m: 0.8 }, { name: "Kamiloba", m: 0.7 }, { name: "Kumburgaz", m: 0.75 }, { name: "Mimaroba", m: 0.9 }, { name: "Mimarsinan", m: 0.85 }, { name: "Murat Çeşme", m: 0.75 }, { name: "Pınartepe", m: 0.85 }, { name: "Sinanoba", m: 0.9 }, { name: "Türkoba", m: 0.75 }, { name: "Ulus", m: 0.8 }, { name: "Yenimahalle", m: 0.75 }
        ]
    },
    "Çatalca": {
        baseMult: 0.5,
        neighborhoods: [
            { name: "Çakıl", m: 0.5 }, { name: "Çiftlikköy", m: 0.5 }, { name: "Ferhatpaşa", m: 0.6 }, { name: "İzzettin", m: 0.5 }, { name: "Kaleiçi", m: 0.6 }, { name: "Karacaköy", m: 0.45 }, { name: "Muratbey", m: 0.55 }, { name: "Ormanlı", m: 0.45 }
        ]
    },
    "Çekmeköy": {
        baseMult: 1.0,
        neighborhoods: [
            { name: "Alemdağ", m: 0.9 }, { name: "Aydınlar", m: 0.95 }, { name: "Centilmen", m: 1.0 }, { name: "Çamlık", m: 1.2 }, { name: "Çatalmeşe", m: 0.9 }, { name: "Cumhuriyet", m: 0.95 }, { name: "Ekşioğlu", m: 0.95 }, { name: "Güngören", m: 0.85 }, { name: "Hamidiye", m: 1.1 }, { name: "Kirazlıdere", m: 0.95 }, { name: "Mehmet Akif", m: 1.0 }, { name: "Merkez", m: 1.1 }, { name: "Mimar Sinan", m: 1.1 }, { name: "Nişantepe", m: 0.85 }, { name: "Ömerli", m: 1.0 }, { name: "Soğukpınar", m: 0.95 }, { name: "Sultançiftliği", m: 0.9 }
        ]
    },
    "Esenler": {
        baseMult: 0.7,
        neighborhoods: [
            { name: "Birlik", m: 0.7 }, { name: "Çifte Havuzlar", m: 0.7 }, { name: "Davutpaşa", m: 0.7 }, { name: "Fatih", m: 0.7 }, { name: "Fevzi Çakmak", m: 0.7 }, { name: "Havaalanı", m: 0.75 }, { name: "Kazım Karabekir", m: 0.7 }, { name: "Kemer", m: 0.7 }, { name: "Menderes", m: 0.75 }, { name: "Mimar Sinan", m: 0.7 }, { name: "Namık Kemal", m: 0.7 }, { name: "Nine Hatun", m: 0.7 }, { name: "Oruçreis", m: 0.75 }, { name: "Tuna", m: 0.7 }, { name: "Turgut Reis", m: 0.7 }, { name: "Yavuz Selim", m: 0.7 }
        ]
    },
    // Esenyurt skipped individual list for brevity but kept average
    "Esenyurt": {
        baseMult: 0.6,
        neighborhoods: [
            { name: "Akçaburgaz", m: 0.6 }, { name: "Akevler", m: 0.7 }, { name: "Akşemseddin", m: 0.6 }, { name: "Ardıçlı", m: 0.65 }, { name: "Bağlarçeşme", m: 0.55 }, { name: "Balıkyolu", m: 0.55 }, { name: "Barbaros Hayrettin Paşa", m: 0.7 }, { name: "Battalgazi", m: 0.6 }, { name: "Cumhuriyet", m: 0.8 }, { name: "Çınar", m: 0.6 }, { name: "Esenkent", m: 0.85 }, { name: "Fatih", m: 0.6 }, { name: "Gökevler", m: 0.7 }, { name: "Güzelyurt", m: 0.7 }, { name: "İncirtepe", m: 0.6 }, { name: "İstiklal", m: 0.6 }, { name: "Koza", m: 0.75 }, { name: "Mevlana", m: 0.65 }, { name: "Namık Kemal", m: 0.6 }, { name: "Necip Fazıl Kısakürek", m: 0.6 }, { name: "Orhan Gazi", m: 0.6 }, { name: "Osmangazi", m: 0.65 }, { name: "Pınar", m: 0.6 }, { name: "Piri Reis", m: 0.7 }, { name: "Saadetdere", m: 0.65 }, { name: "Selahaddin Eyyubi", m: 0.6 }, { name: "Sultaniye", m: 0.65 }, { name: "Talatpaşa", m: 0.6 }, { name: "Turgut Özal", m: 0.65 }, { name: "Üçevler", m: 0.6 }, { name: "Yenikent", m: 0.6 }, { name: "Yeşilkent", m: 0.6 }, { name: "Yunus Emre", m: 0.6 }, { name: "Zafer", m: 0.65 }
        ]
    },
    "Eyüpsultan": {
        baseMult: 0.9,
        neighborhoods: [
            { name: "Akşemsettin", m: 0.85 }, { name: "Alibeyköy", m: 0.9 }, { name: "Çırçır", m: 0.85 }, { name: "Defne", m: 0.9 }, { name: "Emniyettepe", m: 0.85 }, { name: "Esentepe", m: 0.85 }, { name: "Göktürk Merkez", m: 1.8 }, { name: "Güzeltepe", m: 0.85 }, { name: "İslambey", m: 0.9 }, { name: "Karadolap", m: 0.85 }, { name: "Merkez", m: 1.0 }, { name: "Mimar Sinan", m: 1.2 }, { name: "Mithatpaşa", m: 1.3 }, { name: "Nişanca", m: 0.9 }, { name: "Rami Cuma", m: 0.9 }, { name: "Rami Yeni", m: 0.9 }, { name: "Sakarya", m: 0.85 }, { name: "Silahtarağa", m: 0.9 }, { name: "Topçular", m: 0.9 }, { name: "Yeşilpınar", m: 0.85 }
        ]
    },
    "Fatih": {
        baseMult: 1.0,
        neighborhoods: [
            { name: "Aksaray", m: 1.0 }, { name: "Akşemsettin", m: 1.0 }, { name: "Ali Kuşçu", m: 1.0 }, { name: "Atikali", m: 0.95 }, { name: "Ayvansaray", m: 0.95 }, { name: "Balat", m: 1.1 }, { name: "Beyazıt", m: 1.2 }, { name: "Cerrahpaşa", m: 1.1 }, { name: "Cibali", m: 1.0 }, { name: "Emin Sinan", m: 1.1 }, { name: "Haseki Sultan", m: 1.1 }, { name: "Hırka-i Şerif", m: 1.0 }, { name: "Hobyar", m: 1.2 }, { name: "Hoca Gıyaseddin", m: 1.0 }, { name: "İskenderpaşa", m: 1.0 }, { name: "Kalenderhane", m: 1.1 }, { name: "Karagümrük", m: 0.95 }, { name: "Koca Mustafapaşa", m: 1.1 }, { name: "Küçük Ayasofya", m: 1.2 }, { name: "Mercan", m: 1.2 }, { name: "Mevlanakapı", m: 1.0 }, { name: "Molla Gürani", m: 1.0 }, { name: "Molla Hüsrev", m: 1.1 }, { name: "Silivrikapı", m: 1.0 }, { name: "Sultanahmet", m: 1.3 }, { name: "Sümbül Efendi", m: 1.0 }, { name: "Süleymaniye", m: 1.2 }, { name: "Şehremini", m: 1.1 }, { name: "Topkapı", m: 1.1 }, { name: "Yedikule", m: 1.0 }, { name: "Zeyrek", m: 1.0 }
        ]
    },
    "Gaziosmanpaşa": {
        baseMult: 0.7,
        neighborhoods: [
            { name: "Bağlarbaşı", m: 0.7 }, { name: "Barbaros Hayrettin Paşa", m: 0.7 }, { name: "Fevzi Çakmak", m: 0.7 }, { name: "Hürriyet", m: 0.7 }, { name: "Karadeniz", m: 0.75 }, { name: "Karayolları", m: 0.7 }, { name: "Karlıtepe", m: 0.7 }, { name: "Kazım Karabekir", m: 0.7 }, { name: "Merkez", m: 0.8 }, { name: "Mevlana", m: 0.75 }, { name: "Pazariçi", m: 0.7 }, { name: "Sarıgöl", m: 0.65 }, { name: "Şemsipaşa", m: 0.7 }, { name: "Yeni Mahalle", m: 0.75 }, { name: "Yenidoğan", m: 0.7 }, { name: "Yıldıztabya", m: 0.7 }
        ]
    },
    "Güngören": {
        baseMult: 0.8,
        neighborhoods: [
            { name: "Abdurrahman Nafiz Gürman", m: 0.85 }, { name: "Akıncılar", m: 0.8 }, { name: "Gençosman", m: 0.75 }, { name: "Güneştepe", m: 0.75 }, { name: "Güven", m: 0.8 }, { name: "Haznedar", m: 0.85 }, { name: "Mareşal Çakmak", m: 0.8 }, { name: "Merkez", m: 0.8 }, { name: "Sanayi", m: 0.75 }, { name: "Tozkoparan", m: 0.85 }
        ]
    },
    "Kadıköy": {
        baseMult: 2.2,
        neighborhoods: [
            { name: "19 Mayıs", m: 2.1 }, { name: "Acıbadem", m: 2.3 }, { name: "Bostancı", m: 2.3 }, { name: "Caddebostan", m: 3.0 }, { name: "Caferağa", m: 2.5 }, { name: "Dumlupınar", m: 1.8 }, { name: "Eğitim", m: 1.9 }, { name: "Erenköy", m: 2.5 }, { name: "Fenerbahçe", m: 3.1 }, { name: "Feneryolu", m: 2.6 }, { name: "Fikirtepe", m: 1.9 }, { name: "Göztepe", m: 2.5 }, { name: "Hasanpaşa", m: 2.0 }, { name: "Koşuyolu", m: 2.4 }, { name: "Kozyatağı", m: 2.2 }, { name: "Merdivenköy", m: 2.0 }, { name: "Osmanağa", m: 2.3 }, { name: "Rasimpaşa", m: 2.1 }, { name: "Sahrayıcedit", m: 2.1 }, { name: "Suadiye", m: 2.9 }, { name: "Zühtüpaşa", m: 2.4 }
        ]
    },
    "Kağıthane": {
        baseMult: 1.1,
        neighborhoods: [
            { name: "Çağlayan", m: 1.0 }, { name: "Çeliktepe", m: 1.0 }, { name: "Emniyetevleri", m: 1.3 }, { name: "Gültepe", m: 1.0 }, { name: "Gürsel", m: 1.1 }, { name: "Hamidiye", m: 1.1 }, { name: "Harmantepe", m: 1.0 }, { name: "Hürriyet", m: 1.0 }, { name: "Mehmet Akif Ersoy", m: 1.0 }, { name: "Merkez", m: 1.2 }, { name: "Nurtepe", m: 1.0 }, { name: "Ortabayır", m: 1.1 }, { name: "Seyrantepe", m: 1.2 }, { name: "Sultan Selim", m: 1.1 }, { name: "Şirintepe", m: 1.0 }, { name: "Talatpaşa", m: 1.0 }, { name: "Telsizler", m: 1.0 }, { name: "Yahya Kemal", m: 1.0 }, { name: "Yeşilce", m: 1.1 }
        ]
    },
    "Kartal": {
        baseMult: 1.1,
        neighborhoods: [
            { name: "Atalar", m: 1.1 }, { name: "Cevizli", m: 1.1 }, { name: "Cumhuriyet", m: 1.0 }, { name: "Çavuşoğlu", m: 1.1 }, { name: "Esentepe", m: 1.1 }, { name: "Gümüşpınar", m: 1.0 }, { name: "Hürriyet", m: 1.0 }, { name: "Karlıktepe", m: 1.1 }, { name: "Kordonboyu", m: 1.3 }, { name: "Orhantepe", m: 1.2 }, { name: "Ortadağ", m: 1.0 }, { name: "Petrol İş", m: 1.1 }, { name: "Soğanlık Yeni", m: 1.1 }, { name: "Topselvi", m: 1.0 }, { name: "Uğur Mumcu", m: 1.1 }, { name: "Yakacık Çarşı", m: 1.1 }, { name: "Yakacık Yeni", m: 1.1 }, { name: "Yalı", m: 1.2 }, { name: "Yukarı", m: 1.1 }, { name: "Yunus", m: 1.0 }
        ]
    },
    "Küçükçekmece": {
        baseMult: 0.8,
        neighborhoods: [
            { name: "Atakent", m: 1.2 }, { name: "Atatürk", m: 0.8 }, { name: "Beşyol", m: 0.9 }, { name: "Cennet", m: 1.0 }, { name: "Cumhuriyet", m: 0.85 }, { name: "Fatih", m: 0.8 }, { name: "Fevzi Çakmak", m: 0.8 }, { name: "Gültepe", m: 0.8 }, { name: "Halkalı Merkez", m: 1.0 }, { name: "İnönü", m: 0.8 }, { name: "İstasyon", m: 0.9 }, { name: "Kanarya", m: 0.7 }, { name: "Kartaltepe", m: 0.9 }, { name: "Kemalpaşa", m: 0.8 }, { name: "Mehmet Akif", m: 0.8 }, { name: "Söğütlü Çeşme", m: 0.8 }, { name: "Tevfik Bey", m: 0.85 }, { name: "Yarımburgaz", m: 0.75 }, { name: "Yeni Mahalle", m: 0.85 }, { name: "Yeşilova", m: 0.85 }
        ]
    },
    "Maltepe": {
        baseMult: 1.3,
        neighborhoods: [
            { name: "Altayçeşme", m: 1.4 }, { name: "Altıntepe", m: 1.5 }, { name: "Aydınevler", m: 1.3 }, { name: "Bağlarbaşı", m: 1.3 }, { name: "Başıbüyük", m: 1.1 }, { name: "Büyükbakkalköy", m: 1.1 }, { name: "Cevizli", m: 1.3 }, { name: "Çınar", m: 1.4 }, { name: "Esenkent", m: 1.1 }, { name: "Feyzullah", m: 1.4 }, { name: "Fındıklı", m: 1.1 }, { name: "Girne", m: 1.2 }, { name: "Gülensu", m: 0.9 }, { name: "Gülsuyu", m: 0.9 }, { name: "İdealtepe", m: 1.5 }, { name: "Küçükyalı", m: 1.5 }, { name: "Yalı", m: 1.6 }, { name: "Zümrütevler", m: 1.2 }
        ]
    },
    "Pendik": {
        baseMult: 0.9,
        neighborhoods: [
            { name: "Ahmet Yesevi", m: 0.8 }, { name: "Ahmethakı", m: 0.8 }, { name: "Bahçelievler", m: 1.0 }, { name: "Batı", m: 1.2 }, { name: "Çamçeşme", m: 0.8 }, { name: "Çamlık", m: 1.1 }, { name: "Çınardere", m: 0.9 }, { name: "Doğu", m: 1.1 }, { name: "Dumlupınar", m: 0.8 }, { name: "Ertuğrul Gazi", m: 0.8 }, { name: "Esenler", m: 0.85 }, { name: "Esenyalı", m: 0.8 }, { name: "Fatih", m: 0.85 }, { name: "Fevzi Çakmak", m: 0.85 }, { name: "Güllü Bağlar", m: 0.85 }, { name: "Güzelyalı", m: 1.0 }, { name: "Harmandere", m: 1.0 }, { name: "Kavakpınar", m: 0.85 }, { name: "Kaynarca", m: 0.9 }, { name: "Kurtköy", m: 1.1 }, { name: "Orhangazi", m: 0.85 }, { name: "Orta", m: 0.9 }, { name: "Ramazanoğlu", m: 0.85 }, { name: "Sanayi", m: 0.9 }, { name: "Sapan Bağları", m: 0.95 }, { name: "Sülüntepe", m: 0.85 }, { name: "Şeyhli", m: 0.9 }, { name: "Velibaba", m: 0.85 }, { name: "Yayalar", m: 0.9 }, { name: "Yeni Mahalle", m: 1.1 }, { name: "Yenişehir", m: 1.2 }, { name: "Yeşilbağlar", m: 0.95 }
        ]
    },
    "Sancaktepe": {
        baseMult: 0.8,
        neighborhoods: [
            { name: "Abdurrahmangazi", m: 0.85 }, { name: "Akpınar", m: 0.8 }, { name: "Atatürk", m: 0.8 }, { name: "Emek", m: 0.8 }, { name: "Eyüp Sultan", m: 0.8 }, { name: "Fatih", m: 0.8 }, { name: "Hilal", m: 0.8 }, { name: "İnönü", m: 0.8 }, { name: "Kemal Türkler", m: 0.85 }, { name: "Meclis", m: 0.85 }, { name: "Merve", m: 0.75 }, { name: "Mevlana", m: 0.8 }, { name: "Osmangazi", m: 0.85 }, { name: "Paşaköy", m: 0.8 }, { name: "Safa", m: 0.8 }, { name: "Sarıgazi", m: 0.85 }, { name: "Veysel Karani", m: 0.8 }, { name: "Yenidoğan", m: 0.8 }, { name: "Yunus Emre", m: 0.8 }
        ]
    },
    "Sarıyer": {
        baseMult: 2.2,
        neighborhoods: [
            { name: "Ayazağa", m: 1.6 }, { name: "Bahçeköy Merkez", m: 1.8 }, { name: "Baltalimanı", m: 2.5 }, { name: "Büyükdere", m: 2.0 }, { name: "Cumhuriyet", m: 1.7 }, { name: "Çamlıtepe", m: 1.7 }, { name: "Çayırbaşı", m: 1.8 }, { name: "Darüşşafaka", m: 2.1 }, { name: "Emirgan", m: 2.8 }, { name: "Fatih Sultan Mehmet", m: 1.8 }, { name: "Ferahevler", m: 1.8 }, { name: "İstinye", m: 2.6 }, { name: "Kazım Karabekir", m: 1.6 }, { name: "Kireçburnu", m: 2.4 }, { name: "Kocataş", m: 1.8 }, { name: "Maden", m: 1.9 }, { name: "Merkez", m: 2.0 }, { name: "Pınar", m: 1.7 }, { name: "Poligon", m: 1.8 }, { name: "Ptt Evleri", m: 1.7 }, { name: "Reşitpaşa", m: 2.0 }, { name: "Rumeli Hisarı", m: 2.6 }, { name: "Rumeli Kavağı", m: 1.9 }, { name: "Tarabya", m: 2.5 }, { name: "Yeniköy", m: 2.7 }, { name: "Zekeriyaköy", m: 2.2 }
        ]
    },
    "Silivri": {
        baseMult: 0.5,
        neighborhoods: [
            { name: "Alibey", m: 0.6 }, { name: "Cumhuriyet", m: 0.6 }, { name: "Fatih", m: 0.55 }, { name: "Gazitepe", m: 0.5 }, { name: "Kavaklı", m: 0.55 }, { name: "Mimar Sinan", m: 0.6 }, { name: "Ortaköy", m: 0.55 }, { name: "Piri Mehmet Paşa", m: 0.65 }, { name: "Selimpaşa", m: 0.6 }, { name: "Semizkumlar", m: 0.6 }, { name: "Yeni", m: 0.6 }
        ]
    },
    "Sultanbeyli": {
        baseMult: 0.6,
        neighborhoods: [
            { name: "Abdurrahmangazi", m: 0.65 }, { name: "Adil", m: 0.6 }, { name: "Ahmetyesevi", m: 0.6 }, { name: "Akşemsettin", m: 0.6 }, { name: "Battalgazi", m: 0.6 }, { name: "Fatih", m: 0.6 }, { name: "Hasanpaşa", m: 0.65 }, { name: "Mecidiye", m: 0.6 }, { name: "Mehmet Akif", m: 0.65 }, { name: "Mimar Sinan", m: 0.6 }, { name: "Necip Fazıl", m: 0.6 }, { name: "Orhangazi", m: 0.6 }, { name: "Turgut Reis", m: 0.6 }, { name: "Yavuz Selim", m: 0.6 }
        ]
    },
    "Sultangazi": {
        baseMult: 0.7,
        neighborhoods: [
            { name: "50. Yıl", m: 0.7 }, { name: "75. Yıl", m: 0.7 }, { name: "Cebeci", m: 0.75 }, { name: "Cumhuriyet", m: 0.75 }, { name: "Esentepe", m: 0.7 }, { name: "Gazi", m: 0.65 }, { name: "Habipler", m: 0.7 }, { name: "İsmetpaşa", m: 0.7 }, { name: "Malkoçoğlu", m: 0.7 }, { name: "Sultançiftliği", m: 0.75 }, { name: "Uğur Mumcu", m: 0.75 }, { name: "Yayla", m: 0.7 }, { name: "Yunus Emre", m: 0.7 }, { name: "Zübeyde Hanım", m: 0.7 }
        ]
    },
    "Şile": {
        baseMult: 0.8,
        neighborhoods: [
            { name: "Ağva Merkez", m: 0.8 }, { name: "Ahmetli", m: 0.8 }, { name: "Balibey", m: 0.85 }, { name: "Çavuş", m: 0.85 }, { name: "Hacı Kasım", m: 0.85 }, { name: "Kumbaba", m: 0.9 }, { name: "Meşrutiyet", m: 0.8 }
        ]
    },
    "Şişli": {
        baseMult: 1.8,
        neighborhoods: [
            { name: "19 Mayıs", m: 2.0 }, { name: "Bozkurt", m: 1.6 }, { name: "Cumhuriyet", m: 1.7 }, { name: "Duatepe", m: 1.6 }, { name: "Ergenekon", m: 1.6 }, { name: "Esentepe", m: 2.3 }, { name: "Eskişehir", m: 1.5 }, { name: "Feriköy", m: 1.6 }, { name: "Fulya", m: 2.1 }, { name: "Gülbahar", m: 1.5 }, { name: "Halaskargazi", m: 1.9 }, { name: "Halide Edip Adıvar", m: 1.6 }, { name: "Halil Rıfat Paşa", m: 1.6 }, { name: "Harbiye", m: 2.0 }, { name: "İnönü", m: 1.6 }, { name: "İzzetpaşa", m: 1.5 }, { name: "Kaptanpaşa", m: 1.6 }, { name: "Kuştepe", m: 1.4 }, { name: "Mahmut Şevket Paşa", m: 1.5 }, { name: "Mecidiyeköy", m: 1.9 }, { name: "Meşrutiyet", m: 1.9 }, { name: "Paşa", m: 1.5 }, { name: "Teşvikiye", m: 2.4 }, { name: "Yayla", m: 1.5 }
        ]
    },
    "Tuzla": {
        baseMult: 0.9,
        neighborhoods: [
            { name: "Aydınlı", m: 0.85 }, { name: "Aydıntepe", m: 0.85 }, { name: "Cami", m: 1.1 }, { name: "Evliya Çelebi", m: 1.0 }, { name: "İçmeler", m: 0.9 }, { name: "İstasyon", m: 1.0 }, { name: "Mescit", m: 0.9 }, { name: "Mimar Sinan", m: 0.85 }, { name: "Orhanlı", m: 0.85 }, { name: "Postane", m: 1.2 }, { name: "Şifa", m: 0.85 }, { name: "Tepeören", m: 1.0 }, { name: "Yayla", m: 1.0 }
        ]
    },
    "Ümraniye": {
        baseMult: 1.2,
        neighborhoods: [
            { name: "Adem Yavuz", m: 1.0 }, { name: "Altınşehir", m: 1.2 }, { name: "Armağanevler", m: 1.2 }, { name: "Aşağı Dudullu", m: 1.1 }, { name: "Atakent", m: 1.3 }, { name: "Atatürk", m: 1.2 }, { name: "Cemil Meriç", m: 1.1 }, { name: "Çakmak", m: 1.2 }, { name: "Çamlık", m: 1.3 }, { name: "Dumlupınar", m: 1.1 }, { name: "Elmalıkent", m: 1.1 }, { name: "Esenevler", m: 1.2 }, { name: "Esenkent", m: 1.2 }, { name: "Esenşehir", m: 1.1 }, { name: "Fatih Sultan Mehmet", m: 1.2 }, { name: "Hekimbaşı", m: 1.0 }, { name: "Huzur", m: 1.1 }, { name: "Ihlamurkuyu", m: 1.2 }, { name: "İnkılap", m: 1.1 }, { name: "İstiklal", m: 1.2 }, { name: "Kazım Karabekir", m: 1.1 }, { name: "Mehmet Akif", m: 1.2 }, { name: "Madenler", m: 1.2 }, { name: "Namık Kemal", m: 1.2 }, { name: "Necip Fazıl", m: 1.2 }, { name: "Parseller", m: 1.1 }, { name: "Saray", m: 1.3 }, { name: "Site", m: 1.3 }, { name: "Şerifali", m: 1.3 }, { name: "Tantavi", m: 1.2 }, { name: "Tatlısu", m: 1.3 }, { name: "Tepeüstü", m: 1.2 }, { name: "Topağacı", m: 1.0 }, { name: "Yamanevler", m: 1.2 }, { name: "Yukarı Dudullu", m: 1.1 }
        ]
    },
    "Üsküdar": {
        baseMult: 1.5,
        neighborhoods: [
            { name: "Acıbadem", m: 2.1 }, { name: "Ahmediye", m: 1.6 }, { name: "Altunizade", m: 2.3 }, { name: "Aziz Mahmud Hüdayi", m: 1.7 }, { name: "Bahçelievler", m: 1.5 }, { name: "Barbaros", m: 1.8 }, { name: "Beylerbeyi", m: 2.2 }, { name: "Bulgurlu", m: 1.4 }, { name: "Burhaniye", m: 1.9 }, { name: "Cumhuriyet", m: 1.4 }, { name: "Çengelköy", m: 2.0 }, { name: "Ferah", m: 1.3 }, { name: "Güzeltepe", m: 1.6 }, { name: "İcadiye", m: 1.8 }, { name: "Kandilli", m: 2.4 }, { name: "Kirazlıtepe", m: 1.3 }, { name: "Kısıklı", m: 1.9 }, { name: "Kuleli", m: 1.8 }, { name: "Kuzguncuk", m: 2.3 }, { name: "Küçük Çamlıca", m: 2.1 }, { name: "Küçüksu", m: 1.6 }, { name: "Mimar Sinan", m: 1.7 }, { name: "Muratreis", m: 1.7 }, { name: "Salacak", m: 2.2 }, { name: "Selamiali", m: 1.6 }, { name: "Selimiye", m: 1.8 }, { name: "Sultantepe", m: 1.9 }, { name: "Ünalan", m: 1.6 }, { name: "Valide-i Atik", m: 1.6 }, { name: "Yavuztürk", m: 1.3 }, { name: "Zeynep Kamil", m: 1.7 }
        ]
    },
    "Zeytinburnu": {
        baseMult: 1.0,
        neighborhoods: [
            { name: "Beştelsiz", m: 1.0 }, { name: "Çırpıcı", m: 0.95 }, { name: "Gökalp", m: 1.0 }, { name: "Kazlıçeşme", m: 1.2 }, { name: "Maltepe", m: 0.9 }, { name: "Merkezefendi", m: 1.1 }, { name: "Nuripaşa", m: 0.95 }, { name: "Seyitnizam", m: 1.0 }, { name: "Sümer", m: 1.0 }, { name: "Telsiz", m: 0.95 }, { name: "Veliefendi", m: 1.0 }, { name: "Yenidoğan", m: 0.95 }, { name: "Yeşiltepe", m: 0.95 }
        ]
    }
};

async function main() {
    console.log('Seeding Comprehensive Istanbul data with precise multipliers...');

    // Create City
    let city = await prisma.city.findUnique({ where: { name: 'İstanbul' } });
    if (!city) {
        city = await prisma.city.create({ data: { name: 'İstanbul' } });
    }

    for (const [distName, distData] of Object.entries(istanbulData)) {
        // Upsert district
        let district = await prisma.district.findFirst({
            where: { name: distName, cityId: city.id }
        });

        if (!district) {
            district = await prisma.district.create({
                data: {
                    name: distName,
                    cityId: city.id
                }
            });
        }

        // Upsert specific neighborhoods
        for (const nb of distData.neighborhoods) {
            let neigh = await prisma.neighborhood.findFirst({
                where: { name: nb.name, districtId: district.id }
            });

            if (!neigh) {
                await prisma.neighborhood.create({
                    data: {
                        name: nb.name,
                        multiplier: nb.m, // high precision multiplier
                        districtId: district.id
                    }
                });
            } else {
                // Update if exists to ensure multipliers are active
                await prisma.neighborhood.update({
                    where: { id: neigh.id },
                    data: { multiplier: nb.m }
                });
            }
        }
        console.log(`Finished ${distName} - Inserted/Updated ${distData.neighborhoods.length} neighborhoods.`);
    }

    console.log('Finished seeding all Istanbul Neighborhoods successfully!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

// Basit In-Memory (LRU tabanlı) IP Hız Sınırlandırıcı
const rateLimitMap = new Map<string, { count: number, resetTime: number }>();

/**
 * IP adresinin belirtilen süre içinde limite ulaşıp ulaşmadığını kontrol eder.
 * @param ip Kullanıcı IP'si
 * @param limit İzin verilen maksimum istek (örn: 5)
 * @param windowMs Milisaniye cinsinden bekleme süresi (örn: 3600000 = 1 saat)
 * @returns boolean true ise geçiş izni ver, false ise engelle.
 */
export function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    // İlk istek
    if (!entry) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
        return true;
    }

    // Süre dolmuşsa sıfırla
    if (now > entry.resetTime) {
        entry.count = 1;
        entry.resetTime = now + windowMs;
        return true;
    }

    // Limit aşılmadıysa arttır
    if (entry.count < limit) {
        entry.count += 1;
        return true;
    }

    // Limit aşıldı!
    return false;
}

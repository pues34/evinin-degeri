import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rateLimit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getEarthquakeRiskForDistrict } from "@/lib/earthquakeData";
import { getLiveMarketIndex } from "@/lib/marketIndex";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions) as any;
  const isProRealtor = session?.user?.role === "realtor" && session?.user?.isPro;
  const ip = req.headers.get("x-forwarded-for") || req.ip || "unknown";

  // Güvenlik Kalkanı: Aynı IP'den saatte en fazla 5 ev değerleme hesaplatılabilir!
  // Eğer PRO Emlakçı ise bu limiti pas geçiyoruz.
  if (!isProRealtor) {
    const isAllowed = checkRateLimit(ip, 5, 3600000);
    if (!isAllowed) {
      return NextResponse.json({ success: false, error: "Ücretsiz limitiniz doldu. Limitsiz sorgulama için Kurumsal Üye (PRO) olun veya 1 saat bekleyin." }, { status: 429 });
    }
  }

  try {
    const body = await req.json();
    const { contactInfo, agreed, aiPhotosBase64, ...propertyData } = body;

    if (!agreed) {
      return NextResponse.json({ success: false, error: "Legal approval required" }, { status: 400 });
    }

    // Güçlü kısıtlama: Telefon VEYA IP bazında (Günde 3 Hak)
    if (!isProRealtor) {
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0);

      let orConditions: any[] = [];
      if (contactInfo?.phone) {
        orConditions.push({ contactInfo: { phone: contactInfo.phone } });
      }

      // Localhost veya unknown dışındaki gerçek IP'leri filtrele
      if (ip && ip !== "unknown" && ip !== "127.0.0.1" && ip !== "::1") {
        orConditions.push({ ipAddress: ip });
      }

      if (orConditions.length > 0) {
        const dailyCount = await prisma.valuationRequest.count({
          where: {
            OR: orConditions,
            createdAt: { gte: midnight }
          }
        });

        if (dailyCount >= 3) {
          return NextResponse.json({
            success: false,
            error: `Bu cihaz veya telefon numarası ile günlük güvenli ücretsiz değerleme limitinizi (3/3) doldurdunuz. Lütfen limitler sıfırlanınca (yarın) tekrar deneyin veya Kurumsal/B2B Üye olun.`
          }, { status: 429 });
        }
      }
    }

    // 1. Dynamic Index For Base Price (Simulating TCMB / Endeksa)
    let baseAnchorPrice = 25000;
    let monthlyInflationRate = 0.035;

    // Multipliers Default Fallbacks
    let mElevator = 1.05;
    let mParking = 1.08;
    let mSecurity = 1.06;
    let mBodrum = 0.80;
    let mKot1 = 0.90;
    let mZemin = 0.95;
    let mUst = 0.95;
    let mCati = 1.15;
    let mMustakil = 1.30;
    let mAra = 1.15;
    let mMutfakKapali = 1.05;
    let mBalkonVar = 1.10;
    let mCiftBanyo = 1.07;
    let bAgeDepreciation = 0.013;
    let mFacadeGuney = 1.05;
    let mFacadeKuzey = 0.95;
    let mSiteIci = 1.15;
    let mYenilenmis = 1.15;
    let mMasrafli = 0.85;
    // V22 New Multipliers
    let mHeatingDogalgaz = 1.03;
    let mHeatingYerden = 1.05;
    let mHeatingSoba = 0.93;
    let mViewDeniz = 1.08;
    let mViewDoga = 1.04;
    let mViewSehir = 1.03;
    let mPropertyDubleks = 1.08;
    let dampeningFactor = 0.55;

    // V3 Toggles
    let enableEarthquake = true;
    let enableMarketIndex = true;
    let enableVision = true;
    let enableRLHF = true;

    try {
      const settings = await prisma.algorithmSettings.findMany();
      settings.forEach((s: any) => {
        if (s.key === "baseSqmPrice") baseAnchorPrice = Number(s.value);
        if (s.key === "inflationRate") monthlyInflationRate = Number(s.value) / 12;
        if (s.key === "elevatorMultiplier") mElevator = Number(s.value);
        if (s.key === "parkingMultiplier") mParking = Number(s.value);
        if (s.key === "securityMultiplier") mSecurity = Number(s.value);
        if (s.key === "multBodrum") mBodrum = Number(s.value);
        if (s.key === "multKot1") mKot1 = Number(s.value);
        if (s.key === "multZemin") mZemin = Number(s.value);
        if (s.key === "multUst") mUst = Number(s.value);
        if (s.key === "multCati") mCati = Number(s.value);
        if (s.key === "multMustakil") mMustakil = Number(s.value);
        if (s.key === "multAra") mAra = Number(s.value);
        if (s.key === "multMutfakKapali") mMutfakKapali = Number(s.value);
        if (s.key === "multBalkonVar") mBalkonVar = Number(s.value);
        if (s.key === "multCiftBanyo") mCiftBanyo = Number(s.value);
        if (s.key === "buildingAgeDepreciation") bAgeDepreciation = Number(s.value);
        if (s.key === "mFacadeGuney") mFacadeGuney = Number(s.value);
        if (s.key === "mFacadeKuzey") mFacadeKuzey = Number(s.value);
        if (s.key === "mSiteIci") mSiteIci = Number(s.value);
        if (s.key === "mYenilenmis") mYenilenmis = Number(s.value);
        if (s.key === "mMasrafli") mMasrafli = Number(s.value);
        // V22
        if (s.key === "mHeatingDogalgaz") mHeatingDogalgaz = Number(s.value);
        if (s.key === "mHeatingYerden") mHeatingYerden = Number(s.value);
        if (s.key === "mHeatingSoba") mHeatingSoba = Number(s.value);
        if (s.key === "mViewDeniz") mViewDeniz = Number(s.value);
        if (s.key === "mViewDoga") mViewDoga = Number(s.value);
        if (s.key === "mViewSehir") mViewSehir = Number(s.value);
        if (s.key === "mPropertyDubleks") mPropertyDubleks = Number(s.value);
        if (s.key === "dampeningFactor") dampeningFactor = Number(s.value);
        // V3
        if (s.key === "enableEarthquake") enableEarthquake = s.value === "true";
        if (s.key === "enableMarketIndex") enableMarketIndex = s.value === "true";
        if (s.key === "enableVision") enableVision = s.value === "true";
        if (s.key === "enableRLHF") enableRLHF = s.value === "true";
      });
    } catch (err) {
      console.warn("Could not load dynamic settings:", err);
    }

    const monthsSinceAnchor = new Date().getMonth() - 0 + (12 * (new Date().getFullYear() - 2026));
    const effectiveMonths = Math.max(0, monthsSinceAnchor);
    let dynamicBaseSqmPrice = baseAnchorPrice * Math.pow((1 + monthlyInflationRate), effectiveMonths);

    const grossSqm = Number(propertyData.grossSqm) || 100;
    let estimatedValue = dynamicBaseSqmPrice * grossSqm;

    // === STRUCTURAL MULTIPLIERS (applied directly, not dampened) ===
    const age = Number(propertyData.buildingAge) || 0;

    // V30: Dynamic Age Depreciation (Progressive scale)
    // Instead of a flat X% per year which kills prices for 30+ year old buildings.
    let totalAgePenalty = 0;

    // First 10 years (Standard drop)
    const earlyAge = Math.min(age, 10);
    totalAgePenalty += (earlyAge * bAgeDepreciation); // e.g. 10 * 0.013 = 13%

    // 11 to 20 years (Slightly slower drop)
    if (age > 10) {
      const midAge = Math.min(age - 10, 10);
      totalAgePenalty += (midAge * (bAgeDepreciation * 0.75)); // e.g. 10 * 0.00975 = ~9.7%
    }

    // > 20 years (Plateau drop, very slow)
    if (age > 20) {
      const lateAge = age - 20;
      totalAgePenalty += (lateAge * (bAgeDepreciation * 0.40)); // e.g. 10 * 0.0052 = ~5.2%
    }

    // Max penalty capped at 45% (to prevent extremely cheap valuations for historic/solid buildings)
    totalAgePenalty = Math.min(totalAgePenalty, 0.45);

    estimatedValue = estimatedValue * (1 - totalAgePenalty);

    const floorType = propertyData.floor || "Ara Kat";

    // Floor type is structural — applied directly
    if (floorType === "Bodrum Kat") estimatedValue *= mBodrum;
    else if (floorType === "Yarı Bodrum / Kot 1") estimatedValue *= mKot1;
    else if (floorType === "Zemin / Giriş Kat") estimatedValue *= mZemin;
    else if (floorType === "En Üst Kat") estimatedValue *= mUst;
    else if (floorType === "Çatı Katı / Dubleks") estimatedValue *= mCati;
    else if (floorType === "Müstakil / Villa") estimatedValue *= mMustakil;
    else estimatedValue *= mAra;

    // Building condition is structural — applied directly
    if (propertyData.buildingCondition === "Yenilenmiş") estimatedValue *= mYenilenmis;
    else if (propertyData.buildingCondition === "Masraflı") estimatedValue *= mMasrafli;

    // === BONUS MULTIPLIERS (dampened to prevent price inflation) ===
    const bonusMultipliers: number[] = [];

    if (propertyData.kitchenType === "Kapalı") bonusMultipliers.push(mMutfakKapali);
    if (propertyData.hasBalcony === "Var") bonusMultipliers.push(mBalkonVar);

    const bathrooms = Number(propertyData.bathrooms) || 1;
    if (bathrooms > 1) bonusMultipliers.push(mCiftBanyo);

    if (propertyData.parking === "Kapalı" || propertyData.parking === "Açık") bonusMultipliers.push(mParking);
    if (propertyData.hasElevator === "Var") bonusMultipliers.push(mElevator);

    if (propertyData.facade === "Güney") bonusMultipliers.push(mFacadeGuney);
    else if (propertyData.facade === "Kuzey") bonusMultipliers.push(mFacadeKuzey);

    if (propertyData.isWithinSite) bonusMultipliers.push(mSiteIci);

    // V22: Heating type
    if (propertyData.heatingType === "Doğalgaz/Kombi") bonusMultipliers.push(mHeatingDogalgaz);
    else if (propertyData.heatingType === "Yerden Isıtma") bonusMultipliers.push(mHeatingYerden);
    else if (propertyData.heatingType === "Soba") bonusMultipliers.push(mHeatingSoba);

    // V22: View / Scenery
    if (propertyData.view === "Deniz") bonusMultipliers.push(mViewDeniz);
    else if (propertyData.view === "Doğa") bonusMultipliers.push(mViewDoga);
    else if (propertyData.view === "Şehir") bonusMultipliers.push(mViewSehir);

    // V22: Property sub-type (dubleks bonus)
    if (propertyData.propertySubType && propertyData.propertySubType !== "Daire") {
      bonusMultipliers.push(mPropertyDubleks);
    }

    // === DAMPENING FORMULA ===
    // Instead of multiplying all bonuses (1.05 * 1.08 * 1.15 * ... = inflated),
    // we sum the bonus portions and apply a dampening factor to keep prices realistic.
    let totalBonusDelta = 0;
    let totalPenaltyDelta = 0;
    bonusMultipliers.forEach(m => {
      if (m >= 1) totalBonusDelta += (m - 1);
      else totalPenaltyDelta += (1 - m);
    });

    // Bonuses are dampened, penalties are applied at 85% (slightly softer for fairness)
    const dampenedBonus = totalBonusDelta * dampeningFactor;
    const dampenedPenalty = totalPenaltyDelta * 0.85;
    const finalBonusMultiplier = 1 + dampenedBonus - dampenedPenalty;

    estimatedValue *= finalBonusMultiplier;

    // Apply Region Multiplier
    let regionMultiplier = 1.0;
    try {
      const neighborhoodRec = await prisma.neighborhood.findFirst({
        where: {
          name: propertyData.neighborhood,
          district: { name: propertyData.district, city: { name: propertyData.city } }
        }
      });
      if (neighborhoodRec && neighborhoodRec.multiplier) {
        regionMultiplier = neighborhoodRec.multiplier;
      }
    } catch (err) {
      console.warn("Could not load location multipliers from DB:", err);
    }

    // Final base value application
    estimatedValue *= regionMultiplier;

    // === MACROECONOMIC (INTEREST RATE) IMPACT ===
    // High mortgage rates (> %3 monthly) generally decrease demand and suppress real house prices.
    // In a real scenario, this would be fetched live from TCMB. For this MVP, we simulate:
    const currentMortgageRate = 3.85; // % monthly
    let macroMultiplier = 1.0;
    if (currentMortgageRate > 3.0) {
      // Rule of thumb: every 1% above 3% drops cash value effectively by ~3%
      const excessRate = currentMortgageRate - 3.0;
      macroMultiplier = 1 - (excessRate * 0.03);
    } else if (currentMortgageRate < 1.5) {
      macroMultiplier = 1.05; // Cheap credit boosts prices
    }
    estimatedValue *= macroMultiplier;

    // === EARTHQUAKE & SOIL RISK INTEGRATION ===
    let earthquakeData: any = null;
    if (enableEarthquake) {
      earthquakeData = getEarthquakeRiskForDistrict(propertyData.city, propertyData.district);
      estimatedValue *= earthquakeData.multiplier;
    }

    // === LIVE MARKET INDEX INTEGRATION ===
    let marketData: any = null;
    if (enableMarketIndex) {
      marketData = getLiveMarketIndex(propertyData.city, propertyData.district);
      estimatedValue *= marketData.suggestedMultiplier;
    }

    // === VISION AI INTEGRATION ===
    let visionMultiplier = 1.0;
    let visionAnalysisText = "Fotoğraf yüklenmediği için standart analiz yapıldı.";

    if (enableVision && aiPhotosBase64 && Array.isArray(aiPhotosBase64) && aiPhotosBase64.length > 0 && process.env.OPENAI_API_KEY) {
      try {
        const contentPayload: any[] = [
          {
            type: "text",
            text: `Sen profesyonel bir gayrimenkul değerleme uzmanısın. Ekteki fotoğrafları inceleyerek evin genel durumu, malzeme kalitesi (lüks, standart, masraflı) ve kondisyonu hakkında yorum yap.
                Özellikle mutfak, banyo ve zemin kaplamalarına dikkat et. Salon boyutları ve ışık alma durumunu değerlendir.
                
                Lütfen dönüşünü SADECE aşağıdaki JSON formatında yap ve başka hiçbir şey yazma:
                {
                    "multiplier": 1.05,
                    "analysis": "Evde birinci sınıf ahşap parke ve özel tasarım ankastre mutfak kullanılmış. Banyo tamamen yenilenmiş ve lüks vitrifiye mevcut. Bu durum evin değerine belirgin bir prim katacaktır."
                }`
          }
        ];

        // Ensure we only process up to 7 photos
        const photosToProcess = aiPhotosBase64.slice(0, 7);

        for (const base64Image of photosToProcess) {
          contentPayload.push({
            type: "image_url",
            image_url: {
              url: base64Image,
              detail: "low"
            }
          });
        }

        const visionResponse = await openai.chat.completions.create({
          model: "gpt-4o-mini", // Use mini for faster vision processing in this context, or gpt-4o if high detail is needed.
          messages: [
            { role: "system", content: "Sen profesyonel bir gayrimenkul değerleme AI uzmanısın. Yalnızca JSON formatında yanıt vermelisin." },
            { role: "user", content: contentPayload }
          ],
          response_format: { type: "json_object" },
          max_tokens: 500,
        });

        const vResultText = visionResponse.choices[0]?.message?.content || "{}";
        const vParsed = JSON.parse(vResultText);

        visionMultiplier = vParsed.multiplier || 1.0;
        visionAnalysisText = vParsed.analysis || "Fotoğraf analizi tamamlandı.";

        // Clamp the vision multiplier to prevent extreme manipulation (e.g., max 25% swing)
        visionMultiplier = Math.min(Math.max(visionMultiplier, 0.75), 1.25);

        estimatedValue *= visionMultiplier; // Apply Vision AI impact immediately

      } catch (err) {
        console.error("Vision AI integration error:", err);
      }
    }

    // 2. OpenAI Integration (JSON Structured Output for Demographics and Summary)
    let aiComment = `Yapay zeka analizini tamamlayamadı. Bölgedeki kentsel dönüşüm ve talebe göre ortalama fiyat: ${new Intl.NumberFormat('tr-TR').format(estimatedValue)} TL olarak değerlendirilmiştir.`;
    let demographicsData: any = { marketCondition: marketData.condition, marketIndex: marketData.indexValue };

    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "buraya-kendi-openai-api-keyinizi-girin") {
      try {
        const prmt = `Sen uzman bir emlak ekspertiz uzmanısın.${propertyData.city} ili, ${propertyData.district} ilçesi, ${propertyData.neighborhood} mahallesinde bulunan, ${age} yaşında, ${propertyData.rooms} oda sayılı, net ${propertyData.netSqm} m2, ${floorType} bir konutu değerlendiriyorsun.Konutun ısıtma tipi: ${propertyData.heatingType || "Bilinmiyor"}, cephesi: ${propertyData.facade || "Bilinmiyor"}, manzarası: ${propertyData.view || "Yok"}. Lokasyon çarpanı ${regionMultiplier}x olarak belirlenmiş.Algoritmik tahmini piyasa değeri: ${new Intl.NumberFormat('tr-TR').format(estimatedValue)} TL.Fotoğraf Analitiği Sonucu(Eğer varsa): ${visionAnalysisText}.

    ÖNEMLİ: Lütfen SADECE geçerli bir JSON formatında cevap ver. Başka hiçbir açıklama yazma. JSON formatı tam olarak şöyle olmalı:
    {
      "aiComment": "Evin özelliklerine, yaşına ve konumuna göre 3 paragraflık profesyonel bir Zillow tarzı yatırımcı/değerleme uzmanı raporu yaz.\n1. Paragraf (Lokasyon ve Mevcut Durum Analizi): Evin ve mahallenin şu anki piyasa durumu, ulaşım avantajları.\n2. Paragraf (Talep Seviyesi ve Kira/Satış Hızı): Mülkün bulunduğu bölgedeki kira/satılık talebi ve satış hızı (likidite).\n3. Paragraf (Gelecek Vizyonu ve Yatırım Potansiyeli): Kentsel dönüşüm, olası değer artışı veya yatırım avantajları.\nYapay zeka olduğunu belli etme, direkt kurumsal ağızla analiz raporu formatında yaz.",
        "demographics": {
        "populationDensity": "Örn: Yoğun Dağılım / Orta / Seyrek",
          "socioEconomicStatus": "Örn: A+ seviye elit / B sınıfı gelişen / C sınıfı vb.",
            "averageAge": "Örn: Genç / Orta Yaş / Emekli Ağırlıklı"
      }
    } `;

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: "Sen profesyonel bir gayrimenkul değerleme uzmanısın ve sadece JSON formatında yanıt verirsin." },
            { role: "user", content: prmt }
          ],
          temperature: 0.7,
        });

        if (completion.choices[0].message.content) {
          const parsed = JSON.parse(completion.choices[0].message.content);
          if (parsed.aiComment) aiComment = parsed.aiComment;
          if (parsed.demographics) demographicsData = { ...demographicsData, ...parsed.demographics };
        }
      } catch (err) {
        console.error("OpenAI Hata:", err);
      }
    }

    // 3. Save directly to DB via Prisma
    const record = await prisma.valuationRequest.create({
      data: {
        city: propertyData.city,
        district: propertyData.district,
        neighborhood: propertyData.neighborhood,
        buildingAge: age,
        totalFloors: Number(propertyData.totalFloors) || 5,
        floor: floorType,
        rooms: propertyData.rooms,
        netSqm: Number(propertyData.netSqm) || 85,
        grossSqm: grossSqm,
        kitchenType: propertyData.kitchenType,
        bathrooms: bathrooms,
        hasBalcony: propertyData.hasBalcony === "Var",
        parking: propertyData.parking,
        facade: propertyData.facade,
        hasElevator: propertyData.hasElevator === "Var",
        isWithinSite: Boolean(propertyData.isWithinSite),
        buildingCondition: propertyData.buildingCondition || "Standart",
        estimatedValue: estimatedValue,
        aiComment: aiComment,
        ipAddress: ip !== "unknown" ? ip : null,
        demographics: demographicsData ? demographicsData : undefined,
        visionAnalysis: aiPhotosBase64 && aiPhotosBase64.length > 0 ? { multiplier: visionMultiplier, text: visionAnalysisText, photoCount: aiPhotosBase64.length } : undefined,
        realtorId: session?.user?.role === "realtor" ? session.user.id : null,
        userId: session?.user?.role === "user" ? session.user.id : null,
        // contactInfo relation stays the same...
        contactInfo: {
          create: {
            fullName: contactInfo.fullName,
            phone: contactInfo.phone,
            email: contactInfo.email,
            kvkkApproved: agreed,
            aiDisclaimerApproved: agreed
          }
        }
      }
    });

    // 4. Send Email via Resend
    if (resend && contactInfo.email) {
      try {
        await resend.emails.send({
          from: "Evinin Değeri <bilgi@evindegeri.com>",
          to: contactInfo.email,
          subject: "Evinizin Değerleme Raporu Hazır!",
          html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333; line-height: 1.6;">
        <div style="text-align: center; padding: 20px 0;">
          <h1 style="color: #2563eb; margin-bottom: 5px;"> Evinin Değeri </h1>
            <p style="color: #64748b; font-size: 14px; margin-top: 0;"> Yapay Zeka Destekli Gayrimenkul Analizi </p>
        </div>

        <div style="background-color: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
                <h2 style="margin-top: 0;"> Merhaba ${contactInfo.fullName}, </h2>
                  <p> Sistemimizi kullandığınız için teşekkür ederiz. Evinizin değerleme hesaplaması yapay zeka ve güncel piyasa çarpanları kullanılarak başarıyla tamamlandı.</p>

                    <div style="background-color: #fff; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #3b82f6; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                      <p style="margin: 0; font-size: 14px; color: #64748b;"><strong>Talep Numarası:</strong> #${(record as any).requestNumber}</p>
                    <h3 style="color: #0f172a; font-size: 24px; margin: 10px 0;">Tahmini Değer: ${new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(estimatedValue)}</h3>
                    
                    ${earthquakeData.riskLevel !== "BİLİNMİYOR" ? `
                    <div style="margin: 15px 0; padding: 10px; background-color: #f1f5f9; border-radius: 6px;">
                        <p style="margin: 0; font-size: 13px; color: #334155;"><strong>Zemin/Deprem Riski:</strong> ${earthquakeData.riskLevel}</p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748b;">${earthquakeData.details}</p>
                    </div>` : ""}
                    
                    <div style="margin: 15px 0; padding: 10px; background-color: #f8fafc; border-radius: 6px; border-left: 3px solid #10b981;">
                        <p style="margin: 0; font-size: 13px; color: #334155;"><strong>Piyasa Durumu:</strong> ${marketData.condition}</p>
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748b;">Bölgedeki canlı ilan endeksi: ${marketData.indexValue}/100. Piyasa hızına göre değerlemeye ${marketData.suggestedMultiplier !== 1.0 ? "%" + Math.round(Math.abs(1 - marketData.suggestedMultiplier) * 100) + " düzeltme" : "nötr etki"} uygulandı.</p>
                    </div>

                    <p style="margin: 0; font-style: italic; color: #475569;"><strong>Yapay Zeka Özeti:</strong> ${aiComment}</p>
                  </div>          </div>

                            <div style="text-align: center; margin-top: 30px;">
                              <a href="https://evindegeri.com/result/${record.id}" style="background-color: #2563eb; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;"> Raporun Tamamını Görüntüle </a>
                            </div>
        </div>

        <div style="font-size: 12px; color: #94a3b8; text-align: justify; padding: 0 10px;">
                                  <p><strong>Yasal Uyarı: </strong> Bu raporda sunulan değerler, bölgesel piyasa verileri ve algoritmik yapay zeka varsayımlarına dayalı tahmini rakamlardır. Sunulan sonuçlar kesin bir ekspertiz raporu niteliği taşımaz ve <strong>kesinlikle bir yatırım tavsiyesi değildir</strong>. Alım - satım kararlarınızda profesyonel lisanslı bir değerleme uzmanına veya gayrimenkul danışmanına başvurmanız önerilir.</p>

                                    <p style="text-align: center; margin-top: 20px;">
                                      Geri bildirimleriniz ve sorularınız için bize ulaşın: <br/>
                                        <a href="mailto:destek@evindegeri.com" style="color: #2563eb; text-decoration: none;"> destek@evindegeri.com</a>
                                          </p>
        </div>
      </div>
      `
        });

        // Send Notification to Admin
        await resend.emails.send({
          from: "Evinin Değeri Sistem <bilgi@evindegeri.com>",
          to: "destek@evindegeri.com", // Admin email
          subject: "Yeni Değerleme Talebi!",
          html: `
                                          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                                            <h2 style="color: #2563eb;"> Yeni Değerleme Oluşturuldu </h2>
                                              <p> Sistem üzerinden yeni bir değerleme raporu oluşturuldu.</p>
                                                <ul style="background: #f8fafc; padding: 15px; border-radius: 8px;">
                                                  <li><strong>Talep No: </strong> #${(record as any).requestNumber}</li>
                                                    <li><strong>Müşteri: </strong> ${contactInfo.fullName}</li>
                                                      <li><strong>E-posta: </strong> ${contactInfo.email}</li>
                                                        <li><strong>Telefon: </strong> ${contactInfo.phone}</li>
                                                          <li><strong>Konum: </strong> ${propertyData.neighborhood}, ${propertyData.district}, ${propertyData.city}</li>
                                                            <li><strong>Tahmini Değer: </strong> ${new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(estimatedValue)}</li>
                                                              </ul>
                                                              <p> Yönetim panelinden Talepler sekmesini inceleyebilirsiniz.</p>
                                                                </div>
                                                                  `
        });

      } catch (e) {
        console.error("Mail gönderme hatası:", e);
      }
    }

    return NextResponse.json({ success: true, id: record.id, requestNumber: (record as any).requestNumber, estimatedValue });
  } catch (error: any) {
    console.error("Valuation Error:", error);
    return NextResponse.json({ success: false, error: "Sunucu hatası oluştu." }, { status: 500 });
  }
}

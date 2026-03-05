import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rateLimit";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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
    const { contactInfo, agreed, ...propertyData } = body;

    if (!agreed) {
      return NextResponse.json({ success: false, error: "Legal approval required" }, { status: 400 });
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
    let mCati = 1.25;
    let mMustakil = 1.50;
    let mAra = 1.15;
    let mMutfakKapali = 1.05;
    let mBalkonVar = 1.10;
    let mCiftBanyo = 1.07;
    let bAgeDepreciation = 0.01;
    let mFacadeGuney = 1.05;
    let mFacadeKuzey = 0.95;
    let mSiteIci = 1.15;
    let mYenilenmis = 1.15;
    let mMasrafli = 0.85;

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
      });
    } catch (err) {
      console.warn("Could not load dynamic settings:", err);
    }

    const monthsSinceAnchor = new Date().getMonth() - 0 + (12 * (new Date().getFullYear() - 2026));
    // If we're evaluating something in early 2026, the inflation multiplier should be small or 0 for the base year. 
    // We prevent negative months if someone evaluates in Jan 2026 but anchor was meant to be mid-2026.
    const effectiveMonths = Math.max(0, monthsSinceAnchor);
    let dynamicBaseSqmPrice = baseAnchorPrice * Math.pow((1 + monthlyInflationRate), effectiveMonths);

    const grossSqm = Number(propertyData.grossSqm) || 100;
    let estimatedValue = dynamicBaseSqmPrice * grossSqm;

    const age = Number(propertyData.buildingAge) || 0;
    estimatedValue = estimatedValue * (1 - (age * bAgeDepreciation));

    const floorType = propertyData.floor || "Ara Kat";
    const totalFloors = Number(propertyData.totalFloors) || 5;

    // String-based Floor Multipliers (V7)
    if (floorType === "Bodrum Kat") estimatedValue *= mBodrum;
    else if (floorType === "Yarı Bodrum / Kot 1") estimatedValue *= mKot1;
    else if (floorType === "Zemin / Giriş Kat") estimatedValue *= mZemin;
    else if (floorType === "En Üst Kat") estimatedValue *= mUst;
    else if (floorType === "Çatı Katı / Dubleks") estimatedValue *= mCati;
    else if (floorType === "Müstakil / Villa") estimatedValue *= mMustakil;
    else estimatedValue *= mAra; // Ara Kat (Default)

    if (propertyData.kitchenType === "Kapalı") estimatedValue *= mMutfakKapali;
    if (propertyData.hasBalcony === "Var") estimatedValue *= mBalkonVar;

    const bathrooms = Number(propertyData.bathrooms) || 1;
    if (bathrooms > 1) estimatedValue *= mCiftBanyo;

    // Dynamic Extra Multipliers Applied Here
    if (propertyData.parking === "Kapalı" || propertyData.parking === "Açık") {
      estimatedValue *= mParking;
    }
    if (propertyData.hasElevator === "Var") {
      estimatedValue *= mElevator;
    }

    if (propertyData.facade === "Güney") estimatedValue *= mFacadeGuney;
    else if (propertyData.facade === "Kuzey") estimatedValue *= mFacadeKuzey;

    if (propertyData.isWithinSite) estimatedValue *= mSiteIci;

    if (propertyData.buildingCondition === "Yenilenmiş") estimatedValue *= mYenilenmis;
    else if (propertyData.buildingCondition === "Masraflı") estimatedValue *= mMasrafli;

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

    // Final value application
    estimatedValue *= regionMultiplier;

    // 2. OpenAI Integration (JSON Structured Output for Demographics)
    let aiComment = `Yapay zeka analizini tamamlayamadı. Bölgedeki kentsel dönüşüm ve talebe göre ortalama fiyat: ${new Intl.NumberFormat('tr-TR').format(estimatedValue)} TL olarak değerlendirilmiştir.`;
    let demographicsData = null;

    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== "buraya-kendi-openai-api-keyinizi-girin") {
      try {
        const prmt = `Sen uzman bir emlak ekspertiz uzmanısın. ${propertyData.city} ili, ${propertyData.district} ilçesi, ${propertyData.neighborhood} mahallesinde bulunan, ${age} yaşında, ${propertyData.rooms} oda sayılı, net ${propertyData.netSqm} m2, ${floorType} bir konutu değerlendiriyorsun. Lokasyon çarpanı ${regionMultiplier}x olarak belirlenmiş. Tahmini piyasa değeri: ${new Intl.NumberFormat('tr-TR').format(estimatedValue)} TL.

ÖNEMLİ: Lütfen SADECE geçerli bir JSON formatında cevap ver. Başka hiçbir açıklama yazma. JSON formatı tam olarak şöyle olmalı:
{
  "aiComment": "Evin özelliklerine, yaşına ve mahallenin gayrimenkul talebine değinen, maksimum 3 cümlelik profesyonel analiz yorumu.",
  "demographics": {
    "populationDensity": "Örn: Yoğun Dağılım / Orta / Seyrek",
    "socioEconomicStatus": "Örn: A+ seviye elit / B sınıfı gelişen / C sınıfı vb.",
    "averageAge": "Örn: Genç / Orta Yaş / Emekli Ağırlıklı"
  }
}`;

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
          if (parsed.demographics) demographicsData = parsed.demographics;
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
        totalFloors: totalFloors,
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
        demographics: demographicsData ? demographicsData : undefined,
        realtorId: session?.user?.role === "realtor" ? session.user.id : null,
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
          from: "Evinin Değeri <bilgi@evinin-degeri.com>",
          to: contactInfo.email,
          subject: "Evinizin Değerleme Raporu Hazır!",
          html: `
            <h1>Merhaba ${contactInfo.fullName},</h1>
            <p>Evinizin değerleme hesaplaması tamamlandı.</p>
            <h3>Tahmini Değer: ${new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(estimatedValue)}</h3>
            <p>Yapay Zeka Analizi: ${aiComment}</p>
            <br/>
            <p>Raporunuzu detaylı incelemek için: <a href="https://evinin-degeri.com/result/${record.id}">tıklayın</a></p>
          `
        });
      } catch (e) {
        console.error("Mail gönderme hatası:", e);
      }
    }

    return NextResponse.json({ success: true, id: record.id, estimatedValue });
  } catch (error: any) {
    console.error("Valuation Error:", error);
    return NextResponse.json({ success: false, error: "Sunucu hatası oluştu." }, { status: 500 });
  }
}

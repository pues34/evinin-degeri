const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const blogs = [
    {
        title: "2026 Yılında İstanbul Emlak Piyasasını Neler Bekliyor?",
        slug: "2026-istanbul-emlak-piyasasi-beklentiler",
        summary: "2026 yılı, İstanbul emlak sektörü için yeni dinamikler ve fırsatlar sunuyor. Kentsel dönüşüm, yeni metro hatları ve faiz oranlarındaki olası değişikliklerin piyasaya etkilerini inceliyoruz.",
        content: `
            <h2>2026'da İstanbul'un Emlak Haritası</h2>
            <p>İstanbul, 2026 yılına doğru ilerlerken emlak piyasasında köklü değişikliklere hazırlanıyor. Özellikle kentsel dönüşüm ivmesinin artması, şehrin çehresini yenilerken yatırımcılara da yeni fırsatlar sunuyor.</p>
            <h3>Ön Plana Çıkacak Bölgeler</h3>
            <p>Yeni ulaşım ağlarının hayata geçmesiyle birlikte, özellikle Arnavutköy, Çekmeköy ve Pendik gibi bölgelerde konut taleplerinin artması bekleniyor. Yatırımcılar için değerlenme potansiyeli yüksek bu semtler, mercek altına alınmalı.</p>
            <h3>Kira Getirilerinde Ne Beklemeliyiz?</h3>
            <p>Mega kentte artan nüfus yoğunluğu, kiralık konut piyasasını her zaman canlı tutuyor. 2026 projeksiyonlarına göre, nitelikli ve depreme dayanıklı konutlarda kira çarpanlarının avantajlı seyretmesi öngörülüyor.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1541888088019-906cb87b41ed?q=80&w=1200"
    },
    {
        title: "Ev Satarken Dikkat Edilmesi Gereken 5 Altın Kural",
        slug: "ev-satarken-dikkat-edilmesi-gereken-5-altin-kural",
        summary: "Evinizi satarken değer kaybı yaşamamak ve süreci hızlandırmak için uzmanların önerdiği en kritik 5 ipucunu sizin için derledik.",
        content: `
            <h2>Doğru Değerleme Her Şeyin Başıdır</h2>
            <p>Bir evi satarken yapılabilecek en büyük hata, duygusal bağ kurarak piyasa gerçeklerinden uzak bir fiyat belirlemektir. <b>Evinin Değeri</b> platformunu kullanarak yapay zeka destekli, tamamen ücretsiz ve anında evinizin gerçek değerini öğrenebilirsiniz.</p>
            <h3>1. Profesyonel Fotoğraf Çekimi</h3>
            <p>Alıcıların dikkatini ilk çeken şey evin fotoğraflarıdır. Aydınlık, temiz ve geniş açılı çekilmiş fotoğraflar evin cazibesini artırır.</p>
            <h3>2. Küçük Tadilatlarla Büyük Fark Yaratın</h3>
            <p>Boya badana, bozulan muslukların tamiri veya sarkan kapı kollarının düzeltilmesi gibi ufak dokunuşlar, alıcıda güven hissi uyandırır.</p>
            <h3>3. Evi Ferah ve Boş Tutun</h3>
            <p>Kişisel eşyalarınızı ortadan kaldırmak, alıcının kendi eşyalarıyla evi hayal etmesini kolaylaştıracaktır.</p>
            <h3>4. Doğru Emlak Profesyoneliyle Çalışın</h3>
            <p>Süreci yönetmek yorucu olabilir. Uzman bir emlak danışmanı satışı hızlandırır ve sizi olası hukuki stresten kurtarır.</p>
            <h3>5. Esnek Olmaktan Çekinmeyin</h3>
            <p>Gösterim saatleri konusunda ne kadar esnek olursanız, evi o kadar çok kişiye gösterebilirsiniz.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200"
    },
    {
        title: "Konut Kredisi Faiz Oranları: 2026'da Düşüş Bekleniyor mu?",
        slug: "konut-kredisi-faiz-oranlari-2026-beklentisi",
        summary: "Yüksek faiz dönemi son bulacak mı? Ekonomi uzmanlarının 2026 konut kredisi faiz oranı beklentileri ve konut alım fırsatlarına dair analizleri.",
        content: `
            <h2>Kredi Piyasasında Son Durum</h2>
            <p>Son dönemde uygulanan sıkı para politikaları nedeniyle konut kredisi faizleri oldukça yüksek seyrediyor. Bu durum hem sıfır hem de ikinci el konut satışlarında gözle görülür bir yavaşlamaya sebep oldu.</p>
            <h3>2026'ya Doğru Faiz Beklentileri</h3>
            <p>Merkez bankalarının enflasyonla mücadele sürecindeki gelişmeler ve küresel makroekonomik veriler ışığında, uzmanlar 2025'in son çeyreği itibarıyla yavaş bir gevşeme sürecine girilebileceğini öngörüyor. 2026 yılında ise faizlerin psikolojik sınırların altına inmesi durumunda piyasada yeniden bir canlanma yaşanması bekleniyor.</p>
            <h3>Alım İçin Doğru Zaman Ne Zaman?</h3>
            <p>Kimi yatırımcı fiyatların görece durağan olduğu bu dönemi fırsat bilip, gelecekte yapılandırma şansını değerlendirmek üzere peşin ya da yüksek oranlı krediyle şimdiden alım yapmayı tercih ediyor.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=1200"
    },
    {
        title: "Ev Alma Rehberi: Sıfır Daire mi, İkinci El Daire mi?",
        slug: "sifir-daire-mi-ikinci-el-daire-mi",
        summary: "Sıfır dairelerin avantajları nelerdir? İkinci el daire alırken nelere dikkat edilmeli? Yatırım ve oturum amaçlı detaylı konut alma rehberi.",
        content: `
            <h2>Karar Verirken Göz Önünde Bulundurulması Gerekenler</h2>
            <p>Bir ev satın almaya karar verildiğinde ilk karşılaşılan ikilem, yeni (sıfır) bir yapıya mı girmek yoksa mevcut (ikinci el) bir konutu mu değerlendirmek gerektiğidir. Her iki seçeneğin de hem avantajları hem de dezavantajları bulunmaktadır.</p>
            <h3>Sıfır Daire Almanın Avantajları</h3>
            <p>1. <b>Modern Mimari ve Enerji Verimliliği:</b> Yeni projeler en son teknoloji ve yalıtım standartlarına göre yapılır.<br/>
            2. <b>Masrafsızlık:</b> Tesisat, boya veya yapısal yenilemeye ilk yıllarda ihtiyaç duyulmaz.<br/>
            3. <b>Deprem Güvenliği:</b> En güncel deprem yönetmeliklerine uygun inşa edilirler.</p>
            <h3>İkinci El Daire Kullanımının Avantajları</h3>
            <p>1. <b>Fiyat Avantajı:</b> Aynı lokasyonda sıfır bir daireye kıyasla daha geniş metrekareleri daha uygun fiyata bulabilirsiniz.<br/>
            2. <b>Oturmuş Komşuluk:</b> Sitenin veya apartmanın genel yapısını ve komşuluk ilişkilerini öngörebilirsiniz.<br/>
            3. <b>Anında Taşınılabilirlik:</b> Tamamlanmayı bekleyen projelerdeki belirsizlikleri yaşamazsınız.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200"
    },
    {
        title: "Kentsel Dönüşüm Hızlanıyor: Yarısı Bizden Kampanyası Detayları",
        slug: "kentsel-donusum-yarisi-bizden-kampanyasi",
        summary: "Devlet destekli 'Yarısı Bizden' kentsel dönüşüm kampanyası nedir? Kimler başvurabilir ve süreç nasıl işleyecek? Detayları açıklıyoruz.",
        content: `
            <h2>Depreme Hazırlıkta Büyük Adım: Yarısı Bizden</h2>
            <p>Olası Marmara depremine hazırlık kapsamında Çevre, Şehircilik ve İklim Değişikliği Bakanlığı öncülüğünde hayata geçirilen 'Yarısı Bizden' kampanyası, riskli yapıların hızla güvenli hale getirilmesi için tarihi bir fırsat sunuyor.</p>
            <h3>Avantajlar Neler?</h3>
            <p>Devlet, inşaat maliyetinin yarısını hibe ve uygun faizli kredi şeklinde karşılayarak vatandaşın ekonomik yükünü hafifletiyor. Ayrıca süreç boyunca sağlanan kira yardımları ile mağduriyetlerin önüne geçilmesi hedefleniyor.</p>
            <h3>Başvuru Şartları Nelerdir?</h3>
            <p>Öncelikle binanın riskli yapı tespitinin yapılmış olması gerekiyor. Binada bulunan hak sahiplerinin belirli çoğunluk ile anlaşması durumunda sisteme entegrasyon sağlanabiliyor. İstanbul için hedeflenen yoğunluk, risk haritasına göre kademelendirilmiş durumda.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=1200"
    },
    {
        title: "Yapay Zeka ile Ev Değerlemesi Nasıl Yapılır?",
        slug: "yapay-zeka-ile-ev-degerlemesi-nasil-yapilir",
        summary: "Emlak sektöründe dijital devrim başlıyor. Evinizin değerini belirlerken yapay zekanın sağladığı hız, doğruluk ve kolaylıklar nelerdir?",
        content: `
            <h2>Geleneksel Değerlemeden Yapay Zekaya</h2>
            <p>Geleneksel emlak değerlemesi genellikle güncel olmayan emsal fiyatları, kişisel önyargılar veya eksik veri gibi hatalı sonuçlar üretebilecek etmenler barındırıyordu. Günümüzde ise büyük veri (Big Data) ve makine öğrenimi algoritmaları bu süreci kökten değiştirdi.</p>
            <h3>Veriler Nasıl Analiz Ediliyor?</h3>
            <p>Yapay zeka motorları, sadece sizin girdiğiniz metrekare, oda sayısı gibi özelliklere değil; aynı zamanda:</p>
            <ul>
                <li>Bölgenin son 5 yıllık fiyat trendlerine,</li>
                <li>Mahalledeki sosyo-ekonomik yapıya,</li>
                <li>Hastanelere, otoyollara ve okullara olan yakınlığa,</li>
                <li>Gelecekteki ulaşım (metro vs.) projelerine</li>
            </ul>
            <p>kadar milyonlarca veri noktasını anlık olarak tarar.</p>
            <h3>Saniyeler İçinde Sonuç</h3>
            <p><b>Evinin Değeri</b> platformumuz, yukarıda sayılan tüm bu kompleks işlemleri arka planda saniyeler içerisinde yaparak sizlere piyasa şartlarındaki en makul değeri sunmaktadır.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
    },
    {
        title: "Ev Sahipleri İçin Kira Vergi Beyannamesi Rehberi 2026",
        slug: "kira-gelir-vergisi-beyannamesi-rehberi",
        summary: "Kira geliri elde eden mülk sahiplerinin bilmesi gereken istisna tutarları, vergi dilimleri ve beyanname hazırlama ipuçları.",
        content: `
            <h2>Kira Geliri Vergilendirmesi</h2>
            <p>Her yıl gayrimenkul sermaye iradı elde eden vatandaşların Mart ayı içerisinde ilgili vergi dairelerine veya dijital ortamdan beyannamelerini iletmeleri gerekmektedir.</p>
            <h3>İstisna Tutarı ve Uygulama</h3>
            <p>Konut kira gelirlerinde uygulanan bir istisna tutarı bulunur, ancak bu gelirin tamamı istisna sınırının üzerinde ise belli bir hesaplamaya tabi tutulur. İlgili yıldaki sınırların ve oranların doğru tespit edilmesi, cezai yaptırımlardan kaçınmak için hayati önem taşır.</p>
            <h3>Götürü Gider vs. Gerçek Gider</h3>
            <p>Mülk sahipleri beyanname verirken, ev için yaptıkları onarım ve yasal harcamaları belgeleyebiliyorsa "Gerçek Gider" yöntemini seçebilir. Belge ibrazı yapılamıyorsa, yüzde 15 oranında "Götürü Gider" düşülerek vergi matrahı belirlenir.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1200"
    },
    {
        title: "Depreme Dayanıklı Ev Nasıl Anlaşılır? Kontrol Edilmesi Gerekenler",
        slug: "depreme-dayanikli-ev-nasil-anlasilir",
        summary: "Konut alırken aklınıza takılan en önemli soru: Bu ev depreme ne kadar güvenli? Binanın yapısal sağlamlığını anlamak için basit kontroller.",
        content: `
            <h2>Zemin ve Proje Uyumu</h2>
            <p>Güvenilir bir evin ilk aşaması sağlam bir zemine ve uygun projelendirilmiş bir temel yapısına dayanmasıdır. Özellikle satın alınacak evin projesinin ve ruhsat bilgilerinin E-Devlet üzerinden kontrol edilmesi gerekmektedir.</p>
            <h3>Görünen Hasarlar ve Nem</h3>
            <p>Kolon ve kirişlerde oluşan gözle görülür çatlaklar ciddiye alınmalıdır. Ayrıca bodrum katlarda yoğun rütubet olup olmadığı incelenmeli, korozyon etkisi kolon demirlerine ne ölçüde tesir etmiş bakılmalıdır.</p>
            <h3>Karot Testi Şart mı?</h3>
            <p>Mevcut bir binada oturuluyorsa veya eski bir yapı alınıyorsa uzman mühendislik firmalarına yapı denetimi ve karot testi yaptırılması, en bilimsel ve kesin sonucu verecektir.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200"
    },
    {
        title: "Müstakil Yaşama Dönüş: Arsa Yatırımı İçin Kazandıran Bölgeler",
        slug: "müstakil-yasam-arsa-yatirimi-kazandiran-bolgeler",
        summary: "Pandemi ile artan müstakil yaşam ihtiyacı sürüyor mu? Ev yerine arsa yatırımı yaparak kendi konutunu inşa etmek isteyenlere bölgesel tavsiyeler.",
        content: `
            <h2>Şehirden Kaçış İsteği</h2>
            <p>Özellikle izole yaşam alanlarına duyulan ihtiyaç, doğayla iç içe müstakil projelerin popülerliğini canlı tutmaya devam ediyor. Boş arsalara yatırım yapıp prefabrik veya Tiny House tarzı yapılarla değerlendirme trendi büyüyor.</p>
            <h3>Marmara Bölgesinde Öne Çıkan Lokasyonlar</h3>
            <p>Kuzey Ege fay kırıklarının yoğunluğunun aksine, Yalova, Kırklareli, Çanakkale çevre köyleri ve Sakarya'nın kırsal alanları arsa/tarla yatırımlarında ivme kazanıyor. Altyapı özelliklerine ve imar durumuna göre doğru yatırım kısa vadede yüksek prim potansiyeli taşıyor.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200"
    },
    {
        title: "Konut Yatırımı vs Borsa: Hangisi Daha Güvenli Bir Liman?",
        slug: "konut-yatirimi-borsa-karsilastirmasi",
        summary: "Uzun vadede paranın değerini korumak için gayrimenkule mi yoksa hisse senetlerine mi yönelmeli? Riskler, avantajlar ve kazanç kıyaslamaları.",
        content: `
            <h2>Geleneksel Güven mi, Agresif Büyüme mi?</h2>
            <p>Türk toplumunun klasik defansif yatırımı "Toprak ve Tuğla" günümüzde hisse senetleri (Borsa) ve kripto varlıklarla sıkı bir rekabet içerisinde.</p>
            <h3>Emlak Yatırımının Gücü</h3>
            <p>Bir konut satın aldığınızda yalnızca potansiyel değer artışından (enflasyon kalkanı) kazanmakla kalmazsınız, aynı zamanda düzenli bir pasif kira geliri modeli de oluşturmuş olursunuz. Ancak likiditesi düşüktür; anlık nakit ihtiyacında satışı uzun sürebilir.</p>
            <h3>Borsanın Avantajları</h3>
            <p>Borsa ise oldukça likittir; saniyeler içerisinde varlıklarınızı nakde çevirebilirsiniz. Temettü ödeyen şirketlerle gelir yaratılabilir ama kriz dönemlerinde veya siyasi belirsizliklerde çok ciddi ve hızlı değer kaybı riskine maruz kalınabilir.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200"
    },
    {
        title: "Tapu Masraflarını Kim Öder? Alıcı mı Satıcı mı?",
        slug: "tapu-masraflarini-kim-oder",
        summary: "Ev alım satım işlemlerinde en çok çıkan tartışma noktalarından biri olan tapu harçlarını yasalar çerçevesinde mercek altına alıyoruz.",
        content: `
            <h2>Tapu Harcı Ne Kadar?</h2>
            <p>Gayrimenkul devir işlemlerinde hem alıcı hem de satıcı taraf devir bedeli (beyan edilen satış bedeli) üzerinden belirli oranda tapu harcı ödemekle yükümlüdür.</p>
            <h3>Kanun Ne Diyor?</h3>
            <p>İlgili yasaya göre tapu harcı %4 olarak tahsil edilir ve bu harcın %2'si alıcıдан, %2'si ise satıcıdan temin edilir. Buna ek olarak Döner Sermaye Bedeli de mevcuttur ve genelde alıcı tarafından karşılandığı yaygın bir sektör pratiğidir.</p>
            <h3>Anlaşmalar ve Gerçek Pratikler</h3>
            <p>Her ne kadar yasa adil bölüşüm öngörse de, serbest piyasa koşullarında pazarlığa bağlı olarak alıcının harcın tamamını üstlendiği senaryolar da çok sık yaşanmaktadır. İşleme başlamadan önce bu konunun netleştirilmesi uyuşmazlıkları engelleyecektir.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1200"
    },
    {
        title: "2026 Emlak Trendleri: Akıllı Evlerin Yükselişi",
        slug: "2026-emlak-trendleri-akilli-evler",
        summary: "Yeni nesil teknolojilerin konut projelerine entegrasyonu. Enerji verimli, sesli komutla çalışan lüks akıllı evler standart hale mi geliyor?",
        content: `
            <h2>Nesnelerin İnterneti (IoT) Evlerimize Giriyor</h2>
            <p>Artık sabahları siz uyanmadan panjurlarınızı açan, hava durumuna göre klimayı ayarlayan ve uzaktan kameralara erişim imkanı sunan evler bilim kurgu olmaktan çıktı.</p>
            <h3>Akıllı Ev Satış Hızı</h3>
            <p>Özellikle güvenlik ve enerji verimliliği sağlayan entegre akıllı sistemlere (örneğin akıllı kombiler ve aydınlatmalar) sahip konutlar, ikinci el piyasasında benzer emsallerine göre ortalama %10-15 aralığında daha hızlı alıcı bulabiliyor ve daha değerli konumlanıyor.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1200"
    },
    {
        title: "Arabuluculuk Şartı: Kiracı-Ev Sahibi Anlaşmazlıkları Nasıl Çözülür?",
        slug: "kiraci-ev-sahibi-arabuluculuk-sistemi",
        summary: "Kiracı tahliyesi ve kira tespit davalarında zorunlu hale gelen arabuluculuk dönemi. Sürecin işleyişi ve mahkemeye gitmeden çözüm yolları.",
        content: `
            <h2>Yargı Yükünü Hafifleten Sistem</h2>
            <p>Kira hukuku kapsamında açılan milyonlarca dosyanın yargı sistemini yavaşlatması üzerine getirilen "Zorunlu Arabuluculuk" şartı, tarafların uzlaşmasını hızlandırmayı amaçlıyor.</p>
            <h3>Süreç Nasıl Başlıyor?</h3>
            <p>Dava açmadan evvel adliyelerdeki arabuluculuk bürolarına başvuru yapılır. Rastgele atanan uzman arabulucu, tarafları güvenli bir iletişim ortamında bir araya getirerek müşterek noktaları bulmaya çalışır. Gizlilik esastır.</p>
            <h3>Anlaşma Sağlanamazsa?</h3>
            <p>Tarafların masadan anlaşmadan kalkması durumunda tanzim edilen "Anlaşamama Tutanağı" ile her iki taraf da mahkeme yoluna giderek yasal haklarını aramaya başlayabilir.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1589829085413-56de2ae18c73?q=80&w=1200"
    },
    {
        title: "Kredi Notu Düşük Olanlar Konut Kredisi Alabilir Mi?",
        slug: "kredi-notu-dusuk-olanlar-kredi-alabilir-mi",
        summary: "Banka kredi skoru düşük veya sicili bozuk olan tüketiciler ev sahibi olmak için hangi alternatif finansman veya ödeme yöntemlerini kullanabilir?",
        content: `
            <h2>Kredi Skoru Nedir?</h2>
            <p>Geçmiş tüm bankacılık faaliyetlerinizin (Kredi kartı ödemeleri, gecikmeler vb.) KKB ekranında aritmetik olarak hesaplanmış risk puanıdır.</p>
            <h3>Skorunuzu Yükseltmenin Yolları</h3>
            <p>Düşük bir skoru düzeltmek zaman alır. Düzenli olarak düşük limitli bir kredi kartını kullanıp asgari ödemenin üzerinde ödemeler yapmak, faturaları otomatiğe bağlamak notu yukarı yönlü ivmelendirir.</p>
            <h3>Alternatif Satın Alma: Senetli Modeller</h3>
            <p>Bankalardan kredi onayı alamayan alıcılar, faizsiz finansman sağlayan tasarruf sistemlerini veya doğrudan inşaat firmalarının sunduğu "Ön Ödemeli (Senetli) Ev Satış" kampanyalarını değerlendirebilir.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?q=80&w=1200"
    },
    {
        title: "Emlak Danışmanı ile Çalışmanın Avantajları",
        slug: "emlak-danismani-ile-calismanin-avantajlari",
        summary: "Profesyonel destek size para ve zaman mı kazandırır? Güvenilir bir gayrimenkul ofisi ile sözleşme yapmanın tüm artı yanları.",
        content: `
            <h2>Pazar Hakimiyeti</h2>
            <p>Siz evinizi senede veya hayatınızda on yılda bir kez satarken; emlak profesyonelleri piyasayı, o bölgedeki net rayiç bedellerini saniye saniye takip eder.</p>
            <h3>Risk Yönetimi ve Sözleşmeler</h3>
            <p>Elinizi sıkıştıran bir alıcıdan korunmak, sahte kaparolara aldanmamak ve resmi makamlardaki pürüzleri atlatmak tamamen lisanslı bir Broker'ın işidir.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1200"
    },
    {
        title: "Türkiye'de Yabancıların Gayrimenkul Alım Şartları 2026",
        slug: "yabanciya-satıs-sartlari-vatandaslik",
        summary: "Vatandaşlık için uygulanan değerleme sınırları ve yabancı satışlarındaki son düzenlemeler. Emlak piyasasındaki yabancı etkisi.",
        content: `
            <h2>Değişen Limitler</h2>
            <p>Yabancıların Türk gayrimenkulünden edinim karşılığı istisnai vatandaşlık alma hakkı zaman içerisinde farklı parasal limitlere güncellendi.</p>
            <h3>Değerleme Raporu Şartı</h3>
            <p>Uygulamada işlemlerin SPK lisanslı bağımsız değerleme şirketleri üzerinden alınan ekspertiz raporlarıyla şeffaf şekilde yönetilmesine karar verilmiştir.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1526439187849-f06b6ea82a45?q=80&w=1200"
    },
    {
        title: "Tiny House (Mikro Ev) Almadan Önce Bilmeniz Gerekenler",
        slug: "tiny-house-almadan-once-bilinmesi-gerekenler",
        summary: "Minimal yaşamın yükselen yıldızı Tiny House'lar yasal olarak nereye konulabilir? Ruhsat işlemleri ve imar kuralları hakkında detaylar.",
        content: `
            <h2>Tekerlekli Karavan mı, Sabit Ev mi?</h2>
            <p>Bir Tiny House plaka ve ruhsat sahibi olduğunda karavan statüsünde değerlendirilerek Karayolları mevzuatına tabi olur ve imarsız arazilere park edilebilir.</p>
            <h3>Şebeke Bağlantıları ve Fosseptik</h3>
            <p>Taşınabilir olduğunda dahi temiz su ve gider hattına ihtiyacınız olacağı gerçeğiyle planlamanızı yapmalısınız. Solar güneş panelleriyle off-grid bir sistem kurmak avantajlıdır.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200"
    },
    {
        title: "Home Ofis Çalışanlar İçin En İyi Semt Seçimi",
        slug: "home-ofis-calisanlar-icin-en-iyi-semt",
        summary: "Uzaktan çalışma kültürünün yaygınlaşmasıyla birlikte şehrin merkezine değil, yaşam kalitesine odaklanan profesyoneller için lokasyon tavsiyeleri.",
        content: `
            <h2>Fiber İnternet ve Sessizlik Arayışı</h2>
            <p>Artık her gün maslak hattına gitmek zorunda olmayan profesyoneller, yeşile yakın, kafe kültürü gelişmiş ama aynı zamanda yüksek hızlı internet omurgasına sahip bölgeleri keşfediyor.</p>
            <h3>Şile'den Datça'ya</h3>
            <p>Sadece İstanbul içi değil, Ege ve Akdeniz kasabalarında yıl boyu uzun dönem kiralama trendi remote çalışanlar sayesinde patlama yaşadı.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1593642532400-2682810df593?q=80&w=1200"
    },
    {
        title: "Kış Bahçesi veya Kapalı Balkon Yaparken Yasal Sınırlar",
        slug: "kis-bahcesi-kapali-balkon-yasal-sinirlar",
        summary: "Evinizin kullanım alanını genişletmek amacıyla kapattığınız alanlar belediyeler tarafınca kaçak yapı statüsüne düşer mi?",
        content: `
            <h2>Balkonu Camla Kapatmak Suç Mu?</h2>
            <p>Kat Mülkiyeti Kanunu uyarınca, binanın dış cephe görünümünü değiştirecek sabit müdahalelerde komşuların yazılı izni gerekir. Ancak katlanabilir şeffaf cam sistemler genellikle dış cephenin statiğini bozmadığı için içtihatlarda kabul görebilmektedir.</p>
            <h3>Teras Kapatırken İmar Sınırı</h3>
            <p>Arka terası çatıyla, sökülemeyecek çelik iskeletlerle kapatmak mevcut yapının tavan yüksekliği veya çekme mesafesini etkiliyorsa Belediye Encümeninden para cezası veya yıkım kararı riskini taşır.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1510627498534-cf7e9002facc?q=80&w=1200"
    },
    {
        title: "Güvenli ve Kazançlı Öğrenci Evine Yatırım",
        slug: "ogrenci-evi-kiralik-yatirim",
        summary: "Üniversite kampüslerinin çevresinde gerçekleştirilecek stüdyo ve 1+1 yatırımlarının geri dönüş (Amortisman) süreleri neden daha caziptir?",
        content: `
            <h2>Yüksek Kira Sürdürülebilirliği</h2>
            <p>Eğitim kurumlarının etrafında kurulan ekosistemler yüksek sirkülasyona tabidir. 1+1 tarzı konutlar genellikle her öğretim döneminde anında kiralanmaktadır.</p>
            <h3>Doğru Oda/Demirbaş Planlaması</h3>
            <p>Beyaz eşyalı, internet donanımlı ve kombili teslim edilen evler öğrenciden ve veliden çok daha kolay talep toplar ve %20 daha yüksek fiyatlara realize olabilir. Kısa amortisman süresi, buradaki temel motivasyondur.</p>
        `,
        imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200"
    }
];

async function main() {
    console.log("Seeding 20 SEO optimized blog posts...");
    let count = 0;
    for (const b of blogs) {
        await prisma.blogPost.upsert({
            where: { slug: b.slug },
            update: b,
            create: b
        });
        count++;
    }
    console.log(`Successfully seeded ${count} blog posts!`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

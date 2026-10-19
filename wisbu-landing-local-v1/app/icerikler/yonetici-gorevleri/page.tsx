import Link from "next/link";

export default function YoneticiGorevleri() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Dark Header */}
      <header className="w-full bg-[#1e1b4b] pt-16 pb-12 px-4 shadow-md">
        <div className="max-w-3xl mx-auto">
          <Link href="/icerikler" className="inline-block mb-6 !text-white hover:!text-slate-300 transition-colors text-sm font-medium">
            &larr; Tüm İçeriklere Dön
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
            Site Yöneticisinin Görevleri Nelerdir?
          </h1>
        </div>
      </header>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto py-12 px-4 md:px-8">
        <div className="prose prose-slate prose-lg md:prose-xl mx-auto leading-relaxed text-slate-800">
          <p>
            Bir sitenin düzenli, güvenli ve mali açıdan sürdürülebilir biçimde yönetilmesi, yalnızca aidat toplamakla sınırlı değildir. Ortak alanların bakımından bütçenin hazırlanmasına, faturaların ödenmesinden kat malikleri kurulunda alınan kararların uygulanmasına kadar pek çok iş site yöneticisinin sorumluluğundadır.
          </p>
          <p>
            Site yöneticisinin temel görevleri, 634 sayılı Kat Mülkiyeti Kanunu, sitenin yönetim planı ve kat malikleri kurulunun aldığı kararlarla belirlenir. Bu nedenle yöneticinin yetkileri sınırsız değildir. Yönetici, esas olarak kat malikleri adına hareket eden ve alınan kararları uygulayan kişidir.
          </p>

          <h2>Kat Malikleri Kurulu Kararlarını Uygulamak</h2>
          <p>
            Site yöneticisinin en temel görevi, kat malikleri kurulu veya toplu yapı temsilciler kurulu tarafından alınan kararları uygulamaktır. Ortak alanların yenilenmesi, bakım hizmetlerinin alınması, güvenlik sistemlerinin kurulması veya hizmet sağlayıcıların seçilmesi gibi konularda kurul tarafından alınan kararların hayata geçirilmesi yönetici tarafından sağlanır.
          </p>
          <p>
            Yönetici, kurulun yetkisinde bulunan önemli konularda kendi başına karar veremez. Yönetim planı veya kanun tarafından kendisine açıkça yetki verilmediği sürece, kurul kararlarının dışına çıkarak harcama yapması ya da site sakinlerini bağlayan yeni kurallar koyması doğru değildir.
          </p>

          <h2>Ortak Alanların Bakımını ve Güvenliğini Sağlamak</h2>
          <p>
            Bahçe, otopark, merdivenler, çatılar, girişler, asansörler, teknik odalar ve diğer ortak kullanım alanlarının korunması yöneticinin sorumlulukları arasındadır. Temizlik, bakım ve onarım işlerinin zamanında yaptırılması; olası arızalara ve güvenlik risklerine karşı gerekli önlemlerin alınması gerekir.
          </p>
          <p>
            Yönetici bütün teknik işleri kendisi yapmak zorunda değildir. Ancak yetkili servislerle çalışmak, bakım takvimlerini takip etmek ve hizmetlerin sözleşmeye uygun biçimde yerine getirilmesini sağlamakla yükümlüdür.
          </p>
          <p>
            Kat Mülkiyeti Kanunu’nda asansörler için ayrıca bir görev düzenlenmiştir. Yönetici, asansörlerin güvenli biçimde işletilmesi amacıyla aylık bakımlarını ve yıllık kontrollerini ilgili teknik düzenlemelere uygun şekilde yaptırmalı, bu işlemlere ait ücretlerin ödenmesini sağlamalıdır.
          </p>
          <p>
            Kanun, yöneticinin ana taşınmazın sigorta ettirilmesiyle ilgili işlemleri yürütmesini de görevleri arasında saymaktadır.
          </p>

          <h2>Bütçeyi ve İşletme Projesini Hazırlamak</h2>
          <p>
            Site yönetiminin düzenli çalışabilmesi için gelir ve giderlerin önceden planlanması gerekir. Bu plan, işletme projesi olarak adlandırılır. İşletme projesinde sitenin bir yıllık tahmini gelir ve giderleri, her bağımsız bölüme düşmesi beklenen gider payı ve maliklerden alınacak avans tutarı gösterilir.
          </p>
          <p>
            2026 yılında yapılan güncel düzenlemeye göre işletme projesinin kat malikleri genel kurulunda onaylanması gerekir. Onaylanmış bir işletme projesi bulunmuyorsa yönetici, yönetimin aksamaması için gecikmeden geçici bir işletme projesi hazırlar. Bu proje en geç üç ay içinde genel kurulun onayına sunulmalı ve genel kurul tarafından aynen veya değiştirilerek kabul edilmelidir.
          </p>
          <p>
            Yürürlükte bir işletme projesi varken geçici proje hazırlanması durumunda, geçici projedeki bedel artışı da kanunda belirtilen yeniden değerleme oranı sınırına tabidir. Bu nedenle yönetici, özellikle aidat ve avans tutarlarını dilediği gibi tek taraflı olarak belirleyemez. Yönetici bütçeyi hazırlar veya uygulanmasını sağlar; nihai onay kat malikleri genel kuruluna aittir. Bu düzenleme <a href="https://cdn.tbmm.gov.tr/KKBSPublicFile/D28/Y4/KanunMetni/4a0770ce-a99c-4076-869a-2a82df999e29.htm" target="_blank" rel="noopener noreferrer">7579 sayılı Kanun’un 3 ve 4. maddeleriyle</a> getirilmiştir.
          </p>

          <h2>Aidat ve Avansları Toplamak</h2>
          <p>
            Onaylanan işletme projesine ve geçerli gider paylaşım esaslarına göre aidatların ve avansların toplanması yöneticinin görevidir. Yönetici ayrıca siteye yapılacak diğer ödemeleri kabul eder ve yönetim nedeniyle doğan elektrik, su, bakım, temizlik, güvenlik, sigorta ve benzeri borçların zamanında ödenmesini sağlar.
          </p>
          <p>
            Giderlerin bağımsız bölümlere dağıtımı keyfî biçimde yapılamaz. Paylaşım yapılırken Kat Mülkiyeti Kanunu’nun 20. maddesi ile sitenin geçerli yönetim planında bulunan hükümler dikkate alınmalıdır.
          </p>
          <p>
            Toplanan paraların kişisel harcamalardan ayrı tutulması da önemlidir. Kanun, yöneticinin paraları ve avansları yatırmak ve gerektiğinde kullanmak üzere güvenilir bir bankada hesap açmasını öngörür. Hesap yöneticinin adına açılabilse de site veya ana taşınmazın yöneticisi sıfatı açıkça gösterilmelidir.
          </p>

          <h2>Borçları Takip Etmek</h2>
          <p>
            Ortak gider veya avans borcunu ödemeyen kat maliklerine karşı gerekli hatırlatma, ihtar ve tahsilat işlemlerinin yürütülmesi yöneticinin görevleri arasındadır.
          </p>
          <p>
            Borç ödenmediğinde yönetici, kanundaki şartlar çerçevesinde dava açabilir veya icra takibi başlatabilir. Gerekli durumlarda kanuni ipotek hakkının tapu kütüğüne tescil ettirilmesi için işlem yapılması da yöneticinin görev alanına girer.
          </p>
          <p>
            Yönetici bu işlemleri kişisel bir alacağı için değil, site veya ana taşınmaz adına yürütür. Bu nedenle borçların, yapılan bildirimlerin ve tahsilatların belgeli ve düzenli biçimde takip edilmesi gerekir.
          </p>

          <h2>Defter ve Belgeleri Düzenli Tutmak</h2>
          <p>
            Site yönetiminde şeffaflığın temel şartı, bütün işlemlerin kayıt altında bulunmasıdır. Yönetici; kurul kararlarını, toplantı tutanaklarını, yapılan ihtar ve tebligatların özetleriyle tarihlerini ve bütün giderleri ilgili deftere tarih sırasıyla kaydetmelidir.
          </p>
          <p>
            Faturalar, makbuzlar, banka belgeleri, bakım sözleşmeleri, teklifler ve diğer yönetim evrakları da düzenli bir dosyada saklanmalıdır. Karar defterinin her takvim yılının sona ermesinden itibaren bir ay içinde noter tarafından kapatılması gerekir.
          </p>
          <p>
            Sadece ödeme listesi paylaşılması tek başına yeterli değildir. Harcamaların dayanağı olan faturaların, sözleşmelerin ve ödeme belgelerinin de gerektiğinde denetlenebilir durumda bulunması önemlidir.
          </p>

          <h2>Kat Maliklerine Hesap Vermek</h2>
          <p>
            Yönetici, yönetim planında belirtilen zamanlarda kat malikleri kuruluna gelir ve gider hesabı vermekle yükümlüdür. Yönetim planında özel bir zaman belirlenmemişse hesap verme işlemi her takvim yılının ilk ayı içinde gerçekleştirilmelidir.
          </p>
          <p>
            Ayrıca kat maliklerinin yarısı talep ederse, arsa payları dikkate alınmaksızın, yönetim planında belirtilen zamanın dışında da hesapların gösterilmesi istenebilir.
          </p>
          <p>
            Kat Mülkiyeti Kanunu’na göre yönetici, kat maliklerine karşı bir vekil gibi sorumludur. Bu nedenle yönetim kaynaklarını özenli kullanmalı, görevini dürüstlükle yerine getirmeli ve yaptığı işlemlerin hesabını verebilmelidir. Kat malikleri kurulu yönetimi sürekli olarak denetleyebilir ve haklı bir neden bulunması hâlinde yöneticiyi değiştirebilir.
          </p>

          <h2>Toplantıları ve Bildirimleri Düzenlemek</h2>
          <p>
            Kat malikleri kurulunun gerekli zamanlarda toplantıya çağrılması da yöneticinin görevlerinden biridir. Toplantı çağrılarının kanuna ve yönetim planına uygun yapılması, gündemin açıkça belirtilmesi ve alınan kararların usulüne uygun şekilde kayıt altına alınması gerekir.
          </p>
          <p>
            Yönetici ayrıca ana taşınmazın tamamını ilgilendiren tebligatları kabul eder. Bir hakkın kaybedilmesine veya yasal bir sürenin geçirilmesine neden olabilecek durumlarda gerekli önlemleri zamanında almak zorundadır.
          </p>

          <h2>Kişisel Verileri Korumak</h2>
          <p>
            Site yönetimleri; malik ve kiracıların adları, telefon numaraları, ödeme bilgileri, araç plakaları ve kamera görüntüleri gibi kişisel verileri işleyebilir. Bu bilgilerin sınırsız biçimde paylaşılması veya amacı dışında kullanılması hukuka uygun değildir.
          </p>
          <p>
            Özellikle güvenlik kameralarıyla görüntü kaydı alınması kişisel veri işleme faaliyeti sayılır. Kamera sistemi kurulurken hukuki dayanak, amaçla sınırlılık, kayıtların güvenliği ve saklama süresi gibi konuların dikkate alınması gerekir. Kişisel Verileri Koruma Kurumu da apartman ve sitelerde kamera kullanımının hem Kat Mülkiyeti Kanunu’na hem de KVKK hükümlerine uygun yürütülmesi gerektiğini belirtmektedir. Ayrıntılı açıklamaya <a href="https://www.kvkk.gov.tr/Icerik/8769/apartmanlarda-guvenlik-kamerasi-sistemi-kullaniminda-dikkat-edilecek-hususlara-dair-kamuoyu-duyurusu" target="_blank" rel="noopener noreferrer">KVKK’nın resmî duyurusundan</a> ulaşılabilir.
          </p>

          <h2>Site Yöneticisi Her Konuda Tek Başına Karar Verebilir mi?</h2>
          <p>
            Site yöneticisi, kat maliklerinin üzerinde sınırsız yetkiye sahip bir kişi değildir. Görevi; kanuna, yönetim planına, onaylanmış işletme projesine ve kurul kararlarına uygun biçimde yönetimi yürütmektir.
          </p>
          <p>
            Yönetim planını tek başına değiştirmek, kurulun yetkisindeki büyük yatırımlara karar vermek, belgesiz harcama yapmak veya genel kurul onayı gerektiren giderleri keyfî biçimde maliklere yüklemek yöneticinin olağan yetkileri arasında değildir. Ancak can ve mal güvenliğini korumak veya ana taşınmazın zarar görmesini önlemek için gecikmesinde sakınca bulunan durumlarda gerekli koruyucu tedbirleri alması beklenir.
          </p>

          <h2>Sonuç</h2>
          <p>
            İyi bir site yöneticisi yalnızca aidat toplayan kişi değildir. Aynı zamanda ortak yaşam alanlarının korunmasını sağlayan, bütçeyi yöneten, belgeleri düzenli tutan, kurul kararlarını uygulayan ve kat maliklerine karşı hesap veren bir yönetim temsilcisidir.
          </p>
          <p>
            Şeffaf bir gelir-gider sistemi, düzenli bakım takibi, açık iletişim ve belgeli işlem süreci hem yöneticiyi hem de site sakinlerini korur. Bununla birlikte her sitenin yönetim planı farklı olabileceğinden, görev ve yetkiler değerlendirilirken Kat Mülkiyeti Kanunu ile birlikte sitenin yönetim planı ve kurul kararları da incelenmelidir.
          </p>
          <p>
            <em>Mevzuat notu: Bu metin Ağustos 2026 itibarıyla güncel hükümler dikkate alınarak hazırlanmıştır. Temel kaynak, Adalet Bakanlığı UYAP’taki <a href="https://mevzuat.adalet.gov.tr/mevzuat/103807" target="_blank" rel="noopener noreferrer">634 sayılı Kat Mülkiyeti Kanunu’nun güncel metnidir</a>.</em>
          </p>
        </div>
      </article>
    </main>
  );
}

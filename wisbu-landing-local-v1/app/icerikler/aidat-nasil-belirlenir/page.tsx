import Link from "next/link";

export default function AidatNasilBelirlenir() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Dark Header */}
      <header className="w-full bg-[#1e1b4b] pt-16 pb-12 px-4 shadow-md">
        <div className="max-w-3xl mx-auto">
          <Link href="/icerikler" className="inline-block mb-6 !text-white hover:!text-slate-300 transition-colors text-sm font-medium">
            &larr; Tüm İçeriklere Dön
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
            Apartman Aidatı Nasıl Belirlenir?
          </h1>
        </div>
      </header>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto py-12 px-4 md:px-8">
        <div className="prose prose-slate prose-lg md:prose-xl mx-auto leading-relaxed text-slate-800">
          <p>
            Apartman aidatı; binanın temiz, güvenli ve düzenli biçimde kullanılabilmesi için gerekli ortak giderlerin karşılanması amacıyla kat maliklerinden veya daire sakinlerinden düzenli olarak tahsil edilen tutardır. Ancak aidatın yalnızca yöneticinin belirlediği rastgele bir rakam olduğu düşünülmemelidir. Aidat belirlenirken apartmanın yıllık giderleri, gelirleri, ihtiyaçları ve giderlerin daireler arasında nasıl paylaştırılacağı dikkate alınmalıdır.
          </p>

          <h2>Aidat hesaplaması neye göre yapılır?</h2>
          <p>
            Aidat belirleme süreci, apartmanın gelecek dönemde karşılaşması beklenen giderlerin hesaplanmasıyla başlar. Genellikle bir yıllık bütçe hazırlanır ve aşağıdaki giderler bu bütçeye dahil edilir:
          </p>
          <ul>
            <li>Kapıcı, güvenlik görevlisi, bahçıvan ve temizlik personeli giderleri</li>
            <li>Asansör bakım ve periyodik kontrol ücretleri</li>
            <li>Ortak alanların elektrik, su ve doğalgaz giderleri</li>
            <li>Temizlik malzemeleri ve düzenli bakım harcamaları</li>
            <li>Bina sigortası</li>
            <li>Yönetici ücreti</li>
            <li>Çatı, dış cephe, tesisat ve ortak alan onarımları</li>
            <li>Kamera, hidrofor, jeneratör ve benzeri ortak sistemlerin giderleri</li>
            <li>Beklenmeyen masraflar için ayrılan yedek bütçe</li>
          </ul>
          <p>
            Bu giderler hesaplandıktan sonra apartmanın varsa kira, reklam alanı, ortak alan kullanımı veya benzeri gelirleri toplam giderden düşülür. Kalan tutar, belirlenen paylaşım yöntemine göre dairelere dağıtılır.
          </p>
          <p>
            Basit bir ifadeyle hesaplama şu şekilde yapılabilir:
          </p>
          <blockquote>
            <p><strong>Yıllık net bütçe = Tahmini yıllık giderler + yedek bütçe − apartmanın diğer gelirleri</strong></p>
          </blockquote>
          <p>
            Ortaya çıkan yıllık net bütçe 12 aya bölündüğünde apartmanın aylık toplam aidat ihtiyacı bulunur. Daha sonra bu tutar bağımsız bölümlere paylaştırılır.
          </p>

          <h2>Her daire aynı aidatı mı öder?</h2>
          <p>
            Her dairenin mutlaka aynı aidatı ödemesi gerekmez. Giderlerin nasıl paylaştırılacağı öncelikle apartmanın yönetim planına ve kat malikleri arasında geçerli olan düzenlemelere göre değerlendirilir.
          </p>
          <p>
            Başka bir paylaşım düzeni bulunmuyorsa, 634 sayılı Kat Mülkiyeti Kanunu’nun 20. maddesindeki genel esaslar uygulanır. Buna göre:
          </p>
          <ul>
            <li>Kapıcı, kaloriferci, bahçıvan ve bekçi giderleri daireler arasında eşit olarak paylaşılır.</li>
            <li>Ana yapının sigorta giderleri, ortak alanların bakım, koruma, güçlendirme ve onarım masrafları, yönetici ücreti ile ortak tesislerin işletme giderleri arsa payı oranında dağıtılır.</li>
          </ul>
          <p>
            Bu nedenle büyük ve küçük dairelerin ödediği aidatlar bazı apartmanlarda farklı olabilir. Burada yalnızca dairenin metrekare büyüklüğüne değil, tapuda belirtilen arsa payına bakılır. Benzer büyüklükte görünen iki dairenin arsa payları farklıysa ödeyecekleri tutarlar da farklılaşabilir.
          </p>
          <p>
            Apartmanın yönetim planında tüm giderlerin eşit paylaşılacağı veya farklı bir hesaplama yöntemi kullanılacağı açıkça düzenlenmişse aidat dağılımında bu hükümler de dikkate alınır.
          </p>

          <h2>Aidatı kim belirler?</h2>
          <p>
            Aidatın temelini oluşturan bütçe, kat malikleri kurulunda kabul edilen işletme projesi veya bütçe kararı üzerinden belirlenir. Kat malikleri kurulunca kabul edilmiş bir işletme projesi bulunmuyorsa yönetici, Kat Mülkiyeti Kanunu’nun 37. maddesi uyarınca gecikmeden bir işletme projesi hazırlar.
          </p>
          <p>
            İşletme projesinde genel olarak:
          </p>
          <ul>
            <li>Apartmanın bir yıllık tahmini gelir ve giderleri,</li>
            <li>Her bağımsız bölüme düşecek tahmini gider payı,</li>
            <li>Giderleri karşılamak için toplanacak avans tutarı</li>
          </ul>
          <p>
            gösterilir.
          </p>
          <p>
            Hazırlanan bütçenin mümkün olduğunca ayrıntılı olması önemlidir. “Genel giderler” gibi açıklaması belirsiz kalemler yerine temizlik, asansör bakımı, personel, sigorta ve onarım gibi giderlerin ayrı ayrı belirtilmesi daha şeffaf bir yönetim sağlar.
          </p>

          <h2>Örnek aidat hesaplaması</h2>
          <p>
            12 daireli bir apartmanın aylık bütçesinin şu şekilde olduğunu düşünelim:
          </p>
          <ul>
            <li>Personel giderleri: 30.000 TL</li>
            <li>Ortak alan ve bakım giderleri: 24.000 TL</li>
            <li>Beklenmeyen giderler için ayrılan pay: 6.000 TL</li>
          </ul>
          <p>
            Personel giderleri eşit paylaştırıldığında her daireye 2.500 TL düşer.
          </p>
          <p>
            Diğer giderlerle yedek bütçenin toplamı 30.000 TL’dir. Arsa payı yüzde 8 olan bir dairenin bu bölüm için ödeyeceği tutar 2.400 TL olur.
          </p>
          <p>
            Bu örnekte ilgili dairenin aylık aidatı:
          </p>
          <blockquote>
            <p><strong>2.500 TL + 2.400 TL = 4.900 TL</strong></p>
          </blockquote>
          <p>
            olarak hesaplanır.
          </p>
          <p>
            Bu yalnızca genel hesaplama mantığını gösteren bir örnektir. Gerçek aidat tutarı; yönetim planına, kurul kararlarına, apartmanın özelliklerine ve giderlerin niteliğine göre değişebilir.
          </p>

          <h2>Boş daire için aidat ödenir mi?</h2>
          <p>
            Bir dairenin boş olması, kullanılmaması veya bazı ortak alanlardan yararlanılmaması aidat ödeme yükümlülüğünü kendiliğinden ortadan kaldırmaz. Örneğin giriş katta yaşayan bir kişinin asansörü kullanmadığını söylemesi ya da dairesinde kimsenin oturmaması, ortak giderlerden muafiyet sağlamaz.
          </p>
          <p>
            Kat Mülkiyeti Kanunu’na göre kat malikleri, ortak yer ve tesislerden yararlanmadıklarını ileri sürerek gider ve avans payını ödemekten kaçınamaz. Ancak yönetim planında belirli bir gider için özel bir düzenleme bulunuyorsa bu hüküm ayrıca değerlendirilmelidir.
          </p>

          <h2>Aidat neden her yıl artar?</h2>
          <p>
            Aidat artışının tek bir sabit oranı yoktur. Apartmanın gerçek ve tahmini giderleri değiştikçe aidat tutarı da güncellenebilir. Özellikle şu kalemlerdeki artışlar aidatı doğrudan etkiler:
          </p>
          <ul>
            <li>Personel maaşları ve sigorta primleri</li>
            <li>Elektrik, su ve doğalgaz fiyatları</li>
            <li>Asansör ve teknik bakım sözleşmeleri</li>
            <li>Temizlik ve sarf malzemeleri</li>
            <li>Sigorta primleri</li>
            <li>Planlanan bakım ve onarım çalışmaları</li>
          </ul>
          <p>
            Sağlıklı bir aidat artışı yalnızca genel fiyat artışına göre değil, yeni dönem bütçesi hazırlanarak yapılmalıdır. Eski aidata gelişigüzel bir oran eklemek yerine her gider kalemi yeniden hesaplanmalı ve artışın nedeni kat maliklerine açıkça gösterilmelidir.
          </p>

          <h2>Şeffaf bir aidat yönetimi nasıl olmalı?</h2>
          <p>
            Aidat konusunda yaşanan anlaşmazlıkların büyük bölümü tutarın yüksekliğinden çok, bu tutarın neden toplandığının yeterince açıklanmamasından kaynaklanır. Bu nedenle yönetim tarafından:
          </p>
          <ul>
            <li>Yıllık bütçe paylaşılmalı,</li>
            <li>Gider belgeleri düzenli olarak saklanmalı,</li>
            <li>Toplanan ve harcanan tutarlar takip edilebilmeli,</li>
            <li>Olağan dışı harcamalar ayrıca açıklanmalı,</li>
            <li>Dairelerin borç ve ödeme bilgileri güncel tutulmalıdır.</li>
          </ul>
          <p>
            Sonuç olarak apartman aidatı; binanın tahmini giderleri, gelirleri, yönetim planı, arsa payları ve Kat Mülkiyeti Kanunu’ndaki paylaşım esasları birlikte değerlendirilerek belirlenir. Doğru hazırlanan bir işletme projesi ve şeffaf biçimde sunulan gider tablosu, hem apartmanın finansal düzenini korur hem de kat malikleri arasındaki anlaşmazlıkların önüne geçer.
          </p>
          <p>
            <em>Bu içerik genel bilgilendirme amacıyla hazırlanmıştır. Özel durumlarda apartmanın yönetim planı, kurul kararları ve güncel mevzuat birlikte incelenmelidir.</em>
          </p>
          <p>
            Kaynak: <a href="https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=634&MevzuatTertip=5&MevzuatTur=1" target="_blank" rel="noopener noreferrer">634 Sayılı Kat Mülkiyeti Kanunu – Mevzuat Bilgi Sistemi</a>
          </p>
        </div>
      </article>
    </main>
  );
}

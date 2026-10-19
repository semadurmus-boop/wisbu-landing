import Link from "next/link";

export default function KiraciEvSahibiGiderleri() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Dark Header */}
      <header className="w-full bg-[#1e1b4b] pt-16 pb-12 px-4 shadow-md">
        <div className="max-w-3xl mx-auto">
          <Link href="/icerikler" className="inline-block mb-6 !text-white hover:!text-slate-300 transition-colors text-sm font-medium">
            &larr; Tüm İçeriklere Dön
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white leading-tight">
            Kiracı ve Ev Sahibi Hangi Giderleri Öder?
          </h1>
        </div>
      </header>

      {/* Article Body */}
      <article className="max-w-3xl mx-auto py-12 px-4 md:px-8">
        <div className="prose prose-slate prose-lg md:prose-xl mx-auto leading-relaxed text-slate-800">
          <p>
            Kiralanan bir evde ortaya çıkan masrafın kime ait olduğu, yalnızca faturanın veya aidatın kimin adına düzenlendiğine bakılarak belirlenemez. Temel ayrım şudur: Evin günlük kullanımından doğan giderleri genellikle kiracı; taşınmazın mülkiyetinden, yapısal durumundan veya uzun ömürlü yenilenmesinden kaynaklanan giderleri ise ev sahibi karşılar.
          </p>

          <h2>Kiracının ödemesi gereken giderler</h2>
          <p>
            Kiracı, öncelikle kendi tüketimine bağlı giderlerden sorumludur. Elektrik, su, doğal gaz ve ısınma giderleri bu kapsamdadır. İnternet, televizyon hizmetleri ve kiracının kendi adına aldığı benzer hizmetlerin bedelleri de kiracıya aittir. Türk Borçlar Kanunu’nun 341. maddesi, sözleşmede veya yerel uygulamada aksi bulunmadıkça ısıtma, aydınlatma ve su gibi kullanma giderlerinin kiracı tarafından karşılanacağını belirtir.
          </p>
          <p>
            Kiracı ayrıca evin olağan kullanımı için gerekli temizlik ve küçük bakım giderlerini öder. Ampul değiştirilmesi, basit bir musluk contası yenilenmesi veya günlük kullanımdan doğan küçük bakım işlemleri buna örnek gösterilebilir. Ancak giderin büyüklüğü kadar arızanın nedeni de önemlidir. Kombi, tesisat veya başka bir cihaz eskidiği için bozulmuşsa masraf ev sahibine; kiracının hatalı kullanımı sonucunda zarar görmüşse kiracıya ait olabilir. Türk Borçlar Kanunu’nun 317. maddesinde kiracının olağan temizlik ve bakım giderlerinden sorumlu olduğu, bu konuda yerel âdetin de dikkate alınacağı düzenlenmiştir. İlgili hükümler <a href="https://mevzuat.adalet.gov.tr/mevzuat/103273" target="_blank" rel="noopener noreferrer">Adalet Bakanlığının güncel Türk Borçlar Kanunu metninde</a> yer almaktadır.
          </p>
          <p>
            Kiracının veya birlikte yaşadığı kişilerin kusuruyla oluşan zararlar da kiracı tarafından karşılanır. Örneğin kapının dikkatsiz kullanım nedeniyle kırılması veya tesisatın hatalı müdahale sonucunda zarar görmesi bu kapsamdadır. Buna karşılık evin sözleşmeye uygun biçimde kullanılmasıyla zaman içinde oluşan normal eskime ve yıpranmadan kiracı sorumlu değildir.
          </p>

          <h2>Ev sahibinin ödemesi gereken giderler</h2>
          <p>
            Ev sahibi, evi kullanıma elverişli şekilde teslim etmek ve kira sözleşmesi boyunca bu durumda bulundurmakla yükümlüdür. Çatı akması, ana su tesisatının eskimesi, duvarlarda yapısal çatlak oluşması, elektrik tesisatının güvenli olmaması veya kombinin kullanım hatası bulunmadan ekonomik ömrünü tamamlaması gibi önemli sorunların giderilmesi kural olarak ev sahibine aittir.
          </p>
          <p>
            Emlak vergisinin yasal mükellefi de kiracı değil; taşınmazın maliki, varsa intifa hakkı sahibidir. Bu husus <a href="https://www.gib.gov.tr/mevzuat/kanun/447" target="_blank" rel="noopener noreferrer">Emlak Vergisi Kanunu’nun 3. maddesinde</a> açıkça düzenlenmiştir. Zorunlu sigorta, vergi ve benzeri mülkiyet yükümlülükleri bakımından ise kanun ve kira sözleşmesi birlikte değerlendirilmelidir.
          </p>
          <p>
            Binaya kalıcı değer kazandıran veya yapının ömrünü uzatan büyük harcamalar da genel olarak ev sahibinin sorumluluğundadır. Asansörün tamamen yenilenmesi, çatının değiştirilmesi, dış cephe mantolaması, bina güçlendirmesi, ana tesisatın yenilenmesi ve yeni bir ortak sistem kurulması bu gruba girer.
          </p>

          <h2>Apartman aidatını kim öder?</h2>
          <p>
            Aidat konusunda yalnızca “Aidatı kiracı öder” veya “Aidat tamamen ev sahibine aittir” demek doğru değildir. Aidatın hangi kalemlerden oluştuğuna bakılmalıdır.
          </p>
          <p>
            Temizlik, güvenlik, kapıcı, bahçe bakımı, ortak alan elektriği ve günlük işletme hizmetleri gibi kiracının oturduğu süre boyunca yararlandığı giderler, kira ilişkisi bakımından genellikle kiracıya bırakılan kullanım giderleri arasında değerlendirilir. Buna karşılık asansör yenileme, çatı onarımı, güçlendirme veya büyük çaplı dış cephe çalışması için toplanan ek ödemeler kural olarak ev sahibine aittir. Bu nedenle aidat dökümünde işletme giderleriyle yatırım ve demirbaş giderlerinin ayrı gösterilmesi önemlidir.
          </p>
          <p>
            Kat Mülkiyeti Kanunu’nun 20. maddesine göre apartman veya site yönetimine karşı ortak giderlerden esas olarak kat maliki sorumludur. Ancak aynı Kanun’un 22. maddesi, bağımsız bölümden sürekli yararlanan kiracıyı da malik ile birlikte sorumlu tutar. Kiracının bu sorumluluğu ödemekle yükümlü olduğu kira miktarıyla sınırlıdır ve yönetime yaptığı ödeme kira borcundan düşülür. Bu düzenlemeler <a href="https://mevzuat.adalet.gov.tr/mevzuat/103807" target="_blank" rel="noopener noreferrer">Adalet Bakanlığının güncel Kat Mülkiyeti Kanunu metninden</a> incelenebilir.
          </p>

          <h2>Masraf çıktığında nasıl hareket edilmeli?</h2>
          <p>
            Öncelikle kira sözleşmesi ve giderin nedeni kontrol edilmelidir. Kiracının sorumlu olmadığı bir arıza ortaya çıktığında ev sahibine gecikmeden ve mümkünse yazılı olarak haber verilmelidir. Kiracı, masrafı yaptırdıktan sonra doğrudan kiradan kesmek yerine yasal süreci izlemelidir. Türk Borçlar Kanunu’nun 306. maddesine göre kiraya verene uygun süre verilmesine rağmen sorun giderilmezse kiracı, belirli şartlarla onarımı kiraya veren hesabına yaptırarak alacağını kiradan indirebilir.
          </p>

          <h2>Sonuç olarak</h2>
          <p>
            Giderin adı değil, hangi amaçla yapıldığı belirleyicidir: Günlük kullanım ve olağan bakım kiracıya; mülkiyet, yapısal onarım ve kalıcı yenileme ev sahibine aittir. Uyuşmazlık yaşamamak için aidat dökümlerinin, faturaların, arıza bildirimlerinin ve ödeme belgelerinin saklanması en güvenli yöntemdir.
          </p>
          <p>
            <em>Bu metin genel bilgilendirme amacı taşır. Somut olayda kira sözleşmesi, arızanın nedeni, yönetim planı ve gider belgeleri birlikte değerlendirilmelidir.</em>
          </p>
        </div>
      </article>
    </main>
  );
}

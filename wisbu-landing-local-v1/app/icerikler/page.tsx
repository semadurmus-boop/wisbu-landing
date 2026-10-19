import Link from "next/link";
import Image from "next/image";

const articles = [
  {
    category: "Aidat ve Ödemeler",
    title: "Apartman aidatı nasıl belirlenir?",
    description: "Ortak giderlerden işletme projesine, aidat hesaplamanın temel adımları.",
    time: "5 dk okuma",
    url: "/icerikler/aidat-nasil-belirlenir",
    image: "/assets/aidat.jpg"
  },
  {
    category: "Yönetici Rehberi",
    title: "Site yöneticisinin görevleri nelerdir?",
    description: "Yeni ve deneyimli yöneticiler için sorumlulukların sade özeti.",
    time: "6 dk okuma",
    url: "/icerikler/yonetici-gorevleri",
    image: "/assets/gorev.jpg"
  },
  {
    category: "Ortak Yaşam",
    title: "Kiracı ve ev sahibi hangi giderleri öder?",
    description: "Sık karıştırılan ortak giderleri anlaşılır örneklerle inceleyin.",
    time: "4 dk okuma",
    url: "/icerikler/kiraci-ev-sahibi-giderleri",
    image: "/assets/gider.jpg"
  },
];

export default function IceriklerPage() {
  return (
    <main className="min-h-screen bg-[#1e1b4b]">
      {/* Header with Title */}
      <header className="w-full pt-20 pb-12 px-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="inline-block mb-8 !text-white hover:!text-slate-300 transition-colors text-sm font-medium">
            &larr; Ana Sayfaya Dön
          </Link>
          <h1 className="text-4xl md:text-5xl font-light text-white tracking-tight">Wisbu Rehber</h1>
        </div>
      </header>

      {/* Articles Grid */}
      <section className="w-full py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div className="overflow-hidden flex flex-col rounded-2xl bg-white shadow-md transition-transform duration-300 hover:-translate-y-1" key={article.title}>
                <div className="relative w-full h-56">
                  {/* Using standard img to match homepage behavior, but in a real next app Image component might be better if configured */}
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover object-center" 
                  />
                </div>
                <article className="p-6 flex-1 flex flex-col">
                  <span className="text-indigo-700 font-[600] text-sm tracking-wide uppercase">{article.category}</span>
                  <h3 className="text-slate-900 font-[600] text-xl mt-2 leading-snug">{article.title}</h3>
                  <p className="text-slate-600 mt-3 flex-1 leading-relaxed">{article.description}</p>
                  <footer className="mt-6 flex items-center justify-between">
                    <span className="text-slate-500 font-medium text-sm">{article.time}</span>
                    <Link className="text-indigo-600 hover:text-indigo-800 hover:underline font-semibold" href={article.url}>
                      Yazıyı oku &rarr;
                    </Link>
                  </footer>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

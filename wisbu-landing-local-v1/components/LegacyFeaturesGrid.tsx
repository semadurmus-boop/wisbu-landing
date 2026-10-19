'use client';

import React from 'react';

export default function LegacyFeaturesGrid() {
  return (
    <section className="features-section relative -mt-px w-full px-4 sm:px-6 lg:px-8 bg-transparent" id="why-wisbu">
      <div className="max-w-[1220px] mx-auto flex flex-col items-center">
        <div className="features-section__header text-center max-w-3xl mx-auto">
          <span className="text-xs font-[600] tracking-widest text-[#694cff] uppercase mb-4 block">TEK PLATFORM, TÜM YÖNETİM</span>
          <h2 className="text-4xl sm:text-5xl font-light text-slate-900 mb-6">
            Yönetimin tüm ihtiyaçları,<br />tek platformda.
          </h2>
          <p className="text-lg text-slate-600">
            Tahsilattan finansal raporlamaya, banka hareketlerinden sakinlerle iletişime kadar tüm süreçleri Wisbu’da yönetin.
          </p>
        </div>

        <div className="relative w-full z-10 mt-8 md:mt-10">
          {[
            [
              { 
                title: "Aidat Takibi", 
                desc: "Borçlandırma ve tahsilat durumunu tek ekrandan izleyin.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#694cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-[5px]"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
              },
              { 
                title: "Kredi Kartıyla Tahsilat", 
                desc: "Aidatları kredi kartıyla güvenli ve kolayca tahsil edin.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#694cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-[5px]"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
              }
            ],
            [
              { 
                title: "Banka Entegrasyonu", 
                desc: "Banka hareketlerini otomatik olarak eşleştirip yönetin.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#694cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-[5px]"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
              },
              { 
                title: "Finansal Raporlama", 
                desc: "Gelir, gider ve tahsilat durumunu güncel olarak görüntüleyin.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#694cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-[5px]"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              }
            ],
            [
              { 
                title: "Duyuru & İlan", 
                desc: "Duyuruları ilgili sakinlere tek merkezden ulaştırın.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#694cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-[5px]"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
              },
              { 
                title: "Kurumsal SMS", 
                desc: "Bilgilendirmeleri ilgili sakinlere SMS yoluyla iletin.",
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#694cff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 mt-[5px]"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              }
            ]
          ].map((row, index, arr) => (
            <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-y-0 md:gap-x-[100px] lg:gap-x-[120px]">
              
              {/* Sol Sütun */}
              <div className={`reveal-wrapper pt-[34px] pb-[38px] md:pr-4 lg:pr-6 border-b border-[rgba(105,86,255,0.12)] ${index === arr.length - 1 ? 'md:border-b-0' : ''}`}>
                <div className="flex items-start gap-[12px] mb-[12px] reveal-item reveal-item--title">
                  {row[0].icon}
                  <h3 className="text-[clamp(26px,1.55vw,30px)] font-[500] leading-[1.2] -tracking-[0.02em] text-[#1e1b4b] mt-[-2px]">{row[0].title}</h3>
                </div>
                <p className="text-[clamp(16px,0.94vw,18px)] text-[#545b77] leading-[1.55] pl-[32px] reveal-item reveal-item--desc">{row[0].desc}</p>
              </div>
              
              {/* Sağ Sütun */}
              <div className={`reveal-wrapper pt-[34px] pb-[38px] md:pl-4 lg:pl-6 ${index === arr.length - 1 ? 'border-none' : 'border-b border-[rgba(105,86,255,0.12)]'}`}>
                <div className="flex items-start gap-[12px] mb-[12px] reveal-item reveal-item--title">
                  {row[1].icon}
                  <h3 className="text-[clamp(26px,1.55vw,30px)] font-[500] leading-[1.2] -tracking-[0.02em] text-[#1e1b4b] mt-[-2px]">{row[1].title}</h3>
                </div>
                <p className="text-[clamp(16px,0.94vw,18px)] text-[#545b77] leading-[1.55] pl-[32px] reveal-item reveal-item--desc">{row[1].desc}</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

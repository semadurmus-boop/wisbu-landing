'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SvgDefs, IllusDues, IllusReports, IllusAnnounce, IllusPOS, IllusBank, IllusComm } from './FeatureIllustrations';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { id: '01', x: 180, y: 310, title1: 'Aidat', title2: 'Takibi', Illus: IllusDues, align: 'top', labelPos: 'bottom-line', width: 175 },
  { id: '02', x: 400, y: 360, title1: 'Finansal', title2: 'Raporlama', Illus: IllusReports, align: 'bottom', labelPos: 'bottom-illus', width: 175 },
  { id: '03', x: 680, y: 380, title1: 'Duyuru &', title2: 'İlan', Illus: IllusAnnounce, align: 'top', labelPos: 'bottom-line', width: 175 },
  { id: '04', x: 920, y: 360, title1: 'Kredi Kartıyla', title2: 'Tahsilat', Illus: IllusPOS, align: 'top', labelPos: 'bottom-line', width: 175 },
  { id: '05', x: 1160, y: 310, title1: 'Banka', title2: 'Entegrasyonu', Illus: IllusBank, align: 'bottom', labelPos: 'bottom-illus', width: 185 },
  { id: '06', x: 1380, y: 330, title1: 'Kurumsal', title2: 'SMS & Mail', Illus: IllusComm, align: 'top', labelPos: 'bottom-line', width: 175 }
];

export default function FeatureSystemShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  
  useLayoutEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (!isReduced) {
        gsap.set('.feature-line-path', { strokeDasharray: 2000, strokeDashoffset: 2000 });
        gsap.set('.feature-node', { autoAlpha: 0, scale: 0.5, transformOrigin: 'center' });
        gsap.set('.feature-illus-wrapper', { autoAlpha: 0, y: 15 });
        gsap.set('.feature-label-group', { autoAlpha: 0, y: 10 });
        gsap.set('.feature-mobile-item', { autoAlpha: 0, x: -10 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          }
        });

        tl.to('.feature-line-path', { strokeDashoffset: 0, duration: 1.0, ease: "power2.inOut" }, 0.0);

        features.forEach((feat) => {
          const appearTime = (feat.x / 1480) * 1.0; 
          tl.to(`.node-${feat.id}`, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, appearTime)
            .to(`.illus-${feat.id}`, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" }, appearTime + 0.1)
            .to(`.label-${feat.id}`, { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" }, appearTime + 0.2);
        });

        tl.to('.feature-mobile-item', { autoAlpha: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }, 0.2);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="features" 
      ref={sectionRef} 
      className="relative overflow-hidden bg-[#fcfbff] pt-24 pb-32"
      style={{ minHeight: 'calc(100svh - 64px)' }}
    >
      <SvgDefs />

      {/* --- HEADER --- */}
      <div className="w-full mx-auto text-center px-4 mb-16 relative z-10" style={{ maxWidth: '800px' }}>
        <span className="block text-[11px] md:text-[13px] font-[600] tracking-[0.18em] text-[#7557E8] uppercase mb-4 opacity-80">
          TEK PLATFORM · ALTI BAĞLI SİSTEM
        </span>
        <h2 className="font-medium text-[#1e1d45] mb-6" style={{ fontSize: 'clamp(44px, 3.4vw, 66px)', lineHeight: 0.98, letterSpacing: '-0.045em' }}>
          Yönetimin tüm <span className="text-[#7557E8]">akışı</span>,<br />tek merkezde.
        </h2>
        <p className="text-[#494868] font-medium mx-auto" style={{ fontSize: 'clamp(15px, 1.05vw, 18px)', maxWidth: '420px' }}>
          Tüm süreçler tek platformda birleşir, yönetim sadeleşir.
        </p>
      </div>

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:block w-full relative mx-auto" style={{ maxWidth: '1480px', aspectRatio: '1480 / 600' }}>
        
        {/* Main SVG Background Line */}
        <svg viewBox="0 0 1480 600" className="absolute inset-0 w-full h-full pointer-events-none">
          {/* Shadow line (kalınlık ve gölge %50 azaltıldı) */}
          <path 
            d="M 50 330 C 300 250, 450 430, 740 370 C 1000 320, 1200 270, 1430 340" 
            fill="none" stroke="#5540C9" strokeWidth="2" opacity="0.02"
            transform="translate(0, 12)"
          />
          {/* Main animated line (dalga derinliği ve kalınlığı %20 azaltıldı) */}
          <path 
            className="feature-line-path"
            d="M 50 330 C 300 250, 450 430, 740 370 C 1000 320, 1200 270, 1430 340" 
            fill="none" stroke="url(#violet-grad)" strokeWidth="2" strokeLinecap="round"
          />
        </svg>

        {/* Nodes, Illustrations and Labels */}
        {features.map((feat) => {
          const leftPercent = (feat.x / 1480) * 100;
          const topPercent = (feat.y / 600) * 100;

          return (
            <div 
              key={feat.id} 
              className="absolute group flex flex-col items-center justify-center pointer-events-none"
              style={{ left: `${leftPercent}%`, top: `${topPercent}%` }}
            >
              
              {/* Node Dot */}
              <div className={`feature-node node-${feat.id} absolute w-3.5 h-3.5 rounded-full bg-[#2FD5A6] border-2 border-[#7557E8] z-20 transform -translate-x-1/2 -translate-y-1/2`} />
              
              {/* Vertical connecting line */}
              <div 
                className={`feature-node node-${feat.id} absolute w-[1.5px] bg-[#B9AEF7] z-10 transform -translate-x-1/2 ${feat.align === 'top' ? 'bottom-0 h-6 -mb-3' : 'top-0 h-6 -mt-3'}`}
                style={{ opacity: 0.6 }}
              />

              {/* Illustration */}
              <div 
                className={`feature-illus-wrapper illus-${feat.id} absolute transform -translate-x-1/2 z-30 transition-transform duration-300 ease-out group-hover:-translate-y-1`}
                style={{ 
                  width: feat.width,
                  [feat.align === 'top' ? 'bottom' : 'top']: '12px',
                }}
              >
                <feat.Illus />
              </div>

              {/* Label */}
              <div 
                className={`feature-label-group label-${feat.id} absolute flex flex-col items-center text-center transform -translate-x-1/2 z-40 whitespace-nowrap`}
                style={{
                  [feat.labelPos === 'bottom-line' ? 'top' : (feat.labelPos === 'bottom-illus' ? 'top' : 'bottom')]: 
                    feat.labelPos === 'bottom-line' ? '20px' : (feat.align === 'bottom' ? `${feat.width * 0.9}px` : 'auto')
                }}
              >
                <span className="font-[600] tracking-[0.02em] text-[#7557e8]" style={{ fontSize: '13px' }}>
                  {feat.id}
                </span>
                <span className="font-[580] text-[#1d1b4c] mt-[8px]" style={{ fontSize: 'clamp(16px, 1.05vw, 18px)', lineHeight: 1.18, letterSpacing: '-0.015em' }}>
                  {feat.title1}<br/>{feat.title2}
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden w-full max-w-[390px] mx-auto relative px-6 mt-8">
        
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-12 w-[2px] bg-gradient-to-b from-[#7557E8] to-[#B9AEF7] transform -translate-x-1/2 opacity-30 z-0" />

        <div className="flex flex-col gap-12 relative z-10 pt-4">
          {features.map((feat, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={feat.id} className="feature-mobile-item w-full flex items-center justify-between relative">
                
                {/* Center Node */}
                <div className="absolute left-1/2 top-1/2 w-3.5 h-3.5 rounded-full bg-[#2FD5A6] border-2 border-[#7557E8] transform -translate-x-1/2 -translate-y-1/2 z-20" />

                {/* Left Side (Either Illus or Empty) */}
                <div className="w-[42%] flex justify-end">
                  {isLeft ? (
                    <div className="w-[125px]">
                      <feat.Illus />
                    </div>
                  ) : (
                    <div className="text-right flex flex-col justify-center">
                      <span className="font-[600] tracking-[0.02em] text-[#7557e8]" style={{ fontSize: '13px' }}>{feat.id}</span>
                      <span className="font-[580] text-[#1d1b4c] leading-[1.18] tracking-[-0.015em] mt-[6px]" style={{ fontSize: 'min(15px, 4vw)' }}>
                        {feat.title1} {feat.title2}
                      </span>
                    </div>
                  )}
                </div>

                {/* Right Side (Either Text or Empty) */}
                <div className="w-[42%] flex justify-start">
                  {isLeft ? (
                    <div className="text-left flex flex-col justify-center">
                      <span className="font-[600] tracking-[0.02em] text-[#7557e8]" style={{ fontSize: '13px' }}>{feat.id}</span>
                      <span className="font-[580] text-[#1d1b4c] leading-[1.18] tracking-[-0.015em] mt-[6px]" style={{ fontSize: 'min(15px, 4vw)' }}>
                        {feat.title1} {feat.title2}
                      </span>
                    </div>
                  ) : (
                    <div className="w-[125px]">
                      <feat.Illus />
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
}

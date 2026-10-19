'use client';

import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  CalendarCheck, 
  ChartLineUp, 
  MegaphoneSimple, 
  CreditCard, 
  Bank, 
  ArrowsLeftRight,
  ChatText,
  EnvelopeSimple
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: '01',
    title: 'Aidat Takibi',
    description: 'Borçlandırmaları ve tahsilat durumunu tek ekrandan izleyin.',
    Icon: () => <CalendarCheck size={42} weight="duotone" />
  },
  {
    id: '02',
    title: 'Finansal Raporlama',
    description: 'Gelir, gider ve bakiyeleri anlaşılır raporlarla yönetin.',
    Icon: () => <ChartLineUp size={42} weight="duotone" />
  },
  {
    id: '03',
    title: 'Duyuru & İlan',
    description: 'Site sakinleriyle güncel bilgileri anında paylaşın.',
    Icon: () => <MegaphoneSimple size={42} weight="duotone" />
  },
  {
    id: '04',
    title: 'Kredi Kartıyla Tahsilat',
    description: 'Aidat ve borçları güvenli online ödeme ile tahsil edin.',
    Icon: () => <CreditCard size={42} weight="duotone" />
  },
  {
    id: '05',
    title: 'Banka Entegrasyonu',
    description: 'Banka hareketlerini otomatik aktarın ve kolayca eşleştirin.',
    Icon: () => (
      <div className="relative">
        <Bank size={42} weight="duotone" />
        <div className="absolute -bottom-1 -right-1 bg-[#fcfbff] rounded-full p-[2px]">
          <ArrowsLeftRight size={18} weight="bold" />
        </div>
      </div>
    )
  },
  {
    id: '06',
    title: 'Kurumsal SMS & Mail',
    description: 'Toplu bildirimleri doğru kanaldan hızla ulaştırın.',
    Icon: () => (
      <div className="relative">
        <ChatText size={42} weight="duotone" />
        <div className="absolute -bottom-1 -right-1 bg-[#fcfbff] rounded-full p-[2px]">
          <EnvelopeSimple size={18} weight="bold" />
        </div>
      </div>
    )
  }
];

export default function FeatureEditorialIndex() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (!isReduced) {
        gsap.set('.feature-index__heading', { autoAlpha: 0, y: 10 });
        gsap.set('.feature-index__intro', { autoAlpha: 0, y: 10 });
        gsap.set('.feature-index__item', { autoAlpha: 0, y: 6 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          }
        });

        tl.to('.feature-index__heading', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' })
          .to('.feature-index__intro', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
          .to('.feature-index__item', { 
            autoAlpha: 1, 
            y: 0, 
            duration: 0.4, 
            stagger: 0.08, 
            ease: 'power2.out' 
          }, '-=0.2');
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="features" 
      ref={sectionRef} 
      className="relative overflow-hidden pt-24 pb-32"
      style={{
        background: `radial-gradient(circle at 50% 0%, rgba(122, 91, 255, 0.09), transparent 42%), #fcfbff`
      }}
    >
      <div className="mx-auto" style={{ maxWidth: '1320px', padding: '0 clamp(32px, 6vw, 96px)' }}>
        
        <header className="feature-index__header">
          <div className="feature-index__heading-wrap">
            <span className="block text-[11px] md:text-[13px] font-[600] tracking-[0.18em] text-[#6f4fe8] uppercase mb-5 opacity-80">
              TÜM YÖNETİM TEK YERDE
            </span>
            <h2 className="feature-index__heading">
              Yönetimin ihtiyaç duyduğu<br/>her şey Wisbu’da.
            </h2>
          </div>
          <p className="feature-index__intro">
            Tahsilattan raporlamaya, banka hareketlerinden sakinlerle iletişime kadar tüm süreçleri tek platform üzerinden yönetin.
          </p>
        </header>

        <div className="feature-index__grid">
          {features.map((feat) => (
            <div key={feat.id} className="feature-index__item group">
              <div className="feature-index__icon">
                <feat.Icon />
              </div>
              <div className="feature-index__content">
                <h3 className="feature-index__title group-hover:text-[#100f2e] transition-colors duration-280">
                  {feat.title}
                </h3>
                <p className="feature-index__description">
                  {feat.description}
                </p>
              </div>
              <div className="feature-index__number">
                {feat.id}
              </div>
              {/* Custom hover line effect */}
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#6f4fe8] transition-all duration-300 ease-out group-hover:w-16" />
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .feature-index__header {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(300px, 0.75fr);
          align-items: end;
          gap: 96px;
          margin-bottom: 72px;
        }

        .feature-index__heading {
          margin: 0;
          font-size: clamp(44px, 4vw, 68px);
          line-height: 0.98;
          letter-spacing: -0.052em;
          font-weight: 560;
          color: #1d1b4c;
        }

        .feature-index__intro {
          margin: 0;
          max-width: 480px;
          font-size: clamp(16px, 1.1vw, 19px);
          line-height: 1.65;
          color: #777694;
        }

        .feature-index__grid {
          position: relative;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-template-rows: repeat(3, auto);
          grid-auto-flow: column;
          column-gap: 72px;
          border-top: 1px solid rgba(36, 31, 84, 0.13);
        }

        /* Dikey Merkez Çizgisi */
        .feature-index__grid::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: calc(50% - 36px);
          width: 1px;
          background: rgba(36, 31, 84, 0.08);
          pointer-events: none;
        }

        .feature-index__item {
          position: relative;
          display: grid;
          grid-template-columns: 56px minmax(0, 1fr) auto;
          align-items: start;
          gap: 24px;
          min-height: 154px;
          padding: 34px 0 30px;
          border-bottom: 1px solid rgba(36, 31, 84, 0.13);
          background: transparent;
        }

        .feature-index__icon {
          position: relative;
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          color: #6f4fe8;
          transition: transform 280ms ease;
        }
        
        .feature-index__item:hover .feature-index__icon {
          transform: translateX(3px);
        }

        .feature-index__icon::before {
          content: "";
          position: absolute;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(111, 79, 232, 0.08);
          filter: blur(0);
          z-index: -1;
        }

        .feature-index__title {
          margin: 0;
          font-size: clamp(20px, 1.45vw, 25px);
          line-height: 1.2;
          letter-spacing: -0.025em;
          font-weight: 600;
          color: #1d1b4c;
          transition: color 280ms ease;
        }

        .feature-index__description {
          max-width: 440px;
          margin: 9px 0 0;
          font-size: clamp(14px, 0.95vw, 16px);
          line-height: 1.55;
          color: #85839e;
        }

        .feature-index__number {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: rgba(111, 79, 232, 0.72);
        }

        @media (max-width: 900px) {
          .feature-index__header {
            grid-template-columns: 1fr;
            gap: 32px;
            margin-bottom: 48px;
          }
          
          .feature-index__grid {
            grid-template-columns: 1fr;
            grid-auto-flow: row;
          }

          .feature-index__grid::after {
            display: none;
          }

          .feature-index__item {
            min-height: 132px;
            gap: 20px;
          }
        }
      `}} />
    </section>
  );
}

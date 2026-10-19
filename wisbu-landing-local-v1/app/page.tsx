"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import ContactModal from "../components/ContactModal";
import dynamic from 'next/dynamic';
import LegacyFeaturesGrid from "../components/LegacyFeaturesGrid";

import HeroVideoBackground from "../components/HeroVideoBackground";
import FeatureFlowPrototypeV1 from "../components/FeatureFlowPrototypeV1";
import FeatureFlowPrototypeV2 from "../components/FeatureFlowPrototypeV2";
import FeatureFlowMotionV1 from "../components/FeatureFlowMotionV1";
import FeatureFlowMotionV2Study from "../components/FeatureFlowMotionV2Study";
import FeatureFlowVisualV3 from "../components/FeatureFlowVisualV3";
import FeatureFlowVisualV3Polished from "../components/FeatureFlowVisualV3Polished";
import FeatureEditorialIndex from "../components/FeatureEditorialIndex";
import FeatureSystemShowcase from "../components/FeatureSystemShowcase";
import UnifiedFeatureFlow from "../components/UnifiedFeatureFlow";
import PremiumFooter from "../components/PremiumFooter";

const USE_FEATURE_FLOW_PROTOTYPE: 'v1' | 'v2' | 'v1_motion' | 'v2_study' | 'v3' | 'v3_polished' | 'v4_surface' | 'v5_atlas' | 'v6_editorial' | 'legacy' = 'legacy';

function CountUp({ end, prefix = "", suffix = "", duration = 2000 }: { end: number, prefix?: string, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      const easedPercent = easeOutQuart(percent);

      setCount(Math.floor(easedPercent * end));

      if (percent < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span ref={ref} className="inline-block">{prefix}{count}{suffix}</span>;
}

const steps = [
  {
    number: "01",
    title: "Aidatları oluşturun",
    text: "Dönemi ve tutarı seçin; bağımsız bölümlere toplu borçlandırma yapın.",
    label: "120 bağımsız bölüm borçlandırıldı",
    tone: "purple",
  },
  {
    number: "02",
    title: "Sakinleri bilgilendirin",
    text: "Yeni borç ve duyuruları seçtiğiniz kanallardan hızla ulaştırın.",
    label: "Bildirimler gönderildi",
    tone: "blue",
  },
  {
    number: "03",
    title: "Ödemeleri takip edin",
    text: "Kart ve banka hareketlerini tek ekrandan görüntüleyip işleyin.",
    label: "₺2.450 ödeme görüntülendi",
    tone: "green",
  },
  {
    number: "04",
    title: "Raporları inceleyin",
    text: "Borç, tahsilat ve finansal durumu güncel verilerle izleyin.",
    label: "Tahsilat raporu güncellendi",
    tone: "orange",
  },
];

const articles = [
  {
    category: "Aidat ve Ödemeler",
    title: "Apartman aidatı nasıl belirlenir?",
    description: "Ortak giderlerden işletme projesine, aidat hesaplamanın temel adımları.",
    time: "5 dk okuma",
    url: "/icerikler/aidat-nasil-belirlenir",
  },
  {
    category: "Yönetici Rehberi",
    title: "Site yöneticisinin görevleri nelerdir?",
    description: "Yeni ve deneyimli yöneticiler için sorumlulukların sade özeti.",
    time: "6 dk okuma",
    url: "/icerikler/yonetici-gorevleri",
  },
  {
    category: "Ortak Yaşam",
    title: "Kiracı ve ev sahibi hangi giderleri öder?",
    description: "Sık karıştırılan ortak giderleri anlaşılır örneklerle inceleyin.",
    time: "4 dk okuma",
    url: "/icerikler/kiraci-ev-sahibi-giderleri",
  },
];

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCtaVisible, setIsCtaVisible] = useState(false);
  const ctaRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCtaVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (ctaRef.current) observer.observe(ctaRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.35) {
            entry.target.classList.add("is-revealed");
          } else if (entry.intersectionRatio < 0.1) {
            entry.target.classList.remove("is-revealed");
          }
        });
      },
      { threshold: [0, 0.1, 0.35] }
    );

    const elements = document.querySelectorAll(".reveal-wrapper");
    elements.forEach((el) => {
      el.classList.add("js-ready");
      revealObserver.observe(el);
    });

    return () => revealObserver.disconnect();
  }, []);

  return (
    <main>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="w-full relative hero-visual-layer" style={{ background: 'linear-gradient(180deg, #1e1b4b 0%, #312e81 35%, #c5c1de 100%)' }}>

        {/* NAVBAR */}
        <header className={`fixed top-0 left-0 w-full z-[100] grid grid-cols-[1fr_auto_1fr] items-center gap-4 px-4 sm:px-6 lg:px-8 transition-all duration-200 ${isScrolled ? 'h-[64px] bg-[#1e1b4b]/95 backdrop-blur-md shadow-md border-b border-indigo-500/20' : 'h-[64px] md:h-[76px] bg-transparent'}`}>
          <a className={`justify-self-start relative inline-flex items-end gap-[3px] !text-white text-[28px] font-[600] tracking-[-1.8px] leading-none transition-transform duration-200 ${isScrolled ? 'scale-[0.9]' : 'scale-100 origin-left'}`} href="#top" aria-label="Wisbu anasayfa">
            <img src="/assets/wisbu-marka.svg" alt="Wisbu" className="brightness-0 invert h-[28px] w-auto" />
          </a>

          <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-[600]" aria-label="Ana navigasyon">
            <a className="!text-white hover:!text-slate-200 transition-colors" href="#how">Nasıl Çalışır?</a>
            <a className="!text-white hover:!text-slate-200 transition-colors" href="#features">Özellikler</a>
            <a className="!text-white hover:!text-slate-200 transition-colors" href="#guven">Güven</a>
            <a className="!text-white hover:!text-slate-200 transition-colors" href="#guide">Rehber</a>
          </nav>

          <div className="justify-self-end flex items-center gap-2 md:gap-4">
            <a className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-[600] text-[#312e81] bg-[#fbfbfe] rounded-full transition-all duration-200 hover:-translate-y-[2px] hover:bg-white" href="https://app.wisbu.net/pages/authentication/register">
              30 Gün Ücretsiz Deneyin
            </a>
            <a className="inline-flex items-center justify-center px-[20px] py-[10px] h-[42px] md:h-[44px] bg-white/10 !text-white border border-white/20 text-sm font-[600] rounded-full shadow-lg hover:bg-white/20 hover:-translate-y-[2px] transition-all duration-200 backdrop-blur-sm" href="https://app.wisbu.net/pages/authentication/login">
              Giriş Yap
            </a>
          </div>
        </header>

        {/* HERO SECTION */}
        <section
          className="relative min-h-[100svh] md:min-h-[clamp(820px,100svh,980px)] w-full overflow-hidden"
          id="top"
        >
          <HeroVideoBackground />

          <div className="hero-content absolute inset-0 pt-[140px] md:pt-[clamp(160px,22vh,240px)] flex flex-col items-center justify-start pointer-events-none max-w-4xl mx-auto px-4 text-center" style={{ zIndex: 6 }}>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-[600] tracking-tight text-white mb-6">
              Yönetim artık tek ekranda.
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium max-w-2xl mb-10 leading-relaxed">
              Ücretsiz kurulum, ilk veri girişi ve transfer hizmetlerimiz ile yanınızdayız.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pointer-events-auto">
              <a href="https://app.wisbu.net/pages/authentication/register" className="h-[54px] md:h-[56px] px-[28px] bg-[#fbfbfe] text-[#312e81] font-[600] rounded-full text-base sm:text-lg shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-[2px] hover:bg-white transition-all duration-200 flex justify-center items-center">
                30 Gün Ücretsiz Deneyin
              </a>
              <button onClick={() => setIsModalOpen(true)} className="h-[54px] md:h-[56px] px-[28px] bg-white/10 backdrop-blur-md text-white font-[600] rounded-full text-base sm:text-lg border border-white/20 shadow-lg hover:bg-white/20 hover:shadow-indigo-500/30 hover:-translate-y-[2px] transition-all duration-200 flex justify-center items-center">
                Sizi Arayalım
              </button>
            </div>
          </div>
          <div className="hero-bottom-fade" aria-hidden="true" />
        </section>

      </div>

      <div className="seamless-light-canvas">
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --light-entry-color: #efeff7;
            --light-entry-rgb: 239, 239, 247;
          }

          .hero-bottom-fade {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: clamp(100px, 15%, 160px);
            z-index: 3;
            pointer-events: none;

            background:
              linear-gradient(
                180deg,
                rgba(var(--light-entry-rgb), 0) 0%,
                rgba(var(--light-entry-rgb), 0.035) 14%,
                rgba(var(--light-entry-rgb), 0.09) 27%,
                rgba(var(--light-entry-rgb), 0.18) 40%,
                rgba(var(--light-entry-rgb), 0.31) 53%,
                rgba(var(--light-entry-rgb), 0.47) 65%,
                rgba(var(--light-entry-rgb), 0.64) 76%,
                rgba(var(--light-entry-rgb), 0.79) 85%,
                rgba(var(--light-entry-rgb), 0.91) 93%,
                var(--light-entry-color) 100%
              );
          }

          .seamless-light-canvas {
            position: relative;
            isolation: isolate;
            display: flow-root;
            width: 100%;
            background-color: var(--light-entry-color);
          }

          .seamless-light-canvas::before {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 0;
            pointer-events: none;

            background:
              radial-gradient(
                ellipse 80% 18% at 12% 22%,
                rgba(116, 91, 244, 0.12) 0%,
                rgba(116, 91, 244, 0.045) 44%,
                transparent 82%
              ),
              radial-gradient(
                ellipse 74% 19% at 90% 27%,
                rgba(155, 123, 255, 0.13) 0%,
                rgba(155, 123, 255, 0.068) 36%,
                rgba(155, 123, 255, 0.022) 60%,
                rgba(155, 123, 255, 0) 82%
              ),
              radial-gradient(
                ellipse 84% 20% at 18% 49%,
                rgba(102, 76, 229, 0.115) 0%,
                rgba(102, 76, 229, 0.055) 38%,
                rgba(102, 76, 229, 0.018) 64%,
                rgba(102, 76, 229, 0) 84%
              ),
              radial-gradient(
                ellipse 78% 18% at 86% 70%,
                rgba(139, 107, 255, 0.115) 0%,
                rgba(139, 107, 255, 0.052) 40%,
                rgba(139, 107, 255, 0.016) 65%,
                rgba(139, 107, 255, 0) 84%
              ),
              radial-gradient(
                ellipse 78% 14% at 30% 88%,
                rgba(119, 93, 241, 0.075) 0%,
                rgba(119, 93, 241, 0.03) 46%,
                rgba(119, 93, 241, 0) 82%
              ),
              linear-gradient(
                180deg,
                var(--light-entry-color) 0%,
                #f3f1fb 14%,
                #f7f5ff 30%,
                #f5f2ff 48%,
                #faf9ff 66%,
                #f5f2ff 82%,
                #ffffff 100%
              );
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          @media (max-width: 768px) {
            .seamless-light-canvas::before {
              background:
                radial-gradient(
                  ellipse 125% 13% at 12% 22%,
                  rgba(116, 91, 244, 0.12) 0%,
                  rgba(116, 91, 244, 0.045) 52%,
                  transparent 82%
                ),
                radial-gradient(
                  ellipse 120% 15% at 88% 40%,
                  rgba(151, 119, 255, 0.105) 0%,
                  rgba(151, 119, 255, 0.038) 54%,
                  transparent 84%
                ),
                radial-gradient(
                  ellipse 128% 14% at 20% 72%,
                  rgba(103, 78, 229, 0.085) 0%,
                  rgba(103, 78, 229, 0.03) 56%,
                  transparent 86%
                ),
                linear-gradient(
                  180deg,
                  var(--light-entry-color) 0%,
                  #f7f5ff 28%,
                  #f5f2ff 58%,
                  #faf9ff 86%,
                  #ffffff 100%
                );
            }
          }

          .seamless-light-canvas > * {
            position: relative;
            z-index: 1;
            background: transparent !important;
            background-color: transparent !important;
          }
        `}} />

        {/* AVANTAJ ŞERİDİ */}
        <section id="guven" className="relative z-10 assurance-strip" style={{ scrollMarginTop: '64px' }}>
          <div className="assurance-strip__inner">
            <div className="assurance-item">
              <span className="assurance-item__primary">30 gün</span>
              <span className="assurance-item__secondary">ücretsiz deneme</span>
            </div>
            <div className="assurance-item">
              <span className="assurance-item__primary">Ücretsiz</span>
              <span className="assurance-item__secondary">kurulum</span>
            </div>
            <div className="assurance-item">
              <span className="assurance-item__primary">İlk veri</span>
              <span className="assurance-item__secondary">transferi</span>
            </div>
            <div className="assurance-item">
              <span className="assurance-item__primary">Destek</span>
              <span className="assurance-item__secondary">ekibi</span>
            </div>
          </div>
        </section>

        {USE_FEATURE_FLOW_PROTOTYPE === 'v6_editorial' ? (
          <FeatureEditorialIndex />
        ) : USE_FEATURE_FLOW_PROTOTYPE === 'v5_atlas' ? (
          <FeatureSystemShowcase />
        ) : USE_FEATURE_FLOW_PROTOTYPE === 'v4_surface' ? (
          <UnifiedFeatureFlow />
        ) : USE_FEATURE_FLOW_PROTOTYPE === 'v3_polished' ? (
          <FeatureFlowVisualV3Polished />
        ) : USE_FEATURE_FLOW_PROTOTYPE === 'v3' ? (
          <FeatureFlowVisualV3 />
        ) : USE_FEATURE_FLOW_PROTOTYPE === 'v2_study' ? (
          <FeatureFlowMotionV2Study />
        ) : USE_FEATURE_FLOW_PROTOTYPE === 'v1_motion' ? (
          <FeatureFlowMotionV1 />
        ) : USE_FEATURE_FLOW_PROTOTYPE === 'v2' ? (
          <FeatureFlowPrototypeV2 />
        ) : USE_FEATURE_FLOW_PROTOTYPE === 'v1' ? (
          <FeatureFlowPrototypeV1 />
        ) : (
          <LegacyFeaturesGrid />
        )}



      <section className="product-showcase w-full bg-transparent" id="product">
        <div className="container-product relative z-20">
          <div className="product-showcase__header text-center">
            <span className="text-xs font-[600] tracking-widest text-slate-500 uppercase mb-3 block">WISBU İŞ BAŞINDA</span>
            <h2 className="text-3xl md:text-4xl font-[400] text-slate-900 leading-tight mb-4">
              Günlük yönetim akışını<br />tek merkezden yönetin.
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Borçlandırmadan banka kontrolüne, finansal görünümden toplu iletişime kadar temel işlemleri aynı sistem içinde tamamlayın.
            </p>
          </div>

          <div className="product-flow-list">
            {/* Satır 1: Tahsilat */}
            <div className="product-flow-row feature-01-layout">
              <div className="product-flow-copy reveal-wrapper feature-01-copy">
                <div className="feature-01-copy-top">
                  <span className="text-[12px] md:text-[13px] font-[600] tracking-widest text-[#694cff] mb-5 block uppercase reveal-item reveal-item--label">01 — TAHSİLAT VE BORÇ TAKİBİ</span>
                  <h3 className="text-[#1e1b4b] font-[600] mb-6 text-[clamp(28px,8vw,32px)] leading-[1.08] -tracking-[0.025em] md:text-[clamp(32px,4vw,36px)] lg:text-[clamp(34px,3.4vw,40px)] lg:leading-[1.08] lg:-tracking-[0.03em] xl:text-[clamp(42px,3vw,52px)] xl:leading-[1.04] xl:-tracking-[0.035em] text-balance reveal-item reveal-item--title">Toplu borçlandırın, tahsilat durumunu tek bakışta<br />izleyin.</h3>
                </div>
                <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.55] font-normal text-[#363273] max-w-[440px] reveal-item reveal-item--desc feature-01-description">Borç kayıtlarını oluşturun, yapılan ödemeleri izleyin ve güncel tahsilat durumuna aynı ekran üzerinden ulaşın.</p>
              </div>
              <div className="product-flow-visual flex flex-col gap-[18px] product-flow-visual--collection">
                <div className="collection-card">
                  <img src="/assets/01kart.jpg" alt="Wisbu toplu borçlandırma ekranı" loading="lazy" decoding="async" />
                </div>
                <div className="collection-card">
                  <img src="/assets/01kart1.jpg" alt="Yıllık ve Aylık Tahsilat Oranları" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>

            {/* Satır 2: Banka */}
            <div className="product-flow-row product-flow-row--reverse product-flow-row--02">
              <div className="product-flow-copy reveal-wrapper">
                <span className="text-[12px] md:text-[13px] font-[600] tracking-widest text-[#694cff] mb-5 block uppercase reveal-item reveal-item--label">02 — BANKA VE FİNANS</span>
                <h3 className="text-[#1e1b4b] font-[600] mb-6 text-[clamp(28px,8vw,32px)] leading-[1.08] -tracking-[0.025em] md:text-[clamp(32px,4vw,36px)] lg:text-[clamp(34px,3.4vw,40px)] lg:leading-[1.08] lg:-tracking-[0.03em] xl:text-[clamp(42px,3vw,52px)] xl:leading-[1.04] xl:-tracking-[0.035em] text-balance reveal-item reveal-item--title">Banka hareketleri ve finansal görünüm tek merkezde.</h3>
                <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.55] font-normal text-[#363273] max-w-[440px] reveal-item reveal-item--desc">Hesap hareketlerini kontrol edin, ödemeleri eşleştirin ve gelir–gider durumunu güncel olarak görüntüleyin.</p>
              </div>
              <div className="product-flow-visual finance-product-stage">
                <div className="finance-card-composition">
                  <div className="finance-card finance-card--expense">
                    <img src="/assets/kart1.png" alt="Param nereye gidiyor?" loading="lazy" decoding="async" />
                  </div>
                  <div className="finance-card finance-card--unpaid">
                    <img src="/assets/kart2.png" alt="Toplam Ödenmemiş Aidat" loading="lazy" decoding="async" />
                  </div>
                  <div className="finance-card finance-card--collected">
                    <img src="/assets/kart3.png" alt="Toplam Tahsilat – Ağustos 2026" loading="lazy" decoding="async" />
                  </div>
                  <div className="finance-card finance-card--history">
                    <img src="/assets/kart4.png" alt="Gider Geçmişi" loading="lazy" decoding="async" />
                  </div>
                </div>
              </div>
            </div>

            {/* Satır 3: İletişim */}
            <div className="product-flow-row product-flow-row--communication">
              <div className="product-flow-copy reveal-wrapper">
                <span className="text-[12px] md:text-[13px] font-[600] tracking-widest text-[#694cff] mb-5 block uppercase reveal-item reveal-item--label">03 — İLETİŞİM</span>
                <h3 className="text-[#1e1b4b] font-[600] mb-6 text-[clamp(28px,8vw,32px)] leading-[1.08] -tracking-[0.025em] md:text-[clamp(32px,4vw,36px)] lg:text-[clamp(34px,3.4vw,40px)] lg:leading-[1.08] lg:-tracking-[0.03em] xl:text-[clamp(42px,3vw,52px)] xl:leading-[1.04] xl:-tracking-[0.035em] text-balance reveal-item reveal-item--title">Duyuruları doğru kişilere, anında ulaştırın.</h3>
                <p className="text-[clamp(16px,1.25vw,18px)] leading-[1.55] font-normal text-[#363273] max-w-[440px] reveal-item reveal-item--desc">Duyuru ve bilgilendirmeleri ilgili sakinlere Wisbu üzerinden hızlı ve kolay biçimde iletin.</p>
              </div>
              <div className="product-flow-visual flex justify-center items-center w-full reveal-wrapper">
                <div className="flex flex-col gap-[14px] md:gap-[16px] w-full max-w-[580px] relative">
                  
                  {/* Subtle background glow for cards */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(105,76,255,0.06)_0%,transparent_70%)] pointer-events-none -m-10"></div>

                  {/* Card 1 */}
                  <div className="relative z-10 bg-[#fbfbfe] border border-[#694cff]/15 rounded-[16px] p-5 shadow-[0_8px_32px_rgba(105,76,255,0.04)] flex items-center gap-4 w-full md:translate-x-0 reveal-notification" style={{ transitionDelay: '0ms' }}>
                    <div className="w-8 h-8 rounded-full bg-[#694cff]/10 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#694cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[11px] font-[600] text-[#694cff]/70 tracking-wide">wisbu</span>
                        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap ml-2">Şimdi</span>
                      </div>
                      <span className="text-[15px] font-[600] text-[#1e1b4b] block mb-0.5">Yeni duyuru</span>
                      <p className="text-[14px] text-slate-500 leading-snug">Asansör bakımı 14.00–16.00 saatleri arasında yapılacaktır.</p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="relative z-10 bg-[#fbfbfe] border border-[#694cff]/15 rounded-[16px] p-5 shadow-[0_8px_32px_rgba(105,76,255,0.04)] flex items-center gap-4 w-full md:translate-x-[24px] lg:translate-x-[32px] reveal-notification" style={{ transitionDelay: '80ms' }}>
                    <div className="w-8 h-8 rounded-full bg-[#694cff]/10 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#694cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[11px] font-[600] text-[#694cff]/70 tracking-wide">wisbu</span>
                        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap ml-2">5 dk önce</span>
                      </div>
                      <span className="text-[15px] font-[600] text-[#1e1b4b] block mb-0.5">Aidat hatırlatması</span>
                      <p className="text-[14px] text-slate-500 leading-snug">Bu aya ait aidat ödemeniz hesabınıza yansıtılmıştır.</p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="relative z-10 bg-[#fbfbfe] border border-[#694cff]/15 rounded-[16px] p-5 shadow-[0_8px_32px_rgba(105,76,255,0.04)] flex items-center gap-4 w-full md:translate-x-[8px] lg:translate-x-[16px] reveal-notification" style={{ transitionDelay: '160ms' }}>
                    <div className="w-8 h-8 rounded-full bg-[#694cff]/10 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#694cff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="text-[11px] font-[600] text-[#694cff]/70 tracking-wide">wisbu</span>
                        <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap ml-2">1 sa önce</span>
                      </div>
                      <span className="text-[15px] font-[600] text-[#1e1b4b] block mb-0.5">Bilgilendirme</span>
                      <p className="text-[14px] text-slate-500 leading-snug">Planlı su kesintisi hakkında yeni bir duyuru paylaşıldı.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </div>

      <div className="relative z-0">
        {/* Skyline outside the sticky stack */}
        <div className="skyline-transition" aria-hidden="true"><div className="w-full h-[48px] md:h-[68px] lg:h-[86px] bg-gradient-to-b from-[#817ac2]/15 to-[#1e1b4b] [mask-image:url('/assets/city.png')] [-webkit-mask-image:url('/assets/city.png')] [mask-repeat:repeat-x] [-webkit-mask-repeat:repeat-x] [mask-position:center_bottom] [-webkit-mask-position:center_bottom] [mask-size:auto_100%] [-webkit-mask-size:auto_100%]"></div></div>

        <div className="guide-faq-stack overflow-visible">
          <div className="guide-sticky-frame bg-[#1e1b4b]">
            <section className="w-full relative guide-section bg-[#1e1b4b]" id="guide">
              <div className="container-main relative z-10">
                <div className="w-full">
                  <div className="section-heading guide-heading mb-6 md:mb-8 !text-white !flex !flex-col !items-center !justify-center text-center w-full">
                    <span className="kicker !text-indigo-300">WISBU REHBER</span>
                    <h2 className="!text-white font-[500]">Yaşam alanınızı daha bilinçli yönetin.</h2>
                    <a className="text-link !text-indigo-300 hover:!text-white mt-2" href="/icerikler" target="_blank" rel="noopener noreferrer">Tüm içerikleri keşfedin →</a>
                  </div>
                  <div className="article-grid grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                      <div className="overflow-hidden flex flex-col rounded-2xl bg-white shadow-md" key={article.title}>
                        <img
                          src={index === 0 ? "/assets/aidat.jpg" : index === 1 ? "/assets/gorev.jpg" : "/assets/gider.jpg"}
                          alt={index === 0 ? "Aidat Yönetimi" : index === 1 ? "Yönetici Görevleri" : "Gider Yönetimi"}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-40 md:h-44 object-cover object-center"
                        />
                        <article className="article-card p-5 flex-1 flex flex-col">
                          <span className="article-category !text-indigo-700 font-[600] text-sm">{article.category}</span>
                          <h3 className="!text-slate-900 font-[600] mt-1">{article.title}</h3>
                          <p className="!text-slate-600 mt-1 flex-1 text-[13px] md:text-sm">{article.description}</p>
                          <footer className="mt-3 flex items-center justify-between"><span className="!text-slate-500 font-medium text-sm">{article.time}</span><a className="!text-indigo-600 hover:!text-indigo-800 hover:underline font-semibold text-sm" href={article.url} target="_blank" rel="noopener noreferrer">Yazıyı oku →</a></footer>
                        </article>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="guide-hold" aria-hidden="true" />

          <section className="faq-cover-section w-full bg-[#fbfbfe] relative z-[2] pt-[var(--section-space-md)] pb-[var(--section-space-md)]" id="faq">
            <div className="container-reading flex flex-col items-center">
              <div className="flex flex-col items-center text-center w-full mb-12">
                <span className="kicker !text-slate-500 mb-2 font-[600]">SIK SORULAN SORULAR</span>
                <h2 className="!text-slate-900 text-3xl md:text-4xl font-[400]">Başlamadan önce<br />bilmeniz gerekenler.</h2>
              </div>

              <div className="faq-list w-full max-w-3xl mx-auto">
                <details open><summary className="font-[500]">Kredi kartıyla aidat tahsilatı nasıl aktif edilir?<span className="font-[400]">+</span></summary><p className="font-[400]">Wisbu ekibiyle iletişime geçerek sanal POS başvurusu oluşturulur. Gerekli evrakların onaylanmasının ardından ödeme altyapısı aktif edilir.</p></details>
                <details><summary className="font-[500]">Yeni bir banka hesabı açmak gerekir mi?<span className="font-[400]">+</span></summary><p className="font-[400]">Hayır. Başvuru sırasında belirteceğiniz mevcut IBAN bilgisi ödeme aktarımı için kullanılabilir.</p></details>
                <details><summary className="font-[500]">Mevcut verilerimizi Wisbu’ya taşıyabilir miyiz?<span className="font-[400]">+</span></summary><p className="font-[400]">Evet. İlk veri girişi ve transfer sürecinde Wisbu destek ekibinden yardım alabilirsiniz.</p></details>
                <details><summary className="font-[500]">Wisbu’yu ne kadar süre ücretsiz deneyebiliriz?<span className="font-[400]">+</span></summary><p className="font-[400]">Wisbu’yu 30 gün boyunca ücretsiz deneyerek yönetim ihtiyaçlarınıza uygunluğunu değerlendirebilirsiniz.</p></details>
              </div>
            </div>
          </section>
        </div>
      </div>

      <PremiumFooter />
    </main>
  );
}


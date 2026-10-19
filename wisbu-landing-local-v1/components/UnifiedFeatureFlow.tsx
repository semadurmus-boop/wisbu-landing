'use client';

import React, { useRef, useLayoutEffect, useState, useId } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FeatureFlowVisualV4ControlSurface, { V4ControlSurfaceRefs } from './FeatureFlowVisualV4ControlSurface';
import FeatureFlowVisualV4Payments, { V4PaymentsRefs } from './FeatureFlowVisualV4Payments';

gsap.registerPlugin(ScrollTrigger);

export default function UnifiedFeatureFlow() {
  const uniqueId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const managementSceneRef = useRef<HTMLDivElement>(null);
  const paymentsSceneRef = useRef<HTMLDivElement>(null);
  
  // Visual refs
  const v1Refs = useRef<V4ControlSurfaceRefs>(null);
  const v2Refs = useRef<V4PaymentsRefs>(null);
  
  // Text tracking
  const [activeIndex, setActiveIndex] = useState(1);
  const activeIndexRef = useRef(1);

  const updateActiveIndex = (index: number) => {
    if (activeIndexRef.current !== index) {
      activeIndexRef.current = index;
      setActiveIndex(index);
    }
  };

  useLayoutEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 900;
    
    const ctx = gsap.context(() => {
      
      const v1 = v1Refs.current;
      const v2 = v2Refs.current;
      
      if (!v1 || !v2) return;

      if (isReduced || isMobile) {
        // Mobile layout is handled mostly by CSS, just set initial visual states
        gsap.set(managementSceneRef.current, { opacity: 1, scale: 1, x: 0, y: 0, position: 'relative' });
        gsap.set(paymentsSceneRef.current, { opacity: 1, scale: 1, x: 0, y: 0, position: 'relative' });
        
        // Final states for all V1 animations
        gsap.set(v1.duesSystem, { y: 0, opacity: 1 });
        gsap.set(v1.currencyToken, { x: 0, opacity: 1 });
        gsap.set(v1.reportCore, { y: 0, opacity: 1 });
        gsap.set(v1.reportLayer1, { x: 0, y: 0 });
        gsap.set(v1.reportLayer2, { x: 0, y: 0 });
        v1.reportRows.forEach(r => gsap.set(r, { opacity: 1 }));
        v1.chartColumns.forEach(c => gsap.set(c, { scaleY: 1 }));
        gsap.set(v1.chartLine, { strokeDashoffset: 0, opacity: 1 });
        gsap.set(v1.chartMintDot, { opacity: 1 });
        gsap.set(v1.announcementPanel, { y: 0, opacity: 1 });
        v1.announcementRoutes.forEach(r => gsap.set(r, { opacity: 1, strokeDashoffset: 0 }));
        v1.recipients.forEach(r => { if (r) gsap.set(r.querySelector('.status-dot'), { fill: '#16bd83' }); });

        // Final states for V2
        gsap.set([v2.cardGroup, v2.token, v2.tapes], { y: 0, x: 0, opacity: 1 });
        v2.segments.forEach(s => gsap.set(s, { x: 0 }));
        v2.matchingLines.forEach(l => gsap.set(l, { opacity: 1 }));
        gsap.set(v2.mintValidation, { opacity: 1, scale: 1 });
        gsap.set([v2.smsRail, v2.mailRail], { opacity: 1 });
        gsap.set(v2.routes, { strokeDashoffset: 0, opacity: 1 });
        v2.receivers.forEach(r => { if (r) gsap.set(r.querySelector('.status-dot'), { fill: '#16bd83' }); });
        
        return;
      }

      // 1. Set all initial states
      // Scene 1 (V1) text and container
      gsap.set(".scene1-text", { autoAlpha: 1, x: 0, y: 0, scale: 1, zIndex: 2, pointerEvents: "auto" });
      gsap.set(".scene2-text", { autoAlpha: 0, x: 0, y: 22, scale: 1, zIndex: 1, pointerEvents: "none" });
      gsap.set(managementSceneRef.current, { autoAlpha: 1, x: 0, y: 0, scale: 1, zIndex: 2, pointerEvents: 'auto' });
      gsap.set(paymentsSceneRef.current, { autoAlpha: 0, x: 22, y: 4, scale: 0.992, zIndex: 1, pointerEvents: 'none' });

      // V1 internal elements
      gsap.set(".dues-module", { y: 8, opacity: 0 });
      gsap.set(v1.duesSpine, { scaleY: 0, transformOrigin: "bottom center" });
      gsap.set(v1.duesConnection, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(v1.currencyToken, { x: -40, opacity: 0 });
      
      gsap.set(v1.reportCore, { y: 6 });
      gsap.set(v1.reportLayer1, { x: 4, y: 4 }); // Will move to 0,0 relative to its group
      gsap.set(v1.reportLayer2, { x: 8, y: 8 });
      v1.reportRows.forEach(r => gsap.set(r, { opacity: 0, x: -10 }));
      v1.chartColumns.forEach(c => gsap.set(c, { scaleY: 0, transformOrigin: "bottom center" }));
      gsap.set(v1.chartLine, { strokeDasharray: 200, strokeDashoffset: 200 });
      gsap.set(v1.chartMintDot, { opacity: 0, scale: 0 });
      
      gsap.set(v1.announcementPanel, { y: -10, opacity: 0.5 });
      v1.announcementRoutes.forEach(r => gsap.set(r, { strokeDasharray: 150, strokeDashoffset: 150, opacity: 0 }));

      // V2 internal elements
      gsap.set(v2.cardGroup, { y: -8 });
      gsap.set(v2.cardHighlight, { strokeDasharray: "20 200", strokeDashoffset: 200 });
      gsap.set(v2.cardValidation, { opacity: 0.2 });
      gsap.set(v2.token, { x: -30, opacity: 0 });
      
      gsap.set(v2.tapes, { opacity: 0 });
      v2.segments.forEach(s => gsap.set(s, { x: -40 }));
      v2.matchingLines.forEach(l => gsap.set(l, { strokeDasharray: "4 4", opacity: 0 }));
      gsap.set(v2.mintValidation, { opacity: 0, scale: 0.8, transformOrigin: "center center" });
      
      gsap.set(v2.smsRail, { opacity: 0.3 });
      gsap.set(v2.mailRail, { opacity: 0.3 });
      gsap.set(v2.routes, { strokeDasharray: 200, strokeDashoffset: 200, opacity: 0 });

      // Calculate dynamic top for start offset
      const navOffset = 80; // approximate navbar height

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "none" },
      });

      // Use onUpdate to check progress and update ActiveIndex
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: `top top+=${navOffset}`,
        end: "bottom bottom",
        animation: tl,
        scrub: 0.65,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.140) updateActiveIndex(1);
          else if (p < 0.290) updateActiveIndex(2);
          else if (p < 0.485) updateActiveIndex(3);
          else if (p >= 0.485 && p < 0.515) updateActiveIndex(0); // hiçbir satır aktif değil
          else if (p < 0.700) updateActiveIndex(4);
          else if (p < 0.850) updateActiveIndex(5);
          else updateActiveIndex(6);
        }
      });

      // === 0.00 - 0.14: Aidat Takibi ===
      tl.to(".dues-module", { y: 0, opacity: 1, duration: 0.04, stagger: 0.01, ease: "power2.out" }, 0.0)
        .to(v1.duesSpine, { scaleY: 1, duration: 0.04 }, 0.02)
        .to(v1.duesConnection, { scaleX: 1, duration: 0.02 }, 0.04)
        .to(v1.currencyToken, { x: 0, opacity: 1, duration: 0.06, ease: "back.out(1.2)" }, 0.08);

      // === 0.14 - 0.29: Finansal Raporlama ===
      tl.to(v1.currencyToken, { x: 120, opacity: 0, duration: 0.05, ease: "power2.in" }, 0.14)
        .to(v1.reportCore, { y: 0, duration: 0.05, ease: "power1.out" }, 0.15)
        .to(v1.reportLayer1, { x: 0, y: 0, duration: 0.05 }, 0.16)
        .to(v1.reportLayer2, { x: 0, y: 0, duration: 0.05 }, 0.16)
        .to(v1.reportRows, { opacity: 1, x: 0, duration: 0.04, stagger: 0.01 }, 0.18)
        .to(v1.chartColumns, { scaleY: 1, duration: 0.04, stagger: 0.01, ease: "back.out(1.5)" }, 0.20)
        .to(v1.chartLine, { strokeDashoffset: 0, duration: 0.06, ease: "power1.inOut" }, 0.22)
        .to(v1.chartMintDot, { opacity: 1, scale: 1, duration: 0.03, ease: "back.out(2)" }, 0.26);

      // === 0.29 - 0.44: Duyuru & İlan ===
      tl.to(v1.announcementPanel, { y: 0, opacity: 1, duration: 0.05, ease: "power2.out" }, 0.30)
        .to(v1.announcementRoutes, { opacity: 1, strokeDashoffset: 0, duration: 0.06, stagger: 0.02, ease: "power1.inOut" }, 0.32);
      
      const v1Dots = v1.recipients.map(r => r?.querySelector('.status-dot'));
      tl.to(v1Dots, { fill: '#16bd83', duration: 0.04, stagger: 0.01 }, 0.38);

      // === 0.440 - 0.485: Birinci sahnenin çıkışı ===
      tl.to(".scene1-text", { autoAlpha: 0, y: -22, duration: 0.045, ease: "power2.in" }, 0.440)
        .set(".scene1-text", { visibility: "hidden", pointerEvents: "none", zIndex: 0 }, 0.485);

      tl.to(managementSceneRef.current, { autoAlpha: 0, x: -22, y: -4, scale: 0.992, duration: 0.045, ease: "power2.in" }, 0.440)
        .set(managementSceneRef.current, { visibility: "hidden", pointerEvents: "none", zIndex: 0 }, 0.485);

      // === 0.485 - 0.515: Nötr geçiş (Boş kalır) ===
      
      // === 0.515 - 0.560: İkinci sahnenin girişi ===
      tl.set(".scene2-text", { visibility: "visible", pointerEvents: "auto", zIndex: 2, opacity: 0, y: 22 }, 0.515)
        .to(".scene2-text", { autoAlpha: 1, y: 0, duration: 0.045, ease: "power2.out" }, 0.515);

      tl.set(paymentsSceneRef.current, { visibility: "visible", pointerEvents: "auto", zIndex: 2, opacity: 0, x: 22, y: 4, scale: 0.992 }, 0.515)
        .to(paymentsSceneRef.current, { autoAlpha: 1, x: 0, y: 0, scale: 1, duration: 0.045, ease: "power2.out" }, 0.515);


      // === 0.56 - 0.70: Kredi Kartıyla Tahsilat ===
      const s2Start = 0.56;
      tl.to(v2.cardGroup, { y: 12, duration: 0.05, ease: "power2.out" }, s2Start)
        .to(v2.cardHighlight, { strokeDashoffset: -20, duration: 0.05, ease: "none" }, s2Start + 0.03)
        .to(v2.cardValidation, { opacity: 1, fill: '#16bd83', duration: 0.03 }, s2Start + 0.05)
        .to(v2.token, { opacity: 1, x: 0, duration: 0.05, ease: "power2.out" }, s2Start + 0.06);

      // === 0.70 - 0.85: Banka Entegrasyonu ===
      const s3Start = 0.70;
      tl.to(v2.token, { x: 180, opacity: 0, duration: 0.05, ease: "power2.in" }, s3Start)
        .to(v2.tapes, { opacity: 1, duration: 0.03 }, s3Start + 0.03)
        .to(v2.segments, { x: 0, duration: 0.05, stagger: 0.01, ease: "power2.out" }, s3Start + 0.05)
        .to(v2.matchingLines, { opacity: 1, duration: 0.03, stagger: 0.02 }, s3Start + 0.08)
        .to(v2.mintValidation, { opacity: 1, scale: 1, duration: 0.05, ease: "back.out(1.5)" }, s3Start + 0.10);

      // === 0.85 - 1.00: Kurumsal SMS & Mail ===
      const s4Start = 0.85;
      tl.to(v2.smsRail, { opacity: 1, duration: 0.03 }, s4Start)
        .to(v2.mailRail, { opacity: 1, duration: 0.03 }, s4Start + 0.02)
        .to(v2.routes, { opacity: 1, strokeDashoffset: 0, duration: 0.05, ease: "power1.inOut" }, s4Start + 0.04);

      const v2Dots = v2.receivers.map(r => r?.querySelector('.status-dot'));
      tl.to(v2Dots, { fill: '#16bd83', duration: 0.03, stagger: 0.01 }, s4Start + 0.08);

    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="features" ref={sectionRef} className="relative w-full bg-[#f8f7ff]">
      
      {/* 
        Single Section with height: 225svh for desktop.
        For mobile, we disable sticky and height.
      */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 900px) {
          #features {
            height: 225svh;
          }
          .feature-flow-sticky {
            position: sticky;
            top: 80px;
            height: calc(100svh - 80px);
            overflow: hidden;
            display: flex;
            align-items: center;
          }
        }
        @media (max-width: 899px) {
          #features {
            height: auto;
          }
          .feature-flow-sticky {
            position: relative;
            height: auto;
            overflow: visible;
            display: flex;
            flex-direction: column;
            gap: 60px;
            padding-block: 60px;
          }
          .scene2-text {
            position: relative !important;
            opacity: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
          }
          .scene1-text {
            position: relative !important;
            opacity: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
            margin-bottom: 60px;
          }
          .v4-payments-group {
            position: relative !important;
            opacity: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
          }
          .v4-management-group {
            position: relative !important;
            opacity: 1 !important;
            transform: none !important;
            pointer-events: auto !important;
          }
          .feature-visual-stage {
            display: flex;
            flex-direction: column;
            gap: 60px;
          }
        }

        /* Active Row Styling */
        .feature-flow-row-static {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          align-items: center;
          column-gap: 14px;
          min-height: 66px;
          padding-block: 17px;
          border-bottom: 1px solid rgba(63, 54, 121, 0.18);
          position: relative;
          background: transparent;
          width: 100%;
          text-align: left;
          transition: opacity 0.2s ease;
        }

        .feature-flow-number {
          font-size: 14px;
          font-weight: 500;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          color: rgba(71, 64, 129, 0.46);
          transition: color 0.2s ease;
        }

        .feature-flow-title {
          font-size: 18px;
          font-weight: 500;
          line-height: 1.25;
          letter-spacing: -0.015em;
          color: rgba(23, 25, 66, 0.6);
          transition: color 0.2s ease, font-weight 0.2s ease;
        }

        .feature-flow-row-static.active .feature-flow-title {
          color: #171942;
          font-weight: 600;
        }
        
        .feature-flow-row-static.active .feature-flow-number {
          color: #6748e8;
          font-weight: 600;
        }

        .rail-indicator {
          position: absolute;
          left: -24px;
          top: 0;
          width: 2px;
          height: 22px;
          background-color: #6748e8;
          border-radius: 2px;
          transition: transform 0.25s ease-out;
        }
        
        @media (max-width: 768px) {
          .rail-indicator {
            left: -16px;
          }
        }

        .feature-visual-stage {
          position: relative;
          isolation: isolate;
          overflow: hidden;
        }

        [data-scene] {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          transform-origin: center center;
        }
      `}} />

      {/* Global Background Ambient (Constant) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 80% 30%, rgba(103, 72, 232, 0.08), transparent 45%),
            radial-gradient(circle at 20% 70%, rgba(103, 72, 232, 0.04), transparent 40%)
          `
        }}
        aria-hidden="true"
      />
      
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          opacity: 0.015,
          mixBlendMode: 'soft-light',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="feature-flow-sticky w-full" ref={stickyRef}>
        <div 
          className="relative z-10 w-full mx-auto"
          style={{
            maxWidth: '1480px',
            paddingInline: 'clamp(32px, 5vw, 88px)',
            display: 'grid',
            gridTemplateColumns: 'minmax(320px, 0.34fr) minmax(0, 0.66fr)',
            gap: 'clamp(60px, 7vw, 130px)',
            alignItems: 'center',
          }}
        >
          {/* LEFT: TEXT STAGE */}
          <div className="relative w-full feature-copy-stage min-h-[400px] flex items-center">
            
            {/* SCENE 1 TEXT */}
            <div className="scene1-text absolute inset-x-0 flex flex-col items-start w-full">
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(74, 59, 145, 0.68)', marginBottom: '22px', textTransform: 'uppercase' }}>
                YÖNETİMİN AKILLI AKIŞI
              </span>
              <h2 style={{ fontSize: 'clamp(54px, 5vw, 88px)', fontWeight: 500, lineHeight: 0.96, letterSpacing: '-0.055em', color: '#171942', maxWidth: '620px', margin: 0 }}>
                Tahsilattan <br/> duyuruya.
              </h2>
              <p style={{ fontSize: 'clamp(18px, 1.25vw, 21px)', lineHeight: 1.55, color: 'rgba(39, 43, 86, 0.68)', maxWidth: '520px', marginTop: '30px', marginBottom: 0 }}>
                Aidatları takip edin, finansal durumu anında raporlayın ve site sakinleriyle tek merkezden iletişim kurun.
              </p>

              <div style={{ width: 'min(520px, 100%)', marginTop: '56px', position: 'relative' }}>
                <div 
                  className="rail-indicator hidden md:block" 
                  style={{ transform: `translateY(${activeIndex === 1 ? 22 : activeIndex === 2 ? 88 : activeIndex === 3 ? 154 : -100}px)`, opacity: activeIndex >= 1 && activeIndex <= 3 ? 1 : 0 }} 
                />
                
                {[
                  { id: 1, num: '01', title: 'Aidat Takibi' },
                  { id: 2, num: '02', title: 'Finansal Raporlama' },
                  { id: 3, num: '03', title: 'Duyuru & İlan' }
                ].map((item) => (
                  <div key={item.id} className={`feature-flow-row-static ${activeIndex === item.id ? 'active' : ''}`} style={{ opacity: activeIndex === item.id || activeIndex === 0 ? 1 : 0.52 }}>
                    <div className="contents">
                      <span className="feature-flow-number">{item.num}</span>
                      <span className="feature-flow-title">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SCENE 2 TEXT */}
            <div className="scene2-text absolute inset-x-0 flex flex-col items-start w-full">
              <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.16em', color: 'rgba(74, 59, 145, 0.68)', marginBottom: '22px', textTransform: 'uppercase' }}>
                TAHSİLATIN BAĞLI AKIŞI
              </span>
              <h2 style={{ fontSize: 'clamp(54px, 5vw, 88px)', fontWeight: 500, lineHeight: 0.96, letterSpacing: '-0.055em', color: '#171942', maxWidth: '620px', margin: 0 }}>
                Ödemeden <br/> iletişime.
              </h2>
              <p style={{ fontSize: 'clamp(18px, 1.25vw, 21px)', lineHeight: 1.55, color: 'rgba(39, 43, 86, 0.68)', maxWidth: '520px', marginTop: '30px', marginBottom: 0 }}>
                Kartla ödemeleri güvenle alın, banka hareketlerini tek merkezde eşleştirin ve sonuçları SMS ile e-postadan anında paylaşın.
              </p>

              <div style={{ width: 'min(520px, 100%)', marginTop: '56px', position: 'relative' }}>
                <div 
                  className="rail-indicator hidden md:block" 
                  style={{ transform: `translateY(${activeIndex === 4 ? 22 : activeIndex === 5 ? 88 : activeIndex === 6 ? 154 : -100}px)`, opacity: activeIndex >= 4 && activeIndex <= 6 ? 1 : 0 }} 
                />
                
                {[
                  { id: 4, num: '04', title: 'Kredi Kartıyla Tahsilat' },
                  { id: 5, num: '05', title: 'Banka Entegrasyonu' },
                  { id: 6, num: '06', title: 'Kurumsal SMS & Mail' }
                ].map((item) => (
                  <div key={item.id} className={`feature-flow-row-static ${activeIndex === item.id ? 'active' : ''}`} style={{ opacity: activeIndex === item.id || activeIndex === 0 ? 1 : 0.52 }}>
                    <div className="contents">
                      <span className="feature-flow-number">{item.num}</span>
                      <span className="feature-flow-title">{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: VISUAL STAGE */}
          <div className="w-full flex items-center justify-center relative feature-visual-stage min-h-[450px]">
            {/* SHARED 2.5D PLATFORM */}
            <svg 
              viewBox="0 0 1080 660" 
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              className="w-full h-auto overflow-visible relative"
              style={{ aspectRatio: '1080 / 660', width: 'min(1080px, 90vw)', maxWidth: '100%' }}
            >
              <defs>
                <linearGradient id={`${uniqueId}-sharedPlatformBase`} x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(240, 238, 255, 0.85)" />
                  <stop offset="100%" stopColor="rgba(226, 220, 255, 0.35)" />
                </linearGradient>
                <linearGradient id={`${uniqueId}-sharedPlatformEdge`} x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(166, 154, 255, 0.7)" />
                  <stop offset="100%" stopColor="rgba(118, 87, 232, 0.3)" />
                </linearGradient>
                <filter id={`${uniqueId}-sharedPlatformShadow`} x="-30%" y="-30%" width="160%" height="170%">
                  <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#2a1b5c" floodOpacity="0.14" />
                </filter>
              </defs>

              <g data-figure="shared-platform" transform="translate(540, 510)">
                <path d="M -460 0 L 460 -35 L 440 35 L -430 70 Z" fill="none" filter={`url(#${uniqueId}-sharedPlatformShadow)`} />
                <path d="M -460 0 L 460 -35 L 460 -25 L -460 10 Z" fill={`url(#${uniqueId}-sharedPlatformEdge)`} />
                <path d="M -460 0 L 460 -35 L 440 35 L -430 70 Z" fill={`url(#${uniqueId}-sharedPlatformBase)`} stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                <path d="M -300 20 L -80 5 L 80 -5 L 300 -20" fill="none" stroke="rgba(105, 80, 212, 0.2)" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M -200 13 L -80 5 L 40 -3" fill="none" stroke="rgba(125, 94, 238, 0.6)" strokeWidth="2.5" strokeLinecap="round" />
              </g>
            </svg>

            {/* SCENE 1 VISUALS */}
            <div ref={managementSceneRef} data-scene="management">
              <svg 
                viewBox="0 0 1080 660" 
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
                className="w-full h-auto overflow-visible"
                style={{ aspectRatio: '1080 / 660' }}
              >
                <FeatureFlowVisualV4ControlSurface ref={v1Refs} />
              </svg>
            </div>

            {/* SCENE 2 VISUALS */}
            <div ref={paymentsSceneRef} data-scene="payments">
              <svg 
                viewBox="0 0 1080 660" 
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
                className="w-full h-auto overflow-visible"
                style={{ aspectRatio: '1080 / 660' }}
              >
                <FeatureFlowVisualV4Payments ref={v2Refs} />
              </svg>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

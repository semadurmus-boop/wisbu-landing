'use client';

import React, { useId, useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeatureFlowPrototypeV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Typography Refs
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const featureRailRef = useRef<HTMLDivElement>(null);

  // Rail Items
  const railRow1Ref = useRef<HTMLButtonElement>(null);
  const railRow2Ref = useRef<HTMLButtonElement>(null);
  const railRow3Ref = useRef<HTMLButtonElement>(null);
  const railInd1Ref = useRef<HTMLDivElement>(null);
  const railInd2Ref = useRef<HTMLDivElement>(null);
  const railInd3Ref = useRef<HTMLDivElement>(null);
  
  // SVG Systems
  const visualSystemRef = useRef<SVGGElement>(null);
  const aidatSystemRef = useRef<SVGGElement>(null);
  const raporSystemRef = useRef<SVGGElement>(null);
  const duyuruSystemRef = useRef<SVGGElement>(null);

  // Aidat Elements
  const aidatCoreRef = useRef<SVGGElement>(null);
  const aidatRimRef = useRef<SVGCircleElement>(null);
  const aidatNodesRef = useRef<(SVGGElement | null)[]>([]);

  // Rapor Elements
  const raporLinesRef = useRef<(SVGGElement | null)[]>([]);
  const raporCurveRef = useRef<SVGPathElement>(null);
  const raporPointsRef = useRef<(SVGGElement | null)[]>([]);

  // Duyuru Elements
  const duyuruCoreRef = useRef<SVGGElement>(null);
  const duyuruRingsRef = useRef<(SVGCircleElement | null)[]>([]);
  const duyuruNodesRef = useRef<(SVGGElement | null)[]>([]);

  // Data Paths & Particle
  const path1Ref = useRef<SVGPathElement>(null);
  const path2Ref = useRef<SVGPathElement>(null);
  const path1BlurRef = useRef<SVGPathElement>(null);
  const path2BlurRef = useRef<SVGPathElement>(null);
  const particleRef = useRef<SVGGElement>(null);

  const [isIntroDone, setIsIntroDone] = useState(false);

  const uniqueId = useId();
  const defsId = (name: string) => `${uniqueId}-${name}`;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 900;
      
      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
        onComplete: () => setIsIntroDone(true)
      });

      // --- INITIAL STATES ---
      if (!isReduced) {
        gsap.set([eyebrowRef.current, titleRef.current, descRef.current, featureRailRef.current], { opacity: 0 });
        gsap.set(titleRef.current, { y: 18 });
        gsap.set(descRef.current, { y: 14 });
        gsap.set(featureRailRef.current, { y: 12 });

        gsap.set(aidatCoreRef.current, { opacity: 0, scale: 0.92, transformOrigin: 'center center' });
        gsap.set(aidatRimRef.current, { opacity: 0 });
        gsap.set(aidatNodesRef.current, { opacity: 0, scale: 0.86, transformOrigin: 'center center' });

        gsap.set(raporLinesRef.current, { opacity: 0, x: -8 });
        gsap.set(raporPointsRef.current, { opacity: 0, scale: 0.82, transformOrigin: 'center center' });

        gsap.set(duyuruCoreRef.current, { opacity: 0, scale: 0.9, transformOrigin: 'center center' });
        gsap.set(duyuruRingsRef.current, { opacity: 0, scale: 0.88, transformOrigin: 'center center' });
        gsap.set(duyuruNodesRef.current, { opacity: 0, scale: 0.8, transformOrigin: 'center center' });

        gsap.set(particleRef.current, { opacity: 0, x: 190, y: 320 });

        // Hide inactive rail indicators
        gsap.set([railInd2Ref.current, railInd3Ref.current], { scaleY: 0, transformOrigin: 'center center' });
        gsap.set([railRow2Ref.current, railRow3Ref.current], { opacity: 0.52 });
        gsap.set(railInd1Ref.current, { scaleY: 0, transformOrigin: 'center center' });
      }

      // Prepare SVG path drawing lengths
      let len1 = 0;
      let len2 = 0;
      if (path1Ref.current && path2Ref.current) {
        len1 = path1Ref.current.getTotalLength();
        len2 = path2Ref.current.getTotalLength();
        if (!isReduced) {
          gsap.set([path1Ref.current, path1BlurRef.current], { strokeDasharray: len1, strokeDashoffset: len1 });
          gsap.set([path2Ref.current, path2BlurRef.current], { strokeDasharray: len2, strokeDashoffset: len2 });
          gsap.set(raporCurveRef.current, { strokeDasharray: 300, strokeDashoffset: 300 }); // Approximation for curve
        }
      }

      // --- CHOREOGRAPHY ---
      if (!isReduced) {
        // 0.00 - 0.55s: Typography
        tl.to(eyebrowRef.current, { opacity: 1, duration: 0.65 }, 0.0)
          .to(titleRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.06)
          .to(descRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.15)
          .to(featureRailRef.current, { opacity: 1, y: 0, duration: 0.65 }, 0.24);

        // 0.35 - 1.05s: Aidat Takibi
        tl.to(aidatCoreRef.current, { opacity: 1, scale: 1, duration: 0.7 }, 0.35)
          .to(aidatRimRef.current, { opacity: 1, duration: 0.6 }, 0.45)
          .to(aidatNodesRef.current, { 
            opacity: 1, scale: 1, 
            duration: 0.5, stagger: 0.045, 
            ease: "back.out(1.2)" 
          }, 0.5);

        // Feature Rail 1 Active
        tl.to(railInd1Ref.current, { scaleY: 1, duration: 0.38, ease: "power2.out" }, 0.35)
          .to(railRow1Ref.current, { opacity: 1, duration: 0.38 }, 0.35);

        // 0.90 - 1.75s: Finansal Raporlama
        const p1Proxy = { p: 0 };
        tl.to([path1Ref.current, path1BlurRef.current], { strokeDashoffset: 0, duration: 0.85, ease: "sine.inOut" }, 0.9)
          .to(particleRef.current, { opacity: 1, duration: 0.2 }, 0.9)
          .to(p1Proxy, {
            p: len1,
            duration: 0.85,
            ease: "sine.inOut",
            onUpdate: () => {
              if (path1Ref.current && particleRef.current) {
                const pt = path1Ref.current.getPointAtLength(p1Proxy.p);
                gsap.set(particleRef.current, { x: pt.x, y: pt.y });
              }
            }
          }, 0.9);

        // Rapor elements appear as path finishes drawing
        tl.to(raporLinesRef.current, { opacity: 1, x: 0, duration: 0.5, stagger: 0.05 }, 1.4)
          .to(raporCurveRef.current, { strokeDashoffset: 0, duration: 0.75, ease: "power2.inOut" }, 1.5)
          .to(raporPointsRef.current, { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.5)" }, 1.7);

        // Feature Rail 1 -> 2
        tl.to(railInd1Ref.current, { scaleY: 0, duration: 0.38, ease: "power2.out" }, 1.4)
          .to(railRow1Ref.current, { opacity: 0.52, duration: 0.38 }, 1.4)
          .to(railInd2Ref.current, { scaleY: 1, duration: 0.38, ease: "power2.out" }, 1.5)
          .to(railRow2Ref.current, { opacity: 1, duration: 0.38 }, 1.5);

        // 1.65 - 2.60s: Duyuru & İlan
        const p2Proxy = { p: 0 };
        tl.to([path2Ref.current, path2BlurRef.current], { strokeDashoffset: 0, duration: 0.95, ease: "sine.inOut" }, 1.65)
          .to(p2Proxy, {
            p: len2,
            duration: 0.95,
            ease: "sine.inOut",
            onUpdate: () => {
              if (path2Ref.current && particleRef.current) {
                const pt = path2Ref.current.getPointAtLength(p2Proxy.p);
                gsap.set(particleRef.current, { x: pt.x, y: pt.y });
              }
            }
          }, 1.65)
          .to(particleRef.current, { opacity: 0, duration: 0.3 }, 2.5); // Fade out signal at end

        tl.to(duyuruCoreRef.current, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }, 2.3)
          .to(duyuruRingsRef.current, { opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: "power2.out" }, 2.4)
          .to(duyuruNodesRef.current, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: "back.out(1.2)" }, 2.5);

        // Feature Rail 2 -> 3
        tl.to(railInd2Ref.current, { scaleY: 0, duration: 0.38, ease: "power2.out" }, 2.2)
          .to(railRow2Ref.current, { opacity: 0.52, duration: 0.38 }, 2.2)
          .to(railInd3Ref.current, { scaleY: 1, duration: 0.38, ease: "power2.out" }, 2.3)
          .to(railRow3Ref.current, { opacity: 1, duration: 0.38 }, 2.3);
      } else {
        setIsIntroDone(true);
      }

      // Create ScrollTrigger
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: isMobile ? "top 85%" : "top 76%",
        once: true,
        onEnter: () => {
          if (!isReduced) tl.play();
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [uniqueId]);

  // --- INTERACTIONS (Only post-intro) ---
  const handleHover = (systemIndex: number) => {
    if (!isIntroDone || window.innerWidth < 900) return;
    
    const systems = [aidatSystemRef.current, raporSystemRef.current, duyuruSystemRef.current];
    const rows = [railRow1Ref.current, railRow2Ref.current, railRow3Ref.current];
    const inds = [railInd1Ref.current, railInd2Ref.current, railInd3Ref.current];

    // Kill any ongoing tweens
    gsap.killTweensOf([...systems, ...rows, ...inds]);

    systems.forEach((sys, i) => {
      gsap.to(sys, { opacity: i === systemIndex ? 1 : 0.38, duration: 0.45, ease: "power2.out", overwrite: "auto" });
      gsap.to(rows[i], { opacity: i === systemIndex ? 1 : 0.52, duration: 0.35, ease: "power2.out", overwrite: "auto" });
      gsap.to(inds[i], { scaleY: i === systemIndex ? 1 : 0, duration: 0.35, ease: "power2.out", overwrite: "auto" });
    });

    // Local Micro Animations
    if (systemIndex === 0) {
      gsap.fromTo(aidatNodesRef.current, { scale: 0.95 }, { scale: 1, duration: 0.4, stagger: 0.02, ease: "back.out(2)" });
    } else if (systemIndex === 1) {
      gsap.fromTo(raporCurveRef.current, { strokeDasharray: 300, strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 0.65, ease: "power2.out" });
    } else if (systemIndex === 2) {
      gsap.fromTo(duyuruRingsRef.current, { scale: 0.95 }, { scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" });
    }
  };

  const handleLeave = () => {
    if (!isIntroDone || window.innerWidth < 900) return;
    const systems = [aidatSystemRef.current, raporSystemRef.current, duyuruSystemRef.current];
    const rows = [railRow1Ref.current, railRow2Ref.current, railRow3Ref.current];
    const inds = [railInd1Ref.current, railInd2Ref.current, railInd3Ref.current];

    gsap.killTweensOf([...systems, ...rows, ...inds]);

    // Restore to normal (everything fully visible, but Row 3 is active as final state, or restore neutral state)
    // The instructions say "Mouse ayrıldığında bütün sistemler yumuşak biçimde normal görünürlüğe dönmeli."
    gsap.to(systems, { opacity: 1, duration: 0.5, ease: "power2.out" });
    gsap.to(rows, { opacity: 0.52, duration: 0.5, ease: "power2.out" });
    gsap.to(inds, { scaleY: 0, duration: 0.5, ease: "power2.out" });
  };

  return (
    <section ref={containerRef} className="relative w-full bg-[#f8f7ff] overflow-clip" id="why-wisbu-v2">
      {/* Background ambient lighting */}
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

      {/* Main Container */}
      <div 
        className="relative z-10 w-full mx-auto"
        style={{
          maxWidth: '1480px',
          minHeight: 'calc(100svh - 72px)',
          paddingInline: 'clamp(32px, 5vw, 88px)',
          paddingBlock: 'clamp(90px, 11vh, 140px)',
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 0.34fr) minmax(0, 0.66fr)',
          gap: 'clamp(60px, 7vw, 130px)',
          alignItems: 'center',
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @media (max-width: 899px) {
            #why-wisbu-v2 > div {
              grid-template-columns: 1fr !important;
              gap: 60px !important;
            }
          }
          
          .feature-flow-row {
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
            cursor: pointer;
            transition: border-bottom-color 0.3s ease;
          }
          
          .feature-flow-row:disabled {
            cursor: default;
          }

          .feature-flow-row:hover:not(:disabled) {
            border-bottom-color: rgba(89, 65, 190, 0.25);
          }

          .feature-flow-number {
            font-size: 14px;
            font-weight: 500;
            line-height: 1;
            font-variant-numeric: tabular-nums;
            color: rgba(71, 64, 129, 0.46);
          }

          .feature-flow-title {
            font-size: 18px;
            font-weight: 600;
            line-height: 1.25;
            letter-spacing: -0.015em;
            color: #171942;
          }

          .active-indicator {
            position: absolute;
            left: -24px;
            top: 50%;
            margin-top: -11px;
            width: 2px;
            height: 22px;
            background-color: #6748e8;
            border-radius: 2px;
          }
          
          @media (max-width: 768px) {
            .active-indicator {
              left: -16px;
            }
          }
        `}} />

        {/* Left: Text Area */}
        <div className="flex flex-col items-start w-full">
          <span 
            ref={eyebrowRef}
            style={{
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              color: 'rgba(74, 59, 145, 0.68)',
              marginBottom: '22px',
              textTransform: 'uppercase'
            }}
          >
            YÖNETİMİN AKILLI AKIŞI
          </span>
          
          <h2 
            ref={titleRef}
            style={{
              fontSize: 'clamp(54px, 5vw, 88px)',
              fontWeight: 500,
              lineHeight: 0.96,
              letterSpacing: '-0.055em',
              color: '#171942',
              maxWidth: '620px',
              margin: 0
            }}
          >
            Tahsilattan duyuruya.
          </h2>
          
          <p 
            ref={descRef}
            style={{
              fontSize: 'clamp(18px, 1.25vw, 21px)',
              lineHeight: 1.55,
              color: 'rgba(39, 43, 86, 0.68)',
              maxWidth: '520px',
              marginTop: '30px',
              marginBottom: 0
            }}
          >
            Aidatları takip edin, finansal durumu anında raporlayın ve site sakinleriyle tek merkezden iletişim kurun.
          </p>

          {/* Feature Rail */}
          <div 
            ref={featureRailRef}
            onMouseLeave={handleLeave}
            style={{
              width: 'min(520px, 100%)',
              marginTop: '56px',
            }}
          >
            <button 
              ref={railRow1Ref}
              className="feature-flow-row"
              disabled={!isIntroDone}
              onMouseEnter={() => handleHover(0)}
              onFocus={() => handleHover(0)}
              aria-label="Aidat Takibi detaylarını görüntüle"
            >
              <div ref={railInd1Ref} className="active-indicator" aria-hidden="true" />
              <span className="feature-flow-number">01</span>
              <span className="feature-flow-title">Aidat Takibi</span>
            </button>
            
            <button 
              ref={railRow2Ref}
              className="feature-flow-row"
              disabled={!isIntroDone}
              onMouseEnter={() => handleHover(1)}
              onFocus={() => handleHover(1)}
              aria-label="Finansal Raporlama detaylarını görüntüle"
            >
              <div ref={railInd2Ref} className="active-indicator" aria-hidden="true" />
              <span className="feature-flow-number">02</span>
              <span className="feature-flow-title">Finansal Raporlama</span>
            </button>
            
            <button 
              ref={railRow3Ref}
              className="feature-flow-row"
              disabled={!isIntroDone}
              onMouseEnter={() => handleHover(2)}
              onFocus={() => handleHover(2)}
              aria-label="Duyuru ve İlan detaylarını görüntüle"
            >
              <div ref={railInd3Ref} className="active-indicator" aria-hidden="true" />
              <span className="feature-flow-number">03</span>
              <span className="feature-flow-title">Duyuru & İlan</span>
            </button>
          </div>
        </div>

        {/* Right: SVG Composition */}
        <div 
          className="w-full flex items-center justify-center relative"
          style={{ width: 'min(1000px, 66vw)', maxWidth: '100%' }}
        >
          <svg 
            viewBox="0 0 960 640" 
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="w-full h-auto overflow-visible"
            style={{ aspectRatio: '960 / 640' }}
          >
            <defs>
              <linearGradient id={defsId('glassRingGrad')} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.9)"/>
                <stop offset="100%" stopColor="rgba(255,255,255,0.2)"/>
              </linearGradient>
              
              <linearGradient id={defsId('purpleSurfaceGrad')} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7659ed"/>
                <stop offset="50%" stopColor="#5839c5"/>
                <stop offset="100%" stopColor="#39227f"/>
              </linearGradient>

              <filter id={defsId('softShadow')} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#2d2065" floodOpacity="0.08"/>
              </filter>

              <filter id={defsId('floatingShadow')} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#2d2065" floodOpacity="0.05"/>
              </filter>
              
              <filter id={defsId('mildGlow')} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>

              <filter id={defsId('particleGlow')} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              
              <filter id={defsId('dataBlur')} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="10"/>
              </filter>
            </defs>

            {/* Scale the visual system up by ~16% from the center */}
            <g ref={visualSystemRef} className="flow-visual-system" style={{ transformOrigin: '480px 320px', transform: 'scale(1.16)' }}>
              
              {/* --- UNIFIED DATA PATH --- */}
              <g>
                {/* Blur layer underneath */}
                <path ref={path1BlurRef} d="M 190 320 C 330 320, 360 370, 485 345" fill="none" stroke="#6748e8" strokeWidth="6" strokeOpacity="0.12" filter={`url(#${defsId('dataBlur')})`} />
                <path ref={path2BlurRef} d="M 485 345 C 610 320, 640 315, 770 315" fill="none" stroke="#6748e8" strokeWidth="6" strokeOpacity="0.12" filter={`url(#${defsId('dataBlur')})`} />
                
                {/* Main sharp line */}
                <path ref={path1Ref} d="M 190 320 C 330 320, 360 370, 485 345" fill="none" stroke="#6748e8" strokeWidth="2.25" strokeOpacity="0.54" strokeLinecap="round" />
                <path ref={path2Ref} d="M 485 345 C 610 320, 640 315, 770 315" fill="none" stroke="#6748e8" strokeWidth="2.25" strokeOpacity="0.54" strokeLinecap="round" />
              </g>

              {/* --- LEFT REGION: AIDAT TAKİBİ (190, 320) --- */}
              <g ref={aidatSystemRef}>
                <g transform="translate(190, 320)" filter={`url(#${defsId('softShadow')})`}>
                  {/* Outer thin glass rim */}
                  <circle ref={aidatRimRef} cx="0" cy="0" r="80" fill="none" stroke={`url(#${defsId('glassRingGrad')})`} strokeWidth="1.5" />
                  
                  {/* Core & Surface */}
                  <g ref={aidatCoreRef}>
                    <circle cx="0" cy="0" r="64" fill={`url(#${defsId('purpleSurfaceGrad')})`} stroke="rgba(255,255,255,0.5)" />
                    <circle cx="0" cy="0" r="64" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="-5" cy="-5" r="50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" opacity="0.6" filter={`url(#${defsId('mildGlow')})`} />
                    <circle cx="0" cy="0" r="10" fill="#ebe7ff" stroke="#ffffff" strokeWidth="1.5" />
                  </g>
                  
                  {/* 6 Nodes (Apartments) */}
                  {[
                    {angle: 0, status: 'default'},
                    {angle: 60, status: 'success'},
                    {angle: 120, status: 'default'},
                    {angle: 180, status: 'default'},
                    {angle: 240, status: 'success'},
                    {angle: 300, status: 'default'},
                  ].map((node, i) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const nx = Math.cos(rad) * 80;
                    const ny = Math.sin(rad) * 80;
                    const isGreen = node.status === 'success';
                    
                    return (
                      <g key={i} ref={el => { aidatNodesRef.current[i] = el; }} transform={`translate(${nx}, ${ny})`}>
                        <circle cx="0" cy="0" r="12" fill="rgba(255,255,255,0.9)" stroke={isGreen ? "#16bd83" : "rgba(103,72,232,0.4)"} strokeWidth="1.5" />
                        {isGreen && <circle cx="0" cy="0" r="4" fill="#16bd83" filter={`url(#${defsId('mildGlow')})`} />}
                      </g>
                    );
                  })}
                </g>
              </g>

              {/* --- CENTER REGION: FİNANSAL RAPORLAMA (485, 315) --- */}
              <g ref={raporSystemRef}>
                <g transform="translate(485, 315)" filter={`url(#${defsId('floatingShadow')})`}>
                  
                  {/* 3 Horizontal record lines floating in space */}
                  <g ref={el => { raporLinesRef.current[0] = el; }} transform="translate(-10, -50)">
                    <path d="M -60 0 L 80 0" fill="none" stroke="rgba(103,72,232,0.2)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="-60" cy="0" r="2.5" fill="rgba(103,72,232,0.3)" />
                  </g>

                  <g ref={el => { raporLinesRef.current[1] = el; }} transform="translate(0, 0)">
                    <path d="M -80 0 L 100 0" fill="none" stroke="rgba(103,72,232,0.25)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="-80" cy="0" r="2.5" fill="rgba(103,72,232,0.4)" />
                  </g>

                  <g ref={el => { raporLinesRef.current[2] = el; }} transform="translate(10, 50)">
                    <path d="M -100 0 L 60 0" fill="none" stroke="rgba(103,72,232,0.15)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="-100" cy="0" r="2.5" fill="rgba(103,72,232,0.2)" />
                  </g>

                  {/* Main Financial Curve (Data curve) */}
                  <g transform="translate(0, 0)">
                    <path 
                      ref={raporCurveRef}
                      d="M -70 40 Q -10 30, 20 -10 T 90 -45" 
                      fill="none" 
                      stroke="#6748e8" 
                      strokeWidth="2.5" 
                      strokeLinecap="round"
                      strokeLinejoin="round" 
                    />
                    
                    {/* 3 Control Points on the curve */}
                    <g ref={el => { raporPointsRef.current[0] = el; }} transform="translate(-70, 40)">
                      <circle cx="0" cy="0" r="5" fill="#ffffff" stroke="#6748e8" strokeWidth="1.5" />
                    </g>
                    <g ref={el => { raporPointsRef.current[1] = el; }} transform="translate(20, -10)">
                      <circle cx="0" cy="0" r="5" fill="#ffffff" stroke="#6748e8" strokeWidth="1.5" />
                    </g>
                    <g ref={el => { raporPointsRef.current[2] = el; }} transform="translate(90, -45)">
                      <circle cx="0" cy="0" r="5" fill="#ffffff" stroke="#6748e8" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="2" fill="#6748e8" />
                    </g>
                  </g>
                </g>
              </g>

              {/* --- RIGHT REGION: DUYURU & İLAN (770, 315) --- */}
              <g ref={duyuruSystemRef}>
                <g transform="translate(770, 315)">
                  {/* 2 Thin broadcast rings */}
                  <circle ref={el => { duyuruRingsRef.current[0] = el; }} cx="0" cy="0" r="65" fill="none" stroke="rgba(103,72,232,0.2)" strokeWidth="1.5" />
                  <circle ref={el => { duyuruRingsRef.current[1] = el; }} cx="0" cy="0" r="95" fill="none" stroke="rgba(103,72,232,0.12)" strokeWidth="1.5" />
                  
                  {/* Central Abstract Communication Core */}
                  <g ref={duyuruCoreRef} filter={`url(#${defsId('softShadow')})`}>
                    <circle cx="0" cy="0" r="22" fill={`url(#${defsId('purpleSurfaceGrad')})`} stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="4" fill="#ebe7ff" filter={`url(#${defsId('mildGlow')})`} />
                    <circle cx="0" cy="0" r="4" fill="#ffffff" />
                  </g>

                  {/* 5 Receiver Nodes on the outer rings */}
                  {[
                    {angle: -60, dist: 65},
                    {angle: -15, dist: 95},
                    {angle: 30, dist: 65},
                    {angle: 75, dist: 95},
                    {angle: 120, dist: 65}
                  ].map((node, i) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const nx = Math.cos(rad) * node.dist;
                    const ny = Math.sin(rad) * node.dist;
                    
                    return (
                      <g key={i} ref={el => { duyuruNodesRef.current[i] = el; }} transform={`translate(${nx}, ${ny})`}>
                        <line x1={-Math.cos(rad) * 12} y1={-Math.sin(rad) * 12} x2="0" y2="0" stroke="rgba(103,72,232,0.25)" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx="0" cy="0" r="7" fill="#ffffff" stroke="#a997ff" strokeWidth="1.5" />
                        <circle cx="0" cy="0" r="2.5" fill="#6748e8" />
                      </g>
                    );
                  })}
                </g>
              </g>

              {/* --- SIGNAL PARTICLE --- */}
              <g ref={particleRef}>
                <circle cx="0" cy="0" r="5" fill="#ffffff" />
                <circle cx="0" cy="0" r="6" fill="#a997ff" opacity="0.6" filter={`url(#${defsId('particleGlow')})`} />
              </g>

            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

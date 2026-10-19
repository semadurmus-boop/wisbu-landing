'use client';

import React, { useId, useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeatureFlowMotionV2Study() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Rail Items for transition
  const railRow1Ref = useRef<HTMLDivElement>(null);
  const railRow2Ref = useRef<HTMLDivElement>(null);
  const railRow1TextRef = useRef<HTMLDivElement>(null);
  const railRow2TextRef = useRef<HTMLDivElement>(null);
  const activeIndicatorRef = useRef<HTMLDivElement>(null);
  
  // SVG Systems
  const aidatSystemRef = useRef<SVGGElement>(null);
  const raporSystemRef = useRef<SVGGElement>(null);
  const duyuruSystemRef = useRef<SVGGElement>(null);

  // Aidat Elements
  const aidatCoreRef = useRef<SVGGElement>(null);
  const aidatGlassSweepRef = useRef<SVGCircleElement>(null);
  const validationNodeRef = useRef<SVGGElement>(null);
  const validationRingRef = useRef<SVGCircleElement>(null);
  const nodeInnerRef = useRef<SVGCircleElement>(null);
  const nodeOuterRef = useRef<SVGCircleElement>(null);

  // Rapor Elements
  const raporLinesRef = useRef<(SVGGElement | null)[]>([]);
  const raporCurveRef = useRef<SVGPathElement>(null);
  const raporPointsRef = useRef<(SVGGElement | null)[]>([]);
  const raporGroupRef = useRef<SVGGElement>(null);

  // Data Paths & Particle
  const pathTrackRef = useRef<SVGPathElement>(null);
  const pathEnergyRef = useRef<SVGPathElement>(null);
  const particleRef = useRef<SVGGElement>(null);

  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const uniqueId = useId();
  const defsId = (name: string) => `${uniqueId}-${name}`;

  // Paths
  const flatPath = "M -70 40 Q -10 38, 20 35 T 90 30";
  const finalPath = "M -70 40 Q -10 30, 20 -10 T 90 -45";
  const pathD = "M 190 320 C 330 320, 360 370, 485 345";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 900;
      
      const tl = gsap.timeline({
        paused: true,
        defaults: { overwrite: "auto" }
      });
      timelineRef.current = tl;

      // Ensure initial passive state is set properly
      const setupInitialState = () => {
        // Base Opacities
        gsap.set(duyuruSystemRef.current, { opacity: 0.25 });
        gsap.set(raporLinesRef.current, { opacity: 0.15 });
        gsap.set(raporCurveRef.current, { attr: { d: flatPath }, opacity: 0.15 });
        gsap.set(raporPointsRef.current, { opacity: 0 });
        gsap.set(raporGroupRef.current, { filter: 'none' }); // No drop shadow initially

        // Node validation initial
        gsap.set(validationRingRef.current, { scale: 0.86, opacity: 0, transformOrigin: 'center center' });
        gsap.set(nodeInnerRef.current, { fill: "rgba(255,255,255,0.9)", stroke: "rgba(103,72,232,0.4)" });
        gsap.set(nodeOuterRef.current, { opacity: 0 });

        // Core initial
        gsap.set(aidatCoreRef.current, { scale: 1, transformOrigin: 'center center' });
        gsap.set(aidatGlassSweepRef.current, { x: -100, opacity: 0 }); // sweep ready

        // Rail Initial
        gsap.set(activeIndicatorRef.current, { y: 0 });
        gsap.set(railRow1TextRef.current, { opacity: 1 });
        gsap.set(railRow2TextRef.current, { opacity: 0.52 });

        // Energy Path
        const pathLen = pathTrackRef.current?.getTotalLength() || 400;
        gsap.set(pathEnergyRef.current, { 
          strokeDasharray: `40 ${pathLen + 100}`, 
          strokeDashoffset: 40 
        });
        
        // Particle
        gsap.set(particleRef.current, { opacity: 0 });
      };

      setupInitialState();

      if (!isReduced) {
        // --- CHOREOGRAPHY ---
        
        // 0.00 - 0.32s: Ödeme doğrulaması
        tl.to(nodeInnerRef.current, { fill: "#e0f8f1", stroke: "#16bd83", duration: 0.3, ease: "power2.out" }, 0.0)
          .to(nodeOuterRef.current, { opacity: 1, duration: 0.2 }, 0.1)
          .fromTo(validationRingRef.current, 
            { scale: 0.86, opacity: 0.32 }, 
            { scale: 1.18, opacity: 0, duration: 0.32, ease: "power2.out" }, 
            0.0
          );

        // 0.26 - 0.58s: Çekirdeğin işlemi kabul etmesi
        tl.to(aidatCoreRef.current, { scale: 0.985, duration: 0.12, ease: "power2.inOut" }, 0.26)
          .to(aidatCoreRef.current, { scale: 1.012, duration: 0.12, ease: "power2.inOut" }, 0.38)
          .to(aidatCoreRef.current, { scale: 1, duration: 0.08, ease: "power3.out" }, 0.50);
        
        // Glass sweep over core
        tl.fromTo(aidatGlassSweepRef.current, 
          { x: -50, opacity: 0 }, 
          { x: 50, opacity: 0.4, duration: 0.3, ease: "power2.inOut", yoyo: true, repeat: 1 }, 
          0.26
        );

        // 0.48 - 1.20s: Veri aktarımı
        const pathLen = pathTrackRef.current?.getTotalLength() || 400;
        const pProxy = { p: 0 };
        
        tl.to(particleRef.current, { opacity: 1, duration: 0.1 }, 0.48)
          .to(pProxy, {
            p: pathLen,
            duration: 0.72,
            ease: "power2.inOut",
            onUpdate: () => {
              if (pathTrackRef.current && particleRef.current) {
                const pt = pathTrackRef.current.getPointAtLength(pProxy.p);
                gsap.set(particleRef.current, { x: pt.x, y: pt.y });
              }
            }
          }, 0.48)
          .to(pathEnergyRef.current, {
            strokeDashoffset: -pathLen,
            duration: 0.72,
            ease: "power2.inOut"
          }, 0.48)
          .to(particleRef.current, { opacity: 0, duration: 0.15 }, 1.15); // fade into report

        // Finansal Rapor Oluşumu
        tl.to(raporLinesRef.current, { opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" }, 1.1)
          .to(raporCurveRef.current, { opacity: 1, attr: { d: finalPath }, duration: 0.62, ease: "power3.out" }, 1.15)
          .to(raporPointsRef.current, { opacity: 1, duration: 0.3, stagger: 0.055, ease: "power2.out" }, 1.3)
          .set(raporGroupRef.current, { filter: `url(#${defsId('floatingShadow')})` }, 1.6); // subtle depth at end

        // Feature Rail Geçişi
        // 01 -> 02 transition duration 0.42 ease power3.inOut
        tl.to(activeIndicatorRef.current, { y: 66, duration: 0.42, ease: "power3.inOut" }, 1.15)
          .to(railRow1TextRef.current, { opacity: 0.52, duration: 0.42, ease: "power3.inOut" }, 1.15)
          .to(railRow2TextRef.current, { opacity: 1, duration: 0.42, ease: "power3.inOut" }, 1.15);

        // Smooth settle down till ~1.85s
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

      // Cleanup
      return () => {
        tl.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [uniqueId]);

  const handleReplay = () => {
    if (timelineRef.current) {
      timelineRef.current.pause(0);
      
      // Reset layout state manually just in case
      gsap.set(activeIndicatorRef.current, { y: 0 });
      gsap.set(railRow1TextRef.current, { opacity: 1 });
      gsap.set(railRow2TextRef.current, { opacity: 0.52 });
      gsap.set(raporCurveRef.current, { attr: { d: flatPath } });

      timelineRef.current.play();
    }
  };

  return (
    <section ref={containerRef} className="relative w-full bg-[#f8f7ff] overflow-clip" id="why-wisbu-v2">
      {/* Dev Replay Button */}
      {process.env.NODE_ENV === 'development' && (
        <button 
          onClick={handleReplay}
          className="absolute top-4 right-4 z-50 bg-[#171942] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#272b56] transition-colors shadow-lg"
        >
          Animasyonu Tekrar Oynat
        </button>
      )}

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

          .rail-indicator {
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
            .rail-indicator {
              left: -16px;
            }
          }

          .flow-track {
            fill: none;
            stroke: rgba(111, 86, 226, 0.16);
            stroke-width: 1.75px;
          }

          .flow-energy {
            fill: none;
            stroke: #9d80ff;
            stroke-width: 3px;
            stroke-linecap: round;
          }
        `}} />

        {/* Left: Text Area */}
        <div className="flex flex-col items-start w-full">
          <span 
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
            style={{
              width: 'min(520px, 100%)',
              marginTop: '56px',
              position: 'relative'
            }}
          >
            {/* Moving Indicator */}
            <div ref={activeIndicatorRef} className="rail-indicator" aria-hidden="true" />

            {/* Row 1 */}
            <div ref={railRow1Ref} className="feature-flow-row-static">
              <div ref={railRow1TextRef} className="contents">
                <span className="feature-flow-number">01</span>
                <span className="feature-flow-title font-semibold">Aidat Takibi</span>
              </div>
            </div>
            
            {/* Row 2 */}
            <div ref={railRow2Ref} className="feature-flow-row-static">
              <div ref={railRow2TextRef} className="contents opacity-52">
                <span className="feature-flow-number">02</span>
                <span className="feature-flow-title font-semibold">Finansal Raporlama</span>
              </div>
            </div>
            
            {/* Row 3 - Totally Passive */}
            <div className="feature-flow-row-static">
              <div className="contents opacity-52">
                <span className="feature-flow-number">03</span>
                <span className="feature-flow-title">Duyuru & İlan</span>
              </div>
            </div>
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

              <filter id={defsId('softEnergyGlow')} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
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
            </defs>

            {/* Scale the visual system up by ~16% from the center */}
            <g className="flow-visual-system" style={{ transformOrigin: '480px 320px', transform: 'scale(1.16)' }}>
              
              {/* --- UNIFIED DATA PATH --- */}
              <g>
                <path className="flow-track" d={pathD} />
                {/* Rapor to Duyuru completely passive path */}
                <path className="flow-track" d="M 485 345 C 610 320, 640 315, 770 315" />

                {/* Energy layer for Aidat -> Rapor */}
                <path ref={pathEnergyRef} className="flow-energy" d={pathD} filter={`url(#${defsId('softEnergyGlow')})`} />
                
                {/* Reference track for JS measurements (invisible) */}
                <path ref={pathTrackRef} d={pathD} fill="none" stroke="none" />
              </g>

              {/* --- LEFT REGION: AIDAT TAKİBİ (190, 320) --- */}
              <g ref={aidatSystemRef}>
                <g transform="translate(190, 320)" filter={`url(#${defsId('softShadow')})`}>
                  {/* Outer thin glass rim */}
                  <circle cx="0" cy="0" r="80" fill="none" stroke={`url(#${defsId('glassRingGrad')})`} strokeWidth="1.5" />
                  
                  {/* Core & Surface */}
                  <g ref={aidatCoreRef}>
                    <circle cx="0" cy="0" r="64" fill={`url(#${defsId('purpleSurfaceGrad')})`} stroke="rgba(255,255,255,0.5)" />
                    <circle cx="0" cy="0" r="64" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                    <circle cx="-5" cy="-5" r="50" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" opacity="0.6" filter={`url(#${defsId('mildGlow')})`} />
                    <circle cx="0" cy="0" r="10" fill="#ebe7ff" stroke="#ffffff" strokeWidth="1.5" />
                    
                    {/* Glass Sweep Effect */}
                    <circle ref={aidatGlassSweepRef} cx="0" cy="0" r="64" fill="url(#glassRingGrad)" opacity="0" style={{ mixBlendMode: 'overlay' }} />
                  </g>
                  
                  {/* 6 Nodes (Apartments) */}
                  {[
                    {angle: 0, status: 'default'},
                    {angle: 60, status: 'target'}, // The one that authenticates
                    {angle: 120, status: 'default'},
                    {angle: 180, status: 'default'},
                    {angle: 240, status: 'success'},
                    {angle: 300, status: 'default'},
                  ].map((node, i) => {
                    const rad = (node.angle * Math.PI) / 180;
                    const nx = Math.cos(rad) * 80;
                    const ny = Math.sin(rad) * 80;
                    const isGreen = node.status === 'success';
                    const isTarget = node.status === 'target';
                    
                    return (
                      <g key={i} transform={`translate(${nx}, ${ny})`}>
                        {isTarget && (
                          <circle ref={validationRingRef} cx="0" cy="0" r="12" fill="none" stroke="#16bd83" strokeWidth="1.5" />
                        )}
                        <circle 
                          ref={isTarget ? nodeInnerRef : null}
                          cx="0" cy="0" r="12" 
                          fill="rgba(255,255,255,0.9)" 
                          stroke={isGreen ? "#16bd83" : "rgba(103,72,232,0.4)"} 
                          strokeWidth="1.5" 
                        />
                        {(isGreen || isTarget) && (
                          <circle 
                            ref={isTarget ? nodeOuterRef : null}
                            cx="0" cy="0" r="4" 
                            fill="#16bd83" 
                            filter={`url(#${defsId('mildGlow')})`} 
                            opacity={isTarget ? 0 : 1}
                          />
                        )}
                      </g>
                    );
                  })}
                </g>
              </g>

              {/* --- CENTER REGION: FİNANSAL RAPORLAMA (485, 315) --- */}
              <g ref={raporSystemRef}>
                <g ref={raporGroupRef} transform="translate(485, 315)">
                  
                  {/* 3 Horizontal record lines floating in space */}
                  <g ref={el => { raporLinesRef.current[0] = el; }} transform="translate(-10, -50)">
                    <path d="M -60 0 L 80 0" fill="none" stroke="rgba(103,72,232,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="-60" cy="0" r="2.5" fill="rgba(103,72,232,0.8)" />
                  </g>

                  <g ref={el => { raporLinesRef.current[1] = el; }} transform="translate(0, 0)">
                    <path d="M -80 0 L 100 0" fill="none" stroke="rgba(103,72,232,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="-80" cy="0" r="2.5" fill="rgba(103,72,232,0.8)" />
                  </g>

                  <g ref={el => { raporLinesRef.current[2] = el; }} transform="translate(10, 50)">
                    <path d="M -100 0 L 60 0" fill="none" stroke="rgba(103,72,232,0.6)" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="-100" cy="0" r="2.5" fill="rgba(103,72,232,0.8)" />
                  </g>

                  {/* Main Financial Curve (Data curve) */}
                  <g transform="translate(0, 0)">
                    <path 
                      ref={raporCurveRef}
                      d={flatPath}
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
              {/* Totally passive in this study */}
              <g ref={duyuruSystemRef}>
                <g transform="translate(770, 315)">
                  <circle cx="0" cy="0" r="65" fill="none" stroke="rgba(103,72,232,0.2)" strokeWidth="1.5" />
                  <circle cx="0" cy="0" r="95" fill="none" stroke="rgba(103,72,232,0.12)" strokeWidth="1.5" />
                  
                  <g filter={`url(#${defsId('softShadow')})`}>
                    <circle cx="0" cy="0" r="22" fill={`url(#${defsId('purpleSurfaceGrad')})`} stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
                    <circle cx="0" cy="0" r="4" fill="#ebe7ff" filter={`url(#${defsId('mildGlow')})`} />
                    <circle cx="0" cy="0" r="4" fill="#ffffff" />
                  </g>

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
                      <g key={i} transform={`translate(${nx}, ${ny})`}>
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
                <circle cx="0" cy="0" r="6" fill="#a997ff" opacity="0.8" filter={`url(#${defsId('particleGlow')})`} />
              </g>

            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

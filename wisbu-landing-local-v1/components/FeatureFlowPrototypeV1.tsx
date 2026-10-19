'use client';

import React, { useId, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FeatureFlowPrototypeV1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Text Refs
  const aidatTextRef = useRef<HTMLDivElement>(null);
  const bankTextRef = useRef<HTMLDivElement>(null);
  const stepTextRef = useRef<HTMLSpanElement>(null);
  
  // Scene 1 Refs
  const orbitRef = useRef<SVGCircleElement>(null);
  const aidatNodesRef = useRef<(SVGGElement | null)[]>([]);
  
  // Scene 2 Refs
  const bankCapsulesRef = useRef<(SVGGElement | null)[]>([]);
  const bankPathsRef = useRef<(SVGPathElement | null)[]>([]);
  const rightPathRef = useRef<SVGPathElement>(null);
  const recordLinesRef = useRef<(SVGRectElement | null)[]>([]);
  const recordSurfaceRef = useRef<SVGGElement>(null);
  
  // Shared
  const coreRef = useRef<SVGGElement>(null);
  const coreGlowRef = useRef<SVGCircleElement>(null);
  
  // Particles
  const particlesRef = useRef<(SVGCircleElement | null)[]>([]);

  const uniqueId = useId();
  const defsId = (name: string) => `${uniqueId}-${name}`;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop MatchMedia
      const mm = gsap.matchMedia();
      
      mm.add("(min-width: 900px)", () => {
        // --- Setup Initial States ---
        gsap.set(bankTextRef.current, { y: 18, opacity: 0, filter: 'blur(4px)' });
        gsap.set(bankCapsulesRef.current, { opacity: 0, x: -20 });
        gsap.set(bankPathsRef.current, { opacity: 0, strokeDasharray: '1000', strokeDashoffset: '1000' });
        gsap.set(rightPathRef.current, { opacity: 0, strokeDasharray: '1000', strokeDashoffset: '1000' });
        gsap.set(recordSurfaceRef.current, { opacity: 0, x: 20 });
        gsap.set(recordLinesRef.current, { opacity: 0, scaleX: 0, transformOrigin: "left center" });
        gsap.set(particlesRef.current, { opacity: 0 });

        // Intro Animation
        const introTl = gsap.timeline();
        introTl
          .fromTo(aidatTextRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, ease: "power4.out" })
          .fromTo(coreRef.current, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.5)" }, "-=0.8")
          .fromTo(orbitRef.current, { opacity: 0, scale: 0.8 }, { opacity: 0.15, scale: 1, duration: 1.5, ease: "power2.out" }, "-=0.6")
          .fromTo(aidatNodesRef.current, { opacity: 0, scale: 0, y: 10 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "back.out(1.2)" }, "-=1");

        // Master Scroll Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.7,
          }
        });

        // 0 - 0.46: Aidat Takibi (Ambient mostly, some pulsing handled via CSS or subtle GSAP)
        tl.to(coreGlowRef.current, { opacity: 0.4, scale: 1.1, duration: 1, yoyo: true, repeat: 1 }, 0);
        
        // 0.46 - 0.60: Morph Transition
        const transitionStart = 2; // Arbitrary timeline time
        
        // Text transition
        tl.to(aidatTextRef.current, { y: -12, opacity: 0, filter: 'blur(4px)', duration: 0.8 }, transitionStart)
          .to(bankTextRef.current, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8 }, transitionStart + 0.2);

        // Step number transition
        tl.to(stepTextRef.current, { 
          innerText: "02 / 02", 
          snap: { innerText: 1 }, 
          duration: 0.1 
        }, transitionStart + 0.4);

        // Visual transition
        tl.to(orbitRef.current, { scaleX: 1.5, opacity: 0, duration: 1 }, transitionStart)
          .to(aidatNodesRef.current, { scale: 0, opacity: 0, duration: 0.6, stagger: 0.02 }, transitionStart);

        tl.to(bankCapsulesRef.current, { opacity: 1, x: 0, duration: 1, stagger: 0.1, ease: "power3.out" }, transitionStart + 0.4)
          .to(bankPathsRef.current, { opacity: 1, strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, transitionStart + 0.5)
          .to(rightPathRef.current, { opacity: 1, strokeDashoffset: 0, duration: 1, ease: "power2.inOut" }, transitionStart + 0.6)
          .to(recordSurfaceRef.current, { opacity: 1, x: 0, duration: 1, ease: "power3.out" }, transitionStart + 0.7)
          .to(recordLinesRef.current, { opacity: 1, scaleX: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }, transitionStart + 0.9);

        // Particle simulation during Bank scene (0.60 to 1.0)
        // Just animating them along path manually using x/y since MotionPath is not guaranteed.
        // Bank capsule positions approx: x=120, y=150, 350, 550. Core: 450, 350
        tl.fromTo(particlesRef.current[0], 
            { x: 140, y: 150, opacity: 0 }, 
            { x: 400, y: 320, opacity: 1, duration: 0.8 }, transitionStart + 1.2)
          .fromTo(particlesRef.current[1], 
            { x: 140, y: 350, opacity: 0 }, 
            { x: 400, y: 350, opacity: 1, duration: 0.8 }, transitionStart + 1.4)
          .fromTo(particlesRef.current[2], 
            { x: 140, y: 550, opacity: 0 }, 
            { x: 400, y: 380, opacity: 1, duration: 0.8 }, transitionStart + 1.6);
            
        tl.to(particlesRef.current, { opacity: 0, duration: 0.2 }, "+=0");

        // Mouse Parallax Effect
        const onMouseMove = (e: MouseEvent) => {
          if (!svgRef.current) return;
          const { left, top, width, height } = svgRef.current.getBoundingClientRect();
          const x = (e.clientX - left) / width - 0.5;
          const y = (e.clientY - top) / height - 0.5;
          
          gsap.to(orbitRef.current, { x: x * 15, y: y * 15, duration: 1, ease: "power2.out" });
          gsap.to(aidatNodesRef.current, { x: x * 25, y: y * 25, duration: 1.2, ease: "power2.out" });
          gsap.to(bankCapsulesRef.current, { x: x * 10, y: y * 10, duration: 1, ease: "power2.out" });
          gsap.to(recordSurfaceRef.current, { x: x * -10, y: y * -10, duration: 1, ease: "power2.out" });
        };
        
        const onMouseLeave = () => {
          gsap.to([orbitRef.current, aidatNodesRef.current, bankCapsulesRef.current, recordSurfaceRef.current], 
            { x: 0, y: 0, duration: 1.5, ease: "power3.out" });
        };

        const svgEl = svgRef.current;
        if (svgEl) {
          svgEl.addEventListener('mousemove', onMouseMove);
          svgEl.addEventListener('mouseleave', onMouseLeave);
        }

        return () => {
          if (svgEl) {
            svgEl.removeEventListener('mousemove', onMouseMove);
            svgEl.removeEventListener('mouseleave', onMouseLeave);
          }
        };
      });

      // Mobile MatchMedia
      mm.add("(max-width: 899px)", () => {
        gsap.set([aidatTextRef.current, bankTextRef.current], { position: 'relative', opacity: 1, y: 0, filter: 'none' });
        gsap.set(bankCapsulesRef.current, { opacity: 1, x: 0 });
        gsap.set(bankPathsRef.current, { opacity: 1, strokeDasharray: 'none' });
        gsap.set(rightPathRef.current, { opacity: 1, strokeDasharray: 'none' });
        gsap.set(recordSurfaceRef.current, { opacity: 1, x: 0 });
        gsap.set(recordLinesRef.current, { opacity: 1, scaleX: 1 });
        gsap.set(orbitRef.current, { opacity: 0.15, scale: 1 });
        gsap.set(aidatNodesRef.current, { opacity: 1, scale: 1, y: 0 });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [uniqueId]);

  // Generate Aidat Nodes
  const numNodes = 12;
  const radius = 280;
  const nodes = Array.from({ length: numNodes }).map((_, i) => {
    const angle = (i / numNodes) * Math.PI * 2;
    const x = 450 + Math.cos(angle) * radius;
    const y = 350 + Math.sin(angle) * radius;
    const isCompleted = i === 3 || i === 7;
    return (
      <g 
        key={i} 
        ref={el => { aidatNodesRef.current[i] = el; }} 
        transform={`translate(${x}, ${y})`}
        className="cursor-pointer hover:scale-[1.06] transition-transform duration-300"
      >
        <circle cx="0" cy="0" r="14" fill="rgba(255,255,255,0.7)" stroke={isCompleted ? "var(--visual-success)" : "var(--visual-purple-soft)"} strokeWidth="1.5" className="backdrop-blur-sm" />
        {isCompleted && (
          <circle cx="0" cy="0" r="6" fill="var(--visual-success)" className="shadow-[0_0_8px_rgba(25,183,122,0.8)]" />
        )}
      </g>
    );
  });

  return (
    <section 
      ref={containerRef}
      className="relative w-full bg-[#f8f7ff]"
      style={{
        height: 'auto', // Will be overridden by CSS for desktop
        minHeight: '100vh'
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 900px) {
          #feature-flow-container {
            height: 220vh;
          }
          #feature-flow-sticky {
            position: sticky;
            top: 5rem;
            height: calc(100svh - 5rem);
            overflow: hidden;
          }
        }
        @media (max-width: 899px) {
          #feature-flow-container {
            padding: 4rem 1rem;
          }
          #feature-flow-sticky {
            position: relative;
            height: auto;
            display: flex;
            flex-direction: column;
            gap: 4rem;
          }
          .desktop-only { display: none !important; }
          .mobile-stack-text {
            position: relative !important;
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            margin-bottom: 2rem;
          }
          .mobile-stack-svg {
            width: 100%;
            height: auto;
            aspect-ratio: 9/7;
          }
        }
      `}} />

      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 72% 38%, rgba(116, 82, 255, 0.10), transparent 38%),
            radial-gradient(circle at 28% 72%, rgba(65, 203, 160, 0.055), transparent 34%)
          `
        }}
      />

      <div id="feature-flow-container" className="relative z-10 w-full">
        <div id="feature-flow-sticky" className="w-full max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center px-6 lg:px-12">
          
          {/* Left Text Area */}
          <div className="w-full lg:w-[34%] h-auto lg:h-full flex flex-col justify-center relative">
            <div className="mb-6 desktop-only">
              <span className="text-[13px] uppercase tracking-[0.16em] text-slate-500 font-semibold">YÖNETİMİN AKILLI AKIŞI</span>
              <div className="mt-2 text-sm text-slate-400 font-medium">
                <span ref={stepTextRef}>01 / 02</span>
              </div>
            </div>

            {/* Scene 1 Text */}
            <div ref={aidatTextRef} className="absolute left-0 w-full lg:w-[430px] mobile-stack-text">
              <span className="text-[13px] uppercase tracking-[0.16em] text-slate-500 font-semibold lg:hidden block mb-4">01 / Aidat Takibi</span>
              <h2 className="text-[clamp(42px,4vw,72px)] leading-[0.98] tracking-[-0.04em] text-[#15183f] font-light mb-6">
                Aidat Takibi
              </h2>
              <p className="text-[18px] lg:text-[21px] leading-[1.55] text-slate-600">
                Toplu borçlandırma ile işinizi kolaylaştırın; yapılan tahsilatları tek bakışta takip edin.
              </p>
            </div>

            {/* Scene 2 Text */}
            <div ref={bankTextRef} className="absolute left-0 w-full lg:w-[430px] opacity-0 mobile-stack-text" style={{ top: 'auto' }}>
              <span className="text-[13px] uppercase tracking-[0.16em] text-slate-500 font-semibold lg:hidden block mb-4 mt-12">02 / Banka Entegrasyonu</span>
              <h2 className="text-[clamp(42px,4vw,72px)] leading-[0.98] tracking-[-0.04em] text-[#15183f] font-light mb-6">
                Banka Entegrasyonu
              </h2>
              <p className="text-[18px] lg:text-[21px] leading-[1.55] text-slate-600">
                Farklı bankalardaki hareketleri tek merkezde birleştirin ve finansal akışı anında görüntüleyin.
              </p>
            </div>
          </div>

          {/* Right SVG Area */}
          <div className="w-full lg:w-[66%] h-full flex items-center justify-center relative desktop-only">
            <svg 
              ref={svgRef}
              viewBox="0 0 900 700" 
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
              className="w-full max-w-[900px] h-auto overflow-visible"
            >
              <defs>
                <linearGradient id={defsId('coreGrad')} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6748e8"/>
                  <stop offset="100%" stopColor="#432ab4"/>
                </linearGradient>
                <linearGradient id={defsId('glassGrad')} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.7)"/>
                  <stop offset="100%" stopColor="rgba(255,255,255,0.2)"/>
                </linearGradient>
                <filter id={defsId('glow')}>
                  <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id={defsId('softShadow')}>
                  <feDropShadow dx="0" dy="12" stdDeviation="15" floodColor="#2d2065" floodOpacity="0.08"/>
                </filter>
              </defs>

              {/* Scene 2: Banka Paths */}
              <g>
                <path ref={el => { bankPathsRef.current[0] = el; }} d="M 160 150 C 300 150, 300 330, 420 340" fill="none" stroke="rgba(103,72,232,0.15)" strokeWidth="4" />
                <path ref={el => { bankPathsRef.current[1] = el; }} d="M 160 350 L 420 350" fill="none" stroke="rgba(103,72,232,0.15)" strokeWidth="4" />
                <path ref={el => { bankPathsRef.current[2] = el; }} d="M 160 550 C 300 550, 300 370, 420 360" fill="none" stroke="rgba(103,72,232,0.15)" strokeWidth="4" />
                
                <path ref={rightPathRef} d="M 480 350 L 720 350" fill="none" stroke="rgba(103,72,232,0.25)" strokeWidth="6" />
              </g>

              {/* Particles */}
              <g>
                <circle ref={el => { particlesRef.current[0] = el; }} cx="0" cy="0" r="4" fill="#16bd83" filter={`url(#${defsId('glow')})`} />
                <circle ref={el => { particlesRef.current[1] = el; }} cx="0" cy="0" r="4" fill="#6748e8" filter={`url(#${defsId('glow')})`} />
                <circle ref={el => { particlesRef.current[2] = el; }} cx="0" cy="0" r="4" fill="#16bd83" filter={`url(#${defsId('glow')})`} />
              </g>

              {/* Scene 1: Aidat Orbit */}
              <circle 
                ref={orbitRef}
                cx="450" 
                cy="350" 
                r="280" 
                fill="none" 
                stroke="rgba(169,156,255,0.25)" 
                strokeWidth="2" 
              />
              
              {/* Scene 1: Nodes */}
              {nodes}

              {/* Scene 2: Bank Capsules */}
              <g>
                {[150, 350, 550].map((y, i) => (
                  <g key={i} ref={el => { bankCapsulesRef.current[i] = el; }} transform={`translate(100, ${y})`} filter={`url(#${defsId('softShadow')})`}>
                    <rect x="-30" y="-40" width="80" height="80" rx="24" fill={`url(#${defsId('glassGrad')})`} stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" className="backdrop-blur-md" />
                    <circle cx="10" cy="0" r="14" fill="rgba(103,72,232,0.1)" stroke="#6748e8" strokeWidth="1.5" />
                    <circle cx="10" cy="0" r="4" fill="#6748e8" />
                  </g>
                ))}
              </g>

              {/* Scene 2: Record Surface */}
              <g ref={recordSurfaceRef} transform="translate(750, 350)" filter={`url(#${defsId('softShadow')})`}>
                <rect x="-30" y="-120" width="160" height="240" rx="20" fill={`url(#${defsId('glassGrad')})`} stroke="rgba(255,255,255,0.8)" strokeWidth="1" className="backdrop-blur-xl" />
                <rect x="-30" y="-120" width="4" height="240" rx="2" fill="#6748e8" opacity="0.6" />
                
                {/* Floating Record Lines */}
                <g transform="translate(-10, -60)">
                  <rect ref={el => { recordLinesRef.current[0] = el; }} x="0" y="0" width="100" height="12" rx="6" fill="#ebe7ff" />
                  <rect ref={el => { recordLinesRef.current[1] = el; }} x="0" y="30" width="70" height="12" rx="6" fill="#ebe7ff" />
                  <rect ref={el => { recordLinesRef.current[2] = el; }} x="0" y="60" width="120" height="12" rx="6" fill="#ebe7ff" />
                  
                  <rect ref={el => { recordLinesRef.current[3] = el; }} x="0" y="100" width="80" height="30" rx="8" fill="rgba(22,189,131,0.15)" stroke="#16bd83" strokeWidth="1" />
                  <circle cx="16" cy="115" r="4" fill="#16bd83" filter={`url(#${defsId('glow')})`} />
                </g>
              </g>

              {/* Shared Central Core */}
              <g ref={coreRef} transform="translate(450, 350)" filter={`url(#${defsId('softShadow')})`}>
                <circle ref={coreGlowRef} cx="0" cy="0" r="65" fill="#6748e8" opacity="0.15" filter={`url(#${defsId('glow')})`} />
                <circle cx="0" cy="0" r="55" fill={`url(#${defsId('coreGrad')})`} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                <circle cx="0" cy="0" r="45" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />
                <circle cx="0" cy="0" r="12" fill="#ffffff" className="shadow-lg" />
              </g>
            </svg>
          </div>
          
          {/* Mobile SVG renders - Simplified stack */}
          <div className="w-full lg:hidden flex flex-col gap-12 pb-24">
            <div className="w-full relative aspect-[4/3] bg-white/40 rounded-3xl border border-white/60 shadow-xl overflow-hidden flex items-center justify-center">
              {/* Simplified static representation of Aidat */}
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <circle cx="200" cy="150" r="100" fill="none" stroke="rgba(169,156,255,0.3)" strokeWidth="2" />
                <circle cx="200" cy="50" r="10" fill="rgba(255,255,255,0.9)" stroke="#a997ff" strokeWidth="2" />
                <circle cx="300" cy="150" r="10" fill="rgba(255,255,255,0.9)" stroke="#16bd83" strokeWidth="2" />
                <circle cx="300" cy="150" r="4" fill="#16bd83" />
                <circle cx="100" cy="150" r="10" fill="rgba(255,255,255,0.9)" stroke="#a997ff" strokeWidth="2" />
                <circle cx="200" cy="150" r="40" fill="#6748e8" />
                <circle cx="200" cy="150" r="8" fill="#ffffff" />
              </svg>
            </div>
            
            <div className="w-full relative aspect-[4/3] bg-white/40 rounded-3xl border border-white/60 shadow-xl overflow-hidden flex items-center justify-center">
              {/* Simplified static representation of Banka */}
              <svg viewBox="0 0 400 300" className="w-full h-full">
                <path d="M 50 100 C 120 100, 150 150, 200 150" fill="none" stroke="rgba(103,72,232,0.2)" strokeWidth="4" />
                <path d="M 50 200 C 120 200, 150 150, 200 150" fill="none" stroke="rgba(103,72,232,0.2)" strokeWidth="4" />
                <path d="M 200 150 L 320 150" fill="none" stroke="rgba(103,72,232,0.3)" strokeWidth="6" />
                <rect x="30" y="80" width="40" height="40" rx="12" fill="rgba(255,255,255,0.8)" stroke="#a997ff" strokeWidth="1" />
                <rect x="30" y="180" width="40" height="40" rx="12" fill="rgba(255,255,255,0.8)" stroke="#a997ff" strokeWidth="1" />
                <rect x="320" y="70" width="60" height="160" rx="16" fill="rgba(255,255,255,0.9)" stroke="#a997ff" strokeWidth="1" />
                <rect x="330" y="90" width="40" height="8" rx="4" fill="#ebe7ff" />
                <rect x="330" y="110" width="20" height="8" rx="4" fill="#ebe7ff" />
                <circle cx="200" cy="150" r="30" fill="#6748e8" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

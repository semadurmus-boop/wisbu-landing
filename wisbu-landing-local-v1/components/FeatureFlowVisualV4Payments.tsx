'use client';

import React, { useId, forwardRef, useImperativeHandle, useRef } from 'react';

export interface V4PaymentsRefs {
  container: SVGGElement | null;
  cardGroup: SVGGElement | null;
  cardHighlight: SVGPathElement | null;
  cardValidation: SVGCircleElement | null;
  token: SVGGElement | null;
  tapes: SVGGElement | null;
  segments: (SVGGElement | null)[];
  matchingLines: (SVGLineElement | null)[];
  mintValidation: SVGGElement | null;
  smsRail: SVGGElement | null;
  mailRail: SVGGElement | null;
  routes: SVGPathElement | null;
  receivers: (SVGGElement | null)[];
}

const FeatureFlowVisualV4Payments = forwardRef<V4PaymentsRefs>((props, ref) => {
  const uniqueId = useId();
  const defsId = (name: string) => `${uniqueId}-${name}`;

  const internalRefs = {
    container: useRef<SVGGElement>(null),
    cardGroup: useRef<SVGGElement>(null),
    cardHighlight: useRef<SVGPathElement>(null),
    cardValidation: useRef<SVGCircleElement>(null),
    token: useRef<SVGGElement>(null),
    tapes: useRef<SVGGElement>(null),
    segments: useRef<(SVGGElement | null)[]>([]),
    matchingLines: useRef<(SVGLineElement | null)[]>([]),
    mintValidation: useRef<SVGGElement>(null),
    smsRail: useRef<SVGGElement>(null),
    mailRail: useRef<SVGGElement>(null),
    routes: useRef<SVGPathElement>(null),
    receivers: useRef<(SVGGElement | null)[]>([]),
  };

  useImperativeHandle(ref, () => ({
    get container() { return internalRefs.container.current; },
    get cardGroup() { return internalRefs.cardGroup.current; },
    get cardHighlight() { return internalRefs.cardHighlight.current; },
    get cardValidation() { return internalRefs.cardValidation.current; },
    get token() { return internalRefs.token.current; },
    get tapes() { return internalRefs.tapes.current; },
    get segments() { return internalRefs.segments.current; },
    get matchingLines() { return internalRefs.matchingLines.current; },
    get mintValidation() { return internalRefs.mintValidation.current; },
    get smsRail() { return internalRefs.smsRail.current; },
    get mailRail() { return internalRefs.mailRail.current; },
    get routes() { return internalRefs.routes.current; },
    get receivers() { return internalRefs.receivers.current; },
  }));

  return (
    <g 
      ref={internalRefs.container}
      className="v4-payments-group"
      style={{ opacity: 0, pointerEvents: 'none', transform: 'translate(30px, 6px) scale(0.985)', transformOrigin: 'center center' }}
    >
      <defs>
        <radialGradient id={defsId('sceneHalo')} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5C3FD0" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#a998ff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#a998ff" stopOpacity="0" />
          </radialGradient>

          <linearGradient id={defsId('bankCore')} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1C1645" />
            <stop offset="100%" stopColor="#4A2DB0" />
          </linearGradient>

          <linearGradient id={defsId('creditCard')} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b2b85" />
            <stop offset="100%" stopColor="#251a5c" />
          </linearGradient>

          <linearGradient id={defsId('lightAcrylic')} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(226,220,255,0.3)" />
          </linearGradient>

          <linearGradient id={defsId('extrudeRight')} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(133, 104, 232, 0.3)" />
            <stop offset="100%" stopColor="rgba(91, 64, 192, 0.5)" />
          </linearGradient>
          <linearGradient id={defsId('extrudeTop')} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
          </linearGradient>
          <linearGradient id={defsId('extrudeRightDark')} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1e184a" />
            <stop offset="100%" stopColor="#0e0a24" />
          </linearGradient>

          <filter id={defsId('premiumObjectShadow')} x="-30%" y="-30%" width="160%" height="170%">
            <feDropShadow dx="0" dy="12" stdDeviation="12" floodColor="#2a1b5c" floodOpacity="0.14" />
          </filter>

          <filter id={defsId('lightShadow')} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="6" stdDeviation="8" floodColor="#2a1b5c" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Central Halo */}
        <ellipse cx="540" cy="330" rx="400" ry="220" fill={`url(#${defsId('sceneHalo')})`} />

        {/* Note: Platform is removed from this SVG since the unified wrapper will provide ONE shared platform for both scenes */}

        {/* --- KREDİ KARTIYLA TAHSİLAT (Sol Modül) --- */}
        {/* Scaled up by 18%, better connection rail */}
        <g data-figure="card-payment" transform="translate(120, 260) scale(1.18)" opacity="0.88">
          <ellipse cx="50" cy="220" rx="80" ry="12" fill="#2a1b5c" opacity="0.10" filter={`url(#${defsId('lightShadow')})`} />
          
          {/* Transparent POS Terminal Base */}
          <g transform="translate(10, 160)">
            <rect x="0" y="0" width="100" height="40" rx="12" fill={`url(#${defsId('lightAcrylic')})`} stroke="rgba(102, 76, 204, 0.3)" strokeWidth="1.2" />
            <path d="M 0 16 L 0 12 Q 0 0 12 0 L 50 0" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1" strokeLinecap="round" />
            <line x1="20" y1="20" x2="80" y2="20" stroke="rgba(102, 76, 204, 0.4)" strokeWidth="2.5" strokeLinecap="round" />
            
            <circle ref={internalRefs.cardValidation} cx="50" cy="8" r="3" fill="#c9c2ff" />
          </g>

          {/* Slanted Physical Credit Card */}
          <g ref={internalRefs.cardGroup} transform="translate(20, -10)" filter={`url(#${defsId('lightShadow')})`}>
            <path d="M 90 20 L 98 28 L 98 168 Q 98 178 90 178 Z" fill={`url(#${defsId('extrudeRightDark')})`} />
            <path d="M 20 160 L 28 168 L 98 168 Q 88 168 90 160 Z" fill={`url(#${defsId('extrudeRightDark')})`} />
            
            <rect x="0" y="0" width="90" height="160" rx="12" fill={`url(#${defsId('creditCard')})`} stroke="rgba(118, 87, 232, 0.6)" strokeWidth="1.5" />
            
            <rect x="15" y="25" width="22" height="18" rx="4" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
            <line x1="15" y1="34" x2="37" y2="34" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            
            <line x1="15" y1="120" x2="60" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
            <line x1="15" y1="135" x2="35" y2="135" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="70" cy="135" r="4" fill="rgba(255,255,255,0.2)" />
            <circle cx="62" cy="135" r="4" fill="rgba(255,255,255,0.4)" />
            
            <path ref={internalRefs.cardHighlight} d="M 0 60 L 0 12 Q 0 0 12 0 L 60 0" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
          </g>

          {/* Connection rail clearly to the bank core */}
          <path d="M 110 180 L 160 180" fill="none" stroke="rgba(102, 76, 204, 0.4)" strokeWidth="2" />
          
          {/* Transaction Token */}
          <g ref={internalRefs.token} transform="translate(130, 180)">
            <circle cx="0" cy="0" r="10" fill={`url(#${defsId('lightAcrylic')})`} stroke="#6848e8" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3" fill="#6848e8" />
          </g>
        </g>

        {/* --- BANKA ENTEGRASYONU (Merkez Çekirdek) --- */}
        <g data-figure="bank-reconciliation-core" transform="translate(420, 150)">
          <ellipse cx="160" cy="300" rx="150" ry="25" fill="#2a1b5c" opacity="0.18" filter={`url(#${defsId('premiumObjectShadow')})`} />
          
          <rect x="-16" y="-16" width="320" height="250" rx="16" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <rect x="-8" y="-8" width="320" height="250" rx="16" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" filter={`url(#${defsId('lightShadow')})`} />

          <g>
            <path d="M 320 16 L 330 6 L 330 240 Q 330 250 320 250 Z" fill={`url(#${defsId('extrudeRightDark')})`} />
            <path d="M 16 0 L 6 -10 L 320 -10 Q 330 -10 330 6 L 320 16 Z" fill={`url(#${defsId('extrudeTopDark')})`} />
            
            <rect x="0" y="0" width="320" height="250" rx="16" fill={`url(#${defsId('bankCore')})`} stroke="rgba(118, 87, 232, 0.45)" strokeWidth="1.5" />
            <path d="M 0 50 L 0 16 Q 0 0 16 0 L 120 0" fill="none" stroke="rgba(255, 255, 255, 0.5)" strokeWidth="1.5" strokeLinecap="round" />

            {/* Ports */}
            {[50, 100, 150].map((y, i) => (
              <rect key={`port-${i}`} x="-6" y={y} width="12" height="24" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            ))}

            <g transform="translate(20, 25)">
              {/* Left headers */}
              <rect x="0" y="0" width="50" height="18" rx="4" fill="rgba(255,255,255,0.1)" />
              <rect x="150" y="0" width="60" height="18" rx="4" fill="rgba(255,255,255,0.1)" />
              
              {/* Rows */}
              {[
                { y: 35, w1: 40, w2: 50, match: true },
                { y: 70, w1: 60, w2: 30, match: true },
                { y: 105, w1: 45, w2: 35, match: true },
                { y: 140, w1: 30, w2: 20, match: true },
                { y: 175, w1: 50, w2: 0, match: false },
              ].map((rec, i) => (
                <g key={`match-${i}`} transform={`translate(0, ${rec.y})`}>
                  <line x1="0" y1="0" x2={rec.w1} y2="0" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="-12" cy="0" r="3" fill="#a998ff" />
                  
                  {rec.w2 > 0 && (
                    <>
                      <line x1="150" y1="0" x2={150 + rec.w2} y2="0" stroke="rgba(169, 152, 255, 0.9)" strokeWidth="3" strokeLinecap="round" />
                      <circle cx="138" cy="0" r="3" fill="#16bd83" />
                      <line 
                        ref={el => { internalRefs.matchingLines.current[i] = el; }}
                        x1={rec.w1 + 10} y1="0" x2="128" y2="0" 
                        stroke="rgba(118, 87, 232, 0.6)" strokeWidth="1.5" strokeDasharray="4 4" 
                      />
                    </>
                  )}
                  {rec.w2 === 0 && (
                    <line x1="150" y1="0" x2="190" y2="0" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round" />
                  )}
                </g>
              ))}

              {/* Right panel: Financial Chart */}
              <g transform="translate(230, 50)">
                <rect x="0" y="0" width="50" height="80" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                <rect x="10" y="40" width="8" height="30" rx="2" fill="rgba(169, 152, 255, 0.2)" />
                <rect x="22" y="20" width="8" height="50" rx="2" fill="rgba(169, 152, 255, 0.4)" />
                <rect x="34" y="10" width="8" height="60" rx="2" fill="rgba(169, 152, 255, 0.8)" />
                <line x1="5" y1="70" x2="45" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* Status Validation */}
              <g ref={internalRefs.mintValidation} transform="translate(255, 175)" opacity="0">
                <circle cx="0" cy="0" r="16" fill="rgba(22, 189, 131, 0.15)" />
                <circle cx="0" cy="0" r="8" fill="#16bd83" stroke="#ffffff" strokeWidth="2" />
                <path d="M -2 1 L 0 3 L 4 -2" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              </g>
              
              {/* Bottom Progress Rail */}
              <g transform="translate(0, 205)">
                <line x1="0" y1="0" x2="280" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinecap="round" />
                <line x1="0" y1="0" x2="160" y2="0" stroke="#16bd83" strokeWidth="2" strokeLinecap="round" />
                <circle cx="160" cy="0" r="3" fill="#ffffff" />
              </g>
            </g>

            {/* Right output port */}
            <rect x="316" y="80" width="8" height="24" rx="2" fill="#16bd83" />
          </g>

          {/* Bank Data Tapes */}
          <g ref={internalRefs.tapes} transform="translate(-140, 50)" opacity="0">
            {[0, 50, 100].map((dy, tapeIdx) => (
              <g key={`tape-${tapeIdx}`} transform={`translate(0, ${dy})`}>
                <path d="M 0 12 L 134 12" fill="none" stroke="rgba(169, 152, 255, 0.15)" strokeWidth="20" strokeLinecap="round" />
                <g ref={el => { internalRefs.segments.current[tapeIdx] = el; }}>
                  <line x1="20" y1="12" x2="50" y2="12" stroke="rgba(255,255,255,0.5)" strokeWidth="4" strokeLinecap="round" />
                  <line x1="60" y1="12" x2="110" y2="12" stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round" />
                </g>
              </g>
            ))}
          </g>
        </g>

        {/* --- KURUMSAL SMS & MAIL (Sağ Modül) --- */}
        {/* Scaled up by 12% */}
        <g data-figure="sms-mail-dispatch" transform="translate(770, 150) scale(1.12)" opacity="0.84">
          <ellipse cx="60" cy="235" rx="50" ry="12" fill="#33236f" opacity="0.10" filter={`url(#${defsId('lightShadow')})`} />

          <g>
            <path d="M 120 8 L 128 0 L 128 200 Q 128 208 120 208 Z" fill={`url(#${defsId('extrudeRight')})`} />
            <path d="M 8 -8 L 0 0 L 120 0 Q 128 0 128 -8 Z" fill={`url(#${defsId('extrudeTop')})`} />
            
            <rect x="0" y="0" width="120" height="208" rx="8" fill={`url(#${defsId('lightAcrylic')})`} stroke="rgba(112, 87, 220, 0.4)" strokeWidth="1.2" />
            <path d="M 0 25 L 0 8 Q 0 0 8 0 L 35 0" fill="none" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1" strokeLinecap="round" />
            
            <rect x="-6" y="70" width="12" height="24" rx="2" fill="#16bd83" />

            <g transform="translate(15, 40)">
              <g ref={internalRefs.smsRail}>
                <rect x="0" y="0" width="45" height="20" rx="4" fill="#6848e8" />
                <text x="22" y="14" fontSize="11" fontWeight="bold" fill="#ffffff" textAnchor="middle" letterSpacing="0.05em">SMS</text>
                <line x1="50" y1="10" x2="80" y2="10" stroke="rgba(112, 87, 220, 0.6)" strokeWidth="3" strokeLinecap="round" />
              </g>

              <g ref={internalRefs.mailRail} transform="translate(0, 50)">
                <rect x="0" y="0" width="45" height="20" rx="4" fill="#6848e8" />
                <text x="22" y="14" fontSize="11" fontWeight="bold" fill="#ffffff" textAnchor="middle" letterSpacing="0.05em">MAIL</text>
                <line x1="50" y1="10" x2="80" y2="10" stroke="rgba(112, 87, 220, 0.6)" strokeWidth="3" strokeLinecap="round" />
              </g>
              
              <line x1="22" y1="110" x2="80" y2="110" stroke="rgba(112, 87, 220, 0.2)" strokeWidth="2" strokeLinecap="round" />
              <circle cx="80" cy="110" r="4" fill="#16bd83" />
            </g>
          </g>

          {/* Delivery Routes */}
          <g transform="translate(120, 90)">
            <path 
              ref={internalRefs.routes}
              d="M 0 0 C 40 0, 30 -60, 60 -60 M 0 20 L 60 20 M 0 40 C 40 40, 30 100, 60 100" 
              fill="none" 
              stroke="rgba(112, 87, 220, 0.4)" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              opacity="0"
            />
          </g>

          {/* Receivers */}
          <g transform="translate(180, 10)">
            {[
              { x: 0, y: 0, h: 45, d: 'f' },
              { x: 25, y: 35, h: 35, d: 'b' },
              { x: 10, y: 75, h: 50, d: 'f' },
              { x: 35, y: 110, h: 40, d: 'b' },
              { x: 0, y: 160, h: 45, d: 'f' }
            ].map((rec, i) => {
              const isFront = rec.d === 'f';
              return (
                <g 
                  key={`rcv-${i}`} 
                  transform={`translate(${rec.x}, ${rec.y}) scale(${isFront ? 1 : 0.85})`} 
                  filter={isFront ? `url(#${defsId('lightShadow')})` : ''}
                  ref={el => { internalRefs.receivers.current[i] = el; }}
                >
                  <polygon points={`0,0 4,-4 22,-4 18,0`} fill={`url(#${defsId('extrudeTop')})`} stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
                  <polygon points={`18,0 22,-4 22,${rec.h - 4} 18,${rec.h}`} fill={`url(#${defsId('extrudeRight')})`} stroke="rgba(102, 76, 204, 0.1)" strokeWidth="0.5" />
                  
                  <rect x="0" y="0" width="18" height={rec.h} rx="9" fill={`url(#${defsId('lightAcrylic')})`} stroke="rgba(112, 87, 220, 0.4)" strokeWidth="1.2" />
                  
                  <circle cx="9" cy="12" r="3.5" fill="#a998ff" className="status-dot" />
                  <line x1="5" y1={rec.h - 15} x2="13" y2={rec.h - 15} stroke="rgba(112, 87, 220, 0.4)" strokeWidth="2" strokeLinecap="round" />
                </g>
              );
            })}
          </g>
        </g>
      </g>
  );
});

FeatureFlowVisualV4Payments.displayName = 'FeatureFlowVisualV4Payments';

export default FeatureFlowVisualV4Payments;

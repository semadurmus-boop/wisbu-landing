'use client';

import React, { useId } from 'react';

export default function FeatureFlowVisualV3Polished() {
  const uniqueId = useId();
  const defsId = (name: string) => `${uniqueId}-${name}`;

  return (
    <section className="relative w-full bg-[#f8f7ff] overflow-clip" id="why-wisbu-v3-polished">
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

      {/* Very Subtle Grain/Noise overlay for premium feel */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          opacity: 0.015,
          mixBlendMode: 'soft-light',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
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
            #why-wisbu-v3-polished > div {
              grid-template-columns: 1fr !important;
              gap: 60px !important;
            }
            .v3-svg-container {
               width: 100% !important;
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
            <div className="rail-indicator" aria-hidden="true" />

            <div className="feature-flow-row-static">
              <div className="contents">
                <span className="feature-flow-number">01</span>
                <span className="feature-flow-title font-semibold">Aidat Takibi</span>
              </div>
            </div>
            
            <div className="feature-flow-row-static">
              <div className="contents opacity-52">
                <span className="feature-flow-number">02</span>
                <span className="feature-flow-title font-semibold">Finansal Raporlama</span>
              </div>
            </div>
            
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
          className="w-full flex items-center justify-center relative v3-svg-container"
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
              {/* Premium SaaS Acrylic Material Gradient */}
              <linearGradient id={defsId('acrylicSurface')} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.78)"/>
                <stop offset="50%" stopColor="rgba(226,220,255,0.38)"/>
                <stop offset="100%" stopColor="rgba(133,104,232,0.18)"/>
              </linearGradient>

              {/* Passive Background Layers Gradient */}
              <linearGradient id={defsId('acrylicBackLayer')} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.4)"/>
                <stop offset="100%" stopColor="rgba(133,104,232,0.1)"/>
              </linearGradient>

              {/* Rapor Focal Halo */}
              <radialGradient id={defsId('reportFocalHalo')}>
                <stop offset="0%" stopColor="#7657e8" stopOpacity="0.10" />
                <stop offset="48%" stopColor="#a998ff" stopOpacity="0.055" />
                <stop offset="100%" stopColor="#a998ff" stopOpacity="0" />
              </radialGradient>

              {/* Rapor Area Fill */}
              <linearGradient id={defsId('reportAreaFill')} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(103,72,232,0.16)"/>
                <stop offset="100%" stopColor="rgba(103,72,232,0)"/>
              </linearGradient>

              {/* Shadows */}
              <filter id={defsId('premiumObjectShadow')} x="-30%" y="-30%" width="160%" height="170%">
                <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#33236f" floodOpacity="0.11" />
              </filter>
              <filter id={defsId('premiumObjectShadowSide')} x="-30%" y="-30%" width="160%" height="170%">
                <feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#33236f" floodOpacity="0.09" />
              </filter>
              
              <filter id={defsId('layerShadow')} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#171942" floodOpacity="0.06"/>
              </filter>

              <filter id={defsId('mildGlow')} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Focal Halo (Report Center) */}
            <ellipse cx="480" cy="315" rx="165" ry="125" fill={`url(#${defsId('reportFocalHalo')})`} />

            {/* Scale entire scene to utilize ~88% of right col properly */}
            <g className="flow-visual-system-v3" transform="translate(-5, 0)">
              
              {/* --- UNIFIED DATA PATH --- */}
              {/* Paths at 55% visual intensity */}
              <g data-figure="data-path" opacity="0.55">
                {/* Passive path */}
                <path 
                  d="M 195 405 C 240 405, 300 395, 350 395 L 365 395 M 585 240 C 650 240, 680 330, 715 330" 
                  fill="none" 
                  stroke="rgba(105, 80, 212, 0.20)" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                />
                
                {/* Active light spine (energy track segment) */}
                <path 
                  d="M 230 401 Q 260 400, 290 397 M 590 242 C 610 242, 630 260, 650 280" 
                  fill="none" 
                  stroke="rgba(125, 94, 238, 0.52)" 
                  strokeWidth="2.2" 
                  strokeLinecap="round" 
                />
              </g>

              {/* --- LEFT REGION: AIDAT TAKİBİ (x ≈ 165, y ≈ 320) --- */}
              {/* Aidat at 88% visual hierarchy, scale(1.05) from center */}
              <g data-figure="dues" transform="translate(165, 320) scale(1.05)" opacity="0.88">
                <g filter={`url(#${defsId('premiumObjectShadowSide')})`}>
                  
                  {/* Management Spine */}
                  <line x1="-70" y1="-80" x2="-70" y2="80" stroke="rgba(102, 76, 204, 0.26)" strokeWidth="2" strokeLinecap="round" />
                  {/* Junction points */}
                  <rect x="-72" y="-82" width="4" height="4" rx="1" fill="#6848e8" />
                  <rect x="-72" y="-2" width="4" height="4" rx="1" fill="#6848e8" />
                  <rect x="-72" y="78" width="4" height="4" rx="1" fill="#6848e8" />

                  {/* 3 Floors of Apartments (3x2 grid) */}
                  {[
                    { y: -80, offsetC1: 0, cols: [{ status: 'success' }, { status: 'pending' }] },
                    { y: 0, offsetC1: 3, cols: [{ status: 'success' }, { status: 'new' }] }, // C1 pushed forward
                    { y: 80, offsetC1: 0, cols: [{ status: 'pending' }, { status: 'pending' }] }
                  ].map((floor, fIdx) => (
                    <g key={`floor-${fIdx}`} transform={`translate(0, ${floor.y})`}>
                      {/* Floor back rail */}
                      <line x1="-70" y1="0" x2="35" y2="0" stroke="rgba(102, 76, 204, 0.15)" strokeWidth="1.25" />
                      
                      {floor.cols.map((col, cIdx) => {
                        const isSuccess = col.status === 'success';
                        const isNew = col.status === 'new';
                        const statusColor = isSuccess ? '#16bd83' : isNew ? '#6848e8' : '#c9c2ff';
                        const xOffset = -35 + cIdx * 70;
                        const zOffset = (cIdx === 0 ? floor.offsetC1 : 0);
                        
                        return (
                          <g key={`col-${cIdx}`} transform={`translate(${xOffset - zOffset}, -25)`}>
                            
                            {/* Glass Thickness System */}
                            <rect x="3" y="4" width="60" height="50" rx="8" fill="rgba(92, 65, 190, 0.07)" stroke="rgba(91, 64, 192, 0.10)" strokeWidth="1" />
                            <rect x="0" y="0" width="60" height="50" rx="8" fill={`url(#${defsId('acrylicSurface')})`} stroke="rgba(102, 76, 204, 0.34)" strokeWidth="1.2" />
                            <path d="M 0 16 L 0 8 Q 0 0 8 0 L 25 0" fill="none" stroke="rgba(255, 255, 255, 0.82)" strokeWidth="0.9" strokeLinecap="round" />
                            
                            {/* Unit Info lines */}
                            <line x1="10" y1="18" x2="35" y2="18" stroke="rgba(112, 87, 220, 0.4)" strokeWidth="2.5" strokeLinecap="round" />
                            <line x1="10" y1="28" x2="25" y2="28" stroke="rgba(112, 87, 220, 0.25)" strokeWidth="2" strokeLinecap="round" />
                            
                            {/* Status Dot */}
                            <circle cx="50" cy="12" r="3.5" fill={statusColor} />
                            {isSuccess && <circle cx="50" cy="12" r="2" fill="#ffffff" opacity="0.6" />}
                          </g>
                        );
                      })}
                    </g>
                  ))}

                  {/* Collection Rail (Tahsilat Tabani) at bottom */}
                  <g data-figure="dues-token" transform="translate(5, 130)">
                    {/* Floor shadow */}
                    <ellipse cx="-15" cy="5" rx="45" ry="4" fill="rgba(51, 35, 111, 0.06)" filter={`url(#${defsId('mildGlow')})`} />
                    
                    {/* Collection Base */}
                    <rect x="-60" y="-8" width="90" height="12" rx="4" fill="rgba(92, 65, 190, 0.05)" stroke="rgba(102, 76, 204, 0.26)" strokeWidth="1.25" />
                    <line x1="-58" y1="-7" x2="-20" y2="-7" stroke="rgba(255,255,255,0.7)" strokeWidth="0.9" strokeLinecap="round" />
                    
                    {/* ₺ Token (10% bigger) */}
                    <g transform="translate(25, -5)">
                      <rect x="2" y="3" width="32" height="32" rx="16" fill="rgba(92, 65, 190, 0.08)" stroke="rgba(91, 64, 192, 0.1)" strokeWidth="1" />
                      <circle cx="16" cy="16" r="16" fill={`url(#${defsId('acrylicSurface')})`} stroke="#6848e8" strokeWidth="1.2" />
                      <path d="M 4 16 A 12 12 0 0 1 16 4" fill="none" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.2" strokeLinecap="round" />
                      <text x="16" y="21" fontSize="16" fontWeight="bold" fill="#6848e8" textAnchor="middle" style={{ fontVariantNumeric: 'tabular-nums' }}>₺</text>
                    </g>
                  </g>
                  
                  {/* Junction port out to data path */}
                  <circle cx="25" cy="80" r="3" fill="#ffffff" stroke="#6848e8" strokeWidth="1.2" />
                </g>
              </g>

              {/* --- CENTER REGION: FİNANSAL RAPORLAMA (x ≈ 480, y ≈ 315) --- */}
              {/* Rapor at 100% visual hierarchy, scale(1.12) from center */}
              <g data-figure="reporting" transform="translate(480, 315) scale(1.12)" opacity="1">
                {/* Layer 3 (Back) - offset 12px, opacity 0.20 */}
                <g transform="translate(-112, -97)" opacity="0.20">
                  <rect x="0" y="0" width="220" height="170" rx="12" fill={`url(#${defsId('acrylicBackLayer')})`} stroke="rgba(112, 87, 220, 0.15)" strokeWidth="1" />
                </g>
                
                {/* Layer 2 (Middle) - offset 6px, opacity 0.34 */}
                <g transform="translate(-106, -91)" opacity="0.34" filter={`url(#${defsId('layerShadow')})`}>
                  <rect x="0" y="0" width="220" height="170" rx="12" fill={`url(#${defsId('acrylicBackLayer')})`} stroke="rgba(112, 87, 220, 0.2)" strokeWidth="1" />
                </g>

                {/* Layer 1 (Front - Main Report) at full opacity */}
                <g transform="translate(-100, -85)" filter={`url(#${defsId('premiumObjectShadow')})`}>
                  {/* Glass Thickness */}
                  <rect x="4" y="5" width="220" height="170" rx="12" fill="rgba(92, 65, 190, 0.07)" stroke="rgba(91, 64, 192, 0.10)" strokeWidth="1" />
                  <rect x="0" y="0" width="220" height="170" rx="12" fill={`url(#${defsId('acrylicSurface')})`} stroke="rgba(102, 76, 204, 0.34)" strokeWidth="1.2" />
                  <path d="M 0 30 L 0 12 Q 0 0 12 0 L 80 0" fill="none" stroke="rgba(255, 255, 255, 0.82)" strokeWidth="0.9" strokeLinecap="round" />

                  {/* 0.5px Inner Grid Lines */}
                  <line x1="20" y1="0" x2="20" y2="170" stroke="rgba(112, 87, 220, 0.08)" strokeWidth="0.5" />
                  <line x1="200" y1="0" x2="200" y2="170" stroke="rgba(112, 87, 220, 0.08)" strokeWidth="0.5" />
                  <line x1="0" y1="35" x2="220" y2="35" stroke="rgba(112, 87, 220, 0.08)" strokeWidth="0.5" />
                  <line x1="0" y1="135" x2="220" y2="135" stroke="rgba(112, 87, 220, 0.08)" strokeWidth="0.5" />

                  {/* Top: 3 Summary Indicators */}
                  <g transform="translate(15, 15)">
                    {[0, 65, 130].map((dx, i) => (
                      <g key={`summary-${i}`} transform={`translate(${dx}, 0)`}>
                        <rect x="2" y="2" width="46" height="22" rx="4" fill="rgba(92, 65, 190, 0.04)" />
                        <rect x="0" y="0" width="46" height="22" rx="4" fill="rgba(255,255,255,0.7)" stroke="rgba(112, 87, 220, 0.15)" strokeWidth="1" />
                        <line x1="6" y1="8" x2="28" y2="8" stroke="#4b2ebc" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="6" y1="14" x2="38" y2="14" stroke="rgba(112,87,220,0.3)" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    ))}
                  </g>

                  {/* Bottom-left: 4 Transaction Rows */}
                  <g data-figure="report-row" transform="translate(15, 55)">
                    {[
                      { dy: 0, w1: 45, w2: 15, col: '#16bd83' },
                      { dy: 18, w1: 30, w2: 30, col: '#a69aff' },
                      { dy: 36, w1: 50, w2: 10, col: '#a69aff' },
                      { dy: 54, w1: 35, w2: 25, col: '#a69aff' },
                    ].map((row, i) => (
                      <g key={`row-${i}`} transform={`translate(0, ${row.dy})`}>
                        {/* Transaction start dot */}
                        <circle cx="4" cy="0" r="2.5" fill={row.col} />
                        {/* Bars */}
                        <line x1="14" y1="0" x2={14 + row.w1} y2="0" stroke="rgba(112, 87, 220, 0.45)" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1={18 + row.w1} y1="0" x2={18 + row.w1 + row.w2} y2="0" stroke="rgba(112, 87, 220, 0.2)" strokeWidth="2.5" strokeLinecap="round" />
                      </g>
                    ))}
                  </g>

                  {/* Bottom-right: 3 Columns + Trend Line */}
                  <g data-figure="report-bar" transform="translate(130, 125)">
                    {/* Columns with different opacities */}
                    <rect x="0" y="-25" width="16" height="25" rx="3" fill="rgba(112, 87, 220, 0.24)" />
                    <rect x="25" y="-45" width="16" height="45" rx="3" fill="rgba(112, 87, 220, 0.38)" />
                    <rect x="50" y="-70" width="16" height="70" rx="3" fill="rgba(112, 87, 220, 0.56)" />
                    
                    {/* Baseline */}
                    <line x1="-5" y1="2" x2="70" y2="2" stroke="rgba(112, 87, 220, 0.15)" strokeWidth="1" strokeLinecap="round" />

                    {/* Area fill under curve */}
                    <path d="M 8 -30 Q 33 -35, 58 -70 L 58 0 L 8 0 Z" fill={`url(#${defsId('reportAreaFill')})`} />

                    {/* Financial Curve */}
                    <path d="M 8 -30 Q 33 -35, 58 -70" fill="none" stroke="#6748e8" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* Control Points */}
                    <circle cx="8" cy="-30" r="3.5" fill="#ffffff" stroke="#6748e8" strokeWidth="1.5" />
                    <circle cx="33" cy="-39" r="3.5" fill="#ffffff" stroke="#6748e8" strokeWidth="1.5" />
                    {/* Final verified point */}
                    <g transform="translate(58, -70)">
                      <circle cx="0" cy="0" r="4.5" fill="#ffffff" stroke="#16bd83" strokeWidth="1.5" />
                      <circle cx="0" cy="0" r="1.5" fill="#16bd83" />
                    </g>
                  </g>

                  {/* Bottom: Thin period comparison rail */}
                  <g transform="translate(20, 150)">
                    <line x1="0" y1="0" x2="180" y2="0" stroke="rgba(112, 87, 220, 0.15)" strokeWidth="2" strokeLinecap="round" />
                    {/* Markers */}
                    <rect x="40" y="-2" width="2" height="4" fill="#a69aff" />
                    <rect x="140" y="-2" width="2" height="4" fill="#a69aff" />
                  </g>
                  
                  {/* Junction ports for paths */}
                  <circle cx="-5" cy="80" r="3" fill="#ffffff" stroke="#6848e8" strokeWidth="1.2" />
                  <circle cx="105" cy="-6" r="3" fill="#ffffff" stroke="#16bd83" strokeWidth="1.2" />
                </g>
              </g>

              {/* --- RIGHT REGION: DUYURU & İLAN (x ≈ 790, y ≈ 315) --- */}
              {/* Duyuru at 82% visual hierarchy, scale(1.05) from center */}
              <g data-figure="announcement" transform="translate(790, 315) scale(1.05)" opacity="0.82">
                
                {/* Announcement Source (Left-Center) */}
                <g data-figure="announcement-sheet" transform="translate(-70, 0)">
                  {/* Back sheet - 4px top-left offset */}
                  <rect 
                    x="-39" y="-49" width="76" height="96" rx="6" 
                    fill={`url(#${defsId('acrylicBackLayer')})`} 
                    stroke="rgba(112, 87, 220, 0.15)" strokeWidth="1"
                    transform="rotate(4)"
                  />
                  
                  {/* Front sheet with depth and shadow */}
                  <g filter={`url(#${defsId('premiumObjectShadowSide')})`}>
                    <rect x="-32" y="-42" width="80" height="100" rx="6" fill="rgba(92, 65, 190, 0.05)" stroke="rgba(91, 64, 192, 0.1)" strokeWidth="1" />
                    <rect x="-35" y="-45" width="80" height="100" rx="6" fill={`url(#${defsId('acrylicSurface')})`} stroke="rgba(102, 76, 204, 0.34)" strokeWidth="1.2" />
                    <path d="M -35 -33 L -35 -39 Q -35 -45 -29 -45 L -10 -45" fill="none" stroke="rgba(255, 255, 255, 0.82)" strokeWidth="0.9" strokeLinecap="round" />
                    
                    {/* Status Mark */}
                    <rect x="-25" y="-35" width="12" height="12" rx="3" fill="#6848e8" />
                    <path d="M -21 -29 L -19 -27 L -16 -31" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    
                    {/* Content Lines (Different lengths) */}
                    <line x1="-5" y1="-31" x2="30" y2="-31" stroke="rgba(112, 87, 220, 0.5)" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="-25" y1="-12" x2="35" y2="-12" stroke="rgba(112, 87, 220, 0.25)" strokeWidth="2" strokeLinecap="round" />
                    <line x1="-25" y1="-2" x2="15" y2="-2" stroke="rgba(112, 87, 220, 0.25)" strokeWidth="2" strokeLinecap="round" />
                    
                    {/* Delivery Rail & Dot inside source */}
                    <line x1="-25" y1="35" x2="35" y2="35" stroke="rgba(112, 87, 220, 0.15)" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="-5" cy="35" r="3.5" fill="#16bd83" />
                  </g>
                  
                  {/* Junction port in */}
                  <circle cx="-25" cy="15" r="3" fill="#ffffff" stroke="#6848e8" strokeWidth="1.2" />
                </g>

                {/* Connection Arms (Announcement Route) */}
                <g data-figure="announcement-route">
                  {/* Top route */}
                  <path d="M -15 -10 C 15 -10, 30 -65, 55 -65" fill="none" stroke="rgba(112, 87, 220, 0.35)" strokeWidth="1.8" strokeLinecap="round" />
                  {/* Middle route */}
                  <path d="M -15 5 L 65 5" fill="none" stroke="rgba(112, 87, 220, 0.25)" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Bottom route */}
                  <path d="M -15 20 C 15 20, 30 65, 55 65" fill="none" stroke="rgba(112, 87, 220, 0.18)" strokeWidth="1.2" strokeLinecap="round" />
                </g>

                {/* 5 Receiver Modules */}
                <g data-figure="announcement-recipient">
                  {[
                    { x: 55, y: -65, status: 'success', depth: 'front' },
                    { x: 85, y: -35, status: 'pending', depth: 'back' },
                    { x: 65, y: 5, status: 'success', depth: 'front' },
                    { x: 90, y: 40, status: 'pending', depth: 'back' },
                    { x: 55, y: 65, status: 'success', depth: 'front' }
                  ].map((rec, i) => {
                    const isSuccess = rec.status === 'success';
                    const color = isSuccess ? '#16bd83' : '#a69aff';
                    const isFront = rec.depth === 'front';
                    
                    return (
                      <g key={`recipient-${i}`} transform={`translate(${rec.x}, ${rec.y}) scale(${isFront ? 1 : 0.9})`} filter={isFront ? `url(#${defsId('layerShadow')})` : ''}>
                        <rect 
                          x={isFront ? "-20" : "-18"} y={isFront ? "-12" : "-11"} width="40" height="24" rx="12" 
                          fill={`url(#${defsId('acrylicSurface')})`} 
                          stroke="rgba(112, 87, 220, 0.38)" strokeWidth={isFront ? "1.2" : "1"}
                        />
                        {isFront && <path d="M -13 -10 A 10 10 0 0 1 -7 -12" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1" strokeLinecap="round" />}
                        
                        <circle cx="-8" cy="0" r="4.5" fill={color} />
                        <line x1="2" y1="-2" x2="12" y2="-2" stroke="rgba(112, 87, 220, 0.45)" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="2" y1="3" x2="8" y2="3" stroke="rgba(112, 87, 220, 0.25)" strokeWidth="1.5" strokeLinecap="round" />
                      </g>
                    );
                  })}
                </g>

              </g>

            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}

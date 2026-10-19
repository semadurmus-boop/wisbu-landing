'use client';

import React, { useId } from 'react';

export default function FeatureFlowVisualV3() {
  const uniqueId = useId();
  const defsId = (name: string) => `${uniqueId}-${name}`;

  return (
    <section className="relative w-full bg-[#f8f7ff] overflow-clip" id="why-wisbu-v3">
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
            #why-wisbu-v3 > div {
              grid-template-columns: 1fr !important;
              gap: 60px !important;
            }
            .v3-svg-container {
               /* On mobile, we can scale down the SVG to fit or let viewBox handle it */
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

              {/* Soft Drop Shadow */}
              <filter id={defsId('softShadow')} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="4" dy="8" stdDeviation="10" floodColor="#171942" floodOpacity="0.12"/>
              </filter>
              
              <filter id={defsId('layerShadow')} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#171942" floodOpacity="0.06"/>
              </filter>
            </defs>

            {/* Scale entire scene to utilize 84-88% of right col properly */}
            <g className="flow-visual-system-v3" transform="translate(-10, 0)">
              
              {/* --- UNIFIED DATA PATH --- */}
              <g data-figure="data-path">
                {/* 
                  Path starts from Dues collection rail (170, 440)
                  Goes to Report transaction rows (390, 390)
                  Exits Report as verified (550, 260)
                  Goes to Announcement source (730, 330)
                */}
                <path 
                  d="M 170 420 C 230 420, 270 390, 370 390 L 415 390 M 530 250 C 600 250, 650 330, 710 330" 
                  fill="none" 
                  stroke="#a69aff" 
                  strokeWidth="2" 
                  strokeOpacity="0.38" 
                  strokeLinecap="round" 
                  vectorEffect="non-scaling-stroke"
                />
              </g>

              {/* --- LEFT REGION: AIDAT TAKİBİ (x ≈ 165, y ≈ 320) --- */}
              <g data-figure="dues" transform="translate(165, 320)">
                
                {/* Management Spine */}
                <line x1="-70" y1="-75" x2="-70" y2="75" stroke="rgba(112, 87, 220, 0.2)" strokeWidth="2" strokeLinecap="round" />
                <circle cx="-70" cy="-75" r="3" fill="#a69aff" />
                <circle cx="-70" cy="0" r="3" fill="#a69aff" />
                <circle cx="-70" cy="75" r="3" fill="#a69aff" />

                {/* 3 Floors of Apartments (3x2 grid) */}
                {[
                  { y: -75, cols: [{ status: 'success' }, { status: 'pending' }] },
                  { y: 0, cols: [{ status: 'success' }, { status: 'new' }] },
                  { y: 75, cols: [{ status: 'pending' }, { status: 'pending' }] }
                ].map((floor, fIdx) => (
                  <g key={`floor-${fIdx}`} transform={`translate(0, ${floor.y})`}>
                    {/* Connection to spine */}
                    <line x1="-70" y1="0" x2="-45" y2="0" stroke="rgba(112, 87, 220, 0.2)" strokeWidth="1.5" />
                    
                    {floor.cols.map((col, cIdx) => {
                      const isSuccess = col.status === 'success';
                      const isNew = col.status === 'new';
                      const statusColor = isSuccess ? '#16bd83' : isNew ? '#6848e8' : '#c9c2ff';
                      const xOffset = -35 + cIdx * 75;
                      
                      return (
                        <g key={`col-${cIdx}`} transform={`translate(${xOffset}, -25)`} filter={`url(#${defsId('layerShadow')})`}>
                          {/* Unit Tile */}
                          <rect 
                            x="0" y="0" width="60" height="50" rx="8" 
                            fill={`url(#${defsId('acrylicSurface')})`} 
                            stroke="rgba(112, 87, 220, 0.34)" 
                            strokeWidth="1.25"
                          />
                          {/* Top-left Highlight */}
                          <path d="M 8 1 L 20 1" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
                          
                          {/* Unit Mark/Info lines */}
                          <line x1="10" y1="18" x2="35" y2="18" stroke="rgba(112, 87, 220, 0.4)" strokeWidth="2.5" strokeLinecap="round" />
                          <line x1="10" y1="28" x2="25" y2="28" stroke="rgba(112, 87, 220, 0.25)" strokeWidth="2" strokeLinecap="round" />
                          
                          {/* Status Dot */}
                          <circle cx="50" cy="12" r="3.5" fill={statusColor} />
                        </g>
                      );
                    })}
                  </g>
                ))}

                {/* Collection Rail (Tahsilat Rayı) at bottom */}
                <g data-figure="dues-token" transform="translate(5, 100)">
                  {/* Connection from spine to rail */}
                  <path d="M -75 -25 L -75 0 L -30 0" fill="none" stroke="rgba(112, 87, 220, 0.2)" strokeWidth="1.5" strokeLinecap="round" />
                  
                  {/* Rail base */}
                  <rect x="-30" y="-8" width="80" height="16" rx="8" fill="rgba(255,255,255,0.6)" stroke="rgba(112, 87, 220, 0.2)" strokeWidth="1" />
                  
                  {/* ₺ Token */}
                  <g transform="translate(10, 0)" filter={`url(#${defsId('layerShadow')})`}>
                    <circle cx="0" cy="0" r="14" fill={`url(#${defsId('acrylicSurface')})`} stroke="#6848e8" strokeWidth="1.5" />
                    <text x="0" y="4" fontSize="14" fontWeight="bold" fill="#6848e8" textAnchor="middle" style={{ fontVariantNumeric: 'tabular-nums' }}>₺</text>
                  </g>
                </g>

              </g>

              {/* --- CENTER REGION: FİNANSAL RAPORLAMA (x ≈ 480, y ≈ 315) --- */}
              <g data-figure="reporting" transform="translate(480, 315)">
                {/* Layer 3 (Back) */}
                <rect 
                  x="-110" y="-95" width="220" height="170" rx="12" 
                  fill={`url(#${defsId('acrylicBackLayer')})`} 
                  stroke="rgba(112, 87, 220, 0.15)" strokeWidth="1"
                />
                
                {/* Layer 2 (Middle) */}
                <rect 
                  x="-100" y="-85" width="220" height="170" rx="12" 
                  fill={`url(#${defsId('acrylicBackLayer')})`} 
                  stroke="rgba(112, 87, 220, 0.2)" strokeWidth="1"
                  filter={`url(#${defsId('layerShadow')})`}
                />

                {/* Layer 1 (Front - Main Report) */}
                <g filter={`url(#${defsId('softShadow')})`}>
                  <rect 
                    x="-90" y="-75" width="220" height="170" rx="12" 
                    fill={`url(#${defsId('acrylicSurface')})`} 
                    stroke="rgba(112, 87, 220, 0.34)" strokeWidth="1.25"
                  />
                  {/* Highlight */}
                  <path d="M -78 -74 L -50 -74" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />

                  {/* Top: 3 Summary Indicators */}
                  <g transform="translate(-70, -50)">
                    {[0, 60, 120].map((dx, i) => (
                      <g key={`summary-${i}`} transform={`translate(${dx}, 0)`}>
                        <rect x="0" y="0" width="40" height="20" rx="4" fill="rgba(255,255,255,0.5)" />
                        <line x1="5" y1="8" x2="25" y2="8" stroke="#4b2ebc" strokeWidth="2" strokeLinecap="round" />
                        <line x1="5" y1="14" x2="35" y2="14" stroke="rgba(112,87,220,0.3)" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    ))}
                  </g>

                  {/* Bottom-left: 4 Transaction Rows */}
                  <g data-figure="report-row" transform="translate(-70, -10)">
                    {[0, 15, 30, 45].map((dy, i) => (
                      <g key={`row-${i}`} transform={`translate(0, ${dy})`}>
                        <circle cx="5" cy="0" r="3" fill={i === 1 ? '#16bd83' : '#a69aff'} />
                        <line x1="15" y1="0" x2="55" y2="0" stroke="rgba(112, 87, 220, 0.4)" strokeWidth="2" strokeLinecap="round" />
                        <line x1="65" y1="0" x2="80" y2="0" stroke="rgba(112, 87, 220, 0.2)" strokeWidth="2" strokeLinecap="round" />
                      </g>
                    ))}
                  </g>

                  {/* Bottom-right: 3 Columns + Trend Line */}
                  <g data-figure="report-bar" transform="translate(30, 40)">
                    {/* Columns */}
                    <rect x="0" y="-20" width="14" height="20" rx="2" fill="rgba(112, 87, 220, 0.15)" />
                    <rect x="25" y="-35" width="14" height="35" rx="2" fill="rgba(112, 87, 220, 0.15)" />
                    <rect x="50" y="-60" width="14" height="60" rx="2" fill="rgba(112, 87, 220, 0.25)" />
                    
                    {/* Soft Trend Line */}
                    <path d="M 7 -30 Q 32 -30, 57 -70" fill="none" stroke="#6848e8" strokeWidth="2.5" strokeLinecap="round" />
                    
                    {/* Control Points */}
                    <circle cx="7" cy="-30" r="3" fill="#ffffff" stroke="#6848e8" strokeWidth="1.5" />
                    <circle cx="32" cy="-40" r="3" fill="#ffffff" stroke="#6848e8" strokeWidth="1.5" />
                    <circle cx="57" cy="-70" r="4" fill="#ffffff" stroke="#16bd83" strokeWidth="1.5" />
                  </g>

                  {/* Bottom: Thin period comparison rail */}
                  <g transform="translate(-70, 70)">
                    <line x1="0" y1="0" x2="180" y2="0" stroke="rgba(112, 87, 220, 0.15)" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="45" cy="0" r="3" fill="#a69aff" />
                    <circle cx="135" cy="0" r="3" fill="#a69aff" />
                  </g>
                </g>
              </g>

              {/* --- RIGHT REGION: DUYURU & İLAN (x ≈ 790, y ≈ 315) --- */}
              <g data-figure="announcement" transform="translate(790, 315)">
                
                {/* Announcement Source (Left-Center) */}
                <g data-figure="announcement-sheet" transform="translate(-60, 0)">
                  {/* Back sheet */}
                  <rect 
                    x="-35" y="-45" width="70" height="90" rx="6" 
                    fill={`url(#${defsId('acrylicBackLayer')})`} 
                    stroke="rgba(112, 87, 220, 0.15)" strokeWidth="1"
                    transform="rotate(6)"
                  />
                  {/* Front sheet */}
                  <g filter={`url(#${defsId('layerShadow')})`}>
                    <rect 
                      x="-40" y="-50" width="80" height="100" rx="6" 
                      fill={`url(#${defsId('acrylicSurface')})`} 
                      stroke="rgba(112, 87, 220, 0.34)" strokeWidth="1.25"
                    />
                    {/* Status Mark */}
                    <rect x="-30" y="-40" width="14" height="14" rx="3" fill="#6848e8" />
                    <path d="M -26 -33 L -24 -31 L -20 -36" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    
                    {/* Content Lines */}
                    <line x1="-8" y1="-37" x2="25" y2="-37" stroke="rgba(112, 87, 220, 0.5)" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="-30" y1="-15" x2="30" y2="-15" stroke="rgba(112, 87, 220, 0.25)" strokeWidth="2" strokeLinecap="round" />
                    <line x1="-30" y1="-5" x2="10" y2="-5" stroke="rgba(112, 87, 220, 0.25)" strokeWidth="2" strokeLinecap="round" />
                    
                    {/* Delivery Rail inside source */}
                    <line x1="-30" y1="35" x2="30" y2="35" stroke="rgba(112, 87, 220, 0.15)" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="0" cy="35" r="4" fill="#a69aff" />
                  </g>
                </g>

                {/* Connection Arms (Announcement Route) */}
                <g data-figure="announcement-route">
                  {/* Top route */}
                  <path d="M -20 -15 C 10 -15, 20 -60, 50 -60" fill="none" stroke="rgba(112, 87, 220, 0.25)" strokeWidth="1.5" />
                  {/* Middle route */}
                  <path d="M -20 0 L 60 0" fill="none" stroke="rgba(112, 87, 220, 0.25)" strokeWidth="1.5" />
                  {/* Bottom route */}
                  <path d="M -20 15 C 10 15, 20 60, 45 60" fill="none" stroke="rgba(112, 87, 220, 0.25)" strokeWidth="1.5" />
                </g>

                {/* 5 Receiver Modules */}
                <g data-figure="announcement-recipient">
                  {[
                    { x: 50, y: -60, status: 'success' },
                    { x: 80, y: -30, status: 'pending' },
                    { x: 60, y: 0, status: 'success' },
                    { x: 85, y: 35, status: 'pending' },
                    { x: 45, y: 60, status: 'success' }
                  ].map((rec, i) => {
                    const isSuccess = rec.status === 'success';
                    const color = isSuccess ? '#16bd83' : '#c9c2ff';
                    
                    return (
                      <g key={`recipient-${i}`} transform={`translate(${rec.x}, ${rec.y})`} filter={`url(#${defsId('layerShadow')})`}>
                        <rect 
                          x="-20" y="-12" width="40" height="24" rx="12" 
                          fill={`url(#${defsId('acrylicSurface')})`} 
                          stroke="rgba(112, 87, 220, 0.34)" strokeWidth="1"
                        />
                        <circle cx="-8" cy="0" r="4" fill={color} />
                        <line x1="2" y1="-2" x2="12" y2="-2" stroke="rgba(112, 87, 220, 0.4)" strokeWidth="1.5" strokeLinecap="round" />
                        <line x1="2" y1="3" x2="8" y2="3" stroke="rgba(112, 87, 220, 0.2)" strokeWidth="1.5" strokeLinecap="round" />
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

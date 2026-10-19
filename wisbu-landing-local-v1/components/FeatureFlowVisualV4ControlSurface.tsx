'use client';

import React, { useId, forwardRef, useImperativeHandle, useRef } from 'react';

export interface V4ControlSurfaceRefs {
  container: SVGGElement | null;
  duesSystem: SVGGElement | null;
  duesSpine: SVGGElement | null;
  duesConnection: SVGGElement | null;
  currencyToken: SVGGElement | null;
  dataRail: SVGPathElement | null;
  reportCore: SVGGElement | null;
  reportLayer1: SVGRectElement | null;
  reportLayer2: SVGRectElement | null;
  reportRows: (SVGGElement | null)[];
  chartColumns: (SVGRectElement | null)[];
  chartLine: SVGPathElement | null;
  chartMintDot: SVGGElement | null;
  announcementPanel: SVGGElement | null;
  announcementRoutes: (SVGPathElement | null)[];
  recipients: (SVGGElement | null)[];
}

const FeatureFlowVisualV4ControlSurface = forwardRef<V4ControlSurfaceRefs>((props, ref) => {
  const uniqueId = useId();
  const defsId = (name: string) => `${uniqueId}-${name}`;

  const internalRefs = {
    container: useRef<SVGGElement>(null),
    duesSystem: useRef<SVGGElement>(null),
    duesSpine: useRef<SVGGElement>(null),
    duesConnection: useRef<SVGGElement>(null),
    currencyToken: useRef<SVGGElement>(null),
    dataRail: useRef<SVGPathElement>(null),
    reportCore: useRef<SVGGElement>(null),
    reportLayer1: useRef<SVGRectElement>(null),
    reportLayer2: useRef<SVGRectElement>(null),
    reportRows: useRef<(SVGGElement | null)[]>([]),
    chartColumns: useRef<(SVGRectElement | null)[]>([]),
    chartLine: useRef<SVGPathElement>(null),
    chartMintDot: useRef<SVGGElement>(null),
    announcementPanel: useRef<SVGGElement>(null),
    announcementRoutes: useRef<(SVGPathElement | null)[]>([]),
    recipients: useRef<(SVGGElement | null)[]>([]),
  };

  useImperativeHandle(ref, () => ({
    get container() { return internalRefs.container.current; },
    get duesSystem() { return internalRefs.duesSystem.current; },
    get duesSpine() { return internalRefs.duesSpine.current; },
    get duesConnection() { return internalRefs.duesConnection.current; },
    get currencyToken() { return internalRefs.currencyToken.current; },
    get dataRail() { return internalRefs.dataRail.current; },
    get reportCore() { return internalRefs.reportCore.current; },
    get reportLayer1() { return internalRefs.reportLayer1.current; },
    get reportLayer2() { return internalRefs.reportLayer2.current; },
    get reportRows() { return internalRefs.reportRows.current; },
    get chartColumns() { return internalRefs.chartColumns.current; },
    get chartLine() { return internalRefs.chartLine.current; },
    get chartMintDot() { return internalRefs.chartMintDot.current; },
    get announcementPanel() { return internalRefs.announcementPanel.current; },
    get announcementRoutes() { return internalRefs.announcementRoutes.current; },
    get recipients() { return internalRefs.recipients.current; },
  }));

  return (
    <g 
      ref={internalRefs.container}
      className="v4-management-group"
      style={{ transformOrigin: 'center center' }}
    >
      <defs>
        {/* Halos & Global Lights */}
        <radialGradient id={defsId('sceneHalo')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7657e8" stopOpacity="0.10" />
          <stop offset="50%" stopColor="#a998ff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#a998ff" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={defsId('coreGlow')} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7657e8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7657e8" stopOpacity="0" />
        </radialGradient>

        {/* Report Core Gradient (Dark Purple) */}
        <linearGradient id={defsId('reportCore')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#27205F" />
          <stop offset="100%" stopColor="#5C3FD0" />
        </linearGradient>

        {/* Light Acrylic (Aidat & Duyuru) */}
        <linearGradient id={defsId('lightAcrylic')} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.75)" />
          <stop offset="100%" stopColor="rgba(226,220,255,0.4)" />
        </linearGradient>

        {/* Extrusion Faces */}
        <linearGradient id={defsId('extrudeTop')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
          <stop offset="100%" stopColor="rgba(255, 255, 255, 0.6)" />
        </linearGradient>
        <linearGradient id={defsId('extrudeRight')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(133, 104, 232, 0.3)" />
          <stop offset="100%" stopColor="rgba(91, 64, 192, 0.5)" />
        </linearGradient>

        <linearGradient id={defsId('extrudeTopDark')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8a75e8" />
          <stop offset="100%" stopColor="#5839c5" />
        </linearGradient>
        <linearGradient id={defsId('extrudeRightDark')} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e184a" />
          <stop offset="100%" stopColor="#120e30" />
        </linearGradient>

        {/* Rapor Area Fill */}
        <linearGradient id={defsId('reportAreaFill')} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(103,72,232,0.3)"/>
          <stop offset="100%" stopColor="rgba(103,72,232,0)"/>
        </linearGradient>

        {/* Shadows */}
        <filter id={defsId('contactShadow')} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#33236f" floodOpacity="0.16" />
        </filter>

        <filter id={defsId('lightContactShadow')} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#33236f" floodOpacity="0.10" />
        </filter>
        
        <filter id={defsId('layerDrop')} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#171942" floodOpacity="0.08"/>
        </filter>
      </defs>

      {/* Central Focal Halo */}
      <ellipse cx="540" cy="330" rx="350" ry="250" fill={`url(#${defsId('sceneHalo')})`} />

      {/* --- AIDAT TAKİBİ (Katmanlı Aidat Yapısı) --- */}
      <g ref={internalRefs.duesSystem} data-figure="dues-system" transform="translate(140, 220)" opacity="0.75">
        
        <ellipse cx="90" cy="285" rx="110" ry="15" fill="#33236f" opacity="0.10" filter={`url(#${defsId('lightContactShadow')})`} />

        {/* Vertical Service Spine */}
        <g ref={internalRefs.duesSpine} transform="translate(0, 30)">
          <rect x="-8" y="0" width="16" height="230" rx="8" fill={`url(#${defsId('lightAcrylic')})`} stroke="rgba(112, 87, 220, 0.2)" strokeWidth="1" />
          <path d="M -8 8 L -8 222 Q -8 230 0 230" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1" />
          
          <circle cx="0" cy="30" r="4" fill="#a69aff" />
          <circle cx="0" cy="110" r="4" fill="#6848e8" />
          <circle cx="0" cy="190" r="4" fill="#a69aff" />
        </g>

        {/* 3 Floors of 2 Apartments */}
        {[
          { y: 30, cols: [{ s: 'success' }, { s: 'pending' }] },
          { y: 110, cols: [{ s: 'success' }, { s: 'new' }] },
          { y: 190, cols: [{ s: 'pending' }, { s: 'pending' }] }
        ].map((floor, fIdx) => (
          <g key={`floor-${fIdx}`} transform={`translate(0, ${floor.y})`}>
            <line 
              ref={el => { if (fIdx === 0) internalRefs.duesConnection.current = el as unknown as SVGGElement; }} 
              x1="0" y1="30" x2="30" y2="30" 
              stroke="rgba(102, 76, 204, 0.3)" strokeWidth="2.5" 
            />
            
            {floor.cols.map((col, cIdx) => {
              const isSuccess = col.s === 'success';
              const isNew = col.s === 'new';
              const statusColor = isSuccess ? '#16bd83' : isNew ? '#6848e8' : '#c9c2ff';
              const xOffset = 30 + cIdx * 75;
              const zOffset = (cIdx === 0 && fIdx === 1) ? 6 : 0;
              
              return (
                <g key={`col-${cIdx}`} className="dues-module" transform={`translate(${xOffset - zOffset}, ${zOffset})`} filter={`url(#${defsId('layerDrop')})`}>
                  <polygon points={`64,0 72,-8 72,44 64,52`} fill={`url(#${defsId('extrudeRight')})`} stroke="rgba(102, 76, 204, 0.15)" strokeWidth="0.5" />
                  <polygon points={`0,0 8,-8 72,-8 64,0`} fill={`url(#${defsId('extrudeTop')})`} stroke="rgba(255,255,255,0.8)" strokeWidth="0.5" />
                  <rect x="0" y="0" width="64" height="52" rx="4" fill={`url(#${defsId('lightAcrylic')})`} stroke="rgba(102, 76, 204, 0.4)" strokeWidth="1.2" />
                  <path d="M 0 16 L 0 4 Q 0 0 4 0 L 25 0" fill="none" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1" strokeLinecap="round" />
                  
                  <line x1="12" y1="20" x2="38" y2="20" stroke="rgba(112, 87, 220, 0.5)" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="12" y1="32" x2="28" y2="32" stroke="rgba(112, 87, 220, 0.3)" strokeWidth="2" strokeLinecap="round" />
                  
                  <circle cx="52" cy="14" r="4" fill={statusColor} className="status-dot" />
                  {isSuccess && <circle cx="52" cy="14" r="2" fill="#ffffff" opacity="0.7" />}
                </g>
              );
            })}
          </g>
        ))}

        {/* Token Rail */}
        <g transform="translate(60, 275)">
          <line x1="-60" y1="0" x2="60" y2="0" stroke="rgba(102, 76, 204, 0.4)" strokeWidth="3" />
          <line x1="60" y1="0" x2="80" y2="15" stroke="rgba(102, 76, 204, 0.4)" strokeWidth="3" strokeLinecap="round" />
          
          <g ref={internalRefs.currencyToken} transform="translate(30, -10)" filter={`url(#${defsId('layerDrop')})`}>
            <circle cx="4" cy="4" r="20" fill={`url(#${defsId('extrudeRight')})`} />
            <circle cx="0" cy="0" r="20" fill={`url(#${defsId('lightAcrylic')})`} stroke="#6848e8" strokeWidth="1.5" />
            <path d="M 4 20 A 16 16 0 0 1 -20 -4" fill="none" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.2" strokeLinecap="round" />
            <text x="0" y="6" fontSize="18" fontWeight="bold" fill="#6848e8" textAnchor="middle" style={{ fontVariantNumeric: 'tabular-nums' }}>₺</text>
          </g>
        </g>
      </g>

      {/* --- FINANSAL RAPORLAMA (Koyu Mor Rapor Çekirdeği) --- */}
      <g ref={internalRefs.reportCore} data-figure="report-core" transform="translate(420, 150)" opacity="0.94">
        <ellipse cx="160" cy="275" rx="140" ry="25" fill="#27205F" opacity="0.16" filter={`url(#${defsId('contactShadow')})`} />
        
        <g transform="translate(-16, -16)" opacity="0.25">
          <rect ref={internalRefs.reportLayer2} x="0" y="0" width="320" height="245" rx="16" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </g>

        <g transform="translate(-8, -8)" opacity="0.4" filter={`url(#${defsId('layerDrop')})`}>
          <rect ref={internalRefs.reportLayer1} x="0" y="0" width="320" height="245" rx="16" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        </g>

        <g>
          <path d="M 320 16 L 330 6 L 330 235 Q 330 245 320 245 Z" fill={`url(#${defsId('extrudeRightDark')})`} />
          <path d="M 16 0 L 6 -10 L 320 -10 Q 330 -10 330 6 L 320 16 Z" fill={`url(#${defsId('extrudeTopDark')})`} />
          
          <rect x="0" y="0" width="320" height="245" rx="16" fill={`url(#${defsId('reportCore')})`} stroke="rgba(118, 87, 232, 0.4)" strokeWidth="1.5" />
          <path d="M 0 40 L 0 16 Q 0 0 16 0 L 100 0" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.2" strokeLinecap="round" />

          <g transform="translate(20, 25)">
            <g>
              {[0, 95, 190].map((dx, i) => (
                <g key={`metric-${i}`} transform={`translate(${dx}, 0)`}>
                  <rect x="0" y="0" width="85" height="35" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                  <line x1="10" y1="12" x2="45" y2="12" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
                  <line x1="10" y1="22" x2="65" y2="22" stroke="#a998ff" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
                </g>
              ))}
            </g>

            <g transform="translate(0, 60)">
              {[
                { dy: 0, w1: 70, w2: 25, col: '#16bd83' },
                { dy: 24, w1: 50, w2: 40, col: '#a998ff' },
                { dy: 48, w1: 85, w2: 15, col: '#a998ff' },
                { dy: 72, w1: 60, w2: 30, col: '#a998ff' },
              ].map((row, i) => (
                <g key={`f-row-${i}`} transform={`translate(0, ${row.dy})`} ref={el => { internalRefs.reportRows.current[i] = el; }}>
                  <circle cx="6" cy="0" r="3" fill={row.col} />
                  <line x1="20" y1="0" x2={20 + row.w1} y2="0" stroke="rgba(255,255,255,0.85)" strokeWidth="3" strokeLinecap="round" />
                  <line x1={26 + row.w1} y1="0" x2={26 + row.w1 + row.w2} y2="0" stroke="rgba(169, 152, 255, 0.4)" strokeWidth="3" strokeLinecap="round" />
                </g>
              ))}
            </g>

            <g transform="translate(150, 140)">
              {[
                { x: 0, h: 30, cls: 'bg1' },
                { x: 40, h: 55, cls: 'bg2' },
                { x: 80, h: 90, cls: 'bg3' }
              ].map((col, i) => (
                <rect 
                  key={`col-${i}`} 
                  ref={el => { internalRefs.chartColumns.current[i] = el; }}
                  x={col.x} 
                  y={-col.h} 
                  width="22" 
                  height={col.h} 
                  rx="3" 
                  fill={i === 0 ? "rgba(169, 152, 255, 0.15)" : i === 1 ? "rgba(169, 152, 255, 0.25)" : "rgba(169, 152, 255, 0.45)"} 
                />
              ))}
              
              <line x1="-10" y1="5" x2="110" y2="5" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M 11 -40 Q 51 -45, 91 -90 L 91 0 L 11 0 Z" fill={`url(#${defsId('reportAreaFill')})`} />

              <path 
                ref={internalRefs.chartLine}
                d="M 11 -40 Q 51 -45, 91 -90" 
                fill="none" 
                stroke="#ffffff" 
                strokeWidth="3" 
                strokeLinecap="round" 
              />
              
              <circle cx="11" cy="-40" r="4" fill="#5C3FD0" stroke="#ffffff" strokeWidth="2" />
              <circle cx="51" cy="-52" r="4" fill="#5C3FD0" stroke="#ffffff" strokeWidth="2" />
              
              <g ref={internalRefs.chartMintDot} transform="translate(91, -90)">
                <circle cx="0" cy="0" r="6" fill="#16bd83" stroke="#ffffff" strokeWidth="2" />
                <circle cx="0" cy="0" r="2" fill="#ffffff" />
              </g>
            </g>

            <g transform="translate(0, 185)">
              <line x1="0" y1="0" x2="280" y2="0" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="50" cy="0" r="2" fill="#a998ff" opacity="0.6" />
              <circle cx="150" cy="0" r="2" fill="#a998ff" opacity="0.6" />
              <circle cx="230" cy="0" r="2" fill="#a998ff" opacity="0.6" />
            </g>
          </g>

          <rect x="-4" y="180" width="8" height="24" rx="2" fill="#ffffff" opacity="0.8" />
          <rect x="316" y="80" width="8" height="24" rx="2" fill="#16bd83" />
        </g>
      </g>

      {/* --- DUYURU & İLAN (Yayın Dağıtım Ağı) --- */}
      <g ref={internalRefs.announcementPanel} data-figure="announcement-dispatch" transform="translate(770, 160)" opacity="0.84">
        
        <ellipse cx="60" cy="235" rx="50" ry="12" fill="#33236f" opacity="0.10" filter={`url(#${defsId('lightContactShadow')})`} />

        <g transform="translate(0, 30)">
          <path d="M 120 8 L 128 0 L 128 200 Q 128 208 120 208 Z" fill={`url(#${defsId('extrudeRight')})`} />
          <path d="M 8 -8 L 0 0 L 120 0 Q 128 0 128 -8 Z" fill={`url(#${defsId('extrudeTop')})`} />
          
          <rect x="0" y="0" width="120" height="208" rx="8" fill={`url(#${defsId('lightAcrylic')})`} stroke="rgba(112, 87, 220, 0.4)" strokeWidth="1.2" />
          <path d="M 0 20 L 0 8 Q 0 0 8 0 L 30 0" fill="none" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1" strokeLinecap="round" />
          
          <rect x="-6" y="40" width="6" height="20" rx="1.5" fill="#a998ff" />
          
          <g transform="translate(20, 20)">
            <rect x="0" y="0" width="16" height="16" rx="4" fill="#6848e8" />
            <path d="M 4 8 L 7 11 L 12 5" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
            
            <line x1="0" y1="30" x2="65" y2="30" stroke="rgba(112, 87, 220, 0.6)" strokeWidth="3" strokeLinecap="round" />
            <line x1="0" y1="46" x2="80" y2="46" stroke="rgba(112, 87, 220, 0.3)" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="0" y1="62" x2="40" y2="62" stroke="rgba(112, 87, 220, 0.3)" strokeWidth="2.5" strokeLinecap="round" />

            <line x1="0" y1="150" x2="80" y2="150" stroke="rgba(112, 87, 220, 0.2)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="40" cy="150" r="4" fill="#16bd83" />
          </g>
        </g>

        <g transform="translate(120, 90)">
          {[
            "M 0 0 C 40 0, 40 -60, 80 -60",
            "M 0 20 L 90 20",
            "M 0 40 C 40 40, 40 100, 80 100"
          ].map((d, i) => (
            <path 
              key={`route-${i}`}
              ref={el => { internalRefs.announcementRoutes.current[i] = el; }}
              d={d} 
              fill="none" 
              stroke={i === 0 ? "rgba(112, 87, 220, 0.4)" : i === 1 ? "rgba(112, 87, 220, 0.3)" : "rgba(112, 87, 220, 0.2)"} 
              strokeWidth={i === 0 ? 2 : 1.5} 
              strokeLinecap="round" 
            />
          ))}
        </g>

        <g transform="translate(200, 30)">
          {[
            { x: 0, y: 0, s: 'success' },
            { x: 40, y: 35, s: 'pending' },
            { x: 10, y: 80, s: 'success' },
            { x: 50, y: 115, s: 'pending' },
            { x: 0, y: 160, s: 'success' }
          ].map((rec, i) => {
            const isSuccess = rec.s === 'success';
            const color = isSuccess ? '#16bd83' : '#a998ff';
            return (
              <g 
                key={`rec-${i}`} 
                ref={el => { internalRefs.recipients.current[i] = el; }}
                transform={`translate(${rec.x}, ${rec.y})`} 
                filter={`url(#${defsId('layerDrop')})`}
              >
                <polygon points={`0,0 4,-4 54,-4 50,0`} fill={`url(#${defsId('extrudeTop')})`} stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
                <polygon points={`50,0 54,-4 54,26 50,30`} fill={`url(#${defsId('extrudeRight')})`} stroke="rgba(102, 76, 204, 0.15)" strokeWidth="0.5" />
                <rect x="0" y="0" width="50" height="30" rx="6" fill={`url(#${defsId('lightAcrylic')})`} stroke="rgba(112, 87, 220, 0.3)" strokeWidth="1" />
                <circle cx="10" cy="15" r="4.5" fill={color} className="status-dot" />
                <line x1="20" y1="12" x2="40" y2="12" stroke="rgba(112, 87, 220, 0.4)" strokeWidth="2" strokeLinecap="round" />
                <line x1="20" y1="19" x2="32" y2="19" stroke="rgba(112, 87, 220, 0.2)" strokeWidth="1.5" strokeLinecap="round" />
              </g>
            );
          })}
        </g>
      </g>
    </g>
  );
});

FeatureFlowVisualV4ControlSurface.displayName = 'FeatureFlowVisualV4ControlSurface';

export default FeatureFlowVisualV4ControlSurface;

'use client';

import React from 'react';

// Common colors matching the unified aesthetic
const colors = {
  primaryViolet: '#7557E8',
  deepViolet: '#5540C9',
  lightLavender: '#B9AEF7',
  mintStatus: '#2FD5A6',
  darkIndigo: '#2A1B5C',
};

export const SvgDefs = () => {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none">
      <defs>
        {/* Soft realistic drop shadows */}
        <filter id="feat-shadow-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="12" stdDeviation="10" floodColor="#5540C9" floodOpacity="0.12" />
        </filter>
        <filter id="feat-shadow-glass" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-2" dy="8" stdDeviation="6" floodColor="#2A1B5C" floodOpacity="0.08" />
        </filter>
        <filter id="feat-shadow-core" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#2A1B5C" floodOpacity="0.2" />
        </filter>

        {/* Gradients */}
        {/* Glass / Transparent sheet */}
        <linearGradient id="feat-grad-glass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="100%" stopColor="rgba(230,225,255,0.7)" />
        </linearGradient>
        
        {/* Primary violet mat surface */}
        <linearGradient id="feat-grad-violet" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.primaryViolet} />
          <stop offset="100%" stopColor={colors.deepViolet} />
        </linearGradient>

        <linearGradient id="feat-grad-lavender" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2DEFF" />
          <stop offset="100%" stopColor={colors.lightLavender} />
        </linearGradient>
      </defs>
    </svg>
  );
};

// 01 Aidat Takibi
export const IllusDues = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={`w-full h-auto overflow-visible ${className || ''}`}>
    <g transform="translate(100, 100)">
      
      {/* Calendar Wall (Back Left) */}
      <g transform="translate(-40, -10)">
        <path d="M 0 0 L 50 15 L 50 65 L 0 50 Z" fill="url(#feat-grad-violet)" filter="url(#feat-shadow-soft)" />
        <path d="M 0 0 L 50 15 L 45 12 L -5 -3 Z" fill={colors.lightLavender} />
        <path d="M 50 15 L 55 12 L 55 62 L 50 65 Z" fill={colors.deepViolet} />
        <path d="M 5 15 L 45 27 L 45 37 L 5 25 Z" fill="rgba(255,255,255,0.15)" />
        <circle cx="15" cy="18" r="2" fill="rgba(255,255,255,0.9)" />
        <circle cx="25" cy="21" r="2" fill="rgba(255,255,255,0.9)" />
      </g>

      {/* Connection Line */}
      <path d="M -15 65 L 35 50" fill="none" stroke={colors.lightLavender} strokeWidth="2.5" strokeDasharray="3 3" />

      {/* Small Account Module (Right) */}
      <g transform="translate(45, 30)">
        <path d="M 0 5 L 30 15 L 60 5 L 30 -5 Z" fill="url(#feat-grad-glass)" filter="url(#feat-shadow-glass)" />
        <path d="M 0 5 L 30 15 L 30 20 L 0 10 Z" fill="rgba(255,255,255,0.7)" />
        <path d="M 30 15 L 60 5 L 60 10 L 30 20 Z" fill="rgba(200,190,255,0.5)" />
        <ellipse cx="30" cy="5" rx="10" ry="4" fill={colors.darkIndigo} opacity="0.1" />
        <circle cx="30" cy="5" r="4" fill={colors.mintStatus} />
      </g>

      {/* 3 Payment Disks (Front) */}
      <g transform="translate(-15, 60)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0, ${-i * 14})`}>
            {/* Disk side */}
            <path d="M -25 0 L 25 15 L 25 25 L -25 10 Z" fill={colors.deepViolet} />
            <path d="M -25 10 C -25 18, 25 33, 25 25 C 25 17, -25 2, -25 10 Z" fill={colors.darkIndigo} opacity="0.4"/>
            {/* Disk top */}
            <path d="M -25 0 C -25 -8, 25 7, 25 15 C 25 23, -25 8, -25 0 Z" fill="url(#feat-grad-lavender)" filter={i === 2 ? "url(#feat-shadow-soft)" : ""} />
            {/* Inner detail */}
            <path d="M -15 2 C -15 -3, 15 6, 15 11 C 15 16, -15 7, -15 2 Z" fill="rgba(255,255,255,0.4)" />
          </g>
        ))}
      </g>

    </g>
  </svg>
);

// 02 Finansal Raporlama
export const IllusReports = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={`w-full h-auto overflow-visible ${className || ''}`}>
    <g transform="translate(100, 110)">
      
      {/* Back Glass Sheet 1 (Pie chart) */}
      <g transform="translate(15, -45)">
        <path d="M -50 0 L 20 20 L 80 0 L 10 -20 Z" fill="url(#feat-grad-glass)" filter="url(#feat-shadow-glass)" />
        <path d="M -50 0 L 20 20 L 20 22 L -50 2 Z" fill="rgba(255,255,255,0.7)" />
        <path d="M 20 20 L 80 0 L 80 2 L 20 22 Z" fill="rgba(200,190,255,0.5)" />
        <g transform="translate(15, 0)">
          <ellipse cx="0" cy="0" rx="20" ry="7" fill={colors.darkIndigo} opacity="0.1" />
          <path d="M 0 0 L -15 -3 A 20 7 0 0 0 10 6 Z" fill={colors.primaryViolet} />
          <path d="M 0 0 L 10 6 A 20 7 0 0 0 15 -3 Z" fill={colors.mintStatus} />
          <path d="M 0 0 L 15 -3 A 20 7 0 0 0 -15 -3 Z" fill={colors.lightLavender} />
        </g>
      </g>

      {/* Back Glass Sheet 2 (Columns) */}
      <g transform="translate(-15, -25)">
        <path d="M -50 0 L 20 20 L 80 0 L 10 -20 Z" fill="url(#feat-grad-glass)" filter="url(#feat-shadow-glass)" />
        <path d="M -50 0 L 20 20 L 20 22 L -50 2 Z" fill="rgba(255,255,255,0.7)" />
        <path d="M 20 20 L 80 0 L 80 2 L 20 22 Z" fill="rgba(200,190,255,0.5)" />
        
        {/* Columns */}
        <g transform="translate(-15, 5)">
          <path d="M -5 0 L 5 3 L 15 0 L 5 -3 Z" fill={colors.lightLavender} />
          <path d="M -5 0 L 5 3 L 5 -12 L -5 -15 Z" fill={colors.primaryViolet} />
          <path d="M 5 3 L 15 0 L 15 -15 L 5 -12 Z" fill={colors.deepViolet} />
          <path d="M -5 -15 L 5 -12 L 15 -15 L 5 -18 Z" fill={colors.lightLavender} />
        </g>
        <g transform="translate(5, 10)">
          <path d="M -5 0 L 5 3 L 15 0 L 5 -3 Z" fill={colors.lightLavender} />
          <path d="M -5 0 L 5 3 L 5 -27 L -5 -30 Z" fill={colors.primaryViolet} />
          <path d="M 5 3 L 15 0 L 15 -30 L 5 -27 Z" fill={colors.deepViolet} />
          <path d="M -5 -30 L 5 -27 L 15 -30 L 5 -33 Z" fill={colors.lightLavender} />
        </g>
        <g transform="translate(25, 5)">
          <path d="M -5 0 L 5 3 L 15 0 L 5 -3 Z" fill={colors.lightLavender} />
          <path d="M -5 0 L 5 3 L 5 -17 L -5 -20 Z" fill={colors.primaryViolet} />
          <path d="M 5 3 L 15 0 L 15 -20 L 5 -17 Z" fill={colors.deepViolet} />
          <path d="M -5 -20 L 5 -17 L 15 -20 L 5 -23 Z" fill={colors.lightLavender} />
        </g>
      </g>

      {/* Main Reporting Surface (Center) */}
      <g transform="translate(0, 15)">
        <path d="M -60 0 L 20 25 L 90 0 L 10 -25 Z" fill="url(#feat-grad-violet)" filter="url(#feat-shadow-soft)" />
        <path d="M -60 0 L 20 25 L 20 30 L -60 5 Z" fill={colors.lightLavender} />
        <path d="M 20 25 L 90 0 L 90 5 L 20 30 Z" fill={colors.deepViolet} />
        
        {/* Core Detail */}
        <g transform="translate(15, 5)">
          <path d="M -15 0 L 0 5 L 15 0 L 0 -5 Z" fill={colors.darkIndigo} filter="url(#feat-shadow-core)" />
          <path d="M -15 0 L 0 5 L 0 12 L -15 7 Z" fill={colors.deepViolet} />
          <path d="M 0 5 L 15 0 L 15 7 L 0 12 Z" fill="#1C1240" />
          <circle cx="0" cy="5" r="3" fill={colors.mintStatus} />
        </g>
      </g>
      
    </g>
  </svg>
);

// 03 Duyuru & İlan
export const IllusAnnounce = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={`w-full h-auto overflow-visible ${className || ''}`}>
    <g transform="translate(90, 100)">
      
      {/* Board Stand */}
      <g transform="translate(-10, 45)">
        <path d="M 0 0 L 30 10 L 25 15 L -5 5 Z" fill={colors.deepViolet} />
        <path d="M -15 -5 L 0 0 L -5 5 L -20 0 Z" fill={colors.darkIndigo} />
      </g>

      {/* Main Board */}
      <g transform="translate(-10, -10)">
        <path d="M -40 -40 L 20 -20 L 20 50 L -40 30 Z" fill="url(#feat-grad-violet)" filter="url(#feat-shadow-soft)" />
        <path d="M -40 -40 L 20 -20 L 15 -23 L -45 -43 Z" fill={colors.lightLavender} />
        <path d="M 20 -20 L 25 -17 L 25 53 L 20 50 Z" fill={colors.deepViolet} />
        
        {/* Content Sheet 1 (Pin) */}
        <g transform="translate(-15, -15)">
          <path d="M 0 0 L 25 8 L 25 28 L 0 20 Z" fill="url(#feat-grad-glass)" filter="url(#feat-shadow-glass)" />
          <circle cx="5" cy="5" r="2" fill={colors.mintStatus} />
          <path d="M 10 8 L 20 11" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 5 15 L 20 20" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Content Sheet 2 (3 Lines) */}
        <g transform="translate(-30, 5)">
          <path d="M 0 0 L 20 6 L 20 26 L 0 20 Z" fill="rgba(255,255,255,0.9)" filter="url(#feat-shadow-glass)" />
          <path d="M 5 7 L 15 10" stroke={colors.primaryViolet} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M 5 12 L 12 14" stroke={colors.primaryViolet} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          <path d="M 5 17 L 15 20" stroke={colors.primaryViolet} strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>

      {/* Broadcast Waves */}
      <g transform="translate(30, -30)">
        <path d="M 0 0 A 15 15 0 0 1 15 20" fill="none" stroke={colors.lightLavender} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 6 -6 A 25 25 0 0 1 25 26" fill="none" stroke={colors.lightLavender} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        <circle cx="20" cy="8" r="4" fill={colors.mintStatus} />
      </g>
      
    </g>
  </svg>
);

// 04 Kredi Kartıyla Tahsilat
export const IllusPOS = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={`w-full h-auto overflow-visible ${className || ''}`}>
    <g transform="translate(100, 110)">
      
      {/* POS Terminal */}
      <g transform="translate(10, 20)">
        <path d="M -35 0 L 15 15 L 60 0 L 10 -15 Z" fill="#5540C9" opacity="0.12" filter="url(#feat-shadow-soft)" />
        <path d="M -30 -15 L 15 0 L 55 -15 L 10 -30 Z" fill="url(#feat-grad-violet)" />
        <path d="M -30 -15 L 15 0 L 15 10 L -30 -5 Z" fill={colors.deepViolet} />
        <path d="M 15 0 L 55 -15 L 55 -5 L 15 10 Z" fill={colors.darkIndigo} />
        
        {/* Terminal Screen */}
        <path d="M -20 -15 L 5 -5 L 25 -12 L 0 -22 Z" fill={colors.darkIndigo} />
        <path d="M -10 -13 L 5 -7" stroke={colors.mintStatus} strokeWidth="2" strokeLinecap="round" />
        
        {/* Contactless Wave */}
        <path d="M 0 -25 A 10 10 0 0 1 -10 -40" fill="none" stroke={colors.lightLavender} strokeWidth="2" strokeLinecap="round" />
        <path d="M -5 -25 A 15 15 0 0 1 -18 -45" fill="none" stroke={colors.lightLavender} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </g>
      
      {/* Approaching Card */}
      <g transform="translate(-25, -25)">
        <path d="M -25 -5 L 25 10 L 55 -5 L 5 -20 Z" fill="url(#feat-grad-glass)" filter="url(#feat-shadow-glass)" />
        <path d="M -25 -5 L 25 10 L 25 12 L -25 -3 Z" fill="rgba(255,255,255,0.8)" />
        <path d="M 25 10 L 55 -5 L 55 -3 L 25 12 Z" fill="rgba(200,190,255,0.6)" />
        
        {/* Chip (Unbranded) */}
        <path d="M -5 0 L 5 3 L 10 -1 L 0 -4 Z" fill="#E8D175" />
        <circle cx="20" cy="-2" r="3" fill="rgba(255,255,255,0.8)" />
      </g>
      
      {/* Mint Approval */}
      <g transform="translate(-30, 20)">
        <circle cx="0" cy="0" r="5" fill={colors.mintStatus} />
        <path d="M -2 -1 L 0 2 L 4 -3" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

    </g>
  </svg>
);

// 05 Banka Entegrasyonu
export const IllusBank = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={`w-full h-auto overflow-visible ${className || ''}`}>
    <g transform="translate(100, 100)">
      
      {/* 3 Incoming Bank Tapes (Left) */}
      <g>
        {/* Tape 1 */}
        <path d="M -45 -35 C -25 -25, -15 -10, -5 -5" fill="none" stroke={colors.lightLavender} strokeWidth="2.5" />
        <circle cx="-45" cy="-35" r="10" fill="url(#feat-grad-glass)" filter="url(#feat-shadow-glass)" />
        <path d="M -49 -35 L -41 -35 M -45 -39 L -45 -31" stroke={colors.primaryViolet} strokeWidth="2" strokeLinecap="round" />
        
        {/* Tape 2 */}
        <path d="M -55 10 C -30 10, -15 5, -5 0" fill="none" stroke={colors.lightLavender} strokeWidth="2.5" />
        <circle cx="-55" cy="10" r="10" fill="url(#feat-grad-glass)" filter="url(#feat-shadow-glass)" />
        <path d="M -59 10 L -51 10 M -55 6 L -55 14" stroke={colors.primaryViolet} strokeWidth="2" strokeLinecap="round" />
        
        {/* Tape 3 */}
        <path d="M -30 45 C -15 30, -10 15, -5 5" fill="none" stroke={colors.lightLavender} strokeWidth="2.5" />
        <circle cx="-30" cy="45" r="10" fill="url(#feat-grad-glass)" filter="url(#feat-shadow-glass)" />
        <path d="M -34 45 L -26 45 M -30 41 L -30 49" stroke={colors.primaryViolet} strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Central Reconciliation Core */}
      <g transform="translate(10, 0)">
        <path d="M -20 0 L 0 10 L 20 0 L 0 -10 Z" fill="url(#feat-grad-violet)" filter="url(#feat-shadow-core)" />
        <path d="M -20 0 L 0 10 L 0 25 L -20 15 Z" fill={colors.deepViolet} />
        <path d="M 0 10 L 20 0 L 20 15 L 0 25 Z" fill={colors.darkIndigo} />
        
        {/* 2 Matched Lines inside core */}
        <path d="M -8 5 L 0 8 L 8 4" fill="none" stroke={colors.mintStatus} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M -4 8 L 0 10 L 4 8" fill="none" stroke={colors.mintStatus} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* Outgoing Line (Right) */}
      <path d="M 30 5 L 55 15" fill="none" stroke={colors.mintStatus} strokeWidth="2.5" strokeDasharray="3 3" />
      <circle cx="55" cy="15" r="4" fill={colors.mintStatus} />
      
    </g>
  </svg>
);

// 06 Kurumsal SMS & Mail
export const IllusComm = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={`w-full h-auto overflow-visible ${className || ''}`}>
    <g transform="translate(100, 100)">
      
      {/* Entering Content Plate (Left) */}
      <g transform="translate(-40, -15)">
        <path d="M -20 -10 L 10 0 L 30 -10 L 0 -20 Z" fill="url(#feat-grad-glass)" filter="url(#feat-shadow-glass)" />
        <path d="M -10 -10 L 10 -3" stroke={colors.primaryViolet} strokeWidth="2" strokeLinecap="round" />
        <path d="M -5 -5 L 15 2" stroke={colors.primaryViolet} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      </g>

      {/* Central Dispatch Core */}
      <g transform="translate(0, 5)">
        <path d="M -15 -5 L 0 5 L 15 -5 L 0 -15 Z" fill={colors.darkIndigo} filter="url(#feat-shadow-core)" />
        <path d="M -15 -5 L 0 5 L 0 20 L -15 10 Z" fill={colors.deepViolet} />
        <path d="M 0 5 L 15 -5 L 15 10 L 0 20 Z" fill="#1C1240" />
      </g>

      {/* Channels Exiting */}
      <path d="M 10 10 L 35 25" fill="none" stroke={colors.lightLavender} strokeWidth="2.5" />
      <path d="M 15 -5 L 35 -15" fill="none" stroke={colors.lightLavender} strokeWidth="2.5" />

      {/* SMS Capsule */}
      <g transform="translate(45, -20)">
        <path d="M -15 0 L 5 10 L 25 0 L 5 -10 Z" fill="url(#feat-grad-glass)" filter="url(#feat-shadow-glass)" />
        <text x="5" y="4" fill={colors.deepViolet} fontSize="9" fontWeight="800" textAnchor="middle" transform="skewY(26.5)">SMS</text>
        <circle cx="20" cy="-2" r="3" fill={colors.mintStatus} />
      </g>
      
      {/* MAIL Surface */}
      <g transform="translate(45, 30)">
        <path d="M -20 -5 L 10 10 L 40 -5 L 10 -20 Z" fill="url(#feat-grad-violet)" filter="url(#feat-shadow-soft)" />
        <path d="M -20 -5 L 10 10 L 10 15 L -20 0 Z" fill={colors.lightLavender} />
        <path d="M 10 10 L 40 -5 L 40 0 L 10 15 Z" fill={colors.deepViolet} />
        <text x="10" y="4" fill="#fff" fontSize="9" fontWeight="800" textAnchor="middle" transform="skewY(26.5)">MAIL</text>
        <circle cx="10" cy="-20" r="4" fill={colors.mintStatus} />
      </g>

    </g>
  </svg>
);

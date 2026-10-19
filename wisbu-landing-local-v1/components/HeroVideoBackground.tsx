"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setShouldPlay(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasError) {
              video.play().catch(() => {
                // Ignore auto-play errors quietly
              });
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [hasError]);

  return (
    <div className="absolute inset-0 z-0 bg-[#1e1b4b] overflow-hidden pointer-events-none">
      {!hasError && (
        <video
          ref={videoRef}
          src="/assets/video.mp4"
          className="absolute left-0 w-full h-full object-cover object-[50%_0%] top-[12px] md:top-[24px] lg:top-[45px] min-[1440px]:top-[70px]"
          autoPlay={shouldPlay}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => setHasError(true)}
        />
      )}
      {/* Hafif sabit lacivert okunabilirlik katmanı (gradient) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b]/60 via-[#1e1b4b]/20 to-transparent" />
    </div>
  );
}

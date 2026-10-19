"use client";

import React, { useEffect, useRef } from "react";

export default function LivingNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let isMobile = false;
    let isVisible = true;

    // Visibility Observer for performance
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    if (wrapperRef.current) observer.observe(wrapperRef.current);

    // State for animation
    const mouse = { x: -1000, y: -1000 };
    const targetMouse = { x: -1000, y: -1000 };
    let animationFrameId: number;
    const startTime = performance.now();

    // Configuration
    const numLines = 8;
    const numNodes = 20;

    interface Line {
      id: number;
      layer: 1 | 2 | 3;
      points: { x: number; y: number }[];
      basePoints: { x: number; y: number }[];
    }

    interface Node {
      id: number;
      lineId: number;
      t: number;
      x: number;
      y: number;
      baseX: number;
      baseY: number;
      layer: 1 | 2 | 3;
    }

    let lines: Line[] = [];
    let nodes: Node[] = [];

    const initPaths = () => {
      lines = [];
      nodes = [];
      for (let i = 0; i < numLines; i++) {
        const layer = (i % 3) + 1 as 1 | 2 | 3;
        // Lines concentrated at bottom 40-50%
        const yOffset = height * 0.5 + Math.random() * (height * 0.4);
        
        const points = [];
        const basePoints = [];
        const segments = 5; 
        for (let j = 0; j <= segments; j++) {
          const px = (width / segments) * j + (Math.random() - 0.5) * (width * 0.1);
          // Add some wavy organic feel
          const py = yOffset + Math.sin(j) * 60 + (Math.random() - 0.5) * 120;
          points.push({ x: px, y: py });
          basePoints.push({ x: px, y: py });
        }
        lines.push({ id: i, layer, points, basePoints });
      }

      for (let i = 0; i < numNodes; i++) {
        const lineIndex = Math.floor(Math.random() * numLines);
        const line = lines[lineIndex];
        nodes.push({
          id: i,
          lineId: lineIndex,
          t: Math.random() * 0.9 + 0.05, // keep nodes slightly away from extreme edges
          x: 0,
          y: 0,
          baseX: 0,
          baseY: 0,
          layer: line.layer,
        });
      }
    };

    const getSplinePoint = (pts: {x: number, y: number}[], t: number) => {
      const segmentCount = pts.length - 1;
      if (segmentCount === 0) return pts[0];
      
      let segment = Math.floor(t * segmentCount);
      if (segment >= segmentCount) segment = segmentCount - 1;
      
      const segmentT = (t * segmentCount) - segment;

      const p0 = pts[Math.max(0, segment - 1)];
      const p1 = pts[segment];
      const p2 = pts[Math.min(segmentCount, segment + 1)];
      const p3 = pts[Math.min(segmentCount, segment + 2)];

      const t2 = segmentT * segmentT;
      const t3 = t2 * segmentT;

      const x = 0.5 * (
        (2 * p1.x) +
        (-p0.x + p2.x) * segmentT +
        (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
        (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3
      );

      const y = 0.5 * (
        (2 * p1.y) +
        (-p0.y + p2.y) * segmentT +
        (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
        (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3
      );

      return { x, y };
    };

    const updateNodesBase = () => {
      nodes.forEach(node => {
        const line = lines[node.lineId];
        const pt = getSplinePoint(line.basePoints, node.t);
        node.baseX = pt.x;
        node.baseY = pt.y;
      });
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.parentElement?.getBoundingClientRect() || { width: window.innerWidth, height: window.innerHeight };
      width = rect.width;
      height = rect.height;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      isMobile = width < 768 || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      initPaths();
      updateNodesBase();
    };

    window.addEventListener("resize", resize);
    resize();

    const onMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = canvas.getBoundingClientRect();
      targetMouse.x = e.clientX - rect.left;
      targetMouse.y = e.clientY - rect.top;
    };
    
    const onMouseLeave = () => {
      targetMouse.x = -1000;
      targetMouse.y = -1000;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const lerp = (start: number, end: number, amt: number) => {
      return (1 - amt) * start + amt * end;
    };

    const draw = (currentTime: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const elapsed = currentTime - startTime;
      const introDuration = 1200; 
      const introProgress = Math.min(elapsed / introDuration, 1);
      const easedIntro = 1 - Math.pow(1 - introProgress, 3); 

      if (!isMobile) {
        mouse.x = lerp(mouse.x, targetMouse.x, 0.08);
        mouse.y = lerp(mouse.y, targetMouse.y, 0.08);
      }

      const maxRadius = 280;

      // Cursor Glow
      if (!isMobile && mouse.x > -500 && easedIntro > 0.8) {
        const glowGradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, maxRadius);
        glowGradient.addColorStop(0, 'rgba(151, 131, 255, 0.2)');
        glowGradient.addColorStop(1, 'rgba(151, 131, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, maxRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Update Lines and Draw
      lines.forEach((line) => {
        const opacity = line.layer === 1 ? 0.08 : line.layer === 2 ? 0.15 : 0.22;
        const maxShift = line.layer === 1 ? 5 : line.layer === 2 ? 10 : 16;
        
        for (let i = 0; i < line.points.length; i++) {
          const bp = line.basePoints[i];
          const p = line.points[i];

          let tx = bp.x;
          let ty = bp.y;

          if (!isMobile) {
            const dx = mouse.x - bp.x;
            const dy = mouse.y - bp.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < maxRadius) {
              const force = (1 - dist / maxRadius);
              tx -= (dx / dist) * force * maxShift;
              ty -= (dy / dist) * force * maxShift;
            }
          }

          p.x = lerp(p.x, tx, 0.06);
          p.y = lerp(p.y, ty, 0.06);
        }

        ctx.beginPath();
        for (let t = 0; t <= 1; t += 0.02) {
          const pt = getSplinePoint(line.points, t);
          if (t === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        
        ctx.strokeStyle = `rgba(199, 194, 255, ${opacity * easedIntro})`;
        ctx.lineWidth = line.layer === 3 ? 1.5 : 1;
        ctx.stroke();
      });

      // Update and Draw Nodes
      nodes.forEach((node) => {
        const line = lines[node.lineId];
        const pt = getSplinePoint(line.points, node.t);
        
        node.x = pt.x;
        node.y = pt.y;

        let radius = node.layer === 1 ? 1.5 : node.layer === 2 ? 2.5 : 3.5;
        let alpha = node.layer === 1 ? 0.3 : node.layer === 2 ? 0.6 : 0.9;
        let glow = false;

        if (!isMobile) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxRadius) {
            const force = (1 - dist / maxRadius);
            radius *= (1 + force * 0.35); 
            alpha = Math.min(1, alpha + force * 0.5);
            glow = true;
          }
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius * easedIntro, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 226, 255, ${alpha * easedIntro})`;
        
        if (glow) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#C9A7FF';
        } else {
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Connections between close nodes near cursor
      if (!isMobile && easedIntro > 0.8) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const n1 = nodes[i];
            const n2 = nodes[j];
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const distNode = Math.sqrt(dx * dx + dy * dy);

            if (distNode < 120) {
              const mdx = mouse.x - (n1.x + n2.x) / 2;
              const mdy = mouse.y - (n1.y + n2.y) / 2;
              const distMouse = Math.sqrt(mdx * mdx + mdy * mdy);

              if (distMouse < maxRadius) {
                const forceNode = 1 - distNode / 120;
                const forceMouse = 1 - distMouse / maxRadius;
                const alpha = forceNode * forceMouse * 0.4;

                ctx.beginPath();
                ctx.moveTo(n1.x, n1.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.strokeStyle = `rgba(230, 226, 255, ${alpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}

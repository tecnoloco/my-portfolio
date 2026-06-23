"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotGridSvg = `<svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
    <defs>
      <pattern id="dot-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="1.5" fill="rgba(212, 168, 83, 0.15)" />
      </pattern>
    </defs>
    <rect width="1200" height="800" fill="url(#dot-grid)" />
  </svg>`;

  const prefersReducedMotion = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  useEffect(() => {
    // If reduced motion is preferred, render static SVG instead
    if (prefersReducedMotion()) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const dotSize = 1.5;
    const dotSpacing = 40;
    const dotColor = "rgba(212, 168, 83, 0.15)";

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = dotColor;

      for (let x = 0; x < canvas.width; x += dotSpacing) {
        for (let y = 0; y < canvas.height; y += dotSpacing) {
          ctx.beginPath();
          ctx.arc(x, y, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      {prefersReducedMotion() ? (
        <div
          className="fixed inset-0 -z-10"
          dangerouslySetInnerHTML={{ __html: dotGridSvg }}
        />
      ) : (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 -z-10"
          style={{ backgroundColor: "var(--color-surface-base)" }}
        />
      )}
    </>
  );
}

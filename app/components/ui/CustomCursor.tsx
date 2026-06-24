"use client";

import { createContext, useContext, useRef, useEffect } from "react";
import gsap from "gsap";

interface CursorContextType {
  setHoverElement: (element: HTMLElement | null) => void;
}

const CursorContext = createContext<CursorContextType | null>(null);

const IDLE_SIZE = 20;

const CORNER_LENGTH = 10;
const CORNER_RADIUS = 8;

function drawCornerBrackets(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  height: number,
  alpha: number,
) {
  const hw = width / 2;
  const hh = height / 2;
  const cl = CORNER_LENGTH;
  const r = Math.min(CORNER_RADIUS, cl - 1);

  ctx.globalAlpha = alpha;
  ctx.strokeStyle = "rgba(212, 168, 83, 0.8)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // TOP-LEFT
  ctx.beginPath();
  ctx.moveTo(cx - hw + cl, cy - hh);
  ctx.arcTo(cx - hw, cy - hh, cx - hw, cy - hh + cl, r);
  ctx.lineTo(cx - hw, cy - hh + cl);
  ctx.stroke();

  // TOP-RIGHT
  ctx.beginPath();
  ctx.moveTo(cx + hw - cl, cy - hh);
  ctx.arcTo(cx + hw, cy - hh, cx + hw, cy - hh + cl, r);
  ctx.lineTo(cx + hw, cy - hh + cl);
  ctx.stroke();

  // BOTTOM-LEFT
  ctx.beginPath();
  ctx.moveTo(cx - hw + cl, cy + hh);
  ctx.arcTo(cx - hw, cy + hh, cx - hw, cy + hh - cl, r);
  ctx.lineTo(cx - hw, cy + hh - cl);
  ctx.stroke();

  // BOTTOM-RIGHT
  ctx.beginPath();
  ctx.moveTo(cx + hw - cl, cy + hh);
  ctx.arcTo(cx + hw, cy + hh, cx + hw, cy + hh - cl, r);
  ctx.lineTo(cx + hw, cy + hh - cl);
  ctx.stroke();

  ctx.globalAlpha = 1;
}

export const useCursorInteraction = () => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursorInteraction must be used within CursorProvider");
  }

  return {
    onHoverEnter: (element: HTMLElement) => context.setHoverElement(element),
    onHoverExit: () => context.setHoverElement(null),
  };
};

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetDimensionsRef = useRef({ width: IDLE_SIZE, height: IDLE_SIZE });
  const hoverElementRef = useRef<HTMLElement | null>(null);
  const hoverStateRef = useRef({ progress: 0 });
  const snapPosRef = useRef({ x: 0, y: 0 });

  const setHoverElement = (element: HTMLElement | null) => {
    gsap.killTweensOf(hoverStateRef.current);
    gsap.killTweensOf(snapPosRef.current);

    hoverElementRef.current = element;

    if (element) {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      gsap.to(snapPosRef.current, {
        x: centerX,
        y: centerY,
        duration: 0.25,
        ease: "back.out(1.2)",
      });

      gsap.to(hoverStateRef.current, {
        progress: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      targetDimensionsRef.current = {
        width: rect.width + 10,
        height: rect.height + 10,
      };
    } else {
      gsap.to(hoverStateRef.current, {
        progress: 0,
        duration: 0.3,
        ease: "power2.in",
      });

      targetDimensionsRef.current = { width: IDLE_SIZE, height: IDLE_SIZE };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Hide default cursor
    document.body.style.cursor = "none";

    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    const circleState = { width: 0, height: 0 };
    const LERP_FACTOR = 0.45;
    const POINT_RADIUS = 3;
    const CIRCLE_BORDER = 2;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const progress = hoverStateRef.current.progress;

      // If hovering, always update element position (handles smooth scroll)
      if (hoverElementRef.current && progress > 0) {
        const rect = hoverElementRef.current.getBoundingClientRect();
        snapPosRef.current.x = rect.left + rect.width / 2;
        snapPosRef.current.y = rect.top + rect.height / 2;
      }

      // Mouse-follow always continues
      cursorPos.x += (mousePos.x - cursorPos.x) * LERP_FACTOR;
      cursorPos.y += (mousePos.y - cursorPos.y) * LERP_FACTOR;

      // Blend between mouse-follow and snapped position
      const drawX =
        cursorPos.x + (snapPosRef.current.x - cursorPos.x) * progress;
      const drawY =
        cursorPos.y + (snapPosRef.current.y - cursorPos.y) * progress;

      // Lerp dimensions
      const targetWidth = targetDimensionsRef.current.width;
      const targetHeight = targetDimensionsRef.current.height;
      circleState.width += (targetWidth - circleState.width) * LERP_FACTOR;
      circleState.height += (targetHeight - circleState.height) * LERP_FACTOR;

      // Draw ellipse (fades out as progress → 1)
      if (progress < 0.99) {
        ctx.globalAlpha = 1 - progress;
        ctx.strokeStyle = "rgba(212, 168, 83, 0.6)";
        ctx.lineWidth = CIRCLE_BORDER;
        ctx.beginPath();
        ctx.ellipse(
          drawX,
          drawY,
          Math.max(circleState.width / 2, 1),
          Math.max(circleState.height / 2, 1),
          0,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Draw corner brackets (fades in as progress → 1)
      if (progress > 0.01) {
        drawCornerBrackets(
          ctx,
          drawX,
          drawY,
          circleState.width,
          circleState.height,
          progress,
        );
      }

      // Draw cursor point at actual mouse position
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(212, 168, 83, 0.8)";
      ctx.beginPath();
      ctx.arc(mousePos.x, mousePos.y, POINT_RADIUS, 0, Math.PI * 2);
      ctx.fill();
    };

    gsap.ticker.add(animate, false, false);

    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <CursorContext.Provider value={{ setHoverElement }}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-100"
      />
      {children}
    </CursorContext.Provider>
  );
}

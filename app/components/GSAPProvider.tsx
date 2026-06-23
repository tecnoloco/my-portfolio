"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

export { useLenis } from "lenis/react";

function subscribe(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export default function GSAPProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  const prefersReducedMotion = useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      key={String(prefersReducedMotion)}
      root
      options={{ autoRaf: false, lerp: prefersReducedMotion ? 1 : 0.3 }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}

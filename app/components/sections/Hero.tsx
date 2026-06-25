"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import Button from "@/app/components/ui/Button";
import { withCursorInteraction } from "@/app/components/hoc/withCursorInteraction";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

const ButtonWithCursor = withCursorInteraction(Button);

interface Column {
  x: number;
  y: number;
  speed: number;
  chars: string[];
  tick: number;
  fontSize: number;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!nameRef.current) return;

        // Split the name for character-level animation
        const split = SplitText.create(nameRef.current, {
          type: "chars,words",
          charsClass: "char",
          wordsClass: "word",
          mask: "chars",
        });

        // Reveal container now that chars are hidden individually by .char CSS
        gsap.set(nameRef.current, { opacity: 1 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        // Role label
        tl.fromTo(
          ".hero-label",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
        );

        // Name characters — mask clips them, no opacity needed
        tl.from(
          split.chars,
          { y: "100%", stagger: 0.02, duration: 0.7 },
          "-=0.3",
        );

        // Tagline
        tl.fromTo(
          ".hero-tagline",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5",
        );

        // Description
        tl.fromTo(
          ".hero-description",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.4",
        );

        // CTA buttons
        tl.fromTo(
          ".hero-cta > *",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 },
          "-=0.3",
        );

        // Profile image
        tl.fromTo(
          ".hero-profile",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8 },
          "-=0.5",
        );

        // Subtle floating animation
        gsap.to(".hero-profile", {
          y: -20,
          duration: 3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
        // Hero name scramble effect
        const TEXT_1 = "Eduardo Espinosa";
        const TEXT_2 = "tecnoloco";
        const UNICODE_CHARS =
          "ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩабвгдежзийклмнопрстуфхцчшщъыьэюяქხჯჰฟภมยรลวศษสหฬอัีึืุูเแโใไๅๆ๏๑๒๓๔๕๖๗๘๙໐໑໒໓໔໕໖໗໘໙";

        let isShowingText1 = true;

        const startScrambleLoop = () => {
          setTimeout(() => {
            const interval = setInterval(() => {
              isShowingText1 = !isShowingText1;
              gsap.to(".hero-name", {
                duration: 0.6,
                scrambleText: {
                  text: isShowingText1 ? TEXT_1 : TEXT_2,
                  chars: UNICODE_CHARS,
                },
              });
            }, 5000);

            return () => clearInterval(interval);
          }, 1500);
        };
        startScrambleLoop();
      });
    },
    { scope: containerRef },
  );

  // Matrix like background animation
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CHARSET = "{}[]()<>/\\==>+-*&|!?@#;:~^%$0123456789ABCDEFabcdef";
    const COLUMN_SPACING = 60;
    const TRAIL_LENGTH = 20;
    const MIN_SPEED = 0.1;
    const MAX_SPEED = 0.6;
    const MIN_FONT_SIZE = 12;
    const MAX_FONT_SIZE = 28;

    let columns: Column[] = [];
    let sectionHeight = 0;

    const initColumns = () => {
      const sectionElement = containerRef.current;
      if (!sectionElement) return;

      sectionHeight = sectionElement.clientHeight;
      canvas.width = sectionElement.clientWidth;
      canvas.height = sectionHeight;

      columns = [];
      for (let x = 0; x < canvas.width; x += COLUMN_SPACING) {
        const randomOffsetY = Math.random() * sectionHeight;
        const fontSize =
          MIN_FONT_SIZE + Math.random() * (MAX_FONT_SIZE - MIN_FONT_SIZE);
        columns.push({
          x,
          y: randomOffsetY - sectionHeight * 1.5,
          speed: MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED),
          chars: Array.from(
            { length: TRAIL_LENGTH },
            () => CHARSET[Math.floor(Math.random() * CHARSET.length)],
          ),
          tick: 0,
          fontSize,
        });
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      initColumns();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    initColumns();

    const draw = (_time: number, deltaTime: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      columns.forEach((col) => {
        const charHeight = col.fontSize * 1.2;
        col.y += col.speed * deltaTime;
        col.tick++;

        if (col.tick % 8 === 0) {
          col.chars.shift();
          col.chars.push(CHARSET[Math.floor(Math.random() * CHARSET.length)]);
        }

        if (col.y > sectionHeight) {
          col.y = -TRAIL_LENGTH * charHeight;
          col.chars = Array.from(
            { length: TRAIL_LENGTH },
            () => CHARSET[Math.floor(Math.random() * CHARSET.length)],
          );
        }

        ctx.font = `${col.fontSize}px 'Courier New', monospace`;
        col.chars.forEach((char, index) => {
          const charY = col.y + index * charHeight;

          if (charY < -charHeight || charY > sectionHeight) {
            return;
          }

          const opacity =
            index === TRAIL_LENGTH - 1 ? 0.5 : 0.2 * (1 - index / TRAIL_LENGTH);
          ctx.fillStyle = `rgba(212, 168, 83, ${opacity})`;
          ctx.fillText(char, col.x, charY + charHeight);
        });
      });
    };

    gsap.ticker.add(draw, false, false);

    return () => {
      gsap.ticker.remove(draw);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 md:pt-0"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text content */}
        <div className="space-y-6 md:space-y-8">
          <p className="hero-label text-accent text-sm font-semibold uppercase tracking-wider">
            Senior Software Engineer
          </p>

          <h1
            ref={nameRef}
            className="hero-heading text-5xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-tight"
          >
            <span className="hero-greeting block"> Hello I&apos;m</span>
            <span className="hero-name block">Eduardo Espinosa</span>
          </h1>

          <p className="hero-tagline text-xl md:text-2xl text-text-secondary font-light leading-relaxed max-w-xl">
            Building payment infrastructure and product experiences that scale
          </p>

          <p className="hero-description text-text-secondary text-base md:text-lg leading-relaxed max-w-lg">
            10+ years of experience across fintech, marketplaces, and mobile
            engineering. I specialize in React, React Native, TypeScript, and
            building systems that handle real money with confidence.
          </p>

          <div className="hero-cta flex flex-col sm:flex-row gap-4 pt-4">
            <ButtonWithCursor
              size="lg"
              variant="primary"
              href="#projects"
              className="block text-center"
            >
              View Projects
            </ButtonWithCursor>
            <ButtonWithCursor
              size="lg"
              variant="outline"
              href="#contact"
              className="block text-center"
            >
              Get in Touch
            </ButtonWithCursor>
          </div>

          {/* Company mentions */}
          <div className="pt-8 space-y-2">
            <p className="text-text-muted text-xs uppercase tracking-wider">
              Shipped with
            </p>
            <p className="text-text-secondary text-sm">
              Instawork • Cornershop by Uber • Stateoftheart AI • Paybook •
              Marciano Studio
            </p>
          </div>
        </div>

        {/* Right: Profile image (desktop only) */}
        <div className="hidden md:flex relative h-96 md:h-screen items-center justify-center">
          <div className="relative w-full max-w-sm aspect-square">
            <div className="hero-profile absolute inset-0 glass rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/profile.png"
                alt="Eduardo Espinosa"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

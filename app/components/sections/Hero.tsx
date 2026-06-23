"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import Button from "@/app/components/ui/Button";

gsap.registerPlugin(SplitText);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

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

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        // Role label
        tl.from(".hero-label", {
          y: 20,
          opacity: 0,
          duration: 0.6,
        });

        // Name characters
        tl.from(
          split.chars,
          {
            y: "100%",
            opacity: 0,
            stagger: 0.02,
            duration: 0.7,
          },
          "-=0.3",
        );

        // Tagline
        tl.from(
          ".hero-tagline",
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5",
        );

        // Description
        tl.from(
          ".hero-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.4",
        );

        // CTA buttons
        tl.from(
          ".hero-cta > *",
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
          },
          "-=0.3",
        );

        // Profile image
        tl.from(
          ".hero-profile",
          {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
          },
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
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 md:pt-0"
    >
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text content */}
        <div className="space-y-6 md:space-y-8">
          <p className="hero-label text-accent text-sm font-semibold uppercase tracking-wider">
            Senior Software Engineer
          </p>

          <h1
            ref={nameRef}
            className="hero-name text-5xl md:text-7xl lg:text-8xl font-bold text-text-primary leading-tight"
          >
            Eduardo Espinosa
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
            <Button
              size="lg"
              variant="primary"
              href="#projects"
              className="block text-center"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              href="#contact"
              className="block text-center"
            >
              Get in Touch
            </Button>
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

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Tag from "@/app/components/ui/Tag";

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = [
  {
    title: "NetSuite Financial Sync",
    year: "2023–2024",
    metric: "90%",
    metricLabel: "fewer sync failures",
    description:
      "Redesigned financial synchronization from event-driven signals to scheduled batch processing using Django, Celery, and service-layer architecture. Added structured logging, Datadog metrics, and idempotency controls for reliable accounting workflows.",
    technologies: ["Django", "Celery", "Python", "Datadog", "Service Architecture"],
  },
  {
    title: "Instawork Card",
    year: "2022–2023",
    metric: "2x",
    metricLabel: "retention improvement",
    description:
      "Shipped a secure debit card product with transparent fee handling, real-time transaction visibility, and resilient error states. Led frontend and VGS integration work across React Native and web platforms.",
    technologies: ["React Native", "TypeScript", "VGS", "Stripe", "Security"],
  },
  {
    title: "W-2 Instapay",
    year: "2021–2022",
    metric: "+15%",
    metricLabel: "business margins",
    description:
      "Built instant wage-access workflows enabling workers to claim earned wages immediately after clock-out. Implemented eligibility logic, tax/fee calculations, and safeguards while maintaining clear product copy.",
    technologies: ["React", "React Native", "Django", "Stripe", "Compliance"],
  },
  {
    title: "React Native TypeScript",
    year: "2022",
    metric: "100%",
    metricLabel: "components migrated",
    description:
      "Led full migration of shared React Native components from Flow/JavaScript to TypeScript strict mode. Improved type safety, developer experience, and reduced runtime errors across mobile infrastructure.",
    technologies: ["React Native", "TypeScript", "Flow", "Tooling", "Migration"],
  },
];

export default function Featured() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const panels = gsap.utils.toArray<Element>(".h-panel");

        if (panels.length === 0 || !panelsRef.current) return;

        // Calculate proper end value based on content width
        const totalWidth = panelsRef.current.offsetWidth;
        const panelCount = panels.length;

        const tween = gsap.to(panels, {
          xPercent: -100 * (panelCount - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (panelCount - 1),
            end: () => `+=${totalWidth * (panelCount - 1) * 0.25}`,
          },
        });

        // Content reveals keyed to horizontal scroll
        panels.forEach((panel) => {
          gsap.from(panel.querySelectorAll(".panel-content > *"), {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: "left center",
              toggleActions: "play none none reverse",
            },
          });
        });
      });

      // Reduced motion: simple vertical stack
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.from(".h-panel", {
          autoAlpha: 0,
          duration: 0.5,
          stagger: 0.2,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section id="featured" className="relative" ref={containerRef}>
      {/* Horizontal scroll container for motion-capable users */}
      <div className="motion-safe:h-screen motion-safe:overflow-hidden motion-safe:w-full">
        <div
          ref={panelsRef}
          className="flex motion-safe:w-[400vw] motion-safe:h-full motion-reduce:flex-col gap-6 motion-reduce:py-24 motion-reduce:px-6 motion-reduce:max-w-7xl motion-reduce:mx-auto"
        >
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="h-panel motion-safe:h-screen motion-safe:w-screen motion-safe:flex-shrink-0 motion-reduce:w-full motion-reduce:border motion-reduce:border-border motion-reduce:rounded-lg motion-reduce:p-8"
            >
              <div className="h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12">
                <div className="panel-content max-w-2xl space-y-6">
                  <div>
                    <p className="text-accent/60 text-sm font-semibold uppercase tracking-wider">
                      {project.year}
                    </p>
                    <h2 className="text-5xl md:text-6xl font-bold text-text-primary mt-2">
                      {project.title}
                    </h2>
                  </div>

                  <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
                    {project.description}
                  </p>

                  <div className="flex items-baseline gap-3 py-6 border-y border-border">
                    <div>
                      <div className="text-4xl md:text-5xl font-bold text-accent">
                        {project.metric}
                      </div>
                      <p className="text-text-secondary text-sm mt-1">
                        {project.metricLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Tag key={tech} variant="accent">
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reduced motion fallback label */}
      <div className="motion-reduce:hidden sr-only">
        Scroll down to see featured projects
      </div>
    </section>
  );
}

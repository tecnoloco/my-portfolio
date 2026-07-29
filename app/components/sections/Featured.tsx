"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "@/app/data/projects";
import Tag from "@/app/components/ui/Tag";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const featuredProjects = PROJECTS.filter((p) => p.featured);

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
          xPercent: -100 * (panelCount - 0.9),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            // snap: 1 / (panelCount - 0.5),
            // end: () => `+=${totalWidth * (panelCount - 0.9)}`,
          },
        });

        // Content reveals keyed to horizontal scroll
        panels.forEach((panel) => {
          const textElements = panel.querySelector(".panel-content");
          const imageElement = panel.querySelector(".project-image");

          // Animate text content from left
          if (textElements) {
            gsap.from(textElements.children, {
              y: 30,
              opacity: 0,
              stagger: 0.08,
              duration: 0.5,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left center",
                toggleActions: "play none none reverse",
              },
            });
          }

          // Animate image from right
          if (imageElement) {
            gsap.from(imageElement, {
              x: 50,
              opacity: 0,
              duration: 0.6,
              delay: 0.2,
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: "left center",
                toggleActions: "play none none reverse",
              },
            });
          }
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
    { scope: containerRef },
  );

  return (
    <section
      id="featured"
      className="relative bg-surface-overlay"
      ref={containerRef}
    >
      {/* Horizontal scroll container for motion-capable users */}
      <div className="motion-safe:h-screen motion-safe:overflow-hidden motion-safe:w-full">
        <div
          ref={panelsRef}
          className="flex motion-safe:w-[500vw] motion-safe:h-full motion-reduce:flex-col gap-2 motion-reduce:py-24 motion-reduce:px-6 motion-reduce:max-w-7xl motion-reduce:mx-auto"
        >
          {featuredProjects.map((project) => (
            <div
              key={project.title}
              className="h-panel motion-safe:h-screen motion-safe:w-screen motion-safe:flex-shrink-0 motion-reduce:w-full motion-reduce:border motion-reduce:border-border motion-reduce:rounded-lg motion-reduce:p-8"
            >
              <div className="h-full flex flex-col md:flex-row justify-center items-center motion-safe:gap-8 md:gap-12 px-4 md:px-8 lg:px-12 py-50 md:py-12">
                <div className="panel-content flex-1 max-w-2xl space-y-6 flex flex-col justify-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary">
                      {project.title}
                    </h2>
                  </div>

                  <p className="text-base md:text-lg text-text-secondary leading-relaxed">
                    {project.description}
                  </p>

                  <div className="hidden md:flex items-baseline gap-3 py-4 md:py-6 border-y border-border">
                    <div>
                      <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent">
                        {project.metric}
                      </div>
                      <p className="text-text-secondary text-xs md:text-sm mt-1">
                        {project.metricLabel}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Tag key={tech} variant="accent">
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </div>
                {project.image && (
                  <div className="flex-1 flex justify-center items-center mt-6 md:mt-0 min-w-0">
                    <div className="w-full md:w-96 lg:w-full max-w-md">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={400}
                        priority
                        className="project-image w-full h-auto rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                )}
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

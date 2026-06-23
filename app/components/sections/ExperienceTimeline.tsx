"use client";

import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Experience } from "@/app/data/experience";
import GlassCard from "@/app/components/ui/GlassCard";
import Tag from "@/app/components/ui/Tag";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceTimelineProps {
  items: Experience[];
}

export default function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Animate timeline line
        gsap.from(".timeline-line", {
          scaleY: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        });

        // Animate individual timeline items
        // const items = gsap.utils.toArray<Element>(".timeline-item");
        // items.forEach((item) => {
        gsap.from(".timeline-item", {
          x: -40,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
        // });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative">
      {/* Timeline container */}
      <div ref={timelineRef} className="relative">
        {/* Vertical line */}
        <div className="hidden md:block absolute left-0 top-0 bottom-0 w-px timeline-line origin-top">
          <div className="h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />
        </div>

        {/* Timeline items */}
        <div className="md:pl-12 space-y-8">
          {items.map((item, idx) => (
            <div key={`${item.company}-${idx}`} className="timeline-item">
              <GlassCard>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-accent">
                      {item.role}
                    </h3>
                    <p className="text-text-secondary font-medium">
                      {item.company}
                    </p>
                    <p className="text-text-muted text-sm">
                      {item.period} • {item.location}
                    </p>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2">
                    {item.highlights.slice(0, 3).map((highlight, i) => (
                      <li
                        key={i}
                        className="text-text-secondary text-sm flex gap-2"
                      >
                        <ChevronRight className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {item.technologies.map((tech) => (
                      <Tag key={tech} variant="accent">
                        {tech}
                      </Tag>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

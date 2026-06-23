"use client";

import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Project } from "@/app/data/projects";
import GlassCard from "@/app/components/ui/GlassCard";
import Tag from "@/app/components/ui/Tag";

gsap.registerPlugin(ScrollTrigger);

const categoryColors: Record<Project["category"], string> = {
  fintech: "bg-blue-500/20 text-blue-300",
  marketplace: "bg-purple-500/20 text-purple-300",
  mobile: "bg-green-500/20 text-green-300",
  platform: "bg-pink-500/20 text-pink-300",
  infra: "bg-amber-500/20 text-amber-300",
};

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = Array.from(new Set(projects.map((p) => p.category)));
  const filteredProjects = activeCategory
    ? projects.filter((p) => p.category === activeCategory)
    : projects;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Scroll-triggered grid reveal
        gsap.from(".project-card", {
          y: 40,
          opacity: 0,
          stagger: 0.07,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Setup hover animations for each card
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (cards) {
        cards.forEach((card) => {
          const glow = card.querySelector(".card-glow");

          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -8,
              duration: 0.25,
              ease: "power2.out",
            });
            if (glow) {
              gsap.to(glow, { opacity: 1, duration: 0.2 });
            }
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              duration: 0.35,
              ease: "power2.inOut",
            });
            if (glow) {
              gsap.to(glow, { opacity: 0, duration: 0.3 });
            }
          });
        });
      }
    },
    { scope: containerRef, dependencies: [activeCategory] },
  );

  return (
    <div ref={containerRef} className="w-full">
      {/* Category filter */}
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === null
              ? "bg-accent text-surface-base"
              : "bg-surface-raised text-text-secondary hover:text-accent"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
              activeCategory === cat
                ? "bg-accent text-surface-base"
                : "bg-surface-raised text-text-secondary hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.map((project) => (
          <div key={project.title} className="project-card relative">
            <GlassCard className="h-full relative overflow-hidden">
              {/* Glow effect */}
              <div className="card-glow absolute inset-0 opacity-0 bg-gradient-to-br from-accent/20 via-transparent to-transparent rounded-lg pointer-events-none" />

              <div className="relative space-y-4">
                {/* Category badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-text-primary">
                      {project.title}
                    </h3>
                    <p className="text-text-muted text-xs">{project.company}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
                      categoryColors[project.category]
                    }`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Context & role */}
                <div>
                  <p className="text-text-secondary text-sm italic">
                    {project.context}
                  </p>
                  <p className="text-text-muted text-xs mt-1">
                    Role: <span className="text-accent">{project.role}</span>
                  </p>
                </div>

                {/* Outcome */}
                <div className="py-3 border-t border-accent/30">
                  <p className="text-sm text-accent font-medium leading-relaxed">
                    {project.outcome}
                  </p>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <Tag key={tech} variant="default" className="text-xs">
                      {tech}
                    </Tag>
                  ))}
                  {project.technologies.length > 5 && (
                    <Tag variant="default" className="text-xs">
                      +{project.technologies.length - 5}
                    </Tag>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  );
}

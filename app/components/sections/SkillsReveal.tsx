"use client";

import { useRef } from "react";
import * as LucideIcons from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SkillGroup } from "@/app/data/skills";
import Tag from "@/app/components/ui/Tag";

gsap.registerPlugin(ScrollTrigger);

interface SkillsRevealProps {
  groups: SkillGroup[];
}

export default function SkillsReveal({ groups }: SkillsRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const skillGroups = gsap.utils.toArray<Element>(".skill-group");
        skillGroups.forEach((group) => {
          const tags = group.querySelectorAll(".skill-tag");
          gsap.from(tags, {
            scale: 0.8,
            autoAlpha: 0,
            stagger: 0.04,
            duration: 0.4,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.map((group) => (
          <div key={group.category} className="skill-group">
            <h3 className="text-lg font-semibold text-accent mb-4 pb-2 border-b border-accent/30">
              {group.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const IconComponent = skill.icon
                  ? (
                      LucideIcons as unknown as Record<
                        string,
                        React.ComponentType<{ className?: string }>
                      >
                    )[skill.icon]
                  : null;
                return (
                  <Tag
                    key={skill.name}
                    variant={
                      skill.level === "core"
                        ? "accent"
                        : skill.level === "proficient"
                          ? "default"
                          : "muted"
                    }
                    className="skill-tag flex items-center gap-1"
                  >
                    {IconComponent && <IconComponent className="w-4 h-4" />}
                    {skill.name}
                  </Tag>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

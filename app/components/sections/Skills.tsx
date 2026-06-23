import { SKILLS } from "@/app/data/skills";
import SkillsReveal from "./SkillsReveal";

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="text-accent text-sm font-semibold mb-4 uppercase tracking-wider">
          Expertise
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
          Skills & Technologies
        </h2>
      </div>
      <SkillsReveal groups={SKILLS} />
    </section>
  );
}

import { EXPERIENCE } from "@/app/data/experience";
import ExperienceTimeline from "./ExperienceTimeline";

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6 flex items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-12">
          <p className="text-accent text-sm font-semibold mb-4 uppercase tracking-wider">
            Career
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary">
            Experience & Impact
          </h2>
        </div>
        <ExperienceTimeline items={EXPERIENCE} />
      </div>
    </section>
  );
}

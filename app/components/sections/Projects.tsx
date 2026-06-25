import { PROJECTS } from "@/app/data/projects";
import ProjectsGrid from "./ProjectsGrid";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 px-6 flex items-center bg-surface-overlay"
    >
      <div className="mb-12 max-w-7xl mx-auto">
        <p className="text-accent text-sm font-semibold mb-4 uppercase tracking-wider">
          Work
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-2">
          Featured Projects
        </h2>
        <p className="text-text-secondary mb-6">
          A selection of significant work across fintech, mobile, and platform
          engineering
        </p>
        <ProjectsGrid projects={PROJECTS} />
      </div>
    </section>
  );
}

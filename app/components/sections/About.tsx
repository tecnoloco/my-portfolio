import GlassCard from "@/app/components/ui/GlassCard";

const specialties = [
  {
    title: "Fintech & Payments",
    description:
      "Deep expertise in payment systems, worker payouts, debit cards, and financial integrations with Stripe, VGS, and NetSuite.",
  },
  {
    title: "Cross-Platform Mobile",
    description:
      "React Native at scale — type-safe, performant mobile experiences alongside modern web applications.",
  },
  {
    title: "Backend Systems",
    description:
      "Django, Python, Celery, and async workflows. Building reliable, observable, and maintainable backend infrastructure.",
  },
  {
    title: "AI-Assisted Development",
    description:
      "Leveraging Claude Code, Cursor, and LLMs for codebase exploration, refactoring, testing, and debugging.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 flex items-center bg-surface-overlay"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
        {/* Left column */}
        <div>
          <p className="text-accent text-sm font-semibold mb-4 uppercase tracking-wider">
            About
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8 leading-tight">
            10+ years turning complex systems into clean products
          </h2>

          <div className="space-y-4 text-text-secondary">
            <p>
              I&apos;m a Senior Software Engineer based in Querétaro, Mexico,
              with over a decade of experience building production systems
              across fintech, marketplaces, and mobile platforms. My focus is
              the intersection of user experience and system reliability.
            </p>
            <p>
              I&apos;ve led teams through payment infrastructure redesigns,
              modernized mobile codebases, and delivered compliance-sensitive
              workflows that handle real money and worker trust. I care about
              building interfaces that feel clear and trustworthy, while
              understanding the backend workflows, APIs, and monitoring systems
              that make those experiences reliable.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-12 space-y-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-accent">10+</span>
              <span className="text-text-secondary">Years of experience</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-accent">6</span>
              <span className="text-text-secondary">
                Companies shipped with
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-accent">50+</span>
              <span className="text-text-secondary">Production projects</span>
            </div>
          </div>
        </div>

        {/* Right column - Specialties */}
        <div className="grid gap-4">
          {specialties.map((specialty) => (
            <GlassCard key={specialty.title}>
              <h3 className="text-lg font-semibold text-accent mb-2">
                {specialty.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {specialty.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

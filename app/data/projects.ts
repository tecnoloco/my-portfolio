export type Project = {
  title: string;
  company: string;
  context: string;
  role: string;
  technologies: string[];
  outcome: string;
  category: "fintech" | "marketplace" | "mobile" | "platform" | "infra";
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: "NetSuite Financial Sync Redesign",
    company: "Instawork",
    context: "Financial synchronization was unreliable and difficult to debug with event-driven triggers and direct model signals.",
    role: "Full-stack architect and implementer",
    technologies: ["Django", "Celery", "Python", "Service Architecture", "Datadog"],
    outcome: "Reduced synchronization errors by approximately 90% through scheduled batch processing, improved observability, and added idempotency controls.",
    category: "infra",
    featured: true
  },
  {
    title: "Instawork Card",
    company: "Instawork",
    context: "Workers needed secure, transparent access to earned wages through a branded debit card with real-time transaction visibility.",
    role: "Frontend and integration lead",
    technologies: ["React Native", "TypeScript", "VGS", "Stripe", "Secure Payment Handling"],
    outcome: "Launched a secure debit-card product with transparent fees and transaction visibility, contributing to double-digit worker retention improvement.",
    category: "fintech",
    featured: true
  },
  {
    title: "W-2 Instapay",
    company: "Instawork",
    context: "W-2 workers wanted immediate access to earned wages rather than waiting for payday, but needed proper eligibility checks, tax handling, and safeguards.",
    role: "Full-stack lead",
    technologies: ["React", "React Native", "TypeScript", "Python", "Django", "Stripe", "Tax Calculations"],
    outcome: "Delivered instant payout workflows with proper eligibility logic and tax/fee handling, contributing to double-digit business margin improvement.",
    category: "fintech",
    featured: true
  },
  {
    title: "Meals & Breaks Compliance",
    company: "Instawork",
    context: "State-specific labor laws required careful handling of meal and rest break rules with clear product copy and safe defaults.",
    role: "Frontend and product workflow design",
    technologies: ["React", "TypeScript", "State Compliance Logic", "Data Validation"],
    outcome: "Implemented state-specific compliance workflows with safer derived values, clear product copy, and guardrails to reduce legal risk.",
    category: "fintech"
  },
  {
    title: "React Native TypeScript Migration",
    company: "Instawork",
    context: "Mobile app had mixed TypeScript and Flow/JavaScript, making refactoring difficult and creating type safety gaps.",
    role: "Migration lead and implementer",
    technologies: ["React Native", "TypeScript", "Flow", "Mobile Infrastructure"],
    outcome: "Migrated all shared components to strict TypeScript, improving type safety, developer experience, and maintainability across mobile surfaces.",
    category: "mobile",
    featured: true
  },
  {
    title: "Virtualized Filters & Large-Data UI",
    company: "Instawork",
    context: "Workers were filtering through thousands of shift options, causing UI performance degradation and poor user experience.",
    role: "Component architecture and performance",
    technologies: ["React", "TypeScript", "Virtualization", "React-Window", "Storybook"],
    outcome: "Built virtualized filter components supporting single/multi-select, search, and select-all patterns, improving performance and UX in data-heavy interfaces.",
    category: "mobile"
  },
  {
    title: "Payment Ledger Micro-Frontend Migration",
    company: "Instawork",
    context: "Legacy payment views needed modernization without disrupting partner web experiences.",
    role: "Micro-frontend architecture and implementation",
    technologies: ["React", "Module Federation", "Micro-frontends", "Payment APIs"],
    outcome: "Successfully migrated payment ledger to micro-frontend architecture, improving maintainability and enabling independent deployment.",
    category: "platform"
  },
  {
    title: "Stateoftheart AI Research Platform",
    company: "Stateoftheart AI",
    context: "AI research ecosystem was fragmented across papers, authors, models, and datasets with no clear relationship mapping.",
    role: "Frontend Tech Lead and co-founder",
    technologies: ["Vue", "Nuxt.js", "GraphQL", "D3.js", "Neo4j"],
    outcome: "Built interactive visualizations mapping AI research evolution, launched MVP, scaled through acquisition by Instawork.",
    category: "platform",
    featured: true
  },
  {
    title: "Paybook Embedded Fintech Widgets",
    company: "Paybook",
    context: "Financial institutions needed flexible, customizable widgets for bank and tax account synchronization without building from scratch.",
    role: "Widget architecture and implementation",
    technologies: ["React", "TypeScript", "Embeddable Components", "Financial APIs"],
    outcome: "Built reusable widget architecture adopted across multiple client sites, improving sync flows and trust through clearer state handling.",
    category: "fintech"
  }
];

export type Project = {
  title: string;
  company: string;
  context: string;
  role: string;
  technologies: string[];
  outcome: string;
  category: "fintech" | "marketplace" | "mobile" | "platform" | "infra";
  url?: string;
  featured?: boolean;
  year?: string;
  metric?: string;
  metricLabel?: string;
  description?: string;
  image?: string;
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
    featured: true,
    year: "2025",
    metric: "90%",
    metricLabel: "fewer sync failures",
    description: "Redesigned financial synchronization from event-driven signals to scheduled batch processing using Django, Celery, and service-layer architecture. Added structured logging, Datadog metrics, and idempotency controls for reliable accounting workflows.",
    image: "/projects/ns-sync-migration.webp"
  },
  {
    title: "Instawork Card",
    company: "Instawork",
    context: "Workers needed secure, transparent access to earned wages through a branded debit card with real-time transaction visibility.",
    role: "Frontend and integration lead",
    technologies: ["React Native", "TypeScript", "VGS", "Stripe", "Secure Payment Handling"],
    outcome: "Launched a secure debit-card product with transparent fees and transaction visibility, contributing to double-digit worker retention improvement.",
    category: "fintech",
    featured: true,
    year: "2021–2023",
    metric: "2x",
    metricLabel: "retention improvement",
    description: "Shipped a secure debit card product with transparent fee handling, real-time transaction visibility, and resilient error states. Led frontend and VGS integration work across React Native and web platforms.",
    image: "/projects/iw-card-mockup-clean.webp"
  },
  {
    title: "W-2 Instapay",
    company: "Instawork",
    context: "W-2 workers wanted immediate access to earned wages rather than waiting for payday, but needed proper eligibility checks, tax handling, and safeguards.",
    role: "Full-stack lead",
    technologies: ["React", "React Native", "TypeScript", "Python", "Django", "Stripe", "Tax Calculations"],
    outcome: "Delivered instant payout workflows with proper eligibility logic and tax/fee handling, contributing to double-digit business margin improvement.",
    category: "fintech",
    year: "2025",
    metric: "+15%",
    metricLabel: "business margins",
    description: "Built instant wage-access workflows enabling workers to claim earned wages immediately after clock-out. Implemented eligibility logic, tax/fee calculations, and safeguards while maintaining clear product copy."
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
    year: "2024-2025",
    metric: "100%",
    metricLabel: "components migrated",
    description: "Led full migration of shared React Native components from Flow/JavaScript to TypeScript strict mode. Improved type safety, developer experience, and reduced runtime errors across mobile infrastructure."
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
    description: "Designed and implemented a research platform visualizing relationships between AI papers, authors, models, and datasets. Built interactive D3.js visualizations and GraphQL APIs backed by Neo4j graph database.",
    category: "platform",
    featured: true,
    image: "/projects/stateoftheartAI-mockup.webp"
  },
  {
    title: "Paybook Embedded Fintech Widgets",
    company: "Paybook",
    context: "Financial institutions needed flexible, customizable widgets for bank and tax account synchronization without building from scratch.",
    role: "Widget architecture and implementation",
    technologies: ["Vue", "JavaScript", "Embeddable Components", "Financial APIs"],
    outcome: "Built reusable widget architecture adopted across multiple client sites, improving sync flows and trust through clearer state handling.",
    description: "Developed embeddable Vue widgets for financial account synchronization, enabling clients to integrate Paybook's services seamlessly. Improved user trust with clear state handling and error feedback.",
    category: "fintech",
    featured: true,
    image: "/projects/syncfy-widget.webp"
  },
  {
    title: "SIMAR – Marine Monitoring Explorer",
    company: "Marciano Studio",
    context: "CONABIO needed an interactive public tool to explore marine monitoring data across Mexico's coastal regions.",
    role: "Technical lead, developer, and client relationship manager",
    technologies: ["Vue", "Leaflet"],
    outcome: "Delivered an interactive geospatial explorer enabling researchers and the public to visualize real-time marine monitoring data.",
    description: "Built a geospatial data explorer using Vue and Leaflet, allowing users to visualize marine monitoring data across Mexico's coastal regions. Implemented interactive maps, filters, and data overlays for research and public engagement.",
    category: "platform",
    url: "https://simar.conabio.gob.mx/explorer/",
    featured: true,
    image: "/projects/simar-mockup-clean.webp"
  },
  {
    title: "Michelin Internal E-Learning Platform",
    company: "Marciano Studio",
    context: "Michelin needed a web-based internal training platform that tracked learner progress and complied with the SCORM standard.",
    role: "Technical lead and developer",
    technologies: ["Vue", "SCORM"],
    outcome: "Built a SCORM-compliant e-learning platform enabling Michelin to author, deliver, and track employee training across the organization.",
    category: "platform"
  },
  {
    title: "MyTicket – Events Ticketing System",
    company: "MyTicket",
    context: "Event organizers and attendees needed a reliable platform to publish events, manage availability, and purchase tickets online.",
    role: "Technical lead and developer",
    technologies: ["Vue"],
    outcome: "Built a full-featured online ticketing system supporting event management and real-time ticket sales.",
    category: "marketplace",
    url: "https://myticket.com"
  },
  {
    title: "Michelin Interactive Marketing Games",
    company: "Marciano Studio",
    context: "Michelin and its sub-brands needed engaging web experiences to support marketing campaigns and increase audience interaction.",
    role: "Technical lead and developer",
    technologies: ["Vue", "Angular"],
    outcome: "Delivered multiple interactive web games and experiences for Michelin marketing campaigns, driving audience engagement across brands.",
    category: "platform"
  },
  {
    title: "Bticino Store CMS",
    company: "Marciano Studio",
    context: "Bticino store needed a dynamic way to configure and manage product pages without requiring backend development or code changes.",
    role: "Frontend architect",
    technologies: ["React"],
    outcome: "Built a no-code CMS system with reusable React components enabling store managers to dynamically configure product pages and content layouts.",
    category: "platform"
  }
];

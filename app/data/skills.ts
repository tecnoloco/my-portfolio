export type Skill = {
  name: string;
  level?: "core" | "proficient" | "familiar";
  icon?: string;
};

export type SkillGroup = {
  category: string;
  skills: Skill[];
};

export const SKILLS: SkillGroup[] = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", level: "core", icon: "FileJson" },
      { name: "JavaScript", level: "core", icon: "Code" },
      { name: "Python", level: "proficient", icon: "Code" },
      { name: "SQL", level: "proficient", icon: "Database" }
    ]
  },
  {
    category: "Frontend & Mobile",
    skills: [
      { name: "React", level: "core", icon: "Zap" },
      { name: "React Native", level: "core", icon: "Smartphone" },
      { name: "Next.js", level: "core", icon: "Zap" },
      { name: "Vue", level: "proficient", icon: "Zap" },
      { name: "Nuxt.js", level: "proficient", icon: "Zap" },
      { name: "Tailwind CSS", level: "core", icon: "Palette" },
      { name: "GSAP", level: "proficient", icon: "Sparkles" },
      { name: "D3.js", level: "proficient", icon: "BarChart3" },
      { name: "Component Architecture", level: "core", icon: "Layers" },
      { name: "Design Systems", level: "proficient", icon: "Grid3x3" },
      { name: "Storybook", level: "proficient", icon: "BookOpen" },
      { name: "Responsive UI", level: "core", icon: "Layout" },
      { name: "Performance Optimization", level: "core", icon: "Zap" }
    ]
  },
  {
    category: "Backend & APIs",
    skills: [
      { name: "Django", level: "core", icon: "Server" },
      { name: "Django REST Framework", level: "core", icon: "Network" },
      { name: "Node.js", level: "proficient", icon: "Code" },
      { name: "GraphQL", level: "proficient", icon: "GitGraph" },
      { name: "REST APIs", level: "core", icon: "Network" },
      { name: "Service Architecture", level: "core", icon: "Archive" },
      { name: "API Integration", level: "core", icon: "Link" },
      { name: "Admin Tooling", level: "proficient", icon: "Settings" }
    ]
  },
  {
    category: "Data & Async Systems",
    skills: [
      { name: "Celery", level: "core", icon: "Zap" },
      { name: "RabbitMQ", level: "proficient", icon: "MessageSquare" },
      { name: "Batch Processing", level: "core", icon: "Layers" },
      { name: "Background Jobs", level: "core", icon: "Clock" },
      { name: "MySQL", level: "proficient", icon: "Database" },
      { name: "MongoDB", level: "proficient", icon: "Database" },
      { name: "Neo4j", level: "familiar", icon: "GitGraph" },
      { name: "Idempotency Patterns", level: "core", icon: "Shield" },
      { name: "Feature Flags", level: "proficient", icon: "Flag" }
    ]
  },
  {
    category: "Payments & Fintech",
    skills: [
      { name: "Stripe", level: "core", icon: "CreditCard" },
      { name: "VGS", level: "core", icon: "Lock" },
      { name: "Hyperwallet", level: "core", icon: "Wallet" },
      { name: "NetSuite Integration", level: "core", icon: "Link" },
      { name: "Worker Payouts", level: "core", icon: "DollarSign" },
      { name: "Debit Card Workflows", level: "core", icon: "CreditCard" },
      { name: "Invoicing & Reconciliation", level: "core", icon: "FileText" },
      { name: "Financial Compliance", level: "proficient", icon: "CheckCircle" },
      { name: "Payment Applications", level: "proficient", icon: "ShoppingCart" }
    ]
  },
  {
    category: "Cloud, Testing & Observability",
    skills: [
      { name: "AWS", level: "proficient", icon: "Cloud" },
      { name: "Docker", level: "proficient", icon: "Box" },
      { name: "GitHub Actions", level: "proficient", icon: "GitBranch" },
      { name: "Jest", level: "proficient", icon: "CheckCircle" },
      { name: "Pytest", level: "proficient", icon: "CheckCircle" },
      { name: "Datadog", level: "core", icon: "BarChart3" },
      { name: "Structured Logging", level: "core", icon: "LogOut" },
      { name: "Metrics & Monitoring", level: "core", icon: "TrendingUp" },
      { name: "Production Debugging", level: "core", icon: "Bug" },
      { name: "Claude Code", level: "core", icon: "Cpu" },
      { name: "Cursor IDE", level: "proficient", icon: "Code" }
    ]
  }
];

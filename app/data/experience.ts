export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  highlights: string[];
  technologies: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Instawork",
    role: "Senior Software Engineer",
    period: "2021 – 2025",
    location: "Remote, USA",
    highlights: [
      "Led frontend and integration work for Instawork Card (secure debit-card workflows), contributing to double-digit worker retention improvement",
      "Redesigned NetSuite financial synchronization from event-driven to scheduled batch processing, reducing sync failures by ~90%",
      "Delivered W-2 Instapay workflows enabling real-time wage access for workers, contributing to double-digit business margin improvement",
      "Built backend processors and admin tooling for invoices, payments, deposits, refunds, and reconciliation workflows",
      "Modernized React Native infrastructure by migrating shared components from Flow/JavaScript to TypeScript"
    ],
    technologies: ["React", "React Native", "TypeScript", "Python", "Django", "Celery", "Stripe", "VGS", "NetSuite", "Datadog"]
  },
  {
    company: "Cornershop by Uber",
    role: "Senior Frontend Developer",
    period: "2021",
    location: "Remote, Mexico",
    highlights: [
      "Worked on a SWAT engineering team focused on urgent features and high-impact production issues",
      "Contributed across React and React Native codebases",
      "Strengthened ability to debug production issues and work across different product domains"
    ],
    technologies: ["React", "React Native", "TypeScript"]
  },
  {
    company: "Stateoftheart AI",
    role: "Frontend Tech Lead / Co-Founder",
    period: "2020 – 2021",
    location: "Remote, USA",
    highlights: [
      "Served as Frontend Tech Lead and founding-team member for an AI research platform",
      "Led frontend architecture using Vue and Nuxt.js with GraphQL integration",
      "Designed interactive visualizations mapping relationships between AI research papers, authors, models, and datasets",
      "Helped launch and iterate the MVP through acquisition by Instawork"
    ],
    technologies: ["Vue", "Nuxt.js", "GraphQL", "D3.js", "TypeScript"]
  },
  {
    company: "Paybook",
    role: "Senior Frontend Developer",
    period: "2019 – 2020",
    location: "Remote, USA",
    highlights: [
      "Built embeddable fintech widgets for bank-account and tax-account synchronization",
      "Designed reusable and customizable UI architecture for external client integrations",
      "Improved asynchronous financial synchronization flows with clearer states and stronger error handling"
    ],
    technologies: ["React", "TypeScript", "GraphQL", "Fintech APIs"]
  },
  {
    company: "Marciano Studio",
    role: "Senior Frontend Developer",
    period: "2014 – 2019",
    location: "Mexico",
    highlights: [
      "Led frontend development across e-commerce platforms, enterprise tools, and data products",
      "Defined reusable UI patterns and frontend implementation standards",
      "Collaborated with clients, designers, and backend engineers on production systems"
    ],
    technologies: ["React", "Vue", "JavaScript", "HTML", "CSS", "Responsive Design"]
  },
  {
    company: "Corebook",
    role: "Frontend Developer",
    period: "2012 – 2014",
    location: "Mexico",
    highlights: [
      "Built production web interfaces and reusable components",
      "Developed strong foundations in JavaScript, responsive design, and browser compatibility"
    ],
    technologies: ["JavaScript", "jQuery", "HTML", "CSS"]
  }
];

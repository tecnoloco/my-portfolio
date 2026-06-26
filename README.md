# My Portfolio

A modern, animated portfolio website built with **Next.js 16**, **React 19**, and **GSAP**. Features smooth scrolling, interactive animations, dynamic backgrounds, and a custom cursor with element interaction.

## Features

- **GSAP Animations**: Smooth, performant tweens and scroll-triggered animations
- **Lenis Smooth Scrolling**: Buttery-smooth scroll experience
- **Dynamic Backgrounds**: Matrix grid, snake patterns, and dot parallax effects
- **Custom Cursor**: Interactive cursor that snaps to elements
- **Glass Morphism UI**: Modern, frosted glass design elements
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Experience Timeline**: Interactive career history showcase
- **Type-Safe**: Full TypeScript support

## Tech Stack

- [Next.js](https://nextjs.org) 16 – React framework with App Router
- [React](https://react.dev) 19 – UI library
- [GSAP](https://greensock.com) – Professional-grade animation library
- [Lenis](https://lenis.studiofreight.com) – Smooth scroll behavior
- [Tailwind CSS](https://tailwindcss.com) 4 – Utility-first styling
- [TypeScript](https://www.typescriptlang.org) – Type safety
- [Lucide React](https://lucide.dev) – Icon library

## Getting Started

### Prerequisites

- Node.js 18+ (compatible with Next.js 16)
- npm, yarn, pnpm, or bun

### Installation

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio in your browser. Changes auto-reload as you edit files.

### Build & Deploy

```bash
npm run build
npm start
```

## Project Structure

```
app/
├── components/
│   ├── sections/        # Page sections (Hero, Experience, Projects, etc.)
│   ├── ui/              # Reusable UI components (GlassCard, DotParallaxBg, etc.)
│   └── ...
├── data/                # Static data (experience, projects, skills)
├── layout.tsx           # Root layout with Lenis provider
└── page.tsx             # Home page
```

## Animation Highlights

- **Hero Section**: Matrix background with text reveal animations
- **Experience Section**: Timeline with staggered item animations + dot parallax background
- **Custom Cursor**: Smooth interpolation with snap-to-element behavior
- **Scroll Triggers**: Parallax and reveal effects tied to viewport scroll
- **Reduced Motion**: All animations respect `prefers-reduced-motion` for accessibility

## Performance

- GPU-accelerated animations with `translate3D`
- GSAP ticker instead of raw `requestAnimationFrame`
- Scoped selectors to prevent cross-component matches
- CSS variables for real-time animation updates without React re-renders

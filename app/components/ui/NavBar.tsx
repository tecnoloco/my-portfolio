"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./Button";

export default function NavBar() {
  const [isGlass, setIsGlass] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const handleScroll = () => {
      setIsGlass(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isGlass ? "glass" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-accent">
            EE
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-text-secondary hover:text-accent transition-colors text-sm"
              >
                {link.label}
              </Link>
            ))}
            <Button size="sm" variant="outline">
              Get in Touch
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-text-primary"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileOpen && (
          <div className="md:hidden glass border-t border-border">
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-text-secondary hover:text-accent transition-colors text-sm"
                  onClick={() => setIsMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button size="sm" variant="outline" className="w-full">
                Get in Touch
              </Button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

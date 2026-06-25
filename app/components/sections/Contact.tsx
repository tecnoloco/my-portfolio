"use client";

import { Mail, Code, Link, MapPin } from "lucide-react";
import GlassCard from "@/app/components/ui/GlassCard";
import Button from "@/app/components/ui/Button";
import SnakeBackground from "@/app/components/ui/SnakeBackground";
import { withCursorInteraction } from "@/app/components/hoc/withCursorInteraction";

const ButtonWithCursor = withCursorInteraction(Button);
const GlassCardWithCursor = withCursorInteraction(GlassCard);

export default function Contact() {
  const contactMethods = [
    {
      title: "Email",
      value: "edan.espinosa@gmail.com",
      href: "mailto:edan.espinosa@gmail.com",
      icon: Mail,
    },
    {
      title: "GitHub",
      value: "github.com/tecnoloco",
      href: "https://github.com/tecnoloco",
      icon: Code,
    },
    {
      title: "LinkedIn",
      value: "linkedin.com/in/eduardo-eg/",
      href: "https://www.linkedin.com/in/eduardo-eg/",
      icon: Link,
    },
  ];

  return (
    <section id="contact" className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <SnakeBackground />
      <div className="relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Let&apos;s build something together
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto">
          Open to senior roles, technical leadership, consulting, and
          interesting problems. Always up for a conversation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {contactMethods.map((method) => (
          <a
            key={method.title}
            href={method.href}
            target={method.href.startsWith("http") ? "_blank" : undefined}
            rel={
              method.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="block"
          >
            <GlassCardWithCursor className="text-center h-full hover:border-accent/50 transition-colors">
              <method.icon className="w-8 h-8 mb-3 mx-auto text-accent" />
              <h3 className="text-lg font-semibold text-accent mb-2">
                {method.title}
              </h3>
              <p className="text-text-secondary text-sm break-all">
                {method.value}
              </p>
            </GlassCardWithCursor>
          </a>
        ))}
      </div>

      <div className="text-center">
        <p className="text-text-muted text-sm mb-8 flex items-center justify-center gap-2">
          <MapPin className="w-4 h-4" />
          Based in Querétaro, Mexico • Available remotely
        </p>
        <ButtonWithCursor size="lg" variant="primary">
          Send me an email
        </ButtonWithCursor>
      </div>
      </div>
    </section>
  );
}

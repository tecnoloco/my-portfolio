interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
}

export default function GlassCard({
  children,
  className = "",
  as: Component = "div",
}: GlassCardProps) {
  return (
    <Component className={`glass rounded-lg p-6 ${className}`}>
      {children}
    </Component>
  );
}

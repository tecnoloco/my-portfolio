interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "muted";
  className?: string;
}

export default function Tag({
  children,
  variant = "default",
  className = "",
}: TagProps) {
  const baseStyles =
    "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors";

  const variants = {
    default: "bg-surface-raised text-text-secondary border border-border",
    accent: "bg-accent/15 text-accent border border-accent/30",
    muted: "bg-surface-overlay text-text-muted border border-border",
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

import React, { forwardRef } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = "" }, ref) => {
    return (
      <div ref={ref} className={`glass rounded-lg p-6 ${className}`}>
        {children}
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";
export default GlassCard;
